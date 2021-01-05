import pyshorteners

def main():

    link = input('Enter the link here: ')

    shortener=pyshorteners.Shortener()

    x = shortener.tinyurl.short(link)

    print(x)

    yorn = input('Would you like to shorten another url? y/n: ')

    if yorn == 'Y':

        yorn = 'y'

    elif yorn == 'N':

        yorn = 'n'

    while not(yorn == 'y' or yorn == 'n'):

        yorn = input('Invalid input. Would you like to shorten another url? y/n: ')

    if yorn == 'y':

        main()

    else:

        print('Goodbye!')

        exit

main()
