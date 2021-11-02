
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from base.serializers import ProductSerializer, OrderSerializer
from base.models import Product, Order, OrderItem, ShippingAddress
from rest_framework import status
from datetime import datetime
from django.views.decorators.csrf import csrf_exempt

from django.core.mail import message, send_mail

@api_view(['POST'])
@permission_classes([IsAuthenticated])
@csrf_exempt
def addOrderItems(request):
    user = request.user
    data = request.data
    print(data)

    orderItems = data['orderItems']

    if orderItems and len(orderItems) == 0:
        return Response({'detail': 'No Order Items'}, status=status.HTTP_400_BAD_REQUEST)
    # (1) Create order

    order = Order.objects.create(
        user=user,
        paymentMethod=data['paymentMethod'],
        taxPrice=data['taxPrice'],
        shippingPrice=data['shippingPrice'],
        totalPrice=data['totalPrice']
    )

    # (2) Create shipping address

    shipping = ShippingAddress.objects.create(
        order=order,
        address=data['shippingAddress']['address'],
        city=data['shippingAddress']['city'],
        postalCode=data['shippingAddress']['postalCode'],
        country=data['shippingAddress']['country'],
    )

    # (3) Create order items adn set order to orderItem relationship
    for i in orderItems:
        product = Product.objects.get(_id=i['product'])

        item = OrderItem.objects.create(
            product=product,
            order=order,
            name=product.name,
            qty=i['qty'],
            price=i['price'],
            image=product.image.url,
        )

        # (4) Update stock

        product.countInStock -= item.qty
        product.save()


# # send mail to the admin to take notice of this order

#     subject = "A new order is placed just now"
#     message = 'This message is sent to you to make you aware of the new order placed just now by user '+user +'of '
#     send_mail(
#     'Subject here',
#     'Here is the message.',
#     'from@example.com',
#     ['to@example.com'],
#     fail_silently=False,
# )

    serializer = OrderSerializer(order, many=False)
    return Response(serializer.data)



@api_view(['GET'])
@permission_classes([IsAdminUser])
def getOrders(request):
    orders = Order.objects.all()
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMyOrders(request):
    user = request.user
    orders = user.order_set.all()
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)




@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOrderById(request, pk):

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


@api_view(['PUT'])
@permission_classes([IsAdminUser])
@csrf_exempt 
def updateOrderToPaid(request,pk):
    order = Order.objects.get(_id=pk)

    order.isPaid = True
    order.paidAt = datetime.now()
    order.save()
    
    return Response('✓ Order was paid ')



@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateOrderToDelivered(request, pk):
    order = Order.objects.get(_id=pk)

    order.isDelivered = True
    order.deliveredAt = datetime.now()
    order.save()

    return Response('✓ Order was delivered')
