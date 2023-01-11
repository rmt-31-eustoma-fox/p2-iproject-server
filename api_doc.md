# de'Millie API Documentation

## Endpoints :

List of available endpoints:

- `POST /register`
- `POST /login`
- `POST /google-sign-in`
- `GET /products`
- `GET /products/:id`
- `GET /categories`
- `GET /cart`
- `POST /cart/:id`
- `DELETE /cart/:id`
- `POST /pay`
- `GET /order-history`
- `POST /midtrans`
- `POST /bmi`

&nbsp;

## 1. POST /register

Description:

- register for new user

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
  "email": "string",
  "password": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Email is not valid"
}
OR
{
  "message": "Email must be unique"
}
OR

{
  "message": "Password must be more than 5 chatacters"
}
```

&nbsp;

## 2. POST /login

Description:

- log in for user

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - Ok)_

```json
{
  "access_token": "string"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Wrong Email or Password"
}
```

&nbsp;

## 3. POST /google-signin

Description:

- log in for user with google

Request:

- headers:

```json
{
  "google-oauth-token": "string"
}
```

_Response (200 - Ok)_

```json
{
"acess_token": String,
"username": String
}
```

&nbsp;

## 4. GET /products

Description:

- Get all product from database

_Response (200 - OK)_

```json

[
 {
    "id": 1,
    "name": "Lapis Original Square",
    "price": 565000,
    "description": "Lapis Original yang di buat dengan menggunakan bahan premium (Wijsman Butter) dan di proses secara higenis tanpa bahan pengawet.",
    "imgUrl": "https://i.ibb.co/dbfDL4b/LAPIS-ORIGINAL-SQUARE.jpg",
    "CategoryId": 1,
    "UserId": 1,
    "createdAt": "2023-01-11T16:38:11.008Z",
    "updatedAt": "2023-01-11T16:38:11.008Z"
  },
        ...,
]

```

&nbsp;

## 5. GET /products/:id

Description:

- Get product detail by id

Request:

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  "id": 1,
  "name": "Lapis Original Square",
  "price": 565000,
  "description": "Lapis Original yang di buat dengan menggunakan bahan premium (Wijsman Butter) dan di proses secara higenis tanpa bahan pengawet.",
  "imgUrl": "https://i.ibb.co/dbfDL4b/LAPIS-ORIGINAL-SQUARE.jpg",
  "CategoryId": 1,
  "UserId": 1,
  "createdAt": "2023-01-11T16:38:11.008Z",
  "updatedAt": "2023-01-11T16:38:11.008Z",
  "User": {
    "id": 1,
    "email": "admin@mail.com",
    "password": "$2a$08$NZuPsUXWxuSBX81oofQEueLVnPywZreEABAsCRVKlnPmWUcpKy7hK",
    "createdAt": "2023-01-11T16:38:10.968Z",
    "updatedAt": "2023-01-11T16:38:10.968Z"
  },
  "Category": {
    "id": 1,
    "name": "Signature Lapis Legit",
    "createdAt": "2023-01-11T16:38:11.004Z",
    "updatedAt": "2023-01-11T16:38:11.004Z"
  }
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Product with that id is not found"
}
```

&nbsp;

## 6. GET /categories

Description:

- Get all categories from database

_Response (200 - OK)_

```json

   [
       {
            "id": 1,
            "name": "Signature Lapis Legit",
            "createdAt": "2023-01-11T16:38:11.004Z",
            "updatedAt": "2023-01-11T16:38:11.004Z"
        },
        {
            "id": 2,
            "name": "Other Cake",
            "createdAt": "2023-01-11T16:38:11.004Z",
            "updatedAt": "2023-01-11T16:38:11.004Z"
        },
        ...,
    ]

```

&nbsp;

## 7. GET /cart

Description:

- Get all Cart from database

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
[
  {
    "id": 10,
    "ProductId": 1,
    "UserId": 1,
    "createdAt": "2023-01-11T21:26:32.041Z",
    "updatedAt": "2023-01-11T21:26:32.041Z",
    "User": {
      "id": 1,
      "email": "admin@mail.com",
      "password": "$2a$08$NZuPsUXWxuSBX81oofQEueLVnPywZreEABAsCRVKlnPmWUcpKy7hK",
      "createdAt": "2023-01-11T16:38:10.968Z",
      "updatedAt": "2023-01-11T16:38:10.968Z"
    },
    "Product": {
      "id": 1,
      "name": "Lapis Original Square",
      "price": 565000,
      "description": "Lapis Original yang di buat dengan menggunakan bahan premium (Wijsman Butter) dan di proses secara higenis tanpa bahan pengawet.",
      "imgUrl": "https://i.ibb.co/dbfDL4b/LAPIS-ORIGINAL-SQUARE.jpg",
      "CategoryId": 1,
      "UserId": 1,
      "createdAt": "2023-01-11T16:38:11.008Z",
      "updatedAt": "2023-01-11T16:38:11.008Z"
    }
  }
]
```

&nbsp;

## 8. POST /cart/:id

Description:

- Add Product to Cart

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (201 - Created)_

```json
{
  "name": "Product successfully add to Shopping Cart"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Product with that id is not found"
}
```

&nbsp;

## 9. DELETE /cart/:id

Description:

- Delete Product from Cart by id

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  "message": "Product successfully remove from Shopping Cart"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Product with that id is not found"
}
```

&nbsp;

## 10. POST /pay

Description:

- Move Product from Cart to Oder History

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - Ok)_

```json
{
  "name": "Payment Success"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Your Cart is Empty"
}
```

&nbsp;

## 11. GET /cart

Description:

- Get all Order History from database

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
[
  {
    "id": 5,
    "ProductId": 1,
    "UserId": 1,
    "createdAt": "2023-01-11T21:41:09.881Z",
    "updatedAt": "2023-01-11T21:41:09.881Z",
    "User": {
      "id": 1,
      "email": "admin@mail.com",
      "password": "$2a$08$NZuPsUXWxuSBX81oofQEueLVnPywZreEABAsCRVKlnPmWUcpKy7hK",
      "createdAt": "2023-01-11T16:38:10.968Z",
      "updatedAt": "2023-01-11T16:38:10.968Z"
    },
    "Product": {
      "id": 1,
      "name": "Lapis Original Square",
      "price": 565000,
      "description": "Lapis Original yang di buat dengan menggunakan bahan premium (Wijsman Butter) dan di proses secara higenis tanpa bahan pengawet.",
      "imgUrl": "https://i.ibb.co/dbfDL4b/LAPIS-ORIGINAL-SQUARE.jpg",
      "CategoryId": 1,
      "UserId": 1,
      "createdAt": "2023-01-11T16:38:11.008Z",
      "updatedAt": "2023-01-11T16:38:11.008Z"
    }
  },
  ...,
]
```

&nbsp;

## 12. POST /midtrans

Description:

- Payment Gateaway Midtrans and Nodemailer

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- body:

```json
{
  "amount": "integer"
}
```

_Response (200 - Ok)_

```json
{
  "transactionToken": "string"
}
```

&nbsp;

## 13. POST /bmi

Description:

- Get BMI result

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- body:

```json
{
  "age": "integer",
  "weight": "integer",
  "height": "integer"
}
```

_Response (200 - Ok)_

```json
{
  "status_code": 200,
  "request_result": "Successful",
  "data": {
    "bmi": 24.22,
    "health": "Normal",
    "healthy_bmi_range": "18.5 - 25"
  }
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Age cannot be smaller than 1 or bigger than 80"
}
OR

{
  "message": "Weight cannot be smaller than 40 or bigger than 160"
}
OR
{
  "message": "Height cannot be smaller than 130 or bigger than 230"
}
```

&nbsp;

## Global Error

_Response (401 - Unauthorized)_

```json
{
  "message": "Invaliad Token"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```
