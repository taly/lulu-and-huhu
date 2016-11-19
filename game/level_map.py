# Words: tzarot, london, santiago, telaviv, nido, hermione, alexandra, igglepiggle, seven (netball team), mcavity, louispasteur, uri, lanarkmansions, 

class Level(object):
	def __init__(self, level_code, name, passwords):
		self.level_code = level_code
		self.name = name
		self.passwords = passwords


levels = [
	Level("69152a4bfd4a", "harry_potter", ["phoenix"]), # Zoe 1 in sink
	Level("f3af3da13739", "chuchkovich", ["hamlor", "chamlor", "hamtalor", "chamtalor", "khamlor", "khamtalor"]), # Lamed & Zeidale
	Level("a810928aafe6", "hangman", ["heels"]), # Lamed & Zoe small with the shoes
	Level("8fbee8ca1649", "tic_tac_toe", ["beepbeep"]), # Zoe 2 in car
	Level("a0279df3b51e", "matti", ["piano"]), # Lamed TODO
	Level("d8a21e8b9bad", "memory", ["kiliv", "kelev"]), # Zoe TODO
	Level("179ef5e3aef6", "hitchhiker", ["space"]), # Lamed (17) reciting the final frontier
	Level("821826bfa066", "family_tree", ["temp"]), # Zoe TODO
	Level("ebec8e921cc9", "objects_riddle", ["21", "twentyone"]), # Lamed TODO
	Level("42860a1fc5f9", "song", ["memory"]), # Zoe TODO
]

# UUID pool:
# 27e2f82fa5f9
# 29b652c8b946
# 5acac80916a2
# 9140138110ac
# d496a137e9dc
# 2befab1abe8d