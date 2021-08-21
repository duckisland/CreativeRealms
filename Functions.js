var currency = "dolats"
var gameOver = false
const baseExperience = 70
// return direction allows us to always keep the last door nav direction visible
var ReturnDirection = 0
var justLit = false
var load = true
const audBattle = document.getElementById("audBattle")
var genTimer

$(function(){
    // This is game initialization
    Player.Experience = baseExperience
    SetStage(11)
})

function SetStage(rID){
  if(gameOver){
    return
  }
  let room = getRoom(rID)
  BuildRoom(room)
  RoomNPCs(room)
  RoomItems(room)
  if(load){
    BuildNav(room)
    load = false
  }
  BuildPlayer()
  WeaponInHandSelector()
  HealthMeter()
  Experience()
}

function MovePlayer(direction){
  switch(direction){
    case 0:
      ReturnDirection = 1
      break
    case 1:
      ReturnDirection = 0
      break
    case 2:
      ReturnDirection = 3
      break
    case 3:
       ReturnDirection = 2
       break
  }
  const currentRoom = getRoom(Player.Location)
  const LeadsTo = currentRoom.Doors[direction].LeadsTo
  let thisKey = ''
  // Figure out which door button they clicked
  const door = currentRoom.Doors.find(e => e.LeadsTo == LeadsTo)
  if(door.Locked){
    // Figure out which key is needed. We have the ItemID in door.Key
    // but we need the description and we'll need to find that by searching
    thisKey = Item.find(e => e.ID == door.Key)
    if(Player.Items.find(e => e.ID == door.Key)){
      if(door.Locked){
        let aud = document.getElementById("audUnlock")
        aud.play()
        LogHistory('You have just unlocked the door','information')
      }       
      door.Locked = false    
    }
  }
  if(door.Locked){
    let aud = document.getElementById("audLocked")
    aud.play()
    let output = "This locked " + door.Description + " door requires " + aOrAn(thisKey.Description) + " " + thisKey.Description
    LogHistory(output,'')
  }else{
    // Door is open and player can finally move
    SetStage(LeadsTo)
  }    
}

function RoomNPCs(room){
  let status = ''
  let currentNPC = {}
  NPCHide()
  if(Array.isArray(room.NPCs) && room.NPCs.length && !room.NeedsLight){      
      room.NPCs.forEach((e, index) => {
        const elementID = index + 1
        const modelNPC = getNPC(e.ID)
        setTimeout(function(){
          // Set the correct sound for NPC
          ChangeAudio('audNPC' + elementID, modelNPC.Sound1)
          // Set the correct image for NPC
          $('#npc' + elementID).attr('src', 'src/' + modelNPC.Image)
          // Play NPC sound
          let aud = document.getElementById("audNPC1")
          aud.play()
          // Show NPC image
          $('#npc' + elementID).show()
          const aAn = aOrAn(modelNPC.Description)
          LogHistory('There is ' + aAn + ' ' + modelNPC.Description + ' in this room!','alert')
          // remove any existing click event first or you will have functions piling up!
          $('#npc' + elementID).off()
          $('#npc' + elementID).click(function(){
            AttackNPC(elementID, e.ID)               
          })
        }, 1300)
    })
  }
}

function getNPC(npcID){
  let currentNPC = NPC.find(e => e.ID == npcID)
  return currentNPC
}

function BuildRoom(room){
    tooDark = false
    Player.Location = room.ID
    let output = ""
    let roomDescription = ""
    if(load){
      $('#roomImage').attr('src', 'src/' + room.Image)
    } else {
      if(room.NeedsLight){
        tooDark = true
      }else{        
        if(justLit){
          // No animation needed since player is already in room
          $('#roomImage').attr('src', 'src/' + room.Image)
          $('#roomImage').fadeIn(1500)
          BuildNav(room)
        } else {
          // place animation here
          let aud = document.getElementById("audWalk")
          aud.play()
          AnimateRoomSwap(room)
        }        
      }
    }
    if(tooDark){
      $('#roomImage').hide()
      $('#title').html('Darkened Room')
      roomDescription = "It is too dark to see in this room! Get a candle and some flint to see doors and items."
      $("#roomdescription").html(roomDescription)
      $('#roomImage').attr('src', 'src/TooDark.jpg')
      BuildNav(room)
    }else{
    $("#title").html(room.Name)
      roomDescription = room.Description
      $("#roomdescription").html(roomDescription)
    }
}

function AnimateRoomSwap(room){
  NavHide()
  NPCHide()
  let imageEnd = {top: 0, left: 0}
  let swapStart = {top: 0, left:0}
  switch(ReturnDirection){
    case 0:
      $('#player').attr('src', 'src/walk-down.gif')
      // Return direction is North
      // Swap image must come in from below window
      swapStart.top = 200
      swapStart.left = 0
      imageEnd.top = -200
      imageEnd.left = 0
      break
    case 1:
      $('#player').attr('src', 'src/walk-up.gif')
      // Return direction is South
      // Swap image must come in from above window
      swapStart.top = -200
      swapStart.left = 0
      imageEnd.top = 200
      imageEnd.left = 0
      break
    case 2:
      $('#player').attr('src', 'src/walk-left.gif')
      // Return direction is East
      // Swap image must come in from the right of window
      swapStart.top = 0
      swapStart.left = -200
      imageEnd.top = 0
      imageEnd.left = 200
      break
    case 3:
      $('#player').attr('src', 'src/walk-right.gif')
      // Return direction is West
      // Swap image must come in from the left of window
      swapStart.top = 0
      swapStart.left = 200
      imageEnd.top = 0
      imageEnd.left = -200
      break
  }
  // Set the swap image src and starting point
  $('#roomImageTemp').attr('src','src/' + room.Image)
  $('#roomImageTemp').css( { left: swapStart.left, top: swapStart.top });
  $('#roomImageTemp').show()
  $('#roomImage').animate({left: imageEnd.left,top: imageEnd.top},1400)

    $('#roomImageTemp').animate({left: 0,top: 0},1400,
        function(){
        $('#roomImageTemp').css({left:-200,top:0})
        $('#roomImage').css({left:0, top: 0})
        $('#roomImage').attr('src','src/' + room.Image)
        $('#roomImage').show()
        $('#player').attr('src', 'src/walk.gif')
        BuildNav(room)
    })
}

function NavHide(){
  $('#btnNorth').hide()
  $('#btnSouth').hide()
  $('#btnEast').hide()
  $('#btnWest').hide()
}

function NPCHide(){
  $('#npc1').hide()
  $('#npc2').hide()
  $('#npc3').hide()
  $('#npc4').hide()
  $('#npc5').hide()
}

function BuildNav(room){
 NavHide()
 $('#player').attr('src', 'src/stand.gif')
 if(!isNaN(room.Doors[0].LeadsTo) && (!room.NeedsLight || ReturnDirection==0)){
     if(justLit){
       $('#btnNorth').fadeIn(2000)
     }else{
      $('#btnNorth').show()
     }
   }
   if(!isNaN(room.Doors[1].LeadsTo) && (!room.NeedsLight || ReturnDirection==1)){
     if(justLit){
       $('#btnSouth').fadeIn(2000)
     }else{
      $('#btnSouth').show()
     }
   }
   if(!isNaN(room.Doors[2].LeadsTo) && (!room.NeedsLight || ReturnDirection==2)){
     if(justLit){
      $('#btnEast').fadeIn(2000)
     }else{
      $('#btnEast').show()
     }
   }
   if(!isNaN(room.Doors[3].LeadsTo) && (!room.NeedsLight || ReturnDirection==3)){
     if(justLit){
      $('#btnWest').fadeIn(2000)
     }else{
      $('#btnWest').show()
     }
   }
   if(justLit) { justLit = false}
 }

function RoomItems(room){
  let strOut = ""
  if(room.Items.length > 0)
  {
    // Don't list the room items if the room needs light
    if(!room.NeedsLight){
      room.Items.forEach((rI, index) => {
        const exactItem = Item.find(i => i.ID == rI.ID)
        const sID = (rI.SubID)?rI.SubID:0
        strOut+= "<span class='item' onclick='Take(" + exactItem.ID + "," + sID + ")'>"
        strOut+= rI.Qty + " " + exactItem.Description 
        if(rI.Qty > 1){strOut+= "s"}
        if(index < room.Items.length-1){
          strOut+= ", "
        }
        strOut+= "</span>"    
      })
    }
  }
  $("#itemview").html(strOut)
}

function HealthMeter(){
  // Meter is 204px height but player health is 100 max
  const percentHealth = Player.Health/100
  // The meter bar is only allowed to reach 194px tall plus the 6px for the cap
  const meterHeight = Math.floor(185 * percentHealth)
  const fromTop = 203 - meterHeight
  const capLocation = fromTop - 12
  cap.style.top = capLocation + "px"
  tube.style.top = fromTop + "px"
  tube.style.height = meterHeight + "px"
}

function Experience(){
  // Meter is 204px height but player health is 100 max
  const percentExperience = Player.Experience/5000
  // The meter bar is only allowed to reach 194px tall plus the 6px for the cap
  const meterHeight = Math.floor(185 * percentExperience)
  const fromTop = 203 - meterHeight
  const capLocation = fromTop - 12
  cap2.style.top = capLocation + "px"
  tube2.style.top = fromTop + "px"
  tube2.style.height = meterHeight + "px"
}

function BuildPlayer(){
  let strOut = ""
  let hasCandle = false
  let hasFlint = false
  let hasInventory = false
  $('#inventory').html('')  
  Player.Items.forEach(i => {
    // Weapons should not appear in inventory (for now)
    if(i.Type === "Weapon"){return}
    hasInventory = true
    strOut+= "<button onclick='Drop(" +  i.ID + "," + i.SubID + ")'>Drop Item</button> "
    if(i.Type === 'Food'){
      strOut += "<button onclick='Eat(" + i.ID + ")'>Eat</button> "
    }
    if(i.Type === 'Manuscript'){
      // Must get the message ID from the room items      
      strOut += "<button onclick='ReadMe(" + i.SubID + ")'>Read Me</button> "
    }
    strOut+= i.Qty + " " + i.Description
    if(i.Qty > 1){strOut+= "s"}
    strOut+= " worth " + i.Qty * i.Value + " " + currency + "<br>"
    if(i.ID === 9){hasCandle = true}
    if(i.ID === 10){hasFlint = true}
  })
  if(hasInventory){
      $("#inventory").html(strOut)
  }
  if(hasCandle && hasFlint){
    $('#illuminate').show()
  } else {
    $('#illuminate').hide()
  }
}

function WeaponInHandSelector(){
  // Weapon in Hand selector
  strOut = ""
  strOut+= "Weapon in Hand: "
  strOut+= "<select id='slcWIH' onChange='SelectWeapon(this)'>"
  const weaponArr = Player.Items.filter(e => e.Type === 'Weapon')
  weaponArr.forEach(e => {
    strOut+="<option value='" + e.ID + "' "
    // Use == and not strict === because WeaponInHand may become a string
    if(Player.WeaponInHand == e.ID){
      strOut+= "selected"
      audBattle.pause();
      audBattle.setAttribute('src', 'sounds/' + e.Sound);
      audBattle.load();
    }
    strOut+=">" + e.Description + "</option>"
  })
  strOut+= "</select>"
  $("#weaponview").html(strOut)
}

function SelectWeapon(val){
  Player.WeaponInHand = val.value
}

function Take(iID, sID){
  let aud = document.getElementById("audCoin")
  aud.volume = .5
  aud.play()
  const currentRoom = getRoom(Player.Location)
  let idx = -1
  if(sID == 0){
    idx = currentRoom.Items.findIndex(e => e.ID == iID)
  } else {
    // Messages are more unique than regular items so find the index based on the unique ID
    idx = currentRoom.Items.findIndex(e => e.SubID == sID)
  }
  if(idx > -1){
    let thisItem = currentRoom.Items[idx]
    // The room only has an Item ID and a Qty.
    // This statement pulls a clone of the Item with all properties from the Items.js array
    var cloneItem = JSON.parse(JSON.stringify(Item.find(e => e.ID == iID)))
    // Take the Room.Item values and add them in to the Item object from Items.js array
    if(cloneItem.Type == 'Manuscript'){
      // Cannot just use the item ID if you have more than one Manuscript type
      // Need to use the SubID to find it
      cloneItem.SubID = thisItem.SubID
      cloneItem.Text = thisItem.Text
    }
    // Check to see if this item ID already exists in Player.Items
    const idxItem = Player.Items.findIndex(e => e.ID == iID)
    if(idxItem > -1 && cloneItem.Type != 'Manuscript'){
      // Add the quantity found in the room. No need to add another object to the Player.Items array
      Player.Items[idxItem].Qty += thisItem.Qty
    }else{
      // Assign the quantity found in the room
      cloneItem.Qty = thisItem.Qty
      // NOTE: This is somehow the moment of failure
      Player.Items.unshift(cloneItem)
    }
    // Splice the taken item out of the room items collection
     currentRoom.Items.splice(idx, 1)
    // if the player picks up a weapon then it will become the Weapon in Hand
    if(cloneItem.Type === "Weapon"){
      Player.WeaponInHand = cloneItem.ID
      WeaponInHandSelector()
    }
  }
  RoomItems(currentRoom)
  BuildPlayer(currentRoom)
  UpdateScore()
}

function Drop(iID, sID){
  let idx = -1
  const currentRoom = getRoom(Player.Location)
  // Get the item from the player based on ID unless there is a more unique ID provided
  if(sID > 0){
    idx = Player.Items.findIndex(e => e.SubID == sID)
  }else{
    idx = Player.Items.findIndex(e => e.ID == iID)
  }
  if(idx > -1){
    let aud = document.getElementById("audDrop")
    aud.play()
    const thisItem = Player.Items[idx]
    var cloneItem = JSON.parse(JSON.stringify(Player.Items[idx]))
    const roomItem = currentRoom.Items.findIndex(e => e.ID === iID)
    if(roomItem > -1 && cloneItem.Type != "Manuscript"){
      currentRoom.Items[roomItem].Qty += cloneItem.Qty
    }else{
      currentRoom.Items.push(cloneItem)
    }
    Player.Items.splice(idx, 1)
  }
  RoomItems(currentRoom)
  BuildPlayer(currentRoom)
  UpdateScore()
}

function InventoryValue(){
  let output = 0
  Player.Items.forEach(e => {
    if(e.Value){
      output += e.Value * e.Qty
    }
  })
  return output
}

function UpdateScore(){
    // Player score equals inventory value plus experience minus player's starting experience
    // Boost the overall score for experience
    let currentScore = InventoryValue() + Player.Experience * 25 - baseExperience * 25
    if(currentScore < 0 ){
      currentScore = 0
    }
    $('#score').html(currentScore.toLocaleString())
    $('#score').css('font-size', '34px'),
    setTimeout(function(){
      $('#score').css('font-size', '26px')},
      50
    )
}

function Illuminate(){
  // Find the index of a candle in player items
  const candleIdx = Player.Items.findIndex(e => e.ID === 9)
  const hasFlint = Player.Items.find(e => e.ID === 10)  
  if(candleIdx > -1 && hasFlint){
    let currentRoom = getRoom(Player.Location)
    let aud = document.getElementById("audMatch")
    aud.play()
    currentRoom.NeedsLight = false;
    const candleQty = Player.Items[candleIdx].Qty
    if(candleQty == 1){
      Player.Items.splice(candleIdx,1)
    }else{
      Player.Items[candleIdx].Qty = candleQty - 1
    }
    justLit = true
    SetStage(Player.Location)
    UpdateScore()
  }
}

function AttackNPC(elmID, npcID){
  audBattle.pause();
  switch(Player.WeaponInHand){
    case '20': case 20:
      $('#player').attr('src', 'src/fight-hand.gif')
      audBattle.setAttribute('src', 'sounds/fight-hand.wav');
    break
    case '21': case '22': case 21: case 22:
      $('#player').attr('src','src/fight-wood.gif')
      audBattle.setAttribute('src', 'sounds/fight-wood.wav');
    break
    default:
      $('#player').attr('src', 'src/fight-sword.gif')    
      audBattle.setAttribute('src', 'sounds/fight-sword.wav');
  }
  audBattle.load();
  audBattle.play()
  // Player.Experience increases chances and damage
  const currentRoom = getRoom(Player.Location)
  const currentNPC = currentRoom.NPCs.find(e => e.ID == npcID)
  const npcModel = NPC.find(e => e.ID == npcID)
  const basePercent = .25
  // The bonus percent is the remainder of 100% - the basePercent of 25%
  const bonusPercent = .75 * ((Player.Experience + baseExperience)/5000)
  // The total success threshold can only reach a maximum of 100%
  // Since basePercent and bonusPercent are both fractions then we need to convert to whole number
  const successThreshold = (basePercent + bonusPercent)*100
  console.log('Your success threshold is ' + successThreshold)
  let currentWeapon = Item.find(e => e.ID == Player.WeaponInHand)
  let potentialDamage = currentWeapon.Value
  // Bare hands have zero value but should be capable of up to 6 damage points
  if(potentialDamage <= 6){potentialDamage = 6}
  // An attempt must be below the success threshold to be successful
  const attempt = Math.floor(Math.random(1)*100)+1
  console.log('You must beat a ' + attempt)
  const successfulStrike = (attempt <= successThreshold)
  if(!successfulStrike) {
    const output = "The " + npcModel.Description + " has avoided your strike"
    LogHistory(output,'normal')
  }
  if(successfulStrike){
    let damage = Math.floor(Math.random(1) * potentialDamage) + 1
    damage = Math.round(damage * (1 + bonusPercent))
    currentNPC.Health-=damage
    const output = "You've inflicted " + damage + " points of damage on the " + npcModel.Description + " with your " + currentWeapon.Description + "!"
    LogHistory(output,'information')
  }
  if(currentNPC.Health <= 0){
    KillNPC(elmID, npcID)
  } else {    
    AttackPlayer(npcID)
  }    
}

function KillNPC(elmID, npcID){
  const currentRoom = getRoom(Player.Location)
  const npcModel = NPC.find(e => e.ID == npcID)
  // Experience reward equals the model NPC object health value
  const expPoints = getNPC(npcID).Health
  Player.Experience += expPoints
  Experience()
  const output = "You have defeated the " + npcModel.Description + " and gained " + expPoints + " points of experience!"
  LogHistory(output,'information')  
  // Take the npc out of the room array
  const npcIndex = currentRoom.NPCs.findIndex(e => e.ID == npcID)
  currentRoom.NPCs.splice(npcIndex,1)
  $('#npc' + elmID).off('click')
  $('#npc' + elmID).hide(1000)
  audBattle.pause()
  ChangeAudio('audNPC' + elmID ,npcModel.Sound2)
  document.getElementById("audNPC" + elmID).play()
  $('#player').attr('src', 'src/stand.gif')
  UpdateScore()
}

function AttackPlayer(npcID){
  // Player.Experience should lessen the chance of damage
  let output = ''
  let status = 'information'
  const npcModel = NPC[npcID]
  const threshold = Math.floor(Math.random(1)*100)+1
  console.log('NPC rolled a ' + threshold + ' threshold.')
  // The NPC's weapon chance (percent) must be greater than the threshold (1 to 100)
  if(npcModel.Weapon.Chance > threshold){
    // NPC has broken the threshold to strike
    const damage = Math.floor(Math.random(1)*npcModel.Weapon.Damage)+1
    status = 'alert'
    output = "The " + npcModel.Description + " has done " + damage + " points of damage with a " + npcModel.Weapon.Name + " attack."
    Player.Health -= damage
    HealthMeter()
    if(Player.Health <= 0){
      output = 'Game Over - You have died!<br>' + output
      gameOver = true
      $('#gameOver').show('1000')
      Player.Health = 0
      HealthMeter()
      audBattle.pause()
      audGameOver = document.getElementById('audGO')
      audGameOver.loop = true
      audGameOver.play()
    }
  } else {
    output = "The " + npcModel.Description + " attempted a " + npcModel.Weapon.Name + " attack and failed."    
  }
  LogHistory(output,status)
}

function Eat(itemID){
  // Find it in the Player's items
  const foodItem = Player.Items.find(e => e.ID == itemID && e.Type === 'Food')
  if(foodItem.Qty >= 1){
    Player.Health += foodItem.Value
    if(Player.Health > 100){Player.Health = 100}
    HealthMeter()
    LogHistory('You have just eaten 1 ' + foodItem.Description + ' adding ' + foodItem.Value + ' to your health.', 'information')
    foodItem.Qty -= 1
    if(foodItem.Qty <= 0){
      const itemIndex = Player.Items.indexOf(foodItem)
      Player.Items.splice(itemIndex,1) 
    }
    BuildPlayer()
    UpdateScore()
  }
}

function ChangeAudio(aud, sound){
  document.getElementById(aud).pause();
  document.getElementById(aud).setAttribute('src', 'sounds/' + sound);
  document.getElementById(aud).load();
}

function LogHistory(input, type){
    let color = "#ffffff"
    switch(type){
      case 'alert':
        color="#ff0000"
        break
      case 'warning':
        color="#ffd700"
        break
      case 'information':
        color="#00ff00"
        break
      default:
        color="#ffffff"
    }
    const currentHistory = $('#history').html()
    const output = "<div style='color:" + color + "'>" + input + "</div>"
    $('#history').html(output + currentHistory)
}

function ReadMe(sID){
  const thisText = Player.Items.find(e => e.SubID == sID)
  $('#readMe').html(thisText.Text)
  $('#readMe').fadeIn()
  clearTimeout(genTimer)
  genTimer = setTimeout(function(){
    $('#readMe').fadeOut()
  },3000)
}

function getRoom(rID){
  const room = Room.find(e => e.ID == rID)
  return room
}

function aOrAn(word){
  const firstLetter = word.substring(0,1)
  return (['a','e','i','o','u'].find(e => e == firstLetter))?'an':'a'
}

function isOrAre(Qty){
  return (Qty==1)?'Is ' + Qty + ' ':'Are ' + Qty + ' '
}