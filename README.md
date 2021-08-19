# CreativeRealms
Creative Realms is a classic dungeon crawler game with an overhead perspective.
It is driven by JSON configuration files which define Rooms, Items, and NPC characters.

Each room represents a single image tile and JQuery asists in navigation between them.

LAYOUT YOUR OWN DUNGEON!<br>
Rooms.js is where you can define your own unique dungeon layout.
Each room can contain various items, NPC characters and doors

GATE KEEPING STRATEGY<br>
Moving through the dungeon is really a function of getting past various gate keepers.
Gate Keepers include:
- Locked doors which require specific keys
- Unlit rooms
- NPC characters (currently NPC characters are in the game but they don't prevent movement)

Doors may be locked with unique keys which are found in other rooms. These keys are all defined within Items.js.

Items.js contains all of the various defined items including food, weapons and treasure!

Player Health is on a 0 to 100 scale
Player Experience provides probability, damage and score bonus on a scale of 0 to 5000. 
Note: If you play long enough to reach 5000XP then you will always hit your mark!

Rooms.js
HOW TO: Defining the correct background image and doors to match!<br>

Everthing is defined in this order: North, South, East, West!
* Please make sure there is a matching image for your layout in the 'src' file before attempting to define your room!

An image with a name like "NNYN001.png" has "No NORTH door, No SOUTH door, Yes EAST door, and No WEST door." Get it?

Then look in the JSON and notice that ALL rooms have a four value array for each door too as follows:<br><br>
  Doors:[<br>
  &nbsp; {<br>
  &nbsp;//North<br><br>
  &nbsp;},{ <br>
  &nbsp;//South<br><br>
  &nbsp;},{<br>
  &nbsp;//East<br>
  &nbsp;Description: "cedar plank",<br>
  &nbsp;LeadsTo: 1<br>
  &nbsp;},{<br>
  &nbsp;//West<br><br>
  &nbsp;}]<br>
      
You will need to keep all four door objects in the array and just don't define the door if you don't want it in your room.
