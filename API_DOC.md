### AVAILABLE ROUTES

- `GET /currencies`
- `GET /forexNews`
- `GET /forexValue`
- `GET /forexExcRate`

### GET /currencies 
#### Description
- Return list of foreign exchange pair 

#### Response

_200 - Ok_

- Body 
    ```json
    [
        {
            "symbol" : String,
            "name" : String
        },
        {
            "symbol" : String,
            "name" : String
        },
        {
            "symbol" : String,
            "name" : String
        },
        ...
    ]
    ```

### GET /forexNews
#### Description
- Return 2 news mostly related to certain Forex

#### Request
- Query 
    ```json
    {
        "forexPair" : String
    }
    ```

#### Response
_200 - Ok_

- Body 
    ```json
    [
        {
            "title" : String,
            "desc" : String,
            "imgUrl" : String,
            "createdAt" : String,
            "source" : String,
            "url" : String
        },
        {
            "title" : String,
            "desc" : String,
            "imgUrl" : String,
            "createdAt" : String,
            "source" : String,
            "url" : String
        },
        {
            "title" : String,
            "desc" : String,
            "imgUrl" : String,
            "createdAt" : String,
            "source" : String,
            "url" : String
        },
        ...
    ]
    ```

### GET /forexValue 
#### Description
- Return recent 30 days period price (OHLC) of a Forex pair

#### Request
- Query 
    ```json
    {
        "forexPair" : String
    }
    ```

#### Response
_200 - Ok_

- Body 
    ```json
    [
        {
            "time" : String,
            "open" : Float,
            "high" : Float,
            "low" : Float,
            "close" : Float
        },
        {
            "time" : String,
            "open" : Float,
            "high" : Float,
            "low" : Float,
            "close" : Float
        },
        {
            "time" : String,
            "open" : Float,
            "high" : Float,
            "low" : Float,
            "close" : Float
        },
        ...
    ]
    ```

### GET /forexExcRate
#### Description 
- Return last day close price of available Forex pair

#### Request
- Query 
    ```json
    {
        "forexPair" : String
    }
    ```
#### Response
- Body
    ```json
    {
        "updatedAt" : String,
        "Pair" : 
        [
            {
                "name" : String,
                "value" : Float
            },
            {
                "name" : String,
                "value" : Float
            },
            {
                "name" : String,
                "value" : Float
            },
            ...
        ]
    }
    ```

### Global Error
#### Response
_400 - Bad Request_
- Body 
    ```json
    {
        "message" : "Bad Request"
    }
    ```

_500 - Internal Server Error_
- Body 
    ```json
    {
        "message" : "Internal Server Error"
    }
    ```