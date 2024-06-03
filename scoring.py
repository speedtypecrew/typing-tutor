import time
import math

def calculate_score(start_time, current_level, text, user_input):
    words_typed = user_input.split()
    words_expected = text.split()

    correct_words = sum(1 for i in range(min(len(words_typed), len(words_expected))) if words_typed[i] == words_expected[i])
    duration = time.time() - start_time
    wpm = math.ceil(len(words_typed) / (duration / 60))
    score = correct_words * (1 + 0.1 * (current_level - 1))

    return {'correct_words': correct_words, 'wpm': wpm, 'score': score}


if __name__ == "__main__":
    start_time = time.time()
    time.sleep(2)  
    current_level = 2
    text = "hello world this is a test"
    user_input = "hello world this is a test"

    results = calculate_score(start_time, current_level, text, user_input)
    print("Typing Results:")
    print(f"Correct Words: {results['correct_words']}")
    print(f"Words Per Minute (WPM): {results['wpm']}")
    print(f"Score: {results['score']}")
