from time import time_ns
import math

def calculate_wpm(text:str, time_in_ms) -> float:
    # divide text into words
    # get word count
    word_count = len(text.split())
    
    # calculate minutes from ms
    time_in_mins = time_in_ms/16.67 #(roughly 1000/60)
    
    # return count/minutes
    return word_count/time_in_mins

# demo time!
start_time = time_ns()
text = input("Type something: ")
end_time = time_ns()
elapsed_ns = end_time - start_time
print(f"your WPM was {calculate_wpm(text, elapsed_ns/1000000):.2f}")