describe("Testing Langton's Ant", function () {
	it("on entering a white square, the ant should turn right", function () {
        var canvas = document.getElementById('canvas'),
		    grid = new Grid(canvas, 800, 600),
		    ant = new Ant(grid);
        
        grid.togglePixel(ant.x + 1, ant.y);
        ant.move();
        
        expect(ant.direction).to.be.equal(directions.S);
	});
	
	it("on entering a black square, the ant should turn left", function () {
        var canvas = document.getElementById('canvas'),
		    grid = new Grid(canvas, 800, 600),
		    ant = new Ant(grid);
        
        ant.move();
        
        expect(ant.direction).to.be.equal(directions.N);
	});
	
	it("on exiting a square, its colour should be inverted", function () {
		var canvas = document.getElementById('canvas'),
		    grid = new Grid(canvas, 800, 600),
		    ant = new Ant(grid);
            isMarked = grid.isPixelMarked(ant.x, ant.y); 
            
        ant.move();
        
        expect(grid.isPixelMarked(ant.x - 1, ant.y)).to.be.equal(!isMarked);
	});
});