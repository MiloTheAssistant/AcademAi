import type { LessonContent } from "../lessons";

const lessons: LessonContent[] = [
  {
    courseSlug: "introduction-to-agent-skills",
    moduleIndex: 0,
    title: "Introduction to Agent Skills Concept",
    estimatedMinutes: 9,
    content: `
<h2>What Are Agent Skills?</h2>
<p>Agent Skills are reusable markdown files that define how Claude should behave in specific contexts. Instead of re-explaining your standards, preferences, and procedures every session, you write them once as a Skill and Claude applies them automatically whenever the context calls for it.</p>

<h3>The Problem Skills Solve</h3>
<p>Without skills, every Claude Code session starts from zero context about how you want things done. You might find yourself repeatedly typing: "Use TypeScript strict mode," "Add JSDoc comments," "Follow our error handling pattern," "Write tests for each function." Skills encode these standing instructions so you never have to repeat them.</p>

<h3>How Skills Work</h3>
<p>When you send a message in Claude Code, the system scans your active skills and checks whether any of them should apply to the current context. Skills that match are automatically included in Claude's context — silently, without any action needed from you. The result is Claude that already knows your standards when it starts working.</p>

<h3>Skills vs. CLAUDE.md</h3>
<p>Both Skills and CLAUDE.md provide persistent instructions, but they serve different purposes:</p>
<ul>
  <li><strong>CLAUDE.md</strong> — always-on project context: architecture, commands, what to avoid</li>
  <li><strong>Skills</strong> — context-triggered instructions: activated when Claude detects relevant situations</li>
</ul>
<p>Think of CLAUDE.md as the general briefing and Skills as specialized playbooks for specific situations.</p>

<h3>Real-World Skill Examples</h3>
<ul>
  <li>A <strong>code-review skill</strong> that applies your team's security checklist whenever Claude reviews code</li>
  <li>A <strong>commit-message skill</strong> that enforces conventional commit format when writing commits</li>
  <li>A <strong>documentation skill</strong> that applies your style guide when Claude writes docs</li>
  <li>A <strong>migration skill</strong> that applies safe migration patterns when touching database code</li>
</ul>
`,
    keyTakeaways: [
      "Skills are reusable markdown files that define Claude's behavior in specific contexts",
      "They activate automatically based on context triggers — no manual invocation needed",
      "Skills complement CLAUDE.md: CLAUDE.md is always-on context; Skills are situational playbooks",
      "Common uses: code review standards, commit formats, style guides, and domain-specific procedures",
    ],
  },
  {
    courseSlug: "introduction-to-agent-skills",
    moduleIndex: 1,
    title: "Skill Structure and Markdown Format",
    estimatedMinutes: 11,
    content: `
<h2>Anatomy of a Skill File</h2>
<p>Skills are plain markdown files with an optional YAML frontmatter section. They live in your <code>.claude/skills/</code> directory. The structure is intentionally simple: frontmatter for metadata and triggers, body for the actual instructions.</p>

<h3>Basic Structure</h3>
<pre><code>---
name: Code Review
description: Standards for reviewing code quality and security
triggers:
  - keywords: ["review", "check", "audit", "LGTM"]
  - file_patterns: ["*.ts", "*.tsx"]
priority: high
---

# Code Review Standards

When reviewing code, evaluate the following in order of importance:

## Security
- Check for SQL injection, XSS, and CSRF vulnerabilities
- Verify authentication and authorization are applied
- Ensure secrets are never hardcoded

## Correctness
- Verify logic matches the stated intent
- Check for off-by-one errors and edge cases
- Confirm error paths are handled

## Maintainability
- Functions should do one thing
- Names should be descriptive and consistent
- Complex logic should have explanatory comments</code></pre>

<h3>Frontmatter Fields</h3>
<ul>
  <li><strong>name:</strong> Human-readable name for the skill (displayed in logs)</li>
  <li><strong>description:</strong> What the skill does (helps you and your team understand it)</li>
  <li><strong>triggers:</strong> Conditions that activate the skill (keywords, file patterns, task types)</li>
  <li><strong>priority:</strong> When multiple skills match, higher priority skills take precedence</li>
  <li><strong>always_active:</strong> Set to <code>true</code> to activate the skill for every interaction</li>
</ul>

<h3>Trigger Types</h3>
<p>Skills can be triggered by:</p>
<ul>
  <li><strong>Keywords</strong> in your message: <code>["review", "audit", "check"]</code></li>
  <li><strong>File patterns</strong> being accessed: <code>["*.sql", "migrations/*.ts"]</code></li>
  <li><strong>Task types</strong>: <code>["test_generation", "documentation", "refactor"]</code></li>
  <li><strong>Always active</strong>: no trigger needed, always included</li>
</ul>

<h3>Writing Effective Skill Bodies</h3>
<p>The body of a skill is read by Claude as instructions. Write it clearly and specifically. Use headers to organize distinct concerns. Use numbered lists for ordered steps and bullet lists for unordered criteria. Be as concrete as possible — "functions should be under 50 lines" is more actionable than "functions should be small."</p>
`,
    keyTakeaways: [
      "Skills use YAML frontmatter for metadata/triggers and markdown body for instructions",
      "Triggers can match on keywords, file patterns, task types, or always be active",
      "The skill body is read as instructions — write it clearly with headers, lists, and specific criteria",
      "Use priority to control which skill wins when multiple skills match the same context",
    ],
  },
  {
    courseSlug: "introduction-to-agent-skills",
    moduleIndex: 2,
    title: "Creating Your First Skill",
    estimatedMinutes: 12,
    content: `
<h2>Building a Skill From Scratch</h2>
<p>The best way to learn skills is to build one. In this module, we'll create a practical skill step by step — a commit message formatter that ensures your team's commits follow conventional commit format.</p>

<h3>Step 1: Identify the Repeated Instruction</h3>
<p>Think about instructions you find yourself typing to Claude repeatedly. Candidates for skillification are instructions that:</p>
<ul>
  <li>Apply in a specific, recognizable context</li>
  <li>Don't change often</li>
  <li>Would benefit everyone on the team</li>
</ul>
<p>For our example: "When writing commit messages, use conventional commit format: type(scope): description."</p>

<h3>Step 2: Create the Skills Directory</h3>
<pre><code>mkdir -p .claude/skills</code></pre>

<h3>Step 3: Write the Skill File</h3>
<pre><code># .claude/skills/conventional-commits.md
---
name: Conventional Commits
description: Ensures commit messages follow conventional commit format
triggers:
  - keywords: ["commit", "commit message", "git commit"]
priority: medium
---

# Commit Message Format

Always write commit messages in conventional commit format:

\`\`\`
type(scope): short description

[optional body]

[optional footer]
\`\`\`

## Types
- feat: new feature
- fix: bug fix
- docs: documentation only
- style: formatting, no logic change
- refactor: code change without feature or fix
- test: adding or fixing tests
- chore: build process, dependencies

## Rules
- Type and scope are lowercase
- Description is imperative mood ("add" not "added")
- Description is under 72 characters
- No period at end of description
- Body explains the *why*, not the *what*</code></pre>

<h3>Step 4: Test the Skill</h3>
<p>Start a Claude Code session and ask it to write a commit message. You should see the skill activate (check the session log with <code>/verbose</code>) and the commit message should follow conventional format automatically.</p>

<h3>Step 5: Iterate</h3>
<p>After using the skill for a few days, refine it based on what you observe. If Claude is misapplying it in certain contexts, tighten the triggers. If it's missing cases you care about, add more rules to the body.</p>
`,
    keyTakeaways: [
      "Start by identifying instructions you type repeatedly — those are good skill candidates",
      "Create .claude/skills/ directory and add markdown files with YAML frontmatter",
      "Test with /verbose to confirm the skill is activating as expected",
      "Iterate based on observation — refine triggers and rules after real-world use",
    ],
  },
  {
    courseSlug: "introduction-to-agent-skills",
    moduleIndex: 3,
    title: "Skill Triggers and Context Matching",
    estimatedMinutes: 11,
    content: `
<h2>Fine-Tuning When Skills Activate</h2>
<p>Triggers are the mechanism that determines which skills apply to any given Claude interaction. Well-designed triggers mean the right skills apply at the right time without false positives (activating when they shouldn't) or false negatives (not activating when they should).</p>

<h3>Keyword Triggers</h3>
<p>Keywords are the simplest and most commonly used trigger type. The skill activates when any of the specified keywords appear in your message:</p>
<pre><code>triggers:
  - keywords: ["test", "spec", "unit test", "integration test"]</code></pre>
<p>Be thoughtful about keyword breadth. "test" is a very common word and might match unintended messages. "write tests for" or "generate unit tests" are more specific and less likely to cause false positives.</p>

<h3>File Pattern Triggers</h3>
<p>File patterns activate a skill when Claude is working with files that match the glob pattern:</p>
<pre><code>triggers:
  - file_patterns: ["migrations/*.sql", "db/schema.rb", "**/migrate/*.py"]</code></pre>
<p>This is powerful for domain-specific skills. A database migration skill that activates only when Claude is touching migration files is much safer than one that activates on all SQL files.</p>

<h3>Combining Triggers</h3>
<p>Multiple triggers in an array use OR logic — the skill activates if <em>any</em> trigger matches. You can also define trigger groups for AND logic:</p>
<pre><code>triggers:
  - keywords: ["security"]
    file_patterns: ["auth/**", "middleware/**"]</code></pre>
<p>This group activates only when BOTH the keyword "security" appears AND Claude is working with auth or middleware files — much more precise.</p>

<h3>Always-Active Skills</h3>
<p>Some skills should always be active — your general coding standards, for example:</p>
<pre><code>always_active: true</code></pre>
<p>Use this sparingly. Too many always-active skills crowd Claude's context and can conflict. Reserve <code>always_active</code> for truly universal standards.</p>

<h3>Debugging Trigger Behavior</h3>
<p>Run Claude Code with <code>/verbose</code> or check session logs to see which skills activated for each interaction. This is invaluable for debugging unexpected behavior and fine-tuning trigger conditions.</p>
`,
    keyTakeaways: [
      "Keyword triggers activate on message content; prefer specific phrases over single common words",
      "File pattern triggers activate based on which files Claude is accessing",
      "Combine keyword and file pattern triggers with AND logic for precise activation",
      "Use always_active sparingly — too many crowd context; use /verbose to debug trigger behavior",
    ],
  },
  {
    courseSlug: "introduction-to-agent-skills",
    moduleIndex: 4,
    title: "Sharing Skills Across Teams",
    estimatedMinutes: 10,
    content: `
<h2>Making Skills a Team Resource</h2>
<p>Skills become most valuable when they're shared across a team. Instead of each developer maintaining their own prompting habits, team skills encode collective knowledge — your code standards, review criteria, architectural decisions — in a form everyone benefits from automatically.</p>

<h3>Version Control Your Skills</h3>
<p>The most important step: commit <code>.claude/</code> to your project's git repository. This means:</p>
<ul>
  <li>Everyone on the team uses the same skills automatically when they clone the repo</li>
  <li>Skill changes go through the same review process as code changes</li>
  <li>You have a full history of how your skills evolved</li>
  <li>New team members get the full skill stack immediately on first checkout</li>
</ul>

<h3>Skills as Living Documentation</h3>
<p>Well-written skills are documentation that actually gets used. Your code review skill describes your team's review standards. Your architecture skill explains your architectural patterns. Your testing skill defines what good test coverage looks like. Unlike a wiki that people forget to read, skills are consulted automatically every time they're relevant.</p>

<h3>Organizing a Team Skill Library</h3>
<p>As your skill library grows, organize it by domain:</p>
<pre><code>.claude/skills/
  code-quality/
    review-standards.md
    testing-standards.md
    naming-conventions.md
  git/
    commit-messages.md
    pr-descriptions.md
  domain/
    database-migrations.md
    api-design.md
    security-review.md</code></pre>

<h3>Skill Ownership and Maintenance</h3>
<p>Assign owners to critical skills — the person or team responsible for keeping them up to date. Stale skills that reflect outdated standards are worse than no skills, because they give Claude incorrect guidance. Review skills periodically, especially after architectural changes or process updates.</p>

<h3>Contributing New Skills</h3>
<p>Establish a lightweight process for adding team skills: propose a skill via PR, include an example of the situation it addresses, get team review, merge. This keeps the skill library high quality and aligned with actual team needs rather than accumulating every individual preference.</p>
`,
    keyTakeaways: [
      "Commit .claude/ to git so skills are shared across the team and go through normal code review",
      "Well-written skills are living documentation — they're consulted automatically when relevant",
      "Organize skills by domain as the library grows; assign owners for critical skills",
      "Establish a PR process for adding team skills to maintain quality and alignment",
    ],
  },
  {
    courseSlug: "introduction-to-agent-skills",
    moduleIndex: 5,
    title: "Best Practices for Skill Development",
    estimatedMinutes: 10,
    content: `
<h2>Writing Skills That Work Well</h2>
<p>A skill that gives vague guidance or fires in the wrong contexts is worse than no skill. These best practices distill what separates effective skills from frustrating ones.</p>

<h3>Be Specific, Not General</h3>
<p>Vague skill instructions produce vague behavior. Compare:</p>
<ul>
  <li><em>Vague:</em> "Write good tests."</li>
  <li><em>Specific:</em> "Tests must cover: happy path, at least 2 edge cases, and all documented error conditions. Use describe/it blocks. Mock external dependencies with jest.mock()."</li>
</ul>
<p>The more concrete your skill instructions, the more consistently Claude applies them.</p>

<h3>One Concern Per Skill</h3>
<p>A skill that tries to cover code review, commit messages, and testing standards all at once is hard to maintain and may conflict with itself. Keep each skill focused on a single concern. This makes skills easier to understand, easier to update, and easier to debug when something goes wrong.</p>

<h3>Test Skills Deliberately</h3>
<p>After writing a new skill, test it with several different inputs to verify it activates correctly and produces the expected behavior. Test edge cases: does it activate when you don't want it to? Does it fail to activate in cases where it should?</p>

<h3>Prefer Additive Instructions</h3>
<p>Instructions that tell Claude what <em>to do</em> are more effective than instructions that tell Claude what <em>not to do</em>. "Use async/await" works better than "don't use callbacks." Positive instructions give Claude a clear target; negative instructions only define a constraint.</p>

<h3>Keep Skills Current</h3>
<p>Schedule a quarterly review of your skill library. Remove skills that are no longer relevant. Update skills that reflect outdated standards. A lean, accurate skill library is more effective than a large, stale one. Treat skills like any other code asset: they require maintenance.</p>

<h3>Document the Why</h3>
<p>Add comments in your skill body explaining <em>why</em> a standard exists, not just what it is. "Avoid raw SQL queries — use the ORM (prevents SQL injection and simplifies migrations)" is more useful than just "use the ORM." Context helps Claude apply the standard correctly in edge cases.</p>
`,
    keyTakeaways: [
      "Specific, concrete instructions produce consistent behavior — avoid vague guidance",
      "One concern per skill — focused skills are easier to maintain and debug",
      "Prefer additive instructions (what to do) over restrictive ones (what not to do)",
      "Review and prune your skill library quarterly; stale skills mislead Claude",
    ],
  },
];

export default lessons;
