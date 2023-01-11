# HACKTRAVEL API Documentation

## Endpoints :

List of available endpoints:

- `POST /register`
- `POST /login`
- `POST /google-sign-in`
- `GET /cities`
- `GET /accomodations/:CityId`
- `GET /findAccomodations/:accomodationId`
- `GET /transactions`
- `POST /transactions/:accomodationId`
- `DELETE /transactions/:id`
- `PATCH /transactions/:id`
- `POST /midtransToken/:id`

&nbsp;

## 1. POST /register

Request:

- body:

```json
{
  "name": "string",
  "email": "string",
  "password": "string",
  "dateOfBirth": "string",
  "phoneNumber": "string",
  "address": "string" 
}
```

_Response (201 - Created)_

```json
{
  "message": "Success register, Welcome ${name}",
  "name": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Name is required"
}
OR
{
  "message": "Email is required"
}
OR
{
  "message": "Invalid format, must be an email format"
}
OR
{
  "message": "Email must be unique"
}
OR
{
  "message": "Password is required"
}
OR
{
  "message": "Password at least has 8 characters"
}
OR
{
  "message": "Date of Birth is required"
}
OR
{
  "message": "Phone Number is required"
}
OR
{
  "message": "Address is required"
}
```

&nbsp;

## 2. POST /login

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
  "access_token": "string",
  "name": "string"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid email/password"
}
OR
{
  "message": "Invalid Token"
}
```

&nbsp;

## 3. POST /google-sign-in

Request:

- payload:

```json
{
  "email": "string",
  "name": "string"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "string",
  "name": "string"
}
```

&nbsp;

## 4. GET /cities

Description:
- Get all city from database

_Response (200 - OK)_

```json
[
    {
        "id": "integer",
        "name": "string",
        "province": "string",
        "country": "string",
        "imageUrl": "string",
        "createdAt": "date",
        "updatedAt": "date"
    },
    {
        "id": "integer",
        "name": "string",
        "province": "string",
        "country": "string",
        "imageUrl": "string",
        "createdAt": "date",
        "updatedAt": "date"
    },
  ...,
]
```

&nbsp;

## 5. GET /accomodations/:CityId

Description:
- Find accomodations by CityId from database

Request:

- params:

```json
{
  "CityId": "integer (required)"
}
```

_Response (200 - OK)_

```json
[
    {
        "id": "integer",
        "name": "string",
        "star": "integer",
        "address": "string",
        "type": "string",
        "price": "integer",
        "CityId": "integer",
        "createdAt": "data",
        "updatedAt": "data",
        "City": {
            "name": "string"
        },
        "Images": [
            {
                "imageUrl": "string"
            },
            {
                "imageUrl": "string"
            },
            {
                "imageUrl": "string"
            }
        ]
    },
    {
        "id": "integer",
        "name": "string",
        "star": "integer",
        "address": "string",
        "type": "string",
        "price": "integer",
        "CityId": "integer",
        "createdAt": "data",
        "updatedAt": "data",
        "City": {
            "name": "string"
        },
        "Images": [
            {
                "imageUrl": "string"
            },
            {
                "imageUrl": "string"
            },
            {
                "imageUrl": "string"
            }
        ]
    },
    ...,
]
```

_Response (404 - Not Found)_

```json
{
  "message": "City not found"
}
```

&nbsp;

## 6. GET /findAccomodations/:accomodationId

Description:
- Find accomodation detail from database

Request:

- params:

```json
{
  "accomodationId": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
    "id": "integer",
    "name": "string",
    "star": "integer",
    "address": "string",
    "type": "string",
    "price": "integer",
    "CityId": "integer",
    "createdAt": "date",
    "updatedAt": "date",
    "Images": [
        {
            "imageUrl": "string"
        },
        {
            "imageUrl": "string"
        },
        {
            "imageUrl": "string"
        }
    ]
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Accomodation not found"
}
```

&nbsp;

## 7. GET /transactions

Description:
- Get All transactions from database

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
        "id": "integer",
        "UserId": "integer",
        "AccomodationId": "integer",
        "price": "integer",
        "date": "string",
        "isPaid": "boolean",
        "createdAt": "date",
        "updatedAt": "date",
        "Accomodation": {
            "id": "integer",
            "name": "string",
            "star": "integer",
            "address": "string",
            "type": "integer",
            "price": "integer",
            "CityId": "integer",
            "createdAt": "date",
            "updatedAt": "date"
        }
    },
    {
        "id": "integer",
        "UserId": "integer",
        "AccomodationId": "integer",
        "price": "integer",
        "date": "string",
        "isPaid": "boolean",
        "createdAt": "date",
        "updatedAt": "date",
        "Accomodation": {
            "id": "integer",
            "name": "string",
            "star": "integer",
            "address": "string",
            "type": "integer",
            "price": "integer",
            "CityId": "integer",
            "createdAt": "date",
            "updatedAt": "date"
        }
    },
    ...,
]
```

&nbsp;

## 8. POST /transactions/:accomodationId

Description:
- Add transaction to database

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
  "accomodationId": "integer (required)"
}
```

- body:

```json
{
  "date": "string"
}
```

_Response (200 - OK)_

```json
{
  "message": "${Accomodation.name} has been added to your transaction list",
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Accomodation not found"
}
```

&nbsp;

## 9. DELETE /transactions/:id

Description:
- Delete transaction from database

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
  "message": "${Accomodation.name} has been removed from your transaction list",
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Accomodation not found"
}
OR
{
  "message": "Transaction not found"
}
```

&nbsp;

## 10. PATCH /transactions/:id

Description:
- Update status transaction by id

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
  "message": "Success to pay ${Accomodation.name}"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Accomodation not found"
}
OR
{
  "message": "Transaction not found"
}
```

&nbsp;

## 11. POST /midtransToken/:id

Description:
- Get midtrans token

Request:

- headers: 

```json
{
  "access_token": "string"
},
{
  "serverKey": "string"
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
    "token": "string",
    "redirect_url": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "This transaction is already paid"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Accomodation not found"
}
OR
{
  "message": "Transaction not found"
}
```

&nbsp;

## Global Error

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid Token"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```