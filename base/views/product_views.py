
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from base.serializers import MediaSerializer, ProductSerializer ,ProductCategorySerializer 
from base.models import Product, ProductCatogory, Review , Media
from rest_framework import status
from django.shortcuts import get_object_or_404


@api_view(['GET'])
@authentication_classes([]) 
@permission_classes([]) 
def getMedia(request):
   
    media = Media.objects.all()
    serializer = MediaSerializer(media, many=True)

    return Response(serializer.data)


@api_view(['GET'])
@authentication_classes([]) 
@permission_classes([]) 
def getProducts(request):
    query = request.query_params.get('keyword')
    if query is None:
        query = ''

    products = Product.objects.filter(
        name__icontains=query)
    serializer = ProductSerializer(products, many=True)

    return Response(serializer.data)




@api_view(['GET'])
@authentication_classes([]) 
@permission_classes([]) 
def getTopProducts(request):

    products = Product.objects.filter(
        Featured = True)
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@authentication_classes([]) 
@permission_classes([]) 
def getProduct(request, pk):
    product = Product.objects.get(_id=pk)
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAdminUser])
def createProduct(request):
    user = request.user

    product = Product.objects.create(
        user=user,
        name='Sample Name',
        price=0,
        brand='Sample Brand',
        countInStock=0,
        
        description=''
    )

    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteProduct(request, pk):
    product = Product.objects.get(_id=pk)
    product.delete()
    return Response('Product is deleted successfully')


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateProduct(request, pk):
    data = request.data
    product = Product.objects.get(_id=pk)

    product.name = data['name']
    product.price = data['price']
    product.brand = data['brand']
    product.countInStock = data['countInStock']
    product.description = data['description']
    product.Featured = data['Featured']

    product.save()

    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(['POST'])
@authentication_classes([]) 
@permission_classes([]) 
def uploadMedia(request):
    data = request.data

    product_id = data['product_id']
    print(product_id)
    product = Product.objects.get(_id=product_id)
    print(product)
    # media = get_object_or_404(Media,product = product)
    media = Media.objects.filter(product = product)
    

    product.image = request.FILES.get('image')
    media.bannerImage =  request.FILES.get('banner-image')
    media.image3 =  request.FILES.get('image3')
    media.image4 =  request.FILES.get('image4')
    media.image5 =  request.FILES.get('image5')
    media.video =  request.FILES.get('video')

    # media.save()
    


    print(request.FILES)
    product.save()

    return Response('Media is uploaded')


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createProductReview(request, pk):
    user = request.user
    product = Product.objects.get(_id=pk)
    data = request.data

    # 1 - Review already exists
    alreadyExists = product.review_set.filter(user=user).exists()
    if alreadyExists:
        content = {'detail': 'Product already reviewed'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    # 2 - No Rating or 0
    elif data['rating'] == 0:
        content = {'detail': 'Please select a rating'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    # 3 - Create review
    else:
        review = Review.objects.create(
            user=user,
            product=product,
            name=user.first_name,
            rating=data['rating'],
            comment=data['comment'],
        )

        reviews = product.review_set.all()
        product.numReviews = len(reviews)
# if review = product and product = category 
        total = 0
        for i in reviews:
            total += i.rating

        product.rating = total / len(reviews)
        product.save()

        return Response('Review Added')
