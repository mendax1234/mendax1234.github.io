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


