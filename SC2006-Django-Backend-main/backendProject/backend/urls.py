from django.urls import path
from django.contrib import admin
from django.urls import include, path
from . import views

urlpatterns = [
    # Default Path
    path("", views.index, name="index"),

    ##########################
    # Functions called by controller classes
    ##########################
    path('fn/expiringFoods', views.filterForExpiringStock,
         name="filterForLowStock"),
    path('fn/filterForLowStock', views.filterForLowStock,
         name="filterForLowStock"),
    path('fn/getItemNames', views.getItemNames, name="getItemNames"),

    ##########################
    # POST Requests
    ##########################
    path('fn/createInventory/', views.createInventory, name='createInventory'),
    path('fn/createMarketplace/', views.createMarketplace,
         name='createMarketplace'),
    path('fn/createPrediction/', views.createPrediction, name='createPredictions'),
    path('fn/createSupplier/', views.createSupplier, name='createSupplier'),
    path('fn/suggestedMenu/', views.suggest_menu_items, name='suggestedMenu'),

    ##########################
    # REST API URLS
    ##########################
    path('api/inventory/', views.InventoryList.as_view(), name='inventory-list'),
    path('api/marketplace/', views.MarketplaceList.as_view(),
         name='marketplace-list'),
    path('api/predictions/', views.PredictionsList.as_view(),
         name='predictions-list'),
    path('api/predictions/<int:pk>/',
         views.PredictionsDetail.as_view(), name='predictions-detail'),
    path('api/supplier/', views.SupplierList.as_view(), name='supplier-list'),
]
