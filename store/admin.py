from django.contrib import admin
from django.utils.safestring import mark_safe

from store.models import Product, Category


class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'measure', 'category', 'get_html_image', 'dt_update', 'is_published')
    list_display_links = ('name',)
    search_fields = ('name', 'description', 'price')
    list_editable = ('is_published',)
    list_filter = ('category', 'price', 'measure', 'is_published', 'dt_update')
    fields = (
        'name', 'description', 'category', 'image', 'get_html_image', 'price', 'measure', 'is_published', 'dt_create',
        'dt_update', 'alt')
    readonly_fields = ('dt_create', 'dt_update', 'get_html_image')
    save_on_top = True

    def get_html_image(self, object):
        if object.image:
            return mark_safe(f'<img src="{object.image.url}" width=100>')

    get_html_image.short_description = 'Мініатюра'


class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'get_html_image', 'dt_update', 'is_published')
    list_display_links = ('name',)
    list_editable = ('is_published',)
    fields = ('name', 'slug', 'image', 'get_html_image', 'is_published', 'dt_update', 'alt')
    readonly_fields = ('dt_update', 'get_html_image')
    prepopulated_fields = {'slug': ('name',)}

    def get_html_image(self, object):
        if object.image:
            return mark_safe(f'<img src="{object.image.url}" width=200>')

    get_html_image.short_description = 'Мініатюра'


admin.site.register(Category, CategoryAdmin)
admin.site.register(Product, ProductAdmin)
