from django.urls import path
from .views import handle_order, IndexView, ProductsView
app_name = 'store'

urlpatterns = [
    path('', IndexView.as_view(), name='index'),
    path('products/<slug:slug>', ProductsView.as_view(), name='products'),
    path('handle_order/', handle_order, name='handle_order'),
]
