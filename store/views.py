import json
from datetime import datetime

from django.http import JsonResponse
from django.core.mail import send_mail

from django.core.exceptions import ObjectDoesNotExist
from django.http import Http404
from django.shortcuts import render
from django.utils.encoding import smart_str
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


def get_last_order_data():
    try:
        with open('last_order_data.json', 'r') as file:
            return json.load(file)
    except FileNotFoundError:
        # если файла не существует вернуть дефолт
        return {'last_order_date': '01-01', 'last_sequential_number': 0}


def store_last_order_data(last_order_date, last_sequential_number):
    data = {'last_order_date': last_order_date, 'last_sequential_number': last_sequential_number}
    with open('last_order_data.json', 'w') as file:
        json.dump(data, file)


def generate_order_id():
    now = datetime.now()
    day = now.strftime('%d')
    month = now.strftime('%m')

    last_order_data = get_last_order_data()
    last_order_date_str = last_order_data['last_order_date']
    last_sequential_number = last_order_data['last_sequential_number']

    if last_order_date_str == f"{day}-{month}":
        new_sequential_number = last_sequential_number + 1
    else:
        new_sequential_number = 1

    store_last_order_data(f"{day}-{month}", new_sequential_number)

    order_id = f"{day:02}{month:02}{new_sequential_number:02}"

    return order_id


@csrf_exempt
def handle_order(request):
    if request.method == 'POST':
        phone = request.POST.get('phone')
        email = request.POST.get('email')
        city = request.POST.get('city')
        address = request.POST.get('address')
        total_price = request.POST.get('total_price')

        email_id = generate_order_id()

        cart_data_str = request.POST.get('cartData')
        cart_items = json.loads(cart_data_str) if cart_data_str else []

        client_message = f'Доброго дня!\nДякуємо Вам за замовлення.\n\n' \
                         f'Номер замовлення: {email_id}\n'\
                         f'Ваш кошик на суму {total_price} грн:\n'
        item_number = 1
        for item in cart_items:
            client_message += f'{item_number}. {item["title"]} - {item["price"]}грн/{item["weight"]}\n'
            item_number += 1
        # Convert the email message to a UTF-8 encoded string
        client_message_utf8 = smart_str(client_message)
        subject = f'Ваше замовлення №{email_id}'
        send_mail(
            subject=subject,
            message=client_message_utf8,
            from_email='Рибний Смак <rybniismak@gmail.com>',
            recipient_list=[email],
            fail_silently=False,
        )

        owner_message = f'від: {phone} {email} {city} {address}\n\n' \
                        f'Номер замовлення: {email_id}\n\n' \
                        f'Кошик на суму {total_price} грн:\n'
        item_number = 1
        for item in cart_items:
            owner_message += f'{item_number}. {item["title"]} - {item["price"]}грн/{item["weight"]}\n'
            item_number += 1
        subject = f'{email_id} Нове замовлення'
        send_mail(
            subject=subject,
            message=owner_message,
            from_email='Рибний Смак <rybniismak@gmail.com>',
            recipient_list=['rybniismak@gmail.com'],
            fail_silently=False,
        )

        return JsonResponse({'message': 'Замовлення успішно відправлено!'})
    else:
        return JsonResponse({'message': 'Метод не дозволено'}, status=405)
