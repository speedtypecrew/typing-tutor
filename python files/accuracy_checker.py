from re import sub
from spellchecker import SpellChecker
import nltk
from nltk.tokenize import word_tokenize
from difflib import SequenceMatcher

nltk.download('punkt')

def get_diff(word1, word2) -> float:
    matcher = SequenceMatcher(None, word1, word2)
    return matcher.ratio()
    

# returns (word accuracy, char accuracy)
def calculate_accuracy(text) -> tuple[float, float]:
    # initialize spellchecker and tokenize text into words
    spell = SpellChecker('en')
    words = word_tokenize(
        sub(r'\W+',' ', text)
    )
    
    # create counters and totals to get accuracy at the end
    total_words = len(words)
    correct_words = 0
    # total_chars = sum(len(word) for word in words)
    # correct_chars = 0
    char_accuracy = 0
    
    # get number of correct words
    for word in words:
        corrected = spell.correction(word)
        if word == corrected: correct_words += 1
        char_accuracy = ((char_accuracy + get_diff(word, corrected))/2)
        
    return (correct_words/total_words, char_accuracy)

# Testing
# prompt = "The rain in Spain stays mainly on the plain."
user_text = "The raine in spain stays manly on teh plane"
word_acc, char_acc = calculate_accuracy(user_text)

# print("Prompt:", prompt)
print("Input:", user_text)
print(f"Word Accuracy: {word_acc:.2f}")
print(f"Char Accuracy: {char_acc:.2f}")