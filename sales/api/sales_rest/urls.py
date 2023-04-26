from django.urls import path
from .views import api_list_salespersons, api_list_customers

urlpatterns = [
    path("salespeople/", api_list_salespersons, name="api_list_salespersons"),
    path("salespeople/create/", api_list_salespersons, name="api_create_salespersons"),
    path("customers/", api_list_customers, name="api_list_customers"),
    path("customers/", api_list_customers, name="api_create_customers"),
]
