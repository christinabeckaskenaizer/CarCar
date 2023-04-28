# CarCar

Team:

- Avisha Kumar - Service
- Christina Beck-Askenaizer - Sales

## Design

CarCar is an application designed for use by dealership overseers, that allows them to manage a few different aspects of the dealership, such as inventory, employees, customers(potential and current), and sales. This application is built using a React frontend and a Django backend, which consists of three microservices: Inventory, Sales, and Service. Both the sales and and service microservices poll data from the inventory API every _60 seconds_.

Please see below for a diagram that illustrates our three microservices in the application and how they interact with one another. Each microservice's ports, URLs, and models are defined below.

![Finalized Diagram](/images/Finalized%20Excalidraw.png)

## Initial setup

In order to get started, please install and run [Docker Desktop](https://docs.docker.com/get-docker/).

## Cloning and Docker

- Clone this repository onto your machine by proceeding to your terminal and navigating to the directory you want this project to exist.
- Type git clone https://gitlab.com/kumaravisha96/project-beta
- Change directories to your newly cloned repository
- To get Docker up and running, enter the lines below into your terminal:
  &nbsp;&nbsp;&nbsp;&nbsp;1. docker volume create beta-data
  &nbsp;&nbsp;&nbsp;&nbsp;2. docker-compose build
  &nbsp;&nbsp;&nbsp;&nbsp;3. docker-compose up
- This project consists of seven containers that must be running in order to get the full functionality of the app.

## Run the Server

- Once you have successfully run your Docker containers, you can access CarCar at http://localhost:3000/. Once there, you can use our navigation bar to direct you to your desired feature(s). See below for more navigation bar details.

## Navigation Bar Breakdown

<u>**Inventory Features**</u>

- Create a Manufacturer
- Manufacturers
- Create a Model
- Models
- Create an Automobile
- Automobiles

<u>**Sales Features**</u>

- Add a Salesperson
- Salespeople
- Add a Customer
- Customers
- Add a Sale
- Sales
- Salesperson History

<u>**Service Features**</u>

- Add a Technician
- Technicians
- Create a Service Appointment
- Service Appointments
- Service History

## Inventory microservice

## Models

1. **Manufacturer** - Contains a name field.
2. **VehicleModel** - Contains a name, picture_url field. Also, a manufacturer field with a foreign key to the Manufacturer model.
3. **Automobile** - Contains a color, year, vin, and sold field. Also, a model fieeld with a foreign key to the VehicleModel model.

| Action                  | Action Description and URL                                                                                                                 | JSON Body Input                                                                                                                                 | Returned Information                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Create a Manufacturer   | <ul><li>Add a manufacturer using the Manufacturer Model</li><li>Method: POST</li><li>http://localhost:8100/api/manufacturers/</li></ul>    | { <br/>"name": "Chrysler"<br/>}                                                                                                                 | {<br/>"href": "/api/manufacturers/1/",<br/>"id": 1,<br/>"name": "Chrysler"<br/>}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| List all Manufacturers  | <ul><li>List all manufacturers using the Manufacturer Model</li><li>Method: GET</li><li>http://localhost:8100/api/manufacturers/</li></ul> | None                                                                                                                                            | {<br/>"manufacturers": [<br/> {"href": "/api/manufacturers/1/",<br/>"id": 1,<br/>"name": "Chrysler" }]<br/>}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| Add a Vehicle Model     | <ul><li>Add a Vehicle Model using the VehicleModel Model</li><li>Method: POST</li><li>http://localhost:8100/api/models/</li></ul>          | {<br/> "name": "Q4",<br/> "picture_url": "https://cdn.arstechnica.net/wp-content/uploads/2022/07/4E9A8861.jpg",<br/> "manufacturer_id": 1<br/>} | {<br/>"href": "/api/models/4/",<br/> "id": 4,<br/> "name": "Q4",<br/> "picture_url": "https://cdn.arstechnica.net/wp-content/uploads/2022/07/4E9A8861.jpg",<br/> "manufacturer": {<br/>&nbsp;&nbsp;&nbsp;"href": "/api/manufacturers/1/",<br/> &nbsp;&nbsp;&nbsp;"id": 1,<br/>&nbsp;&nbsp;&nbsp;"name": "Chrysler"<br/> }<br/>}                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| List all Vehicle Models | <ul><li>List all Vehicle Models using the VehicleModel Model</li><li>Method: GET</li><li> http://localhost:8100/api/models/</li></ul>      | None                                                                                                                                            | {<br>&nbsp;&nbsp;&nbsp;"models": [<br>&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"href": "/api/models/1/",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"id": 1,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"name": "Spark",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"picture_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUPVmruZoQj3-PzbdOTKWBxoynXsJuWUAGTQ&usqp=CAU",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"manufacturer": {<br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"href": "/api/manufacturers/1/",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"id": 1,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"name": "Chrysler"<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;} <br>&nbsp;&nbsp; ] <br>} |
| Create an automobile    | <ul><li>Create an automobile using the Automobile model</li><li>Method: POST</li><li>http://localhost:8100/api/automobiles/</li></ul>      | {<br/>"automobile": "HFYRH64HEFSVZCSDQ",<br/>"salesperson": "CRey",<br/>"customer": "9095554321",<br/>"price": 5000.000<br/>}                   | HERE!                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| List all automobiles    | <ul><li>List all automobiles using the Automobile Model</li><li>Method: GET</li><li>http://localhost:8100/api/automobiles/</li></ul>       | None                                                                                                                                            | d                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |

## Service microservice

Explain your models and integration with the inventory
microservice, here.

## Sales microservice

The sales microservice allows for creation of a salesperson, a customer, and a new sale. It also maintains lists of salespeople, customers, and sales.

## Models

1. **Salesperson** - Contains a first_name, last_name, and employee_id field.
2. **Customer** - Contains a first_name, last_name, address, and phone_number field.
3. **Sale** - Contains a salesperson, customer, automobile, and price field. The salesperson field is a foreign key to the _Salesperson_ model, the customer field is a foreign key to the _Customer_ model, and the automobile field is a foreign key to the _AutomobileVO_ model.
4. **AutomobileVO** - This model is our value object - it polls for data from the automobile Model in the Inventory API. When a model is updated/created in the Inventory API, that data is sent to our AutomobileVO model by using the VIN number to identify which automobile to update.

| Action               | Action Description and URL                                                                                                            | JSON Body Input                                                                                                                   | Returned Information                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Add a Salesperson    | <ul><li>Add a salesperson using the Salesperson Model</li><li>Method: POST</li><li>http://localhost:8090/api/salespeople/</li></ul>   | {<br />"first_name": "Lemon",<br /> "last_name": "Head",<br /> "employee_id": "LHea"<br />}                                       | {<br />"first_name": "Lemon",<br /> "last_name": "Head",<br /> "employee_id": "LHea"<br />}                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| List all Salespeople | <ul><li>List all salespeople using the Salesperson Model</li><li>Method: GET</li><li>http://localhost:8090/api/salespeople/</li></ul> | None                                                                                                                              | {<br />"salespersons": [<br />{"first_name": "Christina",<br />"last_name": "Reyes",<br />"employee_id": "CRey"<br />}]<br />}                                                                                                                                                                                                                                                                                                                                                                                                                        |
| Add a Customer       | <ul><li>Add a customer using the Customer Model</li><li>Method: POST</li><li> http://localhost:8090/api/customers/</li></ul>          | {<br />"first_name": "Cherry",<br />"last_name": "Garcia",<br />"address": "425 Elm St",<br />"phone_number": "9096846101"<br />} | {<br />"first_name": "Cherry",<br />"last_name": "Garcia",<br />"address": "425 Elm St",<br />"phone_number": "9096846101"<br />}                                                                                                                                                                                                                                                                                                                                                                                                                     |
| List all Customers   | <ul><li>List all Customers using the Customer Model</li><li>Method: GET</li><li> http://localhost:8090/api/customers/</li></ul>       | None                                                                                                                              | {<br />"customers": [<br />{<br />"first_name": "Cherry",<br />"last_name": "Garcia",<br />"address": "425 Elm St",<br />"phone_number": "9096846101"<br />}]<br />}                                                                                                                                                                                                                                                                                                                                                                                  |
| Record a New Sale    | <ul><li>Add a sale using the Sale model</li><li>Method: POST</li><li>http://localhost:8090/api/salespeople/</li></ul>                 | {<br/>"automobile": "HFYRH64HEFSVZCSDQ",<br/>"salesperson": "CRey",<br/>"customer": "9095554321",<br/>"price": 5000.000<br/>}     | {<br/>"automobile": {<br/>&nbsp;&nbsp;&nbsp;&nbsp;"vin": "HFYRH64HEFSVZCSDQ"<br/>},<br/>"salesperson": {<br/>&nbsp;&nbsp;&nbsp;&nbsp;"first_name": "Christina",<br/>&nbsp;&nbsp;&nbsp;&nbsp;"last_name": "Reyes",<br/>&nbsp;&nbsp;&nbsp;&nbsp;"employee_id": "CRey"<br/>},<br/>customer": {<br/>&nbsp;&nbsp;&nbsp;&nbsp;"first_name": "Crispy",<br/>&nbsp;&nbsp;&nbsp;&nbsp;"last_name": "Tuna",<br/>&nbsp;&nbsp;&nbsp;&nbsp;"address": "1460 Gilbert Ct",<br/>&nbsp;&nbsp;&nbsp;&nbsp;"phone_number": "9095554321"<br/>}, <br/>"price": 5000.0<br/>} |
| List all Sales       | <ul><li>List all sales using the Sales Model</li><li>Method: GET</li><li>http://localhost:8090/api/salespeople/</li></ul>             | None                                                                                                                              | d                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
