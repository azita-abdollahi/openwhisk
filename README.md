## what is openwhisk?

Apache OpenWhisk is an open-source, distributed Serverless platform that executes functions (also known as actions) in response to events at any scale. OpenWhisk manages the infrastructure, servers, and scaling using Docker containers, allowing developers to focus on building efficient and innovative applications [2](https://openwhisk.apache.org/).

OpenWhisk operates as an event-driven compute platform, often referred to as Serverless computing or Function as a Service (FaaS). It runs code in response to events or direct invocations. Examples of events include changes to database records, IoT sensor readings that exceed a certain threshold, new code commits to a GitHub repository, or simple HTTP requests from web or mobile apps. Events from both external and internal sources are directed through a trigger, and rules enable actions to respond to these events [0](https://github.com/apache/openwhisk/blob/master/docs/about.md).

Actions in OpenWhisk can be small snippets of code written in various languages such as JavaScript and Swift, or custom binary code embedded in a Docker container. Actions are instantly deployed and executed whenever a trigger fires. The more triggers fire, the more actions get invoked. If no trigger fires, no action code is running, eliminating costs [0](https://github.com/apache/openwhisk/blob/master/docs/about.md).

OpenWhisk also supports chaining of actions without writing any additional code. Each action in the chain is invoked in sequence, with the output of one action passed as input to the next. This feature allows developers to create complex workflows by simply chaining actions together [0](https://github.com/apache/openwhisk/blob/master/docs/about.md).

Moreover, OpenWhisk stands on the shoulders of giants, including Nginx, Kafka, Docker, and CouchDB. These components come together to form a "serverless event-based programming service." The system primarily consists of two custom components, the Controller and the Invoker, with everything else being contributed by the open-source community [0](https://github.com/apache/openwhisk/blob/master/docs/about.md).

Finally, OpenWhisk offers a rich programming model for creating serverless APIs from functions, composing functions into serverless workflows, and connecting events to functions using rules and triggers. It also integrates easily with many popular services using Packages, which are provided either as independently developed projects under the OpenWhisk family or as part of the default Catalog [2](https://openwhisk.apache.org/).

for getting start with openwhisk read docs.
