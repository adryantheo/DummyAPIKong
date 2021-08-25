# DummyAPIKong
Dummy API Untuk HandsOn Kong API

1. npm -i
2. node index.js

# Postman Collections
> https://www.getpostman.com/collections/553a8e2e7bb7fab7aa1e

# Kong-Tutorial

Documentation from 
> https://docs.konghq.com/gateway-oss/

## Installation

#### Initiate Network
> docker network create kong-net

#### Start your Database
> docker run -d --name kong-database --network=kong-net -p 5432:5432 -e "POSTGRES_USER=kong" -e "POSTGRES_DB=kong" -e "POSTGRES_PASSWORD=kong" postgres:9.6

#### Prepare your database to migrate configurations
> docker run --rm --network=kong-net -e "KONG_DATABASE=postgres" -e "KONG_PG_HOST=kong-database" -e "KONG_PG_USER=kong" -e "KONG_PG_PASSWORD=kong" kong:latest kong migrations bootstrap

#### Start Kong
> docker run -d --name kong --network=kong-net -e "KONG_DATABASE=postgres" -e "KONG_PG_HOST=kong-database" -e "KONG_PG_USER=kong" -e "KONG_PG_PASSWORD=kong" -e "KONG_PROXY_ACCESS_LOG=/dev/stdout" -e "KONG_ADMIN_ACCESS_LOG=/dev/stdout" -e "KONG_PROXY_ERROR_LOG=/dev/stderr" -e "KONG_ADMIN_ERROR_LOG=/dev/stderr" -e "KONG_ADMIN_LISTEN=0.0.0.0:8001, 0.0.0.0:8444 ssl" -p 8000:8000 -p 8443:8443 -p 8001:8001 -p 8444:8444 kong:latest

#### Test Kong Admin API
> POST localhost:8001

## Prepare the API

#### Clone API from repository
> git clone https://github.com/adryantheo/DummyAPIKong.git

#### Build Docker Image
> docker build -t dummy-api .

#### Run Docker Container
> docker run -d -p 3000:3000 dummy-api

#### Test API
> GET localhost:3000

## Register API to Kong API Gateway

#### Create a service to API
> POST localhost:8001/services
```
{
    "name": "dummy-api",
    "url": "http://10.163.205.115:3000"
}
```

#### Checking a service is ready.
> GET localhost:8001/services

#### Registering a route to access the API through service.
> POST localhost:8001/services/dummy-api/routes
```
{
    "name": "alternate",
    "paths": ["/apidummy"]
}
```

#### Checking a route is exists.
> GET localhost:8001/services/dummy-api/routes

#### Test API is enable to access through Kong API Gateway
> GET localhost:8000/apidummy

## Utiize Plugin

#### Add an Anonymous Consumer 
> POST localhost:8001/consumers
```
{
    "username": "anon"
}
```

#### Add a Consumer 
> POST localhost:8001/consumers
```
{
    "username": "betavianb"
}
```

#### Enable Key-Authentication Plugin on Service
> POST localhost:8001/services/dummy-api/plugins
```
{
    "name": "key-auth",
    "config.key_names": "key"
}
```

#### Consumer Request Key 
> POST localhost:8001/consumers/betavianb/key-auth
##### Fetch the key given for authentication
```
{
    "consumer": { "id": "876bf719-8f18-4ce5-cc9f-5b5af6c36007" },
    "created_at": 1443371053000,
    "id": "62a7d3b7-b995-49f9-c9c8-bac4d781fb59",
    "key": "62eb165c070a41d5c1b58d9d3d725ca1"
}
```

### Call the API 
> GET localhost:8000/apidummy

### Use the Key given to get authentication
> GET localhost:8000/apidummy

> HEADER "key": "62eb165c070a41d5c1b58d9d3d725ca1"






