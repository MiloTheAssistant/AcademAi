import type { LessonContent } from "../lessons";

const lessons: LessonContent[] = [
  {
    courseSlug: "teaching-ai-fluency",
    moduleIndex: 0,
    title: "Curriculum Development",
    estimatedMinutes: 13,
    content: `
<h2>Building AI Fluency Curricula</h2>
<p>This course is for academic faculty, instructional designers, and others who will teach AI Fluency in instructor-led settings. Teaching AI Fluency requires different preparation from using it — you need not only your own fluency but the ability to develop it in others.</p>

<h3>Curriculum Design Principles</h3>
<p>Effective AI Fluency curricula are:</p>
<ul>
  <li><strong>Competency-based:</strong> Organized around skills and abilities learners will demonstrate, not topics to cover</li>
  <li><strong>Contextual:</strong> Grounded in learners' actual work and contexts rather than abstract AI concepts</li>
  <li><strong>Iterative:</strong> Returned to over time as learners develop and as AI capabilities evolve</li>
  <li><strong>Experiential:</strong> Built around hands-on practice with real AI tools, not just conceptual understanding</li>
  <li><strong>Reflective:</strong> Creating structured opportunities for learners to examine their own AI interactions</li>
</ul>

<h3>Mapping to Learner Contexts</h3>
<p>Different learner groups need contextually relevant AI Fluency curricula:</p>
<ul>
  <li>Business students need cases and tools relevant to professional business contexts</li>
  <li>STEM students need application to research, coding, and technical analysis</li>
  <li>Humanities students need application to writing, analysis, and research</li>
  <li>K-12 teachers need pedagogy, assessment design, and age-appropriate applications</li>
</ul>
<p>Starting curriculum development by deeply understanding your specific learner context — their current AI exposure, their career or learning goals, and the specific tasks AI will affect in their lives — produces much more effective curricula than starting from general AI concepts.</p>

<h3>Scope and Sequencing</h3>
<p>A full AI Fluency curriculum typically progresses through:</p>
<ol>
  <li>Foundations: what AI systems are, what they can and can't do</li>
  <li>Effective use: how to communicate with AI to get good outputs</li>
  <li>Critical evaluation: assessing AI output quality, accuracy, and appropriateness</li>
  <li>Ethical application: considering impact, fairness, and appropriate use</li>
  <li>Advanced applications: domain-specific and complex use cases</li>
  <li>Integration: making AI fluency part of ongoing professional practice</li>
</ol>

<h3>Aligning with Existing Outcomes</h3>
<p>AI Fluency doesn't need to be a standalone course. Often it integrates more effectively when woven into existing courses where it's directly relevant. Work to identify where AI Fluency competencies align with existing learning outcomes in your curriculum.</p>
`,
    keyTakeaways: [
      "Effective AI Fluency curricula are competency-based, contextual, experiential, and reflective",
      "Start by understanding your specific learner context — their goals and current AI exposure",
      "Scope: foundations → effective use → critical evaluation → ethics → advanced → integration",
      "Consider integrating AI Fluency into existing courses rather than treating it as standalone",
    ],
  },
  {
    courseSlug: "teaching-ai-fluency",
    moduleIndex: 1,
    title: "Instructional Design",
    estimatedMinutes: 12,
    content: `
<h2>Designing Effective AI Fluency Instruction</h2>
<p>Instructional design for AI Fluency requires careful thought about how to create learning experiences that build genuine skill rather than surface familiarity. This module covers the instructional design principles most important for AI Fluency teaching.</p>

<h3>Experiential Learning Structure</h3>
<p>AI Fluency is best developed through a cycle of: experience → reflection → conceptualization → application. Design instruction around this cycle:</p>
<ol>
  <li>Learners attempt an AI-assisted task (experience)</li>
  <li>Learners analyze what worked and what didn't (reflection)</li>
  <li>Instructor introduces frameworks and concepts that explain the patterns (conceptualization)</li>
  <li>Learners apply the frameworks to new tasks (application)</li>
</ol>
<p>Avoid the common mistake of front-loading conceptual content before experiential learning — learners engage more deeply with concepts when they've encountered the problems those concepts solve.</p>

<h3>Deliberate Practice Design</h3>
<p>Skill development requires deliberate practice — repetition of specific skills with targeted feedback. For AI Fluency, this means:</p>
<ul>
  <li>Designing exercises focused on a specific skill (e.g., evaluating factual accuracy in AI output)</li>
  <li>Providing clear criteria for what good performance looks like</li>
  <li>Ensuring learners receive feedback at a level of specificity that enables improvement</li>
  <li>Progressive challenge — starting simpler and adding complexity as skills develop</li>
</ul>

<h3>Case-Based Learning</h3>
<p>Cases of AI use in real contexts are highly engaging and effective for AI Fluency teaching. Cases provide:</p>
<ul>
  <li>Realistic complexity that abstract exercises lack</li>
  <li>Opportunities to discuss ethical and judgment questions without easy answers</li>
  <li>Concrete grounding for abstract principles</li>
  <li>A shared reference point for class discussion</li>
</ul>
<p>Develop cases from your learners' own field — a case about AI use in law is more engaging for law students than a generic AI scenario.</p>

<h3>Peer Learning Integration</h3>
<p>AI Fluency develops through discussion as well as practice. Design peer learning activities: peer review of AI-assisted work with structured evaluation criteria, case discussions where there isn't a clear right answer, and sharing prompting strategies that worked well. Peer learning exposes learners to diverse approaches and develops critical evaluation skills.</p>
`,
    keyTakeaways: [
      "Experience before conceptualization: let learners encounter problems before introducing frameworks",
      "Deliberate practice requires specific skills, clear criteria, targeted feedback, and progressive challenge",
      "Case-based learning provides realistic complexity — use cases from learners' own field",
      "Design peer learning activities to develop critical evaluation and expose diverse approaches",
    ],
  },
  {
    courseSlug: "teaching-ai-fluency",
    moduleIndex: 2,
    title: "Teaching Core Concepts",
    estimatedMinutes: 12,
    content: `
<h2>Effectively Teaching AI Fluency Fundamentals</h2>
<p>Certain core concepts are essential for AI Fluency and require deliberate teaching — they're not intuitive, and misunderstanding them causes persistent problems. This module covers how to teach the most important concepts effectively.</p>

<h3>Teaching What AI Actually Is</h3>
<p>Many learners arrive with misconceptions about AI — either that it's magically intelligent or that it's just a search engine. An effective conceptual model: AI language models are trained on vast amounts of text to predict what comes next, and this capability has been refined into something that can have sophisticated conversations and complete complex tasks. They are not databases, calculators, or people — they're something genuinely new.</p>
<p>Use exercises that reveal AI's nature: ask it factual questions about very recent events (reveals knowledge cutoff), ask it to count letters in a word (reveals that it works in tokens, not characters), ask it the same question twice (reveals non-determinism). These experiments build intuition better than explanations.</p>

<h3>Teaching Prompt Engineering</h3>
<p>The most common student frustration: "I tried AI and it didn't work." Almost always this is a prompt design issue. Teach the difference between:</p>
<ul>
  <li>What the learner <em>wanted</em> vs. what they actually asked for</li>
  <li>The context AI has vs. the context they assumed it had</li>
  <li>First drafts as starting points vs. final outputs</li>
</ul>
<p>Have learners analyze failed AI interactions from a prompt engineering perspective: what information was missing? What was vague? What assumptions were made? This analytical approach builds transferable prompt design skills.</p>

<h3>Teaching Critical Evaluation</h3>
<p>Critical evaluation of AI output is a skill learners often resist developing — it's easier to accept AI output than to evaluate it. Create structured evaluation exercises: give learners AI-generated content that contains specific errors, biases, or gaps, and ask them to identify and correct them. Starting with obvious errors builds the habit; gradually reduce the obviousness to build genuine discrimination skills.</p>

<h3>Teaching the Ethical Dimensions</h3>
<p>Ethics in AI use isn't a set of rules to memorize — it's a capacity for reasoning about situations where reasonable people might disagree. Teach it through cases with genuine ambiguity, not just obvious violations. The goal is learners who can reason through novel ethical situations, not just recognize prohibited uses.</p>
`,
    keyTakeaways: [
      "Use experiments (knowledge cutoff, letter counting) to build intuition about AI's nature",
      "Teach prompt analysis: have learners diagnose why specific interactions failed",
      "Build critical evaluation through structured exercises with errors to find — start obvious, decrease gradually",
      "Teach AI ethics through ambiguous cases that require reasoning, not just obvious prohibitions",
    ],
  },
  {
    courseSlug: "teaching-ai-fluency",
    moduleIndex: 3,
    title: "Hands-on Activity Design",
    estimatedMinutes: 12,
    content: `
<h2>Designing Activities That Build Real AI Fluency</h2>
<p>The activities you design determine whether learners develop genuine AI Fluency or just surface familiarity. This module provides a framework for designing activities that build durable skills.</p>

<h3>The Activity Design Framework</h3>
<p>For each activity, clarify:</p>
<ul>
  <li><strong>Target skill:</strong> Which specific AI Fluency skill does this build?</li>
  <li><strong>Cognitive level:</strong> Knowledge, understanding, application, analysis, evaluation, or creation?</li>
  <li><strong>Context:</strong> Is this grounded in learners' actual professional or academic context?</li>
  <li><strong>Reflection mechanism:</strong> How will learners examine and learn from their AI interactions?</li>
  <li><strong>Assessment criteria:</strong> How will you know if the skill is developing?</li>
</ul>

<h3>Effective Activity Types</h3>
<p><strong>Comparison exercises:</strong> Give learners the same task, have them complete it with and without AI, then analyze the differences. What did AI help with? What did it miss? What required human judgment?</p>
<p><strong>Error hunt exercises:</strong> Provide AI-generated content with embedded errors and ask learners to find and correct them — building critical evaluation skills.</p>
<p><strong>Prompt optimization challenges:</strong> Give learners a desired output and ask them to develop increasingly effective prompts to get there — builds prompt engineering skill through iteration.</p>
<p><strong>Ethical case discussions:</strong> Present cases with genuine ambiguity and facilitate structured discussion — develops ethical reasoning without requiring false certainty.</p>
<p><strong>AI collaboration documentation:</strong> Ask learners to document a complete AI-assisted workflow including prompts used, evaluation of outputs, revisions made, and reflection on the process.</p>

<h3>Avoiding Common Activity Design Mistakes</h3>
<ul>
  <li>Activities that measure AI output quality rather than learner skill</li>
  <li>Activities too abstract to feel relevant to learners' contexts</li>
  <li>Activities that can be "gamed" by passing AI output without engagement</li>
  <li>Activities without a reflection component — doing isn't learning without reflection</li>
</ul>

<h3>Using AI to Design Activities</h3>
<p>Use AI tools to help generate activity variations, create diverse examples, develop case materials, and check your activity designs for gaps. Just as AI Fluency is your course topic, demonstrating AI Fluency in your own course design models the skills you're teaching.</p>
`,
    keyTakeaways: [
      "Design activities with a specific target skill, cognitive level, context, reflection mechanism, and criteria",
      "Comparison exercises, error hunts, prompt optimization, and case discussions are high-value activity types",
      "Avoid activities that measure AI output quality rather than learner skill",
      "Include reflection in every activity — doing without reflection doesn't build durable skills",
    ],
  },
  {
    courseSlug: "teaching-ai-fluency",
    moduleIndex: 4,
    title: "Assessment Strategies",
    estimatedMinutes: 11,
    content: `
<h2>Assessing AI Fluency Development</h2>
<p>Assessment for AI Fluency has unique challenges: the most convenient assessments (test questions, multiple choice) often don't measure the skills that matter, while the most authentic assessments require judgment-intensive evaluation. This module provides practical strategies.</p>

<h3>Performance-Based Assessment</h3>
<p>AI Fluency is a performance skill — it should be assessed through performance, not description. The most valid assessments ask learners to demonstrate AI Fluency in context:</p>
<ul>
  <li>Complete a professional task with AI assistance and document your process</li>
  <li>Evaluate a provided AI-generated document for accuracy, quality, and appropriate use</li>
  <li>Design a prompt for a specified task, execute it, and analyze the result</li>
  <li>Respond to a case describing an AI use situation and recommend a course of action</li>
</ul>

<h3>Process Documentation</h3>
<p>Assessing the process, not just the product, is especially valuable for AI Fluency. Process documentation requirements:</p>
<ul>
  <li>Screenshots or logs of AI interactions</li>
  <li>Annotations explaining why certain prompts were chosen</li>
  <li>Notes on what was changed from AI output and why</li>
  <li>Reflection on what they would do differently</li>
</ul>
<p>Process documentation makes AI-assisted work assessable and builds metacognitive skills.</p>

<h3>Rubric Design for AI Fluency</h3>
<p>Rubrics for AI Fluency assessments should reflect the four dimensions: effectiveness (did they achieve the goal?), efficiency (was the AI use appropriate for the task?), ethics (did they use AI honestly and responsibly?), and safety (did they appropriately manage risks?). Add criteria for prompt quality, output evaluation skill, and quality of reflection.</p>

<h3>Formative vs. Summative</h3>
<p>AI Fluency develops iteratively — build in formative assessment checkpoints throughout a course, not just summative assessment at the end. Quick formative checks: exit tickets asking what AI interaction learners had this week and what they learned, peer evaluation of prompt quality, one-sentence reflections on a specific AI interaction.</p>

<h3>Calibration and Consistency</h3>
<p>AI Fluency assessments involve judgment. Multiple evaluators rating the same student work often produce different results. Calibration sessions — where instructors discuss and align on how to apply rubric criteria — significantly improve consistency. Provide anchor examples at each rubric level to support consistent evaluation.</p>
`,
    keyTakeaways: [
      "Performance-based assessment (demonstrating in context) is more valid than description-based",
      "Process documentation makes AI-assisted work assessable and builds metacognitive skills",
      "Rubrics should address effectiveness, efficiency, ethics, and safety dimensions",
      "Calibrate evaluators with anchor examples at each rubric level for consistent judgment",
    ],
  },
  {
    courseSlug: "teaching-ai-fluency",
    moduleIndex: 5,
    title: "Continuous Improvement",
    estimatedMinutes: 10,
    content: `
<h2>Iterating and Improving Your AI Fluency Teaching</h2>
<p>Teaching AI Fluency is different from teaching static subjects — the content and tools you're teaching are actively evolving. This creates unique demands for continuous improvement of your teaching practice.</p>

<h3>Maintaining Your Own AI Fluency</h3>
<p>You can't teach what you don't practice. Instructors who regularly use AI tools in their own work — and reflect on those interactions — teach AI Fluency from direct experience rather than theory. Schedule regular time to experiment with AI tools for your own professional tasks. Join communities of practice with other AI Fluency instructors. Stay current with Anthropic's documentation and new AI capabilities.</p>

<h3>Collecting Evidence of Learning</h3>
<p>Build systematic mechanisms for understanding whether your instruction is working:</p>
<ul>
  <li>Pre/post assessments of AI Fluency competencies</li>
  <li>Student reflections on AI interactions throughout the course</li>
  <li>Follow-up surveys: are learners using AI Fluency skills in subsequent courses or work?</li>
  <li>Portfolio reviews: how is learner work with AI changing over time?</li>
</ul>

<h3>Updating for Evolving AI</h3>
<p>AI capabilities change. Build content review into your regular course preparation:</p>
<ul>
  <li>Annually review all activity designs for continued relevance</li>
  <li>Update examples and cases to reflect current AI capabilities</li>
  <li>Remove content made obsolete by new capabilities</li>
  <li>Add new capabilities and their implications as they become educationally significant</li>
</ul>

<h3>Building a Teaching Community</h3>
<p>AI Fluency teaching is new enough that no one has perfected it. The most effective practitioners share: activity designs that work, assessment approaches that are valid and manageable, cases and examples that resonate with learners, and approaches to ethical discussions that develop reasoning without false certainty. Connect with this community through conferences, professional networks, and Anthropic's educator resources.</p>

<h3>Longitudinal Perspective</h3>
<p>The goal of AI Fluency instruction isn't a single course outcome — it's developing a durable orientation toward AI that serves learners throughout their lives. Design for long-term transfer: emphasize transferable principles over specific tool features, build metacognitive habits over content memorization, and help learners understand the "why" behind AI Fluency so they can adapt as tools change.</p>
`,
    keyTakeaways: [
      "Maintain your own AI fluency through regular practice — you can't teach what you don't do",
      "Collect evidence of learning through pre/post assessments, reflection artifacts, and follow-up surveys",
      "Annually review and update content for evolving AI capabilities — remove obsolete material",
      "Design for long-term transfer: principles and metacognitive habits over specific tool features",
    ],
  },
];

export default lessons;
