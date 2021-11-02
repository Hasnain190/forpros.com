from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from base.serializers import ProductSerializer ,ProductCategorySerializer 
from base.models import Product, ProductCatogory
from rest_framework import status





@api_view(['POST'])
@permission_classes([IsAdminUser])
def createCategory(request):
    new_category =  ProductCatogory.objects.create()
    new_category.save()

    return Response('new category created successfully')


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def editCategory(request, pk):
    data = request.data
    category = ProductCatogory.objects.get(id=pk)
    category.product_category = data['product_category']
    category.save()
    serializer = ProductCategorySerializer(category, many=False)

    return Response(serializer.data)

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteCategory(request, pk):
    product_Catogory = ProductCatogory.objects.get(id=pk)
    product_Catogory.delete()
    return Response('Category is deleted successfully')


@api_view(['GET'])
@authentication_classes([]) # Add this
@permission_classes([]) # Maybe add this too
def getCategoryList(request):
    product_category = ProductCatogory.objects.all()
    serializer = ProductCategorySerializer(product_category, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@authentication_classes([]) # Add this
@permission_classes([]) # Maybe add this too
def productsByCategory(request,pk):
    category = ProductCatogory.objects.get(id=pk)
    products = category.product_set.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

    
@api_view(['PUT'])
@authentication_classes([]) # Add this
@permission_classes([]) # Maybe add this too
def updateProductCategory(request,pk):
    data = request.data

    product_id = data['product_id']
    product = Product.objects.get(_id=product_id)
    category = ProductCatogory.objects.get(id=pk)
    product.category = category

    product.save()

    return Response('category added successfully')
  

