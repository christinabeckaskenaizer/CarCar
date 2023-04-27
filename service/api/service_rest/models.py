from django.db import models
from django.urls import reverse

class AutomobileVO(models.Model):
    # unique=True means no two records are the same
    vin = models.CharField(max_length=20, unique=True)

    def __str__(self):
        return self.vin

class Technician(models.Model):
    first_name = models.CharField(max_length=20)
    last_name = models.CharField(max_length=20)
    employee_id = models.IntegerField(unique=True)

    # readable string representation
    def __str__(self):
        return f"{self.last_name}, {self.first_name}"


class Appointment(models.Model):
    date_time = models.DateTimeField()
    reason = models.TextField(max_length=500)
    status = models.BooleanField(default=False)
    vin = models.CharField(max_length=20)
    customer = models.CharField(max_length=20)
    vip = models.BooleanField(default=False)

    # many to one: each appt will be associated with one technician
    technician = models.ForeignKey(
        Technician,
        related_name="appointments",
        on_delete=models.PROTECT
    )

# history of all service appointments
    def __str__(self):
        return self.customer

    def is_finished(self):
        self.status = "Finished"
        self.save()

    def is_canceled(self):
        self.status = "Canceled"
        self.save()
# ----------------------------------------
    def get_api_url(self):
        return reverse('show_appointment', kwargs={"pk": self.id})