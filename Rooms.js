var Room = [{
  ID: 11,
  Name: "The Wishing Well",
  Description: "The walls in this room are smooth cement. The area is dimly lit by an opening in the ceiling where there are roots dangling in. The floor is made of large flat stones and mortar.",
  NeedsLight: false,
  Items:[
    {ID:0,Qty:37},
    {ID: 36, Qty: 2},
    {ID:50, Qty: 1, SubID: 2, Text: "Collect notes along your quest for hints and pass phrases."}
  ],
  Image: "NYNN002.jpg",
  Doors:[
    {
      //North
    },{ 
      //South
      Description: "cedar plank",
      LeadsTo: 1
    },{
      //East
    
    },{
      //West
    }]
},{
  ID: 0,
  Name: "A storage room",
  Description: "This room is small, dark and dusty.",
  NeedsLight: false,
  Items:[{ID: 9, Qty: 1},{ID:11, Qty: 1}],
  Image: "NNYN001.jpg",
  Doors:[
    {
      //North
    },{ 
      //South
    },{
      //East
    Description: "cedar plank",
    LeadsTo: 1
    },{
      //West
    }]
},
{
  ID: 1,
  Name:"The Foyer",
  Description: "This intersection room is made up of stone walls. The entry from the Wishing Well is an open doorway.",
  NeedsLight: false,
  Items: [],
  NPCs: [{ID:2, Health: 5}],
  Image: "YYYY001.jpg",
  Doors:[{
    // North
      Description: "No door",
      LeadsTo: 11,
    },{      
    // South
      Description: "iron bar",
      LeadsTo: 2,
      Locked: true,
      Key: 11
    },{
    // East
      Description: "heavy oak",
      LeadsTo: 10,
      Locked: true,
      Key: 12
    },{
    // West
      Description: "cedar plank",
      LeadsTo: 0
  }]
},{
  ID: 2,
  Name: "The Cleric's Library",
  Description: "This looks to be a cleric's library. The books are very old and falling apart. You don't recognize the language they are written in.",
  NeedsLight: false,
  Items:[{ID: 10, Qty: 1}],
  NPCs:[{ID:0, Health: 20}],
  Doors:[{
    //North
    Description: "Heavy oak",
    LeadsTo: 1
    },{
    //South
    Description: "Ornate iron",
    LeadsTo: 3,
    Key: 1
    },{
      //East
    },{
      //West
    }
   ],
   Image: "YYNN001.jpg"
},{
  ID: 3,
  Name: "The Armory",
  Description: "This room used to contain many fine weapons. Today it seems cleaned out.",
  NeedsLight: true,
  Items:[{ID: 37, Qty: 1}],
  NPCs:[{ID:2, Health: 5},{ID:2, Health: 5},{ID:2, Health: 5}],
  Image: "YNYY001.jpg",
  Doors:[
    {
      //North
      Description: "Ornate iron",
      LeadsTo: 2,
      Key: 1
    },{
      //South
      
    },{
      //East
      Description: "wooden",
      LeadsTo: 4
    },{
      //West
      Description: "iron bars",
      LeadsTo: 5      
    }
    ]
},{
  ID: 4,
  Name: "Servant's Dining Room",
  Description: "This small dining room was for entertaining large numbers of guests. There are windows in this room which are illuminated from a natural light source above.",
  NeedsLight: false,
  Items:[{ID: 1, Qty: 1},{ID:37, Qty: 2},{ID:38, Qty: 1}],
  Image: "NNYY001.jpg",
  Doors:[
    {
      //North

    },{
      //South
      
    },{
      //East
      Description: "oak door",
      LeadsTo: 6
    },{
      //West
      Description: "iron bars",
      LeadsTo: 3 
    }
    ]
  },{
    ID: 5,
    Name: "The storage pantry",
    Description: "The shelves in this pantry are nearly empty.",
    NeedsLight: false,
    Items:[{ID: 1, Qty: 1},{ID:36, Qty: 3},{ID:21, Qty: 1}],
    Image: "NNYN001.jpg",
    Doors:[
      {
        //North
  
      },{
        //South
        
      },{
        //East
        Description: "iron bars",
        LeadsTo: 3 
      },{
        //West
         
      }
      ]
  },{
    ID: 6,
    Name: "The Battle Room",
    Description: "A large room where adversaries face off",
    NeedsLight: false,
    Items:[{ID:12, Qty: 1}],
    NPCs:[{ID: 1, Health: 20}],
    Image: "NYNY001.jpg",
    Doors:[
      {
        //North
  
      },{
        //South
        Description: "oak door",
        LeadsTo: 7
      },{
        //East
      },{
        //West
        Description: "oak door",
        LeadsTo: 4         
      }
      ]
  },{
    ID: 7,
    Name: "Curving Corridor",
    Description: "This passageway simply leads down to another room.",
    NeedsLight: true,
    Items:[{ID: 50, Qty: 1, SubID: 1, Text: 'The secret phrase is "curvature"'}],
    Image: "YNNY001.jpg",
    Doors:[
      {
        //North
        Description: "oak door",
        LeadsTo: 6
      },{
        //South
                
      },{
        //East
        
      },{
        //West
        Description: 'oak door',
        LeadsTo: 12     
      }
      ]
  },{
    ID: 10,
    Name: "A tiny locked closet",
    Description: "You have unlocked a tiny closet with shelves of treasure!",
    NeedsLight: false,
    Items:[{ID: 1, Qty: 250},{ID: 2, Qty: 100},{ID:3, Qty: 5},{ID: 9, Qty: 1}],
    Image: "NNNY001.jpg",
    Doors:[
      {
        //North
      },{ 
        //South
      },{
        //East
      
      },{
        //West
        Description: "cedar plank",
        LeadsTo: 1
      }]
  },{
    ID: 12,
    Name: "Clearing in the woods",
    Description: "You have gone outside. This is a good size clearing surrounded by dense woods.",
    NeedsLight: false,
    Items:[{ID: 1, Qty: 20},{ID:23, Qty: 1}],
    Image: "NYYN003.jpg",
    Doors:[
      {
        //North
      },{ 
        //South
        Description: 'open path',
        LeadsTo: 13
      },{
        //East
        Description: 'oak door',
        LeadsTo: 7
      },{
        //West
        
      }]
  },{
    ID: 13,
    Name: "The end",
    Description: "You've stumbled across a pack of hell hounds feasting on bread rolls. Good luck!",
    NeedsLight: false,
    Items:[{ID: 36, Qty: 15}],
    NPCs:[{ID:0, Health: 20},{ID:0, Health: 20},{ID:0, Health:20}],
    Image: "YNNY003.jpg",
    Doors:[
      {
        //North
        Description: 'open path',
        LeadsTo: 12
      },{ 
        //South
        
      },{
        //East

      },{
        //West
        
      }]
  }
]