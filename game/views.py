from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect, HttpResponseForbidden
from django.template import loader
from django.core.urlresolvers import reverse
import json

from level_map import levels

def index(request):
    return render(request, 'game/intro.html', {})

def level(request, level_code):
	for i in range(len(levels)):
		level = levels[i]
		if level_code == level.level_code:
			return render(request, 'game/level.html', context={'name': level.name, 'level_num': (i+1)})
	return HttpResponse("Level not found with code: %s" % level_code)

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
					redirect_url = reverse("level", kwargs={"level_code": level.level_code})
					return HttpResponse(json.dumps({"redirect": redirect_url}))
		return HttpResponseForbidden()
