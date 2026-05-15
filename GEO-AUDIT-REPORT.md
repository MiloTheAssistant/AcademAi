# GEO Audit Report: AcademAI

**Audit date:** May 13, 2026
**Target:** https://academai.app
**Local repo:** D:\Dev\AcademAI-Website
**Business type:** AI education and premium learning platform
**Pages analyzed:** Homepage, robots.txt, sitemap.xml, llms.txt, courses, paths, about, pricing, syllabus, certificates, representative course pages, representative lesson pages, account, and API protection.

## Executive Summary

AcademAI has a solid crawl-access baseline: production responds on the core public pages, `robots.txt` allows crawlers, and `sitemap.xml` is live. The largest GEO gaps are structural: no JSON-LD schema, no canonical URLs, no `llms.txt`, duplicated metadata on important non-course pages, production route drift for `/syllabus` and `/certificates`, and a sitemap that promotes many lesson URLs without clearly separating public previews from member-only learning content.

The recommended approach is not keyword stuffing or thin SEO copy. AcademAI should improve machine-readable trust and navigation: curated `llms.txt`, page-specific metadata, public/private sitemap policy, Organization/WebSite/Course schema, and stronger self-contained answer blocks on course and path pages.

## Score Breakdown

| Category | Score | Weight | Notes |
| --- | ---: | ---: | --- |
| AI citability and visibility | 55 | 25% | Crawler access is open, but citability scores were low and `llms.txt` is missing. |
| Brand authority and entity signals | 35 | 20% | No Organization schema, no `sameAs`, and no verified third-party entity footprint in the automated scan. |
| Content quality and E-E-A-T | 62 | 20% | Course catalog is substantive, but trust, authorship, source policy, and original proof are underdeveloped. |
| Technical foundations | 72 | 15% | Robots and sitemap exist; canonical URLs are missing and live route drift exists. |
| Structured data | 0 | 10% | No JSON-LD detected on sampled live pages. |
| Platform optimization | 65 | 10% | Open to major AI/search crawlers, but lacks AI-readable site map and page-level answer structure. |

**Composite GEO readiness:** 51/100
**Technical quick audit:** 76/100

## Findings

### Critical

None found. The public site is not globally blocked from crawlers and the core homepage does not return a server error.

### High

**No JSON-LD schema detected**

The quick audit found zero `application/ld+json` blocks. This weakens entity understanding for AcademAI as a learning platform and leaves course pages without structured Course semantics.

Recommended implementation:

- Add a small JSON-LD helper that safely serializes schema with `JSON.stringify(...).replace(/</g, "\\u003c")`, matching the local Next.js JSON-LD guidance.
- Add `Organization` and `WebSite` schema at the root/home level.
- Add page-specific `Course` and `BreadcrumbList` schema on course detail pages.

**Production route drift for `/syllabus` and `/certificates`**

Both routes exist in the local source tree but return 404 on production. The homepage/footer links include these product concepts, and the local app has protected pages for them. A 404 creates a poor user and crawler signal.

Recommended implementation:

- Decide whether these should be public teaser pages with sign-in CTAs or fully protected routes.
- If public teaser pages: make the live routes return 200 with crawlable summary content and no private data.
- If fully protected: remove them from public navigation and keep them out of `llms.txt` and sitemap.

**Sitemap promotes 95 lesson URLs**

The live sitemap has 114 URLs, including 95 lesson URLs. Local source protects non-preview lesson content after module 0, but live checks showed `/courses/claude-101/lessons/1` returns 200. That mismatch creates uncertainty about whether paid lesson bodies are intentionally public.

Recommended implementation:

- Include course overview pages and public preview lesson pages in sitemap.
- Exclude member-only lesson URLs, account routes, progress routes, API routes, checkout/portal routes, and any private certificate/syllabus experiences.
- If some lessons are intentionally public, document that policy and keep the sitemap aligned with it.

### Medium

**Missing `llms.txt`**

`https://academai.app/llms.txt` returns 404. The skill-generated draft included private or utility pages (`/progress`, `/sign-in`, protected product routes) and long concatenated anchor labels, so it should be manually curated before publishing.

Recommended implementation:

- Add `public/llms.txt` only after review.
- Keep it factual and navigational.
- Include public pages only: home, courses index, learning paths, pricing, about, and public course overview URLs.
- Exclude account, APIs, progress, protected syllabus/certificates, and paid lesson bodies.

**Canonical URLs are missing**

No sampled live pages exposed a canonical link. This is especially relevant because the site has category query URLs, route variants, and course pages.

Recommended implementation:

- Add `alternates.canonical` to root metadata and page-level metadata where routes need explicit canonical URLs.
- Set course canonical URLs to `/courses/[slug]`.
- Avoid canonicalizing filtered category URLs as separate primary pages unless they are intentionally indexable.

**Metadata is too generic on major pages**

Homepage metadata is present, but `/courses`, `/paths`, `/about`, and `/pricing` all use the same generic title and description. Course detail pages have better route-level metadata.

Recommended implementation:

- Add page-specific metadata to courses, paths, about, pricing, syllabus, and certificates.
- Make each page description self-contained: what the page offers, who it is for, and why it matters.

**Citability scores are low**

The citability tool reported low averages: homepage 25, courses 25.5, paths 20, about 35.5. Course detail pages returned 0 analyzable blocks in the script, likely because the content structure is not easy for that scraper to segment into quote-ready passages.

Recommended implementation:

- Add concise answer blocks near the top of key pages, using plain text headings and paragraphs that can stand alone in AI answers.
- Give courses clear outcomes, prerequisites, audience, module count, estimated time, and source/trust notes in extractable text.
- Avoid hiding key meaning only in dense cards or UI labels.

### Low

**Image alt text needs review**

The quick audit flagged four images without alt text. Some are likely decorative, which is acceptable, but logo/profile stamp usage inside links should have meaningful accessible text somewhere in the link context.

Recommended implementation:

- Keep decorative backgrounds as `alt=""`.
- Use meaningful alt text or adjacent accessible labels for brand marks used as navigation or identity signals.

**Brand/entity footprint needs human verification**

The automated brand scanner found no confirmed Wikipedia or Wikidata entity. That is not automatically a defect for a new independent learning product, but it means schema and owned profiles matter more.

Recommended implementation:

- Add only real `sameAs` links for profiles AcademAI actually owns.
- Do not invent reviews, awards, memberships, press, or third-party profiles.
- Build authority through original training content, transparent source notes, and consistent brand profiles.

## `llms.txt` Draft

Use `llms-draft.txt` in this repo as the curated draft. It intentionally excludes account pages, APIs, progress, protected syllabus/certificates, and paid lesson bodies.

Implementation target, when approved: `public/llms.txt`.

## 30-Day GEO Improvement Plan

**Week 1: Crawl and metadata foundation**

- Add curated `public/llms.txt`.
- Add page-specific metadata and canonical URLs for home, courses, paths, about, pricing, and course detail pages.
- Fix live route policy for `/syllabus` and `/certificates`.
- Tighten sitemap output to public, intentional URLs only.

**Week 2: Structured data**

- Add `Organization` and `WebSite` JSON-LD.
- Add `Course` and `BreadcrumbList` JSON-LD for course detail pages.
- Validate representative pages with Schema Markup Validator and Google Rich Results Test.

**Week 3: Citability and content clarity**

- Add answer-ready summary sections to home, courses, paths, about, and priority course pages.
- Add audience, outcomes, prerequisites, estimated time, and proof/source notes to course pages in plain text.
- Improve internal linking from paths to course pages and from course pages back to role-based paths.

**Week 4: Entity and platform readiness**

- Add real `sameAs` links for owned profiles once confirmed.
- Publish a short public methodology/about section explaining AcademAI's independent status and course development approach.
- Re-run the GEO skill audit and compare scores, route statuses, schema count, sitemap policy, and citability scores.

## Verification Performed

| Test | Result |
| --- | --- |
| `geo_quick_audit.py https://academai.app --pretty` | Passed; quick score 76/100. |
| `llmstxt_generator.py https://academai.app validate` | Passed; confirmed missing `llms.txt` with 404. |
| `llmstxt_generator.py https://academai.app generate` | Passed; generated draft required manual curation. |
| `citability_scorer.py` on requested pages | Passed; low scores recorded for public pages. |
| `brand_scanner.py "AcademAI" academai.app` | Passed; no confirmed Wikipedia/Wikidata entity. |
| Live route checks | Passed; no 5xx found. `/syllabus` and `/certificates` returned 404. |
| AI crawler guidance verification | Passed using official/current OpenAI, Anthropic, Perplexity, and Google sources. |
| Local Next.js docs check | Completed for metadata, JSON-LD, robots, sitemap, and AI-agent guidance. |
| `npm run lint`, `npm run test`, `npm run build` | Not run; this pass added audit artifacts only and did not implement app code changes. |

## Sources Checked

- OpenAI crawlers: https://platform.openai.com/docs/bots
- Anthropic crawlers: https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler
- Perplexity robots behavior: https://www.perplexity.ai/help-center/en/articles/10354969-how-does-perplexity-follow-robots-txt
- Google AI features: https://developers.google.com/search/docs/appearance/ai-features
- Google common crawlers and Google-Extended: https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers
- Google robots.txt guide: https://developers.google.com/search/docs/crawling-indexing/robots/intro
- Local Next.js docs: `node_modules/next/dist/docs/`

## Assumptions

- The audit target is production `https://academai.app`.
- The local source of truth is `D:\Dev\AcademAI-Website`.
- AcademAI wants visibility in ChatGPT, Claude, Perplexity, Gemini, and Google AI Overview/Search surfaces.
- Training-crawler access is currently allowed by policy because `robots.txt` allows all agents. If that policy changes, update robots controls intentionally per crawler.
