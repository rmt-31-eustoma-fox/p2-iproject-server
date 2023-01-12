# p2-iproject-server

Individual Project - Server

## Endpoints

List of Available Endpoints:

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
- _201-ok_

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

### GET /today/

Get all list todo

#### Request

- Header

```json
{
    "access_token": String
}
```

#### Response

- body
  _200-OK_

```json
{
    "statuscode": 200,
    "data": String
}

```

### Post /today/todo

- Add todo list

#### Request

- Header

```json
{
    "access_token": String
}
```

- Body

```json

{
    "nameTodo": String,
    "dateEnd" : String,
    "CategoryId": Integer,
    "level": String
}
```

#### Response

- Body
  _201-Created_

```json
{
    "statuscode": 200,
    "message": "todo success create",
    "data": {
        "id": Integer,
        "nameTodo": String,
        "dateStart": Date,
        "dateEnd": Date,
        "CategoryId": Integer,
        "UserId": Integer,
        "level": String,
        "statusTodo": String,
        "updatedAt": Date,
        "createdAt": Date
    }
}
```

- Body

_400-Bad Request_

```json
{
  "message": String
}
```

### Post /today/category

#### Description

- Add Categories

#### Request

- Header

```json
{
    "access_token": String
}
```

- Body

```json
[
    {
    "nameCategory": String
    }
]
```

#### Response

- Body

_201-OK_

```json
{
    "statuscode": 200,
    "message": "category created",
    "data": {
        "id": Integer,
        "nameCategory": String,
        "updatedAt": Date,
        "createdAt": Date
    }
}
```

- Body

_400-Bad Request_

```json
{
  "message": "category is require"
}
```

### POST /today/todo/:todoid/todolist

#### Description

- Add list in Todo

#### Request

- Header

```json
{
    "access_token": String
}
```

- Body

```json
{
    "nameList" : String
}
```

#### Response

- Body
  _200 - Ok_

```json
{
    "statuscode": 200,
    "message": "todolist created success",
    "data": {
        "id": Integer,
        "nameList": String,
        "TodoId": Integer,
        "UserId": Integer,
        "status": "uncomplete",
        "updatedAt": Date,
        "createdAt": Date
    }
}
```

_400 - Bad Request_

```json
{
  "message": "namelist is require"
}
```

# PATCH /today/todo/:todoid/todolist/:listid

#### Descriptions

- For update status todo from uncomplete to complete

#### Request

- Header

```json
{
    "access_token": String
}
```

- Params

```json
{
 "listid" : Integer
}
```

### Response

- Body

```json
{
  "statuscode": 201,
  "message": "success update"
}
```

### DELETE /todo/:todoid/todolist/:listid

#### Description

- Delete data list from Parent Todo

#### Request

- Header

```json
{
    "access_token": String
}
```

- Params

```json
{
 "listid" : Integer
}
```

### Resoponse

- Body
  _200 - Ok_

```json
{
  "statuscode": 200,
  "message": "success delete list"
}
```

_404 - not found_

```json
{
  "statuscode": 200,
  "message": "Not Found"
}
```

### Delete /today/todo/:todoid

#### Descriptions

- Delete Todo

#### Request

- Header

```json
{
    "access_token": String
}
```

- Params

```json
{
 "todoid" : Integer
}
```

#### Response

- Body
  _200 - ok_

```json
{
  "statuscode": 200,
  "message": "success delete todo"
}
```

_400 bad Request_

```json
{
  "message": "data not found"
}
```

### GET /today/category

#### Description

- get all Category in list

#### Request

- Header

```json
{
    "access_token": String
}
```

#### Response

- Body

```json
{
    "statuscode": 200,
    "data": [
        {
            "id": Integer,
            "nameCategory": String,
            "createdAt": Date,
            "updatedAt": Date
        }
        ...
    ]
}
```

### DELETE /today/category/:categoryid

#### Description

- for delete category

#### Request

- Header

```json
{
    "access_token": String
}
```

- Params

```json
{
 "CategoryId" : Integer
}
```

#### Response

- Body
  _201 - created_

```json
{
  "statuscode": 201,
  "message": "success delete category"
}
```

_404 not found_

```json
{
  "message": "data not found"
}
```

### GET /today/todo/:todoid

#### Description

- Get todo by id and children list

#### Request

- Header

```json
{
    "access_token": String
}
```

#### Response

- Body
  _200 - OK_

```json
{
    "statuscode": 200,
    "data": [
        {
            "id": Integer,
            "nameTodo": String,
            "dateStart": Date,
            "dateEnd":Date,
            "CategoryId": Integer,
            "UserId": Integer,
            "level": String,
            "statusTodo": String,
            "createdAt": Date,
            "updatedAt": Date,
            "Todolists": [
                {
                    "id": Integer,
                    "nameList": String,
                    "TodoId": Integer,
                    "UserId": Integer,
                    "status": "uncomplete",
                    "createdAt":Date,
                    "updatedAt": Date
                },...
            ]
        }
    ]
}
```

_404 not found_

```json
{
  "message": "data not found"
}
```

### GET /today/todo/:todoid/todolist

#### Descriptiom

- Get all list by todo Id

#### Request

- Header

```json
{
    "access_token": String
}
```

- Params

```json
{
    "todoid" : Integer
}
```

#### Response

- Body
  _200 - OK_

  ```json
  {
    "statuscode": 200,
    "data": [
      {
        "id": Integer,
        "nameList": String,
        "TodoId": Integer,
        "UserId": Integer,
        "status": String,
        "createdAt": Date,
        "updatedAt": Date,
        "Todo": {
          "id": Integer,
          "nameTodo": String,
          "dateStart": String,
          "dateEnd": String,
          "CategoryId": Integer,
          "level": String,
          "statusTodo": String,
          "createdAt": Date,
          "updatedAt": Date
        }
      }
    ]
  }
  ```

  _404 not Found_

````json
 {
   "message": "data not found"
   }
   ```
````

### GET /today/gempa

#### Description

- info eartquake terUpdate

#### Request

- Header

```json
{
    "access_token": String
}
```

#### Response

- body

```json
{
    "data": {
        "Infogempa": {
            "gempa": {
                "Tanggal":Date,
                "DateTime":Date,
                "Coordinates": String,
                "Lintang": String,
                "Bujur": Sting,
                "Magnitude": String,
                "Kedalaman": String,
                "Wilayah": String,
                "Potensi": String,
                "Dirasakan": String,
                "Shakemap": String
            }
        }
    }
}
```
