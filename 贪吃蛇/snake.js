/**
 * 
 * @autor shh33
 * 
 */
//自调用函数---小蛇
(function() {
	//存放食物的数组
	var elements = [];
	//小蛇身上每一节有宽、高、方向
	function Snake(width, height, direction) {
		this.width = width || 20;
		this.height = height || 20;
		//小蛇的身体/蛇头蛇身
		this.body = [{
				x: 3,
				y: 2,
				color: "orangered"
			},
			{
				x: 2,
				y: 2,
				color: "orange"
			},
			{
				x: 1,
				y: 2,
				color: "orange"
			}
		];
		this.direction = direction || "right";
	};
	//创建小蛇的初始化方法
	Snake.prototype.init = function(map) {
		//先删除之前的小蛇
		remove();
		//先遍历小蛇的身体
		for (var i = 0; i < this.body.length; i++) {
			var obj = this.body[i];
			//创建一个div加入到map中去
			var div = document.createElement("div");
			map.appendChild(div);
			//设置样式
			div.style.width = this.width + "px";
			div.style.height = this.height + "px";
			div.style.position = "absolute";
			div.style.left = obj.x * this.width + "px";
			div.style.top = obj.y * this.height + "px";
			div.style.backgroundColor = obj.color;
			//回收
			elements.push(div);
		}
	};
	//把小蛇暴漏给windows
	window.Snake = Snake;
	//创建蛇的移动方法
	Snake.prototype.move = function(food, map) {
		var i = this.body.length - 1;
		//将蛇身的前一个位置的值给后一个
		for (; i > 0; i--) {
			this.body[i].x = this.body[i - 1].x;
			this.body[i].y = this.body[i - 1].y;
		}
		//蛇头的移动方法
		switch (this.direction) {
			case "left":
				this.body[0].x -= 1;
				break;
			case "right":
				this.body[0].x += 1;
				break;
			case "top":
				this.body[0].y -= 1;
				break;
			case "bottom":
				this.body[0].y += 1;
				break;
		}
		//判断蛇是否吃到食物
		//先拿到小蛇的坐标
		var headX = this.body[0].x * this.width;
		var headY = this.body[0].y * this.height;
		if (headX === food.x && headY === food.y) {
			//将蛇尾复制一个加到自己的蛇身body数组中
			var last = this.body[this.body.length - 1];
			this.body.push({
				x: last.x,
				y: last.y,
				color: last.color
			})
			//重新初始化食物
			food.init(map);
		}

	};
	//创建私有方法删除小蛇
	function remove() {
		//从蛇尾向蛇头删除div
		var i = elements.length - 1;
		for (; i >= 0; i--) {
			//删除页面上的小蛇
			elements[i].parentNode.removeChild(elements[i]);
			//删除elements数组中的小蛇
			elements.splice(i, 1);
		}
	};

}());
