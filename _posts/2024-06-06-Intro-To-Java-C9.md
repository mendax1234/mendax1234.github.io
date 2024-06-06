---
layout: single
title:  "Introduction to Java Programming Chapter 9 Review"
header:
  teaser: posts/Intro_To_Java_Prog_Head.jpg
toc: true
toc_sticky: true
tags:
  - Java
  - Introduction-To-Java-Programming
---

# Chapter 9
## 9.2 Defining Classes for Objects
1. In Object-oriented programming (OOP), an *object* represents an entity in the real world that can be distinctly identified.
2. An object hsa a unique identity, state, and behavior.
    - **Identity**: The **name** of the object
    - **State**: It's often represented by **data fields**. For example, a circle object has a data field `radius`.
    - **Behavior**: The **methods** of the object. For example, a circle object has methods `getArea()` and `getPerimeter()`.
3. Objects of **the same type** are defined using a **common** class. An object is an **instance** of a class.
4. A `Circle` class example
```java
    class Circle {
        /*****************
        *** data fields ***
        ******************/

        /** The radius of this circle **/
        double radius = 1;

        /******************
        *** Constructors ***
        *******************/

        /** Consturct a circle object **/
        Circle() {
        }

        /** Construct a circle object **/
        Circle(double newRadius) {
            radius = newRadius;
        }

        /*************
        *** Methods ***
        **************/

        /** Return the area of this circle **/
        double getArea() {
            return radius * radius * Math.PI;
        }

        /** Return the perimeter of this circle **/
        double getPerimeter() {
            return 2 * radius * Math.PI;
        }

        /** Set a new radius for this circle **/
        void setRadius(double newRadius) {
            radius = newRadius;
        }
    }
```

## 9.3 
1. Only **one** class in the file can be a **public** class. Furthermore, the public class must have the **same name** as the file.

## 9.4 Constructing Objects Using Constructors
1. Constructors have three peculiarities:
    - A constructor must have the **same** name as the class itself.
    - Constructors **do not** have a return type -- not even `void`.
    - Constructors are invoked using the `new` operator when an object is created. Constructors play the role of initializing objects.
2. A class may be defined without constructors. In this case, a public no-arg constructor with an empty body is **implicitly defined** in the class.

## 9.5 Accessing Objects via Reference Variables
1. In this code,
```java
    Circle myCircle = new Circle();
```
    `Circle` is a **reference type**. `myCircle` is an object reference variable which can hold the reference to a `Circle` object. `new Circle()` creates an object and assigns its reference to `myCircle`.
2. In the class `Circle`, the data field `radius` is referred to as an *instance variable* because it is **dependent on a specific instance**. For the same reason, the method `getArea` is referred to as an *instance method* because you can invoke it only on a specific instance.
    - Note that we can use `Math.methodName(arguments)` to invoke a method in the `Math` class because these methods are **static methods**. But we cannot do the same on our `Circle` class.
3. The difference between variables of **Primitive Types** and **Reference Types**
    - For a variable of a primitive type, the value is of the primitive type.
    - For a variable of a reference type, the value is **a reference to where an object is located**.
    - In Java, the objects that are no longer useful are called **garbage**, and will be collected automatically by the Java Runtime system.

## 9.6 Using Classes from the Java Library
1. In the UML diagram, the **class name** is placed at the top, the **data field** in the middle, and the **methods** at the bottom.

