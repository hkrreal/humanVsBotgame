var d = document.getElementsByTagName("td");
var result = new Array();
var temp = new Array();
var bool = new Array();
var source = 0,
  destination = 760,
  check = 0,
  LR = 0,
  TB = 0,
  tmp = 0,
  value = 0,
  loc = 0;

var Interval = 0,
  Interval1 = 0,
  Interval2 = 0,
  interval3 = 0,
  interval4 = 0,
  interval5 = 0,
  count = 0,
  exit = 0;

var score = 0,
  track = 1000,
  speed = 200,
  speedreader = 10,
  level = 1,
  capacity = 1;

var control = 0,
  controlR = 0,
  controlL = 0,
  controlB = 0,
  controlT = 0;

var bulletColor = "white",
  bulletSpeed = 30,
  destinationColor = "green",
  sourceColor = "blue",
  scanColor = "black";
blockColor = "red";
//creates source and destination
d[source].style.backgroundColor = sourceColor;
d[source].innerHTML = "S";
d[destination].style.backgroundColor = destinationColor;
d[destination].innerHTML = "D";

//recognises  modified source and destination and calls  generateTree and journey functions
function retrack() {
  for (var i = 0; i < temp.length; i++) {
    if (
      d[temp[i]].style.backgroundColor != blockColor &&
      d[temp[i]].style.backgroundColor != sourceColor
    ) {
      d[temp[i]].style.backgroundColor = "";
    }
  }
  d[destination].style.backgroundColor = "";
  d[destination].innerText = "";
  temp = new Array();
  bool = new Array();
  result = new Array();
  destination = loc;
  d[destination].innerText="D";
  d[destination].style.backgroundColor = destinationColor;
  clearInterval(Interval);
  clearInterval(Interval1);
  if (exit != "lost") {
    generateTree(source, destination);
    journey();
  }
}

//starting point
function start() {
  if (source != undefined) {
    if (destination == undefined) alert("Choose Devil Position");
  } else alert("Choose Soldier Position ");
  if (source != undefined && destination != undefined) {
    document.getElementById("speed").innerHTML = speedreader;
    document.getElementById("levelno").innerHTML = 1;
    generateTree(source, destination);
    journey();
  }
}

//creates graph from source to destination , it takes two parameters source(s) and destination(dt)
function generateTree(s, dt) {
  result[s] = 0;
  temp.push(s);
	console.log(temp);
  var j = 0;
  while (j < temp.length) {
    var i = temp[j];
//battleground is made using 61X23 matrix and each cell is treated as node in the graph these can be identified 
//with unique number
    if (!bool[i]) { //this checks whether the node is accessed or not and all the if condition present in this 
    //describes whether adjacent node should include or not . 
      if (
        Math.trunc((i + 60) / 61) == 1 + Math.trunc(i / 61) &&
        find(i + 60) &&
        !bool[i + 60]
      ) 
      //left bottom side to ith node
      {
        temp.push(i + 60);
        result[i + 60] = result[i] + 1;
        if (i + 60 == dt) break;
      }
      if (find(i + 61) && !bool[i + 61]) {
        result[i + 61] = result[i] + 1;
        temp.push(i + 61);
        if (i + 61 == dt) break;
      }
      //bottom side to ith node
      if (
        Math.trunc((i + 62) / 61) == Math.trunc(i / 61) + 1 &&
        find(i + 62) &&
        !bool[i + 62]
      )
      //rightbottom side to ith node
       {
        temp.push(i + 62);
        result[i + 62] = result[i] + 1;
        if (i + 62 == dt) break;
      }
      if ((i + 1) % 61 > i % 61 && find(i + 1) && !bool[i + 1]) 
      //right side to ith node
      {
        result[i + 1] = result[i] + 1;
        temp.push(i + 1);
        if (i + 1 == dt) break;
      }

      if (
        Math.trunc((i - 60) / 61) + 1 == Math.trunc(i / 61) &&
        find(i - 60) &&
        !bool[i - 60]
      )//top right side to ith node 
      {
        temp.push(i - 60);
        result[i - 60] = result[i] + 1;
        if (i - 60 == dt) break;
      }
      if (
        Math.trunc(Math.abs(i - 62) / 61) + 1 == Math.trunc(i / 61) &&
        find(i - 62) &&
        !bool[i - 62]
      ) //top left side to ith node
      {
        temp.push(i - 62);
        result[i - 62] = result[i] + 1;
        if (i - 62 == dt) break;
      }

      if (find(i - 61) && !bool[i - 61])
      //above node to ith node
       {
        temp.push(i - 61);
        result[i - 61] = result[i] + 1;
        if (i - 61 == dt) break;
      }
      if ((i - 1) % 61 < i % 61 && find(i - 1) && !bool[i - 1])
      //leftnode to ith node
       {
        temp.push(i - 1);
        result[i - 1] = result[i] + 1;
        if (i - 1 == dt) break;
      }

      bool[i] = true;
    }
    j++;
  }
  //the below conditions are game terminating conditions , executing shops in retrack() function
  if (source == destination) {
    window.alert("You Lost" + "\n\n\n" + "Score :" + score);
    exit = "lost";
  } else if (j == temp.length) {
    d[source].style.backgroundColor = sourceColor;
    d[source].innerHTML = "s";
    exit = "lost";
    alert("No Path");
  }
}
//calls the path , retrack and walls method
function journey() {
  tmp = result[destination];
  loc = destination;
  value = destination;
  Interval = setInterval(path, speed);
  Interval1 = setInterval(retrack, track);
  if (count == 5) {
    walls();
    
    
    count = 0;
  }
  count++;
}
//creates blocks dynamically
function walls() {
  var position = Math.trunc(Math.random() * 1463);
  if (position != source && position != destination) {
    d[position].style.backgroundColor = blockColor;
  }
}
//checks whether a particular node should include in tree or not
function find(i) {
  if (i >= 0 && i < 1464) {
    if (d[i].style.backgroundColor == "") {
      d[i].style.backgroundColor = scanColor;
      return true;
    } else if (
      d[i].style.backgroundColor == destinationColor ||
      d[i].style.backgroundColor == sourceColor
    ) {
      return true;
    }
  }
  return false;
}
//checks whether a particular node should include in shortestpath or not
function finds(i) {
  if (i >= 0 && i < 1464) {
    if (
      d[i].style.backgroundColor == scanColor ||
      d[i].style.backgroundColor == destinationColor ||
      d[i].style.backgroundColor == sourceColor
    ) {
      return true;
    }
  }
  return false;
}
//creates journey from source to destination
//this path method starts from destination and finds the next lowest cost node which are adjacent to it
//after finding lowest cost node the location of desination will update with that location
function path() {
    if (finds(loc + 61) && tmp - 1 == result[loc + 61]) //bottom node to destinations node
    value = loc + 61;
    else if (finds(loc - 61) && tmp - 1 == result[loc - 61]) //top node to destinations node
    {
      value = loc - 61;
    } else if (
      (loc - 1) % 61 < loc % 61 &&
      finds(loc - 1) &&
      tmp - 1 == result[loc - 1]
    )
    //left side node to destination node
      value = loc - 1;
    else if (
      (loc + 1) % 61 > loc % 61 &&
      finds(loc + 1) &&
      tmp - 1 == result[loc + 1]
    )
    //right side node to destination node
      value = loc + 1;
    else if (
      finds(loc - 62) &&
      (loc - 62) % 61 < loc % 61 &&
      tmp - 1 == result[loc - 62]
    )//top right side node to destination node
      value = loc - 62;
    else if (
      finds(loc - 60) &&
      (loc - 60) % 61 > loc % 61 &&
      tmp - 1 == result[loc - 60]
    )//top left side node to destination node
      value = loc - 60;
    else if (
      finds(loc + 60) &&
      (loc + 60) % 61 < loc % 61 &&
      tmp - 1 == result[loc + 60]
    )//bottom right side node to destination node
      value = loc + 60;
    else if (
      finds(loc + 62) &&
      (loc + 62) % 61 > loc % 61 &&
      tmp - 1 == result[loc + 62]
    )//bottom right side node to destination node
      value = loc + 62;

    tmp = result[value];
    loc = value;
    if (loc != source)
     //this gives moving effect to bot
     {
      d[loc].style.backgroundColor = destinationColor;
     
    }
}


//human controls 
window.addEventListener("keydown", keypress, false);
function keypress(key) {
  if (source != undefined && destination != undefined) {
  
 	
    if (score == capacity && track > 50 && speed > 10)
    //this will increases the bot speed and changes of level and speed will takes place because of these lines 
     {
      track = track - 50;
      speed = speed - 10;
      level++;
      document.getElementById("levelno").innerHTML = level;
      capacity = capacity + 1;
      speedreader = speedreader + 10;
      document.getElementById("speed").innerHTML = speedreader;
      if (level == 5) bulletSpeed = 20;
      if (level == 10) bulletSpeed = 10;
      console.log(bulletSpeed + "  " + track + "  " + speed);
    }
    LR = source;
    TB = source;

    //left arrow controller to move left direction
    if (key.keyCode == "37") {
      d[LR].style.backgroundColor = "";
      d[LR].innerText = "";
      control = LR;
      if (
        LR % 61 > 0 &&
        LR % 61 <= 60 &&
        d[LR - 1].style.backgroundColor != blockColor
      )
        LR = LR - 1;
      d[LR].style.backgroundColor = sourceColor;
      d[LR].innerText = "<";
      TB = LR;
      source = LR;
    }
    //top arrow controller to move top direction
    else if (key.keyCode == "38") {
      d[TB].innerText = "";
      d[TB].style.backgroundColor = "";
      control = TB;
      if (
        Math.trunc(TB / 61) > 0 &&
        d[TB - 61].style.backgroundColor != blockColor
      )
        TB = TB - 61;
      d[TB].style.backgroundColor = sourceColor;
      d[TB].innerText = "^";
      LR = TB;
      source = TB;
      // console.log(control + "  " + TB);
    }
    //right arrow controller to move right direction
    else if (key.keyCode == "39") {
      d[LR].style.backgroundColor = "";
      d[LR].innerText = "";
      control = LR;
      if (
        LR % 61 >= 0 &&
        LR % 61 < 60 &&
        d[LR + 1].style.backgroundColor != blockColor
      )
        LR = LR + 1;
      d[LR].style.backgroundColor = sourceColor;
      d[LR].innerText = ">";
      TB = LR;
      source = LR;
    }
    //bottom arrow controller to move bottom direction
    else if (key.keyCode == "40") {
      d[TB].style.backgroundColor = "";
      d[TB].innerText = "";
      control = TB;
      if (
        Math.trunc(TB / 61) < 23 &&
        d[TB + 61].style.backgroundColor != blockColor
      )
        TB = TB + 61;
      d[TB].style.backgroundColor = sourceColor;
      d[TB].innerText = "v";
      LR = TB;
      source = TB;
    }

    //gun action takes place with below code
    //bullets direction depends on direction i.e if you move from left to right then the gun fires left->right direction 
    //similar to all the cases i.e right to left , top to bottom and bottom to top 
    if (key.keyCode == "65") {
      var bullet = 0;
      var c = 0;
      //the below conditions will finds your's previous direction then it calls appropriate gunfunction
      //i.e either it might be gunR() or gunL() or gunT() or gunB()
      if (control - 1 == source && controlL == 0 && source % 61 > 0) {
        bullet = source - 1;
        interval3 = setInterval(gunL, bulletSpeed);
      } else if (control + 1 == source && controlR == 0 && source % 61 < 60) {
        bullet = source + 1;
        interval2 = setInterval(gunR, bulletSpeed);
      } else if (
        control + 61 == source &&
        controlB == 0 &&
        Math.trunc(source / 61) < 23
      ) {
        bullet = source + 61;
        interval4 = setInterval(gunB, bulletSpeed);
      } else if (
        control - 61 == source &&
        controlT == 0 &&
        Math.trunc(source / 61) > 0
      ) {
        bullet = source - 61;
        interval5 = setInterval(gunT, bulletSpeed);
      }
      //fires rightside
      function gunR() {
        controlR = 1;
        if (c == 3) {
          for (var i = 1; i <= 3; i++) bulletHide(bullet - i);
          c = 0;
        }
        if (true) {
          scoreCount(bullet);
          c++;
          bullet++;
        }
        if ((bullet - 1) % 61 == 60) {
          clearInterval(interval2);
          controlR = 0;
          for (var i = 3; i > 0; i--) bulletHide(bullet - i);
        }
      }
      //fires leftside
      function gunL() {
        controlL = 1;
        if (c == 3) {
          for (var i = 1; i <= 3; i++) bulletHide(bullet + i);
          c = 0;
        }
        if (true) {
          c++;
          scoreCount(bullet);
          bullet--;
        }
        if ((bullet + 1) % 61 == 0) {
          clearInterval(interval3);
          controlL = 0;
          for (var i = 3; i > 0; i--) bulletHide(bullet + i);
        }
      }
      //fires down
      function gunB() {
        controlB = 1;
        if (c == 3) {
          for (var i = 1; i <= 3; i++) bulletHide(bullet - 61 * i);
          c = 0;
        }
        if (true) {
          c++;
          scoreCount(bullet);
          bullet = bullet + 61;
        }
        if (Math.trunc((bullet - 61) / 61) == 23) {
          clearInterval(interval4);
          controlB = 0;
          for (var i = 3; i > 0; i--) bulletHide(bullet - 61 * i);
        }
      }
      //fires up
      function gunT() {
        controlT = 1;
        if (c == 3) {
          for (var i = 1; i <= 3; i++) bulletHide(bullet + 61 * i);
          c = 0;
        }
        if (true) {
          c++;
          scoreCount(bullet);
          bullet = bullet - 61;
        }
        if (Math.trunc((bullet + 61) / 61) == 0) {
          clearInterval(interval5);
          controlT = 0;
          for (var i = 3; i > 0; i--) bulletHide(bullet + 61 * i);
        }
      }
    }
  }
}

//this scoreCount increment the score if the bullet hits block
function scoreCount(bullet) {
  if (d[bullet].style.backgroundColor == blockColor) {
    d[bullet].style.backgroundColor = bulletColor;
    score = score + 1;
    document.getElementById("points").innerText = score;
  } else {
    d[bullet].style.backgroundColor = bulletColor;
  }
}
//actually bullet is straight line so, this method will make nodes colorless, those are already accessed  
function bulletHide(bullet) {
  d[bullet].style.backgroundColor = scanColor;
  d[bullet].style.borderRadius = "50%";
}
//pauses the game
function pause() {
  alert("Game Paused");
}
//optional speed incrementer to increase the speed if you want
function speedIncrementer() {
  if (speed > 10 && track > 50) {
    document.getElementById("speed").innerText = speedreader;
    speed = speed - 10;
    track = track - 50;
    speedreader = speedreader + 10;
  } else {
    alert("Maximum Speed");
  }
}
