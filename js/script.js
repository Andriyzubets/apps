if(document.querySelector('.main')) {
	const EVENTS_INTERVAL   = 500,  
	SWIPE_SENSITIVITY = 0.33;   
	var mainHeight = document.querySelector('.main').offsetHeight,
	menuLinks = document.querySelectorAll('.header .men'),
	dv = document.querySelector('.main .about .wrapper'),
	portfolio = document.querySelector('.portfolio'),
	pPocket = document.querySelector('.portfolio .pocket');
	document.querySelector('.header .portLink').onclick = switchPort();
	pPocket.onclick = switchPort();	
	function switchPort(){
		return function(event){
			event.preventDefault();
			if(!portfolio.classList.contains('active')){
				portfolio.classList.add('active')
				for(i=0;i<menuLinks.length;i++){
					menuLinks[i].classList.remove('active')
				}
				document.querySelector('.header .portLink').classList.add('active');

			} else {
				portfolio.classList.remove('active');
				document.querySelector('.header .portLink').classList.remove('active');
				dv.style.transform='translateY(0)';
				menuLinks[0].classList.add('active');
			}
		}
	}
	document.addEventListener('DOMContentLoaded', () => {
		let elem = document.querySelector('.about'); 
		initSmoothScrollEl(elem); 
	});

	function initSmoothScrollEl(el) {
		el.blocksContainer = el.querySelector('.main .about .wrapper'); 
		el.scrollPosY   = 0; 
		el.scrollPosInc = el.clientHeight; 
		el.touchStartY  = 0; 
		el.timeTransEnd = 0; 
		el.doScroll = function (direction) {
			if (!this.readyForScroll || !direction || Date.now() - this.timeTransEnd < EVENTS_INTERVAL)
				return; 
			direction = Math.sign(direction); 
			let newScrollPosY = this.scrollPosY + direction * this.scrollPosInc, 
			maxScrollPosY = this.blocksContainer.scrollHeight - this.clientHeight; 
			this.readyForScroll = !(newScrollPosY <= 0 && newScrollPosY >= -maxScrollPosY); 
			if (!this.readyForScroll) {
				this.scrollPosY = newScrollPosY; 
				this.blocksContainer.style.transform = `translateY(${newScrollPosY}px)`; 
			}
		}; 
		el.addEventListener('wheel', function (e) {
			e.preventDefault(); 
			this.doScroll(e.wheelDelta || -e.deltaY); 
		}); 

		el.addEventListener('touchstart', function (e) {
			e.preventDefault(); 
			this.touchStartY = e.changedTouches[0].screenY;
		}); 
		el.addEventListener('touchend', function (e) {
			e.preventDefault(); 
			let touchEndY = e.changedTouches[0].screenY, 
			delta = touchEndY - this.touchStartY; 
			if (Math.abs(delta) > SWIPE_SENSITIVITY * this.clientHeight)
				this.doScroll(delta); 
		});

		el.addEventListener('transitionend', function () {
			this.readyForScroll = true; 
			this.timeTransEnd   = Date.now();
			findLocation();
		}); 
		el.readyForScroll = true; 


		function findLocation(){
			if(dv.getAttribute('style')) {
				let dvStyle = dv.getAttribute('style');
				let transZRegex = /\.*translateY\((.*)px\)/i;
				zTrans = transZRegex.exec(dvStyle)[1];
			} else {
				zTrans = 0;
			}
			for(i=0;i<menuLinks.length;i++){
				menuLinks[i].classList.remove('active')
			}
			if(zTrans == 0) {
				menuLinks[0].classList.add('active');
			} else if(zTrans == -parseInt(mainHeight)){
				menuLinks[1].classList.add('active');
			} else if(zTrans == -parseInt(mainHeight*2)){
				menuLinks[2].classList.add('active');
			} else {
				menuLinks[3].classList.add('active');
			}
		}

	}
	for(i=0;i<menuLinks.length;i++) {
		menuLinks[i].onclick = chSlides(i);
	}
	function chSlides(index){
		return function(evt) {
			evt.preventDefault();
			pos = -parseInt(mainHeight * index);
			for(i=0;i<menuLinks.length;i++){
				menuLinks[i].classList.remove('active')
			}
			menuLinks[index].classList.add('active')
			dv.style.transform='translateY(' + pos + 'px)';
		}
	}
}