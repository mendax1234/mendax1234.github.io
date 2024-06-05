---
layout: single
title:  "Harvard CS50 Week5 Review"
excerpt: Harvard CS50 Week5 Review
header:
  teaser: posts/Harvard_CS50.png
toc: true
tags:
  - C
  - Harvard-CS50
---

Welcome to CS50! This is my review for Week 5's content.

# Lecture
1. Nothing much to note down.

# Section
1. There are two important parts in this line of code: `int *p = malloc(sizeof(int) * 4)`
    - `int *p`: This creates an int pointer on the **stack**
    - `malloc(sizeof(int) * 4)`: This allocates 4 integers on the **heap** and returns the address of the first integer. This address is then stored in the pointer `p`.
2. Using `free(p)`, you just free the memory on the **heap**, which means the pointer `p` is still on available on the stack and now it points to `NULL`.

# Shorts
## Singly Linked List
1. Define a linked list node using `struct`
```c
    typedef struct node
    {
        int number;
        struct node *next;
    }
    node;
```
    The `struct node` appearing twice here is important for the self-referencing.
2. Destroy the whole list using the idea of **recursion**:
    - If you've reached a `NULL` pointer, return. (Base case)
    - Delete the **rest of the list**
    - Free the current node

## Tries
1. **Key-value** pairs:
    - In **Array**: The key is the **element index**, the value is **the data at that location**.
    - In **Hash Tables**: The key is the **hash code** of the data, the value is a **linked list of data hashing to that hash code** (supposed using chaining)
2. In **Tries**, the data to be searched for is now a roadmap:
    - If you can follow the map from beginning to end, the data exists in the trie.
    - If you can't, it doesn't exist.
    - For example, using the idea of **key-value pair**, the keys are four-digit years(YYYY) and the values are names of universities founded during those years. In this trie, the paths from a central **root** node to a **leaf** node (where the school names would be), would be labeled with **digits of the year**. Each node on the path from root to leaf could have **10** pointers emanating from it, one for each digit. Its structure can be defined as below:
    ```c
        typedef struct _trie
        {
            char university[20];
            struct _trie *next[10];
        }
        trie;
    ```
    - To search for an element in the trie, use successive digits to navigate from the root, and if you can make it to the end without hitting a dead end (a NULL pointer), you've found it. (This is similar to using the key to find the unique value)

# Problem Set 5
## [01 Inheritance](https://cs50.harvard.edu/x/2024/psets/5/inheritance/)
**Divide and Conquer**
1. `create_family()`
    <pre id="inheritance-01" class="pseudocode">
        \begin{algorithm}
        \caption{CreateFamily}
        \begin{algorithmic}
        \STATE Allocate memory for new person
        \IF{there are still generations left to create}
            \STATE Create two new parents for current person by recursively calling create\_family
            \STATE Set parent pointers for current person
            \STATE Randomly assign current person's alleles based on the alleles of their parents
        \ELSE
            \STATE Set parent pointers to NULL
            \STATE Randomly assign alleles
        \ENDIF
        \RETURN current person
        \end{algorithmic}
        \end{algorithm}
    </pre>

2. `free_family()`
    <pre id="inheritance-02" class="pseudocode">
        \begin{algorithm}
        \caption{FreeFamily}
        \begin{algorithmic}
        \STATE Handle base case
        \STATE Free parents recursively
        \STATE Free child
        \end{algorithmic}
        \end{algorithm}
    </pre>

## [02 Speller](https://cs50.harvard.edu/x/2024/psets/5/speller/)
**Things to notice in the problem statement**
1. The implementation of `check` must be **case-insensitive**.

**Divide and Conquer**
1. `check()` Check whehter the word is in the dictionary
    <pre id="speller-01" class="pseudocode">
        \begin{algorithm}
        \caption{Check}
        \begin{algorithmic}
        \STATE Hash the word
        \STATE Traverse the linked list at the hashed index
        \STATE Compare the word with the words in the linked list
        \end{algorithmic}
        \end{algorithm}
    </pre>
2. `hash()` Hash the word to a number \
    Design a good hash function makes this problem interesting and here is my design, which will use the first **two** characters to determine the hash code of a word. To use the first two characters, we need to know the idea of **base-26**.
    <pre id="speller-02" class="pseudocode">
        \begin{algorithm}
        \caption{Hash}
        \begin{algorithmic}
        \STATE Set N to be $26 * 26$
        \IF{the word has only one character}
            \STATE Return the uppercase of that character minus 'A'
        \ELSE
            \STATE Return the uppercase of the first character minus 'A' then times 26 plus the uppercase of the second character minus 'A'
        \ENDIF
        \RETURN the hash code
        \end{algorithmic}
        \end{algorithm}
    </pre>
3. `load()` Load the dictionary into memory
    <pre id="speller-03" class="pseudocode">
        \begin{algorithm}
        \caption{Load}
        \begin{algorithmic}
        \STATE Open the dictionary file
        \WHILE{there are still words in the dictionary}
            \STATE Read the word
            \STATE Create a new node for the word
            \STATE Hash the word
            \STATE Insert the node into the linked list at the hashed index
        \ENDWHILE
        \STATE Close the dictionary file
        \end{algorithmic}
        \end{algorithm}
    </pre>
4. `size()` Return the number of words in the dictionary
    <pre id="speller-04" class="pseudocode">
        \begin{algorithm}
        \caption{Size}
        \begin{algorithmic}
        \STATE Iterate through each element in the table
        \STATE Iterate through the corresponding linked list
        \end{algorithmic}
        \end{algorithm}
    </pre>
5. `unload()` Unload the dictionary from memory
    <pre id="speller-05" class="pseudocode">
        \begin{algorithm}
        \caption{Unload}
        \begin{algorithmic}
        \STATE Iterate through each element in the table
        \STATE Iterate through the corresponding linked list
        \STATE Free the node using two node pointers
        \end{algorithmic}
        \end{algorithm}
    </pre>

**Take-aways**
1. To read the word from the dictionary, we need to use [fscanf()](https://manual.cs50.io/3/fscanf), which is very useful to read from file besides `fread()`.
