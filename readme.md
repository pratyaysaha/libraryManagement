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

