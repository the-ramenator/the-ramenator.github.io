###### IMPORTING RANDOM AND TIME & DEFINING VARIABLES ######

import random
import time

i = 0
Player1Points = 0
Player2Points = 0
Player1Tiebreaker = 0
Player2Tiebreaker = 0
Winner_Points = 0

###### LOGIN CODE ######

### This Sets logged in to false, and then makes sure the username and password is correct before allowing them to continue ###


logged_in1 = False
logged_in2 = False
while logged_in1 == False:
    username = input('What is your username? ')
    print('Welcome, ',username,' you have been successfully logged in.')
    logged_in1 = True
    user1 = username

while logged_in2 == False:
    username = input('What is your opponent\'s username? ')
    print('Welcome, ',username,' you have been successfully logged in.')
    logged_in2 = True
    user2 = username

print("Each player will be assigned 5 dice, which will be rolled automatically 5 times.")

###### DEFINING ROLL ######

### Makes the dice roll for the player and works out the total for that roll ###


def roll():

    points = 0

    die1 = random.randint(1,6)

    die2 = random.randint(1,6)

    dietotal = die1 + die2

    points = points + dietotal
    if die1 == die2:
        die3 = random.randint(1,10)
        points = points + die3

    return(points)

###### DICE ROLL ######

### This rolls the dice 5 times for the players, and then adds up the total. If the scores are equal, it starts a tie breaker and determines the winner off that ###

for i in range(1,5):
    cowefn = input('Press Enter to continue')
    Player1Points += roll()
    print('After this round ',user1, 'you now have: ',Player1Points,' Points')
    time.sleep(1)
    cowefddfdfn = input('Press Enter to continue')
    Player2Points += roll()
    print('After this round ',user2, 'you now have: ',Player2Points,' Points')
    time.sleep(1)

if Player1Points == Player2Points:
    while Player1Tiebreaker == Player2Tiebreaker:


        Player1Tiebreaker = random.randint(1,6)
        Player2Tiebreaker = random.randint(1,6)

    if Player1Tiebreaker > Player2Tiebreaker:
        Player2Points = 0
    elif Player2Tiebreaker > Player1Tiebreaker:
        Player1Points = 0

###### WORKING OUT THE WINNER ######

### This checks which score is bigger, then creates a tuple for my leaderboard code ( Gotton of stack overflow ) ###

if Player1Points>Player2Points:
    Winner_Points = Player1Points
    winner_User = user1
    winner = (Winner_Points, user1)
elif Player2Points>Player1Points:
    Winner_Points = Player2Points
    winner = (Winner_Points, user2)
    winner_User = user2

print('Well done, ', winner_User,' you won with ',Winner_Points,' Points')


###### CODE TO UPLOAD ALL SCORES TO A FILE ######

### This will store the winners username and score in a text file ###

winner = (Winner_Points,',',winner_User)
f = open('Winner.txt', 'a')
f.write(''.join(winner))
f.write('\n')
f.close()


###### CODE TO LOAD, UPDATE AND SORT LEADERBOARD ######

### This loads the leaderboard into an array, then compares the scores just gotton and replaces it ###

f = open('Leaderboard.txt', 'r')
leaderboard = [line.replace('\n','') for line in f.readlines()]
f.close()


for idx, item in enumerate(leaderboard):
    if item.split(', ')[1] == winner[1] and int(item.split(', ')[0]) < int(winner[0]):
            leaderboard[idx] = '{}, {}'.format(winner[0], winner[1])
    else:
        pass 

### This sorts the leaderboard in reverse, and then rewrites it ###

leaderboard.sort(reverse=True)

with open('Leaderboard.txt', 'w') as f:
    for item in leaderboard:
        f.write("%s\n" % item)
