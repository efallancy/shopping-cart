# Shopping Cart Checkout

Simple cart checkout implementation with pre-defined rules.

## Getting started

Simple cart checkout implementation is done with TypeScript and Node.js.

It assumes that [Yarn](https://classic.yarnpkg.com/lang/en/) and [Node.js](https://nodejs.org/en/) has already been installed.

To install all the dependencies, run the following command:

```sh
yarn install
```

A sample of how to use the interface or executing the code can be done, either by peeking into the `src/index.ts` to see how it is being implemented or alternatively run the following command below.

```sh
yarn dev
```

Running the command to execute the code shall run with a sample scenario.

## Test

The tests can be executed by running the following command:

```sh
yarn test
```

## Compilation

To run the code in compiled mode, run the following command:

```sh
# Firstly, run the build command to compile the TypeScript file necessary
# for execution into JavaScript file in order to get it running in Node.
#
# Output of the compilation can then be found in "dist" folder.

yarn build && node dist/index.js

```

