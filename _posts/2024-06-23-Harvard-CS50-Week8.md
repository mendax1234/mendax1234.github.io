---
layout: single
title:  "Harvard CS50 Week8 Review"
excerpt: Harvard CS50 Week8 Review
header:
  teaser: posts/Harvard_CS50.png
toc: true
tags:
  - C
  - Harvard-CS50
---

Welcome to CS50! This is my review for Week 8's content about HTML, CSS and Javascript.

# Lecture
Nothing much to note down since it's a really big topic. The best note from lecture is to practice I think.

# Section
1. CSS
    - The general structure
    ```css
    selector {
        property: value;
        property: value;
    }
    ```
    - The `id` selector
    ```css
    #id {
        property: value;
    }
    ```
        To use it, you need to specify the `id="id_name"` in the html code.
    - The `tag` selector
    ```css
    tag {
        property: value;
    }
    ```
    - The `class` selectr
    ```css
    .class {
        property: value;
    }
    ```
        To use it, you need to speficyf the `class="class_name"` in the html code.

# Shorts
## Internet Primer
1. **IP Address**: The IP address is to unqiuely identify your device. And the addressing scheme used by computers is known as IP addressing.
2. **DHCP**: Basically, the purpose of a DHCP server is to assign your device an IP address. Prior to the widespread promulgation of DHCP, the task of assigning IP addresses fell to a system administrator, who would need to manually assign such addresses.
3. **DNS**: The Domain Name System (DNS) exists to help us translate IP addresses to more memorable names that are more human-comprehensive.
4. **Access Points**: One of the ways we've dealt with IPv4 addressing problem is to start **assigning multiple devices to a single IP address**. This is done through the use of an access point. The IP address is assigned to a *router*, whose job is to act as a traffic cop that allows data requests from all of the devices on your local network (your home or business, e.g.) to be processed through a single IP address.

## Internet Protocol (IP)
The **Internet Protocol (IP)** enables networks to know how to communicate with one another. However, connecting one network with every other network is tedious. To solve this problem, **routers** come back into play. Now, each network was connected to a limited number of routers (each of which was connected to other nearby routers), and each router had instructions built into it on how to move information toward its destination.

<div style="text-align: center;">
    <img src="/images/posts/Internet-Protocol-(IP).jpg">
</div>

Notice that IP is also known as a *connectionless* protocol. There is not necessarily a **defined path** from the sender to the receiver, and vice versa.

## Transmission Control Protocol (TCP)
TCP can be thought of as directing the transmitted packet to the correct program on the receiving machine. TCP also **guarantees delivery** of packets, which IP alone does not do. TCP does this by including information about **how many** packets the receiver should expect to get, and **in what order**, and transmitting that information alongside the data.

## Hypertext Transfer Protocol (HTTP)
HTTP is an example of an *application layer* protocol, which specifically dictates the **format** by which clients <ins>request</ins> web pages from a server, and the format via which servers <ins>return</ins> information to clients. For example,

<div style="text-align: center;">
    <img src="/images/posts/HTTP-1.jpg">
</div>

<div style="text-align: center;">
    <img src="/images/posts/HTTP-2.jpg">
</div>

## HTML
1. HTML (Hypertext Markup Langugage) is a fundamental component of every website.
2. HTML is a language, but it is <ins>not</ins> a programming language. It lacks components of variables, logic, functions, and the like.
3. Rather, it is a **markup language**, using angle-bracket enclosed **tags** to semantically define the structure of a web page, causing the plain text inside of sets of **tags** to be interpreted by web browsers in different ways. So, **tags** is a very important concept in HTML.

## CSS
CSS (Cascading Style Sheets) is a language we use to **customize** our website's look and feel. See the notes from section to fully understand.

## JavaScript
1. Unlike HTMl and CSS, JavaScript is a programming language.
2. Loop in JavaScript
```javascript
    var wkArray = ['Monday', 'Tuesday', 'Wednestday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    // Iterate each element in the array
    for (var day of wkArray)
    {
        console.log(day);
    }
```
3. In JavaScript, there is a special concept called **Event**. It is a response to user interaction with the web page. JavaScript has support for *event handlers*, which are callback functions that respond to HTML events. For example, \
HTML File
```html
    <html>
        <head>
            <title>Event handlers</title>
        </head>
        <body>
            <button onclick="alertName(event)">Button 1</button>
            <button onclick="alertName(event)">Button 2</button>
```
JavaScript File
```javascript
    function alertName(event)
    {
        var trigger = event.srcElement;
        alert('You clicked on ' + trigger.innerHTML);
    }
```

## Document Object Model
1. What is a DOM (Document Object Model)
    As we've seen, JavaScript objects are incredibly flexible, and can contain various fields, even when those fields are other objects.
    The document object is one way of employing this paradigm, whereby that object organizes the entire content of a web page.
2. DOM properties

    | DOM Property | Description |
    |--------------|-------------|
    | innerHTML | Holds the HTML inside a set of HTML tags |
    | nodeName | The name of an HTML element or element's attribute |
    | id | The "id" attribute of an HTML element |
    | parentNode | A reference to the node one level up in the DOM |
    | childNodes | An array of references to the nodes one level down in the DOM |
    | attributes | An array of attributes of an HTML element |
    | style | An object encapsulating the CSS/HTML styling of an elemetn |

3. DOM Methods

    | DOM Method | Description |
    |------------|-------------|
    | getElementById(id) | Gets the element with a given ID below this point in the DOM |
    | getElementsByTagName(tag) | Gets all elements with the given tag below this point in the DOM |
    | appendchild(node) | Add the given node to the DOM below this point. |
    | removeChild(node) | Remove the specified child node from the DOM |

4. An JavaScript example containing DOM properties and DOM Methods
```javascript
    document.getElementById('colorDiv').style.backgroundColor = 'green';
```
