# pi-provider-bedrock

AWS Bedrock provider for [pi](https://github.com/badlogic/pi-mono). Routes model requests to Bedrock via AWS profile authentication.

## Install

```bash
pi install npm:pi-provider-bedrock
```

## Setup

Set your AWS profile in your shell environment:

```bash
export PI_BEDROCK_PROFILE=my-bedrock-profile
export PI_BEDROCK_REGION=us-east-1  # optional, defaults to us-east-1
```

The provider only activates when `PI_BEDROCK_PROFILE` is set.

## Models

| ID | Model |
|----|-------|
| `claude-opus-4-6` | Claude Opus 4.6 (1M context) |
| `claude-sonnet-4-6` | Claude Sonnet 4.6 (1M context) |

Switch models with `/model bedrock/claude-opus-4-6` or Ctrl+P.

## License

MIT
