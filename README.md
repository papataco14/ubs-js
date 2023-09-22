# nodejs-template

A barebones Node.js app using [Express 4](http://expressjs.com/).

This application supports the [Getting Started on Heroku with Node.js](https://devcenter.heroku.com/articles/getting-started-with-nodejs) article - check it out.

These instruction are to help you solve a test challenge "Calculate Square".

## Calculate Square

### Instructions

This challenge requires you to return the squared of two numbers given an itput.

### Endpoint
Create an endpoint `/square` that accepts a JSON payload over `POST` described below.

### Input

Example:
`{ "input": 5 }`

### Output

Example:
`25`

## Running Locally

Make sure you have [Node.js](http://nodejs.org/) installed. 

```sh
$ git clone https://gitlab.com/ubs-coding-challenge-templates/node-js-template.git # or clone your own fork
$ cd node-js-template
$ npm install
$ npm start
```

Your app should now be running on [localhost:5000](http://localhost:5000/).

If you run the following `curl` command to send a request to your app, you should be able to see in your logs something like the example below.

```sh
$ curl -d '{ "input": 2 }' -H 'Content-Type: application/json' http://localhost:5000/square
```

```
Request: POST /square at ...
Request Body:
{
	"input": 2
}
Response Body:
4
Response: 200 0.275 ms 
```
