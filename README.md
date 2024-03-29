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

**Cloning and Docker**

- Clone this repository onto your machine by proceeding to your terminal and navigating to the directory you want this project to exist.
- Type git clone https://gitlab.com/kumaravisha96/project-beta
- Change directories to your newly cloned repository
- To get Docker up and running, enter the lines below into your terminal:
  &nbsp;&nbsp;&nbsp;&nbsp;1. docker volume create beta-data
  &nbsp;&nbsp;&nbsp;&nbsp;2. docker-compose build
  &nbsp;&nbsp;&nbsp;&nbsp;3. docker-compose up
- This project consists of seven containers that must be running in order to get the full functionality of the app.

**Run the Server**

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

**Models**

1. **Manufacturer** - Contains a name field.
2. **VehicleModel** - Contains a name, picture_url field. Also, a manufacturer field with a foreign key to the Manufacturer model.
3. **Automobile** - Contains a color, year, vin, and sold field. Also, a model fieeld with a foreign key to the VehicleModel model.

| Action                  | Action Description and URL                                                                                                                 | JSON Body Input                                                                                                                                 | Returned Information                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Create a Manufacturer   | <ul><li>Add a manufacturer using the Manufacturer Model</li><li>Method: POST</li><li>http://localhost:8100/api/manufacturers/</li></ul>    | { <br/>"name": "Chrysler"<br/>}                                                                                                                 | {<br/>"href": "/api/manufacturers/1/",<br/>"id": 1,<br/>"name": "Chrysler"<br/>}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| List all Manufacturers  | <ul><li>List all manufacturers using the Manufacturer Model</li><li>Method: GET</li><li>http://localhost:8100/api/manufacturers/</li></ul> | None                                                                                                                                            | {<br/>"manufacturers": [<br/> {"href": "/api/manufacturers/1/",<br/>"id": 1,<br/>"name": "Chrysler" }]<br/>}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| Add a Vehicle Model     | <ul><li>Add a Vehicle Model using the VehicleModel Model</li><li>Method: POST</li><li>http://localhost:8100/api/models/</li></ul>          | {<br/> "name": "Q4",<br/> "picture_url": "https://cdn.arstechnica.net/wp-content/uploads/2022/07/4E9A8861.jpg",<br/> "manufacturer_id": 1<br/>} | {<br/>"href": "/api/models/4/",<br/> "id": 4,<br/> "name": "Q4",<br/> "picture_url": "https://cdn.arstechnica.net/wp-content/uploads/2022/07/4E9A8861.jpg",<br/> "manufacturer": {<br/>&nbsp;&nbsp;&nbsp;"href": "/api/manufacturers/1/",<br/> &nbsp;&nbsp;&nbsp;"id": 1,<br/>&nbsp;&nbsp;&nbsp;"name": "Chrysler"<br/> }<br/>}                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| List all Vehicle Models | <ul><li>List all Vehicle Models using the VehicleModel Model</li><li>Method: GET</li><li> http://localhost:8100/api/models/</li></ul>      | None                                                                                                                                            | {<br>&nbsp;&nbsp;&nbsp;"models": [<br>&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"href": "/api/models/1/",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"id": 1,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"name": "Spark",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"picture_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUPVmruZoQj3-PzbdOTKWBxoynXsJuWUAGTQ&usqp=CAU",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"manufacturer": {<br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"href": "/api/manufacturers/1/",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"id": 1,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"name": "Chrysler"<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;} <br>&nbsp;&nbsp; ] <br>} |
| Create an automobile    | <ul><li>Create an automobile using the Automobile model</li><li>Method: POST</li><li>http://localhost:8100/api/automobiles/</li></ul>      | {<br/>"color": "blue",<br/>"year": 2012<br/>"vin": "76HYSZFR43VIN7654",<br/>"model_id": 1,<br/>"sold": false<br/>}                              | {<br/>"href": "/api/automobiles/76HYSZFR43VIN7654/",<br/>"id": 13,<br/>"color": "blue",<br/>"year": 2012,<br/>"vin": "76HYSZFR43VIN7654",<br/>"model": {<br/>"href": "/api/models/1/",<br/>"id": 1,<br/>"name": "Spark",<br/>"picture_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUPVmruZoQj3-PzbdOTKWBxoynXsJuWUAGTQ&usqp=CAU",<br/>"manufacturer": {<br/>"href": "/api/manufacturers/1/",<br/>"id": 1,<br/>"name": "Chrysler"<br/>}<br/>},<br/>"sold": false<br/>}                                                                                                                                                                                                                                                                                          |
| List all automobiles    | List all automobiles using the Automobile Model</li><li>Method: GEThttp://localhost:8100/api/automobiles/</li></ul>                        | None                                                                                                                                            | {<br/>"autos": [<br/>{<br/>"href": "/api/automobiles/jds98d7f6d5s4wre3/",<br/>"id": 1,<br/>"color": "White",<br/>"year": 2020,<br/>"vin": "jds98d7f6d5s4wre3", <br/>"model": {<br/>"href": "/api/models/1/",<br/>"id": 1,<br/>"name": "Spark",<br/>"picture_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUPVmruZoQj3-PzbdOTKWBxoynXsJuWUAGTQ&usqp=CAU",<br/>"manufacturer": {<br/>"href": "/api/manufacturers/1/",<br/>"id": 1,<br/>"name": "Chrysler"<br/>}<br/>},<br/>"sold": true<br/>}<br/>]<br/>}                                                                                                                                                                                                                                                         |

## Service microservice

This application serves the purpose of:

- Helping people manage and keep track of their car service appointments
- Allow users to create appointments using a simple form
- Provide a list of scheduled appointments

#### Front-End

The application allows users to update the status of their appointments, indicating whether they have been cancelled or completed. Additionally, users can provide information about the assigned technicians through a dedicated form. Furthermore, the app provides access to a service history view, which enables users to review past car services.

#### Back-End

The back-end operations involve generating appointments and technician profiles, and storing their respective details.
To augment the overall user experience, the application incorporates an inventory microservice that utilizes the Vehicle Identification Number (VIN) to authenticate whether the automobile has already been sold by the dealership.

##### Polling

Every 60 seconds, the Service microservice polls the Inventory microservice for automobile updates

### RestFul API (PORT 8080):

#### Appointments

| Action                | Method | URL                                     |
| --------------------- | ------ | --------------------------------------- |
| List All Appointments | GET    | http://localhost:8080/api/appointments/ |

<details>
<summary><strong>List Appointments Output</strong></summary>
<br>

#### Output:

```
{
	"appointments": [
		{
			"id": 17,
			"vin": "1C3CC5FB2AN120174",
			"customer": "peppercat",
			"date_time": "2023-04-28T00:00:00+00:00",
			"technician": {
				"first_name": "Jay",
				"last_name": "Kumar",
				"employee_id": "12"
			},
			"reason": "makes funny sound",
			"vip": true,
			"status": false
		},
		{
			"id": 18,
			"vin": "1C3CC5FB2AN120174",
			"customer": "peppercat",
			"date_time": "2023-04-28T00:00:00+00:00",
			"technician": {
				"first_name": "Jay",
				"last_name": "Kumar",
				"employee_id": "12"
			},
			"reason": "makes funny sound",
			"vip": true,
			"status": false
		},
		{
			"id": 19,
			"vin": "1C3CC5FB2AN120174",
			"customer": "peppercat",
			"date_time": "2023-04-28T00:00:00+00:00",
			"technician": {
				"first_name": "Jay",
				"last_name": "Kumar",
				"employee_id": "12"
			},
			"reason": "makes funny sound",
			"vip": true,
			"status": false
		},
		{
			"id": 20,
			"vin": "1C3CC5FB2AN120174",
			"customer": "peppercat",
			"date_time": "2023-04-28T00:00:00+00:00",
			"technician": {
				"first_name": "Jay",
				"last_name": "Kumar",
				"employee_id": "12"
			},
			"reason": "makes funny sound",
			"vip": true,
			"status": false
		},
		{
			"id": 21,
			"vin": "1C3CC5FB2AN120174",
			"customer": "peppercat",
			"date_time": "2023-04-28T00:00:00+00:00",
			"technician": {
				"first_name": "Jay",
				"last_name": "Kumar",
				"employee_id": "12"
			},
			"reason": "makes funny sound",
			"vip": true,
			"status": false
		}
	]
}
```

</details>

### Technicians:

| Action              | Method | URL                                        |
| ------------------- | ------ | ------------------------------------------ |
| List Technicians    | GET    | http://localhost:8080/api/technicians/     |
| Create a Technician | POST   | http://localhost:8080/api/technicians/     |
| Delete Technician   | Delete | http://localhost:8080/api/technicians/:id/ |

<details>
<summary><strong>List Technicians Output</strong></summary>
<br>

#### Output:

```
{
	"technicians": [
		{
			"first_name": "Jay",
			"last_name": "Kumar",
			"employee_id": "12"
		},
		{
			"first_name": "Harry",
			"last_name": "Styles",
			"employee_id": "harry"
		}
	]
}
```

</details>

<details>
<summary><strong>Create Technician Input/Output</strong></summary>
<br>

#### Input:

```
{
	"first_name": "Jay",
	"last_name": "Kumar",
	"employee_id": "12"

}
```

#### Output:

```
{
	"technician": {
		"first_name": "Jay",
		"last_name": "Kumar",
		"employee_id": "12",
		"id": 8
	}
}
```

</details>

<details>
<summary><strong>Delete Technicians Output</strong></summary>
<br>

#### Output:

```
{
    "Technician has been deleted"
}
```

</details>

## Sales microservice

The sales microservice allows for creation of a salesperson, a customer, and a new sale. It also maintains lists of salespeople, customers, and sales.

**Models**

1. **Salesperson** - Contains a first_name, last_name, and employee_id field.
2. **Customer** - Contains a first_name, last_name, address, and phone_number field.
3. **Sale** - Contains a salesperson, customer, automobile, and price field. The salesperson field is a foreign key to the _Salesperson_ model, the customer field is a foreign key to the _Customer_ model, and the automobile field is a foreign key to the _AutomobileVO_ model.
4. **AutomobileVO** - This model is our value object - it polls for data from the automobile Model in the Inventory API. When a model is updated/created in the Inventory API, that data is sent to our AutomobileVO model by using the VIN number to identify which automobile to update.

![Endpoint details](/images/list1.PNG)
![Endpoint details 2](/images/list2.PNG)
