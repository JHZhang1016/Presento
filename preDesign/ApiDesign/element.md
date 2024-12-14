**Element API** 
**1. Get All Elements by Slide**  
- **Method**  : `GET`
 
- **Endpoint**  : `/api/slides/{slideId}/elements`
 
- **Description**  : Retrieves all elements associated with a specific slide.
 
- **Request Parameters**  : None.
 
- **Response**  : 
  - **200 OK**  : Returns the list of elements.
 
  - **404 Not Found**  : If the slide does not exist.
 
- **Example Response** :


```json
[
    {
        "id": "uuid",
        "positionX": 100,
        "positionY": 200,
        "height": 300,
        "width": 400,
        "zIndex": 1,
        "type": "Text",
        "details": {
            "textValue": "Sample Text",
            "fontColor": "#000000",
            "fontSize": 16,
            "fontFamily": "Arial"
        }
    },
    {
        "id": "uuid2",
        "positionX": 150,
        "positionY": 250,
        "height": 200,
        "width": 300,
        "zIndex": 2,
        "type": "Video",
        "details": {
            "videoUrl": "https://example.com/video.mp4",
            "isAutoPlay": true
        }
    }
]
```


---

**2. Get an Element by ID**  
- **Method**  : `GET`
 
- **Endpoint**  : `/api/slides/{slideId}/elements/{id}`
 
- **Description**  : Retrieves a specific element by its ID within a slide.
 
- **Response**  : 
  - **200 OK**  : Returns the element details.
 
  - **404 Not Found**  : If the element or slide does not exist.
 
- **Example Response** :


```json
{
    "id": "uuid",
    "positionX": 100,
    "positionY": 200,
    "height": 300,
    "width": 400,
    "zIndex": 1,
    "type": "Text",
    "details": {
        "textValue": "Sample Text",
        "fontColor": "#000000",
        "fontSize": 16,
        "fontFamily": "Arial"
    }
}
```


---

**3. Create an Element**  
- **Method**  : `POST`
 
- **Endpoint**  : `/api/slides/{slideId}/elements`
 
- **Description**  : Creates a new element and associates it with a specific slide.
 
- **Request Body**  :


```json
{
    "positionX": 100,
    "positionY": 200,
    "height": 300,
    "width": 400,
    "zIndex": 1,
    "type": "Text",
    "details": {
        "textValue": "Sample Text",
        "fontColor": "#000000",
        "fontSize": 16,
        "fontFamily": "Arial"
    }
}
```
 
- **Response**  : 
  - **201 Created**  : Returns the created element details.
 
  - **400 Bad Request**  : If the request data is invalid.
 
  - **404 Not Found**  : If the slide does not exist.
 
- **Example Response** :


```json
{
    "id": "uuid",
    "message": "Element created successfully"
}
```


---

**4. Update an Element**  
- **Method**  : `PUT`
 
- **Endpoint**  : `/api/slides/{slideId}/elements/{id}`
 
- **Description**  : Updates the properties of an existing element within a slide.
 
- **Request Body**  :


```json
{
    "positionX": 150,
    "positionY": 250,
    "details": {
        "textValue": "Updated Text",
        "fontColor": "#FF0000"
    }
}
```
 
- **Response**  : 
  - **200 OK**  : Returns the updated element details.
 
  - **400 Bad Request**  : If the request data is invalid.
 
  - **404 Not Found**  : If the element or slide does not exist.


---

**5. Delete an Element**  
- **Method**  : `DELETE`
 
- **Endpoint**  : `/api/slides/{slideId}/elements/{id}`
 
- **Description**  : Deletes a specific element within a slide by its ID.
 
- **Response**  : 
  - **204 No Content**  : If the element was successfully deleted.
 
  - **404 Not Found**  : If the element or slide does not exist.


---

**6. Move an Element to Another Slide**  
- **Method**  : `PUT`
 
- **Endpoint**  : `/api/elements/{id}/move`
 
- **Description**  : Moves an element to a different slide.
 
- **Request Body**  :


```json
{
    "newSlideId": "uuid"
}
```
 
- **Response**  : 
  - **200 OK**  : Confirms the element was moved successfully.
 
  - **404 Not Found**  : If the element or target slide does not exist.
 
- **Example Response** :


```json
{
    "message": "Element moved successfully"
}
```
