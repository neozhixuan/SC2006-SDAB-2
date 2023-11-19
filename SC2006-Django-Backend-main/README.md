# SC2006-Django-Backend

## Initialise Project
1. `pip install -r requirements.txt`
2. `cd backendProject`
3. Navigate to `apps.py` and comment out every line of `update_model_from_firebase()`
4. `python manage.py makemigrations`
5. `python manage.py migrate`
6. Navigate to `apps.py` and uncomment every line of `update_model_from_firebase()`
7. Optional: `python manage.py createsuperuser` to create your own user
8. `python manage.py runserver`

## Navigation
When you have started http://127.0.0.1:8000/, you can navigate around:
1. http://127.0.0.1:8000/admin/ and login to your user
2. http://127.0.0.1:8000/api/orderdata/

