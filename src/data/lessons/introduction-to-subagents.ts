import type { LessonContent } from "../lessons";

const lessons: LessonContent[] = [
  {
    courseSlug: "introduction-to-subagents",
    moduleIndex: 0,
    title: "Introduction to Sub-agents Concept",
    estimatedMinutes: 10,
    content: `
<h2>What Are Sub-agents?</h2>
<p>Sub-agents are specialized Claude instances that a main agent can create and delegate tasks to. Rather than one Claude instance handling every aspect of a complex workflow, the main agent acts as an orchestrator — breaking the task into parts and assigning each part to a sub-agent with the right focus and tools.</p>

<h3>Why Sub-agents?</h3>
<p>Two fundamental constraints make sub-agents valuable:</p>
<ul>
  <li><strong>Context window limits:</strong> Every Claude instance has a finite context window. For very large tasks, the context fills up. Sub-agents have their own fresh context windows, allowing parallel work on different parts of the problem.</li>
  <li><strong>Specialization:</strong> Different parts of a task benefit from different instructions, tools, and focus. A sub-agent tasked with security review can be given security-specific tools and instructions without those cluttering the context of the sub-agent doing documentation.</li>
</ul>

<h3>The Orchestrator Pattern</h3>
<p>The main agent acts as a project manager: it plans the overall approach, creates sub-agents with specific mandates, collects their outputs, synthesizes the results, and handles coordination. Sub-agents are focused workers: they receive a specific task, complete it, and return results to the orchestrator.</p>

<h3>When to Use Sub-agents</h3>
<p>Sub-agents are appropriate when:</p>
<ul>
  <li>Tasks can be meaningfully parallelized (independent work that doesn't need to coordinate in real time)</li>
  <li>Different parts of the task require different specialized context or tools</li>
  <li>The overall task is too large to fit in a single context window</li>
  <li>You want to isolate risky operations in a contained sub-agent context</li>
</ul>
<p>For simple, sequential tasks, sub-agents add overhead without benefit. The overhead of creating and coordinating sub-agents is only worthwhile when the task genuinely warrants it.</p>
`,
    keyTakeaways: [
      "Sub-agents are specialized Claude instances orchestrated by a main agent to handle complex workflows",
      "They solve context window limits and enable specialization — different tools and focus per sub-task",
      "The orchestrator pattern: main agent plans and coordinates; sub-agents focus and execute",
      "Use sub-agents only when tasks can be parallelized or specialized — they add coordination overhead",
    ],
  },
  {
    courseSlug: "introduction-to-subagents",
    moduleIndex: 1,
    title: "Creating Your First Sub-agent",
    estimatedMinutes: 12,
    content: `
<h2>Spawning and Configuring Sub-agents</h2>
<p>In Claude Code, sub-agents are created using the Agent tool. The main agent calls this tool with a description of the sub-agent's task, any relevant context, and configuration for what tools the sub-agent has access to.</p>

<h3>Basic Sub-agent Creation</h3>
<p>From within a Claude Code session, the main agent can spawn a sub-agent by calling the Agent tool:</p>
<pre><code>// Main agent spawning a sub-agent
Agent({
  description: "Research competitor pricing",
  prompt: "Search the web for current pricing for Pinecone, Weaviate, and Chroma vector databases. Return a structured comparison table with tier names, prices, and key limits.",
  tools: ["WebSearch", "WebFetch"]
})</code></pre>
<p>The sub-agent receives this task, executes it using only the specified tools, and returns results to the main agent.</p>

<h3>Configuring Sub-agent Tools</h3>
<p>You control which tools each sub-agent has access to. This is important for safety and focus:</p>
<ul>
  <li>A research sub-agent: <code>["WebSearch", "WebFetch"]</code></li>
  <li>A code review sub-agent: <code>["Read", "Grep", "Glob"]</code> (read-only)</li>
  <li>A test runner sub-agent: <code>["Read", "Bash"]</code> (controlled execution)</li>
  <li>A writer sub-agent: <code>["Read", "Write"]</code></li>
</ul>
<p>Granting only necessary tools follows the principle of least privilege and reduces the risk of a sub-agent taking unintended actions.</p>

<h3>Writing Effective Sub-agent Prompts</h3>
<p>Sub-agent prompts should be self-contained — the sub-agent doesn't have access to the main agent's conversation history. Include everything it needs:</p>
<ul>
  <li>Clear description of the task</li>
  <li>Relevant background context</li>
  <li>Expected output format</li>
  <li>Any constraints or priorities</li>
</ul>
<p>Think of it like writing a task for someone who knows nothing about your project.</p>

<h3>Receiving Sub-agent Results</h3>
<p>The main agent receives the sub-agent's output as a string. The main agent then processes this output as part of its own reasoning. Structure your sub-agent output format to match how the main agent will use it — JSON for machine processing, markdown for human-readable synthesis.</p>
`,
    keyTakeaways: [
      "Sub-agents are created with the Agent tool, specifying description, prompt, and allowed tools",
      "Grant only necessary tools to each sub-agent — least privilege reduces unintended actions",
      "Sub-agent prompts must be self-contained; include all context the sub-agent needs",
      "Structure sub-agent output format (JSON vs markdown) to match how the main agent will use it",
    ],
  },
  {
    courseSlug: "introduction-to-subagents",
    moduleIndex: 2,
    title: "Context Management Between Agents",
    estimatedMinutes: 12,
    content: `
<h2>Managing Context Across Agents</h2>
<p>Context management is the most technically demanding aspect of multi-agent systems. Each agent has its own context window; information must be explicitly passed between them. Getting this right determines whether your multi-agent workflows are effective or chaotic.</p>

<h3>The Isolated Context Model</h3>
<p>Sub-agents don't share context with the main agent or each other. When you spawn a sub-agent, it starts with only what you explicitly give it in the prompt. This isolation is a feature, not a bug — it prevents context contamination between tasks — but it requires deliberate context passing.</p>

<h3>What to Pass to Sub-agents</h3>
<p>Include in the sub-agent prompt:</p>
<ul>
  <li>The specific task and expected output format</li>
  <li>Relevant decisions or constraints established by the main agent</li>
  <li>File paths or specific content the sub-agent will need</li>
  <li>Project conventions the sub-agent should follow</li>
</ul>
<p>Don't include the full conversation history — it wastes context on irrelevant content. Be surgical about what each sub-agent actually needs.</p>

<h3>Passing Results Back</h3>
<p>Sub-agents return a single result string. For complex outputs:</p>
<ul>
  <li>Use structured formats (JSON, YAML, markdown tables) so the main agent can parse them reliably</li>
  <li>Include a summary header that lets the main agent quickly assess if the task succeeded</li>
  <li>Flag confidence levels or uncertainties explicitly ("found 3 definitive answers, 2 are uncertain")</li>
</ul>

<h3>Shared State via Files</h3>
<p>For agents that need to share state, files in the project serve as the shared medium. The main agent can write a context file that sub-agents read, or sub-agents can write their outputs to files that other sub-agents (or the main agent) then read. This is more reliable than trying to pass large amounts of context through prompts.</p>

<h3>Context Budget Planning</h3>
<p>When designing multi-agent workflows, think about context budgets. The main agent needs enough context to coordinate; sub-agents need enough to execute. If a task requires more context than a single agent can hold, break it into smaller sub-tasks rather than trying to compress context.</p>
`,
    keyTakeaways: [
      "Sub-agents have isolated context — you must explicitly pass everything they need",
      "Be surgical about what to include: relevant task details, constraints, conventions — not full history",
      "Use structured output formats so the main agent can parse sub-agent results reliably",
      "Use shared files as state for complex multi-agent workflows where context is too large to pass directly",
    ],
  },
  {
    courseSlug: "introduction-to-subagents",
    moduleIndex: 3,
    title: "Building Specialized Workflows",
    estimatedMinutes: 13,
    content: `
<h2>Designing Multi-Agent Workflows</h2>
<p>Effective multi-agent workflows combine parallelism, specialization, and thoughtful coordination. This module covers common workflow patterns and how to apply them to real tasks.</p>

<h3>Parallel Research Pattern</h3>
<p>When you need to research multiple independent topics, spawn parallel sub-agents to research each one simultaneously:</p>
<pre><code>// Spawn 3 research agents in parallel
const [pricing, performance, integrations] = await Promise.all([
  Agent({ description: "Research pricing", prompt: "..." }),
  Agent({ description: "Research performance benchmarks", prompt: "..." }),
  Agent({ description: "Research integrations", prompt: "..." }),
]);
// Main agent synthesizes results</code></pre>
<p>This pattern completes in the time of the slowest sub-agent rather than the sum of all — significant time savings for research-heavy workflows.</p>

<h3>Pipeline Pattern</h3>
<p>For tasks where output from one stage feeds the next, use a sequential pipeline of specialized sub-agents:</p>
<ul>
  <li>Sub-agent 1: Research and gather raw information</li>
  <li>Sub-agent 2: Analyze and structure the information</li>
  <li>Sub-agent 3: Write the final output in the target format</li>
</ul>
<p>Each sub-agent gets the output of the previous stage as input, with a fresh context window and specialized focus.</p>

<h3>Review Pattern</h3>
<p>One sub-agent produces work; a second sub-agent reviews it independently:</p>
<ul>
  <li>Writer sub-agent: produces a draft</li>
  <li>Critic sub-agent: receives the draft and reviews it without seeing the writer's reasoning</li>
  <li>Main agent: synthesizes feedback and produces the final version</li>
</ul>
<p>Independent review often catches issues that the producing agent misses because it's not anchored to its own reasoning.</p>

<h3>Specialization Pattern</h3>
<p>Different sub-agents with different skills handle different aspects of one task:</p>
<ul>
  <li>Security sub-agent: focused on vulnerabilities</li>
  <li>Performance sub-agent: focused on efficiency</li>
  <li>Readability sub-agent: focused on code clarity</li>
</ul>
<p>Each sub-agent is given tailored instructions and tools. The main agent aggregates their findings into a comprehensive report.</p>

<h3>Choosing the Right Pattern</h3>
<p>Match the pattern to the task structure. Parallel research for independent investigations. Pipeline for multi-stage transformations. Review for quality assurance. Specialization for multi-dimensional analysis. Complex workflows can combine multiple patterns — a pipeline where each stage uses parallel sub-agents, for example.</p>
`,
    keyTakeaways: [
      "Parallel pattern: spawn independent sub-agents simultaneously for research or analysis tasks",
      "Pipeline pattern: sequential sub-agents where each stage's output feeds the next",
      "Review pattern: independent critic sub-agent catches issues the producer missed",
      "Specialization pattern: different sub-agents with different tools for multi-dimensional analysis",
    ],
  },
  {
    courseSlug: "introduction-to-subagents",
    moduleIndex: 4,
    title: "Communication Patterns",
    estimatedMinutes: 11,
    content: `
<h2>Main ↔ Sub-agent Communication</h2>
<p>Clean communication between agents is what makes multi-agent workflows reliable. This module covers the patterns and protocols that keep agents aligned and results coherent.</p>

<h3>Structured Output Contracts</h3>
<p>Define a clear output format before spawning a sub-agent. Both the main agent and sub-agent should agree on the structure:</p>
<pre><code>// In the sub-agent prompt:
"Return your findings as JSON with this structure:
{
  'summary': string,  // 1-2 sentence summary
  'findings': [{ 'item': string, 'severity': 'high'|'medium'|'low', 'detail': string }],
  'recommendation': string,
  'confidence': 'high'|'medium'|'low'
}"</code></pre>
<p>Structured output contracts prevent the main agent from having to parse ambiguous natural language results.</p>

<h3>Status and Progress Signals</h3>
<p>For long-running sub-agent tasks, include progress signals in the output. The main agent can use these to decide whether to wait for more, proceed with partial results, or retry:</p>
<pre><code>{
  "status": "complete" | "partial" | "failed",
  "completedItems": 8,
  "totalItems": 10,
  "results": [...],
  "errors": [...]
}</code></pre>

<h3>Error Handling</h3>
<p>Sub-agents encounter errors. Design your main agent to handle them gracefully:</p>
<ul>
  <li>Sub-agent returns an error — main agent retries with adjusted instructions or proceeds without that input</li>
  <li>Sub-agent produces incomplete results — main agent notes the gap and continues</li>
  <li>Sub-agent takes too long — main agent timeouts and assigns work differently</li>
</ul>
<p>Never assume sub-agents will succeed. Design the main agent to be resilient to sub-agent failures.</p>

<h3>Passing Corrections</h3>
<p>When a sub-agent's output needs refinement, spawn a new sub-agent with the original output and specific correction instructions rather than trying to patch it in the main agent. This keeps the correction clean and contained.</p>

<h3>Avoiding Coordination Overhead</h3>
<p>Communication overhead is real. Every round trip between main agent and sub-agent consumes time and tokens. Design workflows to minimize unnecessary communication: batch related tasks into single sub-agent prompts, avoid trivial delegation, and prefer sub-agents that complete substantial work independently rather than constant back-and-forth.</p>
`,
    keyTakeaways: [
      "Define structured output contracts before spawning sub-agents — agree on format upfront",
      "Include status signals in sub-agent outputs so the main agent can handle partial results gracefully",
      "Design the main agent to be resilient to sub-agent failures — never assume success",
      "Minimize round trips by batching related tasks and preferring sub-agents that complete substantial work",
    ],
  },
  {
    courseSlug: "introduction-to-subagents",
    moduleIndex: 5,
    title: "Best Practices for Sub-agent Design",
    estimatedMinutes: 11,
    content: `
<h2>Principles for Reliable Multi-agent Systems</h2>
<p>Sub-agent systems add complexity. These best practices help you get the benefits of multi-agent workflows while managing the additional complexity responsibly.</p>

<h3>Start Simple</h3>
<p>Begin with a single sub-agent before building a full multi-agent pipeline. Verify the sub-agent produces reliable output on its own before wiring it into a larger system. Adding more agents to a broken workflow makes debugging harder, not easier.</p>

<h3>Minimize Trust Between Agents</h3>
<p>Don't blindly trust sub-agent outputs. The main agent should validate key results before acting on them, especially for:</p>
<ul>
  <li>Factual claims that will inform important decisions</li>
  <li>Code that will be committed or deployed</li>
  <li>Actions that can't be easily reversed</li>
</ul>
<p>A review step — either by another sub-agent or by human review — adds reliability to high-stakes workflows.</p>

<h3>Idempotent Sub-tasks</h3>
<p>Design sub-tasks to be safely re-runnable if they fail partway through. Idempotent operations (running them twice produces the same result as running them once) make retry logic simple and safe. File writes and database operations that aren't idempotent need careful handling.</p>

<h3>Limit Sub-agent Scope</h3>
<p>A sub-agent that can do anything is hard to reason about and debug. Give each sub-agent the minimum tools and permissions needed for its specific task. A read-only research sub-agent can never accidentally corrupt files. A write-enabled sub-agent should operate in a contained directory.</p>

<h3>Document Your Agent Architecture</h3>
<p>For complex multi-agent workflows, document the architecture in your CLAUDE.md or a dedicated architecture document. Describe each agent's role, inputs, outputs, and dependencies. This helps you debug the system and helps future collaborators understand how it works.</p>

<h3>Test Incrementally</h3>
<p>Test each sub-agent in isolation before testing the full pipeline. Use fixed, known inputs to verify sub-agent outputs. Only integrate when individual agents are working correctly. End-to-end testing of the full pipeline comes last.</p>
`,
    keyTakeaways: [
      "Start with one sub-agent working correctly before building multi-agent pipelines",
      "Validate key sub-agent outputs before acting — never blindly trust agent results",
      "Design sub-tasks to be idempotent — safely re-runnable if they fail partway through",
      "Give each sub-agent minimum tools needed; document the architecture for complex workflows",
    ],
  },
];

export default lessons;
