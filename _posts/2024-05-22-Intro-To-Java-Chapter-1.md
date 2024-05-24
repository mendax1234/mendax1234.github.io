---
layout: single
title:  "Introduction to Java Programming Chapter 1 Review"
header:
  teaser: posts/Intro_To_Java_Prog_Head.jpg
categories: 
  - Introduction-To-Java-Programming
tags:
  - Java
---
This blog will serve as the beginning of my notes while reading "Introduction to Java Programming and Data Structures" by Y Daniel Liang.

<div style="text-align: center;">
    <img src="/images/posts/Intro_To_Java_Prog_Post.jpg" width="160" height="140">
</div>

<br>

# Chapter 1: Introduction to Computers, Programs, and Java
## 1.1 - 1.5
This part is too easy so there is not so much to mention.

## 1.6 The Java Language Specification, API, JDK, JRE, and IDE
1. The **Java language specification** is a technical definition of the Java programming language's syntax and semantics.
2. The **application program interface (API)**, also known as *library*, contains predefined classes and interfaces for developing Java programs.The API is still expanding.
3. Java SE, Java EE and ME
    - *Java Standard Edition* a.k.a Java SE.
    - *Java Enterprise Edition* a.k.a Java EE.
    - *Java Micro Edition* a.k.a Java ME.
4. The **Java Development Kit (JDK)**, consists of a set of separate **programs**, each invoked from a command line, for **compiling, running and testing Java programs**.
    - The **program for running Java programs** is known as **JRE (Java Runtime Environment)**. Instead of using JDK directly, you can use some other development tools (Eclipse etc) that provide an *integrated development environment (IDE)*.
    - In this book, we will use Java SE 8. And Oracle releases each version of Java SE with a *JDK*. For Java SE 8, the JDK is called *JDK 1.8* (a.k.a *Java 8* or *JDK 8*).

## 1.7 A Simple Java Program
As the name suggests, it's very simple. No need to write anything.

## 1.8 Creating, Compiling, and Executing a Java Program
*You save a Java programin in a .java file and compile it into a .class file. The .class file is executed by the Java Virtual Machine (JVM)*
1. `javac Source.java` \
In this step, your source code will be compiled into the java bytecode file with a `.class` extension. This java bytecode is a low-level language and it is similar to machine instructions but is architecture neutral and can run on any platform that has a *Java Virtual Machine (JVM)*.
2. `java Source.class` \
Now, you may use the JVM, which is an **interpreter** to execute the bytecode.

## 1.9 - 1.12
Nothing important.
