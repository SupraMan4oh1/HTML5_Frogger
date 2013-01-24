
/*********************************************************

    author: Karen C. Aragon
    title: Modern Frogger CSS
    date: 09/13/12

	
	Objects: 
		frog
		
		first tier:
			cars
			trucks
			skateboards
		second tier:
			logs
			turtles
			water
			land
	
	Game:
		dodge cars & trucks - if collides, you lose a life
		logs - if on a log you move with log
		water - if you fall in water you lose a life
		land - if you land at the green land, you win a life
		
	Levels:
	
	TO DO:
		add images

**********************************************************/
	
	//show instructions on button click
	jQuery(document).ready(function(){
    	jQuery('#button').live('click', function(event) {        
     	    jQuery('#instructionDiv').toggle('show');
    	});
	});


var canvas,
	ctx,
	CANVAS_WIDTH = 600,
	CANVAS_HEIGHT = 600,

	/* Game Loop */
	FPS = 30,	
	
	GREETING_X = CANVAS_WIDTH/2 - 50,
	GREETING_Y = CANVAS_HEIGHT/2,

	water = {},
	frogger = {},
	island = {},
	rock = {},
	
	/* Level 1 */
	cars = [],
	trucks = [],
	skateBoards = [],
	bikes = [],
	trolleys = [],
	
	logsOnTopRow = [],
	logsOnBottomRow = [],
	lillyPads = [],
	
	/* Level 2 */
	snakes = [],
	/* Level 3 */
	birds = [],
	playing = false,
	
	levelOne = false,
	levelTwo = false,
	levelThree = false,

	lives = 3,
	noLives = false;
	

	
function init() {

  canvas = document.getElementById("canvas"),
  ctx = canvas.getContext("2d"),
  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;
  //canvas.addEventListener("mousemove", trackPosition, true);
  //canvas.addEventListener("mousedown", btnClick, true);
  ctx.fillStyle = "grey";
  ctx.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
  
  setInterval(function(){
   //if(playing){
      draw();
   //}
   update();
  }, 1000/FPS);
  

}

/********************************************************************
	frogger - if frogger lands in water or hits objetc, lose a life
********************************************************************/
var frogger = {
	w: 30,
	h: 30,
	x: CANVAS_WIDTH/2,
	y: CANVAS_HEIGHT,
 
	draw: function(){
    //froggerImg = new Image();
    //froggerImg.src = 'images/frogger.png';
    //ctx.drawImage(froggerImg, this.x, this.y, this.w, this.h);
	ctx.fillStyle = "#CCFFFF";
	ctx.fillRect(this.x, this.y, this.w, this.h);
	}

};

/********************************************************************
	1st level
	island - if frogger lands on island, advance level
********************************************************************/
var island = {
	w: CANVAS_WIDTH,
	h: 40,
	x: 0,
	y: 0,
	draw: function(){
		ctx.fillStyle = "#00CC99";
		ctx.fillRect(this.x, this.y, this.w, this.h);
	}
};

/********************************************************************
	2nd level
	rock - if frogger lands on island, advance level
********************************************************************/
var rock = {
	w: CANVAS_WIDTH,
	h: 40,
	x: 0,
	y: 0,
	draw: function(){
		ctx.fillStyle = "00CC99";
		ctx.fillRect(this.x, this.y, this.w, this.h);
	}
};


/********************************************************************
	water - if frogger lands on water, lose a life
********************************************************************/
var water = {
	w: CANVAS_WIDTH,
	h: 160,
	x: 0,
	y: 90,
	draw: function(){
		ctx.fillStyle = "#33CCFF";
		ctx.fillRect(this.x, this.y, this.w, this.h);
	}
};


/**********************************************************
	5th row
	Truck() - Contructor for car objects
	truck objects travel from left to right on screen

**********************************************************/
function Truck(self) {
  self = self || {};

  self.active = true;
  self.color = "white";

  self.x = CANVAS_WIDTH;
  self.y = CANVAS_HEIGHT - 80;
  self.xVelocity = -0.1;
  self.yVelocity = 0;

  self.w = 42;
  self.h = 32;

  self.inBounds = function() {
    return self.x >= 0 && self.x <= CANVAS_WIDTH &&
      self.y >= 0 && self.y <= CANVAS_HEIGHT;
  };

  self.draw = function() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.w, this.h);
    
     // left tire
    ctx.beginPath();
    ctx.arc(self.x + 8, self.y + 30, 7, 0 , 2 * Math.PI, false);
    ctx.fillStyle = "#B8B8B8";
    ctx.fill();
    
    // right tire
    ctx.beginPath();
    ctx.arc(self.x + 33, self.y + 30, 7, 0 , 2 * Math.PI, false);
    ctx.fillStyle = "#B8B8B8";
    ctx.fill();
  };

  self.update = function() {
  	self.x -= 5;
    self.active = self.active && self.inBounds();
  };

  self.removeObj = function() {
    this.active = false;
  };
  
  return self;
};






/**********************************************************
	2nd row
	Bike() - Contructor for bike objects
	Bike objects travel from left to right on screen
**********************************************************/
function Bike(self) {
  self = self || {};

  self.active = true;


  self.color = "#33FFCC	";

  self.x = 0;
  self.y = CANVAS_HEIGHT / 2 + 180;
  self.xVelocity = 0.1;
  self.yVelocity = 0;

  self.w = 30;
  self.h = 30;
  self.radius = 15;

  self.inBounds = function() {
    return self.x >= 0 && self.x <= CANVAS_WIDTH &&
      self.y >= 0 && self.y <= CANVAS_HEIGHT;
  };

  self.draw = function() {
      //oval
    ctx.save();
	ctx.scale(1, 0.40);
	ctx.beginPath();
    ctx.arc(self.x, self.y + 750, 20, 0 , 2 * Math.PI, false);
	ctx.stroke();
	ctx.closePath();
	ctx.restore();
	ctx.fillStyle = "black";
    ctx.fill();
    
    //green circle
    ctx.beginPath();
    ctx.arc(self.x, self.y, self.radius, 0 , 2 * Math.PI, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    

  };

  self.update = function() {
  	self.x += 6;

    self.active = self.active && self.inBounds();
  };

  self.removeObj = function() {
    this.active = false;
  };

  return self;
};

/**********************************************************
	3rd row
	Car() - Contructor for car objects
	Car objects travel from left to right on screen
**********************************************************/
function Car(self) {
  self = self || {};

  self.active = true;


  self.color = "pink";

  self.x = 0;
  self.y = CANVAS_HEIGHT / 2 + 115;
  self.xVelocity = 0.1;
  self.yVelocity = 0;

  self.w = 42;
  self.h = 32;

  self.inBounds = function() {
    return self.x >= 0 && self.x <= CANVAS_WIDTH &&
      self.y >= 0 && self.y <= CANVAS_HEIGHT;
  };

  self.draw = function() {
    //pink square
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.w, this.h);
    
    // left tire
    ctx.beginPath();
    ctx.arc(self.x + 8, self.y + 30, 7, 0 , 2 * Math.PI, false);
    ctx.fillStyle = "black";
    ctx.fill();
    
    // right tire
    ctx.beginPath();
    ctx.arc(self.x + 33, self.y + 30, 7, 0 , 2 * Math.PI, false);
    ctx.fillStyle = "black";
    ctx.fill();
  };

  self.update = function() {
  	self.x += 6;
    self.active = self.active && self.inBounds();
  };

  self.removeObj = function() {
    this.active = false;
  };

  return self;
};


/**********************************************************
	4th row
	SkateBoard() - Contructor for SkateBoard objects
	SkateBoard objects travel from left to right on screen

**********************************************************/
function SkateBoard(self) {
  self = self || {};

  self.active = true;
  self.color = "white";

  self.x = CANVAS_WIDTH;
  self.y = CANVAS_HEIGHT/2 + 70;
  self.xVelocity = -0.05;
  self.yVelocity = 0;
  self.radius = 5;

  self.w = 32;
  self.h = 32;

  self.inBounds = function() {
    return self.x >= 0 && self.x <= CANVAS_WIDTH &&
      self.y >= 0 && self.y <= CANVAS_HEIGHT;
  };

  self.draw = function() {
    //circle
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.w, this.h);
    ctx.beginPath();
    ctx.arc(self.x, self.y, self.radius, 0 , 2 * Math.PI, false);
    ctx.fill();
    
    //black top
    ctx.fillStyle = "black";
    ctx.fillRect(this.x, this.y, this.w, 20);
    ctx.beginPath();
    ctx.arc(self.x, self.y, self.radius, 0 , 2 * Math.PI, false);
    ctx.fill();
  };

  self.update = function() {
  	self.x -= 4;
    self.active = self.active && self.inBounds();
  };

  self.removeObj = function() {
    this.active = false;
  };

  return self;
};
/**********************************************************
	5th row
	Trolley() - Contructor for trolley objects
	trolley objects travel from left to right on screen
**********************************************************/
function Trolley(self) {
  self = self || {};
  self.active = true;
  self.color = "#33CCFF";
  self.x = 0;
  self.y = CANVAS_HEIGHT / 2 + 30;
  self.w = 30;
  self.h = 30;
  self.xVelocity = 0.1;
  self.yVelocity = 0;
  self.radius = 15;

  self.inBounds = function() {
    return self.x >= 0 && self.x <= CANVAS_WIDTH &&
      self.y >= 0 && self.y <= CANVAS_HEIGHT;
  };

  self.draw = function() {
  	//circle
    ctx.beginPath();
    ctx.arc(self.x, self.y, self.radius, 0 , 2 * Math.PI, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    
    //square
    ctx.fillStyle = "white";
    ctx.fillRect(this.x, this.y, this.w - 15, this.h - 15);
  };

  self.update = function() {
  	self.x += 6;

    self.active = self.active && self.inBounds();
  };

  self.removeObj = function() {
    this.active = false;
  };

  return self;
};


/**********************************************************
	LogsOnBottom() - Contructor for LogsOnBottom objects
	LogsOnBottom objects travel from right to left on screen

**********************************************************/
function LogsOnBottom(self) {
  self = self || {};
  self.active = true;
  self.color = "white";
  self.x = CANVAS_WIDTH;
  self.y = CANVAS_HEIGHT/2 - 100;
  self.xVelocity = -0.5;
  self.yVelocity = 0;
  self.w = 75;
  self.h = 42;

  self.inBounds = function() {
    return self.x >= 0 && self.x <= CANVAS_WIDTH &&
      self.y >= 0 && self.y <= CANVAS_HEIGHT;
  };

  self.draw = function() {
    ctx.fillStyle = this.color;
    ctx.strokeStyle = "black";
    ctx.fillRect(this.x, this.y, this.w, this.h);
  };

  self.update = function() {
  	self.x -= 5;

    self.active = self.active && self.inBounds();
  };

  return self;
};

/**********************************************************
	LogOnTopRow() - Contructor for LogOnTopRow objects
	LogOnTopRow objects travel from right to left on screen

**********************************************************/
function LogOnTopRow(self) {
  self = self || {};

  self.active = true;
  self.color = "white";

  self.x = CANVAS_WIDTH;
  self.y = CANVAS_HEIGHT/2 - 200;
  self.xVelocity = -0.5;
  self.yVelocity = 0;

  self.w = 75;
  self.h = 42;

  self.inBounds = function() {
    return self.x >= 0 && self.x <= CANVAS_WIDTH &&
      self.y >= 0 && self.y <= CANVAS_HEIGHT;
  };

  self.draw = function() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.w, this.h);
  };

  self.update = function() {
  	self.x -= 5;

    self.active = self.active && self.inBounds();
  };

  return self;
};

/**********************************************************
	LillyPad() - Contructor for LillyPad objects
	LillyPad objects travel from right to left on screen

**********************************************************/
function LillyPad(self) {
  self = self || {};
  self.active = true;
  self.color = "black";
  
  self.x = 0;
  self.y = 150;
  self.xVelocity = 0.05;
  self.yVelocity = 0;

  self.w = 75;
  self.h = 42;

  self.inBounds = function() {
    return self.x >= 0 && self.x <= CANVAS_WIDTH &&
      self.y >= 0 && self.y <= CANVAS_HEIGHT;
  };

  self.draw = function() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.w, this.h);
  };
  
  self.update = function() {
  	self.x += 5;
    self.active = self.active && self.inBounds();
  };
  return self;
};

/**********************************************************
	Level 2 - snakes slither across the screen
**********************************************************/
function Snake(self) {
    self = self || {};
        
    self.active = true;
    self.age = Math.floor(Math.random() * 128);
          
    self.color = "pink";
        
    self.x = 0;
    self.y = 400;
    self.xVelocity = 4;
    self.yVelocity = 5;
        
    self.w = 32;
    self.h = 32;
        
    self.inBounds = function() {
		return self.x >= 0 && self.x <= CANVAS_WIDTH &&
		self.y >= 0 && self.y <= CANVAS_HEIGHT;
    };

	self.draw = function() {
        ctx.fillStyle = this.color;
		ctx.fillRect(this.x, this.y, this.w, this.h);
    };
        
    self.update = function() {
        self.x += self.xVelocity;
        self.y += self.yVelocity;
        
        self.yVelocity = 3 * Math.sin(self.age * Math.PI / 64);
        self.age += 1;
  
        
        self.active = self.active && self.inBounds();
    };
        
    self.removeObj = function() {
        this.active = false;
    };
        
    return self;
};

/**********************************************************
	Level 3 - Birds fly down from the screen
**********************************************************/
function Bird(self) {
    self = self || {};
        
    self.active = true;
    self.age = Math.floor(Math.random() * 128);
          
    self.color = "pink";
        
    self.x = CANVAS_WIDTH / 4 + Math.random() * CANVAS_WIDTH / 2;
    self.y = 0;
    self.xVelocity = 0;
    self.yVelocity = 2;
        
    self.w = 32;
    self.h = 32;
        
    self.inBounds = function() {
		return self.x >= 0 && self.x <= CANVAS_WIDTH &&
		self.y >= 0 && self.y <= CANVAS_HEIGHT;
    };

	self.draw = function() {
        ctx.fillStyle = this.color;
		ctx.fillRect(this.x, this.y, this.w, this.h);
    };
        
    self.update = function() {
        self.x += self.xVelocity;
        self.y += self.yVelocity; 
        self.xVelocity = 3 * Math.sin(self.age * Math.PI / 64);
        self.age += 1;
        self.active = self.active && self.inBounds();
    };
        
    self.removeObj = function() {
        this.active = false;
    };
        
    return self;
};


/********************************************************************
	
	update() - 
		control movement of frogger
		updates object arrays
		handles object collision
		keeps track of number of lives

********************************************************************/

function update() {
	/***************************************************************
		keyPressed using JQUERY HOTKEYS 
		https://github.com/tzuryby/jquery.hotkeys
	****************************************************************/

	if (keydown.left) {
		frogger.x -= 15;
  	}

  	if (keydown.right) {
    		frogger.x += 15;
  	}
	
	if (keydown.up) {
		frogger.y -= 15;
  	}

  	if (keydown.down) {
    		frogger.y += 15;
  	}

	//keep frogger within bounds of the canvas
  	frogger.x = frogger.x.clamp(0, CANVAS_WIDTH - frogger.w);
  	frogger.y = frogger.y.clamp(0, CANVAS_HEIGHT - frogger.w);

/*--------  CARS UPDATE ARRAY ------*/
 	cars.forEach(function(car) {
    	car.update();
  	});

  	cars = cars.filter(function(car) {
    	return car.active;
  	});

  	if(Math.random() < 0.02) {
    	cars.push(Car());
  	}


/*--------  BIKES UPDATE ARRAY ------*/
 	bikes.forEach(function(bike) {
    	bike.update();
  	});

  	bikes = bikes.filter(function(bike) {
    	return bike.active;
  	});

  	if(Math.random() < 0.03) {
    	bikes.push(Bike());
  	}
  	

/*--------  TRUCKS UPDATE ARRAY ------*/
  	trucks.forEach(function(truck) {
    	truck.update();
  	});

  	trucks = trucks.filter(function(truck) {
    	return truck.active;
  	});

  	if(Math.random() < 0.02) {
    	trucks.push(Truck());
  	}

/*--------  SKATEBOARDS UPDATE ARRAY ------*/
    skateBoards.forEach(function(skateboard) {
      skateboard.update();
    });

    skateBoards = skateBoards.filter(function(skateboard) {
      return skateboard.active;
    });

    if(Math.random() < 0.03) {
      skateBoards.push(SkateBoard());
    }

/*--------  SKATEBOARDS UPDATE ARRAY ------*/
    trolleys.forEach(function(trolley) {
      trolley.update();
    });

    trolleys = trolleys.filter(function(trolley) {
      return trolley.active;
    });

    if(Math.random() < 0.03) {
      trolleys.push(Trolley());
    }


/*--------  LOGS TOP UPDATE ARRAY ------*/
  	logsOnTopRow.forEach(function(log) {
    	log.update();
  	});

  	logsOnTopRow = logsOnTopRow.filter(function(log) {
    	return log.active;
  	});

  	if(Math.random() < 0.05) {
    	logsOnTopRow.push(LogOnTopRow());
  	}

/*--------  LOGS BOTTOM UPDATE ARRAY ------*/

  	logsOnBottomRow.forEach(function(log) {
    	log.update();
  	});

  	logsOnBottomRow = logsOnBottomRow.filter(function(log) {
    	return log.active;
  	});

  	if(Math.random() < 0.05) {
    	logsOnBottomRow.push(LogsOnBottom());
  	}

/*--------  LILLYPADS BOTTOM UPDATE ARRAY ------*/

  	lillyPads.forEach(function(lillypad) {
    	lillypad.update();
  	});

  	lillyPads = lillyPads.filter(function(lillypad) {
    	return lillypad.active;
  	});

  	if(Math.random() < 0.05) {
    	lillyPads.push(LillyPad());
  	}
	
/*--------  SNAKES UPDATE ARRAY (LEVEL 2) */

  	snakes.forEach(function(snake) {
    	snake.update();
  	});

  	snakes = snakes.filter(function(snake) {
    	return snake.active;
  	});

  	if(Math.random() < 0.05) {
    	snakes.push(Snake());
  	}

/*--------  SNAKES UPDATE ARRAY (LEVEL 3) */

  	birds.forEach(function(bird) {
    	bird.update();
  	});

  	birds = birds.filter(function(bird) {
    	return bird.active;
  	});

  	if(Math.random() < 0.05) {
    	birds.push(Bird());
  	}


  	
  	handleFrogCollidesWithObject();
    scoreTotal();
	checkLives();
}


/********************************************************************
		draw() 
			redraws canvas
			draws objects to screen depending on level
********************************************************************/

function draw() {
  	ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);

  	ctx.fillStyle = "grey";
  	ctx.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
  
  	//if player runs out of lives, end game
  	if(lives == 0){
		playing = false;
	}
	
	//if user is in playing mode(i.e. clicked play)
	//check level and draw
	if(playing){
  		if(levelOne){
			water.draw();
	
			cars.forEach(function(car) {
    			car.draw();
  			});
  	
			trucks.forEach(function(truck) {
    			truck.draw();
  			});
  			
  			bikes.forEach(function(bike) {
    			bike.draw();
  			});
			
			trolleys.forEach(function(trolley) {
    			trolley.draw();
  			});

			skateBoards.forEach(function(skateboard) {
    			skateboard.draw();
  			});

			logsOnTopRow.forEach(function(log) {
    			log.draw();
  			});
	
			logsOnBottomRow.forEach(function(log) {
    			log.draw();
  			});

			lillyPads.forEach(function(lillypad) {
    			lillypad.draw();
  			});
	
			island.draw();
    		frogger.draw();
  	 	}//end level one draw
  	 
   		if(levelTwo){
   		
   			water.color = "#33CCFF";
    		water.draw();
    		
			snakes.forEach(function(snake) {
    			snake.draw();
  			});
	
			logsOnTopRow.forEach(function(log) {
				log.color = "#CCFFFF";
    			log.draw();
  			});
	
			logsOnBottomRow.forEach(function(log) {
				log.color = "#CCFFFF";
    			log.draw();
  			});

			lillyPads.forEach(function(lillypad) {
				lillypad.color = "black";
    			lillypad.draw();
  			});
  			
			rock.draw();
    		frogger.draw();
   		}//end level two draw
   		
   		if(levelThree){
   			water.color = "#33CCFF";
   			water.y = CANVAS_HEIGHT/2 - 100;
    		water.draw();
    		
			birds.forEach(function(bird) {
    			bird.draw();
  			});
   			
			rock.draw();
    		frogger.draw();
   		
   		}
   	
    //scoreTotal();
  }
}


/********************************************************************
		CHECK COLLISION!!!!!
********************************************************************/

//checks bounds of objects to see if x,y w,h values collide
function checkFrogCollidesWithObject(a, b) {
	return  a.x < b.x + b.w &&
        	a.y < b.y + b.h &&
        	a.x + a.w > b.x &&
        	a.y + a.h > b.y;
}

//define what happens when frogger collides with object
function handleFrogCollidesWithObject() {

  if(levelOne){
  	cars.forEach(function(car) {
  	  if(checkFrogCollidesWithObject(car, frogger)) {
   	 	car.removeObj();
		resetFrogger();
		lives -= 1;
    	}
  	});
  	
  	bikes.forEach(function(bike) {
    if (checkFrogCollidesWithObject(bike, frogger)) {
      bike.removeObj();
      resetFrogger();
       	lives -= 1;
    }
  });

  trucks.forEach(function(truck) {
    if (checkFrogCollidesWithObject(truck, frogger)) {
      truck.removeObj();
      resetFrogger();
       	lives -= 1;
    }
  });

  skateBoards.forEach(function(skateBoard) {
    if (checkFrogCollidesWithObject(skateBoard, frogger)) {
      skateBoard.removeObj();
      frogger.color = "grey";
      frogger.draw();
      resetFrogger();
       	lives -= 1;
    }
  });
  
  trolleys.forEach(function(trolley) {
    if (checkFrogCollidesWithObject(trolley, frogger)) {
      trolley.removeObj();
      frogger.color = "grey";
      frogger.draw();
      resetFrogger();
      lives -= 1;
    }
  });

  //if frogger lands on log, frogger should move
  //with log, but be able to move left and right while on log   	
  logsOnTopRow.forEach(function(logsOnTopRow) {
    if (checkFrogCollidesWithObject(logsOnTopRow, frogger)) {
            frogger.x -= 4;
    }
  });

  logsOnBottomRow.forEach(function(logsOnBottomRow) {
    if (checkFrogCollidesWithObject(logsOnBottomRow, frogger)) {
      frogger.x -= 4;
    }
  });

  lillyPads.forEach(function(lillyPad) {
    if (checkFrogCollidesWithObject(lillyPad, frogger)) {
		 frogger.x += 4;
		

    }
  });
  
  if(checkFrogCollidesWithObject(island, frogger)){
	
			levelOne = false;
			levelTwo = true;
			resetFrogger();
		
	}	
  }
  
	if(levelTwo){
  		snakes.forEach(function(snake) {
   	 		if (checkFrogCollidesWithObject(snake, frogger)) {
	 			snake.removeObj();
	 			resetFrogger();
	 			 	lives -= 1;
    		}
  		});
	}
	
	if(checkFrogCollidesWithObject(rock, frogger)){
			levelTwo = false;
			levelThree = true;
			resetFrogger();
		
  	}
	
	if(levelThree){
		birds.forEach(function(bird) {
   	 		if (checkFrogCollidesWithObject(bird, frogger)) {
	 			bird.removeObj();
	 			resetFrogger();
	 			 	lives -= 1;
    		}
  		});
  
	
	}
  

	
}

/*******************************************************************************
   	RESET FROGGER to beginning position
********************************************************************************/
function resetFrogger(){
	frogger.x = CANVAS_WIDTH/2;
	frogger.y = CANVAS_HEIGHT - frogger.h;
}

/*******************************************************************************
    SCORE AND LIVES
********************************************************************************/
function scoreTotal(){
  ctx.font = '15px Bebas';
  ctx.fillStyle = 'black';
  ctx.fillText('Lives: ', 20, 25);
  ctx.fillText(lives, 80, 25); 

  //ctx.fillText('Lives: ', 30, 50);
  //ctx.fillText(lives, 90, 50);
  
  if (!playing) {
	//ask user to play game
	ctx.fillStyle = "#0099FF";
	ctx.fillRect(CANVAS_WIDTH/2-50,CANVAS_HEIGHT/2, 90, 30);
	ctx.font = '15px Bebas';
	ctx.fillStyle = '#FFFFCC';
	ctx.fillText('PLAY', CANVAS_WIDTH / 2 - 22, CANVAS_HEIGHT / 2 + 22);
	ctx.font = '10px Bebas';
	canvas.addEventListener('click', playGame, false);
	
  }
   if (noLives) {
    playing = false;
    levelOne = true;
    levelTwo = false;
    levelThree = false;
    water.y = 90; 
    //ask user to replay game
    ctx.fillStyle = '#0099FF';
	ctx.fillRect(CANVAS_WIDTH/2-50,CANVAS_HEIGHT/2, 90, 30);
	ctx.fillStyle = '#FF9966';
    ctx.font = '50px Lobster';
    ctx.fillText('Aww shucks!', CANVAS_WIDTH/2 - 130, CANVAS_HEIGHT/2 - 20);
    ctx.font = '15px Bebas';
    ctx.fillStyle = '#FFFFCC';
    ctx.fillText('REPLAY?', CANVAS_WIDTH / 2 - 32, CANVAS_HEIGHT / 2 + 22);
    canvas.addEventListener('click', continueButton, false);
  }
}


/******************************************************************************
    playGame()
*******************************************************************************/
function playGame() {
  playing = true;
  levelOne = true;
  canvas.removeEventListener('click', playGame, false);
}

/******************************************************************************
    continueButton() 
*******************************************************************************/
function continueButton() {
  playing = true;
  levelOne = true;
  levelTwo = false;
  lives = 3;
  noLives = false;
  resetFrogger();
  canvas.removeEventListener('click', continueButton, false);
}

/******************************************************************************
    CHECKS NUMBER OF LIVES
*******************************************************************************/
function checkLives(){
	if(lives == 0){
		playing = false;
		noLives = true;
	}
}

/******************************************************************************
    GET MOUSE POSITION
*******************************************************************************/
function getCursorPos(e) {
  var x;
  var y;
  if (e.pageX || e.pageY) {
      x = e.pageX;
      y = e.pageY;
  } 
  else {
      x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
      y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
  }
  x -= c.offsetLeft;
  y -= c.offsetTop;
  var cursorPos = new cursorPosition(x, y);
  return cursorPos;
}

function cursorPosition(x,y) {
  this.x = x;
  this.y = y;
}

