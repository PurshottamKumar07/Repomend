from dotenv import load_dotenv
from os import getenv
from groq import Groq
import json
import re
import ast

load_dotenv()

GROQ_KEY = getenv("GROQ_KEY")

client = Groq(api_key=GROQ_KEY)

def process_list_with_prompt(preferences: dict):

    final_prompt = f"""
You are a recommendation engine.

User preferences:
{preferences}

Task:
Generate exactly 5 project topics based on the user's preferences.

Rules:
- Return ONLY a valid Python list
- No explanation
- No markdown
- No numbering
- No extra text
- Only 5 items
- Each item must be a string
- Topics should strongly align with highest preference scores
- Avoid topics related to negative preference scores

Example output:
["AI Resume Analyzer", "ML Stock Predictor", "Python Voice Assistant"]

Now generate the response.
"""

    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[
            {
                "role": "user",
                "content": final_prompt
            }
        ],
        temperature=0.2
    )

    content = response.choices[0].message.content.strip()

    try:
        cleaned = content.strip()
        # Extract content from markdown code block if present
        if "```" in cleaned:
            match = re.search(r'```(?:json|python)?\s*([\s\S]*?)\s*```', cleaned)
            if match:
                cleaned = match.group(1).strip()
        
        parsed = json.loads(cleaned.replace("'", '"'))
        if isinstance(parsed, list):
            return parsed
    except Exception:
        pass

    # Regex-based fallback to extract lists
    try:
        array_match = re.search(r'\[\s*(?:["\'][^"\']*?["\']\s*,\s*)*["\'][^"\']*?["\']\s*\]', content)
        if array_match:
            parsed = ast.literal_eval(array_match.group(0))
            if isinstance(parsed, list):
                return parsed
    except Exception:
        pass

    # Fallback to line-by-line list parsing
    items = []
    for line in content.splitlines():
        line = line.strip().lstrip("-*0123456789. ")
        line = line.strip('"\'')
        if line:
            items.append(line)

    if items:
        return items[:5]

    return [content]
