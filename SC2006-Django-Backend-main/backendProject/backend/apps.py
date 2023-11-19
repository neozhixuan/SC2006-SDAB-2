from django.apps import AppConfig


class BackendConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'backend'

    def ready(self):
        from .models import Inventory, Marketplace, Suppliers, Predictions
        from .views import update_model_from_firestore

        # Delete all models in backend
        Inventory.objects.all().delete()
        Marketplace.objects.all().delete()
        Suppliers.objects.all().delete()
        Predictions.objects.all().delete()
        update_model_from_firestore(Inventory, "Inventory")
        update_model_from_firestore(Marketplace, "Marketplace")
        update_model_from_firestore(Suppliers, "Suppliers")
        update_model_from_firestore(Predictions, "Prediction")
