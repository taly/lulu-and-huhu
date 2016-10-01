from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^level/(?P<url_key>[a-zA-Z0-9]+)/$', views.level, name='level'),
    url(r'^password/$', views.submit_password, name='password'),
]