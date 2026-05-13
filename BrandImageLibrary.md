# AcademAI Brand Image Library Prompt

Use this prompt to generate and maintain a complete, project-specific brand image library for the AcademAI website.

## Project

- Website/project name: AcademAI
- Website domain: https://academai.app
- Repo: D:\Dev\AcademAI-Website
- Business/audience: AcademAI serves novice, slightly skilled, and intermediate AI enthusiasts who want structured self-directed learning, practical AI fluency, scenario practice, AI-generated study paths, durable progress, and certificates.
- Current hero image/vibe: Light, crisp Human Learning Lab scene with anonymous learner presence, laptop and notebook, blue/violet AI glow, premium slate/white workspace, and overlay-safe negative space.
- Brand tone: Premium, approachable, modern, human, technical, practical, confidence-building, provider-neutral, and mastery-oriented.
- Brand promise: Turn AI curiosity into practical mastery through guided learning, practice, progress, and proof.
- Brand operating idea: Learn. Practice. Track. Certify. Keep moving.
- Brand colors or visual cues: Slate and white base, AcademAI blue and violet learning accents, clean negative space, soft screen glow, practical learning tools, and premium console polish.
- Destination folder: D:\Dev\AcademAI-Website\public\brand

## Current Public Asset Structure

```text
public/
  README.md
  robots.txt
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

Use `public/brand/` for the controlled brand-library system. Local Next.js public assets are referenced from the site as `/brand/...`. App icons are generated from the profile stamp and live in `src/app/favicon.ico`, `src/app/icon.png`, and `src/app/apple-icon.png` because Next.js App Router serves those root icon URLs from `src/app`.

## Goal

Create project-specific image assets that complement the current AcademAI homepage hero and give AcademAI a stronger human-centered, learning-product visual identity across the website and major social platforms.

Use a Hybrid Brand Library with a Mentor Mark profile stamp and clean photoreal platform backgrounds.

## `public/brand/README.md` Structure

### Purpose

Make `public/brand/README.md` the source of truth for AcademAI brand imagery: what the vibe is, what assets exist, how future images should be generated, and how to approve them.

### Brand Core

AcademAI is a premium AI training console for learners who want practical fluency, structured mastery, durable progress, scenario practice, AI-generated study paths, and certificates without feeling buried in enterprise jargon.

### Balanced Trinity

- Human Learning Lab: real study/workspace presence, approachable learning, anonymous human cues, notebooks, laptops, and focused practice.
- Mastery Console: progress tracking, assessments, generated syllabi, certificates, and premium learning-console discipline.
- Mentor Mark: circular-crop-safe mentor/neural emblem for profile, favicon, avatar, and compact brand recognition.

### Anti-Slop Standard

Artistic freedom stays inside the Trinity. Technical execution stays disciplined: small source families, standard dimensions, no fake readable text, no watermark, no clutter, no unrelated scenes, no provider mimicry, and no one-off visual gimmicks.

### Quality Rules

Photorealistic, premium, overlay-safe, brand-coherent, no fake UI text, no logos, no stock-photo clutter, and no people as main subjects except anonymous/profile-stamp use.

### Asset System

Masters, website profile, Facebook, Instagram, TikTok, LinkedIn, and X. Keep the current source-family approach so each platform asset feels related instead of one-off.

### Prompt Framework

Use the reusable AcademAI prompt framework below, with fields already filled and placeholders only where future asset-specific choices are needed.

### Approval Checklist

Lane, use case, visual quality, technical sizing, negative space, no AI slop, continuity with source family, and provider neutrality.

### Current Inventory

The current file list from `public/brand`.

## Required Output

1. A main Mentor Mark profile stamp/profile image that works as the primary profile picture.
2. Clean photoreal background assets for:
   - Website
   - Facebook
   - Instagram
   - TikTok
   - LinkedIn
   - X / Twitter
3. Source-family masters that future platform crops can reuse.
4. A contact sheet preview and review page for fast visual approval.

## Direction

Use a Hybrid Brand Library approach:

- One strong profile stamp / profile image.
- A related family of platform-native photoreal backgrounds.
- Keep the assets visually unified, but compose them for each platform's crop and use case.
- Lead with Human Learning Lab, enrich with Mastery Console discipline, and keep Mentor Mark as the compact identity system.
- Keep the posture AcademAI-first and provider-neutral. The brand can communicate AI learning and practical AI fluency, but it must not mimic Anthropic, Claude, OpenAI, Perplexity, or any other provider's official marks, typography, or trade dress.

## Profile Stamp Rules

- Human-centered brand mark, not just an abstract background.
- Circular-crop safe.
- Strong at small profile-picture sizes.
- May imply mentorship, learning pathways, neural networks, open-book cues, progress, and academic mastery.
- Do not rely on AI-generated readable letters or words.
- No fake words, watermarks, slogans, or detailed typography.
- Should feel like a premium dimensional learning stamp, not a generic AI logo.

## Background Rules

- Clean photoreal backgrounds.
- No embedded text, logos, slogans, or watermarks.
- Leave negative space for future overlays.
- Use real-world scenes connected to AI learning, study, practice, progress tracking, syllabi, assessments, or certificates.
- Human presence is welcome, but keep people anonymous or secondary unless specifically requested.
- Avoid distorted hands, clutter, fake readable UI text, warped devices, official provider cues, and generic stock-photo energy.

## Folder Structure

```text
public/brand/
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

## Asset Targets

```text
public/brand/masters/stamps/mentor-mark-premium-01.png
public/brand/masters/stamps/mentor-mark-premium-02.png
public/brand/masters/stamps/mentor-mark-premium-03.png
public/brand/masters/heroes/light-crisp-hero-01.png
public/brand/masters/heroes/light-crisp-hero-02.png
public/brand/masters/heroes/light-crisp-hero-03.png

public/brand/website/profile-stamp.png
public/brand/website/profile-background.png

public/brand/facebook/profile-stamp.png
public/brand/facebook/cover-background.png
public/brand/facebook/post-background.png

public/brand/instagram/profile-stamp.png
public/brand/instagram/profile-background.png
public/brand/instagram/post-background.png
public/brand/instagram/story-background.png

public/brand/tiktok/profile-stamp.png
public/brand/tiktok/profile-background.png
public/brand/tiktok/cover-background.png

public/brand/linkedin/profile-stamp.png
public/brand/linkedin/company-cover-background.png
public/brand/linkedin/post-background.png

public/brand/x/profile-stamp.png
public/brand/x/header-background.png
public/brand/x/post-background.png
```

## Mastery Console Extension Assets

These extend the baseline brand library into product-section and social-card imagery for progress, assessments, syllabus generation, and certificates.

```text
public/brand/masters/consoles/mastery-console-01.png
public/brand/masters/consoles/assessment-lab-01.png
public/brand/masters/consoles/syllabus-builder-01.png
public/brand/masters/consoles/certificate-proof-01.png
public/brand/website/section-mastery-console.png
public/brand/website/section-assessment-lab.png
public/brand/website/section-syllabus-builder.png
public/brand/website/section-certificate-proof.png
public/brand/x/card-course-default.png
public/brand/x/card-certificate-default.png
```

Content support files:

```text
public/brand/usage-copy.md
public/brand/course-visual-notes.md
public/brand/approval-log.md
```

Next recommended additions:

- Course-specific social cards for the first public course set.
- A certificate preview card if certificate sharing becomes a product feature.
- A small image-map table that links site sections to the preferred brand assets.

## Reusable Prompt Framework

```text
Create a complete photoreal brand image asset for AcademAI.

Brand:
- Name: AcademAI
- Domain: https://academai.app
- Identity: Premium AI learning and mastery platform for practical AI fluency.
- Audience: Novice, slightly skilled, and intermediate AI enthusiasts.
- Vibe: Human Learning Lab with Mastery Console discipline and Mentor Mark brand recognition.
- Visual cues: slate and white base, blue and violet AI-learning accents, clean negative space, anonymous learner presence, laptops, notebooks, progress cues, study tools, and premium learning-console polish.
- Avoid: fake readable text, fake UI, fake logos, watermarks, clutter, unrelated scenes, generic stock-photo people, distorted hands, warped devices, official provider mimicry, and one-off gimmicks.

Asset:
- Platform/use case: [PLATFORM AND USE CASE]
- Orientation/dimensions: [TARGET DIMENSIONS]
- Composition needs: [NEGATIVE SPACE / CROP SAFETY / PROFILE CIRCLE / OVERLAY AREA]
- Source family lane: [Human Learning Lab / Mastery Console / Mentor Mark / Blend]
- Human presence: [NONE / ANONYMOUS HANDS / OVER-THE-SHOULDER / SILHOUETTE / PROFILE-STAMP FIGURE]

Generate a clean, premium, overlay-safe asset that feels connected to the AcademAI website and can live inside the same brand family as the current hero image and profile stamp. Do not include readable text, logos, slogans, provider trade dress, or watermarks.
```

## After Generation

- Save all final PNGs into the correct `public/brand` platform folders.
- Validate that every file exists, opens as an image, has nonzero size, and has sensible platform dimensions.
- Create or update `public/brand/contact-sheet.png`.
- Update `public/brand/review.html` when a new approval batch is generated.
- Update `public/brand/README.md` current inventory when assets are added, promoted, or retired.
- Do not move existing app-referenced assets unless code references are updated in the same change.

## Current Inventory

```text
public/brand/README.md
public/brand/approval-log.md
public/brand/contact-sheet.png
public/brand/course-visual-notes.md
public/brand/review.html
public/brand/usage-copy.md
public/brand/facebook/cover-background.png
public/brand/facebook/post-background.png
public/brand/facebook/profile-stamp.png
public/brand/instagram/post-background.png
public/brand/instagram/profile-background.png
public/brand/instagram/profile-stamp.png
public/brand/instagram/story-background.png
public/brand/linkedin/company-cover-background.png
public/brand/linkedin/post-background.png
public/brand/linkedin/profile-stamp.png
public/brand/masters/heroes/light-crisp-hero-01.png
public/brand/masters/heroes/light-crisp-hero-02.png
public/brand/masters/heroes/light-crisp-hero-03.png
public/brand/masters/consoles/assessment-lab-01.png
public/brand/masters/consoles/certificate-proof-01.png
public/brand/masters/consoles/mastery-console-01.png
public/brand/masters/consoles/syllabus-builder-01.png
public/brand/masters/stamps/mentor-mark-premium-01.png
public/brand/masters/stamps/mentor-mark-premium-02.png
public/brand/masters/stamps/mentor-mark-premium-03.png
public/brand/tiktok/cover-background.png
public/brand/tiktok/profile-background.png
public/brand/tiktok/profile-stamp.png
public/brand/website/profile-background.png
public/brand/website/profile-stamp.png
public/brand/website/section-assessment-lab.png
public/brand/website/section-certificate-proof.png
public/brand/website/section-mastery-console.png
public/brand/website/section-syllabus-builder.png
public/brand/x/card-certificate-default.png
public/brand/x/card-course-default.png
public/brand/x/header-background.png
public/brand/x/post-background.png
public/brand/x/profile-stamp.png
```

Brand-relevant site assets currently outside `public/brand`:

```text
src/app/favicon.ico
src/app/icon.png
src/app/apple-icon.png
```
