/**
 * 
 * @autor shh33
 * 
 */

//自调用函数---游戏对象
(function() {
	//外部访问的this是windows设置为that
	var that = null;

	function Game(map) {
		this.food = new Food();
		this.snake = new Snake();
		this.map = map;
		that = this;
	};
	Game.prototype.star = function() {
		//先初始化小蛇和食物
		this.food.init(this.map);
		this.snake.init(this.map);
		//调用小蛇的移动方法
		this.runSnake(this.food, this.map);
		//调用绑定事件
		this.bindKey();
		console.log("调用结束");
	};
	Game.prototype.runSnake = function(food, map) {
		console.log("小蛇动了");
		//设置定时器小蛇自移动
		var timeId = setInterval(function() {
			this.snake.move(food, map);
			this.snake.init(map);

			//判断小蛇是否撞墙
			var maxX = this.map.offsetWidth / this.snake.width;
			var maxY = this.map.offsetHeight / this.snake.height;
			//小蛇头的横纵坐标
			var headX = this.snake.body[0].x;
			var headY = this.snake.body[0].y;
			//判断是否撞墙
			if (headX < 0 || headX >= maxX) {
				clearInterval(timeId);
				alert("(❤ ω ❤)糟糕 ! ");
			}
			if (headY < 0 || headY >= maxY) {
				clearInterval(timeId);
				alert("危险 ! ╰(￣ω￣ｏ)");
			}
		}.bind(that), 150);
	};
	//设置小蛇移动按键绑定
	Game.prototype.bindKey = function() {
		console.log("键盘绑定调用了");
		document.addEventListener("keydown", function(e) {
			switch (e.keyCode) {
				case 37:
					this.snake.direction = "left";
					break;
				case 38:
					this.snake.direction = "top";
					break;
				case 39:
					this.snake.direction = "right";
					break;
				case 40:
					this.snake.direction = "bottom";
					break;
			}
		}.bind(that), false);
	};

	//暴露给window外部可以调用
	window.Game = Game;
}());
