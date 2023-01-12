# NBAseken Documentation

## Endpoints :

List of available endpoints:

- `GET /games`
- `GET /games/:id`
- `GET /standings`
- `GET /players`
- `GET /players/:id`
- `GET /teams`
- `GET /teams/:id`
- `GET /seasons/`

  &nbsp;

## 1. GET /games

Description:

- Get a today matches

Response:

- _Response (200 - OK)_

```json
[
	{
		"id": 11667,
		"league": "standard",
		"season": 2022,
		"date": {
			"start": "2023-01-12T00:00:00.000Z",
			"end": null,
			"duration": null
		},
		"stage": 2,
		"status": {
			"clock": null,
			"halftime": false,
			"short": 3,
			"long": "Finished"
		},
		"periods": {
			"current": 4,
			"total": 4,
			"endOfPeriod": false
		},
		"arena": {
			"name": null,
			"city": null,
			"state": null,
			"country": null
		},
		"teams": {
			"visitors": {
				"id": 22,
				"name": "Minnesota Timberwolves",
				"nickname": "Timberwolves",
				"code": "MIN",
				"logo": "https://upload.wikimedia.org/wikipedia/fr/thumb/d/d9/Timberwolves_du_Minnesota_logo_2017.png/200px-Timberwolves_du_Minnesota_logo_2017.png"
			},
			"home": {
				"id": 10,
				"name": "Detroit Pistons",
				"nickname": "Pistons",
				"code": "DET",
				"logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Detroit_Pistons_primary_logo_2017.png/150px-Detroit_Pistons_primary_logo_2017.png"
			}
		},
		"scores": {
			"visitors": {
				"win": 0,
				"loss": 0,
				"series": {
					"win": 0,
					"loss": 0
				},
				"linescore": [
					"34",
					"30",
					"23",
					"31"
				],
				"points": 118
			},
			"home": {
				"win": 0,
				"loss": 0,
				"series": {
					"win": 0,
					"loss": 0
				},
				"linescore": [
					"31",
					"34",
					"36",
					"34"
				],
				"points": 135
			}
		},
		"officials": [],
		"timesTied": null,
		"leadChanges": null,
		"nugget": null
	},...
]
```

&nbsp;

## 2. GET /games/:id

Description:

- Get matches by id

Request:

- params:

```json
{
  "id": "integer"
}
```

Response:

- _Response (200 - OK)_

```json
[
  {
    "team": {
      "id": 11,
      "name": "Golden State Warriors",
      "nickname": "Warriors",
      "code": "GSW",
      "logo": "https://upload.wikimedia.org/wikipedia/fr/thumb/d/de/Warriors_de_Golden_State_logo.svg/1200px-Warriors_de_Golden_State_logo.svg.png"
    },
    "statistics": [
      {
        "fastBreakPoints": 21,
        "pointsInPaint": 58,
        "biggestLead": 11,
        "secondChancePoints": null,
        "pointsOffTurnovers": 15,
        "longestRun": null,
        "points": 124,
        "fgm": 42,
        "fga": 107,
        "fgp": "39.3",
        "ftm": 31,
        "fta": 39,
        "ftp": "79.5",
        "tpm": 9,
        "tpa": 31,
        "tpp": "29.0",
        "offReb": 17,
        "defReb": 50,
        "totReb": 67,
        "assists": 28,
        "pFouls": 22,
        "steals": 10,
        "turnovers": 18,
        "blocks": 11,
        "plusMinus": "5",
        "min": "290:00"
      }
    ]
  },
  {
    "team": {
      "id": 2,
      "name": "Boston Celtics",
      "nickname": "Celtics",
      "code": "BOS",
      "logo": "https://upload.wikimedia.org/wikipedia/fr/thumb/6/65/Celtics_de_Boston_logo.svg/1024px-Celtics_de_Boston_logo.svg.png"
    },
    "statistics": [
      {
        "fastBreakPoints": 14,
        "pointsInPaint": 52,
        "biggestLead": 5,
        "secondChancePoints": null,
        "pointsOffTurnovers": 21,
        "longestRun": null,
        "points": 119,
        "fgm": 49,
        "fga": 114,
        "fgp": "43.0",
        "ftm": 9,
        "fta": 16,
        "ftp": "56.2",
        "tpm": 12,
        "tpa": 33,
        "tpp": "36.4",
        "offReb": 11,
        "defReb": 40,
        "totReb": 51,
        "assists": 32,
        "pFouls": 30,
        "steals": 7,
        "turnovers": 15,
        "blocks": 9,
        "plusMinus": "-5",
        "min": "290:00"
      }
    ]
  }
]
```

&nbsp;

## 3. GET /standings

Description:

- Get Standings of current seasons

Request:

- query

```json
{
  "season": "integer (2015-2022)"
}
```

Response:

- _Response (200 - OK)_

```json
[
	{
		"league": "standard",
		"season": 2022,
		"team": {
			"id": 2,
			"name": "Boston Celtics",
			"nickname": "Celtics",
			"code": "BOS",
			"logo": "https://upload.wikimedia.org/wikipedia/fr/thumb/6/65/Celtics_de_Boston_logo.svg/1024px-Celtics_de_Boston_logo.svg.png"
		},
		"conference": {
			"name": "east",
			"rank": 1,
			"win": 29,
			"loss": 12
		},
		"division": {
			"name": "atlantic",
			"rank": 1,
			"win": 29,
			"loss": 12,
			"gamesBehind": null
		},
		"win": {
			"home": 16,
			"away": 13,
			"total": 29,
			"percentage": "0.707",
			"lastTen": 7
		},
		"loss": {
			"home": 5,
			"away": 7,
			"total": 12,
			"percentage": "0.293",
			"lastTen": 3
		},
		"gamesBehind": null,
		"streak": 3,
		"winStreak": true,
		"tieBreakerPoints": null
	},
	{
		"league": "standard",
		"season": 2022,
		"team": {
			"id": 4,
			"name": "Brooklyn Nets",
			"nickname": "Nets",
			"code": "BKN",
			"logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Brooklyn_Nets_newlogo.svg/130px-Brooklyn_Nets_newlogo.svg.png"
		},
		"conference": {
			"name": "east",
			"rank": 2,
			"win": 27,
			"loss": 13
		},
		"division": {
			"name": "atlantic",
			"rank": 2,
			"win": 27,
			"loss": 13,
			"gamesBehind": "1.5"
		},
		"win": {
			"home": 13,
			"away": 14,
			"total": 27,
			"percentage": "0.675",
			"lastTen": 9
		},
		"loss": {
			"home": 5,
			"away": 8,
			"total": 13,
			"percentage": "0.325",
			"lastTen": 1
		},
		"gamesBehind": "1.5",
		"streak": 2,
		"winStreak": true,
		"tieBreakerPoints": null
	},...
]
```

- _Response (404 - Not Found)_

```json
{
  "message": "Standings not found"
}
```

&nbsp;

## 4. GET /players

Description:

- Get Players / player based on query

Request:

- query

```json
{
    "search": "string"
},
OR
{
    "id":"integer"
},
OR
{
    "team":"integer"
}
```

Response:

- _Response (200 - OK)_

```json
[
  {
    "id": 123,
    "firstname": "Seth",
    "lastname": "Curry",
    "birth": {
      "date": "1990-08-23",
      "country": "USA"
    },
    "nba": {
      "start": 2013,
      "pro": 7
    },
    "height": {
      "feets": "6",
      "inches": "2",
      "meters": "1.88"
    },
    "weight": {
      "pounds": "185",
      "kilograms": "83.9"
    },
    "college": "Duke",
    "affiliation": "Duke/USA",
    "leagues": {
      "standard": {
        "jersey": 30,
        "active": true,
        "pos": "G"
      }
    }
  },
  {
    "id": 124,
    "firstname": "Stephen",
    "lastname": "Curry",
    "birth": {
      "date": "1988-03-14",
      "country": "USA"
    },
    "nba": {
      "start": 2009,
      "pro": 12
    },
    "height": {
      "feets": "6",
      "inches": "2",
      "meters": "1.88"
    },
    "weight": {
      "pounds": "185",
      "kilograms": "83.9"
    },
    "college": "Davidson",
    "affiliation": "Davidson/USA",
    "leagues": {
      "standard": {
        "jersey": 30,
        "active": true,
        "pos": "G"
      }
    }
  }
]
```

- _Response (404 - Not Found)_

```json
{
  "message": "Player not found"
}
```

&nbsp;

## 5. GET /players/:id

Description:

- Get Player Statistics

Request:

- params

```json
{
  "id": "integer"
}
```

Response:

- _Response (200 - OK)_

```json
[
	{
		"player": {
			"id": 124,
			"firstname": "Stephen",
			"lastname": "Curry"
		},
		"team": {
			"id": 11,
			"name": "Golden State Warriors",
			"nickname": "Warriors",
			"code": "GSW",
			"logo": "https://upload.wikimedia.org/wikipedia/fr/thumb/d/de/Warriors_de_Golden_State_logo.svg/1200px-Warriors_de_Golden_State_logo.svg.png"
		},
		"game": {
			"id": 10983
		},
		"points": 17,
		"pos": "PG",
		"min": "16:58",
		"fgm": 7,
		"fga": 13,
		"fgp": "53.8",
		"ftm": 0,
		"fta": 0,
		"ftp": "0.0",
		"tpm": 3,
		"tpa": 8,
		"tpp": "37.5",
		"offReb": 0,
		"defReb": 5,
		"totReb": 5,
		"assists": 2,
		"pFouls": 1,
		"steals": 0,
		"turnovers": 4,
		"blocks": 1,
		"plusMinus": "-2",
		"comment": null
	},
	{
		"player": {
			"id": 124,
			"firstname": "Stephen",
			"lastname": "Curry"
		},
		"team": {
			"id": 11,
			"name": "Golden State Warriors",
			"nickname": "Warriors",
			"code": "GSW",
			"logo": "https://upload.wikimedia.org/wikipedia/fr/thumb/d/de/Warriors_de_Golden_State_logo.svg/1200px-Warriors_de_Golden_State_logo.svg.png"
		},
		"game": {
			"id": 10980
		},
		"points": 6,
		"pos": "PG",
		"min": "13:05",
		"fgm": 1,
		"fga": 7,
		"fgp": "14.3",
		"ftm": 3,
		"fta": 3,
		"ftp": "100",
		"tpm": 1,
		"tpa": 4,
		"tpp": "25.0",
		"offReb": 0,
		"defReb": 3,
		"totReb": 3,
		"assists": 2,
		"pFouls": 0,
		"steals": 0,
		"turnovers": 4,
		"blocks": 0,
		"plusMinus": "-2",
		"comment": null
	},...
]
```

- _Response (404 - Not Found)_

```json
{
  "message": "Player not found"
}
```

&nbsp;

## 6. GET /teams

Description:

- Get All teams / team based on query

Request:

- query

```json
{
  "id": "integer"
}
```

Response:

- _Response (200 - OK)_

```json
[
	{
		"id": 1,
		"name": "Atlanta Hawks",
		"nickname": "Hawks",
		"code": "ATL",
		"city": "Atlanta",
		"logo": "https://upload.wikimedia.org/wikipedia/fr/e/ee/Hawks_2016.png",
		"allStar": false,
		"nbaFranchise": true,
		"leagues": {
			"standard": {
				"conference": "East",
				"division": "Southeast"
			}
		}
	},
	{
		"id": 2,
		"name": "Boston Celtics",
		"nickname": "Celtics",
		"code": "BOS",
		"city": "Boston",
		"logo": "https://upload.wikimedia.org/wikipedia/fr/thumb/6/65/Celtics_de_Boston_logo.svg/1024px-Celtics_de_Boston_logo.svg.png",
		"allStar": false,
		"nbaFranchise": true,
		"leagues": {
			"standard": {
				"conference": "East",
				"division": "Atlantic"
			}
		}
	},...
]
```

- _Response (404 - Not Found)_

```json
{
  "message": "Teams not found"
}
```

&nbsp;

## 7. GET /teams/:id

Description:

- Get Team statistic based on params

Request:

- params

```json
{
  "id": "integer"
}
```

Response:

- _Response (200 - OK)_

```json
{
  "games": 46,
  "fastBreakPoints": 30,
  "pointsInPaint": 74,
  "biggestLead": 19,
  "secondChancePoints": 30,
  "pointsOffTurnovers": 32,
  "longestRun": 24,
  "points": 5235,
  "fgm": 1888,
  "fga": 4032,
  "fgp": "59.1",
  "ftm": 744,
  "fta": 941,
  "ftp": "77.4",
  "tpm": 715,
  "tpa": 1924,
  "tpp": "36.2",
  "offReb": 463,
  "defReb": 1541,
  "totReb": 2004,
  "assists": 1296,
  "pFouls": 1004,
  "steals": 312,
  "turnovers": 759,
  "blocks": 172,
  "plusMinus": 5
}
```

- _Response (404 - Not Found)_

```json
{
  "message": "Teams not found"
}
```

&nbsp;

## 8. GET /seasons

Description:

- Get All Seasons

Response:

- _Response (200 - OK)_

```json
[2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022]
```

&nbsp;

## Global Error

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```
