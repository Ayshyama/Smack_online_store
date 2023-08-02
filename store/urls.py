from django.urls import path
from . import views
app_name = 'store'

urlpatterns = [
    path('', views.index, name='index'),
    path('products/<slug:cat_slug>', views.products, name='products'),
    path('add_product/', views.add_product, name='add_product'),
]
