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
