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
