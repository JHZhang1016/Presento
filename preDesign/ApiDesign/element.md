**Elements API Documentation** 



**1. Create an Element**  
- **Method** : `POST`
 
- **Endpoint** : `/api/slides/{slideId}/elements`
 
- **Description** : Creates a new element and associates it with a specific slide.
 
- **Request Body** :


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
 
- **Response** : 
  - **201 Created** : Returns the created element details.
 
  - **400 Bad Request** : If the request data is invalid.
 
  - **404 Not Found** : If the slide does not exist.
 
- **Example Response** :


```json
{
    "id": "uuid",
    "message": "Element created successfully"
}
```




**2. Update an Element**  
- **Method** : `PUT`
 
- **Endpoint** : `/api/slides/{slideId}/elements/{id}`
 
- **Description** : Updates the properties of an existing element within a slide.
 
- **Request Body** :


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
 
- **Response** : 
  - **200 OK** : Returns the updated element details.
 
  - **400 Bad Request** : If the request data is invalid.
 
  - **404 Not Found** : If the element or slide does not exist.
 
- **Example Response** :


```json
{
    "id": "uuid",
    "message": "Element updated successfully"
}
```




**3. Delete an Element**  
- **Method** : `DELETE`
 
- **Endpoint** : `/api/slides/{slideId}/elements/{id}`
 
- **Description** : Deletes a specific element within a slide by its ID.
 
- **Response** : 
  - **204 No Content** : If the element was successfully deleted.
 
  - **404 Not Found** : If the element or slide does not exist.




**4. Get an Element by ID**  
- **Method** : `GET`
 
- **Endpoint** : `/api/slides/{slideId}/elements/{id}`
 
- **Description** : Retrieves a specific element by its ID within a slide.
 
- **Response** : 
  - **200 OK** : Returns the element details.
 
  - **404 Not Found** : If the element or slide does not exist.
 
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




**5. Get All Elements by Slide**  
- **Method** : `GET`
 
- **Endpoint** : `/api/slides/{slideId}/elements`
 
- **Description** : Retrieves all elements associated with a specific slide.
 
- **Response** : 
  - **200 OK** : Returns the list of elements.
 
  - **404 Not Found** : If the slide does not exist.
 
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




**6. Batch Update Elements**  
- **Method** : `POST`
 
- **Endpoint** : `/api/slides/{slideId}/elements/batch-update`
 
- **Description** : Updates multiple elements associated with a specific slide.
 
- **Request Body** :


```json
[
    {
        "id": "uuid",
        "positionX": 110,
        "positionY": 220,
        "height": 320,
        "width": 420,
        "zIndex": 2,
        "details": {
            "textValue": "Updated Text",
            "fontColor": "#FF0000"
        }
    },
    {
        "id": "uuid2",
        "positionX": 160,
        "positionY": 260,
        "details": {
            "videoUrl": "https://example.com/updated-video.mp4",
            "isAutoPlay": false
        }
    }
]
```
 
- **Response** : 
  - **200 OK** : Returns a list of successfully updated elements and errors for failed updates.
 
  - **400 Bad Request** : If the request data is invalid.
 
  - **404 Not Found** : If the slide or any element does not exist.
 
- **Example Response** :


```json
{
    "updated": [
        {
            "id": "uuid",
            "message": "Element updated successfully"
        },
        {
            "id": "uuid2",
            "message": "Element updated successfully"
        }
    ],
    "failed": []
}
```