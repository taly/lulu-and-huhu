from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader

from level_map import levels

def index(request):
    return render(request, 'game/base.html', {})

def level(request, url_key):
	for level in levels:
		if url_key == level.url_key:
			return render(request, 'game/base.html', {})
			#return HttpResponse("URL key: %s, solutions: %s" % (url_key, level.solutions))
	return HttpResponse("Level not found for URL key: %s" % url_key)

def submit_solution(request, solution):
	if request.method == 'POST':
		solution = ''.join[(x.strip().lower() for x in solution.split())]
		url_key = request.path.split('/')[0]	
		for i in range(len(levels)):
			level = levels[i]
			if url_key == level.url_key:
				for possible_solution in level.solutions:
					if possible_solution == solution:
						pass # TODO redirect to level i+1
		# TODO return bad solution
