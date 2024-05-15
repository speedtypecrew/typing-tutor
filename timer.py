import time
import threading
import curses

def timer_thread(start_time, elapsed_time):
    while True:
        elapsed_time[0] = time.time() - start_time
        time.sleep(0.1)

def typing_timer(stdscr):
    stdscr.nodelay(True)

    stdscr.clear()

    stdscr.addstr(0, 0, "Start typing. Press 'Enter' when done.")
    stdscr.refresh()

    start_time = time.time()
    elapsed_time = [0]

    # Start the timer thread
    timer = threading.Thread(target=timer_thread, args=(start_time, elapsed_time))
    timer.daemon = True
    timer.start()

    try:
        while True:
           
            key = stdscr.getch()
            stdscr.addstr(1, 0, f"Time elapsed: {elapsed_time[0]:.2f} seconds")
            stdscr.refresh()

            if key == 10:  
                break
            time.sleep(0.1)

    finally:
        stdscr.nodelay(False)

    stdscr.addstr(2, 0, f"Final time: {elapsed_time[0]:.2f} seconds")
    stdscr.refresh()
    stdscr.getch()
    
curses.wrapper(typing_timer)
