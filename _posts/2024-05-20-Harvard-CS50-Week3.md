---
layout: single
title:  "Harvard CS50 Week3 Summary"
header:
  teaser: posts/Harvard_CS50.png
categories: 
  - Harvard-CS50
tags:
  - C
---

This is CS50 Week 3. I will go through my summary of Week 3's content.

# Lecture
- Three methods to sort
    - Selection sort \
    Basically, this method starts at the beginning and select the smallest till the end and then swap it with the current selection.
    ```
        For i from 0 to n-1
            Find smallest number between numbers[i] and numbers[n-1]
            Swap smallest number with numbers[i]
    ```
    Its time complexity is $$O(n^2)$$. <br><br>
    **Inspiration from shorts:**
        - The idea behind selection sort: \
        The idea of selection sort is to **find the smallest unsorted element and add it to the end of the sorted list.**
        - In pseudocode:
        ```
            Repeat until no sorted elements remain:
                Search the unsorted part of the data to find the smallest value
                Swap the smallest found value with the firts element of the unsorted part
        ```

    - Bubble sort \
    This method sorts the largest number to the end until the beginning.
    ```
        Repeat n-1 times
            For i from 0 to n-2
                If numbers[i] and numbers[i+1] out of order
                    Swap them
            If no swaps
                Quit
    ```
    Its time complexity is $$O(n^2)$$ also. <br><br>
    **Inspiration from shorts:**
        - The idea behind bubble sort: \
        The idea of bubble sort is to **move higher valued elements generally towards the right and lower value elements generally towards the left**.
        - In pseudocode:
        ```
            Set swap counter to a non-zero value (-1)
            Repeat until the swap counter is 0:
                Reset swap counter to 0
                Look at each adjacent pair
                    If two adjacent elements are not in order, swap them and add one to the swap counter
        ```

    - Merge sort \
    This method takes twice the memory space.
    ```
        If only one number
            Quit
        Else
            Sort left half of numbers
            Sort right half of numbers
            Merge sorted halves.
    ```
    Its time complexity is $$O(nlogn)$$.

# Section
- To debug recursive function more effectively, there is a field called **Call Stack**.

<div style="text-align: center;">
    <img src="/images/posts/Call_Stack.png" width="160" height="140">
</div>

- The `return` inside a function call **only** ends the given function call only. It won't terminate the whole program.
