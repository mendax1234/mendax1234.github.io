---
layout: single
title:  "Harvard CS50 Week2 Summary"
header:
  teaser: posts/Harvard_CS50.png
categories: 
  - Harvard-CS50
tags:
  - C
---

Welcome to CS50 Week 2! As normal, I will be going throught my summary of Week 1's content.

# Problem Set 2
## 01 Scrabble
**Things to notice in the problem statement**
1. It is not case-sensitive, which means for example 'c' and 'C' carry the same point.
2. Every letter that is not alpha carries 0 point.

**Divide and Conquer**
```
Define a global variable array to store the points of each letter
main()
Prompt the user for two words
Compute the score of each word using compute_word() function
Print the winner

compute_word()
Keep track of the score
Compute the score for each character
```
**Useful Snippets**
1. Compute the score of a string
```
int compute_score(string word)
{
        // Keep track of score
        int score = 0;

        //Compute score for each character
        for (int i = 0, len = strlen(word); i < l; i++) {
                if (isupper(word[i]))
                        score += POINTS[word[i] - 'A'];
                else if (islower(word[i]))
                        score += POINTS[word[i] - 'a'];
        }

        return score;
}
```

**Take-aways**
1. In the snippet, we can learn the style of traversing through a string in C, that's `for (int i, len = strlen(word); i < l; i++)`, then we can use `word[i]` to represent each letter in the word in the loop.

## 02 Readability
**Before the problem**
1. To compute the reading level of a text, we will use *Coleman-Liau index*, whose formula is `index = 0.0588 * L - 0.296 * S - 15.8`, where `L` is the average number of lettes per 100 words, and `S` is the average number of sentences per 100 words in the text.
    - Notice that this formula may output "wrongly" if you only input one word, like `hello`, in this case, what you will get is `Grade 14`, since `sentence` is 0. However, if we add a termination signal at the end, we will get the reasonable output. This is one disadvantage of this formula.

**Things to notice in the problem statement**
1. In `count_letters()`, we only need to count the characters that are alphabetical, so `isalpha()` will be useful.
2. In `count_words()`, we may assume that a sentence:
    1. will contain **at least one word**;
    2. will not start or end with a space; and
    3. will not have multiple spaces in a row; and
    4. will not start with `!`, `.` or `?`

    So, based on these assumptions, we'll consider any sequence of characters seperated by a **space** to be a word.
3. In `count_sentences()`, we only need to consider any sequence of characters that ends with a `.` or a `!` or a `?` to be a sentence.

**Divide and Conquer**
```
main()
Prompt the user for some text
Count the number of letters, words, and sentences in the text
Compute the Coleman-Liau index
Print the grade level
```

**Useful Snippets**
1. `count_sentences()`
```
int count_sentences(string text)
{
        int count = 0;
        for (int i = 0, len = strlen(text); i < len; i++) {
                if (isalpha(text[i]) && (text[i+1] == '!' || text[i+1] == '?' || text[i+1] == '.'))
                        count++;
        }
        return count;
}
```

**Take-aways**
1. To round a result (usually in float or double) to the nearest whole number, we can used the `round()` declared in `math.h`.
