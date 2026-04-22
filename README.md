# pi-provider-bedrock (Archived)

> **⚠️ This project is archived.** Pi now has a built-in Bedrock provider — no extension needed.

## Using Pi's Built-in Bedrock Provider

Pi natively supports AWS Bedrock. Just configure your AWS credentials and add Bedrock models to your settings.

### 1. Set AWS credentials

Set your AWS profile in your shell (e.g. `~/.zshrc`):

```bash
export AWS_PROFILE=your-bedrock-profile
export AWS_REGION=us-east-1  # optional
```

Or use any standard AWS credential method (env vars, `~/.aws/credentials`, SSO, etc.).

### 2. Add models to pi settings

In your pi `settings.json` (usually `~/.pi/settings.json`), add Bedrock models under the `amazon-bedrock` provider:

```json
{
  "providers": {
    "amazon-bedrock": {
      "models": [
        {
          "id": "us.anthropic.claude-sonnet-4-6-v1",
          "name": "Claude Sonnet 4.6 (Bedrock)",
          "maxTokens": 16384
        },
        {
          "id": "us.anthropic.claude-opus-4-6-v1",
          "name": "Claude Opus 4.6 (Bedrock)",
          "maxTokens": 16384
        }
      ]
    }
  }
}
```

### 3. Use it

Launch pi with the Bedrock provider:

```bash
pi --provider amazon-bedrock --model us.anthropic.claude-sonnet-4-6-v1
```

Or switch models at runtime with `/model` or `Ctrl+P`.

### Cross-region inference

Use the `us.` prefix (e.g. `us.anthropic.claude-sonnet-4-6-v1`) for cross-region inference, or omit it for single-region.

## Why archived?

This extension was created before pi had native Bedrock support. The built-in provider is better maintained, supports more models, and doesn't require an extra package install.

If you previously had this installed, remove it:

```bash
pi uninstall pi-provider-bedrock
```
