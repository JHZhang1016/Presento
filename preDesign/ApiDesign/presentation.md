## Presentation API
### 1. Get All Presentations
- **Method** : `GET`
 
- **Endpoint** : `/api/presentations`
 
- **Description** : Retrieves a list of all presentations.
 
- **Response** : 
  - **200 OK** : Returns the list of presentations.
 
  - **404 Not Found**  or **500 Internal Server Error** : If an error occurs.


### 2. Get Presentation by ID
- **Method** : `GET`
 
- **Endpoint** : `/api/presentations/{id}`
 
- **Description** : Retrieves details of a specific presentation by its ID.
 
- **Response** : 
  - **200 OK** : Returns the presentation details.
 
  - **404 Not Found** : If the presentation does not exist.


### 3. Create a Presentation
- **Method** : `POST`
 
- **Endpoint** : `/api/presentations`
 
- **Description** : Creates a new presentation.
 
- **Request Body** :

```json
{
    "title": "Presentation Title",
    "description": "Optional description",
    "thumbnailUrl": "https://example.com/image.jpg",
    "defaultBackgroundType": "Solid",
    "defaultBackgroundValue": "#FFFFFF"
}
```
 
- **Response** : 
  - **201 Created** : Returns the created presentation details.
 
  - **400 Bad Request** : If the request data is invalid.


### 4. Update a Presentation
- **Method** : `PUT`
 
- **Endpoint** : `/api/presentations/{id}`
 
- **Description** : Updates the details of an existing presentation.
 
- **Request Body** :

```json
{
    "title": "Updated Title",
    "description": "Updated description",
    "thumbnailUrl": "https://example.com/image.jpg",
    "defaultBackgroundType": "Gradient",
    "defaultBackgroundValue": "linear-gradient(to right, #ff0000, #00ff00)"
}
```
 
- **Response** : 
  - **200 OK** : Returns the updated presentation details.
 
  - **404 Not Found** : If the presentation does not exist.
 
  - **400 Bad Request** : If the request data is invalid.


### 5. Delete a Presentation
- **Method** : `DELETE`
 
- **Endpoint** : `/api/presentations/{id}`
 
- **Description** : Deletes a specific presentation by its ID.
 
- **Response** : 
  - **204 No Content** : If the presentation was successfully deleted.
 
  - **404 Not Found** : If the presentation does not exist.
