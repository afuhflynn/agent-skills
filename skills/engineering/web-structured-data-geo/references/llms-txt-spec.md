# llms.txt specification (web-structured-data-geo)

Read this when generating llms.txt / llms-full.txt. One level deep from SKILL.md.

Source: llmstxt.org (v2, updated 2026-08-10).

## Format

File at `/llms.txt` (or any subpath covering pages under that path):

```
# Title                       — H1, required
> Short summary blockquote    — optional, one paragraph

Optional details sections.

## Section name                — H2 file lists
- [Link title](url): note     — required link + optional note
- [Link title](url)
```

## llms-full.txt

Convention (not part of the proposal): full text of all material in one document, for offline indexing or large-context models.

## Link relations

- `rel="describedby"` → points to the llms.txt covering the page.
- `rel="alternate" type="text/markdown"` → points to a markdown version of the page.

## Reality check

No major AI platform has confirmed using llms.txt for search visibility; Google explicitly says it's not necessary for AI Overviews. Treat it as a low-risk experiment, not a ranking signal. Its real value is agent functionality (discovery), not search discovery.
