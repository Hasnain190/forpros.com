from django.urls import path
from base.views import wishlist_views as views


urlpatterns = [

    path('', views.getWishList, name='wishlists'),
    path('add/', views.addToWishList, name='wishlist-add'),
    path('mywishlist/', views.getMyWishList, name='mywishlist'),


    path('<str:pk>/', views.getWishListById, name='user-wishlist'),
]
