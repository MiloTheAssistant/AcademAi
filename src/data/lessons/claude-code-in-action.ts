import type { LessonContent } from "../lessons";

const lessons: LessonContent[] = [
  {
    courseSlug: "claude-code-in-action",
    moduleIndex: 0,
    title: "Introduction to Claude Code",
    estimatedMinutes: 10,
    content: `
<h2>What Is Claude Code?</h2>
<p>Claude Code is Anthropic's agentic coding tool — a command-line interface that gives Claude direct access to your local development environment. Unlike chatting with Claude in a browser, Claude Code can read your files, run commands, execute tests, and make edits directly in your codebase.</p>

<h3>How It Differs from Claude.ai</h3>
<p>In the claude.ai chat interface, you and Claude exchange messages. You paste code in, Claude responds with suggestions, you copy them out and apply them yourself. Claude Code removes that friction entirely. You describe a task, and Claude reads the relevant files, reasons about the codebase, makes changes, runs tests, and iterates — all autonomously within your project.</p>
<p>This makes Claude Code fundamentally different in capability. It's not a smarter autocomplete; it's closer to a junior developer that can independently complete multi-step coding tasks.</p>

<h3>Key Use Cases</h3>
<ul>
  <li><strong>Feature implementation:</strong> "Add rate limiting to the API endpoints" — Claude reads your codebase, implements the feature, and writes tests</li>
  <li><strong>Bug fixing:</strong> Paste in an error and stack trace; Claude traces through the code to find and fix the root cause</li>
  <li><strong>Refactoring:</strong> "Convert these callbacks to async/await across the entire codebase"</li>
  <li><strong>Code review:</strong> "Review this PR diff for security issues and performance problems"</li>
  <li><strong>Codebase Q&A:</strong> "How does the authentication middleware work?" — Claude reads the relevant files and explains</li>
</ul>

<h3>The Agentic Loop</h3>
<p>Claude Code operates in a loop: it reads context, plans a course of action, takes a step (reads a file, runs a command, makes an edit), observes the result, and repeats. This loop continues until the task is complete or Claude needs input from you. Understanding this loop helps you work with Claude Code effectively — you're guiding an agent, not just asking questions.</p>

<h3>Safety Model</h3>
<p>Claude Code asks for permission before taking actions that could have significant consequences — deleting files, running scripts, making large changes. You control how much autonomy Claude has. For routine coding tasks, you can approve actions in bulk; for sensitive operations, Claude will always pause and ask.</p>
`,
    keyTakeaways: [
      "Claude Code is a CLI that gives Claude direct access to your files, terminal, and codebase",
      "It operates as an agent in a loop: read context, plan, act, observe, repeat",
      "Key use cases include feature implementation, bug fixing, refactoring, and codebase Q&A",
      "Claude Code asks permission before potentially significant actions — you control its autonomy",
    ],
  },
  {
    courseSlug: "claude-code-in-action",
    moduleIndex: 1,
    title: "Setting Up Claude Code in Your Environment",
    estimatedMinutes: 12,
    content: `
<h2>Installing and Configuring Claude Code</h2>
<p>Claude Code is distributed as an npm package and runs in your terminal. Setup typically takes under five minutes on any modern development machine.</p>

<h3>Prerequisites</h3>
<ul>
  <li>Node.js 18 or higher</li>
  <li>npm or yarn</li>
  <li>An Anthropic account with API access (claude.ai Pro or Anthropic API key)</li>
</ul>

<h3>Installation</h3>
<pre><code>npm install -g @anthropic-ai/claude-code</code></pre>
<p>This installs the <code>claude</code> command globally. Verify with:</p>
<pre><code>claude --version</code></pre>

<h3>Authentication</h3>
<p>On first launch, Claude Code will open your browser to authenticate with your Anthropic account. If you prefer API key authentication (for CI/CD or server environments), set the environment variable:</p>
<pre><code>export ANTHROPIC_API_KEY=your_key_here</code></pre>
<p>For persistent configuration, add this to your shell profile (<code>~/.bashrc</code>, <code>~/.zshrc</code>, etc.).</p>

<h3>Starting a Session</h3>
<p>Navigate to your project directory and run:</p>
<pre><code>cd my-project
claude</code></pre>
<p>Claude Code reads your project context automatically — it scans for configuration files, package manifests, and READMEs to understand what kind of project it's working with.</p>

<h3>CLAUDE.md — Your Project Instructions</h3>
<p>Create a <code>CLAUDE.md</code> file in your project root to give Claude persistent context about your project. This file is read at the start of every session. Include:</p>
<ul>
  <li>Project overview and architecture</li>
  <li>Tech stack and key dependencies</li>
  <li>Coding conventions and style preferences</li>
  <li>Commands for build, test, and lint</li>
  <li>Things to avoid or be careful about</li>
</ul>
<p>A well-written <code>CLAUDE.md</code> dramatically reduces the amount of context you need to provide in each session.</p>

<h3>IDE Integration</h3>
<p>Claude Code integrates with VS Code, JetBrains IDEs, and other editors via extensions. The IDE integration lets you use Claude Code directly from your editor sidebar or command palette without switching to the terminal.</p>
`,
    keyTakeaways: [
      "Install with npm install -g @anthropic-ai/claude-code; requires Node.js 18+ and an Anthropic account",
      "Authenticate via browser OAuth or set ANTHROPIC_API_KEY for API key auth",
      "CLAUDE.md in your project root gives Claude persistent context about your project — create one early",
      "IDE extensions for VS Code and JetBrains let you use Claude Code without leaving your editor",
    ],
  },
  {
    courseSlug: "claude-code-in-action",
    moduleIndex: 2,
    title: "Core Coding Assistance Features",
    estimatedMinutes: 14,
    content: `
<h2>What Claude Code Can Do in Your Codebase</h2>
<p>Once Claude Code is running in your project, you have access to a wide set of capabilities. This module covers the core features you'll use most frequently.</p>

<h3>Code Generation</h3>
<p>Describe what you want in plain English and Claude will write it. For best results, be specific about inputs, outputs, error handling, and any relevant constraints:</p>
<pre><code>&gt; Add a function that validates email addresses using a regex. It should return true/false and handle edge cases like empty strings and null.</code></pre>
<p>Claude will read relevant files in your project first to understand your conventions (naming style, error handling patterns, testing setup) and write code that fits naturally.</p>

<h3>Code Explanation</h3>
<p>Point Claude at any file or function and ask it to explain:</p>
<pre><code>&gt; Explain how the rate limiter in src/middleware/rateLimiter.ts works, especially the sliding window logic.</code></pre>
<p>Claude traces through the code, identifies the key logic, and explains it in plain language. This is particularly useful for onboarding onto unfamiliar codebases.</p>

<h3>Debugging</h3>
<p>Share an error message, a failing test, or unexpected behavior and Claude will diagnose it:</p>
<pre><code>&gt; This test is failing: [paste test output]. Find the bug and fix it.</code></pre>
<p>Claude reads the relevant source files, traces through the logic, identifies the root cause, and applies a fix. It will also explain what caused the bug, which helps you avoid similar issues in the future.</p>

<h3>Refactoring</h3>
<p>Claude can refactor code while preserving behavior. Common refactoring tasks:</p>
<ul>
  <li>Converting callback-style code to async/await</li>
  <li>Extracting duplicated logic into shared utilities</li>
  <li>Improving naming and readability</li>
  <li>Breaking large functions into smaller, single-responsibility ones</li>
  <li>Migrating from one library to another</li>
</ul>
<p>For large refactors, Claude will often propose a plan first and ask for confirmation before making widespread changes.</p>

<h3>Test Generation</h3>
<p>Ask Claude to write tests for existing code. Specify your testing framework and what kinds of cases to cover:</p>
<pre><code>&gt; Write Jest unit tests for the validateEmail function. Cover the happy path, invalid formats, edge cases, and null/undefined inputs.</code></pre>

<h3>Code Review</h3>
<p>Ask Claude to review code before you commit or open a PR. It can identify bugs, security issues, performance problems, and style inconsistencies:</p>
<pre><code>&gt; Review this diff for security vulnerabilities and suggest improvements.</code></pre>
`,
    keyTakeaways: [
      "Describe what you want in plain English — Claude reads your project conventions and generates fitting code",
      "Debugging with Claude is most effective when you share the exact error and let Claude trace to the root cause",
      "Test generation works best when you specify the framework and the categories of cases to cover",
      "For large refactors, Claude proposes a plan first — review it before approving widespread changes",
    ],
  },
  {
    courseSlug: "claude-code-in-action",
    moduleIndex: 3,
    title: "Workflow Integration Techniques",
    estimatedMinutes: 13,
    content: `
<h2>Integrating Claude Code into Your Development Workflow</h2>
<p>Claude Code is most valuable when it's woven into how you already work — not treated as a separate tool you switch to occasionally. This module covers practical techniques for integrating it into daily development.</p>

<h3>Git Integration</h3>
<p>Claude Code is git-aware. It reads your <code>.git</code> directory to understand branches, recent commits, and staged changes. Common git-integrated workflows:</p>
<ul>
  <li><strong>Commit messages:</strong> <code>&gt; Write a commit message for the staged changes</code></li>
  <li><strong>PR descriptions:</strong> <code>&gt; Write a PR description summarizing the changes in this branch vs main</code></li>
  <li><strong>Diff review:</strong> <code>&gt; Review git diff HEAD~3 for issues before I push</code></li>
  <li><strong>Conflict resolution:</strong> Share a merge conflict and ask Claude to resolve it</li>
</ul>

<h3>Running Commands</h3>
<p>Claude Code can run terminal commands as part of its workflow. This means it can:</p>
<ul>
  <li>Run your test suite after making changes and iterate if tests fail</li>
  <li>Execute lint checks and fix flagged issues</li>
  <li>Build your project and resolve build errors</li>
  <li>Install dependencies when adding new packages</li>
</ul>
<p>Claude always shows you the command it's about to run before executing it, giving you the chance to approve or modify.</p>

<h3>Task Automation with Hooks</h3>
<p>Claude Code supports hooks — shell scripts that run in response to events like session start, tool use, or stop. Hooks let you automate quality checks:</p>
<pre><code># Run lint before Claude commits anything
# ~/.claude/settings.json
{
  "hooks": {
    "PreToolUse": [{ "matcher": "Bash", "hooks": [{ "type": "command", "command": "npm run lint" }] }]
  }
}</code></pre>

<h3>Working with Multiple Files</h3>
<p>Complex features often touch many files. Claude Code handles multi-file changes naturally — it can read all relevant files, understand their relationships, and make coordinated changes across the codebase. When working on a feature, tell Claude the scope: "This change needs to update the API route, the service layer, the types, and the tests."</p>

<h3>Context Management</h3>
<p>For very large codebases, you can guide Claude's focus using <code>/add</code> to include specific files in its context window, or <code>/clear</code> to reset context when switching tasks. Good context management keeps Claude focused on the relevant parts of your codebase.</p>
`,
    keyTakeaways: [
      "Claude Code is git-aware — use it for commit messages, PR descriptions, and diff reviews",
      "Claude can run your tests, lint, and build commands and iterate based on results",
      "Hooks let you automate quality gates that run before or after Claude takes specific actions",
      "Use /add to focus Claude on specific files and /clear to reset context when switching tasks",
    ],
  },
  {
    courseSlug: "claude-code-in-action",
    moduleIndex: 4,
    title: "Advanced Usage and Customization",
    estimatedMinutes: 12,
    content: `
<h2>Taking Claude Code Further</h2>
<p>Once you're comfortable with Claude Code's core capabilities, these advanced features let you customize its behavior, extend its capabilities, and tackle more complex workflows.</p>

<h3>Custom Commands (Slash Commands)</h3>
<p>You can define custom slash commands that trigger specific behaviors. Create a <code>.claude/commands/</code> directory in your project and add markdown files:</p>
<pre><code># .claude/commands/review.md
Review the current diff for:
1. Security vulnerabilities
2. Performance issues
3. Missing error handling
4. Test coverage gaps

Provide a structured report with severity ratings.</code></pre>
<p>Now <code>/review</code> runs this exact review workflow every time.</p>

<h3>Skills</h3>
<p>Skills are markdown files that Claude automatically applies based on context — like a standing instruction set for specific situations. A skill might define how Claude should handle database migrations, or specify your team's code review standards. Skills live in <code>.claude/skills/</code> and activate based on triggers you define.</p>

<h3>MCP Server Integration</h3>
<p>The Model Context Protocol (MCP) lets you connect Claude Code to external tools and data sources. Out-of-the-box integrations include GitHub, Jira, Notion, Postgres, and dozens more. Once connected, Claude can read from and write to these systems as part of its workflow:</p>
<pre><code>&gt; Create a GitHub issue for this bug and assign it to the relevant team based on the code that's affected.</code></pre>

<h3>Subagents</h3>
<p>For complex tasks, Claude Code can spawn specialized subagents — separate Claude instances focused on specific subtasks. The main agent coordinates while subagents handle things like research, testing, or documentation in parallel. This is particularly useful for large-scale refactors or multi-component features.</p>

<h3>Extended Thinking</h3>
<p>For difficult architectural decisions or complex debugging, you can enable extended thinking mode. Claude will spend more time reasoning through the problem before responding, which improves quality on hard problems at the cost of speed. Toggle with <code>/think</code> for a single response, or configure it in settings for specific task types.</p>

<h3>Automation and CI/CD</h3>
<p>Claude Code can run non-interactively using the <code>--print</code> flag, making it suitable for CI/CD pipelines. Common uses: automated code review on PRs, auto-generating changelogs, or running security scans before deployment.</p>
`,
    keyTakeaways: [
      "Custom slash commands let you define repeatable workflows as markdown files in .claude/commands/",
      "Skills are context-triggered instruction sets that automatically apply to relevant situations",
      "MCP integrations connect Claude to GitHub, Jira, databases, and dozens of other tools",
      "Subagents enable parallel execution of complex tasks; extended thinking improves hard problem quality",
    ],
  },
  {
    courseSlug: "claude-code-in-action",
    moduleIndex: 5,
    title: "Best Practices and Troubleshooting",
    estimatedMinutes: 11,
    content: `
<h2>Working Effectively and Resolving Common Issues</h2>
<p>Building good habits with Claude Code will save you time and produce better results. This module covers the practices of experienced users and solutions to the most common problems.</p>

<h3>Write a Good CLAUDE.md</h3>
<p>The most impactful thing you can do is invest in a thorough <code>CLAUDE.md</code>. Include your build/test commands, architecture overview, key conventions, and anything Claude should know or avoid. Update it whenever you discover Claude making consistent mistakes — those mistakes usually indicate missing context.</p>

<h3>Keep Tasks Focused</h3>
<p>Claude Code performs best on focused, well-defined tasks. "Fix the bug in the login flow" is better than "improve the whole application." For large features, break them into steps and work through them sequentially, verifying each step before proceeding.</p>

<h3>Review Before Approving</h3>
<p>Always read the changes Claude proposes before approving them. Claude Code is capable but not infallible. A quick review catches errors before they're committed. Use <code>git diff</code> to review changes, and run tests to verify correctness.</p>

<h3>Use Version Control as a Safety Net</h3>
<p>Always work in a git repository with Claude Code. Commit your current state before starting a large autonomous task — this gives you a clean rollback point if something goes wrong. Claude Code is git-aware and won't delete your git history, but you want clean checkpoints for large operations.</p>

<h3>Common Issues and Fixes</h3>
<ul>
  <li><strong>Claude keeps making the same mistake:</strong> Add the correct approach to CLAUDE.md as an explicit instruction</li>
  <li><strong>Context window filling up:</strong> Use <code>/clear</code> to reset, or start a new session for a different part of the codebase</li>
  <li><strong>Slow responses:</strong> Large context windows and complex tasks take longer — switch to Haiku for faster iteration on simpler tasks</li>
  <li><strong>Permission errors:</strong> Check that your API key has sufficient permissions; for team use, ensure the correct organization is selected</li>
  <li><strong>Unexpected file changes:</strong> Check your settings for auto-approve configurations and tighten them</li>
</ul>

<h3>Getting Help</h3>
<p>Run <code>claude /help</code> for built-in documentation. The Anthropic documentation at docs.anthropic.com has comprehensive guides for Claude Code. The community Discord is active and helpful for workflow-specific questions.</p>
`,
    keyTakeaways: [
      "A thorough CLAUDE.md is the highest-leverage investment — update it when Claude makes repeated mistakes",
      "Keep tasks focused; break large features into verifiable steps rather than one massive request",
      "Always review proposed changes before approving and work in a git repo for easy rollbacks",
      "Add the correct approach to CLAUDE.md when Claude makes repeated mistakes — it usually means missing context",
    ],
  },
];

export default lessons;
