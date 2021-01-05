num1 = input('Enter a number: ')
num1 = int(num1)
num2 = input('Enter another number: ')
num2 = int(num2)
sign = input('What operation would you like to use? [/ - + *]:')
while not(sign == '/' or sign == '-' or sign == '+' or sign == '*'):
    sign = input('What operation would you like to use? [/ - + *]:')
if sign == '*':
    result = num1*num2
elif sign == '/':
    result = num1/num2
elif sign == '-':
    result = num1-num2
elif sign == '+':
    result = num1+num2
print(num1, sign, num2, '=', result)
