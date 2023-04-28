# CarCar

Team:

- Avisha Kumar - Service
- Christina Beck-Askenaizer - Sales

## Design

CarCar is an application designed for use by dealership overseers, that allows them to manage a few different aspects of the dealership, such as inventory, employees, customers(potential and current), and sales. This application is built using a React frontend and a Django backend, which consists of three microservices: Inventory, Sales, and Service. Both the sales and and service microservices poll data from the inventory API every 60 seconds.

Please see below for a diagram that illustrates our three microservices in the application and how they interact with one another. Each microservice's ports, URLs, and models are defined below.

![alt text](image.png)

## Initial setup

## Inventory microservice

## Service microservice

Explain your models and integration with the inventory
microservice, here.

## Sales microservice

The sales microservice allows for creation of a salesperson, a customer, and a new sale. It also maintains lists of salespeople, customers, and sales.

####Models

1. **Salesperson** - Contains a first_name, last_name, and employee_id field.
2. **Customer** - Contains a first_name, last_name, address, and phone_number field.
3. **Sale** - contains a salesperson, customer, automobile, and price field. The salesperson field is a foreign key to the _Salesperson_ model, the customer field is a foreign key to the _Customer_ model, and the automobile field is a foreign key to the _AutomobileVO_ model.
4. **AutomobileVO**

| Action               | Action Description and URL                                                                                                            | JSON Body Input                                                                                                                   | Returns                                                                                                                                                              |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Add a Salesperson    | <ul><li>Add a salesperson using the Salesperson Model</li><li>Method: POST</li><li>http://localhost:8090/api/salespeople/</li></ul>   | {<br />"first_name": "Lemon",<br /> "last_name": "Head",<br /> "employee_id": "LHea"<br />}                                       | {<br />"first_name": "Lemon",<br /> "last_name": "Head",<br /> "employee_id": "LHea"<br />}                                                                          |
| List all Salespeople | <ul><li>List all salespeople using the Salesperson Model</li><li>Method: GET</li><li>http://localhost:8090/api/salespeople/</li></ul> | None                                                                                                                              | {<br />"salespersons": [<br />{"first_name": "Christina",<br />"last_name": "Reyes",<br />"employee_id": "CRey"<br />}]<br />}                                       |
| Add a Customer       | <ul><li>Add a customer using the Customer Model</li><li>Method: POST</li><li> http://localhost:8090/api/customers/</li></ul>          | {<br />"first_name": "Cherry",<br />"last_name": "Garcia",<br />"address": "425 Elm St",<br />"phone_number": "9096846101"<br />} | {<br />"first_name": "Cherry",<br />"last_name": "Garcia",<br />"address": "425 Elm St",<br />"phone_number": "9096846101"<br />}                                    |
| List all Customers   | <ul><li>List all Customers using the Customer Model</li><li>Method: GET</li><li> http://localhost:8090/api/customers/</li></ul>       | None                                                                                                                              | {<br />"customers": [<br />{<br />"first_name": "Cherry",<br />"last_name": "Garcia",<br />"address": "425 Elm St",<br />"phone_number": "9096846101"<br />}]<br />} |
| Record a New Sale    | <ul><li>Add a sale using the Sale model</li><li>Method: POST</li><li>http://localhost:8090/api/salespeople/</li></ul>                 | {<br/>"automobile": "HFYRH64HEFSVZCSDQ",<br/>"salesperson": "CRey",<br/>"customer": "9095554321",<br/>"price": 5000.000<br/>}     | HERE!!!!                                                                                                                                                             |
| List all Sales       | <ul><li>List all sales using the Sales Model</li><li>Method: GET</li><li>http://localhost:8090/api/salespeople/</li></ul>             | None                                                                                                                              | d                                                                                                                                                                    |

{<br/>"automobile": {<br/>&nbsp;&nbsp;&nbsp;&nbsp;"vin": "HFYRH64HEFSVZCSDQ"<br/>},<br/>"salesperson": {<br/>&nbsp;&nbsp;&nbsp;&nbsp;"first_name": "Christina",<br/>&nbsp;&nbsp;&nbsp;&nbsp;"last_name": "Reyes",<br/>&nbsp;&nbsp;&nbsp;&nbsp;"employee_id": "CRey"<br/>},<br/>customer": {<br/>&nbsp;&nbsp;&nbsp;&nbsp;"first_name": "Crispy",<br/>&nbsp;&nbsp;&nbsp;&nbsp;"last_name": "Tuna",<br/>&nbsp;&nbsp;&nbsp;&nbsp;"address": "1460 Gilbert Ct",<br/>&nbsp;&nbsp;&nbsp;&nbsp;"phone_number": "9095554321"<br/>},
<br/>"price": 5000.0<br/>}
