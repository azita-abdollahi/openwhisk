# OpenWhisk Standalone Server

OpenWhisk Standalone Server is designed to facilitate local development and testing. It operates as a standard Java application and can be launched from the command line.

## Getting Started

Firstly, clone the OpenWhisk GitHub repository:



```shell
git clone https://github.com/apache/openwhisk/tree/master
```

Then, execute the OpenWhisk standalone server:



```shell
java -jar openwhisk-standalone.jar
```

Upon successful execution, the server starts on port 3233 by default and initiates a Playground UI on port 3232.

## Using the Playground UI

[![Playground UI](https://github.com/apache/openwhisk/raw/master/docs/images/playground-ui.png)

The Playground UI allows you to experiment with simple actions. For comprehensive usage of all OpenWhisk features, [configure the CLI](https://github.com/apache/openwhisk/blob/master/docs/cli.md) and explore the [sample actions](https://github.com/apache/openwhisk/blob/master/docs/samples.md).

## Key Points

- This server uses an in-memory store. Therefore, any changes made will be lost once the server stops.
- By default, it bootstraps the `guest` and `whisk.system` with default keys.
- It supports running on MacOS, Linux, and Windows (experimentally).
- It can be customized to use any other storage like CouchDB.

## Building the Standalone Server

To build the standalone server, use the following command:



```shell
$ ./gradlew :core:standalone:build
```

This will generate the runnable JAR file in the `bin/` directory. If you wish to run the server immediately, use the following command:



```shell
$ ./gradlew :core:standalone:bootRun
```

## **To run it with the Java command directly:**

check if Java is already installed:

```bash
java -version
```

If Java is not currently installed, you’ll see the following output:

```
OutputCommand 'java' not found, but can be installed with:

sudo apt install openjdk-11-jre-headless  # version 11.0.11+9-0ubuntu2~20.04, or
sudo apt install default-jre              # version 2:1.11-72
sudo apt install openjdk-13-jre-headless  # version 13.0.7+5-0ubuntu1~20.04
sudo apt install openjdk-16-jre-headless  # version 16.0.1+9-1~20.04
sudo apt install openjdk-8-jre-headless   # version 8u292-b10-0ubuntu1~20.04
```

To install java, first update the package index:

```bash
sudo apt update
```

Next, Execute the following command to install the default Java Runtime Environment (JRE), which will install the JRE from OpenJDK 11:

```bash
sudo apt install default-jre
```

The JRE will allow you to run almost all Java software.

Verify the installation with:

```bash
java -version
```

You’ll see output similar to the following:

```
Outputopenjdk version "11.0.11" 2021-04-20
OpenJDK Runtime Environment (build 11.0.11+9-Ubuntu-0ubuntu2.20.04)
OpenJDK 64-Bit Server VM (build 11.0.11+9-Ubuntu-0ubuntu2.20.04, mixed mode, sharing))
```

next,

```shell
java -jar bin/openwhisk-standalone.jar 
java -jar bin/openwhisk-standalone.jar --all #all feature(kafka-user-events-...)
```

Check if port 3233 is being used by another process:



```shell
ss -ntpl 
```

Copy `/usr/local/bin` to `opewhisk/bin`, set the API host, and authenticate:



```shell
./bin/wsk property set --auth `cat ansible/files/auth.guest`
./bin/wsk property set --apihost <openwhisk_baseurl>
```

In the `.bashrc` file, set this alias:



```shell
alias wsk='./bin/wsk'
source .bashrc
```

## Implementing Standalone OpenWhisk via Bash

Install the OpenWhisk CLI (`wsk`):



```shell
#install wsk-cli
wget -q https://github.com/apache/openwhisk-cli/releases/download/latest/OpenWhisk_CLI-latest-linux-amd64.tgz && \
sudo tar xzf OpenWhisk_CLI-latest-linux-amd64.tgz -C /usr/local/bin wsk && \
rm OpenWhisk_CLI-latest-linux-amd64.tgz
```

Next, install OpenWhisk:



```shell
#install openwhisk 
bash <(curl -sL https://s.apache.org/openwhisk.sh) &&
 AUTH=$(docker exec openwhisk wsk property get --auth | awk '{print $3}')&& wsk property set --auth $AUTH --apihost http://localhost:3233
```

I recommended to use bash for deploy openwhisk (its so simple) 

`NOTE`: for use openwhisk with bash need docker, be sure first docker is install on your system.

## References

- [openwhisk/core/standalone/README.md at master · apache/openwhisk · GitHub](https://github.com/apache/openwhisk/blob/master/core/standalone/README.md)
- [OpenWhisk CLI](https://github.com/apache/openwhisk/blob/master/docs/cli.md)
