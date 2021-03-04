# DummyAPIKong
Dummy API Untuk HandsOn Kong API

1. npm -i
2. node index.js


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

