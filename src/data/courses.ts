export interface CourseModule {
  title: string;
  description?: string;
}

export interface Course {
  slug: string;
  title: string;
  description: string;
  category: 'claude-code' | 'api' | 'ai-fluency' | 'mcp' | 'foundational';
  path: 'Claude Code & Development' | 'API & Cloud Integrations' | 'AI Fluency Framework' | 'Model Context Protocol' | 'Foundational';
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedHours: string;
  modules: CourseModule[];
  prerequisites?: string[];
  resources?: string[];
  updatedAt?: string;
}

export const courses: Course[] = [
  {
    slug: 'claude-101',
    title: 'Claude 101',
    description: 'Learn how to use Claude for everyday work tasks, understand core features, and explore resources for more advanced learning.',
    category: 'foundational',
    path: 'Foundational',
    level: 'Beginner',
    estimatedHours: '2-3 hours',
    modules: [
      { title: 'Getting Started with Claude', description: 'Creating an account, interface overview, basic conversation mechanics' },
      { title: 'Core Features and Capabilities', description: 'Natural language understanding, context retention, multi-turn conversations' },
      { title: 'Effective Prompting Techniques', description: 'Clear instructions, providing context, chain-of-thought prompting' },
      { title: 'Common Work Task Applications', description: 'Email drafting, document summarization, research, brainstorming' },
      { title: 'Best Practices and Safety Guidelines', description: 'Responsible AI use, understanding limitations, privacy considerations' }
    ],
    resources: [
      'https://claude.ai/',
      'https://docs.anthropic.com/claude/docs/prompt-engineering'
    ]
  },
  {
    slug: 'claude-code-in-action',
    title: 'Claude Code in Action',
    description: 'Integrate Claude Code into your development workflow with hands-on exercises and real-world scenarios.',
    category: 'claude-code',
    path: 'Claude Code & Development',
    level: 'Intermediate',
    estimatedHours: '3-4 hours',
    modules: [
      { title: 'Introduction to Claude Code', description: 'Overview and setup' },
      { title: 'Setting up Claude Code in Your Environment', description: 'CLI installation, configuration, authentication' },
      { title: 'Core Coding Assistance Features', description: 'Code generation, editing, explanation, debugging' },
      { title: 'Workflow Integration Techniques', description: 'Git integration, task automation, IDE setup' },
      { title: 'Advanced Usage and Customization', description: 'Skills, plugins, advanced configurations' },
      { title: 'Best Practices and Troubleshooting', description: 'Common issues and solutions' }
    ],
    prerequisites: ['Basic familiarity with CLI', 'Some programming experience'],
    resources: [
      'https://docs.anthropic.com/claude-code'
    ]
  },
  {
    slug: 'introduction-to-claude-cowork',
    title: 'Introduction to Claude Cowork',
    description: 'Learn to work alongside Claude on your real files and projects. Hands-on coverage of the Cowork task loop, plugins, and workflows.',
    category: 'claude-code',
    path: 'Claude Code & Development',
    level: 'Intermediate',
    estimatedHours: '3-4 hours',
    modules: [
      { title: 'Introduction to Claude Cowork', description: 'Concept and workflow overview' },
      { title: 'The Cowork Task Loop', description: 'Iterative development with Claude' },
      { title: 'Plugins and Skills Overview', description: 'Extending Claude capabilities' },
      { title: 'File Workflow Integration', description: 'Working with real project files' },
      { title: 'Research Workflow Techniques', description: 'Using Claude for research tasks' },
      { title: 'Responsible Steering of Multi-Step Work', description: 'Guiding Claude safely through complex tasks' }
    ],
    prerequisites: ['Claude 101 or equivalent experience'],
    resources: [
      'https://docs.anthropic.com/claude-code'
    ]
  },
  {
    slug: 'introduction-to-agent-skills',
    title: 'Introduction to Agent Skills',
    description: 'Learn how to build, configure, and share Skills in Claude Code — reusable markdown instructions that Claude automatically applies.',
    category: 'claude-code',
    path: 'Claude Code & Development',
    level: 'Intermediate',
    estimatedHours: '2-3 hours',
    modules: [
      { title: 'Introduction to Agent Skills Concept', description: 'What Skills are and how they work' },
      { title: 'Skill Structure and Markdown Format', description: 'Creating effective Skills' },
      { title: 'Creating Your First Skill', description: 'Hands-on skill building' },
      { title: 'Skill Triggers and Context Matching', description: 'When Skills activate' },
      { title: 'Sharing Skills Across Teams', description: 'Distribution and version control' },
      { title: 'Best Practices for Skill Development', description: 'Optimization and maintenance' }
    ],
    prerequisites: ['Basic familiarity with Claude Code'],
    resources: [
      'https://docs.anthropic.com/claude-code/skills'
    ]
  },
  {
    slug: 'introduction-to-subagents',
    title: 'Introduction to Subagents',
    description: 'Learn how to use and create sub-agents in Claude Code to manage context, delegate tasks, and build specialized workflows.',
    category: 'claude-code',
    path: 'Claude Code & Development',
    level: 'Advanced',
    estimatedHours: '3-4 hours',
    modules: [
      { title: 'Introduction to Sub-agents Concept', description: 'When to use sub-agents' },
      { title: 'Creating Your First Sub-agent', description: 'Configuration and setup' },
      { title: 'Context Management Between Agents', description: 'Passing context effectively' },
      { title: 'Building Specialized Workflows', description: 'Multi-agent architectures' },
      { title: 'Communication Patterns', description: 'Main ↔ Sub-agent coordination' },
      { title: 'Best Practices for Sub-agent Design', description: 'Performance and reliability' }
    ],
    prerequisites: ['Introduction to Agent Skills recommended'],
    resources: [
      'https://docs.anthropic.com/claude-code/subagents'
    ]
  },
  {
    slug: 'building-with-the-claude-api',
    title: 'Building with the Claude API',
    description: 'Comprehensive course covering the full spectrum of working with Anthropic models using the Claude API.',
    category: 'api',
    path: 'API & Cloud Integrations',
    level: 'Intermediate',
    estimatedHours: '4-5 hours',
    modules: [
      { title: 'Introduction to the Claude API', description: 'Architecture and capabilities' },
      { title: 'Authentication and Setup', description: 'API keys, environment setup' },
      { title: 'Making Basic API Requests', description: 'REST calls, SDK usage' },
      { title: 'Prompt Engineering for API', description: 'Optimizing API prompts' },
      { title: 'Advanced Features: Streaming, Vision', description: 'Real-time responses, image processing' },
      { title: 'Function Calling and Tool Use', description: 'Extending Claude with custom tools' },
      { title: 'Production Deployment Best Practices', description: 'Scaling, error handling, security' }
    ],
    prerequisites: ['Basic programming knowledge', 'REST API familiarity'],
    resources: [
      'https://docs.anthropic.com/claude-api'
    ]
  },
  {
    slug: 'claude-with-amazon-bedrock',
    title: 'Claude with Amazon Bedrock',
    description: 'First-of-its-kind training for integrating Claude models with AWS services through Amazon Bedrock.',
    category: 'api',
    path: 'API & Cloud Integrations',
    level: 'Advanced',
    estimatedHours: '3-4 hours',
    modules: [
      { title: 'Introduction to Bedrock Integration', description: 'AWS and Claude partnership' },
      { title: 'Setting up Claude in Bedrock', description: 'AWS console configuration' },
      { title: 'Authentication and IAM', description: 'AWS access management' },
      { title: 'API Calls via Bedrock', description: 'Using Claude through AWS' },
      { title: 'Prompt Engineering for Bedrock', description: 'AWS-specific optimizations' },
      { title: 'Security and Compliance', description: 'AWS security best practices' },
      { title: 'Building Production Applications', description: 'Deployment and scaling' }
    ],
    prerequisites: ['AWS account', 'Basic AWS service knowledge', 'API experience'],
    resources: [
      'https://docs.aws.amazon.com/bedrock/'
    ]
  },
  {
    slug: 'claude-with-google-vertex',
    title: 'Claude with Google Cloud\'s Vertex AI',
    description: 'Full spectrum of working with Anthropic models through Google Cloud\'s Vertex AI platform.',
    category: 'api',
    path: 'API & Cloud Integrations',
    level: 'Advanced',
    estimatedHours: '3-4 hours',
    modules: [
      { title: 'Introduction to Vertex AI', description: 'GCP AI platform overview' },
      { title: 'Setting up Claude in Vertex AI', description: 'GCP console configuration' },
      { title: 'Authentication and IAM', description: 'Google Cloud access management' },
      { title: 'Deploying Models', description: 'Endpoints and prediction services' },
      { title: 'Prompt Optimization', description: 'Vertex AI-specific techniques' },
      { title: 'Monitoring and Cost Management', description: 'Logging, performance, costs' },
      { title: 'Building Scalable Applications', description: 'GCP-native deployment' }
    ],
    prerequisites: ['GCP account', 'Basic GCP service knowledge', 'API experience'],
    resources: [
      'https://cloud.google.com/vertex-ai'
    ]
  },
  {
    slug: 'introduction-to-model-context-protocol',
    title: 'Introduction to Model Context Protocol',
    description: 'Learn to build MCP servers and clients from scratch using Python. Master MCP\'s three core primitives: tools, resources, and prompts.',
    category: 'mcp',
    path: 'Model Context Protocol',
    level: 'Intermediate',
    estimatedHours: '3-4 hours',
    modules: [
      { title: 'Introduction to MCP', description: 'Protocol concept and purpose' },
      { title: 'MCP Architecture', description: 'Core concepts and design' },
      { title: 'Understanding Tools, Resources, Prompts', description: 'Three core primitives' },
      { title: 'Building MCP Servers with Python', description: 'Server implementation' },
      { title: 'Building MCP Clients', description: 'Client implementation' },
      { title: 'Connecting Claude to External Services', description: 'Real-world integrations' },
      { title: 'Security and Best Practices', description: 'Safe MCP development' }
    ],
    prerequisites: ['Basic Python knowledge', 'Understanding of APIs'],
    resources: [
      'https://modelcontextprotocol.io'
    ]
  },
  {
    slug: 'model-context-protocol-advanced-topics',
    title: 'Model Context Protocol: Advanced Topics',
    description: 'Discover advanced MCP implementation patterns including sampling, notifications, file system access, and production transport mechanisms.',
    category: 'mcp',
    path: 'Model Context Protocol',
    level: 'Advanced',
    estimatedHours: '4-5 hours',
    modules: [
      { title: 'Review of MCP Fundamentals', description: 'Foundation recap' },
      { title: 'Advanced Sampling Techniques', description: 'Improved AI interactions' },
      { title: 'Notification Systems', description: 'Real-time updates' },
      { title: 'File System Access', description: 'Secure file operations' },
      { title: 'Transport Mechanisms', description: 'Production protocols' },
      { title: 'Security Considerations', description: 'Advanced security' },
      { title: 'Performance Optimization', description: 'Scaling MCP servers' },
      { title: 'Production Deployment', description: 'Going to production' }
    ],
    prerequisites: ['Introduction to MCP course'],
    resources: [
      'https://modelcontextprotocol.io'
    ]
  },
  {
    slug: 'ai-fluency-framework-foundations',
    title: 'AI Fluency: Framework & Foundations',
    description: 'Learn to collaborate with AI systems effectively, efficiently, ethically, and safely.',
    category: 'ai-fluency',
    path: 'AI Fluency Framework',
    level: 'Beginner',
    estimatedHours: '2-3 hours',
    modules: [
      { title: 'Introduction to AI Fluency', description: 'What is AI Fluency?' },
      { title: 'Effective Collaboration with AI', description: 'Working efficiently with AI' },
      { title: 'Efficient AI Interaction Techniques', description: 'Maximizing productivity' },
      { title: 'Ethical Considerations', description: 'Responsible AI use' },
      { title: 'Safety Practices', description: 'Risk management' },
      { title: 'Building AI Fluency Skills', description: 'Continuous improvement' }
    ],
    resources: [
      'https://www.anthropic.com/ai-fluency'
    ]
  },
  {
    slug: 'ai-fluency-for-educators',
    title: 'AI Fluency for Educators',
    description: 'Empowers faculty, instructional designers, and educational leaders to apply AI Fluency into teaching practice.',
    category: 'ai-fluency',
    path: 'AI Fluency Framework',
    level: 'Intermediate',
    estimatedHours: '3-4 hours',
    modules: [
      { title: 'AI Fluency in Education', description: 'Educational context' },
      { title: 'Applying to Teaching Practice', description: 'Classroom integration' },
      { title: 'Institutional Strategy', description: 'School-wide adoption' },
      { title: 'Assessing AI Fluency', description: 'Evaluation methods' },
      { title: 'Ethical Considerations', description: 'Education-specific ethics' },
      { title: 'Building AI Capacity', description: 'Long-term development' }
    ],
    prerequisites: ['AI Fluency Framework recommended'],
    resources: [
      'https://www.anthropic.com/ai-fluency/educators'
    ]
  },
  {
    slug: 'ai-fluency-for-students',
    title: 'AI Fluency for Students',
    description: 'Empowers students to develop AI Fluency skills that enhance learning, career planning, and academic success.',
    category: 'ai-fluency',
    path: 'AI Fluency Framework',
    level: 'Beginner',
    estimatedHours: '2-3 hours',
    modules: [
      { title: 'AI Fluency Fundamentals', description: 'Core concepts for students' },
      { title: 'Responsible AI Collaboration', description: 'Academic integrity' },
      { title: 'Enhancing Learning', description: 'Study techniques with AI' },
      { title: 'Career Planning', description: 'AI in future careers' },
      { title: 'Academic Success Strategies', description: 'Practical applications' },
      { title: 'Building Long-term Skills', description: 'Continuous growth' }
    ]
  },
  {
    slug: 'teaching-ai-fluency',
    title: 'Teaching AI Fluency',
    description: 'Empowers academic faculty, instructional designers, and others to teach and assess AI Fluency in instructor-led settings.',
    category: 'ai-fluency',
    path: 'AI Fluency Framework',
    level: 'Advanced',
    estimatedHours: '3-4 hours',
    modules: [
      { title: 'Curriculum Development', description: 'Building AI courses' },
      { title: 'Instructional Design', description: 'Effective teaching methods' },
      { title: 'Teaching Core Concepts', description: 'Content delivery' },
      { title: 'Hands-on Activity Design', description: 'Interactive learning' },
      { title: 'Assessment Strategies', description: 'Measuring progress' },
      { title: 'Continuous Improvement', description: 'Iterative teaching' }
    ],
    prerequisites: ['AI Fluency for Educators or equivalent experience']
  },
  {
    slug: 'ai-fluency-for-nonprofits',
    title: 'AI Fluency for Nonprofits',
    description: 'Empowers nonprofit professionals to develop AI fluency to increase organizational impact while staying true to mission and values.',
    category: 'ai-fluency',
    path: 'AI Fluency Framework',
    level: 'Beginner',
    estimatedHours: '2-3 hours',
    modules: [
      { title: 'AI Fluency for Nonprofits', description: 'Mission-driven context' },
      { title: 'Ethical AI Aligned with Values', description: 'Responsible use' },
      { title: 'Increasing Impact', description: 'Program enhancement' },
      { title: 'Operational Efficiency', description: 'Resource optimization' },
      { title: 'Fundraising and Communication', description: 'Stakeholder engagement' },
      { title: 'Measuring AI Impact', description: 'Outcome tracking' }
    ],
    resources: [
      'https://www.anthropic.com/ai-fluency/nonprofits'
    ]
  }
];

export const learningPaths = [
  {
    title: 'Beginner Path: AI Foundations',
    description: 'For those new to AI or Claude',
    courses: ['claude-101', 'ai-fluency-framework-foundations', 'introduction-to-agent-skills'],
    estimatedHours: '6-8 hours',
    level: 'Beginner'
  },
  {
    title: 'Developer Path: Claude Code Mastery',
    description: 'For software developers and engineers',
    courses: ['claude-code-in-action', 'introduction-to-claude-cowork', 'building-with-the-claude-api', 'introduction-to-agent-skills', 'introduction-to-subagents'],
    estimatedHours: '12-16 hours',
    level: 'Intermediate'
  },
  {
    title: 'Cloud Integration Path',
    description: 'For cloud engineers and API specialists',
    courses: ['building-with-the-claude-api', 'claude-with-amazon-bedrock', 'claude-with-google-vertex', 'introduction-to-model-context-protocol'],
    estimatedHours: '10-12 hours',
    level: 'Advanced'
  },
  {
    title: 'Extension Path: Model Context Protocol',
    description: 'For developers wanting to extend Claude',
    courses: ['introduction-to-model-context-protocol', 'model-context-protocol-advanced-topics', 'introduction-to-agent-skills'],
    estimatedHours: '8-10 hours',
    level: 'Advanced'
  },
  {
    title: 'Educator Path: Teaching AI Fluency',
    description: 'For educators and trainers',
    courses: ['ai-fluency-for-educators', 'teaching-ai-fluency', 'ai-fluency-framework-foundations', 'claude-101'],
    estimatedHours: '10-12 hours',
    level: 'Intermediate'
  },
  {
    title: 'Student Path: Academic Enhancement',
    description: 'For students seeking AI-enhanced learning',
    courses: ['ai-fluency-for-students', 'claude-101', 'introduction-to-agent-skills', 'ai-fluency-framework-foundations'],
    estimatedHours: '8-10 hours',
    level: 'Beginner'
  },
  {
    title: 'Nonprofit Path: Mission-Driven AI',
    description: 'For nonprofit professionals',
    courses: ['ai-fluency-for-nonprofits', 'ai-fluency-framework-foundations', 'claude-101', 'introduction-to-agent-skills'],
    estimatedHours: '8-10 hours',
    level: 'Beginner'
  }
];

export const categories = [
  { id: 'foundational', label: 'Foundational', color: 'bg-emerald-500' },
  { id: 'claude-code', label: 'Claude Code & Development', color: 'bg-blue-500' },
  { id: 'api', label: 'API & Cloud Integrations', color: 'bg-purple-500' },
  { id: 'mcp', label: 'Model Context Protocol', color: 'bg-orange-500' },
  { id: 'ai-fluency', label: 'AI Fluency Framework', color: 'bg-pink-500' }
];

export function getCourseBySlug(slug: string): Course | undefined {
  return courses.find(c => c.slug === slug);
}

export function getCoursesByCategory(category: string): Course[] {
  return courses.filter(c => c.category === category);
}

export function getCoursesByPath(path: string): Course[] {
  return courses.filter(c => c.path === path);
}