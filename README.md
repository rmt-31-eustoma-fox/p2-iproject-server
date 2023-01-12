# p2-iproject-server

Individual Project - Server

## Endpoints

List of Available Endpoints:

- `POST /register`
- `POST /Login`
- `POST /sign`
- `GET /today/`
- `POST /today/todo`
- `POST /today/todo/:todoid/todolist`
- `PATCH /today/todo/:todoid/todolist:listid`
- `DELETE /today/todo/:todoid/todolist:listid`
- `DELETE /today/todo/:todoid`
- `POST /today/category`
- `GET /today/category`
- `DELETE /today/category/:categoryid`
- `GET /today/todo/:todoid`
- `GET /today/todo/:todoid/todolist`
- `GET /today/geolocation`
- `GET /today/gempa`

### POST /register

#### Description

- Create new user

#### REQUEST

- Body

```json

    {
        "fullname": STRING,
        "email": STRING,
        "password": STRING,
        "image": STRING,
    }

```

#### Response

_201 - Created_

- Body

  ```json
  {
    "statuscode": 201,
    "id": 1,
    "name": String,
    "email": String,
  }
  ```

_400 - Bad Request_

```json
{
    "message": String

}

```

### POST /Login

#### Descriptions

- Api for access login

#### Request

- Body

```json
[
    {
        "email":String,
        "Password":String
    }
]

```

#### Response

- Body

```json
[
    {
    "statuscode": 201,
    "access_token": String,
    "image": String,
    "fullname": String
    }
]
```

### GET /Today

####
