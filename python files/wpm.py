from time import time_ns

def wpm(text:str, time_in_ms) -> int:
    # divide text into words
    # get word count
    word_count = len(text.split())
    
    # calculate minutes from ms
    time_in_mins = time_in_ms/1000/60
    
    # return count/minutes
    return word_count/time_in_mins

# demo time!
start_time = time_ns()
text = input("Type something: ")
end_time = time_ns()
elapsed_ns = end_time - start_time
print(f"your WPM was {wpm(text, elapsed_ns/1000000)}")