# Words: tzarot, london, santiago, telaviv, nido, hermione, alexandra, igglepiggle, seven (netball team), mcavity, louispasteur, uri, lanarkmansions, 

class Level(object):
	def __init__(self, level_code, name, passwords):
		self.level_code = level_code
		self.name = name
		self.passwords = passwords


levels = [
	Level("69152a4bfd4a", "harry_potter", ["happybirthday"]), # Zoe 1 in sink
	Level("f3af3da13739", "chuchkovich", ["phoenix"]), # Lamed & Zeidale
	Level("8fbee8ca1649", "tic_tac_toe", ["hamlor", "chamlor", "hamtalor", "chamtalor"]), # Zoe 2 in car
	# TODO add small Lamed level here
	Level("a0279df3b51e", "matti", ["beepbeep"]), # Zoe 3 + Lamed with popsicle
	Level("d8a21e8b9bad", "memory", ["piano"]), # Lamed - payoff TODO
	Level("179ef5e3aef6", "hitchhiker", ["kiliv", "kelev"]), # Payoff TODO video Lamed in the tree reciting the final frontier!!!
	Level("a810928aafe6", "hangman", ["space"]), # Lamed & Zoe small with the shoes - need to be earlier
]

# UUID pool:
# 821826bfa066
# ebec8e921cc9
# 42860a1fc5f9
# 27e2f82fa5f9
# 29b652c8b946
# 5acac80916a2
# 9140138110ac
# d496a137e9dc
# 2befab1abe8d