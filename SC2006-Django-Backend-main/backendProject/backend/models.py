from django.contrib.auth.models import AbstractUser
from django.db import models
from django.db.models import JSONField
from django.utils import timezone


class Inventory(models.Model):
    item_id = models.PositiveIntegerField(primary_key=True, default=0)
    item_name = models.CharField(max_length=100, default='default_value')
    flow_rate = models.PositiveIntegerField(default=0)
    expiry_date = models.DateTimeField(default=timezone.now)
    quantity = models.PositiveIntegerField(default=0)
    entry_date = models.DateTimeField(default=timezone.now)


class Marketplace(models.Model):
    item_id = models.PositiveIntegerField(primary_key=True, default=0)
    item_name = models.CharField(max_length=100, default='default_value')
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    description = models.CharField(max_length=100, default='default_value')


class Suppliers(models.Model):
    item_id = models.PositiveIntegerField(primary_key=True, default=0)
    item_name = models.CharField(max_length=100, default='default_value')
    item_sold = models.CharField(max_length=100, default='default_value')
    phone_no = models.PositiveIntegerField(default=0)


class Predictions(models.Model):
    item_id = models.PositiveIntegerField(primary_key=True, default=0)
    item_name = models.CharField(max_length=100, default='default_value')
    quantity = models.PositiveIntegerField(default=0)
