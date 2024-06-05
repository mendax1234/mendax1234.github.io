---
layout: single
title:  "Introduction to Java Programming Chapter 1 to 8 Review"
header:
  teaser: posts/Intro_To_Java_Prog_Head.jpg
toc: true
toc_sticky: true
tags:
  - Java
  - Introduction-To-Java-Programming
---
This blog will serve as the beginning of my notes while reading "Introduction to Java Programming and Data Structures" by Y Daniel Liang.

<div style="text-align: center;">
    <img src="/images/posts/Intro_To_Java_Prog_Post.jpg" width="160" height="140">
</div>

<br>

# Chapter 1
## 1.1 - 1.5
This part is too easy so there is not so much to mention.

## 1.6
1. The **Java language specification** is a technical definition of the Java programming language's syntax and semantics.
2. The **application program interface (API)**, also known as *library*, contains predefined classes and interfaces for developing Java programs.The API is still expanding.
3. Java SE, Java EE and ME
    - *Java Standard Edition* a.k.a Java SE.
    - *Java Enterprise Edition* a.k.a Java EE.
    - *Java Micro Edition* a.k.a Java ME.
4. The **Java Development Kit (JDK)**, consists of a set of separate **programs**, each invoked from a command line, for **compiling, running and testing Java programs**.
    - The **program for running Java programs** is known as **JRE (Java Runtime Environment)**. Instead of using JDK directly, you can use some other development tools (Eclipse etc) that provide an *integrated development environment (IDE)*.
    - In this book, we will use Java SE 8. And Oracle releases each version of Java SE with a *JDK*. For Java SE 8, the JDK is called *JDK 1.8* (a.k.a *Java 8* or *JDK 8*).

## 1.7
As the name suggests (a simple java program), it's very simple. No need to write anything.

## 1.8
*You save a Java programin in a .java file and compile it into a .class file. The .class file is executed by the Java Virtual Machine (JVM)*
1. `javac Source.java` \
In this step, your source code will be compiled into the java bytecode file with a `.class` extension. This java bytecode is a low-level language and it is similar to machine instructions but is architecture neutral and can run on any platform that has a *Java Virtual Machine (JVM)*.
2. `java Source.class` \
Now, you may use the JVM, which is an **interpreter** to execute the bytecode.

## 1.9 - 1.12
Nothing important.

# Chapter 2
1. The plus sign `+` can also be a *string concatenation operator*. e.g.
```java
    System.out.println("1 + 1 = " + 2);
```
2. To read in Java, we can use
```java
    import java.util.Scanner;

    // ...
    Scanner input = new Scanner (System.in);
    double radius = input.nextDouble();
```
    **Note that** `.nextDouble()` method can be changed to other types, like `.nextInt()`.
3. To name a constant in Java, we can use the keyword `final`
```java
    //...
    final double PI = 3.14159;
```
    **Note that** a constant must be declared and initialized in the same statement.

# Chapter 3
1. In Java, there is a `boolean` datatype and the boolean variable can be either `true` or `false`. **You cannot regard nonzero value as true and zero as false**!
```java
    boolean lightsOn = true;
```
2. In Java, we also have *dangling `else` ambiguity* problem, which is very similar to C. That is the `else` clause will always match **the most recent unmatched `if` clause** in the same block.
```java
    //...
    int i = 1, j = 2, k = 3;

    if (i > j)
        if (i > k)
            System.out.println("A");
    else
        System.out.println("B");
```
    This code snippet is equivalent the code below
```java
    // ...
    int i = 1, j = 2, k = 3;
    if (i > j)
        if (i > k)
            System.out.println("A");
        else
            System.out.println("B");
```
3. In Java, we must also pay attention to the **equality test of two floating-point values**. For example,
```java
    // ...
    double x = 1 - 0.1 - 0.1 - 0.1 - 0.1 - 0.1;
    System.out.println(x == 0.5);
```
    In this code snippet, the final output is `false` since x actually is `0.50000001`. To avoid this problem, we can set $\lvert x - y\rvert < \epsilon$, where $\epsilon$ is a very small value, to test that whehter x is approximate to 0.5

# Chapter 4
1. The `Math` class is very useful. To use that class, you don't need to import. Just use `Math.method_name()` to invoke the method you want to use.
2. In Java, character is always enclosed in single quotation marks `' '`. And string is always enclosed in double quotation marks `" "`. And a char in Java takes **2 bytes**.
3. The `Character` class is also very useful, it contains some functions help you decide whether a character is uppercase or lowercase etc, which is a bit similar to `ctype.h` in C.
4. In Java, there is a data type called `String` so that you can define the string as follows
```java
    String message = "Welcome to Java";
```
    The string methods can only be invoked from a specific string instance. For example
```java
    message.length();
```
5. In Java, `' '`, `\t`, `\f`, `\r` and `\n` are called **whitespace characters**.
6. To read a string from console, we can use either `.next()` or `.nextLine()`. The difference is that `.next()` will read individual elements seperated by **whitespace characters** while the `.nextLine()` read elements seperated by an entire line only.

# Chapter 5
Loops in Java are totally the same with C. Nothing to record.

# Chapter 6
1. The meaning and use of method in Java is similar to the use of function in C.
2. A "Call Stack", a.k.a *execution stack*, *runtime stack* or *machine stack*, is often shortened to just "the stack".
3. In Java, the **overloading methods** enables you to define the methods with the same name as long as their parameter lists are different. For example,
```java
    // Method 1
    public static int max(int num1, int num2) {
        // ...
    }
    // Method 2
    public static int max(double num1, double numb2) {
        // ...
    }
    // Method 3
    public static int max(double num1, double num2, double num3) {
        // ...
    }
```
    Due to this property, the compiler will find the method that best matches a method invocation. But the *ambiguous invocation* may also appear and the compiler will output a compile error if encounters the ambiguous invocation.

# Chapter 7
1. Create an array in Java
    1. Create the array reference var. This is similar to creating a pointer in C.
    ```java
    // Usage
    elementType[] arrayRefVar;
    // Example
    double[] myList;
    ```
        Note that when defining the reference variable, there is no need to specify the length of the array.
    2. Create the array. This is similar to allocate memory and then store the starting address of that memory in the pointer variable in C.
    ```java
    // Usage
    arrayRefVar = new elementType[arraySize];
    // Example
    myList = new double[10];
    ```
    3. We can also combine the step 1 and step 2 together
    ```java
    // Usage
    elementType[] arrayRefVar = new elementType[arraySize];
    // Example
    double[] myList = new double[10];
    // Using Initializer
    double[] myList2 = {1.0, 2.0, 3.0};
    ```
    - When you create an array, the array elements are automatically initialized to zero for numeric types, false for boolean types.
    - The Initializer must be used in one line.
2. **Foreach Loops** \
Java supports a convenient way to iterate through the elements of an array. This is known as the *enhanced for loop* or the *foreach loop*. For example,
```java
    // Usage
    for (elementType element: arrayRefVar) {
        // ...
    }
    // Example
    for (double e: myList) {
        System.out.println(e);
    }
```
    The `e` is the variable that will be assigned to each element of the array in each iteration.
3. In Java, the array supports **variable-length**, which means the following is valid.
```java
    Scanner input = new Scanner();
    int n = input.nextInt();
    double[] numbers = new double[n];
```
4. In Java, when passing an array to a method, the **reference** of the array is passed to the method. For example
```java
    // Define the method
    public static void printArray(int[] array) {
        for (int i = 0; i < array.length; i++) {
            System.out.print(array[i] + " ");
        }
    }
    // Call the method
    printArray(new int[]{1, 2, 3, 4, 5});
```
    In this example, we pass an **anonymous array** to the method `printArray()`.
5. In Java, the `java.util.Array` class contains many useful methods, likeing sorting and searching.
6. In Java, when you pass command-line arguments, these arguements are stored at the String array called `args` and you can use `args[index]` to access each argument and the index starts from 0.

# Chapter 8
1. To create a two-dimensional array using an array initializer, we can use the syntax below
{% raw %}
    ```java
        elementType[][] arrayVar = {{row values}, ..., {row values}};
    ```
{% endraw %}
