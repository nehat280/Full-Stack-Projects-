from django.contrib.auth.models import User
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework import status
from base.serializers import OrderSerializer 
from base.models import Product, Order, OrderItem, ShippingAddress
from datetime import datetime

@api_view(['POST',])
@permission_classes([IsAuthenticated])
def addOrderItems(request):
    user = request.user
    data = request.data
    print("data",data)
    orderItems = data['orderItems']
    if orderItems and len(orderItems)==0:
        return Response({'detail':'No order items'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        # 1) (create order )
        ## since order has orderItem and shipping address field, create order first in DB 
        ## and from this order create orderItem and shipping address objects in DB
        order = Order.objects.create(
                        user=user,
                        paymentMethod =data['paymentMethod'],
                        taxPrice = data['taxPrice'],
                        shippingPrice = data['shippingPrice'],
                        totalPrice = data['totalPrice'],
                        )
        # 2) Create Shippping Adddress
        shipping = ShippingAddress.objects.create(
            order = order,
            address = data['shippingAddress']['address'],
            city = data['shippingAddress']['city'],
            postalCode = data['shippingAddress']['postalCode'],
            country = data['shippingAddress']['country'],
            shippingPrice = data['shippingPrice']
        )
        
        # 3) Create order items in database and set order to orderItem relationship
        for i in orderItems:
            product = Product.objects.get(_id=i['product'])
            item = OrderItem.objects.create(
                    product = product,
                    order = order,
                    name = product.name,
                    qty = i['qty'],
                    price = i['price'],
                    image = product.image.url
            )
        # 4) Update stock
            product.countInStock -= item.qty
            product.save()
        serializer = OrderSerializer(order,many=False)
        return Response(serializer.data)
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])    
def getMyOrders(request):
    user= request.user
    orders = user.order_set.all()
    serializer = OrderSerializer(orders,many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAdminUser])    
def getOrders(request):
    orders = Order.objects.all()
    serializer = OrderSerializer(orders,many=True)
    return Response(serializer.data)

    
@api_view(['GET',])
@permission_classes([IsAuthenticated])    
def getOrderById(request,pk):
    user = request.user
    order = Order.objects.get(_id=pk)
    try:
        if user.is_staff or order.user == user:
            serializer = OrderSerializer(order, many=False)
            return Response(serializer.data)
        else:
            return Response({'detail': 'Not authorized to view the order'}, status=status.HTTP_400_BAD_REQUEST)
    except:
        return Response({'detail':"Order does not exist"},status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT',])
@permission_classes([IsAuthenticated])
def updateOrderToPaid(request,pk):
    order = Order.objects.get(_id=pk)
    order.isPaid = True
    order.paidAt = datetime.now()
    order.save()
    return Response('Order was paid')

@api_view(['PUT',])
@permission_classes([IsAdminUser])
def updateOrderToDeliver(request,pk):
    order = Order.objects.get(_id=pk)
    order.isDelivered = True
    order.deliveredAt = datetime.now()
    order.save()
    return Response('Order was delivered')