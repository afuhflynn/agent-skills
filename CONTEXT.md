# Agent Skills

A collection of agent skills (slash commands and behaviors) loaded by coding agents. Skills are organized into buckets and consumed by per-repo configuration.

## Language

**Skill**:
A reusable instruction set loaded into an agent harness. Each skill is a folder with a `SKILL.md` file that defines its name, description, invocation mode, and behavior.

**Promoted bucket**:
A bucket (`engineering/`, `productivity/`) whose skills are registered in `.claude-plugin/plugin.json` and listed in the top-level `README.md` and docs pages.

**User-invoked skill**:
A skill reachable only by the human typing its name. Has `disable-model-invocation: true` in frontmatter.

**Model-invoked skill**:
A skill reachable by the model or the human. The default mode - no `disable-model-invocation` flag.

**Agent harness**:
The runtime that loads, discovers, and invokes skills from plugin registration. Examples: Claude Code's built-in harness, skills.sh's harness.

## Relationships

- A **Promoted bucket** contains many **Skills**
- A **Skill** is either **User-invoked** or **Model-invoked**
- The **Agent harness** discovers skills via `.claude-plugin/plugin.json`
