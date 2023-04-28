from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.http import require_http_methods
import json
from common.json import ModelEncoder
from .models import Sale, Salesperson, Customer, AutomobileVO

#Encoders here!
class AutomobileVODetailEncoder(ModelEncoder):
    model=AutomobileVO
    properties = ["vin"]

class SalespeopleListEncoder(ModelEncoder):
    model = Salesperson
    properties = [
        "first_name",
        "last_name",
        "employee_id",
    ]

class SalespeopleDetailEncoder(ModelEncoder):
    model = Salesperson
    properties = [
        "first_name",
        "last_name",
        "employee_id",
    ]

class CustomerDetailEncoder(ModelEncoder):
    model = Customer
    properties = [
        "first_name",
        "last_name",
        "address",
        "phone_number",
    ]

class AutomobileVOEncoder(ModelEncoder):
    model=AutomobileVO
    properties = ["vin"]

class SalesListEncoder(ModelEncoder):
    model = Sale
    properties = [
        "automobile",
        "salesperson",
        "customer",
        "price",
    ]
    encoders = {
        "automobile": AutomobileVOEncoder(),
        "salesperson": SalespeopleDetailEncoder(),
        "customer": CustomerDetailEncoder(),
    }


# Create your views here.

@require_http_methods(["GET", "POST"])
def api_list_salespersons(request):
    if request.method == "GET":
        salespersons = Salesperson.objects.all()
        return JsonResponse(
            {"salespersons":salespersons},
            encoder=SalespeopleListEncoder,
            safe=False
        )
    else:
        content = json.loads(request.body)
        salesperson = Salesperson.objects.create(**content)
        return JsonResponse(
            salesperson,
            encoder=SalespeopleDetailEncoder,
            safe=False,
        )

@require_http_methods(["GET", "POST"])
def api_list_customers(request):
    if request.method=="GET":
        customers = Customer.objects.all()
        return JsonResponse(
            {"customers":customers},
            encoder=CustomerDetailEncoder,
            safe=False,
        )
    else:
        content = json.loads(request.body)
        customer = Customer.objects.create(**content)
        return JsonResponse(
            customer,
            encoder=CustomerDetailEncoder,
            safe=False
        )

@require_http_methods(["GET", "POST"])
def api_list_sales(request):
    if request.method=="GET":
        sales = Sale.objects.all()
        return JsonResponse(
            {"sales":sales},
            encoder = SalesListEncoder,
            safe=False,
        )
    else:
        #take body of request, load it as json string, and assign it to content
        content = json.loads(request.body)
        #grab automobile from body and set it equal to auto_vin
        auto_vin = content["automobile"]
        #seaarch through automobileVO objects for automobile vin that we received from request body.
        automobile = AutomobileVO.objects.get(vin=auto_vin)
        #get whole sutomobile object
        content["automobile"] = automobile

        salesperson_id = content["salesperson"]

        salesperson = Salesperson.objects.get(employee_id=salesperson_id)

        content["salesperson"] = salesperson

        customer_phone_number = content["customer"]

        customer = Customer.objects.get(phone_number=customer_phone_number)

        content["customer"] = customer



        sale = Sale.objects.create(**content)

        return JsonResponse(
            sale,
            encoder=SalesListEncoder,
            safe=False,
        )
