---
layout: single
title:  "Guide to install Java SE 8"
excerpt: Java 8 Installation Guide
header:
  teaser: posts/Java_Logo.png
toc: true
tags:
  - Java
  - Environment-Setup
---
# Windows
## Install JDK and JRE
1. Download the corresponding installer from [oracle](https://www.oracle.com/java/technologies/downloads/#java8-windows).

    <div style="text-align: center;">
        <img src="/images/posts/Java_Install_Windows.png">
    </div>

2. Execute Installer to install. Quite easy. Note that the installer will install both the JDK and the corresponding JRE.

## Set Path
1. Update the environment variables `PATH`. For me I just need to add `C:\Program Files\Java\jdk-1.8\bin` to my User variable.

# Ubuntu
## Install JDK and JRE
### JDK
1. Download the corresponding file from [oracle](https://www.oracle.com/java/technologies/downloads/#java8-linux). For Ubuntu users, please download the "Compressed Archive" File.

    <div style="text-align: center;">
        <img src="/images/posts/Java_Install_Ubuntu.png">
    </div>

2. Uncompress the `.tar.gz` using command `tar zxvf your-name.tar.gz`. Then move all the file to a new installation directory if you like. For me, it's `/usr/lib/jvm/jdk-1.8-oracle-x64`.

### JRE
1. Download the corresponding "Compressed Archive" file from [oracle](https://www.oracle.com/java/technologies/downloads/#java8-linux).

    <div style="text-align: center;">
        <img src="/images/posts/JRE_Install_Ubuntu.png">
    </div>

2. Uncompress the file and move it to the installation directory. For me it's `/usr/lib/jvm/jre-1.8-oracle-x64`

Note that `x64` can be replaced to your architecture.

## Set Path
1. Add this line to your `~/.bashrc` (Note to change the directory to yours) \
    ```bash
    export PATH=/usr/lib/jvm/JDK-directory/bin:$PATH
    ```

2. Reload using `source ~/.bashrc`

# References
1. <a href='https://docs.oracle.com/javase/8/docs/technotes/guides/install/install_overview.html#A1097144' style='word-wrap: break-word;'>https://docs.oracle.com/javase/8/docs/technotes/guides/install/install_overview.html#A1097144</a>
2. <a href='https://docs.oracle.com/cd/E19215-01/820-2215/6ndr6ai1m/index.html' style='word-wrap: break-word;'>https://docs.oracle.com/cd/E19215-01/820-2215/6ndr6ai1m/index.html</a>
3. <a href='https://media.pearsoncmg.com/ph/esm/ecs_liang_ijp_11/cw/content/supplements/Supplement1bInstallingJDK8.pdf' style='word-wrap: break-word;'>https://media.pearsoncmg.com/ph/esm/ecs_liang_ijp_11/cw/content/supplements/Supplement1bInstallingJDK8.pdf</a>
