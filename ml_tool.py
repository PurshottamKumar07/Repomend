from dotenv import load_dotenv
from os import getenv
from groq import Groq
from typing import List

load_dotenv()

GROQ_KEY=getenv("GROQ_KEY")

client = Groq(api_key=GROQ_KEY)

def process_list_with_prompt(items: dict, user_prompt: str):
    

    final_prompt = f"""
    Here is a list:
    {formatted_items}

    Task:
    {user_prompt}
    """

    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[{"role": "user", "content": final_prompt}],
        temperature=0.7
    )

    return response.choices[0].message.content


# Example
data={"ml":2.6,"space":3.7,"python":7.0,"voice_recognition":-3.0}
prompt = "you need to generate a project name based on the topics and their score alongside dont justify anything its a must!  only 1 sentence project name!!"

print(process_list_with_prompt(data, prompt))