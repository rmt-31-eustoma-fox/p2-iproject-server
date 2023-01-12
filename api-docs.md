# p2-iproject-server

Individual Project - Server

## Endpoints :

List of available endpoints:

- `POST /register`
- `POST /login`
- `POST /google-sign-in`
- `GET /shows`
- `GET /shows/:id`
- `POST /shows/:id`
- `GET /shows/:id/review`
- `POST /shows/:id/review`
- `GET /favorites`
- `GET /favorites/:showId`
- `PATCH /favorites/:showId/watch`
- `PATCH /favorites/:showId/unwatch`
- `DELETE /favorites/:showId`
- `GET /donate`

## 1. POST /register

Description:

- Add new user

- body:

```json
{
	"email": "string",
	"password": "string",
	"username": "string"
}
```

_Response (200 - OK)_

```json
{
	"id": "integer",
	"email": "string",
	"username": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Incorrect email format"
}
OR
{
  "message": "Email has been registered. Please use another email address."
}
OR
{
  "message": "Username is required"
}
OR
{
  "message": "Password is required"
}

```

&nbsp;

## 2. POST /login

Description:

- Stores access_token

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
	"access_token": "integer",
	"username": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Password is required"
}

```

_Response (401 - Bad Request)_

```json
{
	"message": "Invalid email/password"
}
```

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
	"username": "string",
	"role": "string",
	"email": "email"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Password is required"
}
```

_Response (401 - Unauthorized)_

```json
{
	"message": "Invalid email/password"
}
```

&nbsp

## 3. POST /pub/google-sign-in

Description:

- Create new user via Google OAuth or stores access_token if use had been created

Request:

- headers:

```json
{
	"token": "string"
}
```

_Response (200 - OK)_

```json
{
	"message": "string",
	"access_token": "string",
	"username": "string"
}
```

_Response (201 - Created)_

```json
{
	"message": "string",
	"access_token": "string",
	"username": "string"
}
```

&nbsp;

## 4. GET /shows

Description:

- Get all movie from database with search (by title), and page queries from Episodate API

Request:

- query:

```json
{
	"page": "integer",
	"search": "string"
}
```

_Response (200 - OK)_

```json
{
	"count": "integer",
	"shows": [
		{
			"id": 35624,
			"name": "The Flash",
			"permalink": "the-flash",
			"start_date": "2014-10-07",
			"end_date": null,
			"country": "US",
			"network": "The CW",
			"status": "Running",
			"image_thumbnail_path": "https://static.episodate.com/images/tv-show/thumbnail/35624.jpg"
		},
		{
			"id": 23455,
			"name": "Game of Thrones",
			"permalink": "game-of-thrones",
			"start_date": "2011-04-17",
			"end_date": null,
			"country": "US",
			"network": "HBO",
			"status": "Ended",
			"image_thumbnail_path": "https://static.episodate.com/images/tv-show/thumbnail/23455.jpg"
		}
	]
}
```

&nbsp;

## 5. GET /shows/:id

Description:

- Get show detail from the Episodate API with the ID received from params

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
	"id": "integer"
}
```

_Response (200 - OK)_

```json
{
	"id": 998,
	"name": "Offenders",
	"permalink": "offenders",
	"url": "https://www.episodate.com/tv-show/offenders",
	"description": "<br>",
	"description_source": null,
	"start_date": "Oct/2002",
	"end_date": "Nov/2002",
	"country": "UK",
	"status": "Canceled/Ended",
	"runtime": 30,
	"network": "Channel 4",
	"youtube_link": "eqhhMS2Y8VY",
	"image_path": "https://static.episodate.com",
	"image_thumbnail_path": "https://static.episodate.com",
	"rating": 0,
	"rating_count": "0",
	"countdown": null,
	"genres": ["Comedy", "Drama"],
	"pictures": [],
	"episodes": []
}
```

&nbsp;

## 6. POST /shows/:id

Description:

- Add show to Favorites according to Show ID and User ID

Request:

- params:

```json
{
	"id": "integer"
}
```

- headers:

```json
{
	"access_token": "string"
}
```

_Response (200 - OK)_

```json
{
	"message": "You had added this show to watchlist"
}
```

_Response (201 - Created)_

```json
{
	"message": "Added successfully"
}
```

&nbsp;

## 7. `GET /shows/:id/review`

Description:

- Find show by ID and get all reviews of that show

Request:

- params:

```json
{
	"id": "integer"
}
```

- headers:

```json
{
	"access_token": "string"
}
```

_Response (200 - OK)_

```json
{
    "count": integer,
    "reviews": [
        {
            "id": 2,
            "UserId": 1,
            "ShowId": 2,
            "content": "Good movie",
            "rating": 1,
            "createdAt": "2023-01-10T13:48:04.681Z",
            "updatedAt": "2023-01-10T13:48:04.681Z",
            "User": {
                "id": 1,
                "email": "trial1@mail.com",
                "username": "trial1",
                "password": "$2a$12$T416uSiZIOzYImO42Iyy2O5niD3vNDaPxYHEYN.a3XSw/p2TBwE7W",
                "createdAt": "2023-01-10T13:44:20.943Z",
                "updatedAt": "2023-01-10T13:44:20.943Z"
            }
        }
    ]
}
```

&nbsp;

## 8. `POST /shows/:id/review`

Description:

- Find show by ID and add a review for that show

Request:

- params:

```json
{
	"id": "integer"
}
```

- headers:

```json
{
	"access_token": "string"
}
```

_Response (201 - Created)_

```json
{
	"message": "You have reviewed this movie."
}
```

&nbsp;

## 9. `GET /favorites`

Description:

- Find all favorites for that particular user

Request:

- headers:

```json
{
	"access_token": "string"
}
```

_Response (200 - OK)_

```json
{
    "favorites": [
        {
            "id": 4,
            "UserId": 1,
            "ShowId": 999,
            "status": "Watched",
            "createdAt": "2023-01-11T13:57:06.707Z",
            "updatedAt": "2023-01-11T16:19:15.775Z"
        },
        {
            "id": 2,
            "UserId": 1,
            "ShowId": 188,
            "status": "Not watched",
            "createdAt": "2023-01-11T13:28:23.492Z",
            "updatedAt": "2023-01-11T16:20:03.705Z"
        },
        {
            "id": 3,
            "UserId": 1,
            "ShowId": 1996,
            "status": "Watched",
            "createdAt": "2023-01-11T13:28:33.679Z",
            "updatedAt": "2023-01-11T16:21:00.020Z"
        },
        {
            "id": 6,
            "UserId": 1,
            "ShowId": 43467,
            "status": "Not watched",
            "createdAt": "2023-01-11T22:49:34.653Z",
            "updatedAt": "2023-01-11T22:49:34.653Z"
        }
    ],
    "shows": [
        {
            "id": 1996,
            "name": "The Keith Barret Show",
            "permalink": "the-keith-barret-show",
            "url": "https://www.episodate.com/tv-show/the-keith-barret-show",
            "description": "\nThe Keith Barret Show was a spoof talk show hosted by Keith Barret who interviewed different celebrity couples in the effort to try and find of out the secret to a successful marriage.<br>\n",
            "description_source": null,
            "start_date": "Jul/2004",
            "end_date": "Feb/2005",
            "country": "UK",
            "status": "Canceled/Ended",
            "runtime": 30,
            "network": "BBC TWO",
            "youtube_link": "VlS4qsYJKvI",
            "image_path": "https://static.episodate.com/images/tv-show/full/1996.jpg",
            "image_thumbnail_path": "https://static.episodate.com/images/tv-show/thumbnail/1996.jpg",
            "rating": 0,
            "rating_count": "0",
            "countdown": null,
            "genres": [
                "Comedy"
            ],
            "pictures": [],
            "episodes": [],
        }
}
```

## 10. `GET /favorites/:showId`

Description:

- Find favorite for the show based on the show's ID and user's ID

Request:

- params:

```json
{
	"showId": "integer"
}
```

- headers:

```json
{
	"access_token": "string"
}
```

_Response (200 - OK)_

```json
{
	"favorite": {
		"id": 4,
		"UserId": 1,
		"ShowId": 999,
		"status": "Watched",
		"createdAt": "2023-01-11T13:57:06.707Z",
		"updatedAt": "2023-01-11T16:19:15.775Z"
	}
}
```

&nbsp;

## 11. `PATCH /favorites/:showId/watch`

Description:

- Update favorite status to 'Watched'

Request:

- params:

```json
{
	"showId": "integer"
}
```

- headers:

```json
{
	"access_token": "string"
}
```

_Response (200 - OK)_

```json
{
	"message": "Status has been updated"
}
```

&nbsp;

## 12. `PATCH /favorites/:showId/unwatch`

Description:

- Update favorite status to 'Not watched'

Request:

- params:

```json
{
	"showId": "integer"
}
```

- headers:

```json
{
	"access_token": "string"
}
```

_Response (200 - OK)_

```json
{
	"message": "Status has been updated"
}
```

&nbsp;

## 13. `DELETE /favorites/:showId`

Description:

- Delete favorite according to show's ID and user's ID

Request:

- params:

```json
{
	"showId": "integer"
}
```

- headers:

```json
{
	"access_token": "string"
}
```

_Response (200 - OK)_

```json
{
	"message": "Show has been removed from your list"
}
```

&nbsp;

## 14. `GET /favorites/:showId`

Description:

- Generate QR Code from Happi Dev

Request:


- headers:

```json
{
	"access_token": "string"
}
```

_Response (200 - OK)_

```json
{
	"qrCode": "string"
}
```

&nbsp;


## Global Error

_Response (401 - Unauthorized)_

```json
{
	"message": "Invalid token"
}
```

_Response (404 - Not Found)_

```json
{
	"message": "Show not found"
}
```

_Response (500 - Internal Server Error)_

```json
{
	"message": "Internal server error"
}
```
