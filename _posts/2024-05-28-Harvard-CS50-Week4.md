---
layout: single
title:  "Harvard CS50 Week4 Review"
excerpt: Harvard CS50 Week4 Review
header:
  teaser: posts/Harvard_CS50.png
toc: true
tags:
  - C
  - Harvard-CS50
---

Welcome to CS50 again. This is Week 4 and I will go through my review of this week's content.

# Lecture
1. `malloc()` is just *memory allocate*, which will use the memory from the **heap**. And heap will grow downwards. There is also another section called **stack**, and **function calls and the variables** used will be stored in the stack. After the calling, the memory will be freed. Due to this reason, when we pass parameters by value, we just pass the copy and it won't affect the original value since after the function call, the memory will be freed. To affect the original value, we need to pass the address of the parameters.
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
    For data type like `int`, it's okay for you not to initialize since it always has **valid space**, so we can always rewrite the value in that valid space safely. But for pointers, not initializing is dangerous because what p stores is a **garbage value** (If you don't initialize after declaring variables, what they have are all **garbage values**). This garbage value may represent an **invalid address** in the memory, so you can not write into that address.
4. When using `scanf()` to read string, scanf won't stop, even if you have specified the length of the string. This is dangerous. But what `get_string()` in `cs50.h` does is to use `malloc()` repeatedly to allocate more and more memory space to get the string.
5. In the lecture, I really apprecaite Prof Davaid's explanation about `*`(dereferencing). It can be viewed as "go to", for example
```c
    int *p, n;
    n = 1;
    p = &n;
    printf("%i", *p);
```
    In line 4, `*p` can be viewed as going to the value store in `p`, which is an address and get the value stored in that address.

# Section
1. A pointer usually stores address. For example,
```c
    int n = 1;
    int *p = &n;
```
    In this code snippet, `p` is the name for the pointer and `int *` means the type is a pointer that points to `int`.
2. Some key syntax about pointer:
    - **type \*** is a pointer that stores the address of a **type**
    - **\*x** takes a pointer **x** and gets the value stored at that address
    - **&x** takes **x** and gets its address
3. `fread()` explanation \
    It takes four arguments, **To where (an address), what size (the size of a chunk), how many (how many chunkcs to read at a time), from where (an address)**. For example,
    ```c
    string filename = argv[1];
    FILE *f = fopen(filename, "r");
    uint8_t buffer[4];
    fread(buffer, 1, 4, f);
    ```
    In this code snippet, the size of the chunk is one byte, and we want to read 4 chunks at a time from the file and read them to the `uint8_t` array called buffer.

# Shorts
## Pointers
1. In C, `NULL` pointer is the simplest pointer available to us. And the `NULL` pointer points to nothing.
2. When you create a pointer and you don't set its value immediately, you should **always** set the value of the pointer to **NULL**.
3. When you dereference a pointer that is **NULL**, you will get a **segmentation fault**.
4. To define three pointers using one line, you should write
```c
    // Correct way
    int *a, *b, *c;
    // Wrong way
    int *a, b, c;
```
5. The size of a pointer is either $4$ or $8$ byte, depending on the system you are using. For example, in a $32$-bit system, the size of a pointer is $4$ byte, and in a $64$-bit system, the size of a pointer is $8$ byte.

## Defining Custom Data Types
1. In C, we use `typedef` to create a shorthand or rewritten name for data types. It's structure is below, which is very very important.
```c
    typedef <old name> <new name>
```

## Dynamic Memory Allocation
1. Statically and Dynamically
```c
    // statically obtain an integer
    int x;

    // dynamically obtain an integer
    int *px = malloc(sizeof(int));
```
    In this code, `x` is stored on the **stack**. The pointer variable `px` is also stored on the stack but the memeory it points to is a block of memory on the **heap**. To further understand this, see this example,
```c
    // array of floats on the stack
    float stack_array[x];

    // array of floats on the heap
    float *heap_array = malloc(x * sizeof(float));
```
2. Dynamically-allocated memory is **not** automatically returned to the system after finishing using it, so we need to use `free()` to free the dynamically-allocated memory. Otherwise, there will be a **memory-leak**. However, statically-allocated memory doesn't have this issue since it's stored on the stack and the memory will be freed after the function call.

## Call Stack
1. Stack frame \
When you call a function, the system sets aside space in memory for that function to do its necessary work.
    - We frequently call such chunk of memory **stack frames** or **function frames** (Not **stack only**).
2. More than one function's stack frame may exist in memory at a given time.
    - For example, if `main()` calls `move()`, which then calls `direction()`, all three functions have open frames.
    - These frames are arranged in a **stack**. The frame for the most-recently called function is always on the top of the stack.
    - When a new function is called, a new frame is **pushed** onto the top of the stack and becomes the active frame.
    - When a function finishes, its frame is **popped** off the stack, and the frame below it becomes the active frame again.

