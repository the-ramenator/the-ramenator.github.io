#Python Turtle Cheat Sheet
#Made by neildaniel00
#I assume you already have basic knowledge of Python and math in general. If you don't, well Google it.

import turtle #Make all the turtle commands available to your program
turtle.shape('type') #Set the shape. Can be: square, arrow, circle, turtle, triangle, or classic
turtle.speed(integer) #Set the animation speed of the turtle. 1 = slowest, 10 = fastest. 0 turns off animation completely
turtle.forward(distance) #Go forwards by amount distance
turtle.backward(distance) #Go backwards by amount distance
turtle.right(angle) #Turn right by angle degrees
turtle.left(angle) #Turn left by ANGLE degrees
turtle.home() #Go home to (0, 0) and face north
turtle.goto(x, y) #Go to position x, y
turtle.setheading(degrees) #Point in compass direction degrees. 0 is north, 90 is east, 180 is south, 270 is west.
alex = turtle.Turtle() #Name your turtle. It can be anything. Replace alex with your turtle's name.

#Other useful commands
x, y = turtle.pos() #Sets the variables x and y to the turtle’s current position
turtle.resizemode('auto') #Use this command at the start of your program to change the size of the turtle when the pen size changes. Useful for stamping!
turtle.circle(radius) #Draw a circle with the given radius (a number). radius can be negative.
turtle.circle(radius, angle) #Draw a part of a circle with radius. The angle denotes how much of the circle is drawn. For example, if angle is 180 then a semicircle will be drawn. angle can be negative.

#Paint and fill
turtle.begin_fill() #Use this command before you start drawing the shape you want to be filled.
turtle.end_fill() #Use this command when you have finished drawing the shape to be filled.
turtle.pendown() #Put the pen down to draw. This is the default setting.
turtle.penup() #‘Lift’ the pen from the screen
turtle.pensize(integer) #Set the size of the pen to the given integer.
turtle.pencolor(string) #Set the pen color to the string given. Note the American spelling.
turtle.fillcolor(string) #Set the fill colour to the string given. See list of colours below.
turtle.color(string) #Set both the fill colour and pen colour to given string.
turtle.color(string1, string2) #Set the pen and fill colour at the same time. String1 should be the name of the pen colour, and string2 is the fill colour. More about colors in the Colors section.

#Stamp Stuff
turtle.stamp() #Stamp the current turtle shape onto the 
turtle.clearstamps() #Clear all of the stamps on the screen.
stampID = turtle.stamp() #Stamps the turtle onto the screen, and sets the variable stampID to an integer, unique to each stamp.
turtle.clearstamp(stampID) #Clear the stamp with the given stampID number.

#Loops
for i in range(integer): #This says for variable i (don't declare it anywhere else but here), loop this a certain number of times. Code after this requires an indent.

#Lists
color_list = ["red", "orange", "yellow", "green", "blue"] #Makes a list name (color_list) and assigns the colors red, orange..., blue to it.

#Random Make sure you import the random module before using these
myColor = random.choice(color_list) #Picks a random color from the color list.
turtle.forward(random.randint(1, 100) #Make the turtle go forward a random amount between 1 and 100. Works for backwards, left and right.

#Color List (Separated by a space or an enter)
chartreuse2 DarkOrchid4 goldenrod2 LightBlue2
chartreuse3 DarkRed goldenrod3 LightBlue3
AliceBlue chartreuse4 DarkSalmon goldenrod4 LightBlue4
AntiqueWhite chocolate DarkSeaGreen green LightCoral
AntiqueWhite1 chocolate1 DarkSeaGreen1 green1 LightCyan
AntiqueWhite2 chocolate2 DarkSeaGreen2 green2 LightCyan1
AntiqueWhite3 chocolate3 DarkSeaGreen3 green3 LightCyan2
AntiqueWhite4 chocolate4 DarkSeaGreen4 green4 LightCyan3
aquamarine coral DarkSlateBlue GreenYellow LightCyan4
aquamarine1 coral1 DarkSlateGray grey LightGoldenrod
aquamarine2 coral2 DarkSlateGray1 greyX
aquamarine3 coral3 DarkSlateGray2 honeydew LightGoldenrod1
aquamarine4 coral4 DarkSlateGray3 honeydew1 LightGoldenrod2
azure CornflowerBlue DarkSlateGray4 honeydew2 LightGoldenrod3
azure1 cornsilk DarkSlateGrey honeydew3 LightGoldenrod4
azure2 cornsilk1 DarkTurquoise honeydew4 LightGreen
azure3 cornsilk2 DarkViolet HotPink LightGrey
azure4 cornsilk3 DeepPink HotPink1 LightPink
beige cornsilk4 DeepPink1 HotPink2 LightPink1
bisque cyan DeepPink2 HotPink3 LightPink2
bisque1 cyan1 DeepPink3 HotPink4 LightPink3
bisque2 cyan2 DeepPink4 IndianRed LightPink4
bisque3 cyan3 DeepSkyBlue IndianRed1 LightSalmon
bisque4 cyan4 DeepSkyBlue1 IndianRed2 LightSalmon1
black DarkBlue DeepSkyBlue2 IndianRed3 LightSalmon2
blanchedalmond DarkCyan DeepSkyBlue3 IndianRed4 LightSalmon3
BlanchedAlmond DarkGoldenrod DeepSkyBlue4 ivory LightSalmon4
blue DarkGoldenrod1 DimGray ivory1 LightSeaGreen
blue1 DarkGoldenrod2 DimGrey ivory2 LightSkyBlue
blue2 DarkGoldenrod3 DodgerBlue ivory3 LightSkyBlue1
blue3 DarkGoldenrod4 DodgerBlue1 ivory4 LightSkyBlue2
blue4 DarkGray DodgerBlue2 khaki LightSkyBlue3
BlueViolet DarkGreen DodgerBlue3 khaki1 LightSkyBlue4
brown DarkGrey DodgerBlue4 khaki2 LightSlateBlue
brown1 DarkKhaki firebrick khaki3 LightSlateGrey
brown2 DarkMagenta firebrick1 khaki4 LightSteelBlue
brown3 DarkOliveGreen firebrick2 lavender LightSteelBlue1
brown4 DarkOliveGreen1 firebrick3 LavenderBlush LightSteelBlue2
burlywood DarkOliveGreen2 firebrick4 LavenderBlush1 LightSteelBlue3
burlywood1 DarkOliveGreen3 FloralWhite LavenderBlush2 LightSteelBlue4
burlywood2 DarkOliveGreen4 ForestGreen LavenderBlush3 LightYellow
burlywood3 DarkOrange gainsboro LavenderBlush4 LightYellow1
burlywood4 DarkOrange1 GhostWhite LawnGreen LightYellow2
CadetBlue DarkOrange2 gold LemonChiffon LightYellow3
CadetBlue1 DarkOrange3 gold1 LemonChiffon1 LightYellow4
CadetBlue2 DarkOrange4 gold2 LemonChiffon2 LimeGreen
CadetBlue3 DarkOrchid gold3 LemonChiffon3 linen
CadetBlue4 DarkOrchid1 gold4 LemonChiffon4 magenta
chartreuse DarkOrchid2 goldenrod LightBlue magenta1
chartreuse1 DarkOrchid3 goldenrod1 LightBlue1 magenta2
magenta3 OrangeRed1 red2 snow3
magenta4 OrangeRed2 red3 snow4
maroon OrangeRed3 red4 SpringGreen
maroon1 OrangeRed4 RosyBrown SpringGreen1
maroon2 orchid RosyBrown1 SpringGreen2
maroon3 orchid1 RosyBrown2 SpringGreen3
maroon4 orchid2 RosyBrown3 SpringGreen4
MediumAquamarine orchid3 RosyBrown4 SteelBlue
MediumBlue orchid4 RoyalBlue SteelBlue1
MediumOrchid PaleGoldenrod RoyalBlue1 SteelBlue2
MediumOrchid1 PaleGreen RoyalBlue2 SteelBlue3
MediumOrchid2 PaleGreen1 RoyalBlue3 SteelBlue4
MediumOrchid3 PaleGreen2 RoyalBlue4 tan
MediumOrchid4 PaleGreen3 SaddleBrown tan1
MediumPurple PaleGreen4 salmon tan2
MediumPurple1 PaleTurquoise salmon1 tan3
MediumPurple2 PaleTurquoise1 salmon2 tan4
MediumPurple3 PaleTurquoise2 salmon3 thistle
MediumPurple4 PaleTurquoise3 salmon4 thistle1
MediumSeaGreen PaleTurquoise4 SandyBrown thistle2
MediumSlateBlue PaleVioletRed SeaGreen thistle3
MediumSpringGreen PaleVioletRed1 SeaGreen1 thistle4
MediumTurquoise PaleVioletRed2 SeaGreen2 tomato
MediumVioletRed PaleVioletRed3 SeaGreen3 tomato1
MidnightBlue PaleVioletRed4 SeaGreen4 tomato2
MintCream PapayaWhip seashell tomato3
MistyRose PeachPuff seashell1 tomato4
MistyRose1 PeachPuff1 seashell2 turquoise
MistyRose2 PeachPuff2 seashell3 turquoise1
MistyRose3 PeachPuff3 seashell4 turquoise2
MistyRose4 PeachPuff4 sienna turquoise3
moccasin peru sienna1 turquoise4
NavajoWhite pink sienna2 violet
NavajoWhite1 pink1 sienna3 VioletRed
NavajoWhite2 pink2 sienna4 VioletRed1
NavajoWhite3 pink3 SkyBlue VioletRed2
NavajoWhite4 pink4 SkyBlue1 VioletRed3
NavyBlue plum SkyBlue2 VioletRed4
OldLace plum1 SkyBlue3 wheat
OliveDrab plum2 SkyBlue4 wheat1
OliveDrab1 plum3 SlateBlue wheat2
OliveDrab2 plum4 SlateBlue1 wheat3
OliveDrab3 PowderBlue SlateBlue2 wheat4
OliveDrab4 purple SlateBlue3 white
orange purple1 SlateBlue4 WhiteSmoke
orange1 purple2 SlateGrey yellow
orange2 purple3 snow yellow1
orange3 purple4 snow1 yellow2
orange4 red snow2 yellow3
OrangeRed red1 snow3 yellow4
YellowGreen



#Loop Example:
for n in range(3):#Triangle
    turtle.forward(100)
    turtle.right(120)
for i in range(4):#Square
    turtle.forward(100)
    turtle.right(90)
for v in range(5):#Pentagon
    turtle.forward(100)
    turtle.right(72)
for t in range(8):#Octogon
    turtle.forward(100)
    turtle.right(45)
