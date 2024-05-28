---
layout: single
title:  "Harvard CS50 Week2 Review"
excerpt: Harvard CS50 Week2 Review
header:
  teaser: posts/Harvard_CS50.png
toc: true
tags:
  - C
  - Harvard-CS50
---

Welcome to CS50 Week 2! As normal, I will be going through my summary of Week 1's content.

# Problem Set 2
## [01 Scrabble](https://cs50.harvard.edu/x/2024/psets/2/scrabble/)
**Things to notice in the problem statement**
1. It is not case-sensitive, which means for example 'c' and 'C' carry the same point.
2. Every letter that is not alpha carries 0 point.

**Divide and Conquer**
<pre id="scrabble" class="pseudocode">
    \begin{algorithm}
    \caption{Scrabble}
    \begin{algorithmic}
    \STATE Define a global variable array to store the points of each letter
    \PROCEDURE{Main}{$void$}
        \STATE Prompt the user for two words
        \STATE Compute the score of each word using \CALL{ComputeWord}{}
        \STATE Print the winner
    \ENDPROCEDURE
    \PROCEDURE{ComputeWord}{}
        \STATE Keep track of the score
        \STATE Compute the score for each character
    \ENDPROCEDURE
    \end{algorithmic}
    \end{algorithm}
</pre>

**Useful Snippets**
1. Compute the score of a string
```c
    int compute_score(string word)
    {
        // Keep track of score
        int score = 0;

        //Compute score for each character
        for (int i = 0, len = strlen(word); i < l; i++)
        {
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

## [02 Readability](https://cs50.harvard.edu/x/2024/psets/2/readability/)
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
<pre id="readability" class="pseudocode">
    \begin{algorithm}
    \caption{Readability}
    \begin{algorithmic}
    \PROCEDURE{Main}{$void$}
        \STATE Prompt the user for some text
        \STATE Count the number of letters, words, and sentences in the text
        \STATE Compute the Coleman-Liau index
        \STATE Print the grade level
    \ENDPROCEDURE
    \end{algorithmic}
    \end{algorithm}
</pre>

**Useful Snippets**
1. `count_sentences()`
```c
    int count_sentences(string text)
    {
        int count = 0;
        for (int i = 0, len = strlen(text); i < len; i++)
        {
            if (isalpha(text[i]) && (text[i+1] == '!' || text[i+1] == '?' || text[i+1] == '.'))
                count++;
        }
        return count;
    }
```

**Take-aways**
1. To round a result (usually in float or double) to the nearest whole number, we can use the `round()` declared in `math.h`.

## [03 Caesar - Easy](https://cs50.harvard.edu/x/2024/psets/2/caesar/)
**Before the problem**
1. Caesar's algorithm encrypts messages by "rotating" each letter by $$k$$ positions.

**Things to notice in the problem statement**
1. The program should only accept **only a single** command-line argument, a **non-negative integer**. Otherwise, the program should output `Usage: ./caesar key` and return form `main` a value of `1`.
2. The program must preserve case: capitalized letters, though rotated, must remain capitalized letters; lowercase letters, though rotated, must remain lowercase letters.

**Divide and Conquer**
<pre id="caesar" class="pseudocode">
    \begin{algorithm}
    \caption{Caesar}
    \begin{algorithmic}
    \PROCEDURE{Main}{$void$}
        \STATE Make sure program was run with just one command-line argument
        \STATE Make sure every character in $argv[1]$ is a digit
        \STATE Convert $argv[1]$ from a $string$ to an $int$
        \STATE Prompt user for plaintext
        \FOR{each character in the plaintext}
            \STATE Rotate the character if it's a letter
        \ENDFOR
    \ENDPROCEDURE
    \end{algorithmic}
    \end{algorithm}
</pre>

**Useful Snippets**
1. The command-line argument, `int argc, string argv[]` template
```c
    int main(int argc, string argv[])
    {
            // ...
    }
```
2. Check whehter the input is a non-negative integer or not.
```c
    int only_digits(string s)
    {
        int i, l;

        for (i = 0, l = strlen(s); i < l; i++)
        {
            if (!isdigit(s[i]))
                return 0;
        }
        return 1;
    }
```
    Notice that the method we use here is to check whether each character is a digit or not.
3. Rotate each alphabetical letter
```c
    char rotate(char c, int key)
    {
        if (!isalpha(c))
            return c;
        else
        {
            if (isupper(c))
            {
                int result = ((int) (c - 'A') + key) % 26 + (int) 'A';
                return (char) result;
            }
            else
            {
                c = toupper(c);
                int result = ((int) (c - 'A') + key) % 26 + (int) 'a';
                return (char) result;
            }
        }
    }
```
    We can divide the `rotate()` into two parts, that is `offset + base`.

**Take-aways**
1. The `get_string()` provided in the `<cs50.h>` won't truncate the extra white space behind. For example, if you input `123     `, the extra white space behind `3` will also be counted into the string. But in this problem, because of the use of `string argv[]`, it will use white space to seperate between strings, so the extra white space won't be counted to `argv[1]`, and it will only contain `123\0`.

## [03 Subtitution - Hard](https://cs50.harvard.edu/x/2024/psets/2/substitution/)
**Things to notice in the problem statement**
1. Every character in the key must be alphabetical, case-sensitive and appear only once, which means `c` and `C` can not appear in the key at the same time.

**Dividie and Conquer**
<pre id="substitution" class="pseudocode">
    \begin{algorithm}
    \caption{Substitution}
    \begin{algorithmic}
    \PROCEDURE{Main}{$void$}
        \STATE Make sure program was run with just one command-line argument
        \STATE Make sure the $key(argv[1])$ is valid
        \STATE Convert $argv[1]$ from a $string$ to an $int$
        \STATE Prompt user for plaintext
        \FOR{each character in the plaintext}
            \STATE Find the corresponding encrypted character if it's a letter
        \ENDFOR
    \ENDPROCEDURE
    \end{algorithmic}
    \end{algorithm}
</pre>

**Useful Snippets**
1. Validate the `key`
    1. $$O(n^2)$$ method.
    ```c
    int validate_key(string key)
    {
        int i, l, j;

        for (i = 0, l = strlen(key); i < l; i++)
        {
            if (!isalpha(key[i]))
                return 1;
            for (j = i+1; j < l; j++)
            {
                if (toupper(key[j]) == toupper(key[i]))
                    return 1;
            }
        }

        return 0;
    }
    ```
    2. $$O(n)$$ method
    ```c
    int validate_key(string key)
    {
        int record[26] = {0};

        for (int i = 0, l = strlen(key); i < l; i++)
        {
            int index = toupper(key[i]) - 'A';
            if (!isalpha(key[i]))
                return 1;
            else if (record[index] == 1)
                return 1;
            else
                record[index] = 1;
        }
        return 0;
    }
    ```
        The idea here is to keep track of the appearance of each letter.
2. Encrypt the alphabetical character
```c
    char encrypt(char c, string key)
    {
        int index;
        int case_indicator = 0;

        if (!isalpha(c))
            return c;
        else
        {
            // calculate the index and record the case_indicator
            if (isupper(c))
            {
                index = (int) c - 'A';
                case_indicator = 1;
            }
            else if (islower(c))
            {
                index = (int) c - 'a';
                case_indicator = 0;
            }

            if (case_indicator)
                return toupper(key[index]);
            else
                return tolower(key[index]);
        }
    }
```

**Take-aways**
1. In the validation part, the idea of *keep tracking* is important and will decrease the time compelxity tremendously.
2. The idea of *index* in the letter and array problem is important also. If it is case-sensitive in the problem, we can use `toupper()` or `tolower()` to map the letter to its index.
