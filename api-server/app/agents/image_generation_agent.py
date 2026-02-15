from __future__ import annotations


class ImageGenerationAgent:
    """Placeholder image generation agent.

    Returns deterministic placeholder images so the frontend flow works
    before wiring a real model provider.
    """

    def generate(self, prompt: str) -> list[dict[str, str]]:
        safe_prompt = prompt.strip() or 'generated image'
        return [
            {
                'id': 'img-1',
                'prompt': safe_prompt,
                'url': f'https://placehold.co/320x180?text={safe_prompt.replace(" ", "+")}',
            },
            {
                'id': 'img-2',
                'prompt': f'{safe_prompt} variation',
                'url': f'https://placehold.co/320x180?text={safe_prompt.replace(" ", "+")}+2',
            },
        ]
