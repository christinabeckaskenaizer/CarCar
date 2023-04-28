from django.db import models
from django.urls import reverse

# Create your models here.

class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique=True)


class Technician(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    employee_id = models.CharField(max_length=20)


class Appointment(models.Model):
    vin = models.CharField(max_length=17)
    customer = models.CharField(max_length=100)
    date_time = models.DateTimeField()
    technician = models.ForeignKey(
        Technician,
        related_name="appointments",
        on_delete=models.PROTECT,
    )
    reason = models.TextField(max_length=400)
    vip = models.BooleanField(default=False)
    status = models.BooleanField(default=False)

    def get_api_url(self):
        return reverse('show_appointment', kwargs={"pk": self.id})
