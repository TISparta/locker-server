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
  "state": "start"
}
```

`state` puede ser "start" o "finish"
