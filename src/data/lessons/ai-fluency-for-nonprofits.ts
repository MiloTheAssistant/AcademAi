import type { LessonContent } from "../lessons";

const lessons: LessonContent[] = [
  {
    courseSlug: "ai-fluency-for-nonprofits",
    moduleIndex: 0,
    title: "AI Fluency for Nonprofits",
    estimatedMinutes: 11,
    content: `
<h2>AI Fluency in the Nonprofit Context</h2>
<p>Nonprofit organizations face a distinctive challenge: immense mission-driven work with chronically constrained resources. AI Fluency offers nonprofits the potential to do more with what they have — but realizing this potential requires using AI in ways that are consistent with your mission, values, and the trust your stakeholders have placed in you.</p>

<h3>Why This Course Exists</h3>
<p>General AI Fluency training is valuable, but nonprofits have specific characteristics that shape how AI should be used:</p>
<ul>
  <li><strong>Mission alignment:</strong> Every use of organizational resources should advance the mission — AI use is no different</li>
  <li><strong>Stakeholder trust:</strong> Nonprofits hold the trust of donors, beneficiaries, volunteers, and the public — AI use that undermines this trust has consequences beyond what for-profit organizations face</li>
  <li><strong>Data sensitivity:</strong> Many nonprofits work with vulnerable populations whose data requires extra care</li>
  <li><strong>Resource constraints:</strong> Nonprofits often can't afford to experiment freely — AI adoption decisions need to be strategic</li>
  <li><strong>Accountability norms:</strong> Nonprofit accountability standards create specific obligations around how resources (including AI) are used</li>
</ul>

<h3>The Opportunity</h3>
<p>AI represents a significant opportunity for nonprofits to close the capability gap with larger, better-resourced organizations. A small nonprofit team with strong AI Fluency can produce communications, analysis, and operational outputs at quality levels previously available only to organizations with much larger staffs. This course helps you realize that opportunity thoughtfully.</p>
`,
    keyTakeaways: [
      "Nonprofits face specific AI considerations: mission alignment, stakeholder trust, data sensitivity, and resource constraints",
      "AI Fluency can help close the capability gap between small nonprofits and larger organizations",
      "All AI use should be evaluated against mission alignment and accountability standards",
      "This course applies the AI Fluency framework to nonprofit-specific contexts",
    ],
  },
  {
    courseSlug: "ai-fluency-for-nonprofits",
    moduleIndex: 1,
    title: "Ethical AI Aligned with Values",
    estimatedMinutes: 12,
    content: `
<h2>Aligning AI Use with Nonprofit Values</h2>
<p>Nonprofit organizations exist to serve a mission and the communities they work with. AI use should reflect and reinforce organizational values — not just maximize efficiency.</p>

<h3>Centering Beneficiary Perspectives</h3>
<p>The communities nonprofits serve are often not the primary users of the AI tools the organization adopts. This creates an important responsibility: ensure that AI use enhances (rather than diminishes) the quality of service, respect, and care that beneficiaries receive. Ask:</p>
<ul>
  <li>Does using AI in this interaction make it better or worse for the person being served?</li>
  <li>Are we using AI in ways our beneficiaries would feel comfortable with if they knew?</li>
  <li>Could AI use in this context create or worsen power imbalances?</li>
</ul>

<h3>Authenticity in Communications</h3>
<p>Donors and stakeholders support nonprofits in part because they connect with the authentic voice and mission of the organization. AI-assisted communications are a sensitive area: using AI to improve your communications is fine; using AI to make mass communications seem personal when they're not risks eroding the genuine relationships that sustain nonprofit funding.</p>
<p>Guidelines for authentic AI-assisted communications:</p>
<ul>
  <li>The core message and values should come from people in the organization</li>
  <li>Don't create false impressions of personal effort or attention</li>
  <li>Use AI to improve clarity and quality, not to manufacture intimacy</li>
</ul>

<h3>Equity and Bias Considerations</h3>
<p>Nonprofits working on equity issues face particular responsibility when using AI tools that may contain biases. AI systems trained on historical data may perpetuate the very inequities your organization works to address. Evaluate AI tools for potential bias in your specific context — and don't use AI for decisions that significantly affect beneficiaries without meaningful human review.</p>

<h3>Accountability and Transparency</h3>
<p>Nonprofit accountability to stakeholders extends to AI use. Consider whether and how to disclose AI use in communications, reports, and outputs. The standard shouldn't be "can we get away with not disclosing" but "what disclosure would our stakeholders consider appropriate and respectful."</p>
`,
    keyTakeaways: [
      "Center beneficiary perspectives in every AI use decision — would they be comfortable with this?",
      "Authentic communications maintain core messages from people; AI improves quality, not manufactures intimacy",
      "AI tools may perpetuate biases — evaluate carefully when serving equity-focused missions",
      "Accountability standard: what disclosure would stakeholders consider appropriate, not what you can omit",
    ],
  },
  {
    courseSlug: "ai-fluency-for-nonprofits",
    moduleIndex: 2,
    title: "Increasing Impact",
    estimatedMinutes: 12,
    content: `
<h2>Using AI to Amplify Nonprofit Impact</h2>
<p>The promise of AI for nonprofits is the ability to expand impact without proportionally expanding costs. This module explores the highest-leverage AI applications for nonprofit program and service delivery.</p>

<h3>Program Research and Evidence-Building</h3>
<p>AI significantly accelerates the research and analysis work that informs effective programming:</p>
<ul>
  <li>Synthesize academic literature on evidence-based interventions in your focus area</li>
  <li>Analyze program outcome data to identify patterns and insights</li>
  <li>Research best practices from similar organizations around the world</li>
  <li>Help design logic models, theories of change, and evaluation frameworks</li>
</ul>
<p>This kind of analysis previously required dedicated research staff or expensive consultants. With AI, program staff can do significantly more of it themselves.</p>

<h3>Scaling Service Delivery</h3>
<p>For nonprofits providing direct services (counseling, legal aid, educational support), AI can help scale reach:</p>
<ul>
  <li>AI-assisted triage and intake that ensures people get to the right services faster</li>
  <li>Preliminary information and resource identification that doesn't require staff time</li>
  <li>Follow-up support between human interactions</li>
  <li>Translation and accessibility support for diverse populations</li>
</ul>
<p>Important: AI should expand access to human services, not replace the human connection that makes services effective for vulnerable populations.</p>

<h3>Community Engagement</h3>
<p>AI can help nonprofits engage their communities more effectively:</p>
<ul>
  <li>Analyze community needs assessment responses at scale</li>
  <li>Translate engagement materials for multilingual communities</li>
  <li>Draft outreach content customized for different community segments</li>
  <li>Synthesize community feedback into themes and priorities</li>
</ul>

<h3>Measuring What Matters</h3>
<p>AI can help nonprofits improve how they measure impact — a chronically underfunded area. AI assistance with survey design, data analysis, and impact report writing can significantly improve the quality and rigor of impact measurement without requiring additional staff dedicated to evaluation.</p>
`,
    keyTakeaways: [
      "AI accelerates program research — synthesizing literature, analyzing data, and designing evaluations",
      "Scale service delivery by using AI for triage, information provision, and follow-up between human interactions",
      "AI should expand access to human services, not replace human connection for vulnerable populations",
      "Impact measurement is chronically underfunded — AI can improve quality without adding dedicated staff",
    ],
  },
  {
    courseSlug: "ai-fluency-for-nonprofits",
    moduleIndex: 3,
    title: "Operational Efficiency",
    estimatedMinutes: 11,
    content: `
<h2>Streamlining Nonprofit Operations with AI</h2>
<p>Administrative burden is one of the biggest constraints on nonprofit effectiveness. Staff spend significant time on communications, reporting, documentation, and administrative tasks that don't directly serve the mission. AI can significantly reduce this burden.</p>

<h3>Grant Writing and Reporting</h3>
<p>Grant writing is one of the most time-consuming nonprofit activities and one where AI offers significant leverage:</p>
<ul>
  <li>Drafting first versions of grant proposals from program information and needs statements</li>
  <li>Adapting existing proposals for new funders with different requirements</li>
  <li>Synthesizing program data into compelling grant reports</li>
  <li>Identifying potential grant opportunities and summarizing requirements</li>
  <li>Reviewing drafts for clarity, compliance with funder guidelines, and persuasiveness</li>
</ul>
<p>AI won't write a grant for you — but it can dramatically reduce the time from idea to compelling draft.</p>

<h3>Communications and Content Creation</h3>
<p>Nonprofits need a constant stream of content for donors, stakeholders, and the public. AI can help:</p>
<ul>
  <li>Draft newsletters, social media posts, and website content</li>
  <li>Repurpose content across channels (a blog post → social posts → email → talking points)</li>
  <li>Translate materials for multilingual audiences</li>
  <li>Summarize board materials and program updates for different audiences</li>
</ul>

<h3>HR and Staff Support</h3>
<p>People operations tasks that AI can accelerate:</p>
<ul>
  <li>Drafting job descriptions and interview questions</li>
  <li>Creating onboarding materials and training documentation</li>
  <li>Drafting performance review frameworks</li>
  <li>Synthesizing staff feedback for leadership review</li>
</ul>

<h3>Financial and Operational Documentation</h3>
<p>AI can help with the documentation burden: meeting minutes, process documentation, policy drafting, and vendor communications. These tasks take staff time but often don't require high-level judgment — exactly the profile where AI delivers strong efficiency gains.</p>

<h3>Prioritizing What to Automate</h3>
<p>Not every task should be handed to AI. Prioritize: high-volume tasks, tasks that are currently low quality due to time pressure, tasks that prevent staff from doing higher-value work, and tasks where AI quality is demonstrably good. Don't automate tasks that require authentic human connection, careful ethical judgment, or where AI quality is inconsistent.</p>
`,
    keyTakeaways: [
      "Grant writing, communications, HR documentation, and meeting notes are high-leverage AI applications",
      "AI dramatically reduces time from program information to compelling grant proposal draft",
      "Content repurposing across channels is one of the easiest and highest-value communications AI applications",
      "Prioritize automating high-volume, low-judgment tasks that prevent staff from doing higher-value work",
    ],
  },
  {
    courseSlug: "ai-fluency-for-nonprofits",
    moduleIndex: 4,
    title: "Fundraising and Communication",
    estimatedMinutes: 12,
    content: `
<h2>AI-Enhanced Fundraising and Donor Engagement</h2>
<p>Fundraising is the lifeblood of nonprofit sustainability. AI can help nonprofits engage donors more effectively, communicate impact more compellingly, and spend staff time on the highest-value relationships — while being careful not to undermine the authentic connections that sustain nonprofit support.</p>

<h3>Donor Research and Segmentation</h3>
<p>AI can help you understand your donor base better and segment it more effectively:</p>
<ul>
  <li>Analyze giving patterns to identify major donor prospects from your existing base</li>
  <li>Research individual donors and foundations before cultivation conversations</li>
  <li>Segment donors by interests, capacity, engagement level, and giving history</li>
  <li>Identify lapsed donors with characteristics suggesting re-engagement potential</li>
</ul>

<h3>Compelling Impact Storytelling</h3>
<p>Donors give to stories, not spreadsheets. AI can help you tell your impact story more effectively:</p>
<ul>
  <li>Identify the most compelling stories from your program data and beneficiary interactions</li>
  <li>Draft impact narratives that connect specific donor gifts to specific outcomes</li>
  <li>Adapt the same story for different audiences (major donors vs. small donors vs. corporate funders)</li>
  <li>Write annual report content that makes data emotionally resonant</li>
</ul>

<h3>Donor Communications at Scale</h3>
<p>AI enables more personalized communications than were previously feasible:</p>
<ul>
  <li>Customize thank-you letters by gift level, donor interests, and giving history</li>
  <li>Draft year-end appeals with segment-specific messaging</li>
  <li>Prepare relationship managers with personalized briefing notes before donor meetings</li>
</ul>
<p>Remember: personalization should reflect genuine knowledge of donors and their connection to your mission — not the appearance of attention that doesn't actually exist.</p>

<h3>Event Support</h3>
<p>AI can reduce the coordination burden of fundraising events: drafting invitations, creating event materials, developing talking points for leadership, and writing follow-up communications for different attendee segments.</p>

<h3>Foundation and Corporate Partnerships</h3>
<p>AI can help with the research, pitch preparation, and relationship management work involved in foundation and corporate partnerships — areas where a small development team can be overwhelmed by the scope of potential funders.</p>
`,
    keyTakeaways: [
      "Use AI for donor research, segmentation, and identifying major donor prospects from existing data",
      "AI helps tell impact stories compellingly — connecting specific gifts to specific outcomes",
      "Personalized communications should reflect genuine donor knowledge, not manufactured attention",
      "Foundation research and pitch preparation are high-leverage AI applications for underfunded development teams",
    ],
  },
  {
    courseSlug: "ai-fluency-for-nonprofits",
    moduleIndex: 5,
    title: "Measuring AI Impact",
    estimatedMinutes: 10,
    content: `
<h2>Evaluating AI's Contribution to Your Mission</h2>
<p>Nonprofits are accountable to their missions and stakeholders. AI adoption should be evaluated with the same rigor you apply to programs — is this actually helping us achieve our mission better, and is it aligned with our values?</p>

<h3>Defining What Success Looks Like</h3>
<p>Before implementing AI in any significant way, define success criteria:</p>
<ul>
  <li>What specific outcomes are you trying to improve?</li>
  <li>How will you measure whether AI actually improved them?</li>
  <li>What would cause you to scale back AI use?</li>
  <li>What are the non-negotiable ethical constraints?</li>
</ul>
<p>This upfront definition makes evaluation possible and prevents rationalization of questionable outcomes.</p>

<h3>Tracking Efficiency Gains</h3>
<p>For operational AI uses, track the efficiency gains relative to your organization's resource constraints:</p>
<ul>
  <li>Time saved on specific tasks (measurable through time-tracking for a baseline period)</li>
  <li>Quality improvements (more grant proposals submitted, higher response rates, better donor retention)</li>
  <li>Staff capacity freed for higher-value work (what did staff do with recovered time?)</li>
</ul>

<h3>Assessing Mission Alignment</h3>
<p>Regularly assess whether AI use is aligned with your mission and values:</p>
<ul>
  <li>Are we using AI in ways our beneficiaries would endorse?</li>
  <li>Are we maintaining authentic relationships with stakeholders?</li>
  <li>Have any equity or bias concerns emerged in practice?</li>
  <li>Is our AI use consistent with how we talk about our values?</li>
</ul>

<h3>Building an AI Learning Culture</h3>
<p>Create internal mechanisms for staff to share what's working, what isn't, and what concerns have emerged. Regular retrospectives on AI use — monthly or quarterly — help the organization learn and adapt. Document learnings so institutional knowledge accumulates rather than cycling with staff turnover.</p>

<h3>Reporting to Stakeholders</h3>
<p>Consider how to communicate AI use to donors, funders, and the board. Proactive transparency — explaining what AI helps with and how it's overseen — builds trust. Reactive disclosure (only explaining when asked) can feel evasive. Develop clear, honest language about how your organization uses AI in service of its mission.</p>
`,
    keyTakeaways: [
      "Define success criteria for AI adoption before implementing — not after rationalizing outcomes",
      "Track efficiency gains: time saved, quality improvements, and what staff do with recovered capacity",
      "Regularly assess mission alignment — would beneficiaries and stakeholders endorse how AI is being used?",
      "Proactive transparency with stakeholders about AI use builds trust; reactive disclosure feels evasive",
    ],
  },
];

export default lessons;
