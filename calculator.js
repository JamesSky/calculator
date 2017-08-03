window.onload = function(){
	/**
	 * [$ 获取元素]
	 * @param  {[type]} param [description]
	 * @return {[type]}       [description]
	 */
	var $ = function(param){
		return document.querySelectorAll(param);
	};

	// 是否保留计算
	var isPrintOperator = true;

	// 计算公式字符串
	var isCount = "";

	// 输出功能按键index
	var calulatorArr = [0,1,2,20];

	// 计算功能按键
	var operationArr = [3,7,11,15];

	// 数字键
	var count = [4,5,6,8,9,10,12,13,14,16,18];

	// 正负
	var number = [17];

	// 清空
	var empty = [19];

	for(var i=0;i<count.length;i++){
		addClick(count[i]);
	}

	for(var j=0;j<operationArr.length;j++){
		operation(operationArr[j]);
	}

	for(var k=0;k<calulatorArr.length;k++){
		calulator(calulatorArr[k]);
	}
	/**
	 * [addClick 数字键点击事件]
	 * @param {[type]} index [description]
	 */
	function addClick(index){
		$('.box li')[index].addEventListener("click", function(){

			var $outBox = $('.outBox')[0];

			if(!isPrintOperator){
				$outBox.innerHTML = 0;
				isPrintOperator = true;
			}

		    var _html = this.innerHTML;
		    var _outBoxHtml = $outBox.innerHTML;
		    var _length = 0;
			var splitCount = _outBoxHtml.split(".");

		    !splitCount[0].indexOf('-')?_length = splitCount[0].length-1:_length = splitCount[0].length;

		    if(_html == "." && _outBoxHtml.indexOf('.') != -1){
		    	return false;
		    }
		    if(_html == "." || _outBoxHtml.indexOf('.') != -1){
			    if(splitCount[1] && splitCount[1].length >=5){
			    	return false;
		   		}
		    }else{
		    	if(_length>=8){
			    	return false;
			    }
		    }
		    
		    if(_outBoxHtml === '0' && _html != "."){
		    	$outBox.innerHTML = _html;
		    	isCount += _html;
		    	return false;
		    }

		    $outBox.innerHTML = _outBoxHtml+_html;
		    isCount += _html;
		});
	};

	/**
	 * [正负数按键]
	 * @param  {[type]} ){		var $outBox       [description]
	 * @return {[type]}          [description]
	 */
	$('.box li')[number[0]].addEventListener("click",function(){
		var $outBox = $('.outBox')[0];
		var _outBoxHtml = $outBox.innerHTML;
		if(_outBoxHtml === '0'){
			return false;
		}
		if(isCount === ""){
			return false;
		}
		if(!_outBoxHtml.indexOf('-')){
			isCount = $outBox.innerHTML = _outBoxHtml.replace('-','');
		}else{
			$outBox.innerHTML = "-"+_outBoxHtml;
			isCount = "-"+isCount;
		}
	});

	/**
	 * [清空按键]
	 * @param  {[type]} ){		var $outBox       [description]
	 * @return {[type]}          [description]
	 */
	$('.box li')[empty[0]].addEventListener('click',function(){
		var $outBox = $('.outBox')[0];
		isCount = "";
		isPrintOperator = true;
		$outBox.innerHTML = 0;
	});

	/**
	 * [operation 计算功能操作]
	 * @param  {[type]} index [description]
	 * @return {[type]}       [description]
	 */
	function operation(index){
		$('.box li')[index].addEventListener('click',function(){
			var $outBox = $('.outBox')[0];
			var _html = this.innerHTML;
			var isCalculated = isCount.substr(isCount.length-1,1);
			isPrintOperator = false;
			if(isCalculated == "+" || isCalculated == "-" || isCalculated == "*" || isCalculated == "/"){
				isCount = isCount.substr(0,isCount.length-1);
			}

			isCount = $outBox.innerHTML = eval(isCount);

			if(isCount === undefined){
				isCount = $outBox.innerHTML = 0;
			}
			var splitCount = isCount.toString().split(".");

			if(splitCount[1] !== undefined && splitCount[1].length > 5){
				isCount = $outBox.innerHTML = splitCount[0]+"."+splitCount[1].substr(0,5)
			}

			if(isCount == 'NaN'){
				isCount = $outBox.innerHTML = 0;
			}

			if(isCount == "Infinity"){
				alert("这个数字有点大！从0开始吧～")
				isCount = $outBox.innerHTML = 0;
			}

			if(isCount == "-0"){
		    	isCount = $outBox.innerHTML = 0;
			}

			if(isCount >= 99999999){
		    	alert("这个数字有点大，我算不过来啦～呜呜呜～。重新计算吧！");
		    	isCount = $outBox.innerHTML = 0;
		    }
			isCount += _html;
		});
	};

	/**
	 * [checkResult 校验结果]
	 * @param  {[type]} param [description]
	 * @return {[type]}       [description]
	 */
	function checkResult(param){

		if(param === undefined){
			return 0;
		}

		var splitCount = param.toString().split(".");
		if(splitCount[1] !== undefined && splitCount[1].length > 5){
			return splitCount[0]+"."+splitCount[1].substr(0,5)
		}

		if(param == "Infinity"){
			alert("这个数字有点大！从0开始吧～")
			return 0;
		}

		if(param == 'NaN'){
			return 0;
		}

		if(param == "-0"){
	    	return 0;
		}

		if(param == "0.0"){
	    	return 0;
		}

		if(param >= 99999999){
	    	alert("这个数字有点大，我算不过来啦～呜呜呜～。重新计算吧！");
	    	return 0;
	    }

	    return param;
	}

	/**
	 * [calulator 输出数字]
	 * @param  {[type]} index [description]
	 * @return {[type]}       [description]
	 */
	function calulator(index){
		$('.box li')[index].addEventListener('click',function(){
			var $outBox = $('.outBox')[0];
			var _outBoxHtml = $outBox.innerHTML;
			var _html = this.innerHTML;
			
			if(_html === "sin"){
				isPrintOperator = true;
				isCount = $outBox.innerHTML = checkResult(Math.sin(_outBoxHtml));
			}else if(_html === "cos"){
				isPrintOperator = true;
				isCount = $outBox.innerHTML = checkResult(Math.cos(_outBoxHtml));
			}else if(_html === "tan"){
				isPrintOperator = true;
				isCount = $outBox.innerHTML = checkResult(Math.tan(_outBoxHtml));
			}else{
				$outBox.innerHTML = checkResult(eval(isCount));
				isCount = $outBox.innerHTML;
				isPrintOperator = true;
			}
		});
	}

	
};
































