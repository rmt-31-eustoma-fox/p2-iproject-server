## Endpoints

List of Available Endpoints:

- `GET /moviesgenres`
- `GET /movies/:movieId`
- `POST /users/subscribe`
- `POST /users/email`
- `POST /users/:movieId`
- `PATCH /users/subscribe`
- `POST /login`
- `POST /register`
- `POST /google-login`
- `POST /facebook-login`
- `GET /products/:id`
- `GET /categories`

### GET /products

#### Description

- Get all User And Product Data

#### Request

- Headers
  ```json
  {
    "access_token": String
  }
  ```

#### Response

_200 - OK_

- Body
  ```json
  {
    "statusCode": 200,
    "allData": [
      {
        "id": Integer,
        "name": String,
        "description": String,
        "price": Integer,
        "stock":Integer,
        "imgUrl":String,
        "status":String,
        "authorId": Integer,
        "categoryId":Integer,
        "createdAt": Date,
        "updatedAt": Date,
        "User": [
          {
           "id": Integer,
           "username": String,
           "email": String,
           "role": String,
           "phoneNumber":String,
           "address":String,
           "createdAt": Date,
           "updatedAt": Date,
          },
          ...
        ]
      },
      ...
    ]
  }
  ```

### POST /login

#### Description

- Login system

#### Request

- Headers
- Body
  ```json
  {
    "email":String,
    "password":String
  }
  ```

#### Response

_200 - OK_

- Headers
  ```json
  {
    "access_token":String
  }
  ```

_400 - Bad Request_

- Body
  ```json
  {
    "statusCode": 400,
    "errors": [
        "message",
        ...
    ]
  }
  ```
### POST /register

#### Description

- Register system

#### Request

- Headers
- Body
  ```json
  {
    "firstName":String,
    "lastName":String,
    "email":String,
    "password":String
  }
  ```

#### Response

_201 - OK_

- Body
  ```json
  {
    "message":"Succesfull created",
    "data": {
    "username": String,
    "email": String,
    "password":Integer,
  }
  }
  ```

_400 - Bad Request_

- Body
  ```json
  {
    "statusCode": 400,
    "errors": [
        "message",
        ...
    ]
  }
  ```

### POST /subscribe

#### Description

- Subscribe system

#### Request

- Headers
  ```json
  {
    "access_token":String
  }
  ```
- Body
  ```json
  {
    "amount":String,
    "recurPlan":String,
  }
  ```

#### Response

_201 - Created_

- Body
  ```json
  {
	"subsId": {
		"id": ObjectId,
		"action": [
			{
				"action": String,
				"url": String,
				"url_type": String,
				"method": "GET"
			}
		]
	}
}
  ```

_400 - Bad Request_

- Body
  ```json
  {
    "statusCode": 400,
    "errors": [
        "message",
        ...
    ]
  }
  ```

### POST /email

#### Description

- Send email to the site

#### Request

- Headers
  ```json
  {
    "access_token":String
  }
  ```
- Body
  ```json
  {
    "subject":String,
    "description":String,
    "clientEmail":String,
  }
  ```

#### Response

_200 - OK_

- Body
  ```json
  {
    "message":"Email send successfull"
  }
}
  ```

_400 - Bad Request_

- Body
  ```json
  {
    "statusCode": 400,
    "errors": [
        "message",
        ...
    ]
  }
  ```

### POST /users/:movieId

#### Description

- to add Watch list

#### Request

- Headers
  ```json
  {
    "access_token":String
  }
  ```
- Params
  ```json
  {
    "movieId":ObjectId,
  }
  ```

#### Response

_200 - OK_

- Body
  ```json
  {
    "message":"Email send successfull"
  }
}
  ```

_400 - Bad Request_

- Body
  ```json
  {
    "statusCode": 400,
    "errors": [
        "message",
        ...
    ]
  }
  ```

### PATCH /subscribe

#### Description

- Update subscribe status

#### Request

- Headers
  ```json
  {
    "access_token":String
  }
  ```

#### Response

_200 - OK_

- Body
  ```json
  {
    "message":"Success update Subscription",
  }
}
  ```

_400 - Bad Request_

- Body
  ```json
  {
    "statusCode": 400,
    "errors": [
        "message",
        ...
    ]
  }
  ```

### GET /moviesgenres

#### Description

- Get all Movies and it's Genres

#### Request

- Headers
  ```json
  {
    "access_token": String
  }
  ```

#### Response

_200 - OK_

- Body
  ```json
  {
    movies: [
      {
			"_id": OBJECTID,
			"title": String,
			"overview": String,
			"language": String,
			"image": String,
			"releaseDate": String,
			"tagline": String,
			"rating": Integer,
			"ratingQuantity": Integer,
			"adult": Boolean,
			"popularity": Integer,
			"genres": [
				{
					"_id": OBJECTID,
					"name": String,
					"created_at": Date,
					"updated_at": Date
				},
				...
			],
			"certification": String,
			"video": String,
			"subscripted": Boolean,
			"created_at": Date,
			"updated_at": Date
		},
    ...
    ]
  }
  ```

### GET /movies/:movieId

#### Description

- Get Movie by Id provided

#### Request

- Headers
  ```json
  {
    "access_token": String
  }
  ```
- Params
  ```json
  {
    "movieId": ObjectId
  }
  ```

#### Response

_200 - OK_

- Body
  ```json
  {
    movie: {
      {
			"_id": OBJECTID,
			"title": String,
			"overview": String,
			"language": String,
			"image": String,
			"releaseDate": String,
			"tagline": String,
			"rating": Integer,
			"ratingQuantity": Integer,
			"adult": Boolean,
			"popularity": Integer,
			"genres": [
				{
					"_id": OBJECTID,
					"name": String,
					"created_at": Date,
					"updated_at": Date
				},
				...
			],
			"certification": String,
			"video": String,
			"subscripted": Boolean,
			"created_at": Date,
			"updated_at": Date
		}
    }
  }
  ```

### GET /users

#### Description

- Get User Data

#### Request

- Headers
  ```json
  {
    "access_token": String
  }
  ```

#### Response

_200 - OK_

- Body
  ```json
  {
	"user": {
		"_id": ObjectId,
		"firstName": String,
		"lastName": String,
		"email": String,
		"watchList": Array,
		"role": String,
		"created_at": Date,
		"updated_at": Date
	}
}
  ```


### Global Error

#### Response

_500 - Internal Server Error_

- Body
  ```json
  {
    "statusCode": 500,
    "error": "Internal Server Error"
  }
  ```

_403 - Forbidden

- Body
  ```json
  {
    "statusCode": 403,
    "error": "Forbidden"
  }
  ```

_401 - Unauthorized

- Body
  ```json
  {
    "statusCode": 401,
    "error": "Invalid Token"
  }
  ```
