# OpenWhisk Actions and Node.js Actions

## About OpenWhisk Actions

Actions are stateless functions that run on the OpenWhisk platform. They can be used to respond to a variety of events, such as changes in a database, API calls, or even posting a tweet. An action can be created from a function programmed in a number of supported languages and runtimes, or from a binary-compatible executable, or even executables packaged as Docker containers [5](https://github.com/apache/openwhisk/blob/master/docs/actions.md).

The OpenWhisk CLI `wsk` makes it easy to create and invoke actions. While the actual function code will be specific to a language and runtime, the OpenWhisk operations to create, invoke, and manage an action are the same regardless of the implementation choice [5](https://github.com/apache/openwhisk/blob/master/docs/actions.md).

## Creating Node.js Actions

Node.js actions in OpenWhisk can be created using the `--kind` flag with a value of 'nodejs:18' or 'nodejs:20'. These environments come with pre-installed packages, including the `openwhisk` JavaScript client library for the OpenWhisk platform, which provides a wrapper around the OpenWhisk APIs [1](https://github.com/apache/openwhisk/blob/master/docs/actions-nodejs.md).

Here is a simple example of invoking a Node.js action:



```shell
#i invoke my registerUser action thats i provide in openwhisk repo
wsk -i action invoke user -P param.json --result
```

This command will produce the following output:



```
{
   "result": {
            "user": {
                "__v": 0,
                "_id": "658edf16adaf091f2c655322",
                "password": "12345678",
                "username": "test"
            }
        }
}
```

## Running Actions

To run an action, you can use the `wsk action invoke` command followed by the name of the action. Here is an example:



```shell
wsk action invoke /whisk.system/samples/helloWorld --param payload Bob
```

This command will invoke the `helloWorld` sample action with the parameter `payload` set to `Bob`. The output will be:



```shell
ok: invoked /whisk.system/samples/helloWorld with id 7331f9b9e2044d85afd219b12c0f1491
```

And you can view the output of the action by watching the activation logs:



```shell
wsk activation logs activationId
```

This command starts a polling loop that continuously checks for logs from activations [5](https://github.com/apache/openwhisk/blob/master/docs/actions.md).

## Packaging actions as Node.js modules with NPM libraries

Instead of writing all your action code in a single JavaScript source file, actions can be deployed from a zip file containing a [Node.js module](https://nodejs.org/docs/latest-v10.x/api/modules.html#modules_modules).

Archive zip files are extracted into the runtime environment and dynamically imported using `require()` during initialisation. **Actions packaged as a zip file MUST contain a valid package.json with a main field used to denote the module index file to return.**

Including a `node_modules` folder in the zip file means external NPM libraries can be used on the platform.

### Simple Example

- Create the following `package.json` file:

```json
{
  "name": "my-action",
  "main": "index.js",
  "dependencies" : {
    "left-pad" : "1.1.3"
  }
}
```



- Create the following `index.js` file:

```js
function myAction(args) {
    const leftPad = require("left-pad")
    const lines = args.lines || [];
    return { padded: lines.map(l => leftPad(l, 30, ".")) }
}

exports.main = myAction;
```



Functions are exported from a module by setting properties on the `exports` object. The `--main` property on the action can be used to configure the module function invoked by the platform (this defaults to `main`).

- Install module dependencies using NPM.

```shell
npm install
```



- Create a `.zip` archive containing all files (including all dependencies).

```shell
zip -r action.zip *
```



> Please note: Using the Windows Explorer action for creating the zip file will result in an incorrect structure. OpenWhisk zip actions must have `package.json` at the root of the zip, while Windows Explorer will put it inside a nested folder. The safest option is to use the command line `zip` command as shown above.

- Create the action from the zip file.

```shell
wsk action create packageAction --kind nodejs:20 action.zip
```



When creating an action from a `.zip` archive with the CLI tool, you must explicitly provide a value for the `--kind` flag by using `nodejs:18`, or `nodejs:20`.

- Invoke the action as normal.

```shell
wsk action invoke --result packageAction --param lines "[\"and now\", \"for something completely\", \"different\" ]"
```



```shell
{
    "padded": [
        ".......................and now",
        "......for something completely",
        ".....................different"
    ]
}
```

all commands to run my register user action:

```shell
git clone https://github.com/azita-abdollahi/openwhisk.git
cd openwhisk/src/services/user/actions/registerUser
zip -r registerUser.zip node_modules/ package-lock.json package.json ../../../../.env index.js ../../../../middleware/ ../../../../utils/ ../../model/  ./userCreate.schema.js
wsk -i action create user  registerUser.zip --kind nodejs:18 --web true  
wsk -i action invoke user -P param.json --result
#to delete action
wsk -i action delete user
#to see logs of action
wsk activation logs activationId
```

`NOTE`: change .env file to use your mongodb client information.

### **Reference**:

​	[openwhisk/docs/actions-nodejs.md at master · apache/openwhisk · GitHub](https://github.com/apache/openwhisk/blob/master/docs/actions-nodejs.md)


