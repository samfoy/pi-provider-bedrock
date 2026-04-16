// ABOUTME: Registers a "bedrock" provider with key models that route to AWS Bedrock
// ABOUTME: using PI_BEDROCK_PROFILE. Gives a quick /model switch for Bedrock access.

import type { Api, AssistantMessageEventStream, Context, Model, SimpleStreamOptions } from "@mariozechner/pi-ai";
import { getApiProvider } from "@mariozechner/pi-ai";
import type { ExtensionAPI } from "@mariozechner/pi-coding-agent";

const PROVIDER = "bedrock";
const ZERO_COST = Object.freeze({ input: 0, output: 0, cacheRead: 0, cacheWrite: 0 });

const BEDROCK_MODELS: Array<{
  id: string;
  name: string;
  bedrockId: string;
  contextWindow: number;
  maxTokens: number;
}> = [
  {
    id: "claude-opus-4-6",
    name: "Claude Opus 4.6 1M (Bedrock)",
    bedrockId: "us.anthropic.claude-opus-4-6-v1",
    contextWindow: 1000000,
    maxTokens: 128000,
  },
  {
    id: "claude-sonnet-4-6",
    name: "Claude Sonnet 4.6 1M (Bedrock)",
    bedrockId: "us.anthropic.claude-sonnet-4-6",
    contextWindow: 1000000,
    maxTokens: 64000,
  },
];

function streamBedrock(
  model: Model<Api>,
  context: Context,
  options?: SimpleStreamOptions,
): AssistantMessageEventStream {
  const provider = getApiProvider("bedrock-converse-stream");
  if (!provider) throw new Error("Bedrock API provider not registered");

  const profile = process.env.PI_BEDROCK_PROFILE;
  const region = process.env.PI_BEDROCK_REGION || "us-east-1";

  const entry = BEDROCK_MODELS.find((m) => m.id === model.id);
  if (!entry) throw new Error(`No bedrock mapping for ${model.id}`);

  const bedrockModel: Model<Api> = {
    id: entry.bedrockId,
    name: entry.name,
    api: "bedrock-converse-stream" as Api,
    provider: "amazon-bedrock",
    baseUrl: `https://bedrock-runtime.${region}.amazonaws.com`,
    reasoning: true,
    input: ["text", "image"],
    cost: ZERO_COST,
    contextWindow: entry.contextWindow,
    maxTokens: entry.maxTokens,
  };

  return provider.stream(bedrockModel, context, {
    ...(options ?? {}),
    profile,
    region,
  } as Record<string, unknown>);
}

export default function (pi: ExtensionAPI) {
  if (!process.env.PI_BEDROCK_PROFILE) return;

  const region = process.env.PI_BEDROCK_REGION || "us-east-1";

  pi.registerProvider(PROVIDER, {
    api: `${PROVIDER}-api` as Api,
    baseUrl: `https://bedrock-runtime.${region}.amazonaws.com`,
    apiKey: "aws-profile-auth",
    models: BEDROCK_MODELS.map((m) => ({
      id: m.id,
      name: m.name,
      reasoning: true,
      input: ["text", "image"] as ("text" | "image")[],
      cost: ZERO_COST,
      contextWindow: m.contextWindow,
      maxTokens: m.maxTokens,
    })),
    streamSimple: streamBedrock,
  });
}
