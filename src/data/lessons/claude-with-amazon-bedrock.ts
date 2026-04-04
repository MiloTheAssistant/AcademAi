import type { LessonContent } from "../lessons";

const lessons: LessonContent[] = [
  {
    courseSlug: "claude-with-amazon-bedrock",
    moduleIndex: 0,
    title: "Introduction to Bedrock Integration",
    estimatedMinutes: 10,
    content: `
<h2>Claude on Amazon Bedrock</h2>
<p>Amazon Bedrock is AWS's fully managed AI foundation model service. By running Claude through Bedrock, you access the same Claude models available through the Anthropic API — but via AWS infrastructure, with AWS billing, IAM security, VPC networking, and native integration with other AWS services.</p>

<h3>Why Use Bedrock Instead of the Anthropic API Directly?</h3>
<p>The choice between Bedrock and the direct Anthropic API usually comes down to your infrastructure context:</p>
<ul>
  <li><strong>AWS ecosystem:</strong> If your infrastructure lives in AWS, Bedrock means one vendor relationship, consolidated billing, and native IAM security without managing an additional API key secret</li>
  <li><strong>Compliance:</strong> Bedrock data processing agreements are within AWS's compliance framework (HIPAA, SOC 2, etc.) — valuable for regulated industries</li>
  <li><strong>Networking:</strong> Call Bedrock from within your VPC without traffic leaving AWS's network</li>
  <li><strong>AWS integration:</strong> Native integration with Lambda, ECS, SageMaker, and other AWS services</li>
</ul>
<p>If you're not already on AWS or don't have specific AWS-compliance requirements, the direct Anthropic API is simpler to get started with.</p>

<h3>Bedrock Model Availability</h3>
<p>Not all Claude models are available in all AWS regions. Claude on Bedrock is available in us-east-1, us-west-2, eu-west-1, ap-southeast-1, and others. Check the Bedrock console for current model availability in your region — availability expands regularly.</p>

<h3>What Stays the Same</h3>
<p>The Claude models themselves are identical. Your prompts, system instructions, and response parsing all work the same way. Bedrock is an access layer, not a different model. The main differences are authentication (IAM vs. API key), the SDK/endpoint, and pricing structure.</p>
`,
    keyTakeaways: [
      "Bedrock provides Claude via AWS infrastructure — same models, AWS billing and IAM security",
      "Choose Bedrock when your stack is on AWS, you have compliance requirements, or need VPC networking",
      "Check regional availability — not all Claude models are in all AWS regions",
      "The underlying Claude models are identical; Bedrock is an access layer",
    ],
  },
  {
    courseSlug: "claude-with-amazon-bedrock",
    moduleIndex: 1,
    title: "Setting Up Claude in Bedrock",
    estimatedMinutes: 12,
    content: `
<h2>Enabling and Configuring Claude on Bedrock</h2>
<p>Before you can call Claude via Bedrock, you need to enable model access in the Bedrock console. This is a one-time step per region per model.</p>

<h3>Enabling Model Access</h3>
<ol>
  <li>Open the AWS Console and navigate to Amazon Bedrock</li>
  <li>In the left sidebar, choose "Model access"</li>
  <li>Find the Claude models from Anthropic in the list</li>
  <li>Click "Edit" and enable the models you need (Claude Haiku, Sonnet, Opus)</li>
  <li>Submit the request — access is typically granted within minutes</li>
</ol>
<p>Note: Enabling model access requires accepting Anthropic's end user license agreement through the Bedrock console.</p>

<h3>Installing the AWS SDK</h3>
<pre><code># Python
pip install boto3

# Node.js
npm install @aws-sdk/client-bedrock-runtime</code></pre>

<h3>Model IDs on Bedrock</h3>
<p>Bedrock uses Amazon Resource Name (ARN)-style model IDs rather than the simple model names used in the Anthropic API. Examples:</p>
<pre><code># Anthropic API format
claude-sonnet-4-5

# Bedrock format
anthropic.claude-sonnet-4-5-20251001-v2:0

# Cross-region inference (recommended for higher limits)
us.anthropic.claude-sonnet-4-5-20251001-v2:0</code></pre>
<p>Check the Bedrock console for current model IDs — they include version dates that change with model updates.</p>

<h3>Cross-Region Inference</h3>
<p>Bedrock's cross-region inference feature (prefix <code>us.</code>, <code>eu.</code>, or <code>ap.</code>) routes requests across multiple regions automatically. This provides higher throughput limits and better availability. For production use cases, cross-region inference is generally recommended over single-region model IDs.</p>
`,
    keyTakeaways: [
      "Enable model access in the Bedrock console before first use — one-time step per region per model",
      "Bedrock model IDs include version dates and provider prefix (e.g. anthropic.claude-sonnet-...)",
      "Cross-region inference (us./eu./ap. prefix) gives higher throughput limits — use for production",
      "Install boto3 (Python) or @aws-sdk/client-bedrock-runtime (Node.js)",
    ],
  },
  {
    courseSlug: "claude-with-amazon-bedrock",
    moduleIndex: 2,
    title: "Authentication and IAM",
    estimatedMinutes: 11,
    content: `
<h2>AWS IAM for Bedrock Access</h2>
<p>Bedrock uses AWS IAM for authentication and authorization rather than API keys. This means all the AWS security patterns you already know — roles, policies, instance profiles, assume role — apply to Bedrock access.</p>

<h3>Required IAM Permissions</h3>
<p>The minimum permissions to call Bedrock:</p>
<pre><code>{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Action": [
      "bedrock:InvokeModel",
      "bedrock:InvokeModelWithResponseStream"
    ],
    "Resource": [
      "arn:aws:bedrock:us-east-1::foundation-model/anthropic.claude-*"
    ]
  }]
}</code></pre>
<p>Scope the Resource ARN to specific models and regions rather than using wildcards in production.</p>

<h3>Authentication Patterns</h3>
<ul>
  <li><strong>IAM role (EC2, Lambda, ECS):</strong> Assign a role with Bedrock permissions to your compute resource. Credentials are injected automatically — no secrets to manage.</li>
  <li><strong>IAM role (local dev):</strong> Configure a profile in <code>~/.aws/credentials</code> or use <code>aws sso login</code></li>
  <li><strong>Assume Role:</strong> Cross-account access by assuming a role in the target account</li>
</ul>
<p>Never use long-lived IAM user access keys for production. Use roles wherever possible.</p>

<h3>Boto3 Authentication</h3>
<p>Boto3 (the Python AWS SDK) automatically picks up credentials from the environment in priority order:</p>
<ol>
  <li>Environment variables (<code>AWS_ACCESS_KEY_ID</code>, <code>AWS_SECRET_ACCESS_KEY</code>)</li>
  <li><code>~/.aws/credentials</code> profile</li>
  <li>IAM instance profile (EC2/ECS/Lambda)</li>
</ol>
<p>For most production deployments, option 3 (instance profile) is the correct choice.</p>

<h3>Resource Policies and Guardrails</h3>
<p>Bedrock Guardrails let you define organization-wide policies that apply to all Claude interactions: content filters, topic restrictions, PII detection and redaction, and grounding checks. These apply before and after the model and can be enforced at the IAM level — ensuring compliance even when individual developers call the API directly.</p>
`,
    keyTakeaways: [
      "Bedrock uses IAM for auth — no separate API key needed if you're already in AWS",
      "Minimum permissions: bedrock:InvokeModel and bedrock:InvokeModelWithResponseStream",
      "Use IAM roles (instance profiles) for production — never long-lived IAM user keys",
      "Bedrock Guardrails enforce org-wide content and safety policies across all Claude calls",
    ],
  },
  {
    courseSlug: "claude-with-amazon-bedrock",
    moduleIndex: 3,
    title: "API Calls via Bedrock",
    estimatedMinutes: 13,
    content: `
<h2>Making Claude API Calls Through Bedrock</h2>
<p>The Bedrock runtime API supports two calling conventions for Claude: the native Bedrock API format and the Anthropic Messages API compatibility layer. The compatibility layer is generally easier to work with if you're already familiar with the Anthropic SDK.</p>

<h3>Using the Anthropic SDK with Bedrock</h3>
<p>The Anthropic Python SDK has a built-in Bedrock adapter:</p>
<pre><code>import anthropic

client = anthropic.AnthropicBedrock(
    aws_region="us-east-1"
    # Credentials loaded from environment/instance profile automatically
)

message = client.messages.create(
    model="anthropic.claude-sonnet-4-5-20251001-v2:0",
    max_tokens=1024,
    messages=[{"role": "user", "content": "Hello from Bedrock!"}]
)
print(message.content[0].text)</code></pre>
<p>The request and response format is identical to the direct Anthropic API. You only need to change the client initialization and model ID.</p>

<h3>Using Boto3 Directly</h3>
<pre><code>import boto3
import json

bedrock = boto3.client("bedrock-runtime", region_name="us-east-1")

response = bedrock.invoke_model(
    modelId="anthropic.claude-sonnet-4-5-20251001-v2:0",
    body=json.dumps({
        "anthropic_version": "bedrock-2023-05-31",
        "max_tokens": 1024,
        "messages": [{"role": "user", "content": "Hello from Bedrock!"}]
    })
)

result = json.loads(response["body"].read())
print(result["content"][0]["text"])</code></pre>

<h3>Streaming via Bedrock</h3>
<pre><code>response = bedrock.invoke_model_with_response_stream(
    modelId="anthropic.claude-sonnet-4-5-20251001-v2:0",
    body=json.dumps({...})
)

for event in response["body"]:
    chunk = json.loads(event["chunk"]["bytes"])
    if chunk["type"] == "content_block_delta":
        print(chunk["delta"]["text"], end="", flush=True)</code></pre>

<h3>Bedrock Converse API</h3>
<p>Bedrock also offers a unified Converse API that works across model providers. This is useful if you want to build provider-agnostic code that can switch between Claude, Llama, Titan, and other Bedrock models. The Converse API abstracts model-specific request formats into a common interface.</p>
`,
    keyTakeaways: [
      "The Anthropic SDK's AnthropicBedrock adapter makes Bedrock calls identical to direct API calls",
      "Only changes needed from Anthropic API: client initialization and model ID format",
      "Boto3 is the alternative for pure AWS SDK usage; requires the anthropic_version field",
      "The Bedrock Converse API provides a provider-agnostic interface across all Bedrock models",
    ],
  },
  {
    courseSlug: "claude-with-amazon-bedrock",
    moduleIndex: 4,
    title: "Prompt Engineering for Bedrock",
    estimatedMinutes: 10,
    content: `
<h2>Bedrock-Specific Prompt Considerations</h2>
<p>The Claude models on Bedrock are the same as those available through the Anthropic API, so general Claude prompt engineering principles apply fully. However, a few Bedrock-specific features and constraints affect how you design prompts in production AWS deployments.</p>

<h3>Bedrock Guardrails Integration</h3>
<p>If your AWS account has Bedrock Guardrails configured, your prompts will be filtered before reaching Claude and responses filtered before returning to your application. Design your prompts knowing that guardrails may modify or block certain content. Test prompts with guardrails enabled to catch unexpected filtering.</p>

<h3>Prompt Management (Bedrock Prompts)</h3>
<p>Bedrock offers a Prompt Management feature that lets you store, version, and deploy prompts as managed AWS resources. Benefits:</p>
<ul>
  <li>Version control for prompts separate from application code</li>
  <li>A/B test different prompt versions</li>
  <li>Centralized prompt governance for teams</li>
  <li>IAM access control on who can modify production prompts</li>
</ul>

<h3>Context Length and Performance</h3>
<p>Very large context windows (near the 200K token limit) have higher latency on Bedrock as on any infrastructure. For latency-sensitive applications, keep context compact. Use cross-region inference to access higher throughput limits when processing large batches.</p>

<h3>Batch Inference</h3>
<p>Bedrock supports batch inference for processing large volumes of requests asynchronously. Submit a batch job with a JSONL input file stored in S3, and Bedrock processes it and writes results back to S3. Batch inference costs 50% less than on-demand and is ideal for offline processing tasks: document analysis, content generation pipelines, dataset annotation.</p>

<h3>Knowledge Bases</h3>
<p>Bedrock Knowledge Bases lets you connect Claude to your own document collections for RAG (Retrieval-Augmented Generation). Documents are stored in S3, embedded, and indexed automatically. Claude retrieves relevant chunks before generating responses, grounding its answers in your specific data. This is a managed alternative to building your own RAG pipeline.</p>
`,
    keyTakeaways: [
      "Test prompts with Guardrails enabled — they may filter content before it reaches Claude",
      "Bedrock Prompt Management provides versioning and IAM-controlled governance for prompts",
      "Batch inference costs 50% less than on-demand — ideal for async document processing pipelines",
      "Bedrock Knowledge Bases provides managed RAG — connect Claude to your S3 documents automatically",
    ],
  },
  {
    courseSlug: "claude-with-amazon-bedrock",
    moduleIndex: 5,
    title: "Security and Compliance",
    estimatedMinutes: 11,
    content: `
<h2>Security Best Practices for Claude on Bedrock</h2>
<p>One of the primary reasons to use Bedrock over the direct Anthropic API is the AWS-native security model. This module covers the security practices that make Bedrock deployments enterprise-ready.</p>

<h3>Data Residency</h3>
<p>By default, Bedrock processes data in the AWS region you call. Cross-region inference may route to other regions — if strict data residency is required, use single-region model IDs rather than cross-region inference profiles. Check your compliance requirements before enabling cross-region.</p>

<h3>VPC Endpoints</h3>
<p>Configure a VPC endpoint for Bedrock (<code>com.amazonaws.region.bedrock-runtime</code>) to keep all traffic within AWS's network. This means API calls from your Lambda or EC2 never traverse the public internet. Required for many financial and healthcare compliance frameworks.</p>

<h3>Encryption</h3>
<ul>
  <li><strong>In transit:</strong> All Bedrock API calls use TLS 1.2+ by default</li>
  <li><strong>At rest:</strong> Use customer-managed KMS keys for Bedrock Knowledge Bases and batch inference output in S3</li>
  <li><strong>Prompt data:</strong> Anthropic does not use Bedrock API request data to train models — verify current DPA for details</li>
</ul>

<h3>CloudTrail Logging</h3>
<p>Enable AWS CloudTrail to log all Bedrock API calls. This gives you a complete audit trail of: who called the API, which model, from which IP/role, and when. Essential for compliance audits and incident response.</p>

<h3>Least Privilege IAM</h3>
<p>Apply least privilege principles to Bedrock IAM policies:</p>
<ul>
  <li>Scope permissions to specific models and regions</li>
  <li>Use separate roles for different environments (dev/staging/prod)</li>
  <li>Use resource conditions to restrict access by request tags</li>
  <li>Regularly review and prune unused permissions</li>
</ul>

<h3>Bedrock Guardrails for Safety</h3>
<p>Configure Guardrails with your organization's content policies: blocked topics, harmful content filters, PII detection, and grounding checks. Guardrails apply consistently across all callers regardless of how they've configured their individual requests — making them the right place to enforce organization-wide safety requirements.</p>
`,
    keyTakeaways: [
      "Use single-region model IDs (not cross-region) when strict data residency is required",
      "Configure a VPC endpoint to keep Bedrock traffic within AWS's network",
      "Enable CloudTrail logging for a complete audit trail of Bedrock API usage",
      "Bedrock Guardrails enforce org-wide safety policies consistently across all callers",
    ],
  },
  {
    courseSlug: "claude-with-amazon-bedrock",
    moduleIndex: 6,
    title: "Building Production Applications",
    estimatedMinutes: 13,
    content: `
<h2>Production Patterns for Claude on Bedrock</h2>
<p>This module brings together the previous topics into practical patterns for building reliable, scalable production applications using Claude on Amazon Bedrock.</p>

<h3>Lambda Pattern</h3>
<p>AWS Lambda is the most common deployment pattern for Bedrock applications. A Lambda function handles incoming requests, calls Bedrock, and returns the response:</p>
<pre><code>import json
import boto3

bedrock = boto3.client("bedrock-runtime")

def handler(event, context):
    response = bedrock.invoke_model(
        modelId="us.anthropic.claude-sonnet-4-5-20251001-v2:0",
        body=json.dumps({
            "anthropic_version": "bedrock-2023-05-31",
            "max_tokens": 1024,
            "messages": [{"role": "user", "content": event["prompt"]}]
        })
    )
    result = json.loads(response["body"].read())
    return {"statusCode": 200, "body": result["content"][0]["text"]}</code></pre>
<p>Configure the Lambda execution role with the Bedrock invoke permissions. Lambda automatically gets instance profile credentials — no secrets needed.</p>

<h3>Asynchronous Patterns with SQS</h3>
<p>For high-volume applications, decouple request intake from Bedrock calls using SQS:</p>
<ul>
  <li>API Gateway → SQS (for request intake)</li>
  <li>Lambda → Bedrock (polling SQS, rate-limited)</li>
  <li>Results written to DynamoDB or returned via callback URL</li>
</ul>
<p>This pattern absorbs traffic spikes gracefully and respects Bedrock rate limits.</p>

<h3>Observability Stack</h3>
<p>Build observability into your Bedrock application from the start:</p>
<ul>
  <li><strong>CloudWatch Metrics:</strong> Track invocation count, latency, and error rates</li>
  <li><strong>CloudWatch Logs:</strong> Log token usage, model IDs, and request IDs for each call</li>
  <li><strong>X-Ray:</strong> Distributed tracing to see Bedrock latency in the context of your full request flow</li>
  <li><strong>Cost allocation tags:</strong> Tag Bedrock requests by feature or team for cost attribution</li>
</ul>

<h3>Handling Throttling</h3>
<p>Bedrock returns <code>ThrottlingException</code> when you exceed rate limits. Implement exponential backoff:</p>
<pre><code>from botocore.exceptions import ClientError
import time

def invoke_with_retry(bedrock, params, max_retries=3):
    for attempt in range(max_retries):
        try:
            return bedrock.invoke_model(**params)
        except ClientError as e:
            if e.response["Error"]["Code"] == "ThrottlingException":
                time.sleep(2 ** attempt)
                continue
            raise</code></pre>

<h3>Cost Optimization</h3>
<p>On Bedrock, cost optimization strategies mirror those for the direct API: right-size models per task, use prompt caching, implement request deduplication, and use batch inference for offline workloads. Monitor token usage in CloudWatch to identify high-cost operations and optimize them first.</p>
`,
    keyTakeaways: [
      "Lambda + IAM role is the standard Bedrock deployment pattern — no secrets, auto-credential injection",
      "SQS decoupling handles traffic spikes and enforces rate limits for high-volume applications",
      "Build observability with CloudWatch Metrics, Logs, and X-Ray from day one",
      "Implement exponential backoff for ThrottlingException — a requirement for any production Bedrock app",
    ],
  },
];

export default lessons;
