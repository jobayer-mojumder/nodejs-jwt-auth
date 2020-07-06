# nodejs-jwt-auth
A fully functional rest api in node js and mysql with jwt authentication .


---
## Requirements

For development, you will only need Node.js and a node global package, npm, installed in your environement.


## Install

    $ git clone https://github.com/jobayermojumder/nodejs-jwt-auth.git
    $ cd nodejs-jwt-auth
    $ npm install

## Configure app

create .env file and copy all the configuration from .env.example. After that configure .env file with your database connection and jwt secret key.

    $ cp .env.example .env

Import table.sql to your mysql database.

## Running the project

    $ npm start

## Simple build for production

    $ npm build
