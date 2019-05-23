/**
 * 
 * @author shh33
 * 
 */
//自调用函数---食物
(function() {
	//存放食物的数组
	var elements = [];
	//创建食物构造函数
	//食物有横、纵坐标、宽、高、背景颜色
	function Food(x, y, width, height, color) {
		//没有指定的时候设置默认的值
		this.x = x || 0;
		this.y = y || 0;
		this.width = width || 20;
		this.height = height || 20;
		this.color = color || "green";
	};
	//把Food暴露给window添加全局访问
	window.Food = Food;
	//添加食物初始化方法
	Food.prototype.init = function(map) {
		//先删除这个食物(这个方法外部无法访问)
		remove();
		// 创建div加入到地图中
		var div = document.createElement("div");
		map.appendChild(div);
		// 设置脱离文档流
		div.style.position = "absolute";
		//设置div样式
		div.style.width = this.width + "px";
		div.style.height = this.height + "px";
		div.style.backgroundColor = this.color;
		//设置随机的坐标
		this.x = parseInt(Math.random() * map.offsetWidth / this.width) * this.width;
		this.y = parseInt(Math.random() * map.offsetHeight / this.height) * this.height;
		// this.x = parseInt(Math.random() * map.offsetWidth / this.width) * this.width;
		// this.y = parseInt(Math.random() * map.offsetHeight / this.height) * this.height;
		div.style.left = this.x + "px";
		div.style.top = this.y + "px";
		//把div加入到数组elements中
		elements.push(div);
	};

	//创建remove方法
	function remove() {
		for (var i = 0; i < elements.length; i++) {
			var ele = elements[i];
			//先找到它的父级元素删除它
			ele.parentNode.removeChild(ele);
			//父级元素删除后 它再数组中也没有存在的价值也应该删除
			elements.splice(i, 1);
		}
	};

})();
