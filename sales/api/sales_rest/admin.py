from django.contrib import admin
from sales_rest.models import Salesperson, Customer, AutomobileVO, Sale
# Register your models here.


class SalespersonAdmin(admin.ModelAdmin):
    list_display = (
        "first_name",
        "last_name",
        "employee_id",
    )

class CustomerAdmin(admin.ModelAdmin):
    list_display=(
        "first_name",
        "last_name",
        "address",
        "phone_number",
    )

class AutomobileVOAdmin(admin.ModelAdmin):
    list_display=(
        "vin",
    )

class SaleAdmin(admin.ModelAdmin):
    list_display=(
        "automobile",
        "salesperson",
        "customer",
        "price",
    )


admin.site.register(Salesperson, SalespersonAdmin)
admin.site.register(Customer, CustomerAdmin)
admin.site.register(AutomobileVO, AutomobileVOAdmin)
admin.site.register(Sale, SaleAdmin)
