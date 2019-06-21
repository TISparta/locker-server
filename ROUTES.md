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
      "lat_from": "-12.135106",
      "lng_from": "-77.024327",
      "lat_from": "-13.135106",
      "lng_from": "-74.024327",
      "start": "2019-06-21  10:44:08",
      "finish": "2019-06-21  10:44:38",
      "bicycle_code": "codigo1",
      "bicycle_brand": "marca1",
      "bicycle_image_url": "http://localhost:3000/public/upload/codigo1.jpg",
      "givenName": "Jose Leonidas",
      "familyName": "Garcia Gonzales",
      "email": "jose.garcia@utec.edu.pe"
    },
    {
      "lat_from": "-11.135106",
      "lng_from": "-76.024327",
      "lat_from": "-19.135106",
      "lng_from": "-79.024327",
      "start": "2019-06-21  10:44:08",
      "finish": "2019-06-21  10:44:38",
      "bicycle_code": "codigo2",
      "bicycle_brand": "marca2",
      "bicycle_image_url": "http://localhost:3000/public/upload/codigo2.jpg",
      "givenName": "Otro nombre",
      "familyName": "Apellidos",
      "email": "whatever@utec.edu.pe"
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
      "bicycle_image_url": "http://localhost:3000/public/upload/codigo1.jpg",
      "bicycle_active": true
    },
    {
      "lat": "-12.135106",
      "lng": "-77.024327",
      "time": "2019-6-18|18:50:41",
      "bicycle_code": "codigo2",
      "bicycle_brand": "marca2",
      "bicycle_image_url": "http://localhost:3000/public/upload/codigo2.jpg",
      "bicycle_active": false
    }
  ]
}
```

### /start/:googleId/:bicycleCode/:lat/:lng
* **Method:** GET
* **JSON:**
```json
{
  "message": "OK"
}
```
* **Error:** StatusCode = 400

### /finish/:googleId/:bicycleCode/:lat/:lng
* **Method:** GET
* **JSON:**
```json
{
  "message": "OK"
}
```
* **Error:** StatusCode = 400

