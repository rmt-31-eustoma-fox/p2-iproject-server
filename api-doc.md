# Endpoints

List of Available Endpoints:

- POST /register
- POST /login
- POST /sign-in
- GET /products
- POST /carts
- GET /carts
- DELETE /carts/:id
- PUT /carts

## POST /register

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (201 - Created)_

```json
[
  {
    "id": "integer",
    "email": "string",
    "message": "string"
  }
]
```

## POST /pub/login

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (201 - Created)_

```json
{
  "access_token": "string"
}
```

## POST /sign-in

Request:

- payload:

```json
{
  "email": "string"
}
```

Response (200 - OK)\_

```json
{
  "message": "User with email input has been found",
  "access_token": "string"
}
```

Response (201 - CREATED)\_

```json
{
  "message": "User with email input has been created",
  "access_token": "string"
}
```

## GET /products

- headers:

```json
{
  "access_token": "string"
}
```

Response (200 - OK)

```json
[
    {
     "id": "integer",
        "name": "string",
        "imgUrl": "string",
        "price": "integer",
        "stock": "integer",
        "CategoryId": "integer",
        "createdAt": "string",
        "updatedAt": "string",
        "Category": {
            "name": "string"
        }
    },
    ...
]

```

## POST /carts

- headers:

```json
{
  "access_token": "string"
}
```

- body:

```json
{
  "ProductId": "integer",
  "quantity": "integer"
}
```

Response (200 - OK)

```json
[
  {
    "UserId": "integer",
    "ProductId": "integer",
    "quantity": "integer",
    "status": "boolean",
    "updatedAt": "string",
    "createdAt": "string"
  }
]
```

Response (401)

```json

    {
     "message": "string",

    }
`
```

## GET /carts

- headers:

```json
{
  "access_token": "string"
}
```

Response (200 - OK)

```json
{
    "carts": [

        {
            "id": "integer",
            "UserId": "integer",
            "ProductId": "integer",
            "status": false,
            "quantity": "integer",
            "Product": {
                "id": "integer",
                "name": "string",
                "imgUrl": "string",
                "price": "integer",
                "stock": "integer",
                "CategoryId": "integer",
                "createdAt": "string",
                "updatedAt": "string"
            }
        }
        ...
    ],
    "sub": [
        "integer"
    ],
    "total": "integer"
}
```

## DELETE /carts/:id

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer"
}
```

Response (200 - OK)

```json
{
  "message": "string"
}
```

## PUT /carts

- headers:

```json
{
  "access_token": "string"
}
```

Response (200 - OK)

```json
{
    "success": [
        [
            1,
            [
                {
                    "id": 5,
                    "name": "string",
                    "imgUrl": "string",
                    "price": 18000,
                    "stock": 81,
                    "CategoryId": 2,
                    "createdAt": "string",
                    "updatedAt": "string"
                }
            ]
        ],
        ...
    ],
    "midtransToken": {
        "token": "string",
        "redirect_url": "string"
    }
}

```
