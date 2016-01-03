var directions = {
    N: 0,
    E: 1,
    S: 2,
    W: 3 };
    
var colours = {
    black: "black",
    white: "white",
    red: "red" };

var Grid = function (canvas, width, height, pixelSize, fillColour, antColour) {
    if (width) canvas.width = width;
    if (height) canvas.height = height;    
	this.canvas = canvas;     
    this.ctx = canvas.getContext("2d");
    this.pixelSize = pixelSize || 1;
    this.fillColour = fillColour || colours.white;   
    this.antColour = antColour || colours.red;
    this.initialise();
} 
Grid.prototype = {
    initialise: function () {
        this.fill(this.getWidth(), this.getHeight(), colours.black, 0, 0)         
    }, 
    getPosition: function (value) {
        return value * this.pixelSize;
    },
    fill: function (width, height, colour, x, y) {
        this.ctx.fillStyle = colour;
        this.ctx.fillRect(this.getPosition(x), this.getPosition(y), 
            width, height);
    },    
	getWidth: function () {
        return this.canvas.width;
    },
    getHeight: function () {
        return this.canvas.height;
    },
    isPixelMarked: function (x, y) {
        var data = this.ctx.getImageData(
            this.getPosition(x), this.getPosition(y), 1, 1).data;
            
        return data[0] !== 0 ||
               data[1] !== 0 ||
               data[2] !== 0; 
    },
    fillPixel: function (x, y, colour) {
        this.fill(this.pixelSize, this.pixelSize, colour, x, y); 
    },
    togglePixel: function (x, y) {        
        this.fillPixel(x, y, this.isPixelMarked(x, y) ? colours.black : this.fillColour);                
    }
};

var Ant = function (grid, direction) {
    this.grid = grid
    this.direction = direction || directions.E;
    this.x = (grid.getWidth() / grid.pixelSize) / 2;
    this.y = (grid.getHeight() / grid.pixelSize) / 2;
    this.currentPixelColour = colours.black;
    this.iterations = 0;
    this.draw();
}
Ant.prototype = {
    move: function () {         
        this.undraw();      
        this.grid.togglePixel(this.x, this.y);
        
        switch (this.direction) {
            case directions.N:
                this.y += 1;
                break;
            case directions.E:
                this.x += 1;
                break;
            case directions.S:
                this.y -=1;
                break;
            case directions.W:
                this.x -= 1;
                break;
        }
                
        var isPixelMarked = this.grid.isPixelMarked(this.x, this.y),
            adjustment = isPixelMarked ? 1 : 3;
        
        this.currentPixelColour = isPixelMarked ? this.pixelColour : colours.black;
        this.direction = (this.direction + adjustment) % 4;  
        this.draw();   
        this.iterations++;            
    },
    draw: function () {
        this.grid.fillPixel(this.x, this.y, colours.red);
    },
    undraw: function () {
        this.grid.fillPixel(this.x, this.y, this.currentPixelColour);
    }
};