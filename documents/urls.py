from django.urls import include, path
from rest_framework import routers

from .views import DocumentViewSet, AttributeViewSet

routers = routers.DefaultRouter()
routers.register("attributes", AttributeViewSet)
routers.register("", DocumentViewSet)

urlpatterns = [
    path("", include(routers.urls)),
]
