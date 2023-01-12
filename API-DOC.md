## Endpoints

List of Available Endpoints:

- `POST /customers/register`
- `POST /customers/login`
- `GET /movies`
- `GET /movies/:moviesId`
- `GET /favorite
- `POST /favorite/externalId
- `GET /news


### POST /register

#### Description

- Create new user to system

#### Request

- Headers

  ```json
  {
    "Content-Type": "application/x-www-form-urlencoded"
  }
  ```

- Body
  ```json
  {
    "username": String,
    "email" : String,
    "password" : String,
  }
  ```

#### Response

_201 - Created_

- Body
  `json
  {
    "message": "success register new customer",
    "data": {
        "id": 6,
        "name": "doni",
        "email": "doni@gmail.com",
        "password": "$2b$10$2OaL9iZAKSq.vU2UJowdL.EmaFFuJ6UZ8YLwj6fn7CCl9iRulC.W6",
        "role": "customer",
        "updatedAt": "2023-01-12T09:51:06.827Z",
        "createdAt": "2023-01-12T09:51:06.827Z"
    }
}
  `
  _400 - Bad Request_
- Body
  ```json
  {
    "statusCode": 400,
    "error" : {
      "message": [
        "email cannot be empty!"
        OR
        "Must be a valid email format!"
        OR
        "password cannot be empty!"
        OR
        "password length min are 5 characters!"
      ]
    }
  }
  ```

### POST /login

#### Description

- Log in to system

#### Request

- Header
  ```json
  {
    "Content-Type": "application/x-www-form-urlencoded"
  }
  ```
- Body
  ```json
  {
    "email" : String,
    "password" : String
  }
  ```

#### Response

_200 - Ok_

- Body
  ```json
  {
    "message": "success login customer",
    "data": "access_token"
  }
  _400 - Bad Request*
  ```
- Body
  ```json
  {
  "statusCode": 400,
  "error" : {
  "message": "Invalid email/password"
  }
  }
  _401 - Unauthorized_
  ```
- Body
  ```json
  {
    "statusCode": 401,
    "error": {
      "message": "You have no access"
    }
  }
  ```
  ### GET /movies

#### Description

- Get all movies from third party API TMDB

#### Request

- Headers

  ```json
  {
    "access_token" : String
  }
  ```

- Query
  ```query parameter
  "mediaType" : "String"
  "time" : "String"
  "page" : "Integer"
  ```

#### Response

_200 - OK_

- Body
  ```json
  {
  "statusCode": 200,
  [
    {
        "adult": false,
        "backdrop_path": "/r9PkFnRUIthgBp2JZZzD380MWZy.jpg",
        "id": 315162,
        "title": "Puss in Boots: The Last Wish",
        "original_language": "en",
        "original_title": "Puss in Boots: The Last Wish",
        "overview": "Puss in Boots discovers that his passion for adventure has taken its toll: He has burned through eight of his nine lives, leaving him with only one life left. Puss sets out on an epic journey to find the mythical Last Wish and restore his nine lives.",
        "poster_path": "/1NqwE6LP9IEdOZ57NCT51ftHtWT.jpg",
        "media_type": "movie",
        "genre_ids": [
            16,
            28,
            12,
            35,
            10751,
            14
        ],
        "popularity": 10563.563,
        "release_date": "2022-12-21",
        "video": false,
        "vote_average": 8.571,
        "vote_count": 1098
    },
    {
        "adult": false,
        "backdrop_path": "/s16H6tpK2utvwDtzZ8Qy4qm5Emw.jpg",
        "id": 76600,
        "title": "Avatar: The Way of Water",
        "original_language": "en",
        "original_title": "Avatar: The Way of Water",
        "overview": "Set more than a decade after the events of the first film, learn the story of the Sully family (Jake, Neytiri, and their kids), the trouble that follows them, the lengths they go to keep each other safe, the battles they fight to stay alive, and the tragedies they endure.",
        "poster_path": "/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg",
        "media_type": "movie",
        "genre_ids": [
            878,
            12,
            28
        ],
        "popularity": 3495.153,
        "release_date": "2022-12-16",
        "video": false,
        "vote_average": 7.713,
        "vote_count": 3997
    },
  ...
  ]
  }
  _401 - Unauthorized_
  ```
- Body
  ```json
  {
    "statusCode": 401,
    "error": {
      "message": "Invalid token"
    }
  }
  ```
  ### GET /movies/:movieId

#### Description

- Get a movie with id from third party API 

#### Request

- Headers
  ```json
  {
    "access_token" : String
  }
  ```

#### Response

_200 - OK_

- Body
  `json
  {
    "adult": false,
    "backdrop_path": "/bQXAqRx2Fgc46uCVWgoPz5L5Dtr.jpg",
    "belongs_to_collection": null,
    "budget": 200000000,
    "genres": [
        {
            "id": 28,
            "name": "Action"
        },
        {
            "id": 14,
            "name": "Fantasy"
        },
        {
            "id": 878,
            "name": "Science Fiction"
        }
    ],
    "homepage": "https://www.dc.com/BlackAdam",
    "id": 436270,
    "imdb_id": "tt6443346",
    "original_language": "en",
    "original_title": "Black Adam",
    "overview": "Nearly 5,000 years after he was bestowed with the almighty powers of the Egyptian gods—and imprisoned just as quickly—Black Adam is freed from his earthly tomb, ready to unleash his unique form of justice on the modern world.",
    "popularity": 2305.917,
    "poster_path": "/pFlaoHTZeyNkG83vxsAJiGzfSsa.jpg",
    "production_companies": [
        {
            "id": 12,
            "logo_path": "/iaYpEp3LQmb8AfAtmTvpqd4149c.png",
            "name": "New Line Cinema",
            "origin_country": "US"
        },
        {
            "id": 34081,
            "logo_path": null,
            "name": "Flynn Picture Company",
            "origin_country": "US"
        },
        {
            "id": 73669,
            "logo_path": "/7tmSGstK3KwgcDIuBYLTAayjit9.png",
            "name": "Seven Bucks Productions",
            "origin_country": "US"
        },
        {
            "id": 128064,
            "logo_path": "/13F3Jf7EFAcREU0xzZqJnVnyGXu.png",
            "name": "DC Films",
            "origin_country": "US"
        }
    ],
    "production_countries": [
        {
            "iso_3166_1": "US",
            "name": "United States of America"
        }
    ],
    "release_date": "2022-10-19",
    "revenue": 389000000,
    "runtime": 125,
    "spoken_languages": [
        {
            "english_name": "English",
            "iso_639_1": "en",
            "name": "English"
        }
    ],
    "status": "Released",
    "tagline": "The world needed a hero. It got Black Adam.",
    "title": "Black Adam",
    "video": false,
    "vote_average": 7.219,
    "vote_count": 3628,
    "qrcode": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZAAAAGQCAYAAACAvzbMAAAAAklEQVR4AewaftIAAAnSSURBVO3BgWksWAwEsLFJ/y3PXQvPkGXJlzT9XwDg0QYADjYAcLABgIMNABxsAOBgAwAHGwA42ADAwQYADjYAcLABgIMNABz85GBmwme0DW9mJq/a5hNmJq/a5tXM5Le1zSfMTPiMtnmxAYCDDQAcbADgYAMABxsAONgAwMEGAA42AHCwAYCDDQAcbADgYAMABz/5kLb5181MPmFm8qptXsxMXrXNq5nJq7Z5NTP5S9rm1czkxczkVdt8Qtv862Ymv20DAAcbADjYAMDBBgAONgBwsAGAgw0AHGwA4GADAAcbADjYAMDBBgAOfvLFZibfqm2
}
  `
  _404 - Not Found_
- Body
  `json
  {
    "statusCode": 404,
    "error": {
      "message": "Data not found"
    }
  }
  `
  _401 - Unauthorized_

- Body
  ```json
  {
    "statusCode": 401,
    "error": {
      "message": "You have no access"
    }
  }
  ```
  ### GET /favorite

#### Description

- Get all favorite from database

#### Request

- Headers
  ```json
  {
    "access_token" : String
  }
  ```

#### Response

_200 - OK_

- Body
  ```json
  [
    {
        "adult": false,
        "backdrop_path": "/5pMy5LF2JAleBNBtuzizfCMWM7k.jpg",
        "belongs_to_collection": null,
        "budget": 90000000,
        "genres": [
            {
                "id": 10752,
                "name": "War"
            },
            {
                "id": 36,
                "name": "History"
            },
            {
                "id": 18,
                "name": "Drama"
            }
        ],
        "homepage": "https://www.devotion.movie",
        "id": 653851,
        "imdb_id": "tt7693316",
        "original_language": "en",
        "original_title": "Devotion",
        "overview": "The harrowing true story of two elite US Navy fighter pilots during the Korean War. Their heroic sacrifices would ultimately make them the Navy's most celebrated wingmen.",
        "popularity": 106.001,
        "poster_path": "/26yQPXymbWeCLKwcmyL8dRjAzth.jpg",
        "production_companies": [
            {
                "id": 4,
                "logo_path": "/gz66EfNoYPqHTYI4q9UEN4CbHRc.png",
                "name": "Paramount",
                "origin_country": "US"
            },
            {
                "id": 5,
                "logo_path": "/lieeAioEBVsgsoDT9HICrdt5iRa.png",
                "name": "Columbia Pictures",
                "origin_country": "US"
            },
            {
                "id": 33681,
                "logo_path": "/dHx2nsV9AC7IBlKN2dk1FDImvOz.png",
                "name": "Black Label Media",
                "origin_country": "US"
            },
            {
                "id": 47729,
                "logo_path": "/5NRpQ7xxmODXAjt2pRWUFMLVzvP.png",
                "name": "STX Entertainment",
                "origin_country": "US"
            }
        ],
        "production_countries": [
            {
                "iso_3166_1": "US",
                "name": "United States of America"
            }
        ],
        "release_date": "2022-11-23",
        "revenue": 20000000,
        "runtime": 139,
        "spoken_languages": [
            {
                "english_name": "English",
                "iso_639_1": "en",
                "name": "English"
            },
            {
                "english_name": "French",
                "iso_639_1": "fr",
                "name": "Français"
            }
        ],
        "status": "Released",
        "tagline": "In America’s forgotten war, they made history.",
        "title": "Devotion",
        "video": false,
        "vote_average": 6.6,
        "vote_count": 37
    },
    {
        "adult": false,
        "backdrop_path": "/bQXAqRx2Fgc46uCVWgoPz5L5Dtr.jpg",
        "belongs_to_collection": null,
        "budget": 200000000,
        "genres": [
            {
                "id": 28,
                "name": "Action"
            },
            {
                "id": 14,
                "name": "Fantasy"
            },
            {
                "id": 878,
                "name": "Science Fiction"
            }
        ],
        "homepage": "https://www.dc.com/BlackAdam",
        "id": 436270,
        "imdb_id": "tt6443346",
        "original_language": "en",
        "original_title": "Black Adam",
        "overview": "Nearly 5,000 years after he was bestowed with the almighty powers of the Egyptian gods—and imprisoned just as quickly—Black Adam is freed from his earthly tomb, ready to unleash his unique form of justice on the modern world.",
        "popularity": 2026.764,
        "poster_path": "/pFlaoHTZeyNkG83vxsAJiGzfSsa.jpg",
        "production_companies": [
            {
                "id": 12,
                "logo_path": "/iaYpEp3LQmb8AfAtmTvpqd4149c.png",
                "name": "New Line Cinema",
                "origin_country": "US"
            },
            {
                "id": 34081,
                "logo_path": null,
                "name": "Flynn Picture Company",
                "origin_country": "US"
            },
            {
                "id": 73669,
                "logo_path": "/7tmSGstK3KwgcDIuBYLTAayjit9.png",
                "name": "Seven Bucks Productions",
                "origin_country": "US"
            },
            {
                "id": 128064,
                "logo_path": "/13F3Jf7EFAcREU0xzZqJnVnyGXu.png",
                "name": "DC Films",
                "origin_country": "US"
            }
        ],
        "production_countries": [
            {
                "iso_3166_1": "US",
                "name": "United States of America"
            }
        ],
        "release_date": "2022-10-19",
        "revenue": 389000000,
        "runtime": 125,
        "spoken_languages": [
            {
                "english_name": "English",
                "iso_639_1": "en",
                "name": "English"
            }
        ],
        "status": "Released",
        "tagline": "The world needed a hero. It got Black Adam.",
        "title": "Black Adam",
        "video": false,
        "vote_average": 7.22,
        "vote_count": 3642
    }
    ...
]
  ```

_401 - Unauthorized_

- Body
  ```json
  {
    "statusCode": 401,
    "error": {
      "message": "Invalid Token"
    }
  }
  ```
  ### POST /favorite/:externalId

#### Description

- Create new favorite

- Headers
  ```json
  {
    "Content-Type": "application/x-www-form-urlencoded",
    "access_token" : String
  }
  ```
- Params
  ```params
  "externalId" : "Integer"
  ```

#### Response

_201 - Created_

- Body
  `json
  {
    "id": 18,
    "UserId": 4,
    "externalId": "800815",
    "updatedAt": "2023-01-12T10:34:00.821Z",
    "createdAt": "2023-01-12T10:34:00.821Z"
}
  `
  _400 - Bad Request_
- Body
  `json
  {
    "statusCode": 400,
    "error" : {
      "message": [
        "UserId cannot be empty!" 
        OR 
        "externalId cannot be empty!" 
       
      ]
    }
  }
  `
  _401 - Unauthorized_

- Body
  ```json
  {
    "statusCode": 401,
    "error": {
      "message": "You have no access"
    }
  }
  ```
   ### GET /news

#### Description

- Get all news from third party API  newsAPI.org

#### Request

- Headers

  ```json
  {
    "access_token" : String
  }
  ```

#### Response

_200 - OK_

- Body
  ```json
  {
  "statusCode": 200,
  [
    {
        "source": {
            "id": null,
            "name": "The Guardian"
        },
        "author": "Lauren Mechling",
        "title": "Velma review – Scooby Doo’s brainy bud gets a spunky re-imagining",
        "description": "Mindy Kaling reintroduces the animated mystery-solver for an older audience and gives her a string of fun, spooky and sly new adventuresThere was always something about Velma, the brainy and bespectacled teen sleuth in the Scooby Doo gang. After decades of sp…",
        "url": "https://www.theguardian.com/tv-and-radio/2023/jan/12/velma-review-mindy-kaling-scooby-doo",
        "urlToImage": "https://i.guim.co.uk/img/media/14047d28a0ffd9fd7061e3b21ffdff6b24a71268/75_0_1800_1080/master/1800.jpg?width=1200&height=630&quality=85&auto=format&fit=crop&overlay-align=bottom%2Cleft&overlay-width=100p&overlay-base64=L2ltZy9zdGF0aWMvb3ZlcmxheXMvdGctcmV2aWV3LTQucG5n&enable=upscale&s=d99d2e6d647d612a389bf3ca7dfad314",
        "publishedAt": "2023-01-12T07:56:04Z",
        "content": "There was always something about Velma, the brainy and bespectacled teen sleuth in the Scooby Doo gang. After decades of speculation over her romantic leanings, a 2022 Scooby Doo movie confirmed that… [+3635 chars]"
    },
    {
        "source": {
            "id": null,
            "name": "The Guardian"
        },
        "author": "Rebecca Solnit",
        "title": "Why we need new stories on climate | Rebecca Solnit",
        "description": "So much is happening, both wonderful and terrible – and it matters how we tell it. We can’t erase the bad news, but to ignore the good is the route to indifference or despair Every crisis is in part a storytelling crisis. This is as true of climate chaos as a…",
        "url": "https://www.theguardian.com/news/2023/jan/12/rebecca-solnit-climate-crisis-popular-imagination-why-we-need-new-stories",
        "urlToImage": "https://i.guim.co.uk/img/media/6d8490c55899a915ab4905964e446a17630af240/163_193_2040_1225/master/2040.jpg?width=1200&height=630&quality=85&auto=format&fit=crop&overlay-align=bottom%2Cleft&overlay-width=100p&overlay-base64=L2ltZy9zdGF0aWMvb3ZlcmxheXMvdGctZGVmYXVsdC5wbmc&enable=upscale&s=1c03cb68a5419efeaa2be3523c8ab6ee",
        "publishedAt": "2023-01-12T06:00:04Z",
        "content": "Every crisis is in part a storytelling crisis. This is as true of climate chaos as anything else. We are hemmed in by stories that prevent us from seeing, or believing in, or acting on the possibilit… [+26202 chars]"
    },
  ...
  ]
  }
  _401 - Unauthorized_
  ```
- Body
  ```json
  {
    "statusCode": 401,
    "error": {
      "message": "Invalid token"
    }
  }
  ```
