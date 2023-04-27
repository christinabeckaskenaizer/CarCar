from django.shortcuts import render
from django.http import JsonResponse
from common.json import ModelEncoder
from django.views.decorators.http import require_http_methods
from .models import AutomobileVO, Technician, Appointment
import json

class AutomobileVO(ModelEncoder):
    model = AutomobileVO
    properties = ["vin"]


class TechnicianEncoder(ModelEncoder):
    model = Technician
    properties = [
        "first_name",
        "last_name",
        "employee_id"
    ]

class AppointmentEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "id",
        "date_time",
        "reason",
        "status",
        "vip",
        "vin",
        "customer",
        "technician"
    ]
    encoder = {
        "technician": TechnicianEncoder(),
    }

@require_http_methods(["GET", "POST"])
def list_appointments(request):
    if request.method == "GET":
        appointments = Appointment.objects.all()

        return JsonResponse(
            {"appointments": appointments},
            encoder=AppointmentEncoder,
        )
    else:
        content = json.loads(request.body)

        try:
            # retrieves the value of the "technician" key from the content dict and assings it to the tech id variable
            technician_id = content["technician"]
            technician = Technician.objects.get(id=technician_id)
            content["technician"] = technician
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "No techs found"},
                status=400,
            )
        vin = content["vin"]
        if AutomobileVO.objects.filter(vin=vin).exists():
            content["is_vip"] = True
        appointment = Appointment.objects.create(**content)
        return JsonResponse(
            appointment,
            encoder=AppointmentEncoder,
            safe=False,
        )



@require_http_methods(["GET", "PUT", "DELETE"])
def show_appointment(request, id):
    # GET
    if request.method == "GET":
        try:
            appointment = Appointment.objects.get(id=id)
            return JsonResponse(
                appointment,
                encoder=AppointmentEncoder,
                safe=False
            )
        except Appointment.DoesNotExist:
            response = JsonResponse({"message": "appointment does not exist"})
            response.status_code = 404
            return response
        # ----------------------------------------------
        # DELETE
    elif request.method == "DELETE":
        try:
            appointment = Appointment.objects.get(id=id)
            appointment.delete()
            return JsonResponse(
                {"message": "muahhahahaa deleted"}
            )
        except Appointment.DoesNotExist:
            response = JsonResponse({"message": "appointment does not exist"})
            response.status_code = 404
        # --------------------------------------------------
        # PUT
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
            safe=False
        )

@require_http_methods(["GET", "PUT", "DELETE"])
def show_technician(request, id):
    if request.method == "GET":
        try:
            technician = Technician.objects.get(id=id)
            return JsonResponse(
                technician,
                encoder=TechnicianEncoder,
                safe=False
            )
        except Technician.DoesNotExist:
            response = JsonResponse(
                {"message": "tech does not exist"}
            )
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            technician = Technician.objects.get(id=id), technician.delete()
            return JsonResponse(
                {"message": "no mo tech"}
            )
        except Technician.DoesNotExist:
            response = JsonResponse(
                {"message": "no tech here"}
            )
    else:
        content = json.loads(request.body)
        Technician.objects.filter(id=id).update(**content)
        return JsonResponse(
            technician,
            encoder=TechnicianEncoder,
            safe=False
        )