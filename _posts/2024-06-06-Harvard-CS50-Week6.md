---
layout: single
title:  "Harvard CS50 Week6 Review"
excerpt: Harvard CS50 Week6 Review
header:
  teaser: posts/Harvard_CS50.png
toc: true
tags:
  - C
  - Harvard-CS50
---

Welcome to CS50 again! This blog will contain my review for Week 6's content about Python.

# Lecture
1. Nothing much to note down.

# Section
1. Nothing to note down. Try yourself and read the document is quite helpful.

# Shorts
1. Not much to note down. Just introduction to Python.

# Problem Set 6
## C-to-Python-Sentimental
Nothing to say

## DNA
**Divide and Conquer**
<pre id="dna" class="pseudocode">
    \begin{algorithm}
    \caption{DNA}
    \begin{algorithmic}
    \STATE Check for command-line usage
    \STATE Read database file into a variable
    \STATE Read sequence file into a variable
    \STATE Find longest match of each STR in DNA sequence
    \STATE Check database for matching profiles
    \end{algorithmic}
    \end{algorithm}
</pre>

**Useful Snippets**
1. Check for command-line uasge
```python
    if not len(sys.argv) == 3:
        print("error")
        return
```
2. Read database file into a variable
```python
    rows = []
    with open(sys.argv[1]) as file:
        reader = csv.DictReader(file)
        for row in reader:
            rows.append(row)
```
3. Read DNA sequence file into a variable
```python
    with open(sys.argv[2]) as file:
        sequence = file.read()
```
4. Find longest match of each STR in DNA sequence
```python
    result = {}
    for STR in STRs:
        count = longest_match(sequence, STR)
        result[STR] = f"{count}"
```
5. Check database for matching profiles
```python
    for row in rows:
        name = row.pop("name")
        if row == result:
            print(name)
            break
    else:
        print("No match.")
```

**Take-aways**
1. The command-line arguments are stored in `sys.argv`, which is a list. The first argument, which is `sys.argv[0]` is the script's name and the arguments after this are the actual arguments.
2. Using this code to read from the file,
```python
    with open("filename") as file:
        content = file.read()
```
    The variable `content` can be accessed outside the `with` statement.
3. The `==` can be used to determine whether two dictionaries are equivalent or not.
4. To pop a specific *key:value* pair from the dictionary, 
```python
    temp = dict.pop(key)`.  
```
5. To add add a *key:value* pair to the dictionary,
```python
    dict = {}
    dict[key] = value
```
