# Wenbo (Daniel) Zhu's Academic Website

This repository powers a modern redesigned academic personal website based on Academic Pages and Minimal Mistakes. It keeps the Jekyll/GitHub Pages publishing model, but updates the visual system with compact cards, responsive grids, dark-mode friendly styling, publication and portfolio previews, and a floating table of contents for long posts.

## Structure

- `_pages/`: top-level pages such as home, blog archive, portfolio, awards, and publications.
- `_posts/`: blog posts.
- `_portfolio/`: portfolio entries when using collection-based pages.
- `_publications/`: publication entries when using collection-based pages.
- `_data/`: structured data for cards, navigation, author info, and site content.
- `_sass/layout/`: component styles for cards, navigation, pages, sidebars, publications, portfolio, and blog posts.
- `images/`: site images and media previews.
- `files/`: downloadable assets such as PDFs.

## Local Development

Install Ruby/Bundler dependencies, then run:

```bash
bundle install
bundle exec jekyll serve
```

The site will be available at `http://localhost:4000`.

If local Ruby setup is inconvenient, use the provided Docker setup:

```bash
docker compose up
```

## Media Guidelines

Use optimized JPG, PNG, WebP, or MP4 files. Keep file sizes modest because these images appear in repeated card lists.

| Surface | Ratio | Notes |
| --- | ---: | --- |
| Institution images | `3:2` | Best for logos or campus/school marks. Prefer transparent PNG or SVG-like logo exports when possible. |
| Publication media | `4:3` | Used as a full-bleed left preview in publication cards. Important content is centered automatically. |
| Portfolio media | `4:3` | Used as a full-bleed left preview in portfolio cards. Center key visual details to avoid edge cropping. |
| Blog post media | `2:1` | Used in compact blog cards and social previews. Works best with clear subject matter and limited text. |

For publication and portfolio cards, the left media panel stretches to the card height, while the card height is determined by the right-side content. On mobile, media stacks above the content with a fixed preview height.

## Deployment

Push changes to the GitHub Pages branch for this repository. GitHub Pages builds the Jekyll site automatically.

## Media Optimization

Raster images added under `images/education`, `images/portfolio`,
`images/posts`, or `images/publication` are automatically converted to WebP
by GitHub Actions. SVG files stay as SVG because they are already efficient
vector assets. Animated GIFs are converted to animated WebP without dropping
their frames. The workflow keeps the original raster image as the source,
creates a sibling `.webp` file, and updates site references whenever the WebP
payload is smaller. Inline images in blog posts also receive native lazy
loading and asynchronous decoding attributes.
Redundant WebP-only `<picture>` wrappers are collapsed automatically, and
controlled post videos receive `preload="none"` so they download only when a
visitor chooses to play them.

The recommended workflow is to optimize locally before committing. Set up the
local environment once:

```powershell
python -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r scripts\requirements.txt
```

For each new post:

1. Add the GIF, JPG, JPEG, or PNG under `images/posts`.
2. Reference the original filename in the post and provide meaningful `alt`
   text for each image.
3. Run:

   ```powershell
   .\.venv\Scripts\python.exe scripts\optimize_media.py --update-references
   ```

   A typical post image will then look like:

   ```html
   <img
     src="../images/posts/example/photo.webp"
     width="550"
     loading="lazy"
     decoding="async"
     alt="A meaningful description of the image">
   ```

4. Review and commit the original image, generated WebP, updated post, and
   `images/.webp-manifest.json` together.
5. Push the commit to GitHub.

Do not manually change the extension to `.webp`; the optimizer does so only
when WebP is smaller. It skips unchanged files, uses WebP quality 82, and
limits very wide images to 1920 pixels. Run
`python scripts/optimize_media.py --help` for configuration options.

GitHub Actions runs the same optimizer when source images or posts are pushed.
This is a safety net when the local step is forgotten; normally it finds
nothing to change. When it does find changes, it creates a second automated
commit, which causes another GitHub Pages deployment.

## Credits

This site is built from the Academic Pages/Minimal Mistakes ecosystem and customized for Wenbo (Daniel) Zhu's academic portfolio, writing, projects, and publications.

<div align="center">
  <a href="https://clustrmaps.com/site/1bwc7" title="Visit tracker">
    <img src="https://clustrmaps.com/map_v2.png?cl=ffffff&w=500&t=tt&d=Z-7P-c__jyKWkEFWv6kpimyIUKQSYn8vWo0XVWtk0gE" alt="ClustrMaps" />
  </a>
</div>
