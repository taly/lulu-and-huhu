from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^(?P<url_key>[a-zA-Z0-9]+)/$', views.level, name='level')
]