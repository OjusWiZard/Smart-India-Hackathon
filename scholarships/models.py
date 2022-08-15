from django.db import models
from accounts.models import User
from documents.models import Attribute


class Logic(models.Model):
    name = models.CharField(max_length=8)

    def __str__(self):
        return self.name


class Scholarship(models.Model):
    name = models.CharField(max_length=128)
    description = models.TextField(max_length=4096)
    amount = models.IntegerField()
    no_of_claims = models.IntegerField(auto_created=True, default=0)
    starting = models.DateTimeField()
    duration = models.DurationField()
    applications = models.ManyToManyField(User, through='Application', blank=True)
    attribute_checks = models.ManyToManyField(Attribute, through='EligibilityCheck', blank=True)

    def __str__(self):
        return self.name


class EligibilityCheck(models.Model):
    edge_value = models.CharField(max_length=256)
    scholarship = models.ForeignKey(Scholarship, on_delete=models.CASCADE)
    attribute = models.ForeignKey(Attribute, on_delete=models.CASCADE)
    logic = models.ForeignKey(Logic, on_delete=models.CASCADE)

    def __str__(self):
        return self.scholarship.name + ' - ' + self.attribute.name + self.logic.name + self.edge_value


class Application(models.Model):
    status = models.CharField(max_length=16, default='Pending')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    scholarship = models.ForeignKey(Scholarship, on_delete=models.CASCADE)
    eligibilities = models.ManyToManyField(EligibilityCheck, through='Eligibility', blank=True)

    def __str__(self):
        return self.scholarship.name + ' - ' + self.user.full_name


class Eligibility(models.Model):
    passed = models.BooleanField(default=False)
    application = models.ForeignKey(Application, on_delete=models.CASCADE)
    eligibility_check = models.ForeignKey(EligibilityCheck, on_delete=models.CASCADE)

    def __str__(self):
        return self.application + ' - ' + self.eligibility_check.attribute + ' - ' + ('Passed' if self.passed else 'Failed')

    class Meta:
        verbose_name_plural = 'Eligibilities'