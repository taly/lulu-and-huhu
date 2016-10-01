from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect, HttpResponseForbidden
from django.template import loader
from django.core.urlresolvers import reverse
import json

from level_map import levels

def index(request):
    return render(request, 'game/base.html', {})

def level(request, url_key):
	for i in range(len(levels)):
		level = levels[i]
		if url_key == level.url_key:
			# return render(request, 'game/base.html', {})
			return HttpResponse("Level: %d, URL key: %s, passwords: %s" % (i, url_key, level.passwords))
	return HttpResponse("Level not found for URL key: %s" % url_key)

def submit_password(request):
	if request.method == 'POST':
		print "REQUEST = %s " % request.body
		payload = json.loads(request.body)
		password = payload['password']
		print "Password: %s" % password
		password = ''.join(x.strip().lower() for x in password.split())
		for i in range(len(levels)):
			level = levels[i]
			for possible_password in level.passwords:
				print "Possible password: %s" % possible_password
				if possible_password == password:
					redirect_url = reverse("level", kwargs={"url_key": level.url_key})
					return HttpResponse(json.dumps({"redirect": redirect_url}))
		return HttpResponseForbidden()
