# ROUTES

### /loginGmail
* **Method:** POST
* **JSON:**
```json
{
  "givenName": "José Leonidas",
  "familyName": "García Gonzales",
  "email": "jose.garcia@utec.edu.pe",
  "googleId": "116723637483739158672"
}
```

### /flip
* **Method:** POST
* **JSON:**
```json
{
  "code": "elCodigoDeLaBicicleta",
  "lat": "-12.133538",
  "lng": "-77.023243",
  "state": "start",
  "googleId": "116723637483739159972" 
}
```

`state` puede ser "start" o "finish"

### /history/:googleId
* **Method:** GET
* **JSON:**
```json
{
  "history" : [
    {
      "_id": "5cdc8a85e5e43f1b95ca8424",
      "bicycle": "5cdc897ca0ae831abbc5c726",
      "lat": "-12.135106",
      "lng": "-77.024327",
      "state": "finish",
      "googleId": "116723637483739159972", 
      "created_at": "2019-05-15T21:54:13.451Z",
      "updatedAt": "2019-05-15T21:54:13.451Z",
      "__v":0,
      "id": "5cdc8a85e5e43f1b95ca8424"
    },
    {
      "_id": "5cdc8985a0ae831abbc5c727",
      "bicycle": "5cdc897ca0ae831abbc5c726",
      "lat": "-12.135106",
      "lng": "-77.024327",
      "state": "finish",
      "googleId": "116723637483739159972",
      "created_at": "2019-05-15T21:49:57.417Z",
      "updatedAt": "2019-05-15T21:49:57.417Z",
      "__v": 0,
      "id": "5cdc8985a0ae831abbc5c727"
    }
  ]
}
```
