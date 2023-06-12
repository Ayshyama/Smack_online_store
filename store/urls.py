from django.urls import path
from . import views
app_name = 'store'

urlpatterns = [
    path('', views.index, name='index'),
    path('products/<slug:cat_slug>', views.products, name='products'),
    path('cart/', views.cart_view, name='cart'),
]