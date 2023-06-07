from django.shortcuts import render


def index(request):
    return render(request, 'index.html')


def products(request):
    return render(request, 'products.html')


def cart_view(request):
    return render(request, 'cart.html')
