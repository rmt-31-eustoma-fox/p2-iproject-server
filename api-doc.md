# Movie API Documentation

## Endpoints :

List of available endpoints:

- `POST /register`
- `POST /login`
- `GET /agents`
- `GET /agents/:uuid`
- `POST /favorite/:agentUuid`
- `GET /favorite`
- `DELETE /favorite/:id`
- `GET /leaderboard`

&nbsp;

## 1. POST /register

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
  "id": "integer",
  "email": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Invalid email format"
}
OR
{
  "message": "Email must be unique"
}
OR
{
  "message": "Name is required"
}
OR
{
  "message": "Password is required"
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
  "access_token": "string"
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

&nbsp;

## 3. GET /agents

Description:

- Get all agents from 3rd party API

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
        "uuid": "uuid",
        "displayName": "string",
        "description": "text",
        "imageUrl": "string",
        "role": {
            "uuid": "string",
            "displayName": "string",
            "description": "text",
            "displayIcon": "string",
            "assetPath": "string"
        },
        "abilities": [
            {
                "slot": "string",
                "displayName": "string",
                "description": "text",
                "displayIcon": "string"
            },
            {
                "slot": "string",
                "displayName": "string",
                "description": "text",
                "displayIcon": "string"
            },
            {
                "slot": "string",
                "displayName": "string",
                "description": "text",
                "displayIcon": "string"
            },
            {
                "slot": "string",
                "displayName": "string",
                "description": "text",
                "displayIcon": "string"
            }
        ]
    },
  ...
]
```

&nbsp;

## 4. GET /agents/:uuid

Description:

- Get specific agent

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
  "uuid": "uuid (required)"
}
```

_Response (200 - OK)_

```json
{
  "status": 200,
  "data": {
    "uuid": "uuid",
    "displayName": "string",
    "description": "text",
    "developerName": "string",
    "characterTags": null,
    "displayIcon": "string",
    "displayIconSmall": "string",
    "bustPortrait": "string",
    "fullPortrait": "string",
    "fullPortraitV2": "string",
    "killfeedPortrait": "string",
    "background": "string",
    "backgroundGradientColors": ["string", "string", "string", "string"],
    "assetPath": "string",
    "isFullPortraitRightFacing": false,
    "isPlayableCharacter": true,
    "isAvailableForTest": true,
    "isBaseContent": false,
    "role": {
      "uuid": "uuid",
      "displayName": "string",
      "description": "text",
      "displayIcon": "string",
      "assetPath": "string"
    },
    "abilities": [
      {
        "slot": "string",
        "displayName": "string",
        "description": "text",
        "displayIcon": "string"
      },
      {
        "slot": "string",
        "displayName": "string",
        "description": "text",
        "displayIcon": "string"
      },
      {
        "slot": "string",
        "displayName": "string",
        "description": "text",
        "displayIcon": "string"
      },
      {
        "slot": "string",
        "displayName": "string",
        "description": "text",
        "displayIcon": "string"
      }
    ],
    "voiceLine": {
      "minDuration": "decimal",
      "maxDuration": "decimal",
      "mediaList": [
        {
          "id": "integer",
          "wwise": "string",
          "wave": "string"
        }
      ]
    }
  }
}
```

&nbsp;

## 5. POST /favorite/:agentUuid

Request:

- params:

```json
{
  "agentUuid": "uuid"
}
```

_Response (201 - OK)_

```json
{
  "message": "Agent added to favorite!"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Can not add agent twice"
}
```

&nbsp;

## 6. GET /favorite

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
        "uuid": "uuid",
        "displayName": "string",
        "description": "text",
        "imageUrl": "string",
        "role": "string",
        "roleDesc": "text",
        "ability1Name": "string",
        "ability1Desc": "text",
        "ability2Name": "string",
        "ability2Desc": "text",
        "ability3Name": "string",
        "ability3Desc": "text",
        "ultName": "string",
        "ultDesc": "text"
    },
    ...
]
```

&nbsp;

## 7. Delete /favorite/:id

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
  "message": "Removed from favorite"
}
```

_Response (404 - Bad Request)_

```json
{
  "message": "Not found"
}
```

_Response (403 - Bad Request)_

```json
{
  "message": "Forbidden"
}
```

## 8. GET /leaderboard

_Response (200 - OK)_

```json
[
    {
        "puuid": "uuid",
        "gameName": "string",
        "tagLine": "string",
        "leaderboardRank": "integer",
        "rankedRating": "integer",
        "numberOfWins": "integer",
        "competitiveTier": "integer"
    },
    ...
]
```

&nbsp;

&nbsp;

## Global Error

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```
