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

| Surface | Recommended size | Ratio | Notes |
| --- | ---: | ---: | --- |
| Institution images | `1200 x 900 px` | `4:3` | Best for logos or campus/school marks. Prefer transparent PNG or SVG-like logo exports when possible. |
| Publication media | `1200 x 675 px` | `16:9` | Used as a full-bleed left preview in publication cards. Important content should be centered because the card uses `object-fit: cover`. |
| Portfolio media | `1200 x 675 px` | `16:9` | Used as a full-bleed left preview in portfolio cards. Center key visual details to avoid edge cropping. |
| Blog post media | `1200 x 675 px` | `16:9` | Used in compact blog cards and social previews. Works best with clear subject matter and limited text. |

For publication and portfolio cards, the left media panel stretches to the card height, while the card height is determined by the right-side content. On mobile, media stacks above the content with a fixed preview height.

## Deployment

Push changes to the GitHub Pages branch for this repository. GitHub Pages builds the Jekyll site automatically.

## Credits

This site is built from the Academic Pages/Minimal Mistakes ecosystem and customized for Wenbo (Daniel) Zhu's academic portfolio, writing, projects, and publications.
