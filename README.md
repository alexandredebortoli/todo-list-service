
# NestJS To-Do List

Back-end project for a to-do list application. 
The two main structures are: todo-list-bff and todo-list-service,
where bff is the back-end structure for the front-end interface and
the service is the back-end for the database. These two will communicate
with each other using gRPC.




## Authors

- [@alexandredebortoli](https://www.github.com/alexandredebortoli)
- [@victor-azevedo](https://github.com/victor-azevedo)




## Running the app

Clone the project

```bash
$ git clone https://github.com/alexandredebortoli/todo-list-service.git
```

Access the project directory

```bash
$ cd my-project
```

Install dependencies

```bash
$ yarn install
```

Start the server

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```


## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```
## Reference

 - [NestJS Documentation](https://docs.nestjs.com/)
