# Functional demo using Feathers.js - GraphQL and Apollo  

This project uses [Feathers](http://feathersjs.com), [GraphQL](http://graphql.org/), and [Apollo](https://www.apollographql.com/). 

## Setup development environment  

Getting up and running is as easy as 1, 2, 3.

1. Make sure you have [NodeJS](https://nodejs.org/), [npm](https://www.npmjs.com/), and [Yarn](https://yarnpkg.com) installed, _see [package.json](package.json) for the required versions._ 

2. Install your dependencies

    ```
    cd path/to/using-feathers-apollo-graphql; yarn
    ```

3. Start your app

    ```
    yarn start
    ```

Calling [/graphiql](http://localhost:3030/graphiql) of your dev instance will show you the in-browser IDE for exploring GraphQL.  

This project uses [Feathers](http://feathersjs.com), an open source web framework for building modern real-time applications. 
Feathers has a powerful command line interface. Please read thru [Feathers docs](https://docs.feathersjs.com/).  
Here are a few things it can do:  

```
$ yarn global add @feathersjs/cli             # Install Feathers CLI v3.x  

$ feathers generate service               # Generate a new Service
$ feathers generate hook                  # Generate a new Hook
$ feathers generate model                 # Generate a new Model
$ feathers help                           # Show all commands
```


## License

Copyleft 2017-2018

Licensed under the [MIT license](LICENSE).
