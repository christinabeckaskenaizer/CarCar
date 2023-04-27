from django.db import models
# from inventory.api.inventory_rest.models import Automobile

# Create your models here.
class Salesperson(models.Model):
    first_name = models.CharField(max_length=60)
    last_name = models.CharField(max_length=60)
    employee_id = models.CharField(max_length=60)

    def __str__(self):
        return self.employee_id

class Customer(models.Model):
    first_name = models.CharField(max_length=60)
    last_name = models.CharField(max_length=60)
    address = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=12)

    def __str__(self):
        return f'{self.first_name} {self.last_name}'

class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique=True)

    def __str__(self):
        return self.vin

class Sale(models.Model):
    automobile = models.ForeignKey(AutomobileVO, on_delete=models.PROTECT)
    salesperson = models.ForeignKey(Salesperson, on_delete=models.PROTECT)
    customer = models.ForeignKey(Customer, on_delete=models.PROTECT)
    price = models.FloatField()

    def __str__(self):
        return f'{self.salesperson} {self.automobile}'
