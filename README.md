# arangodb-foxx-riotjs-sample

An experiment using ArangoDB / Foxx and RiotJS with brunch 

Demo at http://foxx.solisoft.net

The main goal is to offer a simple CRUD sample with form builder, form validations.

## Nginx configuration

To properly play with sessions, I had to mount the /_db/ folder in my app.

````
server {
  listen       8080;
  server_name  demo.dev;
  
  location / {
      root   /my/path/to/my/app/arangodb-foxx-riotjs-sample/pub    lic/;
      index  index.html index.htm;
  }

  location /_db {
          allow all;
          proxy_pass http://127.0.0.1:8529/_db;
  }
}
````

Then my Foxx apps are using the same domain as my app.

You need Nginx installed locally and point demo.dev to localhost using /etc/hosts

## Usage

* Fork/Clone the code
* run `npm install`
* run `brunch watch` (it will create a /public/ folder)
* open you folder to http://demo.dev:8080

The app entry point is : `/app/assets/index.html`

## Deploy

To create the `dist` folder run `brunch build --production` 
It will compact/uglify JS/CSS & HTML code


Enjoy.