---
layout: single
title:  "Harvard CS50 Week3 Review"
excerpt: Harvard CS50 Week3 Review
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
    Its time complexity is $$O(nlogn)$$.<br><br>
    **Inspiration from shorts:**
        - The idea behind merge sort: \
        The idea of merge sort is to **sort smaller arrays and then combine those arrays together (merge them) in sorted order.

# Section
- To debug recursive function more effectively, there is a field called **Call Stack**.

<div style="text-align: center;">
    <img src="/images/posts/Call_Stack.png" width="240" height="210">
</div>

- The `return` inside a function call **only** ends the given function call only. It won't terminate the whole program.

# Problem Set 3
## [01 Sort](https://cs50.harvard.edu/x/2024/psets/3/sort/)
Just keep in mind the best and worst case time complexity of these three sort algorithms. That's enough.

## [02 Plurality](https://cs50.harvard.edu/x/2024/psets/3/plurality/)
**Things to notice in the problem statement**
1. If the user inputs an invalid input, the vote will be wasted.
2. We must print out all the candidates with `max` votes.

**Divide and Conquer**
1. `vote()`
```
    Iterate over each candidate
        Check if candidate's name matches given name
            If yes, increment candidate's votes and return true
    If no matches after checking each candidate, return false 
```

2. `print_winners()`
```
    Find the maximum number of votes

    Print the candidate (or candidates) with maximum votes
```

**Take-aways**
1. In the `print_winners()`, we need two loops, one for finding the max votes and another for printing all the candidates with that max votes if we don't want to increase the space complexity, like using an array to record the index of the candidates with max votes.

## [03 Runoff - Easy](https://cs50.harvard.edu/x/2024/psets/3/runoff/)
**Before the problem**
1. In the second problem about plurality, we may face a problem that there may be several winners. To deal with that problem, we assign the rank to each candidate the voter votes to. 

**Things to notice in the problem statement**
1. `preferences[i][j]` indicates that voter `i`'s `rank`th choice is the value of `preferences[i][j]`th candidate. (We assume that `preferences[i][0]` is the first choice).
2. Thanks to the introduction of `rank`, our election may have only one winner. If not, we need to do the elimination.

**Divide and Conquer**
1. Record preference if vote is valid (`bool vote(int voter, int rank, string name)`)
```
    Iterate through all the candidates
        If candidate's name == name
            record the candidate's index as preference[voter][rank]
            return true
    return false
```

2. Tabulate votes for non-eliminated candidates (`void tabulate(void)`)
```
    Iterate through each voter
        Iterate through each rank
            If this candidate is not eliminated and is the voter's toppest choice
                Increment this candidate's votes
                break from the rank loop
```

3. Print the winner of the election, if there is one (`bool print_winner(void)`)
```
    Define winning indicator as voter count divides 2
    Iterate through each candidate
        if candidate's votes > winning indicator
            print
            return true
    return false
```

4. Return the minimum number of votes any remaining candidate has (`int find_min(void)`)
```
    Initialize the variable min to MAX_VOTERS + 1
    Iterate through each candidate
        If candidate's votes < min
            Update min
    return min
```

5. Decide whether the election is a tie (`bool is_tie(int min)`)
```
    Iterate through each candidate
        If candidate's votes is greater than min
            return false
    return true
```

6. Eliminate the candidate (or candidates) in last place (`void eliminate(int min)`)
```
    Iterate through each candidate
        If candidate's votes is equal to min
            set this candidate's eliminated to be true
```

**Take-aways**
1. Nothing much to take away since it is a very specific probelm. What I want to say is to follow the problem instructions carefully!

## [03 Tideman - Very Very Very Hard](https://cs50.harvard.edu/x/2024/psets/3/tideman/)
**Things to notice in the problem statement**
1. The integer `preferences[i][j]` will represent the number of voters who prefer candidate `i` over candidate `j`.
2. The file also defines another two-dimensional array, called `locked`, which will represent the candidate graph. `locked` is a boolean array, so `locked[i][j]` being true represents the existence of an edge pointing from candidate `i` to candidate `j`; false means there is no edge. (If curious, this representation of a graph is known as an “adjacency matrix”).
3. The `struct` called `pair` is used to represent a pair of candidates: each pair includes the `winner`'s candidate index and the `loser`'s candidate index. (Both of the index are integer)
4. There is an array called `ranks`, where `ranks[i]` is the index of the candidate who is the `i`th preference for the voter. (We will update the rank at each iteration of a new voter)

**Divide and Conquer**
1. Update ranks given a new vote (`bool vote(int rank, string name, int ranks[])`)
```
    Iterate through each candidate
        if the current candidate name equals to the parameter name
            ranks[rank] = the index of the current candidate
            return true
    return false
```

2. Update preferences given one voter's ranks (`void record_preferences(int ranks[])`)
- Method 1
    ```
        Use a for loop to get the candidate from top rank to the lowest
            // Update the preferences
            denote index as ranks[i]
            Use another for loop to increment the preferences[index][j]
            // Deal with the Duplicate case
            denote temp as i
            while temp is greater than 0
                preferences[index][rank[temp]]--
                temp--
        return
    ```
- Method 2
    ```
        Use a for loop to get the candidate from top rank to the lowest
            Use another for loop to get the candidate below the rank above
                Increment the corresponding preferences
    ```

3. Record pairs of candidates where one is preferred over the other (`void add_pairs(void)`)
```
    Use two for loops to iterate through each element in preferences[][]
        if preferences[i][j] is greater than preferences[j][i]
            Add i and j to a new pair
```
Note that the condition to add a new pair is not `preferences[i][j]` greater than 0. It must be as stated in the pseudocode since only greater than 0 doesn't necessarily mean `i` is preferred over `j`.

4. Sort pairs in decreasing order by strength of victory (`void sort_pairs(void)`) \
The criteria for comparison is `preferences[i][j]`, which is also the strength of victory.
- Bubble sort
    Just a normal Buuble sort implementation would be okie but remember that in this problem, we need to move the smallest number towards the right.

5. Lock pairs into the candidate graph in order, without creating cycles (`void lock_pairs(void)`) \
This problem can be regarded as a very classic problem: determine whether there is a cycle in a directed graph. But in this probelm it's a little different, there is only one edge between two vertices.
- Method 1 \
    This method will use DFS and Recursion to judge the cycle in the graph. (Note that this method may not apply to general directed graph).
        1. `...lock_pairs(...)`
        ```
            Iterate through each pair
                lock it first
                if loop_check() returns true
                    unlock the previous locked pair
        ```
        2. `loop_check(int start)`
        ```
            Update the visited array
            Termination check (If a vertex is visited twice, return true)
            Recursion part
        ```

6. Print the winner of the election (`void print_winner(void)`)
For a specific candidate `j`, if with all the other candidates (iterating from `i`), the `locked[j][i]` is false, then candidate `j` is the winner. Otherwise, there is no winner.

**Useful Snippets**
1. `loop_check()`
```c
    bool loop_check(int start)
    {
        visited[start]++;

        // Termination check
        for (int i = 0; i < candidate_count; i++)
        {
            if (visited[i] == 2)
                return true;
        }

        for (int j = 0; j < candidate_count; j++)
        {
            if (locked[start][j] == true && (visited[j] == 0 || visited[j] == 1))
            {
                if (loop_check(j))
                    return true;
            }
        }
        return false;
    }
```

**Take-aways**
1. If a recursion function, if you want to return true after reaching a specific requirement, you must return true from all the calls. That means you must add a line `if (recursion_function_call) return true`. This is very important. 
