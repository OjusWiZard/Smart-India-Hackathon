from django.urls import include, path
from rest_framework import routers

from .views import LogicViewSet, ScholarshipViewSet, ApplicationViewSet

routers = routers.DefaultRouter()
routers.register("logic", LogicViewSet)
routers.register("scholarship", ScholarshipViewSet)
routers.register("application", ApplicationViewSet)

urlpatterns = [
    path("", include(routers.urls)),
]
