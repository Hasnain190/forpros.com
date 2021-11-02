from django.urls import path
from base.views import category_views as views


urlpatterns = [
   
    path('create/', views.createCategory, name="category-create"),

    path('categorylist/', views.getCategoryList, name='categorylist'),
    path('<str:pk>/', views.productsByCategory, name='category'),

    path('update/<str:pk>/', views.updateProductCategory, name="product-category-update"),

    path('<str:pk>/edit/', views.editCategory, name="category-edited"),

    
    path('delete/<str:pk>/', views.deleteCategory, name = 'category-delete'),
]