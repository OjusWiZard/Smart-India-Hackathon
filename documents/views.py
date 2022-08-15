from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.viewsets import ReadOnlyModelViewSet
from .models import DocumentOwnership, Attribute
from .serializers import DocumentOwnershipSerializer, AttributeSerializer


class DocumentViewSet(ReadOnlyModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = DocumentOwnership.objects.all()
    serializer_class = DocumentOwnershipSerializer

    def get_queryset(self):
        return DocumentOwnership.objects.filter(owner=self.request.user)


class AttributeViewSet(ReadOnlyModelViewSet):
    permission_classes = [AllowAny]
    queryset = Attribute.objects.all()
    serializer_class = AttributeSerializer
