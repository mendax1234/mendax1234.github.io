---
layout: single
title:  "Harvard CS50 Week7 Review"
excerpt: Harvard CS50 Week7 Review
header:
  teaser: posts/Harvard_CS50.png
toc: true
tags:
  - C
  - Harvard-CS50
---

Welcome to CS50! This is my review for Week 7's content about SQL.

# Lecture
1. In SQL, we have a **CRUD** paradigm, where
    - **C** stands for **CREATE**, sometimes includes **INSERT** 
    - **R** stands for **READ**
    - **U** stands for **UPDATE**
    - **D** stands for **DELETE**, sometimes includes **DROP**
2. In SQL, we use the tradition that all the key words, like **SELECT**..., should be **captalized**. This is just to make our code easy to look at. Not captalizing the key words won't affect the execution of our SQL code.
3. Show the selected columns from the table in the terminal
```sql
    SELECT columns FROM table;
```
4. To define a variable in SQL
```sql
    SELECT COUNT(*) AS n FROM table;
```
5. Insert into table
```sql
    INSERT INTO table (column, ...) VALUES(value, ...);
```
6. Delete the **whole** table
```sql
    DELETE FROM table;
```
    This command will delete the whole table, which sometimes may cause horror story to happen.
7. An Interesting SQL attack: SQL Injection Attack \
Hackers will use the property of the *comment* (--) in SQL to hack into the user's account without knowing the password.
```python
    rows = db.execute("SELECT * FROM users WHERE username = '{username}' AND password = '{password}'")
```
    If the hacker input `malan@harvard'--` as the `username`
```python
    rows = db.execute("SELECT * FROM users WHERE username = `malan@harvard.edu'--' AND password = '{password}'")
```
    In this case, the hacker doesn't need to know the password but he can enter the account. To avoid this problem, we should use the code below:
```python
    from cs50 import SQL
    rows = db.execute("SELECT * FROM users WHERE username = ? AND password = ?", username, password)
```
