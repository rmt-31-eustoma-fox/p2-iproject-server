# p2-iproject-server
Individual Project - Server


## Endpoints Users

List of Available Users Endpoints:
- `POST /register`
- `POST /login`
- `POST /google-sign-in`
- `GET /user`
- `GET /qrweb`
- `GET /cards`
- `POST /adddeck`
- `GET /mydecks`
- `POST /decks/:deckid`
- `GET /decks/:deckid`
- `DELETE /decks/:deckid`
- `GET /selectcard`
- `DELETE /deckscard/:deckid`

### POST /register
#### Description
- Create a new user data

#### Request
- Headers
    ```json
    {
      "Content-Type": "application/x-www-form-urlencoded"
    }
- Body
    ```json
    {
      "username": String,
      "password": String,
      "email": String,
    }
    ```
#### Response
_201 - Created_
- Body
    ```json
    {
    "id": Integer,
    "username": String,
    "email": String,
    }
    ```

_400 - Bad Request_ 
- Body
  
  example for username is empty
    ```json
  {
      "statusCode": 400,
      "name": "Bad request",
      "message": 
        {
          "username is empty"
        }
  }
    ```

### POST /users/login
#### Description
- log in to homepage

#### Request
- Headers
    ```json
    {
      "Content-Type": "application/x-www-form-urlencoded",
    }
- Body
    ```json
    {
      "username": String,
      "email": String,
    }
    ```
#### Response
_200 - OK_

- Body
  ```json
  {
      "message": "Log In Success",
      "access_token": "eyJhbGc...."
  }
  ```

_401 - Not authorized_

- Body
  ```json
  {
      "statusCode": 401,
      "message": "Invalid email or password"
  }
  ```


### POST /google-sign-in
#### Description
- log in to homepage via google account

#### Request
- Headers
    ```json
    {
      "Content-Type": "application/x-www-form-urlencoded"
    }
    ```
#### Response
_200 - OK_

- Body
  ```json
  {
      "statusCode": 200,
      "access_token": "eyJhbGc...."
  }
  ```

_201 - Created_

- Body
  ```json
  {
      "statusCode": 201,
      "access_token": "eyJhbGc...."
  }
  ```




### POST /users/register
#### Description
- Create a new user data for role Admin

#### Request
- Headers
    ```json
    {
      "Content-Type": "application/x-www-form-urlencoded"
    }
- Body
    ```json
    {
      "username": String,
      "password": String,
      "email": String,
      "phoneNumber": String,
      "address": String
    }
    ```
#### Response
_201 - Created_
- Body
    ```json
    {
      "statusCode": 201,
      "user": {
        "id": Integer,
        "username": String,
        "email": String,
        "password": String,
        "role": String,
        "phoneNumber": String,
        "address": String,
        "updatedAt": Date,
        "createdAt": Date
      }
    }
    ```

_400 - Bad Request_ 
- Body
  
  example for username is empty
    ```json
  {
      "statusCode": 400,
      "name": "Bad request",
      "message": [
          "username is empty"
      ]
  }
    ```

### GET /histories
#### Description
- Get all the history data

#### Request
- Headers
    ```json
    {
      "Content-Type": "application/x-www-form-urlencoded",
      "access_token": STRING
    }
    ```

#### Response
_200 - OK_

- Body
  ```json
  {
      "statusCode": 200,
      "products": [
          {
              "id": Integer,
              "name": String,
              "description": String,
              "updatedBy": String,
              "createdAt": Date,
              "updatedAt": Date
          },
          {
              "id": Integer,
              "name": String,
              "description": String,
              "updatedBy": String,
              "createdAt": Date,
              "updatedAt": Date
          },
          ...
      ]
  }
  ```

### Global Error
#### Response
_500 - Internal Server Error_
- Body
    ```json
    {
      "statusCode": 500,
      "message": "Internal Server Error"
    }
    ```

# p2-cms-integration-client
CMS Integration - Server

# List of available data
- `Pubs`

## Endpoints Customers

List of Available Users Endpoints:
- `POST /pub/register`
- `POST /pub/login`
- `POST /pub/google-sign-in`
- `GET /pub/products`
- `GET /pub/products/:id`
- `GET /pub/categories`
- `GET /pub/categories/:id`
- `GET /pub/mybookmark`
- `POST /pub/bookmark/:id`
- `DELETE /pub/bookmark/:id`

### ENDPOINTS for pubs
#### Description
- All end point for customer service or public

### POST /pub/register
#### Description
- Create a new data for customer

#### Request
- Headers
    ```json
    {
      "Content-Type": "application/x-www-form-urlencoded"
    }
- Body
    ```json
    {
      "username": String,
      "password": String,
      "email": String,
      "phoneNumber": String,
      "address": String
    }
    ```
#### Response
_201 - Created_
- Body
    ```json
    {
      "statusCode": 201,
      "user": {
        "id": Integer,
        "username": String,
        "email": String,
        "password": String,
        "role": String,
        "phoneNumber": String,
        "address": String,
        "updatedAt": Date,
        "createdAt": Date
      }
    }
    ```

- List of bad request respond
- `Email is empty`
- `Email is null`
- `Email format is not valid`
- `Password is less than 5 or more than 24`
- `Username is empty`
- `Username is already been registered (unique)`

_400 - Bad Request_ 
- Body
  
  example for username is empty
    ```json
  {
      "statusCode": 400,
      "message": "username is empty"
  }
    ```

### POST /pub/login
#### Description
- log in to homepage for customer

#### Request
- Headers
    ```json
    {
      "Content-Type": "application/x-www-form-urlencoded",
    }
- Body
    ```json
    {
      "password": String,
      "email": String,
    }
    ```
#### Response
_200 - OK_

- Body
  ```json
  {
      "statusCode": 201,
      "message": "Log In Succes",
      "access_token": "eyJhbGc....",
      "role": STRING
  }
  ```

- List of bad request respond
- `Email is empty`
- `Username is empty`

_400 - Bad Request_ 
- Body
  example for email is empty
  ```json
  {
      "statusCode": 201,
      "message": "Email is empty"
  }
  ```

_401 - Not authorized_

- Body
  ```json
  {
      "statusCode": 401,
      "message": "Invalid email or password"
  }
  ```

### POST /pub/google-sign-in
#### Description
- log in customer to homepage via google account

#### Request
- Headers
    ```json
    {
      "Content-Type": "application/x-www-form-urlencoded"
    }
    ```
#### Response
_200 - OK_

- Body
  ```json
  {
      "statusCode": 200,
      "access_token": "eyJhbGc...."
  }
  ```

_201 - Created_

- Body
  ```json
  {
      "statusCode": 201,
      "access_token": "eyJhbGc...."
  }
  ```

### GET /pub/products
#### Description
- Get all the products data for customer to see

#### Response
_200 - OK_

- Body
  ```json
  {
      "statusCode": 200,
      "products": {
        "count": Integer,
        "rows": [
              {
                  "id": Integer,
                  "name": String,
                  "description": Text,
                  "price": Integer,
                  "stock": Integer,
                  "imgUrl": String,
                  "categoryId": Integer,
                  "authorId": Integer,
                  "createdAt": Date,
                  "updatedAt": Date,
                  "User": {
                    "username": String,
                    "email": String
                  },
                  "Category": {
                    "name": String
                  }
              },
              {
                  "id": Integer,
                  "name": String,
                  "description": Text,
                  "price": Integer,
                  "stock": Integer,
                  "imgUrl": String,
                  "categoryId": Integer,
                  "authorId": Integer,
                  "createdAt": Date,
                  "updatedAt": Date,
                  "User": {
                    "username": String,
                    "email": String
                  },
                  "Category": {
                    "name": String
                  }
              }
          ...
        ]
      }
  }
  ```

### GET /pub/products/:id
#### Description
- Get the specific data of product for customer

#### Response
_200 - OK_

- Body
  ```json
  {
      "statusCode": 200,
      "products": 
          {
              "id": Integer,
              "name": String,
              "description": Text,
              "price": Integer,
              "stock": Integer,
              "imgUrl": String,
              "categoryId": Integer,
              "authorId": Integer,
              "createdAt": Date,
              "updatedAt": Date,
              "User": {
                "username": String,
                "email": String
              },
              "Category": {
                "name": String
              },
              "qrCode": String
          }
  }
  ```
_404 - Not Found_
```json
{
    "statusCode": 404,
    "message": "Product is not exist"
}
```

### GET /pub/categories
#### Description
- Get all the categories data for customer

#### Response
_200 - OK_
- Body
  ```json
  {
      "statusCode": 200,
      "categories": [
          {
              "id": Integer,
              "name": String,
              "createdAt": Date,
              "updatedAt": Date
          },
          {
              "id": Integer,
              "name": String,
              "createdAt": Date,
              "updatedAt": Date
          },
          ...
      ]
  }
  ```
  
### GET /pub/categories/:id
#### Description
- Get the data of specific category 


#### Response
_200 - OK_
- Body
  ```json
  {
      "statusCode": 200,
      "categories": 
          {
              "id": Integer,
              "name": String,
              "createdAt": Date,
              "updatedAt": Date
          }
  }
  ```
  _404 - Not Found_

  ```json
  {
    "statusCode": 404,
    "message": "Category is not exist"
  }
  ```

### POST /pub/bookmark/:id
#### Description
- Post product for customer to add their favorite products

#### Request
- Headers
    ```json
    {
      "Content-Type": "application/x-www-form-urlencoded",
      "access_token": STRING
    }
    ```

#### Response
_200 - OK_
- Body
  ```json
  {
      "statusCode": 200,
      "message": "Bookmarking is success"
  }
  ```
_201 - Created_
- Body

  ```json
  {
      "message": "You have already bookmarked this product"
  }
  ```

### DELETE /pub/bookmark:id
#### Description
- Delete product in customer favorite list

#### Request
- Headers
    ```json
    {
      "Content-Type": "application/x-www-form-urlencoded",
      "access_token": STRING
    }
    ```

#### Response
_200 - OK_
- Body
  ```json
  {
      "statusCode": 200,
      "message": "Unbookmarking is success"
  }
  ```
_404 - Not Found_
- Body

  ```json
  {
      "message": "Bookmark is not found"
  }
  ```

### Global Error
#### Response
_500 - Internal Server Error_
- Body
    ```json
    {
      "statusCode": 500,
      "message": "Internal Server Error"
    }