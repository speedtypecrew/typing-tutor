import tkinter as tk
from tkinter import messagebox
import time
import random
import math
import threading
from python_files.accuracy_checker import calculate_accuracy
from sentence_generator import main as sgmain



class TypingPracticeApp:
    def __init__(self, root):
        self.root = root
        self.root.title("Typing Practice")
        
        self.setup_window()
        
        self.levels = {
            1: {"texts": [sgmain() for _ in range(1)], "threshold": 100},
            2: {"texts": [sgmain() for _ in range(2)], "threshold": 300},
            3: {"texts": [sgmain() for _ in range(3)], "threshold": 500}
        }
        self.current_level = 1
        self.current_text = ""
        self.total_score = 0
        self.start_time = 0 
        self.timer_thread = None
        self.timer_running = False
        self.init_ui()

    def setup_window(self):
        window_width = 600
        window_height = 200
        screen_width = self.root.winfo_screenwidth()
        screen_height = self.root.winfo_screenheight()
        position_top = int(screen_height / 2 - window_height / 2)
        position_right = int(screen_width / 2 - window_width / 2)
        self.root.geometry(f'{window_width}x{window_height}+{position_right}+{position_top}')

    def init_ui(self):
        self.label = tk.Label(self.root, text="Type the following text as fast and accurately as you can:")
        self.label.pack()
        
        self.text_label = tk.Label(self.root, text="")
        self.text_label.pack()
        
        self.input_entry = tk.Entry(self.root, width=50)
        self.input_entry.pack()
        self.input_entry.bind('<Return>', self.on_enter_key)
        
        self.start_button = tk.Button(self.root, text="Start", command=self.start_test)
        self.start_button.pack()
        
        self.end_button = tk.Button(self.root, text="Submit", command=self.end_test, state=tk.DISABLED)
        self.end_button.pack()
        
        self.result_label = tk.Label(self.root, text="")
        self.result_label.pack()
        
        self.score_label = tk.Label(self.root, text=f"Total Score: {self.total_score}")
        self.score_label.pack()
        
        self.level_label = tk.Label(self.root, text=f"Level: {self.current_level}")
        self.level_label.pack()

        self.timer_label = tk.Label(self.root, text="Time elapsed: 0.0 seconds")
        self.timer_label.pack()
        
    def start_test(self):
        if self.total_score >= self.levels[self.current_level]["threshold"] and self.current_level < len(self.levels):
            self.current_level += 1
            self.level_label.config(text=f"Level: {self.current_level}")
        
        self.current_text = random.choice(self.levels[self.current_level]["texts"])
        self.text_label.config(text=self.current_text)
        self.input_entry.delete(0, tk.END)
        self.input_entry.focus()
        self.start_button.config(state=tk.DISABLED)
        self.end_button.config(state=tk.NORMAL)
        self.start_time = time.time()  # Setting the start time here
        self.timer_running = True
        self.timer_thread = threading.Thread(target=self.update_timer)
        self.timer_thread.start()

    def end_test(self):
        self.timer_running = False
        user_input = self.input_entry.get()
        results = self.calculate_score(self.current_text, user_input)
        self.total_score += results['score']
        
        (word_acc, char_acc) = calculate_accuracy(user_input)
        print(f"Word Accuracy: {word_acc:.2f}")
        print(f"Character Accuracy: {char_acc:.2f}")
        
        self.result_label.config(text=f"Correct Words: {results['correct_words']}\nWPM: {results['wpm']}\nScore: {results['score']}\nTime elapsed: {self.elapsed_time:.2f}")
        self.score_label.config(text=f"Total Score: {self.total_score}")
        
        self.start_button.config(state=tk.NORMAL)
        self.end_button.config(state=tk.DISABLED)
        
        messagebox.showinfo("Results", f"Score: {results['score']}\nTotal Score: {self.total_score}")

    def calculate_score(self, text, user_input):
        words_typed = user_input.split()
        words_expected = text.split()
    
        correct_words = sum(1 for i in range(min(len(words_typed), len(words_expected))) if words_typed[i] == words_expected[i])
        duration = time.time() - self.start_time
        wpm = math.ceil(len(words_typed) / (duration / 60))  
        score = correct_words * wpm * (1 + 0.1 * (self.current_level - 1)) 

        return {'correct_words': correct_words, 'wpm': wpm, 'score': score}

    def on_enter_key(self, event):
        if self.start_button['state'] == tk.NORMAL:
            self.start_test()
        elif self.end_button['state'] == tk.NORMAL:
            self.end_test()

    def update_timer(self):
        while self.timer_running:
            self.elapsed_time = time.time() - self.start_time
            self.timer_label.config(text=f"Time elapsed: {self.elapsed_time:.2f} seconds")
            # self.timer_label.set("test!")
            time.sleep(0.1)

if __name__ == "__main__":
    root = tk.Tk()
    app = TypingPracticeApp(root)
    root.mainloop()
