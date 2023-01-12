# Newkey Customer API Documentation

## Endpoints :

List of available endpoints:

- `POST /Users/register`
- `POST /Users/google/sign-in`
- `POST /Users/login`
- `GET /rooms/getroom`
- `POST /translate`
- `GET /animals/dog`


&nbsp;

## 1. POST /users/register

Request:

- body:

```json
{
  "userName": "string",
  "email": "string",
  "password": "string",
}
```

_Response (201 - Created)_

```json
{
    "message": "Success create new user with id: 1 and email admin1@gmail.com",
    "showUser": {
        "id": 1,
        "email": "admin1@gmail.com"
    }
}
```

_Response (400 - Bad Request)_

```json

{
  "message": "Email is required"
}
OR
{
  "message": "Email must be unique"
}
OR
{
  "message": "please input the correct email"
}
OR
{
  "message": "password is required"
}
```

&nbsp;

## POST /google/sign-in
#### Description

- sign up and sign in via googleLogin

Request:

- payload:

```json
json
{
  "email": "string",
}
```

_Response (201 - created)_

```json
{
  "showUser": {
    "id": 15,
    "email": "melissamey2712@gmail.com"
  }
}
```

_Response (200 - OK)_

```json
{
  "id": "1",
  "email": "melissamey2712@gmail.com"
}
```

&nbsp;

## 3. POST /users/login

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjczNDk4OTUyfQ.6yXZ_8LXSq9qTuiloJI_KrchYW4-MPGzlZ_J6Dvm8Og",
    "username": "admin1",
    "isSubscribed": false
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Password is required"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Incorrect email or password"
}
```

&nbsp;

##  GET /rooms/getroom

#### Description

- Get all the Room


#### Response

_200 - OK_

- Body

```json
[
    {
        "id": 1,
        "name": "Get-Friends",
        "createdAt": "2022-12-11T17:12:12.000Z",
        "updatedAt": "2022-12-11T17:12:12.000Z"
    },
    {
        "id": 2,
        "name": "Animals-Dog",
        "createdAt": "2022-12-11T17:12:12.000Z",
        "updatedAt": "2022-12-11T17:12:12.000Z"
    }
]
```

&nbsp;


##  GET /animals/dog

#### Description

- Get all the Room


#### Response

_200 - OK_

- Body

```json
{
    "message": "Dogs who have been spayed or neutered live longer than intact dogs."
}
```
&nbsp;

##  POST /translate

#### Description

- Translate 

Request:

- body:

```json
{
  "text": "string",
}
```


#### Response

_200 - OK_

- Body

```json
{
    "message": "Dogs who have been spayed or neutered live longer than intact dogs."
}
```

&nbsp;

&nbsp;

##  PATCH /users/subscription

#### Description

- Change Status Subscription


#### Response

_200 - OK_

- Body

```json
{
    "message": "User with id: 1 now is a subscriber"
}
```

&nbsp;

##  POST /users/generate-midtrans-token

#### Description

- Change Status Subscription


#### Response

_200 - OK_

- Body

```json
{
    "message": "User with id: 1 now is a subscriber"
}
```

&nbsp;

## Global Error

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```