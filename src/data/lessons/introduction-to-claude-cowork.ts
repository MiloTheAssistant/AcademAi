import type { LessonContent } from "../lessons";

const lessons: LessonContent[] = [
  {
    courseSlug: "introduction-to-claude-cowork",
    moduleIndex: 0,
    title: "Introduction to Claude Cowork",
    estimatedMinutes: 10,
    content: `
<h2>What Is Claude Cowork?</h2>
<p>Claude Cowork is Anthropic's approach to working <em>alongside</em> Claude on your real projects and files — not just in isolated chat sessions, but as a genuine collaborative partner embedded in your actual workflow. The cowork concept extends beyond simple task completion: Claude participates in your research, writing, analysis, and decision-making as an active collaborator rather than a one-shot assistant.</p>

<h3>The Collaboration Model</h3>
<p>Traditional AI assistant interactions are transactional: you ask, it answers, the interaction ends. Cowork is iterative and ongoing. Claude maintains context across a working session, remembers decisions made earlier, builds on previous outputs, and adapts as your understanding of the problem evolves.</p>
<p>Think of it like working with a very capable colleague in a shared document. Both of you can read and edit the same files, refer to the same context, and build on each other's work in real time.</p>

<h3>Core Components</h3>
<ul>
  <li><strong>File access:</strong> Claude can read and write your actual project files, not just pastes in a chat window</li>
  <li><strong>Persistent context:</strong> Within a session, Claude tracks the full history of your collaboration</li>
  <li><strong>Tool use:</strong> Claude can use web search, code execution, and external integrations as part of the workflow</li>
  <li><strong>Steering controls:</strong> You can redirect, refine, or halt Claude's work at any point</li>
</ul>

<h3>When Cowork Shines</h3>
<p>Cowork is most valuable for tasks that require sustained effort, multiple passes, and integration of context from many sources. Long-form writing projects, complex research tasks, multi-file code changes, and iterative design work are all excellent fits. Short, single-turn tasks (like "translate this sentence") don't benefit much from the cowork model.</p>

<h3>Getting Started</h3>
<p>Claude Cowork is accessed through Claude Code or compatible interfaces that support file access and tool use. If you have Claude Code installed, you already have the foundation for cowork sessions. The key shift is mental: approach Claude as a collaborator to work <em>with</em>, not a tool to issue commands to.</p>
`,
    keyTakeaways: [
      "Cowork is an iterative, ongoing collaboration model — not transactional one-shot interactions",
      "Claude maintains context across a session, remembers decisions, and builds on previous outputs",
      "File access, persistent context, tool use, and steering controls are the four core components",
      "Cowork is most valuable for sustained, multi-pass tasks like research, writing, and complex code changes",
    ],
  },
  {
    courseSlug: "introduction-to-claude-cowork",
    moduleIndex: 1,
    title: "The Cowork Task Loop",
    estimatedMinutes: 13,
    content: `
<h2>Understanding the Cowork Task Loop</h2>
<p>The task loop is the fundamental rhythm of a cowork session. Understanding it helps you guide Claude more effectively, intervene at the right moments, and get better results from complex multi-step tasks.</p>

<h3>The Four Phases</h3>
<p>Every cowork task cycles through four phases:</p>
<ol>
  <li><strong>Orient:</strong> Claude reads relevant context — files, previous outputs, your instructions — to understand the current state</li>
  <li><strong>Plan:</strong> Claude determines what steps are needed and in what order</li>
  <li><strong>Act:</strong> Claude takes one step — reads a file, makes an edit, runs a command, calls an API</li>
  <li><strong>Observe:</strong> Claude reviews the result of that action and decides whether to continue, adjust, or ask for input</li>
</ol>
<p>This loop repeats until the task is complete. For a simple task, it might cycle 3–5 times. For complex tasks, dozens of iterations.</p>

<h3>The Planning Step Matters</h3>
<p>For complex tasks, ask Claude to share its plan before acting. This gives you the chance to catch misunderstandings early, before Claude has spent time on a wrong approach:</p>
<pre><code>&gt; Before you start, outline your plan for implementing this feature. List the files you'll need to change and the order you'll tackle them.</code></pre>
<p>Review the plan, make corrections, then give the go-ahead. This one practice dramatically reduces wasted effort on large tasks.</p>

<h3>Steering During Execution</h3>
<p>You don't have to wait for a task to complete before redirecting. If Claude's approach isn't working or you realize the requirements have changed, interrupt and redirect:</p>
<ul>
  <li>"Stop — before you continue, let's reconsider the approach to X"</li>
  <li>"That part looks good but skip the refactoring — just focus on the bug fix"</li>
  <li>"You're going in the wrong direction. The actual problem is..."</li>
</ul>
<p>Claude is designed to receive mid-task steering gracefully. It won't lose progress on the parts that were already correct.</p>

<h3>Handling Uncertainty</h3>
<p>When Claude encounters ambiguity — two reasonable approaches, missing context, or a decision that could go several ways — it should pause and ask rather than guess. Encourage this behavior: it's better to have Claude ask one targeted question than proceed on a wrong assumption and need to backtrack.</p>

<h3>Reviewing Outputs</h3>
<p>At natural checkpoints, review Claude's work before it proceeds. For writing tasks, review a first draft section. For code tasks, run tests after a major change. Building in review checkpoints keeps the collaboration on track and catches issues while they're easy to fix.</p>
`,
    keyTakeaways: [
      "The cowork loop has four phases: Orient, Plan, Act, Observe — repeating until task completion",
      "Asking Claude to share its plan before acting catches misunderstandings before wasted effort",
      "You can steer mid-task — interrupt and redirect without losing prior progress",
      "Encourage Claude to ask when facing genuine ambiguity rather than proceeding on assumptions",
    ],
  },
  {
    courseSlug: "introduction-to-claude-cowork",
    moduleIndex: 2,
    title: "Plugins and Skills Overview",
    estimatedMinutes: 11,
    content: `
<h2>Extending Claude with Plugins and Skills</h2>
<p>Claude Cowork's capabilities can be extended through two complementary mechanisms: plugins (MCP integrations with external tools) and skills (custom instruction sets for specific contexts). Together, they let you build a tailored collaborative environment for your workflow.</p>

<h3>Plugins via MCP</h3>
<p>The Model Context Protocol enables Claude to connect to external tools and data sources. When a plugin is active, Claude can use it as naturally as any other capability:</p>
<ul>
  <li><strong>GitHub plugin:</strong> Read issues, comment on PRs, create branches, search code</li>
  <li><strong>Notion plugin:</strong> Read pages, create notes, update databases</li>
  <li><strong>Postgres plugin:</strong> Query your database, inspect schemas, run migrations</li>
  <li><strong>Web search plugin:</strong> Research current information, verify facts, find documentation</li>
  <li><strong>File system plugin:</strong> Access files outside the current project directory</li>
</ul>
<p>Configure plugins in your Claude Code settings or <code>~/.claude/settings.json</code>. Enterprise setups often pre-configure a standard set of plugins for the whole team.</p>

<h3>Skills</h3>
<p>Skills are markdown files that define how Claude should behave in specific contexts. Unlike one-time instructions, skills persist across a session and activate automatically based on triggers:</p>
<pre><code># .claude/skills/code-review.md
---
triggers:
  - "review"
  - "check this"
  - "LGTM?"
---
When reviewing code, always check for:
1. Security: SQL injection, XSS, authentication gaps
2. Error handling: uncaught exceptions, missing null checks
3. Performance: N+1 queries, unnecessary re-renders
4. Tests: missing coverage for edge cases

Report findings in order of severity with line references.</code></pre>
<p>Now whenever you ask Claude to "review" something, it automatically applies these standards without you needing to repeat them.</p>

<h3>Building a Plugin + Skills Stack</h3>
<p>The most effective cowork setups combine targeted plugins with well-crafted skills. A technical writing team might use a web search plugin (for fact-checking), a Notion plugin (for their knowledge base), and skills that define their style guide and review criteria. A development team might use GitHub and Postgres plugins with skills that encode their architecture decisions and testing standards.</p>

<h3>Sharing Across the Team</h3>
<p>Commit your <code>.claude/</code> directory to version control so skills and command definitions are shared across the team. This ensures everyone benefits from the accumulated knowledge encoded in your skills, and improvements can be made through the normal PR process.</p>
`,
    keyTakeaways: [
      "MCP plugins connect Claude to external tools — GitHub, Notion, databases, web search, and more",
      "Skills are context-triggered instruction sets that apply automatically in relevant situations",
      "Skills are defined in markdown with frontmatter triggers and stored in .claude/skills/",
      "Commit .claude/ to version control so skills and commands are shared across the team",
    ],
  },
  {
    courseSlug: "introduction-to-claude-cowork",
    moduleIndex: 3,
    title: "File Workflow Integration",
    estimatedMinutes: 12,
    content: `
<h2>Working with Real Project Files</h2>
<p>One of the most powerful aspects of Claude Cowork is direct file access. Claude can read, analyze, and edit your actual project files — not copies or pastes, but the real artifacts you're working with. This enables workflows that are qualitatively different from chat-based AI assistance.</p>

<h3>How File Access Works</h3>
<p>When Claude has file access, it can:</p>
<ul>
  <li>Read any file in your project (or configured directories)</li>
  <li>Write new files or edit existing ones</li>
  <li>Search across files for patterns or content</li>
  <li>Understand the relationships between files (imports, references, links)</li>
</ul>
<p>Claude is careful about writes — it always shows you what it's about to change and asks for confirmation on significant edits. You can configure how aggressive or cautious this behavior is.</p>

<h3>Document and Writing Workflows</h3>
<p>For long-form writing, Claude can maintain consistency across a multi-file document project. Ask it to:</p>
<ul>
  <li>Read all existing chapters before drafting a new one (for tone and content consistency)</li>
  <li>Search across files for duplicate content or conflicting information</li>
  <li>Apply a style guide stored in a separate file to all documents</li>
  <li>Generate a table of contents or index from the actual file content</li>
</ul>

<h3>Code Workflow Patterns</h3>
<p>File-integrated code workflows let Claude make coordinated multi-file changes. For example, adding a new API endpoint might require changes to:</p>
<ul>
  <li>The route handler file</li>
  <li>The service layer</li>
  <li>TypeScript type definitions</li>
  <li>API documentation</li>
  <li>Test files</li>
</ul>
<p>With file access, Claude can make all these changes in one pass, maintaining consistency across all affected files.</p>

<h3>Reading Before Writing</h3>
<p>Always encourage Claude to read existing files before making changes to them. This prevents Claude from overwriting work it didn't see or making changes that conflict with existing patterns. The prompt "Read X before modifying it" is a good habit to build.</p>

<h3>File Safety</h3>
<p>Always use version control. Git gives you a safety net for every file change Claude makes. Run <code>git diff</code> before committing to review all changes. For critical files (configuration, secrets, build artifacts), explicitly tell Claude to leave them alone in your <code>CLAUDE.md</code>.</p>
`,
    keyTakeaways: [
      "File access enables coordinated multi-file changes — Claude can update all affected files in one pass",
      "Claude always shows proposed changes and asks confirmation before significant writes",
      "For writing projects, Claude can maintain consistency across multiple documents by reading all of them first",
      "Use version control and git diff to review all file changes before committing",
    ],
  },
  {
    courseSlug: "introduction-to-claude-cowork",
    moduleIndex: 4,
    title: "Research Workflow Techniques",
    estimatedMinutes: 12,
    content: `
<h2>Using Claude Cowork for Research</h2>
<p>Research is one of the highest-value cowork applications. Claude can search, read, synthesize, and organize information at a pace and breadth that's difficult to match manually — and it can do this while staying grounded in the context of your specific project or question.</p>

<h3>Setting Up a Research Session</h3>
<p>Before starting, give Claude the research brief: the question you're answering, the audience for the output, the format you need, and any constraints (length, sources to prefer/avoid, technical level). This upfront context dramatically improves the relevance and quality of what Claude produces.</p>
<pre><code>&gt; I need a 1,500-word competitive analysis of vector database options (Pinecone, Weaviate, Chroma, pgvector).
Audience: senior engineers making a technology choice. Focus on: performance at scale, pricing, and managed vs. self-hosted options.
Current context: we run on AWS, have ~50M vectors, and don't want to manage our own infrastructure.</code></pre>

<h3>Web Search Integration</h3>
<p>With web search enabled, Claude can find current information, documentation, pricing pages, and recent benchmarks. It will cite sources and distinguish between information it has from training vs. what it found in current search results. This is essential for research involving rapidly changing topics like AI tools, pricing, and software versions.</p>

<h3>Synthesizing Multiple Sources</h3>
<p>Claude excels at reading multiple documents or search results and synthesizing them into a coherent output. Rather than producing a list of summaries, it identifies themes, contrasts positions, and builds a unified analysis. Ask it to:</p>
<ul>
  <li>Compare and contrast findings across sources</li>
  <li>Identify points of consensus and disagreement</li>
  <li>Flag claims that appear in only one source vs. those with broad support</li>
  <li>Note areas where the evidence is thin or outdated</li>
</ul>

<h3>Iterative Research</h3>
<p>The best research sessions are iterative. Start with a broad survey, identify the areas that need deeper investigation, then go deeper on those. Claude remembers the context from each step, so you can say "dig deeper into the pricing model we found for option B" and it knows exactly what you mean.</p>

<h3>Knowledge Organization</h3>
<p>Ask Claude to organize research outputs into structured formats: tables for comparison, outlines for reports, or annotated bibliographies. It can also write to files in your project — maintaining a running research log, a source bibliography, or a structured notes document as the session progresses.</p>
`,
    keyTakeaways: [
      "Provide a detailed research brief upfront — question, audience, format, constraints — for best results",
      "Web search integration lets Claude find current information and cite sources",
      "Claude synthesizes multiple sources into unified analysis, not just lists of summaries",
      "Iterative research — broad survey, then deep dives — leverages Claude's persistent session context",
    ],
  },
  {
    courseSlug: "introduction-to-claude-cowork",
    moduleIndex: 5,
    title: "Responsible Steering of Multi-Step Work",
    estimatedMinutes: 11,
    content: `
<h2>Guiding Claude Safely Through Complex Tasks</h2>
<p>Multi-step autonomous work is powerful, but it requires active steering to keep Claude on track, catch mistakes early, and ensure the final output meets your standards. This module covers the principles of responsible cowork collaboration.</p>

<h3>The Principle of Minimal Surprise</h3>
<p>Effective cowork means Claude rarely surprises you in bad ways. Achieve this by:</p>
<ul>
  <li>Getting Claude to share its plan before long tasks</li>
  <li>Setting explicit checkpoints for review</li>
  <li>Defining clear stopping conditions ("stop and ask me if you need to change more than 5 files")</li>
  <li>Being explicit about boundaries ("don't touch the production config files")</li>
</ul>

<h3>Recognizing When to Intervene</h3>
<p>Intervene early if you notice:</p>
<ul>
  <li>Claude reasoning about an approach you know won't work</li>
  <li>A plan that's more complex than necessary</li>
  <li>Claude making assumptions about your preferences rather than asking</li>
  <li>A direction that conflicts with constraints you haven't stated explicitly yet</li>
</ul>
<p>Early intervention is cheap. Letting Claude proceed several steps down a wrong path and then correcting is expensive.</p>

<h3>Destructive Action Safeguards</h3>
<p>Claude Code is designed to ask for explicit confirmation before destructive actions: deleting files, force-pushing to git, running database migrations, or making widespread changes. Never disable these safeguards for convenience. They exist because these actions are hard or impossible to reverse.</p>

<h3>Ownership and Accountability</h3>
<p>You are responsible for everything Claude produces under your direction. Before publishing, submitting, or deploying anything Claude has worked on, review it as if you wrote it yourself. AI-generated code should pass your code review; AI-generated content should meet your editorial standards. "Claude wrote it" is not an excuse for errors.</p>

<h3>Building Trust Incrementally</h3>
<p>Start new cowork workflows with smaller, more observable tasks before scaling up autonomy. Once you understand how Claude approaches a particular type of task and where it tends to need guidance, you can confidently give it more latitude. Trust in cowork is earned through experience, not assumed.</p>

<h3>Documentation and Traceability</h3>
<p>For significant cowork sessions, maintain a log of the key decisions made and changes produced. This is valuable for: understanding why a change was made months later, onboarding collaborators who weren't in the session, and auditing AI-assisted work for quality or compliance purposes.</p>
`,
    keyTakeaways: [
      "Get Claude to share its plan, set review checkpoints, and define explicit stopping conditions",
      "Early intervention is cheap — correct wrong approaches before Claude spends time on them",
      "Never disable destructive action safeguards; they protect against irreversible mistakes",
      "Review everything Claude produces as if you wrote it — you're accountable for the output",
    ],
  },
];

export default lessons;
