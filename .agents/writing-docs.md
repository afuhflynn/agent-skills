# Writing docs pages

Every skill in `engineering/` and `productivity/` has a human-facing **docs page** at `docs/<bucket>/<skill-name>.md`. It is published at `https://skills.sh/afuhflynn/agent-skills/skills/<bucket>/<skill-name>`; the URL tracks the name. The page is not the skill and not a copy of `SKILL.md`. Only promoted buckets ship docs pages; non-promoted buckets get no page.

Act whenever a promoted skill is added, renamed, or has its behaviour changed: create or re-sync its docs page.

Because these pages are published, every link is absolute - never a repo-relative path.

## Page structure

Each docs page should contain:

- **Quickstart** - how to install the skill
- **What it does** - one or two paragraphs, lead with the one-sentence job
- **When to reach for it** - invocation mode and trigger boundary
- **Where it fits** - role in the skill ecosystem
