from django.urls import path
from . import views
from .views import handle_order
app_name = 'store'

urlpatterns = [
    path('', views.index, name='index'),
    path('products/<slug:cat_slug>', views.products, name='products'),
    path('add_product/', views.add_product, name='add_product'),
    path('handle_order/', handle_order, name='handle_order'),
]
