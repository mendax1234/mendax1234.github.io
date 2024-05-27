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
        <pre id="selection-sort-01" class="pseudocode">
            \begin{algorithm}
            \caption{Selection Sort}
            \begin{algorithmic}
            \FOR{$i = 0$ to $n-1$}
                \STATE Find the smallest number between numbers[i] and numbers[n-1]
                \STATE Swap the smallest number with numbers[i]
            \ENDFOR
            \end{algorithmic}
            \end{algorithm}
        </pre>
    Its time complexity is $$O(n^2)$$. <br><br>
    **Inspiration from shorts:**
        - The idea behind selection sort: \
        The idea of selection sort is to **find the smallest unsorted element and add it to the end of the sorted list.**
        - In pseudocode:
            <pre id="selection-sort-02" class="pseudocode">
                \begin{algorithm}
                \caption{Selection Sort}
                \begin{algorithmic}
                \REPEAT
                    \STATE Search the unsorted part of the data to find the smallest value
                    \STATE Swap the smallest found value with the first element of the unsorted part
                \UNTIL{no unsorted elements remain}
                \end{algorithmic}
                \end{algorithm}
            </pre>

    - Bubble sort \
    This method sorts the largest number to the end until the beginning.
        <pre id="bubble-sort-01" class="pseudocode">
            \begin{algorithm}
            \caption{Bubble Sort}
            \begin{algorithmic}
            \STATE Repeat n-1 times
                \FOR{$i = 0$ to $n-2$}
                    \IF{$numbers[i]$ and $numbers[i+1]$ out of order}
                        \STATE Swap them
                    \ENDIF
                \ENDFOR
                \IF{no swaps}
                    \STATE Quit
                \ENDIF
            \end{algorithmic}
            \end{algorithm}
        </pre>
    Its time complexity is $$O(n^2)$$ also. <br><br>
    **Inspiration from shorts:**
        - The idea behind bubble sort: \
        The idea of bubble sort is to **move higher valued elements generally towards the right and lower value elements generally towards the left**.
        - In pseudocode:
            <pre id="bubble-sort-02" class="pseudocode">
                \begin{algorithm}
                \caption{Bubble Sort}
                \begin{algorithmic}
                \STATE Set swap counter to a non-zero value
                \REPEAT
                    \STATE Reset swap counter to 0
                    \STATE Look at each adjacent pair
                        \IF{two adjacent elements are not in order}
                            \STATE Swap them
                            \STATE Add one to the swap counter
                        \ENDIF
                \UNTIL{swap counter is 0}
                \end{algorithmic}
                \end{algorithm}
            </pre>

    - Merge sort \
    This method takes twice the memory space.
        <pre id="merge-sort-01" class="pseudocode">
            \begin{algorithm}
            \caption{Merge Sort}
            \begin{algorithmic}
            \IF{only one number}
                \STATE Quit
            \ELSE
                \STATE Sort left half of numbers
                \STATE Sort right half of numbers
                \STATE Merge sorted halves
            \ENDIF
            \end{algorithmic}
            \end{algorithm}
        </pre>
    Its time complexity is $$O(nlogn)$$.<br><br>
    **Inspiration from shorts:**
        - The idea behind merge sort: \
        The idea of merge sort is to **sort smaller arrays and then combine those arrays together (merge them) in sorted order.**

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
1. Vote
    <pre id="vote-01" class="pseudocode">
        \begin{algorithm}
        \caption{Vote}
        \begin{algorithmic}
        \PROCEDURE{vote}{}
            \FOR{each candidate}
                \IF{candidate's name matches given name}
                    \STATE Increment candidate's votes
                    \RETURN true
                \ENDIF
            \ENDFOR
            \RETURN false
        \ENDPROCEDURE
        \end{algorithmic}
        \end{algorithm}
    </pre>

2. Print Winners
    <pre id="print_winners" class="pseudocode">
        \begin{algorithm}
        \caption{Print Winners}
        \begin{algorithmic}
        \PROCEDURE{PrintWinners}{}
            \STATE Find the maximum number of votes
            \STATE Print the candidate (or candidates) with maximum votes
        \ENDPROCEDURE
        \end{algorithmic}
        \end{algorithm}
    </pre>

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
    <pre id="vote-02" class="pseudocode">
        \begin{algorithm}
        \caption{Vote}
        \begin{algorithmic}
        \PROCEDURE{vote}{voter, rank, name}
            \FOR{each candidate}
                \IF{candidate's name matches given name}
                    \STATE Record the candidate's index as preference[voter][rank]
                    \RETURN true
                \ENDIF
            \ENDFOR
            \RETURN false
        \ENDPROCEDURE
        \end{algorithmic}
        \end{algorithm}
    </pre>

2. Tabulate votes for non-eliminated candidates (`void tabulate(void)`)
    <pre id="tabulate" class="pseudocode">
        \begin{algorithm}
        \caption{Tabulate}
        \begin{algorithmic}
        \PROCEDURE{tabulate}{}
            \FOR{each voter}
                \FOR{each rank}
                    \IF{candidate is not eliminated and is the voter's top choice}
                        \STATE Increment candidate's votes
                        \STATE Break
                    \ENDIF
                \ENDFOR
            \ENDFOR
        \ENDPROCEDURE
        \end{algorithmic}
        \end{algorithm}
    </pre>

3. Print the winner of the election, if there is one (`bool print_winner(void)`)
    <pre id="print_winner-02" class="pseudocode">
        \begin{algorithm}
        \caption{Print Winner}
        \begin{algorithmic}
        \PROCEDURE{PrintWinner}{}
            \STATE Define winning indicator as voter count divides 2
            \FOR{each candidate}
                \IF{candidate's votes > winning indicator}
                    \STATE Print
                    \RETURN true
                \ENDIF
            \ENDFOR
            \RETURN false
        \ENDPROCEDURE
        \end{algorithmic}
        \end{algorithm}
    </pre>

4. Return the minimum number of votes any remaining candidate has (`int find_min(void)`)
    <pre id="find_min" class="pseudocode">
        \begin{algorithm}
        \caption{Find Min}
        \begin{algorithmic}
        \PROCEDURE{FindMin}{}
            \STATE Initialize the variable min to MAX_VOTERS + 1
            \FOR{each candidate}
                \IF{candidate's votes is less than min}
                    \STATE Update min
                \ENDIF
            \ENDFOR
            \RETURN min
        \ENDPROCEDURE
        \end{algorithmic}
        \end{algorithm}
    </pre>

5. Decide whether the election is a tie (`bool is_tie(int min)`)
    <pre id="is_tie" class="pseudocode">
        \begin{algorithm}
        \caption{Is Tie}
        \begin{algorithmic}
        \PROCEDURE{IsTie}{min}
            \FOR{each candidate}
                \IF{candidate's votes > min}
                    \RETURN false
                \ENDIF
            \ENDFOR
            \RETURN true
        \ENDPROCEDURE
        \end{algorithmic}
        \end{algorithm}
    </pre>

6. Eliminate the candidate (or candidates) in last place (`void eliminate(int min)`)
    <pre id="eliminate" class="pseudocode">
        \begin{algorithm}
        \caption{Eliminate}
        \begin{algorithmic}
        \PROCEDURE{Eliminate}{min}
            \FOR{each candidate}
                \IF{candidate's votes is equal to min}
                    \STATE Set candidate's eliminated to be true
                \ENDIF
            \ENDFOR
        \ENDPROCEDURE
        \end{algorithmic}
        \end{algorithm}
    </pre>

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
    <pre id="vote-03" class="pseudocode">
        \begin{algorithm}
        \caption{Vote}
        \begin{algorithmic}
        \PROCEDURE{Vote}{rank, name, ranks}
            \FOR{each candidate}
                \IF{candidate's name matches given name}
                    \STATE Update ranks[rank] to be the candidate's index
                    \RETURN true
                \ENDIF
            \ENDFOR
            \RETURN false
        \ENDPROCEDURE
        \end{algorithmic}
        \end{algorithm}
    </pre>

2. Update preferences given one voter's ranks (`void record_preferences(int ranks[])`)
- Method 1
    <pre id="record_preferences-01" class="pseudocode">
        \begin{algorithm}
        \caption{Record Preferences}
        \begin{algorithmic}
        \PROCEDURE{RecordPreferences}{ranks}
            \FOR{each candidate from top rank to the lowest}
                \STATE Denote index as ranks[i]
                \FOR{each candidate below the rank above}
                    \STATE Increment the corresponding preferences
                \ENDFOR
                \STATE Denote temp as i
                \WHILE{temp is greater than 0}
                    \STATE preferences[index][rank[temp]]--
                    \STATE temp--
                \ENDWHILE
            \ENDFOR
        \ENDPROCEDURE
        \end{algorithmic}
        \end{algorithm}
    </pre>

- Method 2
    <pre id="record_preferences-02" class="pseudocode">
        \begin{algorithm}
        \caption{Record Preferences}
        \begin{algorithmic}
        \PROCEDURE{RecordPreferences}{ranks}
            \FOR{each candidate from top rank to the lowest}
                \FOR{each candidate below the rank above}
                    \STATE Increment the corresponding preferences
                \ENDFOR
            \ENDFOR
        \ENDPROCEDURE
        \end{algorithmic}
        \end{algorithm}
    </pre>

3. Record pairs of candidates where one is preferred over the other (`void add_pairs(void)`)
    <pre id="add_pairs" class="pseudocode">
        \begin{algorithm}
        \caption{Add Pairs}
        \begin{algorithmic}
        \PROCEDURE{AddPairs}{}
            \FOR{$i$ from 0 to candidate_count - 1}
                \FOR{$j$ from 0 to candidate_count - 1}
                    \IF{preferences[i][j] > preferences[j][i]}
                        \STATE Add $i$ and $j$ to a new pair
                    \ENDIF
                \ENDFOR
            \ENDFOR
        \ENDPROCEDURE
        \end{algorithmic}
        \end{algorithm}
    </pre>
Note that the condition to add a new pair is not `preferences[i][j]` greater than 0. It must be as stated in the pseudocode since only greater than 0 doesn't necessarily mean `i` is preferred over `j`.

4. Sort pairs in decreasing order by strength of victory (`void sort_pairs(void)`) \
The criteria for comparison is `preferences[i][j]`, which is also the strength of victory.
- Bubble sort
    Just a normal Buuble sort implementation would be okie but remember that in this problem, we need to move the smallest number towards the right.

5. Lock pairs into the candidate graph in order, without creating cycles (`void lock_pairs(void)`) \
This problem can be regarded as a very classic problem: determine whether there is a cycle in a directed graph. But in this probelm it's a little different, there is only one edge between two vertices.
- Method 1 \
    This method will use DFS and Recursion to judge the cycle in the graph. (Note that this method may not apply to general directed graph).
        1. Lock the pairs (`...lock_pairs(...)`)
            <pre id="lock_pairs-01" class="pseudocode">
                \begin{algorithm}
                \caption{Lock Pairs}
                \begin{algorithmic}
                \PROCEDURE{LockPairs}{}
                    \FOR{each pair}
                        \STATE Lock it first
                        \IF{loop_check() returns true}
                            \STATE Unlock the previous locked pair
                        \ENDIF
                    \ENDFOR
                \ENDPROCEDURE
                \end{algorithmic}
                \end{algorithm}
            </pre>
        2. Check whether there is a loop in the graph (`loop_check(int start)`)
            <pre id="loop_check-01" class="pseudocode">
                \begin{algorithm}
                \caption{Loop Check}
                \begin{algorithmic}
                \PROCEDURE{LoopCheck}{start}
                    \STATE Update the visited array
                    \FOR{each candidate}
                        \IF{candidate is visited twice}
                            \RETURN true
                        \ENDIF
                    \ENDFOR
                    \FOR{each candidate}
                        \IF{candidate is locked and not visited or visited once}
                            \IF{loop_check(candidate)}
                                \RETURN true
                            \ENDIF
                        \ENDIF
                    \ENDFOR
                    \RETURN false
                \ENDPROCEDURE
                \end{algorithmic}
                \end{algorithm}
            </pre>

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
