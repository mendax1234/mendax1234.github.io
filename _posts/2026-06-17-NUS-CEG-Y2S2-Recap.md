---
layout: single
title:  "NUS Computer Engineering Y2S2 Recap"
excerpt: NUS Computer Engineering Y2S2 Recap
header:
  teaser: posts/NUS_SOC.jpg
tags:
  - NUS
---

{% include toc %}

> We need more people like you.

This was what a principal research engineer from DSO, Singapore, told me after I presented two of my projects with my teammates at the NUS ExCEllence 2026 project showcase. At that moment, I was honestly stunned. It was not only because the sentence itself was encouraging, but also because it seemed to affirm something much deeper: that the things we had been building, exploring, struggling with, and connecting throughout the semester had somehow become visible to someone outside the classroom. Now, looking back, one of my group members is working at DSO, and the other is working at a famous international chip design company. That sentence has stayed with me ever since.

Later, the same pricipal research engineert from DSO asked me another question:

> Where do you learn all this from ?

I think this question came from the way our project connected ideas from several different fields and turned them into something coherent and, in his words, impressive. But beyond the project itself, the question pushed me to think about something more personal: where did I really learn everything I learned this semester? Was it from lectures? Textbooks? Projects? Conversations? Teamwork? Or from the many moments when different ideas, originally belonging to different courses or even different disciplines, suddenly clicked together?

This question also shaped the way I want to structure this recap. Instead of simply listing what I did in Year 2 Sem 2, I want to write about the different "teachers" I encountered along the way. Some of them were professors. Some were courses. Some were projects. Some were teammates. Some were books. And some were simply the difficult questions that forced me to think more deeply.

# Profs from NUS ECE

This semester, I had the chance to take two truly amazing courses from NUS ECE: EE4218 Embedded Hardware System Design and EE4415 Integrated Digital Design. Together with CG3207, which I took last semester, these courses formed a very meaningful trilogy for me. As Prof. Rajesh once told me during a post-lecture Q&A, there are deep connections among these courses, even though each of them looks at hardware systems from a different angle. CG3207 taught me to think in terms of processors and instructions. EE4218 shifted my attention to embedded hardware systems and AI accelerators design. EE4415 then brought me deeper into digital design, power, performance, area and eventually the broader philosophy of integrated system design.

What made these courses even more special was not only the content, but also the professors behind them. I feel very grateful that I had many opportunities to speak with Prof. Rajesh, Prof. Massimo, and Prof. Kelvin after lectures. Those conversations were sometimes short, sometimes technical, sometimes philosophical, but they all left a mark on the way I think about hardware, research, and learning.

## EE4218

EE4218 was taught by Prof. Rajesh, the same professor who taught me CG3207 last semester. To me, Prof. Rajesh is one of the kindest and most patient professors I have met at NUS. I still remember many post-lecture Q&A sessions where he carefully answered all kinds of questions from me, ranging from course content to textbook recommendations to broader industry trends in hardware design. What I really appreciate about him is his ability to explain complex concepts clearly and calmly. Topics such as clock domain crossing (CDC), which can easily feel abstract and intimidating, became much more understandable through his explanations.

More importantly, one sentence from Prof. Rajesh revealed the deep connection between CG3207 and EE4218. He told us that in CG3207, we think in terms of instructions -- we fetch, decode, and execute them to manipulate data. In EE4218, however, the focus shifts to the data itself: we fetch and process data directly, without relying on the instruction-decoding abstraction of a CPU. I would say honestly this is one of the inspirations for our VNN project in EE4218!

## EE4415

EE4415 was another course that deeply influenced me this semester. It was taught by two professors, Prof. Massimo and Prof. Kelvin, both of whom shaped my thinking in very different but equally meaningful ways.

### Prof. Massimo

When talking about Prof. Massimo, I think there is no doubt that he is one of the most respected professors in digital design at NUS ECE. His research experience and achievements in chip design are extremely impressive, and this also made his lectures feel very different. They were not just about teaching textbook knowledge; they carried the weight of decades of real research experience (he told us that some techniques that are covered in EE4415 actually come from his Green-IC group)!

At the same time, Prof. Massimo was probably also the busiest professor I have ever met. It was not always easy to find time to talk to him. I still remember one midterm review Q&A session where the EE2026 and EE4415 Q&A sessions were combined, and he also had meetings with people from industry. What was originally supposed to be a one-hour session eventually became around three hours. Oof, but this also taught me something. Because time with him was limited, I had to think much more carefully about what questions were truly worth asking. I had to refine my questions, identify what I really did not understand, and make the limited discussion time count.

Among the questions I asked him, one answer inspired me a lot. At that time, I was thinking about a system where the loop bound became the bottleneck (At that time, I had not yet learned time interleaving, which can be understood as trading register area for better performance and can be a solutoin to loop bound). I asked Prof. Massimo how we might solve this kind of bottleneck. Instead of answering only from the perspective of digital circuit design, he immediately pointed me to loop unrolling, a mature technique from compiler design. In essence, loop unrolling also trades area for performance.

This idea resonated strongly with me. It also connected back to something Prof. Massimo said during the very first lecture of EE4415. At the beginning of the course, he asked how many of us still read books, whether physical books or PDFs. I still remember that only a handful of people raised their hands. As someone who has loved reading textbooks since entering university, and who also enjoyed reading famous books even before university, I strongly agreed with him. In an age where information is fragmented, fast, and increasingly mediated by AI, there is still something irreplaceable about slowing down and reading a classic textbook carefully. A good textbook does not only give answers. It builds a structure in your mind. It teaches you how experts in a field organize ideas, define abstractions, and reason from first principles.

These inspirations from Prof. Massimo, together with Prof. Rajesh's distinction between instruction-centric and data-centric thinking, became deeply connected in my mind. They helped me lead our team to develop VNN (Verilog Neural Network), a high-performance and energy-efficient RTL framework for writing a CNN accelerator. To me, VNN was not just a course project. It was a concrete embodiment of many ideas I had encountered across CG3207, EE4218, and EE4415.

> Pic of ExECEllence showcase here

This experience also shaped my current research interests. I increasingly believe that many breakthroughs happen at the intersection of fields, where elegant techniques or design principles from one domain can be adapted to solve problems in another. This is why I want to keep connecting ideas across electronics, computer science, mathematics, physics, geography, and even music. I do not want my learning to be limited by the boundaries of one department or one discipline. In fact, one of my personal goals during university is to try at least one meaningful, high-quality course from each faculty at NUS.

### Prof. Kelvin

The second half of EE4415 was taught by Prof. Kelvin, another very kind and inspiring professor from NUS ECE. From his lectures, I could really feel his strength in transistor-level digital circuit design. I still remember him mentioning several times his experience at AMD in the US, especially how AMD pushed CPU performance through careful design-side optimization. One point that impressed me was his discussion of how AMD can can optimize netlists across the boundaries created during the initial system partitioning of a design.

The most memorable conversation I had with Prof. Kelvin was near the end of the semester, when several CEG students and I discussed AI tools in ASIC design with him. I am not entirely sure whether my understanding is fully correct, but what I took away from the conversation was this: for AI to truly help us in engineering design, it must understand the "language" we use to communicate our intentions.

This "language" does not only mean English or any spoken language. In ASIC design, language can refer to Verilog, timing constraints, circuit schematics, microarchitectural diagrams, EDA tool commands, design abstractions, and even the implicit conventions that designers use when they think about circuits. One powerful point Prof. Kelvin mentioned was that AI tools may sometimes find connections or possibilities that humans overlook. To me, this suggests that the future of AI in chip design depends not only on making models more powerful, but also on allowing them to communicate more accurately with the design process itself.

This made me think about modern EDA tools such as Cadence, whose learning curve can feel extremely steep (personally speaking). Perhaps in the future, AI agents will be able to operate these tools on our laptops with high precision. We may only need to give a high-level command, and as long as the agent understands how to "communicate" with the software and the design environment, it can carry out the required steps accurately.

But this also raises a deeper question: how should human ASIC designers communicate their microarchitectural thoughts to AI agents? If future chip design involves collaboration between humans and AI, then we may need better abstractions for describing circuits. These abstractions should be expressive enough for humans to reason with, and structured enough for AI agents to understand then manipulate. I think such ideas may already exist in some form. For example, from Giovanni's textbook, I have seen how powerful abstractions can guide circuit design. Perhaps one research direction for next-generation AI agents in chip design is to study how these abstractions can become a shared language between human designers, EDA tools, and AI systems.

At the end of this section, I also want to return to something Prof. Massimo said about AI. I remember hearing him tell another student that, as NUS students, we should learn how to use AI wisely to boost the efficiecny of our work. From what I heard, Prof. Massimo uses AI mainly to quickly understand knowledge from fields he is less familiar with, such as semiconductor materials. However, he strongly encouraged us not to use AI to replace the thinking process itself. For certain questions, we must still derive the whole process by ourselves at least once, so that we truly understand what is going on.

I think this is especially important now, when AI is developing so quickly that nobody can be completely sure how it will reshape our future work. But one thing I still remember clearly is Prof. Massimo's message from the beginning of EE4415: *keep learning*. I strongly agree with him. To me, continuous learning is not only a way to do better research, but also a way to remain intellectually alive. It is one way how we can avoid being outperformed by AI, not by competing with it on memorization or speed, but by deepening our ability to think, connect, question, and create.
