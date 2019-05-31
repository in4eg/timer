(function() {
	var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
	window.requestAnimationFrame = requestAnimationFrame;
})();


RadialGrapgh = function(element) {
	var pixelRatio = window.devicePixelRatio || 1;
	var canvas = element;
	var ctx = canvas.getContext('2d');
	var width = 0, height = 0;

	(setCanvasSize = function() {
		width = $(canvas).parent().outerWidth() * pixelRatio;
		height = $(canvas).parent().outerHeight() * pixelRatio;
		canvas.width = width;
		canvas.height = height;
	})();

	// convert to timestamp
	getTime = function(humanTime) {
		humanTime = humanTime.split('/');
		var newDate = humanTime[1] + ',' + humanTime[0] + ',' + humanTime[2];
		var timeStamp = new Date(newDate).getTime()
		return timeStamp
	}

	this.dataObj = {
		startColor: $(element).data('bgcolor'),
		drawColor: $(element).data('drawcolor'),
		timeFrom: new Date().getTime(),
		timeTo: getTime($(element).data('to'))
	}

	var lineWidth = $(element).data('width');
	var radius = Math.max(1, (Math.min(canvas.width, canvas.height) / 2) - 3);

	drawChart = function(obj) {
		// bg circle
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.beginPath();
		ctx.lineWidth = lineWidth;
		ctx.arc(canvas.width / 2, canvas.height / 2, radius - ctx.lineWidth / 2, 0, Math.PI * 2);

		ctx.strokeStyle = obj.startColor;
		ctx.stroke();
	};

	

	// start = function() {

		var percent = 0;
		this.countTime = function() {
			var obj = this.dataObj;
			percent++

			requestAnimationFrame(this.countTime.bind(this))
		}


		window.addEventListener('resize', function() {
			setCanvasSize();
		});
		return this;
	};


	$('[data-timer]').each(function(i, canvas){
		var timer = new RadialGrapgh(canvas)
		timer.countTime();

	})
