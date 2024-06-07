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
3. Objects of **the same type** are defined using a **common** class. An object is an **instance** of a class. A class is also a data type. You can use it to declare object *reference variables*.
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

## 9.7 Static Variables, Constants, and Methods
1. In UML diagram, **static variables and methods** are underlined.
2. **Instance Variables** belong to instances and have memory storage independent of one another. **Static variables** are shared by **all the instances of the same class**.
3. To define a **static vairable or method**, we usually add the keyword `static` at the front,
```java
    static int numberOfObjects;

    static int getNumberObjects() {
        return numberOfObjects;
    }
```
4. **Constants** in a class are shared by all objects of the class. Thus, constants should be declared as `final static`.
```java
    final static double PI = 3.14159;
```
5. **Instance variables and methods** are accessed via a reference variable (or basically an initialized object). **Static variables and methods** can be accessed from a reference variable or from their class name.
    - However, it is **recommended** to use `ClassName.staticMethod()` to invoke a static method and `ClassName.staticVariable` to access a static variable. This **improves readability** because this makes static methods and data easy to spot.
6. **Instance method**:
    - **Can** access **instance variables** and invoke **instance methods** directly.
    - **Can** access **static variables** and invoke **static methods** directly.
7. **Static method**:
    - **Can** access **static variables** and invoke **static methods** directly.
    - **Cannot** access **instance variables** or invoke **instance methods** directly.
    - However, a static method can access an instance variable or invoke an instance method through an **object reference**.
8. Design Guide (To decide whether a variable or a method should be instance or static)
    - A variable or method that is **dependent on a specific instance of the class** should be an **instance variable or method**.
    - A variable or method that is **not dependent on a specific instance of the class** should be a **static variable or method**.

## 9.8 Visibility Modifiers
1. **A visibility modifier (`public`, `private` ...)** specifies how **data fields and methods** in a class can be accessed **from outside the class**. There is **no restriction** on accessing data fields and methods **inside the class**.
    - **private**: The private modifier restricts access to its **defining class**, which makes methods and data fields accessible **only from within its own class**.
    - **default**: If you didn't specify `public` or `private`, it should be the **default modifier**. It restricts access to the **package**.
    - **public**: The public modifier enables **unrestricted access**, which means the method or data field can be accessed **from any other classes**.

## 9.9 Data Field Encapsulation
1. To declare **data fields** as **private** using `private` modifier is known as **data field encapsulation**. After that, we should provide a *getter* method or *accessor* to return its value and a *setter* method or *mutator* to set its value. These two methods must be `public`.
    - From now on, **all data fields** should be declared **private**, and **all constructors and methods** should be defined **public**, unless specified otherwise.

## 9.10 Pass Objects to Methods
1. Passing an object is actually passing the **reference** of the object (which basically is the location of the object in the heap).
2. Java uses exactly one mode of passing arguments: *pass-by-value*. When an object is passed to a method, this value passed is a **reference** to a object.
3. **Objects** are stored in a **heap**. But the variable to store the **reference** is in the **stack**.

## 9.11 Array of Objects
1. An array of objects is an array of **reference variables**.
    - When an array of objects is created using the `new` operator,
    ```java
        Circle[] circleArray = new Circle[10];
    ```
        each element in the array is a reference variable with a default value of `null`. We need to use another loop to create objects for each element in the array using `new` operator.
    ```java
        for (int i = 0; i < circleArray.length; i++) {
            circleArray[i] = new Circle();
        }
    ```

## 9.12 Immutable Objects and Classes
1. For a class to be **immutable**, it must meet the following requirements:
    - **All data fields** are **private**.
    - There **can't** be any **mutator methods** for data fields
    - **No accessor methods** can return a reference to a data field that is mutable (which means an object can be in the data field).

## 9.13 The Scope of Variables
1. **Instance and static variables** in a class are referred to as the **class's variables** or **data fields**. A variable **defined inside a method** is referred to as a **local variable**.
    - The scope of a class's variable is the **entire class**, regardless of where the variables are declared.
    - If a local variable has the same name as a class's variable, the local variable **takes precedence** and the class's variable with the same name is **hidden**.

## 9.14 The `this` Reference
1. The `this` keyword refers to the **object itself**.
    - Using `this` to Reference Data Fields,
    ```java
        private double radius;
        
        public void setRadius(double radius) {
            this.radius = radius;
        }
    ```
        In this code snippet, `this.radius` just refers to the radius in the data field. If you use the following,
    ```java
        private double radius;

        public void setRadius(double radius) {
            radius = radius;
        }
    ```
        The first `radius` is the parameter since it has higher precedence than the class variable (data field radius). This will be **wrong**. To summarize, `this` keyword gives us a way to **reference the object that invokes an instance method**.
    - Using `this` to Invoke a Constructor
        The `this` keyword can be used to invoke another constructor of the same class.
    ```java
        public class Circle {
            private double radius;
            public Circle(double radius) {
                this.radius = radius;
            }
            public Circle() {
                this(1.0);
            }
        }
    ```
        In this code snippet, `this(1.0)` will invoke the first constructor with a `double` argument.
        - Note that java requires that `this(arg-list)` statement appear first in the constructor before any other executable statements.
        - Using `this(arg-list)` can make a constructor with **no or fewer arguments** invoke a constructor with **more arguments**, which can simplify coding and make the class easier to read and to maintain.
