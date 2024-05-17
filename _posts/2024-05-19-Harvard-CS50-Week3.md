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
1. Three methods to sort
    1. Selection sort \
    Basically, this method starts at the beginning and select the smallest till the end and then swap it with the current selection.
    ```
        For i from 0 to n-1
            Find smallest number between numbers[i] and numbers[n-1]
            Swap smallest number with numbers[i]
    ```
    Its time complexity is $$O(n^2)$$.

    2. Bubble sort \
    This method sorts the largest number to the end until the beginning.
    ```
        Repeat n-1 times
            For i from 0 to n-2
                If numbers[i] and numbers[i+1] out of order
                    Swap them
            If no swaps
                Quit
    ```
    Its time complexity is $$O(n^2)$$ also.

    3. Merge sort \
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
