---
layout: single
title:  "Harvard CS50 Week1 Review"
excerpt: Harvard CS50 Week1 Review
header:
  teaser: posts/Harvard_CS50.png
categories: 
  - Harvard-CS50
tags:
  - C
---

Welcome to CS50! This is Week 1 and I will be going to talk about my summary of Week 1's content.

# Problem Set 1
## [01 Hello, It's me](https://cs50.harvard.edu/x/2024/psets/1/me/)
This problem serves as the beginning of this course. Welcome to CS50!

## 02 Mario
### [Easy Version](https://cs50.harvard.edu/x/2024/psets/1/mario/less/)
**Things to notice in the problem statement**:
1. *"Re-prompt the user, again and again as needed, if their input is not greater than 0 or not an int altogether."*

**Divide and Conquer**
<pre id="mario" class="pseudocode">
    \begin{algorithm}
    \caption{Mario}
    \begin{algorithmic}
    \PROCEDURE{Main}{$void$}
        \STATE Prompt the user for the pyramid's height
        \STATE Print a pyramid of that height using a for loop
        \STATE Print each row using function \CALL{PrintRow}{}
    \ENDPROCEDURE
    \PROCEDURE{PrintRow}{}
        \STATE Print space
        \STATE Print bricks
    \ENDPROCEDURE
    \end{algorithmic}
    \end{algorithm}
</pre>

**Useful Snippets**
1. Prompt the user until the input is valid.
```c
    // do-while loop
    int n;
    do 
    {
        n = get_int("Height: ");
    }
    while (n < 1);
```

2. Make the pyramid right-aligned
```c
    void print_row(int bricks, int total)
    {
        int i;

        // Print whitespace
        for (i = 0; i < total - bricks; i++)
            printf(" ");
        // Print bricks
        for (j = 0; j < bricks; j++)
            printf("#");
        printf("\n");
    }
```

**Take-aways**
1. Use `do-while loop` to prompt until the input is valid.
2. Divide the problem into smaller parts by **finding the patterns**, just keep in mind if something is duplicate in your program, then it's likely to have a more compact way to do that.

### [Hard Version](https://cs50.harvard.edu/x/2024/psets/1/mario/more/)
Using the same settings from the problem above, now the bricks pattern we want to print is different. But, we can still using the design structure and the only thing we need to change is the `print_row()` function.

**Useful Snippets**
1. Change the `print_row` function to meet our requirements
```c
    void print_row(int bricks, int total)
    {
        int i;

        // Print white spaces at the left
        for (i = 0; i < total - bricks; i++)
            printf(" ");
        // Print bricks at the left
        for (i = 0; i < bricks; i++)
            printf("  ");
        // Print the middle white space
        printf(" ");
        // Print the bricks at the right
        for (i = 0; i < bricks; i++)
            printf("#");
        // End
        printf("\n");
    }
```

**Take-aways**:
1. In this hard version of Mario, we can clearly see the importance of finding a good "structure" to solve a problem. Since this good structure can be reused, which will make our code flexible. And one way to make your code flexible is to write good functions.

## [03 Cash - Easy](https://cs50.harvard.edu/x/2024/psets/1/cash/)
**Before the problem**
1. There are only **four** types of cents: `1(pennies)`, `5(nickles)`, `10(dimes)`, `25(quarters)`
2. Introduction to Greedy Algorithm \
A greedy algorithm is one “that always takes the **best immediate, or local**, solution while finding an answer. Due to this characteristic, greedy algorithm can find the overall optimal solution of an optimization problem, but sometimes it may find less-than-optimal solutions.

**Things to notice in the problem statement**
1. Reprompt the user until the input is valid.

**Divide and Conquer**
1. Use Greedy algorithm to understand the problem. \
Given an initial owing (a certain number), we always try the first biggest cent until the remaining owing is smaller than this biggest-first cent. Then we move on to the secondest cent until the owing is 0. (Since our smallest cent is `1`, which means we can always find a solution to this problem)

2. Design our structure
    <pre id="cash" class="pseudocode">
        \begin{algorithm}
        \caption{Cash}
        \begin{algorithmic}
        \PROCEDURE{Main}{$void$}        
            \STATE Prompt the user for change owed, in cents
            \STATE Calculate how many quarters you should give the customer
            \STATE Subtract the value of those quarters from cents
            \STATE Calculate how many dimes you should give the customer
            \STATE Subtract the value of those dimes from cents
            \STATE Calculate how many nickels you should give the customer
            \STATE Subtract the value of those nickels from cents
            \STATE Calculate how many pennies you should give the customer
            \STATE Subtract the value of those pennies from cents
        \ENDPROCEDURE
        \end{algorithmic}
        \end{algorithm}
    </pre>

**Useful snippets**
1. Implement the calculation using a specific function
```c
    int calculate_quarters(int cents)
    {
        int quarters = 0;
        while (cents >= 25)
        {
            quarters++;
            cents = cents - 25;
        }
        return quarters;
    }
```

**Take-aways**
1. The idea of greedy algorithm and its application.
2. If we use greedy algorith, we must update our parameter for the next greedy use.

## [03 Credit - Hard](https://cs50.harvard.edu/x/2024/psets/1/credit/)
**Before the problem**
1. Luhn's Algorithm \
This algorithm is used to check whether a credit card is valid or not by using a *checksum*. The procedure of this algorithm is below:
    1. Multiply every other digit by 2, starting with the number’s second-to-last digit, and then add those products’ digits together.
    2. Add the sum to the sum of the digits that weren’t multiplied by 2.
    3. If the total’s last digit is 0 (or, put more formally, if the total modulo 10 is congruent to 0), the number is valid! \
Notice that sometimes hackers will take use of this property, so we still need to look through the database to make sure whether the credit card number is valid or not.

**Things to notice in the problem statement**
1. The input should be `long`

**Divide and Conquer**
<pre id="credit" class="pseudocode">
    \begin{algorithm}
    \caption{Credit}
    \begin{algorithmic}
    \PROCEDURE{Main}{$void$}
        \FOR{each digit in the number}
            \STATE Calculate the checksum and get the length of the number
        \ENDFOR
    \STATE Calculate the first and second digit
    \STATE Decide the type of the credit card
    \ENDPROCEDURE
    \end{algorithmic}
    \end{algorithm}
</pre>

**Useful Snippets**
1. One `while` loop version
    ```c
    // Define and Initialize the variables
    long num_copy = num;
    int digit, sum1, indicator, length;

    indicator = 0;
    length = 0;
    sum1 = 0;

    // Calculate sum and length
    while (num != 0) {
        digit = num % 10;
        if (indicator)
        {
            int temp = digit * 2;
            if (temp >= 10)
            {
                while (temp)
                {
                    sum1 += temp % 10;
                    temp /= 10;
                }
            }
            else
            {
                sum1 += temp;
            }
            indicator = 0;
        }
        else
        {
            sum1 += digit;
            indicator = 1;
        }
        length++;
        num /= 10;
    }
```
2. Calculate the first and second digit
1. Method 1
```c
    int first_digit = num_copy / pow(10, length - 1);
    int second_digit = (num_copy - first_digit * pow(10, length - 1)) / pow(10, length - 2);
```
    In this method, we will use the length of the number.
2. Method 2
```c
    while (num < 100) {
            num /= 10;
    }
    first_digit = num / 10;
    second_digit = num % 10;
    ```
        In this method, we divide the number until the num is smaller than 100. And the remaining number is composed by the first and second digit.

**Take-aways**
1. `num % 10` will get the last digit of a number. `num / 10` will discard the last digit if num is an integer(including `int` and `long`).
