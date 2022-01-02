
from rest_framework.decorators import api_view , permission_classes , authentication_classes
from rest_framework.permissions import IsAuthenticated , IsAdminUser
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.shortcuts import redirect
# from django.contrib.auth.models import User

from django.contrib.auth.hashers import make_password
from rest_framework import status



from base.serializers import  UserSerializer , UserSerializerWithToken

from django.conf import settings
# User = settings.AUTH_USER_MODEL
# from django.contrib.auth import get_user_model
User = get_user_model()


import requests


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
   

    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserSerializerWithToken(self.user).data

        for k,v in serializer.items():
            data[k] = v

       
        return data
 

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer



@api_view(["POST"])
@permission_classes([])

@authentication_classes([]) 
def activate(request):
    """ 
    Intermediate view to activate a user's email. 
    """
    uid  = request.POST.get('uid')
    token = request.POST.get('token')
    headers={'Authorization': 'JWT ' + token}
    protocol = 'https://' if request.is_secure() else 'http://'
    web_url = protocol + request.get_host()
    post_url = web_url + "/auth/users/activation/"
    post_data = {'uid': uid, 'token': token}
    result = requests.post(post_url, headers=headers, data = post_data)
    content = result.text
    print(content)

    if result.status_code == status.HTTP_200_OK:
        User.objects.filter(id=uid).update(is_active=True)
        # redirect to login page

        
        
        return Response({"message": "User activated successfully."}, status=status.HTTP_200_OK)
    else:
        
        return Response({"message": "User activation failed."}, status=status.HTTP_400_BAD_REQUEST)
 

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUserProfile(request):
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

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user = request.user
    
    serializer = UserSerializer(user, many=False)

    return Response(serializer.data)

# @api_view(['POST'])
# @authentication_classes([]) 
# @permission_classes([]) 
# def registerUser(request):
#     data = request.data
#     try:
#         user = User.objects.create(
#             first_name=data['name'],
#             username=data['email'],
#             email=data['email'],
#             password=make_password(data['password'])
#         )

#         serializer = UserSerializerWithToken(user, many=False)
#         return Response(serializer.data)
#     except:
#         message = {'detail': 'User with this email already exists'}
#         return Response(message, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers(request):
    users = User.objects.all()
    
    serializer = UserSerializer(users, many=True)

    return Response(serializer.data)

# for admin control
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUser(request , pk):
    user = User.objects.get(id=pk)


    data = request.data

    user.first_name = data['name']
    user.username = data['email']
    user.email = data['email']
    user.is_staff = data['isAdmin']

    user.save()
    

    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)





@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUserById(request, pk ):
    user = User.objects.get(id=pk)
    
    serializer = UserSerializer(user, many=False)

    return Response(serializer.data)



@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteUser(request, pk):
    userForDeletion = User.objects.get(id=pk)
    userForDeletion.delete()
    return Response('User was deleted')
