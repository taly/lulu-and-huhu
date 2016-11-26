from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect, HttpResponseForbidden
from django.template import loader
from django.core.urlresolvers import reverse
import json

from level_map import levels

FIRST_PASSWORD = "happybirthday"

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
		payload = json.loads(request.body)
		password = payload['password']
		password = ''.join(x.strip().lower() for x in password.split())
		url = payload['current_path']

		if "level" in url:			
			level_code = url.strip('/').split('/')[-1]
			for i in range(len(levels) - 1):
				level = levels[i]
				if level.level_code == level_code:
					for possible_password in level.passwords:
						if possible_password == password:
							redirect_url = reverse("level", kwargs={"level_code": levels[i+1].level_code})
							return HttpResponse(json.dumps({"redirect": redirect_url}))
		elif password == FIRST_PASSWORD:
			level = levels[0]
			redirect_url = reverse("level", kwargs={"level_code": level.level_code})
			return HttpResponse(json.dumps({"redirect": redirect_url}))
		else: # From first page accept any other correct password
			for i in range(len(levels) - 1):
				level = levels[i]
				for possible_password in level.passwords:
					if possible_password == password:
						redirect_url = reverse("level", kwargs={"level_code": levels[i+1].level_code})
						return HttpResponse(json.dumps({"redirect": redirect_url}))

		return HttpResponseForbidden()
