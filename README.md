# CarCar

Team:

* Avisha Kumar - Service
* Person 2 - Which microservice?

## Design

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
| Action                   | Method | URL                                                     |
|--------------------------|--------|---------------------------------------------------------|
| List All Appointments    | GET    | http://localhost:8080/api/appointments/                 |

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
| Action                  | Method | URL                                        |
|-------------------------|--------|--------------------------------------------|
| List Technicians        | GET    | http://localhost:8080/api/technicians/     |
| Create a Technician     | POST   | http://localhost:8080/api/technicians/     |
| Show Technician Details | GET    | http://localhost:8080/api/technicians/:id/ |

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
<summary><strong>Show Technicians Details Output</strong></summary>
<br>

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

## Sales microservice

Explain your models and integration with the inventory
microservice, here.
