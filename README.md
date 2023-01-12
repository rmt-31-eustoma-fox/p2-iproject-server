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

