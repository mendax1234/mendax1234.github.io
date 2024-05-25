---
layout: single
title:  "Harvard CS50 Week4 Review"
excerpt: Harvard CS50 Week4 Review
header:
  teaser: posts/Harvard_CS50.png
categories: 
  - Harvard-CS50
tags:
  - C
---

Welcome to CS50 again. This is Week 4 and I will go through my review of this week's content.

# Lecture
1. `malloc()` is just *memory allocate*, which will use the memory from the **heap**. And heap will grow downwards. There is also another section called **stack**, and function calls and the variables used will be stored in the stack. After the calling, the memory will be freed. Due to this reason, when we pass parameters by value, we just pass the copy and it won't affect the original value since after the function call, the memory will be freed. To affect the original value, we need to pass the address of the parameters.
2. Use the idea of point 1, we can understand the why in `scanf()`, we need to pass the **address** of the variable we want to store the input. That's because if we don't pass the address, we can't change the variable, which means we can't store our input into the variable. For example,
```c
    // n won't store the number input
    int n;
    scanf("%i", n);

    // only when you pass in the address can you change the n
    scanf("%i", &n);
```
    To understand it, we can use *pass by reference* when we want to change the parameters we passed in the function.
    ```c
    // The swap() that doesn't work
    void swap(int a, int b)
    {
        int tmp = a;
        a = b;
        b = tmp;
    }
    ```
    ```c
    // The swap() that works
    void swap(int *a, int *b)
    {
        int tmp = *a;
        *a = *b;
        *b = tmp;
    }
    ```
3. When we pass the variable in the `scanf()`, the variable must be **initialized**. For data type like `int`, it's suffice to just declare the variable. But for data type like pointers, declaration only is not suffice, initialization is also needed. For example
```c
    // int type
    int n;
    scanf("%i", &n);

    // pointers type - not working
    char *p;
    scanf("%s", p);

    // working
    char p[4];
    scanf("%s", p);
```
    For data type like `int`, it's okay for you not to initialize since it always has **valid space**. But for pointers, not initializing is dangerous because what p stores is a **garbage value** (If you don't initialize after declaring variables, what they have are all **garbage values**). This garbage value may represent an **invalid address** in the memory, so you can not write into that address.
4. When using `scanf()` to read string, scanf won't stop, even if you have specified the length of the string. This is dangerous. But what `get_string()` in `cs50.h` does is to use `malloc()` repeatedly to allocate more and more memory space to get the string.
5. In the lecture, I really apprecaite Prof Davaid's explanation about `*`(dereferencing). It can be viewed as "go to", for example
```c
    int *p, n;
    n = 1;
    p = &n;
    printf("%i", *p);
```
    In line 4, `*p` can be viewed as going to the value store in `p`, which is an address and get the value stored in that address.
