from django.urls import path
from .views import book_list, create_book, book_detail

urlpatterns = [
    path('books/', book_list, name='book_list'),
    path('books/create', create_book, name='create_book'),
    path('books/<int:id>', book_detail, name='book_detail'),
]