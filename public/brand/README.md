# AcademAI Brand Image Library

## Purpose

Make this the source of truth for AcademAI brand imagery: what the vibe is, what assets exist, how future images should be generated, and how to approve them.

This document is written for this repo:

```txt
D:\Dev\AcademAI-Website
```

Primary asset destination:

```txt
public/brand
```

## Brand Core

AcademAI is a premium AI training console for learners who want practical fluency, structured mastery, durable progress, scenario practice, AI-generated study paths, and certificates without feeling buried in enterprise jargon.

Core promise:

> Turn AI curiosity into practical mastery through guided learning, practice, progress, and proof.

Operating idea:

> Learn. Practice. Track. Certify. Keep moving.

The imagery should carry the **Human Learning Lab** direction: provider-neutral, premium, approachable, and disciplined. It should feel like a focused modern learning environment where real people build confidence with AI tools, not a generic futuristic tech wallpaper.

## Balanced Trinity

Artistic freedom stays inside this trinity. Future images can lean harder into one lane, but they should not leave the system.

### Human Learning Lab

The primary lane. Warm, approachable, practical, and learner-centered.

Use for:

- Website hero backgrounds
- Social post backgrounds
- Beginner and intermediate learning campaigns
- Human-centered brand credibility

Visual signals:

- Hands, notebooks, laptops, tablets, and clean desks
- Over-the-shoulder learning moments
- Soft daylight with blue and violet AI accent light
- Practical study environments
- Clear negative space for overlays

### Mastery Console

The systems lane. Premium, technical, focused, and progress-oriented.

Use for:

- Progress, assessment, syllabus, and certificate visuals
- Membership and paid mastery campaign assets
- Website sections about practice, tracking, and outcomes
- More technical or advanced learning visuals

Visual signals:

- Clean learning dashboards without readable fake UI text
- Abstract progress arcs, neural-map glow, and structured study surfaces
- Slate base with blue/violet highlight energy
- Calm command-center composition
- Tools that imply focus and measurable progress

### Mentor Mark

The profile and emblem lane. Human-guided, academic, compact, and memorable.

Use for:

- Profile stamps
- App/icon surfaces
- Avatar-safe social images
- Small-format brand recognition

Visual signals:

- Mentor + neural mark concept
- Abstract human guide silhouette
- Learning pathways and open-book cues
- Circular-crop-safe composition
- Premium dimensional stamp treatment

## Anti-Slop Standard

Artistic freedom stays inside the Trinity. Technical execution stays disciplined: small source families, standard dimensions, no fake readable text, no watermark, no clutter, no unrelated scenes, no one-off visual gimmicks.

Every generated image should feel like it belongs to AcademAI and could sit next to the current homepage hero, social previews, and profile stamp without breaking the brand.

## Quality Rules

- Photorealistic, except profile stamps may be premium dimensional emblems.
- Premium and plausible.
- Overlay-safe with usable negative space.
- Brand-coherent with slate, white, blue, and violet visual cues.
- No fake readable UI text.
- No embedded logos, slogans, or brand names.
- No stock-photo clutter.
- No distorted hands, warped devices, or unreadable interface panels.
- No people as main subjects except anonymous/profile-stamp use.
- No provider trade dress, official marks, or Anthropic/Claude/OpenAI/Perplexity mimicry.
- Profile stamps must be circular-crop safe and readable at small sizes.

## Asset System

Use the current source-family approach:

- **Masters family:** future source images that feed platform crops. Keep source families small and reusable instead of creating unrelated one-offs.
- **Profile stamp family:** Mentor Mark assets for profile, favicon, avatar, and compact brand recognition.
- **Website profile family:** wide Human Learning Lab backgrounds for hero and website surfaces.
- **Square workspace family:** square and portrait post crops from clean learning-workspace scenes.
- **Vertical learning family:** story/reel crops with center-safe overlay space.
- **Slim cover family:** LinkedIn and X cover crops derived from wide source images.

Platform folders:

```txt
public/brand/
  masters/
  website/
  facebook/
  instagram/
  tiktok/
  linkedin/
  x/
```

Expected platform assets:

```txt
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

## Prompt Framework

Use this prompt when generating additional AcademAI brand imagery. Keep the filled AcademAI fields intact and only change the future asset-specific choices.

```text
I need to create a project-specific photoreal brand image asset for AcademAI.

Project:
- Website/project name: AcademAI
- Website domain: academai.app
- Repo path: D:\Dev\AcademAI-Website
- Destination folder: D:\Dev\AcademAI-Website\public\brand
- Business/location/audience: AcademAI serves novice, slightly skilled, and intermediate AI enthusiasts who want structured self-directed learning, practical AI fluency, scenario practice, AI-generated study paths, durable progress, and certificates.
- Current hero image/vibe: Human Learning Lab scene with anonymous learner presence, laptop and notebook, blue/violet AI glow, premium slate/white workspace, and overlay-safe negative space.
- Brand tone: Premium, approachable, modern, human, technical, practical, confidence-building, mastery-oriented.
- Brand colors or visual cues: Slate and white base, blue and violet AI-learning accents, clean negative space, soft screen glow, practical learning tools, premium console polish.

Goal:
Create an image that complements the current AcademAI Human Learning Lab source family and strengthens AcademAI's provider-neutral learning brand across the website and social platforms.

Approved visual trinity:
- Human Learning Lab: approachable study/workspace scenes, anonymous human presence, practical learning.
- Mastery Console: structured progress, assessments, certificates, syllabus, premium training-console polish.
- Mentor Mark: circular-crop-safe mentor/neural emblem for small-format brand recognition.

Asset-specific choices:
- Asset type: [PROFILE STAMP / WEBSITE BACKGROUND / FACEBOOK COVER / INSTAGRAM POST / TIKTOK COVER / LINKEDIN COVER / X HEADER / OTHER]
- Target lane: [HUMAN LEARNING LAB / MASTERY CONSOLE / MENTOR MARK / BLEND]
- Target platform and crop: [PLATFORM + DIMENSIONS OR ASPECT RATIO]
- Main scene: [DESCRIBE THE REAL-WORLD SCENE OR EMBLEM]
- Negative space: [WHERE OVERLAY SPACE SHOULD BE LEFT]
- Human presence: [NONE / ANONYMOUS HANDS / OVER-THE-SHOULDER / SILHOUETTE / PROFILE-STAMP FIGURE]

Profile stamp rules, if applicable:
- Human-centered brand mark, not just an abstract background.
- Circular-crop safe.
- Strong at small profile-picture sizes.
- Can imply mentorship, learning pathways, neural networks, progress, and academic mastery.
- Do not rely on readable generated letters or words.
- No fake words, watermarks, slogans, or detailed typography.
- Should feel like a premium dimensional emblem or brand stamp.

Background rules, if applicable:
- Clean photoreal background.
- No embedded text, logos, slogans, or watermarks.
- Leave usable negative space for future overlays.
- Use real-world scenes connected to AI learning, study, practice, progress tracking, syllabi, assessments, or certificates.
- Human presence is welcome, but avoid identifiable portraits unless explicitly requested.

Avoid:
Fake readable UI text, fake logos, watermarks, clutter, distorted hands, warped devices, random futuristic panels, unrelated scenes, provider brand mimicry, generic stock-photo energy, one-off visual gimmicks, cartoon/vector style.

Output:
Save the final PNG in the correct `public/brand` platform folder. Validate that the file exists, opens as an image, has nonzero size, and has sensible platform dimensions.
```

## Approval Checklist

Before approving a new asset, check:

- **Lane:** Does it clearly fit Human Learning Lab, Mastery Console, Mentor Mark, or an intentional blend?
- **Use case:** Is it composed for the intended website or platform placement?
- **Visual quality:** Does it look photorealistic or premium-emblem quality, plausible, and non-generic?
- **Technical sizing:** Does it have the expected platform dimensions or crop behavior?
- **Negative space:** Is there room for future overlays where needed?
- **No AI slop:** No fake readable text, no watermark, no distorted hands, no warped devices, no random UI nonsense.
- **Continuity:** Does it feel connected to the current source family and existing hero?
- **Provider neutrality:** Does it avoid official provider logos, visual mimicry, and trade dress?

## Current Inventory

```txt
public/brand/README.md
public/brand/contact-sheet.png
public/brand/review.html
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
public/brand/masters/stamps/mentor-mark-premium-01.png
public/brand/masters/stamps/mentor-mark-premium-02.png
public/brand/masters/stamps/mentor-mark-premium-03.png
public/brand/tiktok/cover-background.png
public/brand/tiktok/profile-background.png
public/brand/tiktok/profile-stamp.png
public/brand/website/profile-background.png
public/brand/website/profile-stamp.png
public/brand/x/header-background.png
public/brand/x/post-background.png
public/brand/x/profile-stamp.png
```

## Current Site Wiring

- Homepage hero uses `/brand/website/profile-background.png`, currently promoted from `masters/heroes/light-crisp-hero-02.png`.
- Homepage hero badge uses `/brand/website/profile-stamp.png`, currently promoted from `masters/stamps/mentor-mark-premium-02.png`.
- Open Graph and Twitter previews use `/brand/x/post-background.png`, cropped from the promoted light-crisp hero source family.
- App icons are generated from `/brand/website/profile-stamp.png` and served by the Next.js App Router as `src/app/favicon.ico`, `src/app/icon.png`, and `src/app/apple-icon.png`.
