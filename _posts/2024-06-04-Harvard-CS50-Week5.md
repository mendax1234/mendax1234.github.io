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
