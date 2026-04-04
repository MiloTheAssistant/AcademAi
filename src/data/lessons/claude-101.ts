import type { LessonContent } from "../lessons";

const lessons: LessonContent[] = [
  {
    courseSlug: "claude-101",
    moduleIndex: 0,
    title: "Getting Started with Claude",
    estimatedMinutes: 10,
    content: `
<h2>Welcome to Claude</h2>
<p>Claude is an AI assistant made by Anthropic, designed to be helpful, harmless, and honest. Whether you're drafting documents, analyzing data, writing code, or just brainstorming ideas, Claude is built to work alongside you as a capable collaborator.</p>

<h3>Creating Your Account</h3>
<p>Getting started takes less than two minutes. Visit <strong>claude.ai</strong> and sign up with your email address or an existing Google or Apple account. Once verified, you'll land directly in the conversation interface — no setup wizard, no configuration required.</p>
<p>Anthropic offers several plans. The free tier gives you a generous daily allowance of messages. Claude Pro unlocks priority access, longer context windows, and early access to new features. For teams, Claude for Work adds admin controls and shared workspaces.</p>

<h3>The Conversation Interface</h3>
<p>Claude's interface is intentionally minimal. At the center is a message input box where you type your requests. Above it, the conversation history scrolls upward as you exchange messages. Key controls to know:</p>
<ul>
  <li><strong>New chat</strong> — starts a fresh conversation with no prior context</li>
  <li><strong>Projects</strong> — persistent workspaces where Claude remembers context across sessions</li>
  <li><strong>File upload</strong> — attach PDFs, images, spreadsheets, or code files directly</li>
  <li><strong>Model selector</strong> — switch between Claude models (Haiku for speed, Sonnet for balance, Opus for depth)</li>
</ul>

<h3>How Conversations Work</h3>
<p>Claude reads your entire conversation history each time you send a message. This means you don't need to repeat yourself — you can refer back to earlier parts of the conversation naturally. However, each new chat starts completely fresh. If you want Claude to remember something across sessions, use a Project or paste in the relevant context at the start.</p>
<p>The <strong>context window</strong> is the total amount of text Claude can consider at once, measured in tokens (roughly 0.75 words per token). Claude 3.5 Sonnet supports 200,000 tokens — enough for a 150,000-word novel or hundreds of pages of code.</p>

<h3>Your First Conversation</h3>
<p>Try starting with something specific to your actual work. The more concrete your request, the more useful Claude's response will be. Instead of "help me write an email," try "write a follow-up email to a client who hasn't responded in two weeks — professional but friendly, about 100 words." Specificity is the key to quality output.</p>
`,
    keyTakeaways: [
      "Claude is available at claude.ai with free and Pro plans; no setup is required to start",
      "The conversation interface is minimal by design — use Projects for persistent context across sessions",
      "Claude reads your full conversation history on each turn, so you can reference earlier messages naturally",
      "Specific, concrete requests consistently produce better results than vague ones",
    ],
  },
  {
    courseSlug: "claude-101",
    moduleIndex: 1,
    title: "Core Features and Capabilities",
    estimatedMinutes: 12,
    content: `
<h2>What Claude Can Do</h2>
<p>Claude is a large language model, which means it excels at tasks that involve understanding and generating text. But "text" is a broad category — it includes prose, code, structured data, analysis, and more. Understanding Claude's actual capabilities helps you direct it toward work where it genuinely shines.</p>

<h3>Language and Writing</h3>
<p>Claude is an exceptionally capable writer and editor. It can match tone, adjust reading level, summarize long documents, translate between languages, and produce everything from casual tweets to formal legal briefs. It understands nuance — it knows the difference between "concise" and "terse," or between "persuasive" and "manipulative."</p>
<p>For editing, Claude can do far more than fix grammar. Ask it to restructure an argument, tighten prose, or rewrite a section in a different voice. It can explain <em>why</em> it's making a change, which makes it useful for learning as well as producing.</p>

<h3>Analysis and Reasoning</h3>
<p>Claude can read and reason over large documents — contracts, research papers, financial reports, codebases. It can identify themes, spot inconsistencies, compare options, and synthesize information from multiple sources. For complex questions, Claude often thinks through a problem step by step, which helps it avoid simple reasoning errors.</p>

<h3>Code</h3>
<p>Claude is a strong coding assistant across dozens of languages including Python, JavaScript/TypeScript, Rust, Go, SQL, and more. It can write new code from a description, explain existing code, debug errors, refactor for clarity, and generate tests. Claude Code — Anthropic's CLI tool — takes this further by giving Claude direct access to your files and terminal.</p>

<h3>Math and Data</h3>
<p>Claude handles mathematical reasoning well, including algebra, statistics, calculus, and logic. For data tasks, it can write data-processing scripts, explain statistical results, and help design analyses. For complex numerical computation, pairing Claude with a code interpreter (where available) is more reliable than asking it to compute directly.</p>

<h3>Multimodal Input</h3>
<p>Claude can read images, diagrams, charts, screenshots, and PDFs. This makes it useful for tasks like interpreting a whiteboard photo, analyzing a chart from an annual report, or extracting structured data from a scanned form.</p>

<h3>What Claude Won't Do</h3>
<p>Claude declines requests that could cause serious harm — generating malware, creating deceptive content designed to manipulate, producing content that exploits minors, and similar categories. It will tell you when it declines and often suggest an alternative approach. These limits are not about being unhelpful; they're about being trustworthy.</p>
`,
    keyTakeaways: [
      "Claude excels at writing, editing, analysis, coding, and reasoning over long documents",
      "Multimodal support lets you attach images, PDFs, and files for Claude to read and reason over",
      "Claude is a strong coding assistant across dozens of languages; Claude Code extends this to your local environment",
      "Claude will decline genuinely harmful requests and explain why, often offering an alternative",
    ],
  },
  {
    courseSlug: "claude-101",
    moduleIndex: 2,
    title: "Effective Prompting Techniques",
    estimatedMinutes: 15,
    content: `
<h2>Getting the Most from Your Prompts</h2>
<p>A prompt is everything you write to Claude — the question, instruction, context, and examples you provide. The quality of Claude's response is directly shaped by the quality of your prompt. This isn't about memorizing magic phrases; it's about communicating clearly and giving Claude what it needs to help you well.</p>

<h3>Be Specific About the Output You Want</h3>
<p>Vague instructions produce average outputs. Specific instructions produce tailored ones. Compare:</p>
<ul>
  <li><em>Vague:</em> "Write a summary of this article."</li>
  <li><em>Specific:</em> "Write a 3-sentence summary of this article for a non-technical audience. Focus on the business implications, not the technical details."</li>
</ul>
<p>Specify format (bullet points, numbered list, table, prose), length (50 words, one paragraph, two pages), tone (formal, casual, technical), and audience (a 10-year-old, a C-suite executive, a Python developer) whenever these things matter.</p>

<h3>Provide Context</h3>
<p>Claude doesn't know anything about you or your situation unless you tell it. Relevant context dramatically improves output quality. Useful context includes:</p>
<ul>
  <li>Who you are and your role ("I'm a product manager at a B2B SaaS company")</li>
  <li>What you're trying to accomplish ("I need to present this to the board next week")</li>
  <li>Constraints and requirements ("It must be under 500 words and avoid jargon")</li>
  <li>Relevant background ("We already tried X and it didn't work because Y")</li>
</ul>

<h3>Use Examples</h3>
<p>Few-shot prompting means providing one or more examples of what you want. It's one of the most reliable ways to get consistent output format or style. If you want Claude to analyze customer reviews in a specific format, show it one completed example before asking it to process the rest.</p>

<h3>Chain-of-Thought Prompting</h3>
<p>For complex reasoning tasks, ask Claude to think through the problem step by step before giving a final answer. Simply adding "think step by step" or "walk me through your reasoning" often significantly improves accuracy on math problems, logic puzzles, and multi-step analyses. Claude's extended thinking feature (on supported models) makes this even more powerful.</p>

<h3>Iterate, Don't Restart</h3>
<p>Treat your first Claude response as a draft. If it's not quite right, say so specifically: "That's good but too formal — make it more conversational." "The second paragraph is unclear — can you rewrite it?" "Add more specific examples in the section about X." Iterative refinement almost always produces better results than trying to craft a perfect prompt from scratch.</p>

<h3>Assign a Role When Useful</h3>
<p>Asking Claude to adopt a specific role or perspective can sharpen its responses. "Review this code as a senior security engineer" or "Explain this concept as if you're a patient teacher for beginners" both give Claude a useful framing to work within.</p>
`,
    keyTakeaways: [
      "Specific prompts with explicit format, length, tone, and audience requirements outperform vague ones",
      "Context about who you are and what you're trying to accomplish significantly improves output quality",
      "Few-shot examples are the most reliable way to enforce a specific output format or style",
      "Iterating on Claude's responses is more efficient than trying to write a perfect prompt the first time",
    ],
  },
  {
    courseSlug: "claude-101",
    moduleIndex: 3,
    title: "Common Work Task Applications",
    estimatedMinutes: 12,
    content: `
<h2>Applying Claude to Everyday Work</h2>
<p>The best way to build a productive working relationship with Claude is to start using it for tasks you actually do every day. This module covers the most common work applications where Claude consistently delivers value.</p>

<h3>Email and Communication</h3>
<p>Claude is excellent at drafting professional communications. Paste in relevant context (previous emails, meeting notes, the situation you're dealing with) and ask for a draft. Then iterate: "Make it shorter," "soften the opening," "add a specific ask at the end."</p>
<p>Claude can also help you decode difficult communications — paste in an email with an unclear ask and ask Claude to interpret it. Or use it to prepare for a difficult conversation by asking it to role-play as the other party.</p>

<h3>Document Summarization and Research</h3>
<p>Attach a long PDF, paste in an article, or share a lengthy report and ask Claude to:</p>
<ul>
  <li>Summarize the key points in bullet form</li>
  <li>Extract all action items or decisions</li>
  <li>Answer specific questions about the content</li>
  <li>Compare two documents and identify differences</li>
</ul>
<p>Claude's 200K context window means you can paste very long documents directly — entire contracts, annual reports, or research papers — without hitting limits.</p>

<h3>Brainstorming and Ideation</h3>
<p>Claude is a tireless brainstorming partner. Unlike search engines, it generates ideas rather than finding existing ones, which makes it useful for creative exploration. Ask for 10 different angles on a problem, then ask it to combine two of them into a hybrid approach. Ask it to argue the opposite position to stress-test your thinking.</p>

<h3>Data and Spreadsheets</h3>
<p>Paste tabular data directly into Claude (CSV format works well) and ask it to analyze, clean, or transform it. Claude can write Excel formulas, SQL queries, or Python/pandas scripts for more complex operations. Describe the transformation you need in plain English and let Claude produce the code.</p>

<h3>Meeting Preparation and Follow-up</h3>
<p>Before a meeting: give Claude the agenda and ask it to prepare briefing notes, anticipate likely questions, or draft talking points. After a meeting: paste in your rough notes and ask Claude to produce a clean summary with action items, owners, and deadlines.</p>

<h3>Learning New Topics</h3>
<p>Claude is an effective tutor. Ask it to explain a concept at whatever level you're at, then ask follow-up questions until the concept clicks. "Explain asymmetric encryption like I'm a developer but not a security specialist." "Now explain what could go wrong if I implement it incorrectly." This back-and-forth learning style is one of Claude's most underrated uses.</p>
`,
    keyTakeaways: [
      "Email drafting, document summarization, and brainstorming are consistently high-value daily applications",
      "Claude's 200K context window lets you paste entire long documents for analysis without chunking",
      "Paste CSV or tabular data directly to get formulas, SQL queries, or data-processing scripts",
      "Back-and-forth tutoring conversations are one of the most effective ways to learn new topics with Claude",
    ],
  },
  {
    courseSlug: "claude-101",
    moduleIndex: 4,
    title: "Best Practices and Safety Guidelines",
    estimatedMinutes: 10,
    content: `
<h2>Using Claude Responsibly and Effectively</h2>
<p>Claude is a powerful tool, and like any powerful tool, using it well requires some care. This module covers the practices that will make your work with Claude more effective, reliable, and responsible.</p>

<h3>Verify Important Information</h3>
<p>Claude can be wrong. It may confidently state facts that are outdated, imprecise, or simply incorrect — especially for specific numbers, dates, recent events, and niche technical details. Always verify important factual claims through authoritative sources before acting on them, presenting them to others, or publishing them.</p>
<p>Claude is generally more reliable for reasoning about information you provide than for recalling facts from training. When precision matters, give Claude the facts and ask it to reason; don't ask it to recall.</p>

<h3>Don't Share Sensitive Personal Data</h3>
<p>Avoid pasting in private personal information — social security numbers, passwords, confidential financial data, private health records, or sensitive information about third parties who haven't consented to it being shared. Treat Claude conversations as you would a shared document: only include what you'd be comfortable with in that context.</p>
<p>For enterprise and sensitive use cases, Anthropic offers Claude for Business and API solutions with stricter data handling agreements. The standard claude.ai terms govern consumer usage.</p>

<h3>Understand Claude's Limitations</h3>
<p>Key limitations to keep in mind:</p>
<ul>
  <li><strong>Knowledge cutoff:</strong> Claude's training data has a cutoff date. It doesn't know about recent events, newly released software, or current prices.</li>
  <li><strong>No memory by default:</strong> Each new conversation starts fresh unless you're using Projects.</li>
  <li><strong>Can't browse the web:</strong> Unless using a tool-enabled version, Claude works only from what's in its training or what you provide.</li>
  <li><strong>Not a calculator:</strong> For precise arithmetic on large numbers, have Claude write code rather than compute directly.</li>
</ul>

<h3>Be Clear About Intended Use</h3>
<p>Claude is designed to be helpful within ethical boundaries. If you're asking for something that could be misused, providing context about your legitimate purpose often helps Claude give a better response. "I'm a nurse asking about medication overdose thresholds for patient safety" produces a different response than the same question without context.</p>

<h3>Review AI-Generated Content Before Publishing</h3>
<p>Always review and edit Claude's output before sharing it publicly, sending it to clients, or using it in professional contexts. AI-generated text can contain subtle errors, awkward phrasing, or off-brand tone. Your judgment and review are part of the workflow, not optional steps.</p>

<h3>Responsible Use Summary</h3>
<p>Claude is a collaborator, not a replacement for your judgment. The best outcomes come when you bring your expertise, context, and critical thinking while Claude handles the heavy lifting of drafting, analysis, and research. That partnership — human judgment plus AI capability — is where the real value lies.</p>
`,
    keyTakeaways: [
      "Always verify important factual claims — Claude can be confidently wrong, especially on specific numbers and recent events",
      "Don't share sensitive personal data; treat Claude conversations like a shared document",
      "Claude has a knowledge cutoff, no default memory across sessions, and can't browse the web",
      "Review and edit AI-generated content before publishing; your judgment is part of the workflow",
    ],
  },
];

export default lessons;
