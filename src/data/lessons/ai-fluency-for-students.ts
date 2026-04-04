import type { LessonContent } from "../lessons";

const lessons: LessonContent[] = [
  {
    courseSlug: "ai-fluency-for-students",
    moduleIndex: 0,
    title: "AI Fluency Fundamentals",
    estimatedMinutes: 10,
    content: `
<h2>AI Fluency: What It Means for You as a Student</h2>
<p>AI tools are already part of how many students work, and they're becoming more capable every year. AI Fluency — the ability to work with AI effectively, efficiently, ethically, and safely — is quickly becoming one of the most valuable skills you can develop for school, work, and life.</p>

<h3>AI as a Study and Learning Tool</h3>
<p>AI assistants like Claude can support your learning in powerful ways:</p>
<ul>
  <li><strong>Explanation on demand:</strong> Ask for concepts to be explained at exactly your level, as many times as you need, with different examples each time</li>
  <li><strong>Socratic partner:</strong> AI can ask you questions to test your understanding, helping you discover gaps before an exam does</li>
  <li><strong>Writing assistance:</strong> Help with structure, feedback on drafts, and understanding what makes writing effective</li>
  <li><strong>Research starting points:</strong> Quickly understand a new topic before diving into primary sources</li>
  <li><strong>Practice problems:</strong> Generate more practice on concepts you're finding difficult</li>
</ul>

<h3>The Critical Difference: Learning With vs. Learning For</h3>
<p>Here's the most important thing to understand about AI and learning: there's a difference between using AI to <em>support</em> your learning and using AI to <em>bypass</em> your learning. When AI explains a concept until you genuinely understand it, that's learning with AI. When AI writes your essay so you don't have to think through the argument yourself, that's AI replacing your learning — and you're the one who loses.</p>

<h3>Why This Matters for Your Future</h3>
<p>The skills you're developing in school — critical thinking, clear communication, problem-solving, learning new things — are precisely the skills that remain valuable even as AI handles more tasks. Students who use AI to develop these skills will be better prepared for careers than those who use AI to avoid developing them.</p>
`,
    keyTakeaways: [
      "AI Fluency is a valuable skill for academic success, career readiness, and lifelong learning",
      "AI can support learning through explanation, Socratic questioning, writing feedback, and practice",
      "Key distinction: using AI to support learning vs. using AI to bypass the learning process",
      "Developing your own capabilities with AI assistance prepares you better than bypassing development",
    ],
  },
  {
    courseSlug: "ai-fluency-for-students",
    moduleIndex: 1,
    title: "Responsible AI Collaboration",
    estimatedMinutes: 11,
    content: `
<h2>Academic Integrity in the Age of AI</h2>
<p>Academic integrity isn't just about following rules — it's about your own learning and your relationship to the intellectual community you're part of. Understanding how to use AI responsibly protects your learning, your integrity, and your academic future.</p>

<h3>Understanding Your Institution's Policies</h3>
<p>Different institutions and instructors have very different AI policies, and they vary by assignment type, course level, and discipline. Before using AI on any academic work:</p>
<ul>
  <li>Read the course syllabus for the instructor's specific AI policy</li>
  <li>Check your institution's academic integrity policy for AI guidance</li>
  <li>When in doubt, ask your instructor — they generally appreciate proactive students asking</li>
  <li>Don't assume that because another course allows AI, this course does too</li>
</ul>

<h3>The Spectrum of AI Use</h3>
<p>AI use in academic work exists on a spectrum. Most policies distinguish between:</p>
<ul>
  <li><strong>Clearly fine:</strong> Using AI to understand concepts, generate practice problems, get feedback on your thinking</li>
  <li><strong>Context-dependent:</strong> Using AI to help structure or edit your writing — permitted in many courses, not others</li>
  <li><strong>Generally problematic:</strong> Submitting AI-generated text as your own work without disclosure</li>
  <li><strong>Academic dishonesty:</strong> Misrepresenting AI work as yours in contexts where that's explicitly prohibited</li>
</ul>

<h3>Transparency and Disclosure</h3>
<p>When AI assistance is permitted, many instructors ask for disclosure. Be specific and honest about what AI contributed: "I used Claude to help structure my argument outline and then got feedback on my draft. All the writing and analysis is mine." This kind of transparency builds trust and helps instructors give you accurate feedback on your own capabilities.</p>

<h3>The Long View</h3>
<p>Grades and credentials are temporary; skills and understanding are permanent. The student who uses AI to shortcut assignments gets a grade but misses the learning. The student who uses AI to deepen their engagement gets the grade <em>and</em> the learning. Choose accordingly.</p>
`,
    keyTakeaways: [
      "Always check course-specific AI policies — they vary by instructor and assignment",
      "AI use exists on a spectrum from clearly fine (concept explanation) to problematic (submitting AI work as your own)",
      "Transparency about AI use builds trust and helps instructors give accurate feedback on your capabilities",
      "Grades are temporary; skills are permanent — use AI to develop, not to bypass, your capabilities",
    ],
  },
  {
    courseSlug: "ai-fluency-for-students",
    moduleIndex: 2,
    title: "Enhancing Learning with AI",
    estimatedMinutes: 12,
    content: `
<h2>Study Techniques That Actually Work with AI</h2>
<p>AI can make you a significantly more effective learner — but only if you use it in ways that support genuine understanding rather than giving you an illusion of understanding. This module covers evidence-aligned learning techniques that AI can enhance.</p>

<h3>Active Recall with AI</h3>
<p>Active recall (testing yourself on material) is one of the most effective study techniques. AI makes it infinitely scalable:</p>
<pre><code>Prompt: "I just read about the causes of World War I.
Ask me questions about it. Don't give me the answers
— wait for my response and then tell me what I got right
or wrong and what I missed."</code></pre>
<p>This is much better than rereading your notes, and you can do it for any topic, at any time.</p>

<h3>Feynman Technique with AI</h3>
<p>The Feynman Technique involves explaining a concept in simple terms to identify gaps in your understanding. With AI:</p>
<pre><code>Prompt: "I'm going to explain photosynthesis in simple terms.
Point out anything I get wrong or oversimplify, and ask me
about parts I skip over."</code></pre>
<p>Then explain the concept out loud or in writing. AI will catch errors and gaps, helping you identify exactly what you don't understand yet.</p>

<h3>Connecting Concepts</h3>
<p>Deep learning comes from connecting new information to what you already know. Use AI to help make these connections:</p>
<pre><code>Prompt: "I understand supply and demand from economics.
How does that concept relate to the equilibrium concept
in chemistry that we're studying now?"</code></pre>

<h3>Debugging Your Thinking</h3>
<p>When you're stuck on a problem, resist the urge to ask AI for the answer. Instead, describe your thinking so far and ask AI to help you identify where you might have gone wrong:</p>
<pre><code>Prompt: "I'm trying to solve this calculus problem.
Here's what I've tried so far and where I got stuck: [...]
Don't give me the solution — help me see what I'm missing."</code></pre>

<h3>The Illusion of Knowing</h3>
<p>Reading a clear AI explanation can create an illusion of understanding. You read it, it made sense, therefore you know it. But "making sense when reading" and "can explain it yourself later" are very different. Always test your understanding by trying to explain it back without looking — use AI to check your explanation, not to replace it.</p>
`,
    keyTakeaways: [
      "Use AI for active recall testing — have it ask you questions and evaluate your answers",
      "Apply the Feynman Technique: explain concepts to AI and have it identify errors and gaps",
      "Ask AI to connect new concepts to things you already understand for deeper learning",
      "Avoid the illusion of knowing — test understanding by explaining without looking, then check with AI",
    ],
  },
  {
    courseSlug: "ai-fluency-for-students",
    moduleIndex: 3,
    title: "Career Planning with AI Fluency",
    estimatedMinutes: 11,
    content: `
<h2>AI Fluency as a Career Asset</h2>
<p>AI Fluency is increasingly a differentiating skill in the job market. This module helps you understand how to develop it strategically as a career asset and how to think about AI's impact on the careers you're considering.</p>

<h3>What Employers Are Looking For</h3>
<p>Employers across industries increasingly want people who can work effectively with AI tools. Specifically, they value:</p>
<ul>
  <li>Ability to use AI to accelerate work without sacrificing quality</li>
  <li>Judgment about when to use AI and when not to</li>
  <li>Critical evaluation of AI outputs — not accepting everything AI generates</li>
  <li>Understanding of AI's limitations and risks</li>
  <li>Ethical awareness about AI use in professional contexts</li>
</ul>
<p>These are AI Fluency skills — which is why investing in them now pays off in your career.</p>

<h3>AI's Impact on Career Fields</h3>
<p>Different career fields are being affected by AI differently:</p>
<ul>
  <li><strong>Writing and communications:</strong> AI handles drafting; human value is in judgment, relationships, and original insight</li>
  <li><strong>Software engineering:</strong> AI handles repetitive coding; human value is in architecture, problem framing, and code review</li>
  <li><strong>Research and analysis:</strong> AI handles synthesis; human value is in question framing, methodology, and interpretation</li>
  <li><strong>Healthcare:</strong> AI assists with diagnosis and documentation; human value is in care, judgment, and relationships</li>
  <li><strong>Education:</strong> AI handles tutoring and content; human value is in mentorship, inspiration, and community</li>
</ul>
<p>In almost every field, AI handles the more routine aspects while human value concentrates in judgment, relationships, creativity, and ethics.</p>

<h3>Building an AI Portfolio</h3>
<p>Document your AI Fluency for potential employers. Include examples of:</p>
<ul>
  <li>Projects where you used AI effectively to accelerate work</li>
  <li>Cases where you identified and corrected AI errors</li>
  <li>Situations where you made good judgment calls about when not to use AI</li>
  <li>Reflections on the ethical dimensions of AI use in your field</li>
</ul>

<h3>Staying Relevant in an AI-Augmented World</h3>
<p>The most career-resilient students develop AI Fluency alongside strong foundational skills in their field — not instead of them. AI tools change; disciplinary knowledge, critical thinking, and professional judgment remain foundational. Don't neglect your field's fundamentals in pursuit of AI shortcuts.</p>
`,
    keyTakeaways: [
      "Employers value AI Fluency: using AI effectively, knowing its limits, and evaluating outputs critically",
      "AI concentrates human value on judgment, relationships, creativity, and ethics — develop these",
      "Build an AI portfolio documenting effective AI use, error correction, and ethical judgment",
      "AI Fluency augments foundational skills — don't neglect fundamentals in pursuit of AI shortcuts",
    ],
  },
  {
    courseSlug: "ai-fluency-for-students",
    moduleIndex: 4,
    title: "Academic Success Strategies",
    estimatedMinutes: 12,
    content: `
<h2>Using AI Strategically for Academic Success</h2>
<p>AI can help you be a more effective student when used strategically. This module covers practical approaches for common academic tasks.</p>

<h3>Research and Literature Review</h3>
<p>AI is an excellent tool for building initial understanding of a topic, but remember: AI cannot access the latest research, may hallucinate citations, and shouldn't replace primary sources. Effective AI-assisted research:</p>
<ul>
  <li>Use AI to build initial conceptual understanding of an unfamiliar topic</li>
  <li>Use AI to explain confusing papers in accessible terms</li>
  <li>Use AI to help identify what kinds of sources you should look for</li>
  <li>Use databases (JSTOR, PubMed, Google Scholar) for actual sources — not AI</li>
  <li>Never cite an AI-generated summary as if it's a source</li>
</ul>

<h3>The Writing Process</h3>
<p>AI can help at multiple stages of writing without replacing your thinking:</p>
<ul>
  <li><strong>Brainstorming:</strong> Ask AI for 10 different angles on your topic, then choose and develop your own perspective</li>
  <li><strong>Outlining:</strong> Develop your outline first, then ask AI to critique its logic or completeness</li>
  <li><strong>Drafting:</strong> Write your own draft first, then ask AI for feedback</li>
  <li><strong>Revision:</strong> Ask AI to identify unclear passages, weak arguments, or missing evidence</li>
</ul>
<p>Notice that in all of these, <em>you</em> produce the core content. AI helps you improve it.</p>

<h3>STEM Problem-Solving</h3>
<p>For math, science, and engineering coursework:</p>
<ul>
  <li>Use AI to explain <em>why</em> a method works, not just <em>how</em></li>
  <li>Generate more practice problems of the type you're finding difficult</li>
  <li>Ask AI to check your work and explain any errors</li>
  <li>Have AI create concept maps connecting related ideas</li>
</ul>

<h3>Presentations and Projects</h3>
<p>For presentations: use AI to help structure your narrative arc, anticipate audience questions, and practice your delivery (describe the concept to AI, get feedback on clarity). For group projects: AI can help with facilitation — generating discussion questions, synthesizing different perspectives, or helping structure collaborative documents.</p>

<h3>Managing Academic Stress</h3>
<p>AI can help you manage academic workload strategically: prioritize what needs your full effort vs. what can be done efficiently with AI assistance, break large projects into manageable steps, and create realistic study schedules. But remember: rest, exercise, and human connection are not tasks AI can substitute for.</p>
`,
    keyTakeaways: [
      "Use AI for conceptual understanding and explanation in research — not for generating citations",
      "In writing, produce core content yourself and use AI to critique and improve it",
      "For STEM: use AI to explain why methods work and to generate more practice problems",
      "AI helps manage workload strategically — but rest, exercise, and connection are irreplaceable",
    ],
  },
  {
    courseSlug: "ai-fluency-for-students",
    moduleIndex: 5,
    title: "Building Long-term Skills",
    estimatedMinutes: 10,
    content: `
<h2>Developing AI Fluency as a Lifelong Skill</h2>
<p>You're entering a world where AI capabilities will continue to grow for the foreseeable future. The approach you develop now toward working with AI will shape your learning, career, and life for decades. This module helps you build habits that serve you long-term.</p>

<h3>Develop Your Judgment, Not Just Your Prompts</h3>
<p>The most valuable AI skill isn't knowing the cleverest prompts — it's developing judgment about when to use AI, how to evaluate what it produces, and how to integrate AI assistance into work that's authentically yours. This judgment can't be learned from a course; it develops through experience, reflection, and honest self-assessment.</p>

<h3>Build Metacognitive Habits</h3>
<p>After significant AI interactions, reflect:</p>
<ul>
  <li>Did I use AI in a way I feel good about?</li>
  <li>Did I actually learn something, or just produce something?</li>
  <li>What would I have done differently?</li>
  <li>Did I catch anything important that AI got wrong?</li>
</ul>
<p>This reflection habit is what separates students who genuinely develop AI Fluency from those who just use AI tools unreflectively.</p>

<h3>Stay Curious and Adaptive</h3>
<p>AI capabilities change rapidly. The tools available when you graduate will be significantly more capable than those available now. Students who approach AI with curiosity — willing to experiment, willing to be surprised, willing to update their approaches — will adapt better than those who develop rigid habits around current tools.</p>

<h3>Know What AI Can't Do for You</h3>
<p>AI cannot develop your work ethic, your resilience, your relationships, your values, or your sense of purpose. These come from engagement with difficult challenges, genuine connection with others, and reflection on what matters to you. AI can be a powerful tool in service of these goals, but it can't substitute for them.</p>

<h3>Contribute to the Conversation</h3>
<p>You are among the first generations of students to grow up with AI as a normal part of education. Your experience — what works, what doesn't, what feels right and what doesn't — is valuable. Share it with your peers, your instructors, and the broader conversation about how AI should be used in education. Your perspective matters.</p>
`,
    keyTakeaways: [
      "Develop judgment about when and how to use AI — this is more valuable than clever prompts",
      "Build a reflection habit after AI interactions: Did I learn? Did I feel good about how I used it?",
      "Stay curious and adaptive — AI capabilities change rapidly; rigid habits around current tools won't serve you",
      "AI can't develop your character, relationships, or sense of purpose — engage directly with what matters",
    ],
  },
];

export default lessons;
