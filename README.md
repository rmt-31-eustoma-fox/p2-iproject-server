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

### GET /user
#### Description
- Get username for user

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
    "id": Integer,
    "username": String,
    "email": Text,
    "createdAt": Date,
    "updatedAt": Date
  }
  ```

### GET /qrweb
#### Description
- Get qr weblink for related yugioh website

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
    "qrX": [
        {
            "success": BOOLEAN,
            "qrcode": STRING,
            "size": {
                "width": INTEGER,
                "height": INTEGER
            }
        },
        {
            "success": BOOLEAN,
            "qrcode": STRING,
            "size": {
                "width": INTEGER,
                "height": INTEGER
            }
        },
        ]
    }
  ```

### GET /cards
#### Description
- Get allcards in yugioh api

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
    [
    {
        "id": INTEGER,
        "name": STRING,
        "type": STRING,
        "frameType": STRING,
        "desc": STRING,
        "race": STRING,
        "archetype": STRING,
        "card_sets": [
            {
                "set_name": STRING,
                "set_code": STRING,
                "set_rarity": STRING,
                "set_rarity_code": STRING,
                "set_price": STRING
            }
        ],
        "card_images": [
            {
                "id": INTEGER,
                "image_url": STRING,
                "image_url_small": STRING,
                "image_url_cropped": STRING
            }
        ],
        "card_prices": [
            {
                "cardmarket_price": STRING,
                "tcgplayer_price": STRING,
                "ebay_price": STRING,
                "amazon_price": STRING,
                "coolstuffinc_price": STRING
            }
        ]
    },
    {
        "id": INTEGER,
        "name": STRING,
        "type": STRING,
        "frameType": STRING,
        "desc": STRING,
        "race": STRING,
        "archetype": STRING,
        "card_sets": [
            {
                "set_name": STRING,
                "set_code": STRING,
                "set_rarity": STRING,
                "set_rarity_code": STRING,
                "set_price": STRING
            }
        ],
        "card_images": [
            {
                "id": STRING,
                "image_url": STRING,
                "image_url_small": STRING,
                "image_url_cropped": STRING
            }
        ],
        "card_prices": [
            {
                "cardmarket_price": STRING,
                "tcgplayer_price": STRING,
                "ebay_price": STRING,
                "amazon_price": STRING,
                "coolstuffinc_price": STRING
            }
        ]
    },
    {
        "id": INTEGER,
        "name": STRING,
        "type": STRING,
        "frameType": STRING,
        "desc": STRING,
        "race": STROMG,
        "archetype": STRING,
        "card_sets": [
            {
                "set_name": STRING,
                "set_code": STRING,
                "set_rarity": STRING,
                "set_rarity_code": STRING,
                "set_price": STRING
            }
        ],
        "card_images": [
            {
                "id": STRING,
                "image_url": STRING,
                "image_url_small": STRING,
                "image_url_cropped": STRING
            }
        ],
        "card_prices": [
            {
                "cardmarket_price": STRING,
                "tcgplayer_price": STRING,
                "ebay_price": STRING,
                "amazon_price": STRING,
                "coolstuffinc_price": STRING
            }
        ]
    },
    ]
    
  ```

### POST /adddeck
#### Description
- Adding deck to user

#### Request
- Headers
    ```json
    {
      "Content-Type": "application/x-www-form-urlencoded",
      "access_token": STRING
    }
    ```
- Body
    ```json
    {
      "name": STRING
    }
    ```

#### Response
_200 - OK_

- Body
  ```json
    {
        "message": "Success create deck"
    }
  ```

### GET /nydecks
#### Description
- Pick deck user

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
    [
        {
            "id": INTEGER,
            "name": STRING,
            "ProfileId": INTEGER,
            "createdAt": STRING,
            "updatedAt": STRING,
        },
                {
            "id": INTEGER,
            "name": STRING,
            "ProfileId": INTEGER,
            "createdAt": STRING,
            "updatedAt": STRING,
        },
        ...
    ]
  ```

### POST /deck/:deckid
#### Description
- Adding card to deck

#### Request
- Headers
    ```json
    {
      "Content-Type": "application/x-www-form-urlencoded",
      "access_token": STRING
    }
    ```
- Body
  ```json
        {
            "cardid": INTEGER,
        },
  ```

#### Response
_200 - OK_

- Body
  ```json
  {
    "message": STRING
  }
  ```


### DELETE /deck/:deckid
#### Description
- Delete deck

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
    "message": STRING
  }
  ```

### DELETE /selectcard
#### Description
- Select card to display

#### Request
- Headers
    ```json
    {
      "Content-Type": "application/x-www-form-urlencoded",
      "access_token": STRING
    }
    ```
- Body
  ```json
        {
            "cardid": INTEGER,
        },
  ```

#### Response
_200 - OK_

- Body
  ```json
    {
        "name": "\"A\" Cell Breeding Device",
        "desc": "During each of your Standby Phases, put 1 A-Counter on 1 face-up monster your opponent controls.",
        "image_url": "https://images.ygoprodeck.com/images/cards/34541863.jpg"
    }
  ```

### DELETE /deck/:deckid
#### Description
- Delete card from deck id

#### Request
- Headers
    ```json
    {
      "Content-Type": "application/x-www-form-urlencoded",
      "access_token": STRING
    }
    ```
- Body
  ```json
        {
            "cardid": INTEGER,
        },
  ```

#### Response
_200 - OK_

- Body
  ```json
  {
    "message": STRING
  }
  ```