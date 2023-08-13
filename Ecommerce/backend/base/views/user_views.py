from django.contrib.auth.models import User
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework import status
from django.contrib.auth.hashers import make_password



from base.serializers import  UserSerializer, UserSerializerWithToken

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        serializer = UserSerializerWithToken(self.user).data
        for k,v in serializer.items():
            data[k] = v
        return data
    
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
    
@api_view(['POST',])
def registerUser(request):
    data = request.data
    try:
        user = User.objects.create_user(
            first_name=data['name'],
            username = data['email'],
            email = data['email'],
            password = data['password']
        )
        serializer = UserSerializerWithToken(user, many=False)
        return Response(serializer.data)
    except:
        message = {'detail': "user with this emial already exixts"}
        return Response(message, status = status.HTTP_400_BAD_REQUEST)

@api_view(['GET',])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    ## when a user is logged in with authentication token we can get user profile using request.user since we are sending 
    ## usernam in serializer class UserSerializer
    user = request.user
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)

@api_view(['PUT',])
@permission_classes([IsAuthenticated])
def updateProfile(request):    
    user = request.user
    serializer = UserSerializerWithToken(user, many=False)
    data = request.data
    user.first_name = data['name']
    user.username = data['email']
    user.email = data['email']
    if data['password'] != '':
      user.password = make_password(data['password'])
    user.save()
    return Response(serializer.data)


@api_view(['GET',])
@permission_classes([IsAdminUser])
def getUsers(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)

@api_view(['GET',])
@permission_classes([IsAdminUser])
def getUserById(request,pk):
    user = User.objects.get(id=pk)
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)

@api_view(['PUT',])
@permission_classes([IsAuthenticated])
def updateUser(request,pk):    
    user = User.objects.get(id=pk)
    data = request.data
    user.first_name = data['name']
    user.username = data['email']
    user.email = data['email']
    user.is_staff = data['isAdmin']
    user.save()
    serializer = UserSerializerWithToken(user, many=False)
    return Response(serializer.data)

@permission_classes([IsAdminUser])
@api_view(['DELETE',])
def deleteUser(request,pk):
    userForDeletion = User.objects.get(id=pk)
    userForDeletion.delete()
    return Response("User was deleted")

