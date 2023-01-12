# p2-iproject-server

Individual Project - Server

## Endpoints

List of Available Endpoints:

- `POST /register`
- `POST /Login`
- `POST /sign`
- `POST /today/todo`
- `POST /today/todo/:todoid/todolist`
- `PATCH /today/todo/:todoid/todolist:listid`
- `DELETE /today/todo/:todoid/todolist:listid`
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

### POST /today/Category

#### Descrption

add todo list

#### Request

- body

```json

{
    "statuscode": 200,
    "message": "category created",
    "data": {
        "id": Integer,
        "nameCategory": String,
        "updatedAt": Date,
        "createdAt": Date,
    }
}

```

###--belum selesai
