# GEO Quick Snapshot: AcademAI

**Audit date:** May 13, 2026
**Target:** https://academai.app
**Local repo:** D:\Dev\AcademAI-Website
**Skill used:** geo-seo-auditor

## Snapshot

The live site is crawlable and has a working `robots.txt` plus `sitemap.xml`, but it is not yet well-packaged for AI citation or entity understanding. The GEO quick audit scored the site at **76/100** for the basic technical pass, mainly because crawl access and a sitemap are present. The larger GEO readiness score is lower because the site has no JSON-LD, no canonical URLs, no `llms.txt`, duplicated metadata on several important routes, and production route drift for protected learning-product pages.

## Live Crawl Checks

| URL | Status | Notes |
| --- | ---: | --- |
| https://academai.app/ | 200 | Homepage resolves with title and description. |
| https://academai.app/robots.txt | 200 | Allows all crawlers and points to sitemap. |
| https://academai.app/sitemap.xml | 200 | 114 URLs detected; includes 95 lesson URLs. |
| https://academai.app/llms.txt | 404 | Missing. |
| https://academai.app/courses | 200 | Uses generic site metadata. |
| https://academai.app/paths | 200 | Uses generic site metadata. |
| https://academai.app/about | 200 | Uses generic site metadata. |
| https://academai.app/pricing | 200 | Uses generic site metadata. |
| https://academai.app/syllabus | 404 | Exists locally but not live. |
| https://academai.app/certificates | 404 | Exists locally but not live. |
| https://academai.app/courses/claude-101 | 200 | Course-specific title and description. |
| https://academai.app/courses/claude-101/lessons/0 | 200 | Public lesson preview resolves. |
| https://academai.app/courses/claude-101/lessons/1 | 200 | Live route resolves, while local source indicates non-preview lessons should require membership. |
| https://academai.app/account | 200 | Should not be promoted for AI/search discovery. |
| https://academai.app/api/progress | 401 | Expected API protection. |

## Tool Findings

| Check | Result |
| --- | --- |
| Quick audit score | 76/100, "good" technical baseline. |
| JSON-LD schema | 0 schema blocks found on the homepage. |
| Canonical URL | No canonical link detected on sampled pages. |
| `llms.txt` validation | Missing, status 404. |
| Homepage word count | 476 words. |
| Sitemap URL count | 114 URLs. |
| AI crawler access | Open through `User-agent: *` / `Allow: /`. |
| Images missing alt | 4 images flagged by tool; some may be intentionally decorative. |

## AI Crawler Access

Current `robots.txt`:

```txt
User-agent: *
Allow: /

Sitemap: https://academai.app/sitemap.xml
```

This allows the major AI/search crawlers checked by the skill, including `OAI-SearchBot`, `GPTBot`, `ChatGPT-User`, `ClaudeBot`, `Claude-User`, `Claude-SearchBot`, `PerplexityBot`, `Googlebot`, `GoogleOther`, and `Google-Extended`.

Current official guidance checked during the audit:

- OpenAI: `OAI-SearchBot` controls ChatGPT search inclusion, while `GPTBot` is for model training and `ChatGPT-User` is user-initiated browsing. Source: https://platform.openai.com/docs/bots
- Anthropic: `ClaudeBot`, `Claude-User`, and `Claude-SearchBot` are separate controls, and Anthropic says its bots honor robots.txt. Source: https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler
- Perplexity: `PerplexityBot` follows robots.txt for indexing. Source: https://www.perplexity.ai/help-center/en/articles/10354969-how-does-perplexity-follow-robots-txt
- Google AI features: AI Overviews and AI Mode use normal Google Search eligibility; Googlebot access is the Search control. Source: https://developers.google.com/search/docs/appearance/ai-features
- Google-Extended: controls use for future Gemini model training and some grounding use cases, not Google Search ranking or inclusion. Source: https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers

## Immediate Read

AcademAI is technically accessible, but AI systems do not yet get a curated, explicit map of the public learning product. The safest next implementation pass is to add a curated `public/llms.txt`, add Organization/WebSite/Course JSON-LD, fix production route drift for protected product surfaces, and tighten sitemap exposure so public course overview pages are discoverable while private/member-only surfaces are not over-promoted.
