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

# Shorts
1. Singly Linked List
    - Define a linked list node using `struct`
    ```c
        typedef struct node
        {
            int number;
            struct node *next;
        }
        node;
    ```
        The `struct node` appearing twice here is important for the self-referencing.
    - Destroy the whole list using the idea of **recursion**:
        - If you've reached a `NULL` pointer, return. (Base case)
        - Delete the **rest of the list**
        - Free the current node
2. Tries
    - **Key-value** pairs:
        - In **Array**: The key is the **element index**, the value is **the data at that location**.
        - In **Hash Tables**: The key is the **hash code** of the data, the value is a **linked list of data hashing to that hash code** (supposed using chaining)
    - In **Tries**, the data to be searched for is now a roadmap:
        - If you can follow the map from beginning to end, the data exists in the trie.
        - If you can't, it doesn't exist.
        - For example, using the idea of **key-value pair**, the keys are four-digit years(YYYY) and the values are names of universities founded during those years. In this trie, the paths from a central **root** node to a **leaf** node (where the school names would be), would be labeled with **digits of the year**. Each node on the path from root to leaf could have **10** pointers emanating from it, one for each digit.
        - To search for an element in the trie, use successive digits to navigate from the root, and if you can make it to the end without hitting a dead end (a NULL pointer), you've found it. (This is similar to using the key to find the unique value)
        
