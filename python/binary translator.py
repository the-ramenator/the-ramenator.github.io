def print_bin(c):
    print("{0:b}".format(c),)

string = input("Enter the string: ")
for i in string:
   asc = ord(i)
   print_bin(asc)
