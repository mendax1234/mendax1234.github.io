---
layout: single
title:  "CS1010 C Programming"
excerpt: CS1010 C Programming
header:
  teaser: posts/NUS_SOC.jpg
toc: true
tags:
  - C
  - CS1010
---

# C in CS1010
## Banned in CS1010
- The `++` and `--` operators
> Use `i += 1` or `i -= 1` instead.

- Skipping of curly braces for single statement conditional or loop body
> Always use `{}` even if the conditional or loop body contains only a single statement.

- Nested conditional operator `?:`
> Use nested `if-else` loop

- Global variables
> Declare the variables as local, automatic variables, and pass them around.

- Using `int` and `short`
> Always use `long`, which is guaranteed to be at least 32 bits.
> Exception: If a function from a C library calls for the use of `int` and offers no `long` alternative, then we have to use `int`.

- The type `float`
> Always use `double`

- Using integer values for true/false
> Use the `bool` type, and the values `true` and `false`

- `goto`
> Use combinations of conditionals and loops

## Discouraged in CS1010
- `printf()` and `scanf()` functions
> Use the CS1010 I/O Library

- `switch` statements
> Use `if-else` statements

- `break` and `continue` statements
> Use simple loops with a single entry and a single exit point. Use flag variables to indicate special conditions to exit or continue with the loop.

- Skipping parenthesis
> Use parenthesis
