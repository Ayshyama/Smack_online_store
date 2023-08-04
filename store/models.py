from django.db import models
from django.urls import reverse


class Category(models.Model):
    name = models.CharField(max_length=150, verbose_name='Заголовок')
    slug = models.SlugField(unique=True, verbose_name='Слаг')
    image = models.ImageField(upload_to='categories/', verbose_name='Зображення')
    is_published = models.BooleanField(default=True, verbose_name='На сайті')
    dt_update = models.DateTimeField(auto_now=True, verbose_name='Змінено')

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse('store:products', args=(self.slug,))

    class Meta:
        verbose_name = 'категорію'
        verbose_name_plural = 'Категорії'
        ordering = ['dt_update', 'id']


class Product(models.Model):
    MEASURES = [
        ('1 Кг', '1 Кг'),
        ('100 грам', '100 грам'),
        ('1 Шт', '1 Шт'),
    ]
    name = models.CharField(max_length=250, verbose_name='Заголовок')
    description = models.TextField(verbose_name='Опис')
    image = models.ImageField(upload_to='products/', blank=True, verbose_name='Зображення')
    dt_create = models.DateTimeField(auto_now_add=True, verbose_name='Створено')
    dt_update = models.DateTimeField(auto_now=True, verbose_name='Змінено')
    price = models.DecimalField(max_digits=8, decimal_places=2, verbose_name='Ціна')
    measure = models.CharField(max_length=10, choices=MEASURES, verbose_name='Вимір')
    is_published = models.BooleanField(default=True, verbose_name='На сайті')
    category = models.ForeignKey(to=Category, on_delete=models.PROTECT, verbose_name='Категорія')

    def __str__(self):
        return f'{self.category}: {self.name}'

    class Meta:
        verbose_name = 'товар'
        verbose_name_plural = 'Товари'
        ordering = ['-dt_update', ]
