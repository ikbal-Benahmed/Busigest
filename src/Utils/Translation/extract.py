import os
import re


def extract_text_from_file(file_path):
    with open(file_path, "r", encoding="utf-8") as file:
        content = file.read()
        # Regex to find text between <Text> tags
        matches = re.findall(r"<Text[^>]*>(.*?)<\/Text>", content, re.DOTALL)
        matches = [
            match.strip() for match in matches if "{" not in match and "}" not in match
        ]
        return [match.strip() for match in matches]


def extract_texts_from_directory(directory):
    texts = []
    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith(".js"):
                file_path = os.path.join(root, file)
                texts.extend(extract_text_from_file(file_path))
    return texts


if __name__ == "__main__":
    src_directory = "/Users/ikbal/Documents/Previous/Busigest/src"  # Adjust this if your src directory is different
    texts = extract_texts_from_directory(src_directory)
    for text in texts:
        print(text, ",")
