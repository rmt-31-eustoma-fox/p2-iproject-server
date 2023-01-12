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

## 14. POST /products/qrcode

Description:

- Get qrcode per detail product

Request:

- body:

```json
{
  "url": "string"
}
```

_Response (200 - Ok)_

```json
{
  "success": true,
  "qrcode": "data:image/png;base64,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",
  "size": {
    "width": 400,
    "height": 400
  }
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Invalid url"
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
