#News Portal API Documentation

##Endpoints :

List of available endpoints:

1. `POST /register`
2. `POST /login`
3. `POST /google-sign-in`
4. `GET /books`
5. `GET /quotes`
6. `GET /news`
7. `POST /mybooks`
8. `GET /mybooks`
9. `PATCH /mybooks/:id`
10. `GET /mybooks/:id`

&nbsp;

## 1. POST /register

Request:

- body:

```json
{
  "username": "string",
  "email": "string",
  "password": "string",
}
```

_Response (201 - Created)_

```json
{
  "access_token": "string",
  "id": "integer",
  "name": "string",
  "email": "string",
  "notification": {
      "Status": "string",
      "CustomID": "string",
      "To": [
          {
              "Email": "string",
              "MessageUUID": "string",
              "MessageID": "string",
              "MessageHref": "string"
          }
      ],
      "Cc": [],
      "Bcc": []
  }
}
```

Response (400 - Bad Request)

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
  "message": "Email address already in use!"
}
OR
{
  "message": "Invalid email format"
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
  "access_token": "string",
  "name": "string",
  "email": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email or password is required"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid email or password"
}
```

&nbsp;

## 3. POST /google-sign-in

Request:

- headers:

```json
{
  "google-oauth-token": "string"
}
```
_Response (200 - OK)_

```json
{
  "access_token": "string",
  "name": "string",
  "email": "string"
}
```

&nbsp;

## 4. GET /books

Description:

- Get books by query

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- query:

```json
{
  "query": "string"
}
OR
{
  "query": "integer"
}
```

_Response (200 - OK)_

```json
{ 
  "kind": "books#volumes",
    "totalItems": 783,
    "items": [
        {
            "kind": "books#volume",
            "id": "3T1BEAAAQBAJ",
            "etag": "fnWfmKhORFs",
            "selfLink": "https://www.googleapis.com/books/v1/volumes/3T1BEAAAQBAJ",
            "volumeInfo": {
                "title": "FISIKA 1",
                "authors": [
                    "Andi Suryanto",
                    "Syamsul Bakhri"
                ],
                "publisher": " Insan Cendekia Mandiri",
                "publishedDate": "2021-09-02",
                "description": "Buku Fisika 1 ini disusun berbasis kompetensi yang diperuntukkan bagi Mahasiswa pada Tahun Pertama di Perguruan Tinggi, dengan pola penulisan yang dirancang dengan menggunakan bahasa yang sederhana, paparan materi yang rinci, hubungan antar sub-pokok bahasan yang berkelanjutan, contoh soal beserta pemecahannya, dan soal latihan yang menantang.",
                "industryIdentifiers": [
                    {
                        "type": "ISBN_13",
                        "identifier": "9786233482981"
                    },
                    {
                        "type": "ISBN_10",
                        "identifier": "6233482984"
                    }
                ],
                "readingModes": {
                    "text": false,
                    "image": true
                },
                "pageCount": 143,
                "printType": "BOOK",
                "categories": [
                    "Antiques & Collectibles"
                ],
                "maturityRating": "NOT_MATURE",
                "allowAnonLogging": false,
                "contentVersion": "preview-1.0.0",
                "panelizationSummary": {
                    "containsEpubBubbles": false,
                    "containsImageBubbles": false
                },
                "imageLinks": {
                    "smallThumbnail": "http://books.google.com/books/content?id=3T1BEAAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
                    "thumbnail": "http://books.google.com/books/content?id=3T1BEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
                },
                "language": "id",
                "previewLink": "http://books.google.co.id/books?id=3T1BEAAAQBAJ&pg=PA19&dq=1&hl=&as_brr=6&cd=1&source=gbs_api",
                "infoLink": "https://play.google.com/store/books/details?id=3T1BEAAAQBAJ&source=gbs_api",
                "canonicalVolumeLink": "https://play.google.com/store/books/details?id=3T1BEAAAQBAJ"
            },
            "saleInfo": {
                "country": "ID",
                "saleability": "FOR_SALE",
                "isEbook": true,
                "listPrice": {
                    "amount": 87690,
                    "currencyCode": "IDR"
                },
                "retailPrice": {
                    "amount": 65768,
                    "currencyCode": "IDR"
                },
                "buyLink": "https://play.google.com/store/books/details?id=3T1BEAAAQBAJ&rdid=book-3T1BEAAAQBAJ&rdot=1&source=gbs_api",
                "offers": [
                    {
                        "finskyOfferType": 1,
                        "listPrice": {
                            "amountInMicros": 87690000000,
                            "currencyCode": "IDR"
                        },
                        "retailPrice": {
                            "amountInMicros": 65768000000,
                            "currencyCode": "IDR"
                        }
                    }
                ]
            },
            "accessInfo": {
                "country": "ID",
                "viewability": "PARTIAL",
                "embeddable": true,
                "publicDomain": false,
                "textToSpeechPermission": "ALLOWED",
                "epub": {
                    "isAvailable": false
                },
                "pdf": {
                    "isAvailable": true,
                    "acsTokenLink": "http://books.google.co.id/books/download/FISIKA_1-sample-pdf.acsm?id=3T1BEAAAQBAJ&format=pdf&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
                },
                "webReaderLink": "http://play.google.com/books/reader?id=3T1BEAAAQBAJ&hl=&as_brr=6&source=gbs_api",
                "accessViewStatus": "SAMPLE",
                "quoteSharingAllowed": false
            },
            "searchInfo": {
                "textSnippet": "dx + d ( <b>1</b>/2 x ) / dx - d ( 2 ) / dx = 5e 5x - 4x + 12 1.7.4 . Hitunglah : a ) . Sa z dx ; b ) . S3x / ( <b>1</b> – 2x2 ) dx Jawab : + C s dx = $ x dx = -2+ x2 <b>1</b> + == + S 3x \\ ( <b>1</b> – 2x2 ) dx = ... ? Misal <b>1</b>-2x2 = u du = - 4xdx xdx = – 14 du S&nbsp;..."
            }
        },
    ...,
    ]
}
```

&nbsp;

## 5. GET /quotes

Description:

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
  "quote": "string",
  "author": "string",
  "category": "string"
}
```

&nbsp;

## 6. GET /news

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
    "status": "ok",
    "totalResults": 88,
    "articles": [
        {
            "source": {
                "id": null,
                "name": "Live Science"
            },
            "author": "Ben Turner",
            "title": "Enormous 'Swiss cheese' bubble surrounding Earth mapped in incredible new images - Livescience.com",
            "description": "The gigantic bubble was created by multiple supernova explosions",
            "url": "https://www.livescience.com/local-bubble-magentic-field-mapped",
            "urlToImage": "https://cdn.mos.cms.futurecdn.net/oGSaZLyMSALsGiMZKjhJJA-1200-80.png",
            "publishedAt": "2023-01-11T20:45:29Z",
            "content": "An enormous,1,000-light-year-wide \"superbubble\" surrounds our planet. Now, astronomers have made the first ever 3D map of its magnetic field.\r\nThe gigantic structure, known as the \"Local Bubble,\" is … [+4074 chars]"
        },
      ...,
    ]
}
```

&nbsp;

## 7. POST /mybooks

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- body:

```json
{
    "title": "string",
    "code": "string",
    "authors": "string",
    "imageUrl": "string",
    "publisher": "string",
    "publishedDate": "string",
    "pageCount": "integer",
    "isbn": "string",
    "price": "integer",
    "description": "string",
    "UserId": "integer"
}
```

_Response (201 - created)_

```json
{
    "id": "integer",
    "title": "string",
    "code": "string",
    "authors": "string",
    "imageUrl": "string",
    "publisher": "string",
    "publishedDate": "string",
    "pageCount": "integer",
    "isbn": "string",
    "price": "integer",
    "description": "string",
    "status": "string",
    "UserId": "integer"
}
```

&nbsp;
 
## 8. GET /mybooks

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
        "id": 2,
        "title": "Example Book",
        "code": "eXaMpLe",
        "authors": "Mr. example",
        "imageUrl": "https://cdn.pixabay.com/photo/2019/03/01/18/32/night-4028339__480.jpg",
        "publisher": "Example Co. Ltd.",
        "publishedDate": "2022-11-01",
        "pageCount": 200,
        "isbn": "99999999999",
        "price": 86000,
        "description": "just description",
        "status": "Want to read",
        "UserId": 2
    }
]
```

&nbsp;

## 9. PATCH /mybooks/:id

Description:

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
  "message": "Reading progress has been updated"
}
```

_Response (404 - Data Not Found)_

```json
{
	"message": "Book not found"
}
```

&nbsp;

## 10. GET /mybooks/:id

Description:

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
    "id": 2,
    "title": "Example Book",
    "code": "eXaMpLe",
    "authors": "Mr. example",
    "imageUrl": "https://cdn.pixabay.com/photo/2019/03/01/18/32/night-4028339__480.jpg",
    "publisher": "Example Co. Ltd.",
    "publishedDate": "2022-11-01",
    "pageCount": 200,
    "isbn": "99999999999",
    "price": 86000,
    "description": "just description",
    "status": "Want to read",
    "UserId": 2
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Book not found"
}
```

&nbsp;

## Global Error

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
OR
{
  "message": "Invalid email or password"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "You are unauthorized"
}
```

_Response (404 - Data Not Found)_

```json
{
  "message": "Book not found"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```