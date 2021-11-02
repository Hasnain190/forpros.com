
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from base.serializers import ProductSerializer, OrderSerializer, WishListSerializer
from base.models import Product, Order, OrderItem, ShippingAddress , WishList
from rest_framework import status
from datetime import datetime


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addToWishList(request):
    user = request.user
    data = request.data

    wishlists = data['wishlist']


    for i in wishlists:
        product = Product.objects.get(_id=i['product'])

        item = WishList.objects.create(
            user=user,

            product=product,
            name=product.name,
           
            image=product.image.url,
        )

        # (4) Update stock

        product.save()

    serializer = WishListSerializer(item, many=False)
    return Response(serializer.data)


# get wishlist for all users
@api_view(['GET'])
@permission_classes([IsAdminUser]) 
def getWishList(request):
    wishlists = WishList.objects.all()
    serializer = WishListSerializer(wishlists, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMyWishList(request):
    user = request.user
    wishlists = user.wishlist_set.all()
    serializer = WishListSerializer(wishlists, many=True)
    return Response(serializer.data)




@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getWishListById(request, pk):

    user = request.user

    try:
        order = Order.objects.get(_id=pk)
        if user.is_staff or order.user == user:
            serializer = OrderSerializer(order, many=False)
            return Response(serializer.data)
        else:
            Response({'detail': 'Not authorized to view this order'},
                     status=status.HTTP_400_BAD_REQUEST)
    except:
        return Response({'detail': 'Order does not exist'}, status=status.HTTP_400_BAD_REQUEST)


