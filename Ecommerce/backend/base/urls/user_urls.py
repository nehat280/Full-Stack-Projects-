from django.urls import path
from base.views import user_views as views 


urlpatterns=[
    path('login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('register/', views.registerUser, name = "register"),
    path('profile/', views.getUserProfile, name='users-profile'),
    path('profile/update/', views.updateProfile, name='user-profile-update'),
    path('', views.getUsers, name="users"),
    path('update/<str:pk>/', views.updateUser, name="user-update"),
    path('<str:pk>/', views.getUserById, name="user"),
    path('delete/<str:pk>/', views.deleteUser, name="user-delete"),

]