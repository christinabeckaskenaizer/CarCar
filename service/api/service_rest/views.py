from django.shortcuts import render
from django.http import JsonResponse
from common.json import ModelEncoder
from django.views.decorators.http import require_http_methods
from .models import AutomobileVO, Technician, Appointment
import json

# Create your views here.


class TechnicianEncoder(ModelEncoder):
    model = Technician
    properties = [
        "first_name",
        "last_name",
        "employee_id",
        "id"
    ]


class AppointmentEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "id",
        "vin",
        "customer",
        "date_time",
        "technician",
        "reason",
        "vip",
        "status"
    ]

    encoders = {
        "technician": TechnicianEncoder(),
    }



@require_http_methods(["GET", "POST"])
def list_appointments(request, vin=None):
    if request.method == "GET":
        if vin == None:
            appointments = Appointment.objects.all()
            return JsonResponse(
            {"appointments": appointments},
            encoder=AppointmentEncoder
        )
        else:
            try:
                appointments = Appointment.objects.filter(vin=vin)
                return JsonResponse(
            {"appointments": appointments},
            encoder=AppointmentEncoder
        )
            except Appointment.DoesNotExist:
                response = JsonResponse({"message": "Appointment does not exist"})
                response.status_code = 404
                return response
    else:
        content = json.loads(request.body)
        try:
            tech_id = content["technician"]
            tech = Technician.objects.get(employee_id=tech_id)
            content["technician"] = tech
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid tech id"}
            )
        if AutomobileVO.objects.filter(vin=content["vin"]).exists():
            content["vip"] = True
        else:
            content["vip"] = False
        appointment = Appointment.objects.create(**content)
        return JsonResponse(
            appointment,
            encoder=AppointmentEncoder,
            safe=False,
        )




@require_http_methods(["GET", "PUT", "DELETE"])
def show_appointment(request, id):
    if request.method == "GET":
        try:
            appointment = Appointment.objects.get(id=id)
            return JsonResponse(
                appointment,
                encoder=AppointmentEncoder,
                safe=False
            )
        except Appointment.DoesNotExist:
            response = JsonResponse({"message":"Appointment does not exist"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            appointment = Appointment.objects.get(id=id)
            appointment.delete()
            return JsonResponse(
                {"message": "Appointment deleted"}
            )
        except Appointment.DoesNotExist:
            response = JsonResponse(
                {"message": "Appointment does not exist"}
            )
            response.status_code = 404
            return response
    else:
        content = json.loads(request.body)
        Appointment.objects.update_or_create(id=id, defaults={'status': content['status']})
        appointment = Appointment.objects.get(id=id)
        return JsonResponse(
            appointment,
            encoder=AppointmentEncoder,
            safe=False
        )

@require_http_methods(["GET", "POST"])
def list_technicians(request):
    if request.method == "GET":
        technicians = Technician.objects.all()
        return JsonResponse(
            {"technicians": technicians},
            encoder=TechnicianEncoder
        )
    else:
        content = json.loads(request.body)
        technician = Technician.objects.create(**content)
        return JsonResponse(
            technician,
            encoder=TechnicianEncoder,
            safe=False,
        )


@require_http_methods(["GET", "PUT", "DELETE"])
def show_technician(request, id):
    if request.method == "GET":
        try:
            technician = Technician.objects.get(id=id)
            return JsonResponse(
                technician,
                encoder=TechnicianEncoder,
                safe=False,
            )
        except Technician.DoesNotExist:
            response = JsonResponse(
                {"message": "Technician does not exist"}
            )
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            technician = Technician.objects.get(id=id), technician.delete()
            return JsonResponse(
                {"message": "Technician has been deleted"}
            )
        except Technician.DoesNotExist:
            response = JsonResponse(
                {"message": "Technician does not exist"}
            )
    else:
        content = json.loads(request.body)
        Technician.objects.filter(id=id).update(**content)
        technician = Technician.objects.get(id=id)
        return JsonResponse(
            technician,
            encoder=TechnicianEncoder,
            safe=False,
        )
