from django.core.exceptions import ObjectDoesNotExist
from django.http import Http404
from django.shortcuts import render
from store.models import Product, Category


def index(request):
    context = {
        'cats': Category.objects.filter(is_published=True),
        'title': 'Рибний Смак',
    }
    return render(request, 'index.html', context)


def products(request, cat_slug):
    prod_objects = Product.objects.filter(category__is_published=True, is_published=True)
    title = 'Асортимент'
    cat_obj = None
    if cat_slug != 'all':
        prod_objects = prod_objects.filter(category__slug=cat_slug)
        try:
            cat_obj = Category.objects.get(slug=cat_slug)
        except ObjectDoesNotExist:
            raise Http404()
        title = cat_obj.name + ' Риба'
    context = {
        'products': prod_objects,
        'title': title,
        'cat_obj': cat_obj,
        'cats': Category.objects.filter(is_published=True)
    }

    return render(request, 'products.html', context)


def add_product(request):
    print('hello word')
