#!/usr/bin/env python3
"""Optimize website images as WebP and optionally update site references."""

from __future__ import annotations

import argparse
import hashlib
import json
import re
import sys
from pathlib import Path

from PIL import Image, ImageOps, UnidentifiedImageError


REPO_ROOT = Path(__file__).resolve().parents[1]
DEFAULT_DIRECTORIES = (
    REPO_ROOT / "images" / "education",
    REPO_ROOT / "images" / "portfolio",
    REPO_ROOT / "images" / "posts",
)
SOURCE_EXTENSIONS = {".jpg", ".jpeg", ".png"}
REFERENCE_EXTENSIONS = {".html", ".md", ".markdown", ".yml", ".yaml", ".json", ".scss", ".css"}
REFERENCE_ROOTS = (
    REPO_ROOT / "_posts",
    REPO_ROOT / "_portfolio",
    REPO_ROOT / "_pages",
    REPO_ROOT / "_includes",
    REPO_ROOT / "_data",
    REPO_ROOT / "_layouts",
)
MANIFEST_PATH = REPO_ROOT / "images" / ".webp-manifest.json"
CONVERTER_VERSION = 1


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Incrementally convert website JPG/JPEG/PNG images to WebP."
    )
    parser.add_argument(
        "directories",
        nargs="*",
        type=Path,
        help="Directories to scan (defaults to education, portfolio, and posts).",
    )
    parser.add_argument("--quality", type=int, default=82, choices=range(1, 101))
    parser.add_argument(
        "--max-width",
        type=int,
        default=1920,
        help="Downscale images wider than this many pixels; use 0 to disable.",
    )
    parser.add_argument(
        "--update-references",
        action="store_true",
        help="Change site references from source extensions to .webp.",
    )
    parser.add_argument("--force", action="store_true", help="Reconvert every image.")
    return parser.parse_args()


def file_hash(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as source:
        for chunk in iter(lambda: source.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def load_manifest() -> dict[str, dict[str, object]]:
    if not MANIFEST_PATH.exists():
        return {}
    try:
        data = json.loads(MANIFEST_PATH.read_text(encoding="utf-8"))
        return data if isinstance(data, dict) else {}
    except (json.JSONDecodeError, OSError):
        print(f"Warning: ignoring invalid manifest {MANIFEST_PATH}", file=sys.stderr)
        return {}


def save_manifest(manifest: dict[str, dict[str, object]]) -> None:
    MANIFEST_PATH.write_text(
        json.dumps(dict(sorted(manifest.items())), indent=2) + "\n",
        encoding="utf-8",
    )


def source_images(directories: list[Path]) -> list[Path]:
    images: list[Path] = []
    for directory in directories:
        resolved = directory if directory.is_absolute() else REPO_ROOT / directory
        if not resolved.is_dir():
            print(f"Warning: skipping missing directory {resolved}", file=sys.stderr)
            continue
        images.extend(
            path
            for path in resolved.rglob("*")
            if path.is_file() and path.suffix.lower() in SOURCE_EXTENSIONS
        )
    return sorted(set(images))


def convert_image(source: Path, destination: Path, quality: int, max_width: int) -> None:
    with Image.open(source) as opened:
        image = ImageOps.exif_transpose(opened)
        if image.mode not in ("RGB", "RGBA"):
            image = image.convert("RGBA" if "transparency" in image.info else "RGB")

        if max_width and image.width > max_width:
            height = round(image.height * max_width / image.width)
            image = image.resize((max_width, height), Image.Resampling.LANCZOS)

        destination.parent.mkdir(parents=True, exist_ok=True)
        image.save(destination, "WEBP", quality=quality, method=6)


def resolve_reference(url: str) -> Path | None:
    clean_url = url.split("?", 1)[0].split("#", 1)[0].replace("\\", "/")
    if "images/" in clean_url:
        relative = clean_url[clean_url.index("images/") :]
        return REPO_ROOT / relative
    if clean_url.startswith(("posts/", "portfolio/", "education/")):
        return REPO_ROOT / "images" / clean_url
    return None


def add_post_image_attributes(text: str) -> tuple[str, int]:
    """Add native lazy loading to inline post images without overriding choices."""
    image_tag_pattern = re.compile(r"<img\b(?P<attributes>[^>]*?)>", re.IGNORECASE | re.DOTALL)
    updated_tags = 0

    def update_tag(match: re.Match[str]) -> str:
        nonlocal updated_tags
        attributes = match.group("attributes")
        additions: list[str] = []
        if not re.search(r"\bloading\s*=", attributes, re.IGNORECASE):
            additions.append('loading="lazy"')
        if not re.search(r"\bdecoding\s*=", attributes, re.IGNORECASE):
            additions.append('decoding="async"')
        if not additions:
            return match.group(0)
        updated_tags += 1
        return f"<img {' '.join(additions)}{attributes}>"

    return image_tag_pattern.sub(update_tag, text), updated_tags


def update_references(converted_sources: set[Path]) -> tuple[int, int, int]:
    source_lookup = {path.resolve(): path for path in converted_sources}
    webp_lookup = {path.with_suffix(".webp").resolve(): path for path in converted_sources}
    url_pattern = re.compile(
        r"(?P<url>(?:/|\.\./)*images/[^\s\"'<>)}\]]+?\.(?:png|jpe?g|webp)"
        r"|(?:posts|portfolio|education)/[^\s\"'<>)}\]]+?\.(?:png|jpe?g|webp))",
        flags=re.IGNORECASE,
    )
    changed_files = 0
    changed_references = 0
    changed_image_tags = 0
    files: list[Path] = []

    for root in REFERENCE_ROOTS:
        if root.exists():
            files.extend(
                path
                for path in root.rglob("*")
                if path.is_file() and path.suffix.lower() in REFERENCE_EXTENSIONS
            )

    for path in sorted(set(files)):
        original = path.read_text(encoding="utf-8")
        replacements = 0

        def replace(match: re.Match[str]) -> str:
            nonlocal replacements
            url = match.group("url")
            referenced_path = resolve_reference(url)
            if not referenced_path:
                return url
            resolved = referenced_path.resolve()
            source = source_lookup.get(resolved) or webp_lookup.get(resolved)
            if source:
                webp = source.with_suffix(".webp")
                # A few already-tiny JPEGs/PNGs can be smaller than WebP.
                # Keep those original references while still creating a WebP version.
                preferred_suffix = ".webp" if webp.stat().st_size < source.stat().st_size else source.suffix
                updated_url = str(Path(url).with_suffix(preferred_suffix)).replace("\\", "/")
                if updated_url == url:
                    return url
                replacements += 1
                return updated_url
            return url

        updated = url_pattern.sub(replace, original)
        tag_updates = 0
        if path.is_relative_to(REPO_ROOT / "_posts"):
            updated, tag_updates = add_post_image_attributes(updated)
        if updated != original:
            path.write_text(updated, encoding="utf-8", newline="")
            changed_files += 1
            changed_references += replacements
            changed_image_tags += tag_updates

    return changed_files, changed_references, changed_image_tags


def main() -> int:
    args = parse_args()
    directories = args.directories or list(DEFAULT_DIRECTORIES)
    manifest = load_manifest()
    images = source_images(directories)
    settings = {
        "converter_version": CONVERTER_VERSION,
        "quality": args.quality,
        "max_width": args.max_width,
    }
    converted = 0
    skipped = 0
    failed = 0
    available_sources: set[Path] = set()

    for source in images:
        destination = source.with_suffix(".webp")
        key = source.relative_to(REPO_ROOT).as_posix()
        fingerprint = file_hash(source)
        record = {"sha256": fingerprint, **settings}
        available_sources.add(source)

        if not args.force and destination.exists() and manifest.get(key) == record:
            skipped += 1
            continue

        try:
            convert_image(source, destination, args.quality, args.max_width)
            manifest[key] = record
            converted += 1
            old_size = source.stat().st_size
            new_size = destination.stat().st_size
            saving = 100 * (old_size - new_size) / old_size
            print(
                f"Converted {key} -> {destination.name} "
                f"({old_size / 1024:.1f} KiB -> {new_size / 1024:.1f} KiB, {saving:.1f}% smaller)"
            )
        except (OSError, UnidentifiedImageError) as error:
            failed += 1
            print(f"Failed to convert {source}: {error}", file=sys.stderr)

    save_manifest(manifest)

    changed_files = changed_references = changed_image_tags = 0
    if args.update_references:
        changed_files, changed_references, changed_image_tags = update_references(available_sources)

    print(
        f"Done: {converted} converted, {skipped} unchanged, {failed} failed; "
        f"{changed_references} references and {changed_image_tags} image tags "
        f"updated in {changed_files} files."
    )
    return 1 if failed else 0


if __name__ == "__main__":
    raise SystemExit(main())
