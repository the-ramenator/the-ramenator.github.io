firstnummer = input('Enter first number: ')
firstnummer = int(firstnummer)
print()
secondnummer = input('Enter second number: ')
secondnummer = int(secondnummer)
print()
thirdnummer = input('Enter third number: ')
thirdnummer = int(thirdnummer)
print()
fourthnummer = input('Enter fourth number: ')
fourthnummer = int(fourthnummer)
div1 = firstnummer*secondnummer
div2 = thirdnummer*fourthnummer
if div1 > div2:
    print()
    print(firstnummer, '*', secondnummer, '>', thirdnummer, '*', fourthnummer)
elif div1 < div2:
    print()
    print(firstnummer, '*', secondnummer, '<', thirdnummer, '*', fourthnummer) 

