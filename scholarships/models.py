from datetime import datetime
from django.db import models
from accounts.models import User


class Document(models.Model):
    name = models.CharField(max_length=128)
    owned_by = models.ManyToManyField(User, related_name='documents', through='DocumentOwnership')

    def __str__(self):
        return self.name


class Attribute(models.Model):
    name = models.CharField(max_length=128)
    _type = models.CharField(max_length=32)

    def __str__(self):
        return self.name


class Option(models.Model):
    attribute = models.ForeignKey(Attribute, on_delete=models.CASCADE)
    name = models.CharField(max_length=32)

    def __str__(self):
        return self.name + ' for ' + self.attribute.name


class Value(models.Model):
    attribute = models.ForeignKey(Attribute, on_delete=models.CASCADE)
    option = models.ForeignKey(Option, on_delete=models.CASCADE, blank=True, null=True)
    value = models.CharField(max_length=256, blank=True, null=True)

    def __str__(self):
        if self.attribute._type == 'time':
            return str(datetime.fromtimestamp(int(self.value))) + ' for ' + self.attribute.name
        if self.option:
            return self.option.name + ' as ' + self.attribute.name
        else:
            return self.value + ' as ' + self.attribute.name


class DocumentOwnership(models.Model):
    document = models.ForeignKey(Document, on_delete=models.CASCADE)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    values = models.ManyToManyField(Value, blank=True)

    def __str__(self):
        return self.document.name + ' of ' + self.owner.full_name