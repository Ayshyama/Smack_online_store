import json
from django.http import JsonResponse
from django.core.mail import send_mail

from django.core.exceptions import ObjectDoesNotExist
from django.http import Http404
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
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


@csrf_exempt
def handle_order(request):
    if request.method == 'POST':
        # Получаем данные из POST запроса
        phone = request.POST.get('phone')
        email = request.POST.get('email')
        city = request.POST.get('city')
        address = request.POST.get('address')

        # Получаем данные о товарах из формы
        cart_data_str = request.POST.get('cartData')
        cart_items = json.loads(cart_data_str) if cart_data_str else []

        # Отправка письма клиенту
        client_message = f'Добрый день, {phone}!\nСпасибо за ваш заказ!\n\nВаш заказ:\n'
        for item in cart_items:
            client_message += f'{item["title"]} - {item["price"]} грн\n'
        send_mail('Ваш заказ', client_message, 'rybniismak@gmail.com', [email])

        # Отправка письма владельцу магазина
        owner_message = f'Новый заказ от {phone} {email} {city} {address}:\n'
        for item in cart_items:
            owner_message += f'{item["title"]} - {item["price"]} грн\n'
        send_mail('Новый заказ', owner_message, 'rybniismak@gmail.com', ['rybniismak@gmail.com'])

        # Возвращаем JSON-ответ об успешной отправке
        return JsonResponse({'message': 'Заказ успешно отправлен!'})
    else:
        return JsonResponse({'message': 'Метод не разрешен'}, status=405)
