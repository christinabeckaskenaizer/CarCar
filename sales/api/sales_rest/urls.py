from django.urls import path
from .views import api_list_salespersons

urlpatterns = [
    path("salespeople/", api_list_salespersons, name="api_list_salespersons"),
    path("salespeople/create/", api_list_salespersons, name="api_create_sales"),
]
