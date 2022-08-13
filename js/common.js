document.addEventListener('DOMContentLoaded', function() {

	// Swiper Sliders Site
	const mySwiper = new Swiper('.mySwiper', {
		direction: 'vertical',
		mousewheel: true,
		speed: 800,
		parallax: true,
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
		},
		effect: 'slide',
		cubeEffect: {
			slideSyadwos: false,
			shadow: false,
		}
	});

		// Swiper Sliders Certificates
	const mySwiperCertificates = new Swiper(".mySwiperCertificates", {
		nested: true, 
		loop: true,
		slidesPerView: 3,
		speed: 1800,
		centeredSlides: true,
		autoplay: {
			delay: 3000,
		},
		zoom: {
			maxRatio: 5,
		},
	});

	// Увеличение активного сертификата
	mySwiperCertificates.on('realIndexChange', function() {
		$('.mySwiperCertificates .certificates__img').removeClass('certificates__img_active');
		setTimeout(function() {
			document.querySelector('.mySwiperCertificates .swiper-slide-active').classList.add('certificates__img_active');
		}, 1);
	});

	// При клики на пункт меню плавная прокрутка и добавление класса active для чертой под пунктом
	$(document).on('click', '.menu__link', function(e) {
		e.preventDefault();
		$('.menu .menu__link').removeClass('active');
		e.target.parentNode.classList.add('active');
		const node = e.target.parentNode.parentNode.parentNode;
		const i = [...node.children].indexOf(e.target.parentNode.parentNode);
		document.querySelectorAll('.swiper-pagination .swiper-pagination-bullet')[i].click();
	});

	// Поворот лого при прокрутке страницы
	let logo = document.querySelectorAll('.logo__image img');
	mySwiper.on('slideNextTransitionStart', function() {
		gsap.to(logo, 1.0, {
			rotation: '+=45',
			ease: Power2.easeOunt,
		});
	});
	mySwiper.on('slidePrevTransitionStart', function() {
		gsap.to(logo, 1.0, {
			rotation: '-=45',
			ease: Power2.easeOunt,
		});
	});

	// Поворот картинки фона при прокрутке сертификатов
	let certificatesImage = document.querySelectorAll('.certificates__image');
	mySwiperCertificates.on('slideNextTransitionStart', function() {
		gsap.to(certificatesImage, 1.0, {
			rotation: '+=45',
			ease: Power2.easeOunt,
		});
	});
	mySwiperCertificates.on('slidePrevTransitionStart', function() {
		gsap.to(certificatesImage, 1.0, {
			rotation: '-=45',
			ease: Power2.easeOunt,
		});
	});

	// Добавление/Удаление анимации
	function setAnimation(time, className, animationName, type) {
		setTimeout(function() {
			var elements = document.querySelectorAll(className);
			if(type == "add")	elements.forEach(element => element.classList.add(animationName));
			else if(type == "remove")	elements.forEach(element => element.classList.remove(animationName));
		}, time);
	}
	
	// Настройка анимации
	mySwiper.on('realIndexChange', function() {

		// Настройка анимации для раздела "О нас"
		if(mySwiper.slides[mySwiper.realIndex].id == "about") {
			gsap.to(".about__image", 1.5, {opacity: 1, ease:"circ", scale: 1, delay: 1.3});
			setAnimation(2800, ".about__image", "image-move", "add");
			gsap.to(".about__heading", 1.5, {x:"0", ease:"circ", delay: 0.5});
			gsap.to(".about__title", 1.5, {y:"0", ease:"circ"});
			gsap.to(".about__text", 1.5, {x:"0", ease:"circ", delay: 0.5});
		} else {
			gsap.to(".about__image", 1, {opacity: 0, ease:"reverse", scale: 0});
			setAnimation(0, ".about__image", "image-move", "remove");
			gsap.to(".about__heading", 1, {x:"4000",  ease:"reverse"});
			gsap.to(".about__title", 1, {y:"-4000", ease:"reverse"});	
			gsap.to(".about__text", 1, {x:"4000",  ease:"reverse"});
		}

		// Настройка анимации для раздела "Услуги"
		if(mySwiper.slides[mySwiper.realIndex].id == "services") {
			gsap.to(".services__image", 1.5, {opacity: 1, ease:"back", scale: 1, delay: 1.3});
			gsap.to(".services__image_bottom", 1.5, {opacity: 1, ease:"back", scale: -1, delay: 1.3});
			setAnimation(2800, ".services__image", "image-move", "add");
			setAnimation(2800, ".services__image_bottom", "image-move-bottom", "add");
			gsap.to(".services__title", 1.5, {x:"0", ease:"back"});
			gsap.to(".services__text", 1.5, {x:"0", ease:"back"});
			gsap.to(".services__icon", 1.5, {opacity: 1, ease:"back", scale: 1, delay: 1.3});
		} else {
			gsap.to(".services__image", 1, {opacity: 0, ease:"reverse", scale: 0});
			setAnimation(0, ".services__image", "image-move", "remove");
			setAnimation(0, ".services__image_bottom", "image-move-bottom", "remove");
			gsap.to(".services__title", 1, {x:"4000", ease:"reverse"});
			gsap.to(".services__title_right", 1.5, {x:"-4000", ease:"reverse"});
			gsap.to(".services__text", 1, {x:"4000", ease:"reverse"});
			gsap.to(".services__text_right", 1, {x:"-4000", ease:"reverse"});
			gsap.to(".services__icon", 1, {opacity: 0, ease:"reverse", scale: 0});
		}

		// Настройка анимации для раздела "Сертификаты"
		if(mySwiper.slides[mySwiper.realIndex].id == "certificates") {
			gsap.to(".certificates__image", 1.5, {opacity: 1, ease:"circ", scale: 1});
			gsap.to(".mySwiperCertificates", 1.5, {x:"0", ease:"circ"});
		} else {
			gsap.to(".certificates__image", 1, {opacity: 0, ease:"reverse", scale: 0});
			gsap.to(".mySwiperCertificates", 1, {x:"4000",  ease:"reverse"});
		}

		// Настройка анимации для раздела "Контакты"
		if(mySwiper.slides[mySwiper.realIndex].id == "contacts") {
			gsap.to(".contacts__list", 1, {y:"0", ease:"circ"});
			gsap.to(".form", 1, {y:"0", ease:"circ", delay: 0.3});
			gsap.to(".contacts__image_left", 1, {y:"0", rotate: "10deg", ease:"circ", delay: 0.6});
			gsap.to(".contacts__image_bottom", 1, {y:"0", rotate: "96deg", ease:"circ", delay: 0.9});
			gsap.to(".contacts__image_right", 1, {y:"0", rotate: "59deg", ease:"circ", delay: 1.2});
			setAnimation(1600, ".contacts__image_left", "image-move1", "add");
			setAnimation(2600, ".contacts__image_bottom", "image-move2", "add");
			setAnimation(3600, ".contacts__image_right", "image-move3", "add");
		} else {
			gsap.to(".contacts__image_left", 1, {y:"4000", ease:"reverse"});	
			gsap.to(".contacts__list", 1, {y:"4000", ease:"reverse"});	
			gsap.to(".contacts__image_bottom", 1, {y:"4000", ease:"reverse"});	
			gsap.to(".form", 1, {y:"4000", ease:"reverse"});	
			gsap.to(".contacts__image_right", 1, {y:"4000", ease:"reverse"});
			setAnimation(0, ".contacts__image_left", "image-move1", "remove");
			setAnimation(0, ".contacts__image_bottom", "image-move2", "remove");
			setAnimation(0, ".contacts__image_right", "image-move3", "remove");
		}
	});

	// Настройка анимации для раздела "О нас" при первом запуске
	gsap.to(".about__image", 1.5, {opacity: 1, ease:"circ", scale: 1, delay: 1.3});
	setAnimation(2800, ".about__image", "image-move", "add");
	gsap.to(".about__heading", 1.5, {x:"0", ease:"circ", delay: 0.5});
	gsap.to(".about__title", 1.5, {y:"0", ease:"circ"});
	gsap.to(".about__text", 1.5, {x:"0", ease:"circ", delay: 0.5});

	// Форма обратной связи
	var form = document.querySelector('.form');
	form.addEventListener("submit", function(evt) {
			evt.preventDefault();

			var formData = {
					name: document.querySelector('input[name="name"]').value,
					email: document.querySelector('input[name="email"]').value,
					phone: document.querySelector('input[name="phone"]').value,
					message: document.querySelector('textarea[name="message"]').value
			};

			var request = new XMLHttpRequest();

			request.addEventListener("load", function() {
					console.log(request.response);
					form.innerHTML = "<h2>Спасибо за заявку!</h2>"
			});

			request.open("POST", "/feedback/processing.php", true);
			request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
			request.send(
					"name=" + encodeURIComponent(formData.name) +
					"&email=" + encodeURIComponent(formData.email) +
					"&phone=" + encodeURIComponent(formData.phone) +
					"&message=" + encodeURIComponent(formData.message)
			);
	});

})