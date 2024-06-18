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

# Section
1. Some basic jargons in Database:
    - **Database**: A collection of data organized for **c**reating, **r**eading, **u**pdating, and **d**eleting. (This is **CRUD** principle)
    - **Database Management System (DBMS)**: Software via which you can interact with a data base. And below are some examples:
        - MySQL
        - Oracle
        - PostgreSQL
        - SQLite \
        ...
    - **SQL**: A **language** via which you can **c**reate, **r**ead, **u**pdate, and **d**elete data in a database.
2. Design Principles for a database:
    - Create one table for each **entity** in your dataset. For example, you should create **two** tables for the **books and authors**.
    - All tables should have a **primary key**. This is a unique id that differentiate one row from every other row.
    - The information in the table should depend on the **primary key** only.
3. Basic **SQL** Commands:
    - Create a table:
    ```sql
        CREATE TABLE table_name (
            column0 INTEGER,
            column1 TEXT,
            column2 NUMERIC,
            column3 REAL,
            PRIMARY KEY(column0)
        );
    ```
        In this code, `column0` and so on is just the **name** for one specific column. Remember that you should also define the **PRIMARY KEY** for this table, which abides by our designing principle stated above.
    - Create a joint/associative table:
    ```sql
        CREATE TABLE table_name (
            column0 INTEGER,
            column1 INTEGER,
            PRIMARY KEY(column0, column1)
            FOREIGN KEY(column0) REFERENCES other_table_name(column0),
            FOREIGN KEY(column1) REFERENCES other_table_name(column1)
        );
    ```
        In this code, `column0` and `column1` are the **foreign keys** that reference to the **primary keys** in other tables.
    - Delete a table:
    ```sql
        DROP TABLE table_name;
    ```
    - Insert:
    ```sql
        INSERT INTO table (column0, column1)
        VALUES(value0, value1);
    ```
        When inserting, you **don't need** to include the `id`/`PRIMARY KEY` column.
    - Delete:
    ```sql
        DELETE FROM table WHERE condition;
    ```
        Note that `WHERE` is usaully used to filter rows. It should appear right after you `SELECT` your columns.
    - Show basic information about a table (Usually the **column** information):
    ```sql
        .schema table_name
    ```
    - Show all the tables in the database:
    ```sql
        .tables
    ```
    - Order the result you see:
    ```sql
        SELECT * FROM table ORDER BY column_name;
    ```
        Note that `ORDER BY` is usually at the end of the statement. You can specify the ordering by add `DESC` (descending) and `ASC` (ascending) right after the `column_name` after `ORDER BY`.
    - Aggregate functions:
        - `COUNT(*)`: Count the number of rows in the table.
        - `SUM(column_name)`: Sum the values in the column.
        - `MAX(column_name)`: Find the maximum value in the column.
        - `MIN(column_name)`: Find the minimum value in the column.
        - `AVG(column_name)`: Find the average value in the column.
        - Usage:
        ```sql
            SELECT AVG(column_name) FROM table;
        ```
            This will output a number, which is the average of a specifc column from the table.

# Shorts
1. All our queries will refer to **rows** of the table since we specify all of the **columns** in that table.
2. In a joint table, it is okay to establish a **joint primary key** - a combination of two columns that is always guaranteed to be unique. Otherwise, there will be duplicates if we only specify one column as the `PRIMARY KEY`
3. In SQL, it is usally to define the `PRIMARY KEY` column as `INTEGER`. Otherwise, you need to configure that column to **autoincrement**.

