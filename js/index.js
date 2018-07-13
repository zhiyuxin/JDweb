//页面准备
window.onload = function() {
	//搜索
	search();
	//banner
	banner();
	//倒计时
	downtime();
}
//搜索
var search = function() {
	//获取DOM元素
	var search = document.querySelector('.jd_search_box');
	var banner = document.querySelector('.jd_banner');
	//距离范围
	var height = banner.offsetHeight;

	//监听滚动事件
	window.onscroll = function() {
		var top = document.documentElement.scrollTop;
		if(top > height) {
			opacityt = 0.85;
		} else {
			opacityt = 0.85 * (top / height);
		}
		search.style.background = 'rgba(216,80,92,' + opacityt + ')';
	}
};
//banner轮播
var banner = function() {
	var banner = document.querySelector('.jd_banner');
	var width = banner.offsetWidth;
	//图片容器
	var imageBox = banner.querySelector('ul:first-child');
	//点容器
	var pointBox = banner.querySelector('ul:last-child');
	//所有的点
	var points = pointBox.querySelectorAll('li');

	//公用方法
	//加过渡
	var addTransition = function() {
		imageBox.style.transition = 'all 0.2s';
		imageBox.style.webkitTransition = 'all 0.2s';
	}
	//清过渡
	var removeTransition = function() {
		imageBox.style.transition = 'null';
		imageBox.style.webkitTransition = 'null';
	}
	//设置位移
	var setTranslateX = function(translate) {
		imageBox.style.transform = 'translateX(' + translate + 'px)';
		imageBox.style.webkitTransform = 'translateX(' + translate + 'px)';
	}

	var index = 1; //当前索引为1
	var timer = setInterval(function() {
		index++;
		addTransition();
		setTranslateX(-index * width);

	}, 2000);

	imageBox.addEventListener('transitionend', function() {
		if(index >= 9) {
			index = 1;
			//清除过度
			removeTransition();
			//定位
			setTranslateX(-index * width);
		} else if(index <= 0) {
			index = 8;
			removeTransition();
			setTranslateX(-index * width);
		}
		setPoint();
	});

	var setPoint = function() {
		for(var i = 0; i < points.length; i++) {
			points[i].classList.remove('now');
		}
		points[index - 1].classList.add('now');
	}

	var startX = 0; //记录开始的x坐标
	var distanceX = 0; //记录坐标轴的改变
	var isMove = 0;

	imageBox.addEventListener('touchstart', function(e) {
		//关闭定时器
		clearInterval(timer);
		startX = e.touches[0].clientX;
	});

	imageBox.addEventListener('touchmove', function(e) {
		moveX = e.touches[0].clientX;
		distanceX = moveX - startX;
		/* distanceX > 0 向右滑动 */
		/* distanceX < 0 向左滑动 */
		var translateX = -index * width + distanceX;
		removeTransition();
		setTranslateX(translateX);
		isMove = true;
	});

	imageBox.addEventListener('touchend', function(e) {
		/*滑动事件结束后判断当前滑动的距离*/
		if(isMove) {
			if(Math.abs(distanceX) < width / 3) {
				addTransition();
				setTranslateX(-index * width);
			} else {
				if(distanceX > 0) {
					index--;
				} else {
					index++;
				}
				addTransition();
				setTranslateX(-index * width);
			}
		}

		//加上定时器
		clearInterval(timer);
		timer = setInterval(function() {
			index++;
			addTransition();
			setTranslateX(-index * width);

		}, 2000);

		//重置参数
		startX = 0;
		distanceX = 0;
		isMove = false;
	});

}
//倒计时
var downtime = function() {
	//倒计时时间是8个小时
	var time = 08 * 60 * 60;
	var skTime = document.querySelector('.sk_time');
	var spans = skTime.querySelectorAll('span');

	var timer = setInterval(function() {
		time--;
		var h = Math.floor(time / 3600);
		var m = Math.floor(time % 3600 / 60);
		var s = time % 60;

		spans[0].innerHTML = Math.floor(h / 10);
		spans[1].innerHTML = h % 10;

		spans[3].innerHTML = Math.floor(m / 10);
		spans[4].innerHTML = m % 10;

		spans[6].innerHTML = Math.floor(s / 10);
		spans[7].innerHTML = s % 10;

		if(time <= 0) {
			clearInterval(timer);
		}
	}, 1000);
}