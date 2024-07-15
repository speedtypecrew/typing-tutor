import random

used_words = set()

def get_determiner(quantity, word):
    if quantity == 1:
        words = ["a", "one", "the"]
    else:
        words = ["some", "many", "the"]
    word_d = random.choice(words)
    if word_d == "a":
        vowels = 'aeiou'
        if word[0].lower() in vowels:
            return 'an'
        else:
            return 'a'
    return word_d

def get_unique_word(word_list):
    global used_words
    available_words = set(word_list) - used_words
    if not available_words:
        return None
    word = random.choice(list(available_words))
    used_words.add(word)
    return word

def get_noun(quantity):
    if quantity == 1:
        words = ["apple", "book", "clock", "desk", "elephant", "flower", "guitar", "house", "island", "jacket", "kite", "lamp", "mountain", "notebook", "orange", "pencil", "queen", "rose", "star", "tree", "umbrella", "vase", "window", "xylophone", "yacht", "zebra", "ball", "cloud", "door", "egg", "frog", "glass", "hat", "ice", "juice", "key", "leaf", "moon", "nest", "owl", "pear", "quilt", "ring", "sun", "teapot", "unicorn", "volcano", "whale", "x-ray", "yo-yo"]
    else:
        words = ["bottles", "chairs", "dishes", "engines", "forests", "grapes", "hills", "insects", "jungles", "knives", "lemons", "mirrors", "noodles", "oceans", "pizzas", "quizzes", "robots", "spoons", "tigers", "umbrellas", "valleys", "watches", "exhibits", "yarns", "zooms", "beans", "cups", "drums", "flutes", "gloves", "hearts", "islands", "jars", "kernels", "lanterns", "maps", "novels", "orbits", "peaches", "quests", "rivers", "shoes", "trains", "units", "villages", "wheels", "xenoliths", "years", "zeppelins", "winds"]
    return get_unique_word(words)

def get_verb(quantity, tense):
    if tense == "past":
        words = ["drank", "ate", "grew", "laughed", "thought", "ran", "slept", "talked", "walked", "wrote", "sang", "jumped", "listened", "worked", "played", "cried", "watched", "cooked", "met", "read", "drove", "bought", "wore", "broke", "chose", "drew", "drank", "fell", "forgot", "gave", "went", "knew", "made", "paid", "rode", "said", "saw", "sold", "sent", "stood", "won", "understood", "brought", "built", "caught", "cut", "found", "held", "kept", "let"]
    elif tense == "present":
        if quantity == 1:
            words = ["drinks", "eats", "grows", "laughs", "thinks", "runs", "sleeps", "talks", "walks", "writes", "sings", "jumps", "listens", "works", "plays", "cries", "watches", "cooks", "meets", "reads", "drives", "buys", "wears", "breaks", "chooses", "draws", "drinks", "falls", "forgets", "gives", "goes", "knows", "makes", "pays", "rides", "says", "sees", "sells", "sends", "stands", "wins", "understands", "brings", "builds", "catches", "cuts", "finds", "holds", "keeps", "lets"]
        else:
            words = ["drink", "eat", "grow", "laugh", "think", "run", "sleep", "talk", "walk", "write", "sing", "jump", "listen", "work", "play", "cry", "watch", "cook", "meet", "read", "drive", "buy", "wear", "break", "choose", "draw", "drink", "fall", "forget", "give", "go", "know", "make", "pay", "ride", "say", "see", "sell", "send", "stand", "win", "understand", "bring", "build", "catch", "cut", "find", "hold", "keep", "let"]
    else:
        words = ["will drink", "will eat", "will grow", "will laugh", "will think", "will run", "will sleep", "will talk", "will walk", "will write", "will sing", "will jump", "will listen", "will work", "will play", "will cry", "will watch", "will cook", "will meet", "will read", "will drive", "will buy", "will wear", "will break", "will choose", "will draw", "will drink", "will fall", "will forget", "will give", "will go", "will know", "will make", "will pay", "will ride", "will say", "will see", "will sell", "will send", "will stand", "will win", "will understand", "will bring", "will build", "will catch", "will cut", "will find", "will hold", "will keep", "will let"]
    return get_unique_word(words)

def make_sentence(quantity, tense):
    adjective = get_adjective()
    sentence = f"{get_prepositional_phrase(quantity).capitalize()}, {get_prepositional_phrase(quantity)}, {get_determiner(quantity, adjective)} {adjective} {get_noun(quantity)} {get_adverb()} {get_verb(quantity, tense)}."
    return sentence

def get_preposition():
    words = ["above", "across", "against", "along", "amid", "among", "around", "at", "before", "behind", "below", "beneath", "beside", "between", "beyond", "by", "down", "during", "for", "from", "in", "inside", "into", "near", "off", "on", "onto", "out", "outside", "over", "past", "through", "to", "toward", "under", "until", "up", "within", "without", "across from", "next to", "opposite", "beside", "amongst", "against", "alongside", "upon", "aboard", "beyond", "about"]
    return get_unique_word(words)

def get_prepositional_phrase(quantity):
    if quantity == 1:
        noun = get_noun(1)
        preposition = get_preposition()
        adjective = get_adjective()
        determiner = get_determiner(1, adjective)
        return f"{preposition} {determiner} {adjective} {noun}"
    else:
        noun = get_noun(2)
        preposition = get_preposition()
        adjective = get_adjective()
        determiner = get_determiner(2, adjective)
        return f"{preposition} {determiner} {adjective} {noun}"

def get_adjective():
    words = ["ancient", "beautiful", "cold", "dark", "elegant", "fragile", "gloomy", "heavy", "icy", "jolly", "kind", "large", "mysterious", "narrow", "old", "peaceful", "quiet", "rusty", "sunny", "tiny", "ugly", "vast", "wet", "xeric", "young", "zealous", "bright", "creaky", "dusty", "empty", "fuzzy", "golden", "hollow", "intricate", "juicy", "knotted", "luminous", "massive", "noisy", "ornate", "purple", "quaint", "ripe", "smooth", "thick", "velvety", "windy", "exotic", "yellow", "zippy"]
    return get_unique_word(words)

def get_adverb():
    words = ["quickly", "slowly", "carefully", "easily", "quietly", "loudly", "happily", "sadly", "smoothly", "rapidly", "brightly", "darkly", "strongly", "gently", "suddenly", "usually", "frequently", "rarely", "never", "always", "completely", "partially", "almost", "absolutely", "together", "alone", "simply", "clearly", "obviously", "possibly", "probably", "actually", "eventually", "recently", "previously", "typically", "naturally", "certainly", "specifically", "directly", "equally", "greatly", "highly", "deeply", "barely", "hardly", "merely", "just", "only", "truly"]
    return get_unique_word(words)

def main():
    global used_words
    used_words.clear()
    tenses = ["past", "present", "future"]
    plural = [1, 2]
    sentences = [make_sentence(random.choice(plural), random.choice(tenses),) for _ in range(4)]
    return sentences


