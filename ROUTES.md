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
  "history": [
    {
      "lat": "-12.135106",
      "lng": "-77.024327",
      "state": "finish",
      "created_at": "2019-05-15T21:54:13.451Z",
      "updatedAt": "2019-05-15T21:54:13.451Z",
      "bicycle_code": "codigo1",
      "bicycle_brand": "marca1",
      "bicycle_image_url": "http://localhost:3000/public/upload/codigo1.jpg"
    },
    {
      "lat": "-12.135106",
      "lng": "-77.024327",
      "state": "finish",
      "created_at": "2019-05-15T21:49:57.417Z",
      "updatedAt": "2019-05-15T21:49:57.417Z",
      "bicycle_code": "codigo1",
      "bicycle_brand": "marca1",
      "bicycle_image_url": "http://localhost:3000/public/upload/codigo1.jpg"
    }
  ]
}
```

### /allLocations  
* **Method:** GET  
* **JSON:**  
```json
{
  "locations": [
    {
      "lat": "-12.135106", 
      "lng": "-77.024327", 
      "time": "2019-5-15|16:54:13",
      "bicycle_code": "codigo1",
      "bicycle_brand": "marca1",
      "bicycle_image_url": "http://localhost:3000/public/upload/codigo1.jpg"
    },
    {
      "lat": "-12.135106",
      "lng": "-77.024327",
      "time": "2019-6-18|18:50:41",
      "bicycle_code": "codigo2",
      "bicycle_brand": "marca2",
      "bicycle_image_url": "http://localhost:3000/public/upload/codigo2.jpg"
    }
  ]
}
```
