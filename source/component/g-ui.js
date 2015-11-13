/*
 * 작성자	 : 이재욱 (4541)
 * 이메일	 : ray0506@gsshop.com
 * 설명	 : UI Control 관련 
------------------------------------------------------------------
1. browser version 
2. form action
	└ input & textarea
	└ checkbox & radio
	└ select & combo
	└ button 
3. Tab & navigation
4. layer
*/

(function(window, document, $){
	var win = $(window);
	var doc = $(document);

//	$('body').append('<input type="text" id="ccc" style="position:fixed;top:340px;left:30%;width:500px;height:50px;font-size:20px;border:2px solid red;z-index:10000">');


	// 인풋 숫자 체크
	$.fn.inputNumberCheck = function(type){
		return this.each(function(){
			 var _this = $(this);
			_this.keydown(function(event){ // Tip : 파이어폭스의 경우 입력값이 한글일때 키코드가 제대로 들어가지 않음 (해결책 : ime-mode:disabled 셋팅)
				var e = event.which || event.charCode || event.keyCode;
				return (e==8 || e==9 || e==46 || (event.ctrlKey && e==65) || (event.ctrlKey && e==67) || (event.ctrlKey && e==86) || (event.ctrlKey && e==88) || (e>=37 && e<=40) || (e>=48 && e<=57) || (e>=96 && e<=105));
			});
			// 가격일 경우 3자리 단위변환, input 타입은 text로 해야함!!
			if(type === 'price'){	
				_this.val(_this.val().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")).on({
					focusin : function(){$(this).val($(this).val().replace(/\,/g, ''))},
					focusout : function(){$(this).val($(this).val().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"))}
				});
			}
		});
	};
	$.fn.inputValueDel = function(){
		return this.each(function(){
			 var _this = $(this).find('input');
			 var _del = $(this).find('.del');
			_this.keydown(function(event){
			 var _len = $(this).val().length;
				if(_len > 0 ){
					_del.css({display:'block'});
				}else{
					_del.css({display:'none'});
				}
			});
			_del.on('click', function(){
				_this.val('');
				_del.hide();
			});
		});
	
	};
	$('.input-wrap').inputValueDel();

	// 인풋 수량 박스
	$.fn.inputCountBox =function(option){
		var option = $.extend({}, $.fn.inputCountBox.option, option); 
		return this.each(function(){
			var _this = $(this),
				_input = _this.find('input'),
				currentCnt = _input.val(), 
				btnPlus = _this.find('.'+option.plusClass),
				btnMinus = _this.find('.'+option.minusClass),
				tipMsg = '';

			function cautionAlert(msg){
				tipMsg += '<div class="tip-wrap">\n';
				tipMsg += '	<span class="tip-arr"></span>\n';
				tipMsg += '	<div class="tip-layer">\n';
				tipMsg += '		<p class="infoMessage">'+msg+'</p>\n';
				tipMsg += '		<button class="tip-close btn-close10"><span>닫기</span></button>\n';
				tipMsg += '	</div>';
				tipMsg += '</div>';
				return tipMsg;
			}

			function upCount(){
				topPos = $(this).outerHeight();
				leftPos = $(this).position().left;

				reCnt = parseInt(_input.val());
				if(reCnt >= option.max) return alert(option.cautionMax); 
				else return _input.val(reCnt +=1);

				_input.val(reCnt);
			}
			
			function downCount(){
				reCnt = parseInt(_input.val());
				
				if(reCnt <= option.min) {
					var tiplayer = $('.tip-layer');
					topPos = $(this).outerHeight();
					leftPos = $(this).position().left + $(this).outerWidth()/2;
					cautionAlert(option.cautionMin, topPos, leftPos);
					
					if(_this.find('.tip-layer').length===0) _this.append(tipMsg).addClass('alert');
					_this.find('.tip-arr').css({display:'block',top:topPos,left:leftPos})
					_this.find('.tip-layer').css({display:'block',top:topPos+9,left:$(this).position().left });


				} else  {
					return _input.val(reCnt -=1);
				}
			}
			
			btnPlus.on({
				click : upCount,
	//			keydown: upCount
			});

			btnMinus.on({
				click : downCount,
	//			keydown: downCount
			});
		});
	};
	$.fn.inputCountBox.option = {
		plusClass		: 'plus',
		minusClass	: 'minus',
		min			: 0,
		max			: 100,
		cautionMin	: '1개 이상부터 구매하실 수 있습니다!',
		cautionMax	: '100개 이하로 구매하실 수 있습니다!'
	};

	$('.tmp-cnt-box').inputCountBox();
	
	// Checkbox & Radio 
	var checkWrapper = '.tmp-check label, .tmp-radio label';
	var checkBoxTemp = '.tmp-check input, .tmp-radio input';

	addClassCheckBox = function(_input){
		$.each(_input,function(){
			var _this = $(this);
			var wrapper =_this.parent();
			if (_this.prop('checked')){
				if (_this.attr('type') === 'radio'){
					var radioName = _this.attr('name');
					$('input[name='+radioName+']').attr('checked', false).parent().removeClass('checked');
				}
				wrapper.addClass('checked');
				_this.attr('checked', true);
			} else {
				wrapper.removeClass('checked');
				_this.attr('checked', false);
			}
		});
	};
	doc.on('change', checkBoxTemp, function(){addClassCheckBox($(this));})
	.on('mouseover focusin', checkBoxTemp, function(){$(this).parent().addClass('over')})
	.on('mouseleave focusout', checkBoxTemp, function(){$(this).parent().removeClass('over')})
	.on('mouseover', checkWrapper, function(){$(this).parent().addClass('over')})
	.on('mouseleave', checkWrapper, function(){$(this).parent().removeClass('over')});
	
	$.fn.placeHolder = function(option){}
	
	// Selector & Combo
	$.fn.gsSelect = function(option){
		var option = $.extend({}, $.fn.gsSelect.default, option); 
		return this.each(function(){

		var _this = $(this),
			seleCurrent = _this.find('.'+option.currentClass),
			seleCurrentA = _this.find('a.'+option.currentClass),
			seleOpenner = _this.find('.'+option.openner),
			seleSelect = _this.find('select'),
			seleListBox = _this.find('ul'),
			seleOn = seleListBox.find('.'+option.onClass),
			seleList = seleListBox.find('li'),
			seleA = seleList.find('a'),
			seleLabel = seleList.find('label'),
			seleInput = seleList.find('input'),
			multiCheck = option.multiCheck === true ? true : (_this.hasClass('multi')) ? true : false,
			clicked = option.clicked === true ? true : (_this.hasClass('clicked')) ? true : false,
			currChage = multiCheck === true ? false : option.currChage,
			docH = $(document).height();

			// init 
			if(currChage == true && multiCheck == false){
				if(seleLabel.length > 0){
					if(seleOn.length == 0){
						seleList.eq(0).addClass(option.onClass);
						seleCurrent.text(seleList.eq(0).text());
					}else{
						seleCurrent.text(seleOn.text());
					}
				}else{
					if(seleOn.length > 0){
						seleCurrent.html(seleOn.html());
					}
				}
			}
			seleInput.is(function(){
				if($(this).parent().hasClass(option.onClass)) $(this).prop('checked', true);
			});
			
			// 이미지 타입 clicked 설정
			if(_this.hasClass('img-type')) clicked = true;

			function seleFocusIn(){
				_this.addClass(option.focusClass);
			}
			function selefocusOut(){
				_this.removeClass(option.focusClass);	
			}
			function overOpt(){
				$(this).parent('li').addClass(option.overClass);
			}
			function outOpt(){
				$(this).parent('li').removeClass(option.overClass);
			}
			// 옵션 열기
			function showOpt(){
				$('.tmp-select.'+option.onClass).not(_this).removeClass(option.onClass);
				_this.toggleClass(option.onClass);
				selefocusOut();
				var currH = seleCurrent.height();
				var rePos = Math.floor(_this.offset().top + seleListBox.outerHeight(true)+currH);
			//  var rePos = Math.floor(_this.offset().top + (seleListBox.outerHeight(true)+currH)-$(window).scrollTop());
				if(docH < rePos){
					seleListBox.addClass('up-mode').css({top:'auto',bottom:currH});
				}else{
					seleListBox.removeClass('up-mode').css({top:currH, bottom:'auto'});
				}
				// List on position
				var onList = seleListBox.find('li.'+option.onClass);
				if(onList.length>0){
					seleListBox.scrollTop(0);
					var blank = parseInt(seleListBox.css('padding-top').split('px')[0]);
					var scrollMove = onList.position().top;
					seleListBox.scrollTop(scrollMove);
				}
				return false;
			}

			// 옵션 닫기
			function hideOpt(){
				if(multiCheck != true && clicked != true){
					_this.removeClass(option.onClass);
				}
				_this.removeClass(option.focusClass);
			}
			// 옵션 선택
			function selectOpt(){
				if(!$(this).hasClass(option.disableClass) && !$(this).parent().hasClass(option.disableClass)){ 
					if(currChage === true){
						var OptValue = _this.hasClass('img-type') ? _this.hasClass('only-txt') ? $(this).find('.opt-txt').text() : $(this).html() : seleLabel.length>0 ? $(this).parent().text() : $(this).text();
						seleCurrent.html($.trim(OptValue)).removeClass(option.focusClass);
					}
					seleList.removeClass(option.onClass);
					if(multiCheck !=true) $(this).parent().addClass(option.onClass);
				}else{
					//alert('해당 옵션은 선택할 수 없습니다!');
					return false;
				}
			}

			
			// 시스템 기본 셀렉터 체인지
			function selectChange(){
				var changeValue = $.trim($(this).find(':selected').text());
				seleCurrent.text(changeValue);
				seleFocusIn();
			}
			// 시스템 기본 셀렉터 이벤트
			seleSelect.unbind().on({
				change : selectChange,
				keyup : selectChange,
				click : function(event){
					event.stopPropagation();
					showOpt();
					selefocusOut();
				},
				focusin : seleFocusIn,
				focusout : selefocusOut,
				mouseenter : function(){seleCurrent.addClass(option.overClass)},
				mouseleave : function(){seleCurrent.removeClass(option.overClass)}
			});
			// 옵션 OnOff
			seleCurrent.unbind().on({click:showOpt,focusin:seleFocusIn,focusout:selefocusOut});
			seleOpenner.unbind('.comboAct').on({'click.comboAct':showOpt});
			_this.unbind('.comboAct').on({'mouseleave.comboAct':function(){if(seleSelect.length == 0) hideOpt();}});
			
			// 키보드 tab
			seleList.last().on('focusout', function(){
				$(this).keydown(function(event){
					if(event.shiftKey==false && event.keyCode == 9){
						_this.removeClass(option.onClass);
					}
				});
			});
			seleCurrentA.on('focusout', function(){
				$(this).keydown(function(event){
					if(event.shiftKey && event.keyCode == 9){
						_this.removeClass(option.onClass);
					}
				});
			});
			// Multi 체크 버블
			seleList.click(function(event){
				if(multiCheck === true || $(this).hasClass(option.disableClass)) event.stopPropagation(); 
			});
			// Link 셀렉터
			 seleA.unbind().on({click:selectOpt,focusin:overOpt,focusout:outOpt,mouseenter:overOpt,mouseleave:outOpt});
			// Form 셀렉터
			seleInput.unbind().on({change:selectOpt,focusin:seleFocusIn,focusout:selefocusOut});
			
			seleCurrentA.trigger('focusout');
			seleList.last().trigger('focusout');
			doc.on('click', function(){
				if(_this.hasClass(option.onClass)) _this.removeClass(option.onClass);
			});
		});
	};
	$.fn.gsSelect.default = {
		type			: 'select',
		openner		: 'btn-opt', // 화살표 토글버튼
		currentClass	: 'current', // 현재값
		onClass		: 'on', // 활성 클래스
		overClass		: 'over', 
		focusClass	: 'focus',
		disableClass	: 'disabled', // 비활성 리스트
		currChage	: true, // 선택값 변경
		clicked		: false, // 클릭시 옵션 레이어 유지 
		multiCheck	: false // 여러 옵션 선택 (체크박스)
	};

	// Tab On
	$.fn.tabAddOn = function(){
		return this.each(function(){
			var _this = $(this);
			var tabList = _this.find('ul').length>0 ? _this.find('li') : _this.children();
			tabList.unbind('.tabClick').on('click.tabClick', function(){
				if($(this).find('.blank').length==0){
					tabList.removeClass('on');
					$(this).addClass('on');
				}
				return false;
			});
		});
	};

	// Tip Layer - 클래스 변경 예정
	$('.zoom-tip').click(function(){
		var _this = $(this),
			topPos = _this.offset().top,
			leftPos = _this.offset().left,
			tipH = _this.outerHeight(),
			layerArr = $('.tip-arr'),
			zoomLayer = _this.find('.zoom-layer'),
			addLayerArr = '<span class="tip-arr" />';
		
	//	if(layerArr.length === 0) body.append(addLayerArr);

		if(_this.hasClass('on')) {
			$('.outModal').css({display:'none'}).removeClass('outModal').appendTo('.tabIndex-storage');
			layerArr.css({display:'none'});
			_this.removeClass('on');
		}
		else {
			$('.tip-arr').css({display:'block',top:topPos+tipH,left:leftPos+9});
			_this.addClass('on').addClass('tabIndex-storage');
			zoomLayer.addClass('outModal').appendTo('body').css({display:'block',top:topPos+tipH+9,left:leftPos-50});
		}
			
		/*
		if(layerArr.length === 0)_this.append(addLayerArr);
		if(_this.hasClass('on')) _this.removeClass('on');
		else _this.addClass('on');
		*/
		
	});	


	// 실행 펑션
	$('.only-num').inputNumberCheck(); // Input Number
	$('.only-price').inputNumberCheck('price'); // Input Price
	$(checkBoxTemp).trigger('change'); // Checkbox & Radio
	$('.tmp-select').gsSelect(); // Select
	$('.tmp-tab').tabAddOn(); // Tab
	
//	$('.img-type').gsSelect({currChage:false}); // Select
})(this, document, jQuery);
