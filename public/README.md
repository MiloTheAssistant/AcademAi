# Public Asset Structure

This folder contains static assets served by the AcademAI website.

## Source Of Truth

- `BrandImageLibrary.md` in the repo root defines the brand-library prompt, asset targets, generation rules, and recommended future asset work.
- `public/brand/README.md` defines the brand imagery system, approval checklist, current site wiring, and current brand inventory.
- This file explains the folder structure for everything under `public`.

## Folder Structure

```text
public/
  README.md
  robots.txt
  file.svg
  globe.svg
  next.svg
  vercel.svg
  window.svg
  brand/
    README.md
    contact-sheet.png
    review.html
    masters/
      consoles/
      heroes/
      stamps/
    website/
    facebook/
    instagram/
    tiktok/
    linkedin/
    x/
```

## What Belongs Where

`public/brand/` is the controlled brand image library. Put reusable brand identity, profile, source-family, website-background, social-cover, and platform-native social assets here.

`public/brand/masters/` is for source-family images that future crops and platform variants can reuse. Current master families are `heroes/`, `stamps/`, and `consoles/`.

`public/brand/website/` is for app-wired website brand imagery, including the active homepage hero background and profile stamp.

`public/brand/facebook/`, `public/brand/instagram/`, `public/brand/tiktok/`, `public/brand/linkedin/`, and `public/brand/x/` hold platform-native exports.

`public/brand/contact-sheet.png` and `public/brand/review.html` are review artifacts for quickly comparing the generated brand set.

Root SVGs such as `file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, and `window.svg` are starter/static utility assets. Avoid adding new generated brand images directly to the `public/` root.

Next.js App Router icon files are not stored under `public`; they live in `src/app/favicon.ico`, `src/app/icon.png`, and `src/app/apple-icon.png`, generated from the profile stamp.

## Current Brand-Relevant Assets

```text
public/brand/README.md
public/brand/approval-log.md
public/brand/contact-sheet.png
public/brand/course-visual-notes.md
public/brand/review.html
public/brand/usage-copy.md
public/brand/masters/consoles/assessment-lab-01.png
public/brand/masters/consoles/certificate-proof-01.png
public/brand/masters/consoles/mastery-console-01.png
public/brand/masters/consoles/syllabus-builder-01.png
public/brand/masters/heroes/light-crisp-hero-01.png
public/brand/masters/heroes/light-crisp-hero-02.png
public/brand/masters/heroes/light-crisp-hero-03.png
public/brand/masters/stamps/mentor-mark-premium-01.png
public/brand/masters/stamps/mentor-mark-premium-02.png
public/brand/masters/stamps/mentor-mark-premium-03.png
public/brand/website/profile-background.png
public/brand/website/profile-stamp.png
public/brand/website/section-assessment-lab.png
public/brand/website/section-certificate-proof.png
public/brand/website/section-mastery-console.png
public/brand/website/section-syllabus-builder.png
public/brand/facebook/cover-background.png
public/brand/facebook/post-background.png
public/brand/facebook/profile-stamp.png
public/brand/instagram/post-background.png
public/brand/instagram/profile-background.png
public/brand/instagram/profile-stamp.png
public/brand/instagram/story-background.png
public/brand/tiktok/cover-background.png
public/brand/tiktok/profile-background.png
public/brand/tiktok/profile-stamp.png
public/brand/linkedin/company-cover-background.png
public/brand/linkedin/post-background.png
public/brand/linkedin/profile-stamp.png
public/brand/x/card-certificate-default.png
public/brand/x/card-course-default.png
public/brand/x/header-background.png
public/brand/x/post-background.png
public/brand/x/profile-stamp.png
```

## Current Site Wiring

- Homepage hero: `/brand/website/profile-background.png`
- Header, footer, and homepage badge stamp: `/brand/website/profile-stamp.png`
- Open Graph and Twitter preview image: `/brand/x/post-background.png`
- Browser/app icons: generated from the profile stamp and served from `src/app`

## Recommended Future Asset Buckets

The console master folder now exists. Future additions can extend it with course-specific and provider-neutral learning-product scenes:

```text
public/brand/masters/course-cards/
```

Recommended future files:

```text
public/brand/masters/course-cards/claude-course-neutral-01.png
public/brand/masters/course-cards/openai-course-neutral-01.png
public/brand/masters/course-cards/perplexity-course-neutral-01.png
public/brand/x/card-course-claude-neutral.png
public/brand/x/card-course-openai-neutral.png
public/brand/x/card-course-perplexity-neutral.png
```

These would support provider-topic courses without copying provider trade dress.

## Rules

- Do not move existing app-referenced assets unless the code references are updated in the same change.
- Generated brand-library assets should follow the `public/brand/` platform folder structure from `BrandImageLibrary.md`.
- Profile stamps stay circular-crop safe and provider-neutral.
- Hero and social backgrounds stay photoreal, premium, overlay-safe, and free of fake readable text.
- Avoid dumping one-off generated images directly into `public/` root.
