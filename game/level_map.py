# Words: tzarot, london, santiago, telaviv, nido, hermione, alexandra, igglepiggle, seven (netball team), mcavity, louispasteur, uri, lanarkmansions, 

class Level(object):
	def __init__(self, level_code, name, passwords):
		self.level_code = level_code
		self.name = name
		self.passwords = passwords


levels = [
	Level("69152a4bfd4a", "harry_potter", ["happybirthday"]),
	Level("f3af3da13739", "chuchkovich", ["phoenix"]),
	Level("8fbee8ca1649", "tic_tac_toe", ["hamlor", "chamlor", "hamtalor", "chamtalor"]),
	Level("a0279df3b51e", "matti", ["beepbeep"]),
	Level("d8a21e8b9bad", "memory", ["piano"]),
]