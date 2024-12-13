### API Requirements for Slide CRUD Operations 
**1. Create a Slide**  
- **Method** : `POST`
 
- **Endpoint** : `/api/slides`
 
- **Description** : Creates a new slide with the specified properties.
 
- **Request Body** :

```json
{
    "order": 1,
    "backgroundType": "Solid",
    "backgroundValue": "#ffffff"
}
```

 
  - `order`: (Optional) Order of the slide in the presentation (default is `0`).
 
  - `backgroundType`: (Optional) Type of the background (`Solid`, `Gradient`, `Image`).
 
  - `backgroundValue`: (Optional) Value of the background (default is `#ffffff`).
 
- **Responses** : 
  - **200 Ok** : The slide was created successfully.
  - **400 Bad Request** : The request contains invalid data.




**2. Retrieve a Slide**  
- **Method** : `GET`
 
- **Endpoint** : `/api/slides/{id}`
 
- **Description** : Retrieves a slide by its ID.
 
- **Path Parameters** : 
  - `id`: (Required) GUID of the slide to retrieve.
 
- **Responses** : 
  - **200 OK** : Returns the details of the slide.

```json
{
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "order": 1,
    "backgroundType": "Solid",
    "backgroundValue": "#ffffff"
}
```
 
  - **404 Not Found** : No slide found with the specified ID.
 
  - **400 Bad Request** : Invalid ID format (not a valid GUID).




**3. Update a Slide**  
- **Method** : `PUT`
 
- **Endpoint** : `/api/slides/{id}`
 
- **Description** : Updates the properties of an existing slide.
 
- **Path Parameters** : 
  - `id`: (Required) GUID of the slide to update.
 
- **Request Body** :

```json
{
    "order": 2,
    "backgroundType": "Gradient",
    "backgroundValue": "#ffffff,#000000"
}
```
 
  - `order`: (Optional) Updated order of the slide.
 
  - `backgroundType`: (Optional) Updated type of the background.
 
  - `backgroundValue`: (Optional) Updated value of the background.
 
- **Responses** : 
  - **200 OK** : The slide was updated successfully.

```json
{
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "order": 2,
    "backgroundType": "Gradient",
    "backgroundValue": "#ffffff,#000000"
}
```
 
  - **404 Not Found** : No slide found with the specified ID.
 
  - **400 Bad Request** : Invalid data in the request body.




**4. Delete a Slide**  
- **Method** : `DELETE`
 
- **Endpoint** : `/api/slides/{id}`
 
- **Description** : Deletes a slide by its ID.
 
- **Path Parameters** : 
  - `id`: (Required) GUID of the slide to delete.
 
- **Responses** : 
  - **204 No Content** : The slide was deleted successfully.
 
  - **404 Not Found** : No slide found with the specified ID.
 
  - **400 Bad Request** : Invalid ID format (not a valid GUID).





### Additional Notes 
 
1. **Validation** : 
  - Ensure `id` is a valid GUID.
 
  - Validate `backgroundType` against allowed enum values (`Solid`, `Gradient`, `Image`).
 
  - Validate `backgroundValue` format: 
    - If `backgroundType` is `Solid`, it should be a valid HEX color code (e.g., `#ffffff`).
 
    - If `backgroundType` is `Gradient`, it should contain a valid css gradient expression.
 
    - If `backgroundType` is `Image`, it should be a valid URL.
 
2. **Error Handling** :
  - Ensure appropriate error codes and user-friendly messages are returned.

  - Log all unexpected errors for debugging.

