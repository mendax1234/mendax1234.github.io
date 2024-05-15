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
