import type { LessonContent } from "../lessons";

const lessons: LessonContent[] = [
  {
    courseSlug: "ai-fluency-for-educators",
    moduleIndex: 0,
    title: "AI Fluency in Education",
    estimatedMinutes: 11,
    content: `
<h2>The Educational Context for AI Fluency</h2>
<p>Education is one of the domains most profoundly affected by AI tools. AI assistants can tutor, explain, draft, summarize, translate, generate practice problems, and provide feedback at scales no human teacher can match alone. But they also create new challenges for academic integrity, critical thinking development, and equitable access.</p>

<h3>What's Different About AI in Education</h3>
<p>The educational context has unique characteristics that make AI Fluency especially important for educators to understand:</p>
<ul>
  <li><strong>Developmental stakes:</strong> Students are building skills and habits of mind — AI use affects what they learn and how they learn to think</li>
  <li><strong>Assessment integrity:</strong> Traditional assessments may not distinguish AI-assisted from student work, requiring rethinking of what and how we assess</li>
  <li><strong>The authenticity question:</strong> Learning requires struggle and productive failure — AI that removes this struggle may undermine learning</li>
  <li><strong>Equity concerns:</strong> Unequal access to AI tools, or unequal ability to use them well, may widen rather than close opportunity gaps</li>
</ul>

<h3>The Educator's Role Has Changed</h3>
<p>AI doesn't eliminate the educator — it changes what educators need to do. The highest-value educational activities are increasingly those that require human connection, mentorship, and the kind of nuanced feedback that understands a specific student's learning journey. Educators who thrive in an AI-abundant environment invest in these uniquely human aspects of teaching.</p>

<h3>Course Overview</h3>
<p>This course is designed for faculty, instructional designers, and educational leaders who want to thoughtfully integrate AI into their teaching practice. We cover: how to apply AI Fluency frameworks in educational settings, how to redesign assessments and pedagogy for the AI era, how to build institutional strategy, and how to model ethical AI use for students.</p>
`,
    keyTakeaways: [
      "Education's unique AI context: developmental stakes, assessment integrity, authentic learning, and equity",
      "AI changes the educator's role toward higher-value human connection, mentorship, and nuanced feedback",
      "The challenge is distinguishing AI assistance that supports learning from AI use that replaces it",
      "This course applies the AI Fluency framework specifically to educational settings",
    ],
  },
  {
    courseSlug: "ai-fluency-for-educators",
    moduleIndex: 1,
    title: "Applying to Teaching Practice",
    estimatedMinutes: 13,
    content: `
<h2>Integrating AI into Your Teaching</h2>
<p>AI tools can enhance nearly every aspect of teaching practice when used thoughtfully. This module explores concrete applications for educators and frameworks for deciding when AI assistance is appropriate.</p>

<h3>Lesson and Curriculum Development</h3>
<p>AI is a powerful tool for curriculum work. Educators are using AI to:</p>
<ul>
  <li>Generate first drafts of lesson plans and learning objectives</li>
  <li>Create varied practice problems and differentiated materials at multiple levels</li>
  <li>Develop rubrics and assessment criteria</li>
  <li>Research current examples and applications for concepts being taught</li>
  <li>Adapt existing materials for different learning contexts or student needs</li>
</ul>
<p>Always review AI-generated materials critically — they provide a starting point, not a final product.</p>

<h3>Formative Feedback at Scale</h3>
<p>One of AI's highest-value applications in education is providing faster, more detailed formative feedback than is feasible by hand. AI can give students detailed feedback on drafts, practice problems, or learning artifacts quickly, freeing educator time for higher-value interactions. The key is designing this feedback appropriately — it should guide student thinking, not replace it.</p>

<h3>Personalization and Differentiation</h3>
<p>AI can help educators personalize learning at scales that were previously impractical. Use AI to:</p>
<ul>
  <li>Generate explanations of the same concept at different reading levels</li>
  <li>Create additional practice for students who need more support</li>
  <li>Develop extension activities for students ready to go deeper</li>
  <li>Translate materials for students learning in their second language</li>
</ul>

<h3>Professional Development and Reflection</h3>
<p>Educators can use AI for their own professional growth: synthesizing research on effective teaching strategies, reflecting on classroom practices, drafting professional communications, and staying current with developments in their subject area. AI is a particularly valuable tool for "translating" academic research into practical classroom implications.</p>

<h3>The Judgment Remains Yours</h3>
<p>All AI-assisted teaching decisions should go through your professional judgment. You know your students, your context, your learning objectives, and the nuances of your discipline in ways AI cannot. AI assists your teaching; it doesn't replace your expertise.</p>
`,
    keyTakeaways: [
      "AI accelerates curriculum development — lesson plans, problems, rubrics, and differentiated materials",
      "Formative feedback at scale is one of AI's highest-value educational applications",
      "Use AI for personalization: different reading levels, additional practice, extension activities",
      "Your professional judgment remains essential — AI assists but doesn't replace your teaching expertise",
    ],
  },
  {
    courseSlug: "ai-fluency-for-educators",
    moduleIndex: 2,
    title: "Institutional Strategy",
    estimatedMinutes: 12,
    content: `
<h2>Building Institutional AI Strategy for Education</h2>
<p>Individual educators can use AI effectively on their own, but realizing AI's full potential in education — and managing its risks — requires institutional strategy. Educational leaders have a responsibility to create the conditions for thoughtful AI integration.</p>

<h3>Developing AI Policy</h3>
<p>Every educational institution needs clear AI policies. Effective policies:</p>
<ul>
  <li>Define what AI use is permitted, in what contexts, and with what expectations</li>
  <li>Distinguish between different use cases (AI for learning support vs. AI for assessment completion)</li>
  <li>Are developed with faculty, students, and staff input — not imposed top-down</li>
  <li>Are regularly reviewed and updated as AI capabilities evolve</li>
  <li>Are communicated clearly and consistently across the institution</li>
</ul>
<p>Policies that are too restrictive will be ignored or worked around. Policies that are too permissive create integrity risks. The goal is a framework that allows beneficial use while managing genuine risks.</p>

<h3>Faculty Development</h3>
<p>AI policy without faculty development is insufficient. Educators need:</p>
<ul>
  <li>Hands-on experience with AI tools (not just policies about them)</li>
  <li>Discipline-specific examples of how AI can enhance their teaching</li>
  <li>Support for redesigning assessments that are meaningful in the AI era</li>
  <li>Community to share approaches and challenges with peers</li>
</ul>

<h3>Infrastructure and Equity</h3>
<p>If AI tools are beneficial for learning, equity demands that all students have access to them. Consider: which AI tools the institution will provide access to, how to support students without reliable internet or devices, and how to ensure AI assistance doesn't create new advantages for already-advantaged students.</p>

<h3>Assessment Reform</h3>
<p>Perhaps the most significant institutional challenge: assessments designed before AI often can't distinguish what a student knows from what AI knows. Institutional leaders need to create space and support for faculty to redesign assessments — focusing on process over product, oral components, in-class work, and demonstrations of applied understanding.</p>
`,
    keyTakeaways: [
      "Effective AI policies balance beneficial use with integrity risk — involve faculty and students in development",
      "Faculty development must include hands-on AI experience, not just policy communication",
      "Equity requires institutional AI access for all students — not just those who can afford tools",
      "Assessment reform is the most significant institutional challenge — design for the AI era",
    ],
  },
  {
    courseSlug: "ai-fluency-for-educators",
    moduleIndex: 3,
    title: "Assessing AI Fluency",
    estimatedMinutes: 11,
    content: `
<h2>Evaluating AI Fluency in Educational Contexts</h2>
<p>If AI Fluency is a valued outcome, how do we assess it? And how do we assess traditional learning outcomes in a world where students have access to AI? This module addresses both questions.</p>

<h3>What AI Fluency Assessment Looks Like</h3>
<p>AI Fluency is a multidimensional skill — assessments need to reflect that complexity. Authentic AI Fluency assessment includes:</p>
<ul>
  <li><strong>Task performance with AI:</strong> Can the student use AI to accomplish a meaningful task effectively? Do they choose the right approach?</li>
  <li><strong>Critical evaluation:</strong> Can the student identify when AI output is wrong, biased, or inappropriate?</li>
  <li><strong>Ethical reasoning:</strong> Can the student articulate the ethical considerations in a given AI use scenario?</li>
  <li><strong>Reflection:</strong> Can the student explain their AI collaboration process and what they learned from it?</li>
</ul>

<h3>Portfolio and Process Assessment</h3>
<p>For AI-assisted work, process artifacts are often more revealing than final products. Ask students to document their AI collaboration: what prompts they used, how they evaluated AI outputs, what they changed and why, and what they learned. Process portfolios reveal AI Fluency more authentically than polished final products.</p>

<h3>Assessing Subject Learning in the AI Era</h3>
<p>For traditional learning objectives, the key question is: does this assessment measure what students can do in authentic contexts, or just what they can produce with a word processor? Assessments that hold up in the AI era typically:</p>
<ul>
  <li>Require application to novel situations not seen in training materials</li>
  <li>Include oral defense or explanation components</li>
  <li>Assess process and reasoning, not just final products</li>
  <li>Use in-class components where AI access can be controlled</li>
</ul>

<h3>Developing Rubrics for AI-Collaborative Work</h3>
<p>When AI assistance is permitted, rubrics should explicitly address what makes AI collaboration skillful: appropriateness of AI use for the task, quality of judgment applied to AI outputs, originality of synthesis and analysis, and transparency about the collaboration process.</p>
`,
    keyTakeaways: [
      "AI Fluency assessment is multidimensional: task performance, critical evaluation, ethics, and reflection",
      "Process portfolios reveal AI Fluency more authentically than polished final products",
      "AI-era subject assessments should require application to novel situations and include oral components",
      "Rubrics for AI-collaborative work should assess the quality of judgment applied to AI outputs",
    ],
  },
  {
    courseSlug: "ai-fluency-for-educators",
    moduleIndex: 4,
    title: "Ethical Considerations for Educators",
    estimatedMinutes: 11,
    content: `
<h2>Education-Specific Ethical Dimensions of AI</h2>
<p>Educators have ethical responsibilities that go beyond those of individual AI users. They shape how an entire community of learners understands and uses AI — with lasting effects on those students' capabilities, habits, and values.</p>

<h3>Modeling Ethical AI Use</h3>
<p>Students learn from what educators do, not just what they say. Educators who use AI authentically and transparently — acknowledging when they've used AI to help prepare materials, discussing their reasoning about when AI is appropriate, and demonstrating critical evaluation of AI outputs — model the AI Fluency they want students to develop.</p>

<h3>Academic Integrity in the AI Era</h3>
<p>Academic integrity policies need to evolve. "Don't use AI" is often both unenforceable and counterproductive in contexts where AI will be a professional norm. More constructive approaches:</p>
<ul>
  <li>Define specific types of AI use that are permitted vs. not permitted for each assessment</li>
  <li>Require students to document and reflect on AI use rather than hiding it</li>
  <li>Design assessments where the learning goal is transparent regardless of AI assistance</li>
  <li>Focus integrity conversations on the value of the learning, not just rule compliance</li>
</ul>

<h3>Equity and Differential AI Access</h3>
<p>Students from different socioeconomic backgrounds, different language backgrounds, and different learning needs have very different relationships with AI tools. Educators must consider:</p>
<ul>
  <li>Are you assuming access to premium AI tools that not all students have?</li>
  <li>Could AI assistance disproportionately benefit already-advantaged students?</li>
  <li>How might AI tools interact with different learning differences?</li>
</ul>

<h3>Data Privacy in Educational AI</h3>
<p>When using AI tools with students, be aware of data privacy implications. Student data (especially for minors) has specific legal protections (FERPA in the US, GDPR in Europe). Understand what data educational AI tools collect, how it's used, and whether appropriate data processing agreements are in place before deploying tools in your classroom.</p>
`,
    keyTakeaways: [
      "Educators model AI use — what you do shapes students' understanding and habits",
      "Academic integrity in the AI era means defining specific permitted uses, not blanket bans",
      "AI equity concerns: don't assume premium tool access; consider differential impacts on students",
      "Student data privacy requires understanding FERPA/GDPR implications before using AI tools in class",
    ],
  },
  {
    courseSlug: "ai-fluency-for-educators",
    moduleIndex: 5,
    title: "Building AI Capacity",
    estimatedMinutes: 11,
    content: `
<h2>Developing Long-Term AI Capability in Education</h2>
<p>Building AI fluency capacity in an educational institution is a long-term undertaking. This final module provides a framework for sustained development rather than one-off training.</p>

<h3>The AI Fluency Continuum for Educators</h3>
<p>AI Fluency for educators develops in stages:</p>
<ul>
  <li><strong>Aware:</strong> Understands what AI can do in educational contexts; hasn't used it personally</li>
  <li><strong>Experimenter:</strong> Has tried AI tools for some teaching tasks; developing judgment about when they help</li>
  <li><strong>Practitioner:</strong> Regularly uses AI as part of teaching practice; beginning to redesign assessments</li>
  <li><strong>Leader:</strong> Helping colleagues develop AI fluency; contributing to institutional strategy</li>
  <li><strong>Innovator:</strong> Developing new approaches and sharing them with the field</li>
</ul>

<h3>Creating Learning Communities</h3>
<p>Individual development is accelerated by community. Institutional AI capacity grows fastest when educators can share what's working, discuss challenges, and experiment together. Structure opportunities for this: regular communities of practice, shared repositories of AI-enhanced materials, and peer observation of AI-integrated teaching.</p>

<h3>Sustained Professional Development</h3>
<p>AI capabilities evolve quickly. Professional development on AI needs to be ongoing, not a one-time workshop. Design professional development that builds skills progressively, returns to topics as capabilities evolve, and is grounded in educators' actual teaching challenges rather than generic AI overviews.</p>

<h3>Measuring Progress</h3>
<p>Track institutional AI capacity development with metrics that matter: educator confidence and self-reported AI Fluency levels, examples of AI-integrated teaching practice, assessment redesign initiatives, student AI Fluency outcomes, and faculty participation in AI learning communities. Share progress to maintain momentum and demonstrate impact.</p>

<h3>Future-Proofing the Approach</h3>
<p>The specific AI tools available today will change. Build institutional capacity around principles and skills that transfer across tools: critical evaluation, ethical reasoning, effective communication of goals, and habit of reflection. These durable competencies will serve educators and students regardless of what specific AI capabilities emerge next.</p>
`,
    keyTakeaways: [
      "AI Fluency develops in stages: Aware → Experimenter → Practitioner → Leader → Innovator",
      "Learning communities accelerate development — create structured opportunities for sharing and collaboration",
      "AI professional development must be ongoing, not a one-time workshop — capabilities evolve rapidly",
      "Build capacity around transferable principles (critical evaluation, ethics, reflection) not specific tools",
    ],
  },
];

export default lessons;
