import random
coins = 0
def intro():
    instructions1 = input('Type pls search, pls beg, pls gamble, pls kill or pls exit: ')
    if instructions1 == 'pls beg' or instructions1 == 'pls gamble' or instructions1 == 'pls search':
        currency()
    elif instructions1 == 'pls exit':
        print('Your wallet has', coins,'coins in it!')
    elif instructions1 == 'pls kill':
        victim = input('Who do you wanna kill?: ')
        print(victim, 'slipped on the bathroom floor while trying to find coins and choked.')
        intro()
    else:
        print('What are you doing?! That isn\'t a command!')
        intro()

def currency():
    global coins
    console = input('Enter your command again: ')
    if console == 'pls search':
        getornot = random.randint(0, 1)
        if getornot == 1:
            coins = coins+random.randint(1, 1000)
            print('You found some coins')
            print('Your wallet has', coins, 'coins in it!')
            intro()
        else:
            print('You didn\'t find anything.')
            print('Your wallet has', coins, 'coins in it.')
            intro()
    elif console == 'pls beg':
        getornot1 = random.randint(0, 1)
        if getornot1 == 1:
            coins = coins+random.randint(1, 500)
            print('Somebody gave you some coins')
            print('Your wallet has', coins, 'coins in it!')
            intro()
        else:
            print('Nobody gave you anything.')
            print('Your wallet has', coins, 'coins in it.')
            intro()
    elif console == 'pls gamble':
        getornot2 = random.randint(0, 2)
        if getornot2 == 2:
            print('You won a game of poker and you got some coins')
            coins = coins+random.randint(1, 3000)
            print('Your wallet has', coins, 'coins in it!')
            intro()
        else:
            print('You lost a game of poker')
            coins = coins-random.randint(1, 500)
            print('Your wallet has', coins, 'coins in it!')
            intro()
    else:
        print('That\'s not a command! What are you doing?!')
        intro()
            

print('I\'m Dank Memer, the Python Bot. Not the Discord bot')
intro()
