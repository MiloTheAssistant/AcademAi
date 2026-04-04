import type { LessonContent } from "../lessons";

const lessons: LessonContent[] = [
  {
    courseSlug: "ai-fluency-framework-foundations",
    moduleIndex: 0,
    title: "Introduction to AI Fluency",
    estimatedMinutes: 10,
    content: `
<h2>What Is AI Fluency?</h2>
<p>AI Fluency is the ability to work with artificial intelligence systems <strong>effectively, efficiently, ethically, and safely</strong>. It's a framework developed by Anthropic to help individuals and organizations move beyond basic AI usage toward genuinely skilled, responsible collaboration with AI.</p>

<h3>Why AI Fluency Matters Now</h3>
<p>AI tools are becoming as fundamental to professional work as spreadsheets, search engines, and email once were. The question is no longer whether AI will be part of your work — it's whether you'll use it well. AI Fluency is the difference between someone who gets mediocre outputs from AI tools and someone who consistently gets exceptional results while avoiding the pitfalls.</p>

<h3>The Four Dimensions of AI Fluency</h3>
<ul>
  <li><strong>Effective:</strong> Achieving your actual goals with AI assistance — not just getting any output, but getting the right output</li>
  <li><strong>Efficient:</strong> Getting high-quality results with appropriate time and effort — knowing when AI helps and when it doesn't</li>
  <li><strong>Ethical:</strong> Using AI in ways that are honest, fair, and respectful of others — considering impact beyond your immediate task</li>
  <li><strong>Safe:</strong> Managing risks appropriately — protecting sensitive information, verifying important claims, maintaining human judgment where it matters</li>
</ul>

<h3>AI Fluency Is a Skill, Not a Trait</h3>
<p>AI Fluency isn't something you either have or don't. It's a set of skills that can be deliberately developed and improved. Like writing or communication, some people develop these skills faster, but everyone can improve with practice and good frameworks.</p>

<h3>What This Course Covers</h3>
<p>This course establishes the foundation: understanding what AI systems actually are, how to collaborate with them effectively, what their limitations are, and how to use them in ways you can be proud of. Subsequent courses in the AI Fluency series go deeper on specific applications — for educators, students, nonprofits, and instructors.</p>
`,
    keyTakeaways: [
      "AI Fluency is the ability to work with AI effectively, efficiently, ethically, and safely",
      "The four dimensions are a framework — all four matter; neglecting any creates problems",
      "AI Fluency is a learnable skill, not an innate trait — it improves with deliberate practice",
      "This course establishes foundations; later courses apply the framework to specific contexts",
    ],
  },
  {
    courseSlug: "ai-fluency-framework-foundations",
    moduleIndex: 1,
    title: "Effective Collaboration with AI",
    estimatedMinutes: 12,
    content: `
<h2>Working Effectively with AI Systems</h2>
<p>Effective AI collaboration means consistently getting outputs that genuinely accomplish your goals — not just outputs that look like an answer. This requires understanding what AI systems are good at, how to communicate your needs clearly, and how to evaluate whether what you got is actually what you needed.</p>

<h3>The Collaboration Mindset</h3>
<p>The most important shift is from <em>using</em> AI to <em>collaborating</em> with AI. When you use a calculator, you just press buttons. When you collaborate with Claude, you're engaging in a back-and-forth that requires your active participation:</p>
<ul>
  <li>You provide context Claude doesn't have</li>
  <li>Claude provides capabilities you don't have (or don't want to spend time on)</li>
  <li>You evaluate outputs and provide direction</li>
  <li>Claude refines and improves based on your feedback</li>
</ul>

<h3>Setting Clear Goals</h3>
<p>Before engaging AI, be clear about what you actually want. The clearest goals specify: the output type (a document, a list, code, an analysis), the audience (who will read or use this), the purpose (what decision or action this will enable), and any constraints (length, format, style, things to avoid).</p>

<h3>Communicating Needs Clearly</h3>
<p>AI systems work from what you tell them. Common failures in AI collaboration come from:</p>
<ul>
  <li>Assuming the AI knows context you haven't provided</li>
  <li>Being vague about desired output (hoping AI will "figure out" what you want)</li>
  <li>Accepting the first output without evaluating it critically</li>
  <li>Not providing feedback when the output misses the mark</li>
</ul>

<h3>Evaluating AI Output</h3>
<p>Before using AI output, ask: Does this actually accomplish what I needed? Is this accurate? Does this fit my context? Is there anything missing or misleading? Would I be comfortable if others could see that I used AI to help with this? Evaluation is a non-negotiable step in effective AI collaboration.</p>

<h3>Iterative Improvement</h3>
<p>Rarely does the first AI output need no refinement. Treat it as a draft and iterate. Specific feedback produces better results than vague dissatisfaction: "Make this more formal" outperforms "this isn't quite right."</p>
`,
    keyTakeaways: [
      "Effective AI collaboration requires your active participation — it's not passive tool use",
      "Clear goals specify output type, audience, purpose, and constraints before you start",
      "Common failures: assuming shared context, being vague, accepting first output without evaluation",
      "Iterate with specific feedback — first outputs are drafts, not final products",
    ],
  },
  {
    courseSlug: "ai-fluency-framework-foundations",
    moduleIndex: 2,
    title: "Efficient AI Interaction Techniques",
    estimatedMinutes: 11,
    content: `
<h2>Getting More Done with Less Effort</h2>
<p>Efficient AI use means achieving high-quality results without wasting your time or the AI's capabilities. Inefficiency shows up as: using AI for tasks where it doesn't help, over-relying on AI for tasks where your judgment is what's needed, or spending more time correcting bad AI output than it would have taken to do the task yourself.</p>

<h3>When to Use AI (and When Not To)</h3>
<p>AI tends to deliver strong efficiency gains for:</p>
<ul>
  <li>Drafting first versions of written content</li>
  <li>Summarizing and synthesizing information</li>
  <li>Generating options and alternatives for brainstorming</li>
  <li>Repetitive tasks with clear patterns</li>
  <li>Research starting points and explanations</li>
</ul>
<p>AI tends to be less efficient for:</p>
<ul>
  <li>Decisions requiring deep personal context or values</li>
  <li>Tasks where accuracy on specific facts is critical and time-sensitive</li>
  <li>Short tasks that take less time to do directly than to prompt</li>
  <li>Tasks requiring physical presence or real-world action</li>
</ul>

<h3>Building Effective Workflows</h3>
<p>Efficient AI users build repeatable workflows rather than reinventing the wheel each time. If you find yourself writing the same type of prompt repeatedly, develop a template. If you have a recurring task type, design a standard approach for handling it with AI.</p>

<h3>Batching and Parallelizing</h3>
<p>When you have multiple related tasks, consider giving them all to AI at once rather than sequentially. "Summarize each of these five articles in two sentences" is more efficient than five separate interactions. Batching reduces the overhead of starting new interactions and helps maintain consistent formatting.</p>

<h3>The Efficiency-Quality Tradeoff</h3>
<p>Speed and quality are often in tension. A quick AI-generated draft saves time but may need more editing than a more carefully prompted version. Know when "good enough quickly" is the right tradeoff and when quality justifies more time. High-stakes outputs (published work, important decisions, client deliverables) warrant more effort and review.</p>
`,
    keyTakeaways: [
      "AI is most efficient for drafting, summarizing, brainstorming, and repetitive structured tasks",
      "AI is less efficient for decisions requiring personal context, precision-critical facts, or short tasks",
      "Build templates for recurring task types — don't reinvent the prompt each time",
      "Know your quality-efficiency tradeoff; high-stakes outputs warrant more review time",
    ],
  },
  {
    courseSlug: "ai-fluency-framework-foundations",
    moduleIndex: 3,
    title: "Ethical Considerations",
    estimatedMinutes: 12,
    content: `
<h2>Using AI Ethically</h2>
<p>The ethical dimension of AI Fluency is about using AI in ways that are honest, fair, and considerate of others. It's not just about avoiding obvious misuse — it's about thinking carefully about the broader impact of AI-assisted work on the people it affects.</p>

<h3>Honesty and Transparency</h3>
<p>A foundational ethical question in AI use is: when should you disclose that AI helped you? There's no single answer — it depends on context, expectations, and stakes:</p>
<ul>
  <li><strong>Academic work:</strong> Most institutions have explicit policies — know and follow them</li>
  <li><strong>Professional work:</strong> If the context implies you personally did the work (e.g., a job application writing sample), transparency is important</li>
  <li><strong>Published work:</strong> Disclosure norms are evolving but trending toward transparency</li>
  <li><strong>Personal communications:</strong> Using AI to help draft a message you genuinely mean is generally fine</li>
</ul>

<h3>Avoiding Harm</h3>
<p>Consider how your AI-assisted work might affect others:</p>
<ul>
  <li>Does this spread inaccurate information? (AI can hallucinate convincingly)</li>
  <li>Does this treat people fairly and without unfair bias?</li>
  <li>Does this respect others' privacy and confidentiality?</li>
  <li>Could this be used to deceive or manipulate?</li>
</ul>

<h3>Intellectual Property</h3>
<p>AI models are trained on vast amounts of text and creative work. When AI generates content similar to copyrighted work, the legal and ethical situation is complex and evolving. Be thoughtful about: asking AI to reproduce copyrighted text verbatim, using AI to imitate a specific living person's voice or style, and AI-generated content in contexts with specific IP expectations.</p>

<h3>Fairness and Bias</h3>
<p>AI systems can reflect and amplify biases present in training data. When using AI for tasks that affect people (hiring, lending, grading, etc.), be especially careful to evaluate outputs for fairness. AI should not make high-stakes decisions about people without meaningful human review.</p>

<h3>The "Would I Be Comfortable If..." Test</h3>
<p>A useful heuristic: would you be comfortable if the people affected by this work could see exactly how it was produced — including which parts were AI-generated and how? If yes, you're likely in good ethical territory. If not, that discomfort is worth examining.</p>
`,
    keyTakeaways: [
      "Disclosure of AI use depends on context — know the expectations and policies that apply",
      "Consider impact on others: accuracy, fairness, privacy, and potential for harm or deception",
      "AI can reflect training data biases — human review is essential for high-stakes decisions about people",
      "The comfort test: would you be comfortable if others could see exactly how this was produced?",
    ],
  },
  {
    courseSlug: "ai-fluency-framework-foundations",
    moduleIndex: 4,
    title: "Safety Practices",
    estimatedMinutes: 11,
    content: `
<h2>Managing Risk in AI Use</h2>
<p>The safety dimension of AI Fluency is about managing the real risks that come with using AI tools — not being paralyzed by fear, but not being naively optimistic either. Good safety practices protect you, your organization, and the people your work affects.</p>

<h3>Information Security</h3>
<p>Before sharing anything with an AI system, consider whether it's appropriate to do so:</p>
<ul>
  <li><strong>Personal data:</strong> Avoid sharing names, addresses, SSNs, financial details, or health information of real individuals</li>
  <li><strong>Confidential business information:</strong> Check your organization's AI use policy before sharing trade secrets, unreleased product plans, or client information</li>
  <li><strong>Credentials:</strong> Never share passwords, API keys, or authentication tokens</li>
  <li><strong>Third-party confidential information:</strong> Information shared with you in confidence shouldn't be shared with AI without permission</li>
</ul>

<h3>Verification and Fact-Checking</h3>
<p>AI can produce plausible-sounding false information confidently. This is called "hallucination." For any factual claim that will inform a significant decision or be published/presented to others, verify through authoritative sources. The higher the stakes, the more important verification becomes.</p>

<h3>Maintaining Human Judgment</h3>
<p>Certain decisions should remain under human judgment regardless of AI capability:</p>
<ul>
  <li>Decisions with significant consequences for individuals' lives and opportunities</li>
  <li>Creative and values-based choices that require your authentic voice or perspective</li>
  <li>Situations where accountability matters and a human must own the outcome</li>
  <li>Contexts where the relationship itself has value (not just the output)</li>
</ul>

<h3>Dependency and Skill Maintenance</h3>
<p>There's a real risk of becoming over-dependent on AI for capabilities you need to maintain directly. If you use AI to write everything, you may lose your own writing ability. Intentionally practice core skills directly, not just via AI assistance, to maintain your fundamental capabilities.</p>

<h3>Organizational Safety</h3>
<p>If you're in an organization, know your AI use policies before deploying AI in workflows. Many organizations have (or are developing) policies about which AI tools are approved, what data can be shared, and how AI-assisted outputs should be reviewed. Working outside these policies, even with good intentions, can create liability and trust problems.</p>
`,
    keyTakeaways: [
      "Don't share personal data, confidential business information, or credentials with AI systems",
      "Verify important factual claims — AI confidently produces false information (hallucination)",
      "Maintain human judgment for high-stakes decisions, accountability-sensitive contexts, and authentic expression",
      "Know your organization's AI policies before using AI in professional workflows",
    ],
  },
  {
    courseSlug: "ai-fluency-framework-foundations",
    moduleIndex: 5,
    title: "Building AI Fluency Skills",
    estimatedMinutes: 10,
    content: `
<h2>Developing and Deepening Your AI Fluency</h2>
<p>AI Fluency is not a certification you earn once — it's a set of skills that requires ongoing development as AI capabilities evolve and as you encounter new use cases. This module provides a roadmap for continuous improvement.</p>

<h3>Deliberate Practice</h3>
<p>Like any skill, AI Fluency improves with deliberate practice — intentional, focused efforts to improve specific aspects of your performance. Rather than using AI the same way every day, deliberately try new approaches, reflect on what worked, and adjust:</p>
<ul>
  <li>Try a new prompting technique with a task you do regularly</li>
  <li>Experiment with using AI for a task you've never tried AI on</li>
  <li>Review outputs you got last month — would you handle them differently now?</li>
</ul>

<h3>Building a Personal Prompt Library</h3>
<p>Keep a library of prompts and approaches that work well for your recurring tasks. Document: the situation, the prompt structure, why it works, and any variations you've found useful. This library becomes a valuable resource and forces you to articulate what makes a prompt effective.</p>

<h3>Learning from Others</h3>
<p>The AI Fluency community is large and active. Resources to learn from:</p>
<ul>
  <li>Anthropic's documentation and prompt engineering guides</li>
  <li>Case studies of how professionals in your field are using AI effectively</li>
  <li>Professional communities and forums where AI use cases are shared</li>
  <li>Colleagues who are getting good results with AI — ask them how</li>
</ul>

<h3>Staying Current</h3>
<p>AI capabilities evolve rapidly. A limitation that made a task impractical six months ago may no longer exist. Periodically revisit AI for tasks where it previously fell short — the tools are constantly improving. Conversely, new capabilities may introduce new risks worth understanding.</p>

<h3>Teaching Others</h3>
<p>One of the best ways to deepen your own AI Fluency is to help others develop theirs. Explaining your approach, sharing effective prompts, and helping colleagues navigate AI challenges forces you to articulate and refine your own understanding. This is why Anthropic has developed the AI Fluency Educator and Teaching pathways.</p>
`,
    keyTakeaways: [
      "AI Fluency requires ongoing development — deliberately try new approaches and reflect on results",
      "Build a personal prompt library documenting what works for your recurring tasks",
      "Revisit AI for previously impractical tasks — capabilities improve rapidly",
      "Teaching others deepens your own fluency — share your knowledge and help your community develop",
    ],
  },
];

export default lessons;
