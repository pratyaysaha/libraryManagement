### Learn about the endpoints

- ```GET  /book ``` takes to the book pages
- ```GET  /api ``` for api routing
- ```POST /api/book ``` for adding new books
- ```GET  /api/book ``` gives all the books present inside book database
- ```GET  /api/book?isbn=<isbn number>``` gives the book matching the ISBN of the book or else returns empty array
- ```GET /api/book?``` 
    - Parameters 
        - ```name=<book name>```   
        - ```publisher=<pblisher name>```
        - ```author=<author names>``` :  replace ```<author names>``` by comma-separated exact names ( case sensitive ). Example :
        ``` author=hg wells, lewis carroll ```
        - ```yop=<year of publication>``` : searchby year of publication
        




### Error Codes 
- ```10```  : (book) Quantity exceeded error while PATCH method for updating the books quantity
- ```20```  : PATCH (book) failed, update book failure
- ```100``` : DELETE (book) failed, ISBN not found
- ```200``` : DELETE (book) failed
- ```101``` : POST (book) FAILED, New book addition failed, reason vary. Check for details in ```error```
- ```102``` : GET (book) FAILED, ISBN search failed. ISBN is not a number
- ```103``` : GET (book) FAILED, Any query parameter is wrong or there is a Database error. Check ```error``` for more details
- ```21```  : Password Hashing Error
- ```22```  : POST (user) failed, Validation Error, Database error
- ```23```  : Credential Error (format not correct). More than two argument
- ```24```  : Credential Error (format not correct). Less than two
ardument
- ```25```  : Creedential Error. User not Found / Password not found
- ```26```  : GET (user) failed.
- ```27```  : PATCH (user) failed.
- ```28```  : DELETE (user) failed