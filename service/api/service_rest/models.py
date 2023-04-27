from django.db import models
from django.urls import reverse

class AutomobileVO(models.Model):
    # unique=True means no two records are the same
    vin = models.CharField(max_length=20, unique=True)
    import_href = models.CharField(max_length=200, unique=True)

class Technician(models.Model):
    first_name = models.CharField(max_length=20)
    last_name = models.CharField(max_length=20)
    employee_id = models.IntegerField(unique=True)


class Appointment(models.Models):
    date_time = models.DateTimeField()
    reason = models.TextField(max_length=500)
    status = models.BooleanField(default=False)
    vin = models.CharField(max_length=20)
    customer = models.CharField(max_length=20)

    # many to one: each appt will be associated with one technician
    technician = models.ForeignKey(
        Technician,
        related_name="appointments",
        on_delete=models.PROTECT
    )

    def get_api_url(self):
        return reverse('show_appointment', kwargs={"pk": self.id})