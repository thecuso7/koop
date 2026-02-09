<template>
	<div ref="card" class="mission-card" @mouseenter="flip(true)" @mouseleave="flip(false)">
		<!-- Canvas для звездного фона -->
		<canvas ref="starsCanvas" class="fx-layer stars-layer" />
		<!-- Canvas для огня / дыма ракеты -->
		<canvas ref="fx" class="fx-layer rocket-layer" />

		<div class="card-content" :class="{ flipped: isFlipped }" ref="cardContent">
			<div class="front">
				<div class="content">
					<h3>{{ mission?.name || 'Без названия' }}</h3>
					<p>{{ mission?.details?.substring(0, 100) || 'Нет описания' }}...</p>
				</div>
			</div>
			<div class="back">
				<p>Дополнительная информация о миссии</p>
				<div v-if="mission">
					<p>Дата: {{ formatDate(mission.date_utc) }}</p>
					<p>Статус: {{ missionStatus }}</p>
					<p>Экипаж: {{ mission.crew?.length || 0 }} чел.</p>
				</div>
			</div>
		</div>

		<div ref="rocket" class="rocket">🚀</div>
	</div>
</template>

<script setup>

/**
 * (ВЗЯТО ИЗ GPT для теста)
 * 
 * 
 */
import { ref, onMounted, onBeforeUnmount, nextTick, computed } from 'vue';
import gsap from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

gsap.registerPlugin(MotionPathPlugin);

const props = defineProps({
	mission: {
		type: Object,
		default: () => ({})
	}
});

const card = ref(null);
const rocket = ref(null);
const fx = ref(null);
const starsCanvas = ref(null);
const cardContent = ref(null);

// ФИКСИРОВАННЫЕ РАЗМЕРЫ ДЛЯ АНИМАЦИИ
const CARD_WIDTH = 320;  // 👈 Жёстко заданная ширина
const CARD_HEIGHT = 180; // 👈 Жёстко заданная высота

let ctx, starsCtx, tl, rafId, starsRafId;
let particles = [];
let stars = [];
const isFlipped = ref(false);

// Хелперы
const missionStatus = computed(() => {
	if (props.mission?.upcoming) return 'Предстоящий';
	if (props.mission?.success) return 'Успешный';
	return 'Неудачный';
});

const formatDate = (dateString) => {
	if (!dateString) return 'Неизвестно';
	return new Date(dateString).toLocaleDateString('ru-RU');
};

function createParticle(x, y) {
	return { 
		x,
		y, 
		vx: (Math.random()-0.5)*0.6, 
		vy: Math.random()*1.2+0.4, 
		life: 1, 
		size: Math.random()*6+4
	};
}

function renderParticles() {
	if (!ctx) return;
	
	ctx.clearRect(0, 0, fx.value.width, fx.value.height);
	particles.forEach(p => {
		p.x += p.vx;
		p.y += p.vy;
		p.life -= 0.025;
		ctx.beginPath();
		ctx.fillStyle = `rgba(255,140,60,${p.life})`;
		ctx.arc(p.x, p.y, p.size, 0, Math.PI*2);
		ctx.fill();
	});
	particles = particles.filter(p => p.life > 0);
	rafId = requestAnimationFrame(renderParticles);
}

function createStar() {
	return {
		x: Math.random() * CARD_WIDTH,
		y: Math.random() * CARD_HEIGHT, 
		size: Math.random()*2+0.5, 
		alpha: Math.random(),
		delta: Math.random()*0.02+0.005 
	};
}

function renderStars() {
	if (!starsCtx) return;
	
	starsCtx.clearRect(0, 0, starsCanvas.value.width, starsCanvas.value.height);
	stars.forEach(s => {
		s.alpha += s.delta;
		if(s.alpha > 1 || s.alpha < 0) s.delta *= -1;
		starsCtx.beginPath();
		starsCtx.fillStyle = `rgba(255,255,255,${s.alpha})`;
		starsCtx.arc(s.x, s.y, s.size, 0, Math.PI*2);
		starsCtx.fill();
	});
	starsRafId = requestAnimationFrame(renderStars);
}

function flip(state) {
	isFlipped.value = state;
	
	if(state) {
		gsap.to(rocket.value, { duration: 0.5, opacity: 0, scale: 0.6, ease: 'power2.in' });
		gsap.to(fx.value, { duration: 0.5, opacity: 0, scale: 0.6, ease: 'power2.in' });
		gsap.to(particles, { duration: 0.5, life: 0, ease: 'power2.out' });
	} else {
		gsap.to(rocket.value, { duration: 0.5, opacity: 1, scale: 1, ease: 'power2.out' });
		gsap.to(fx.value, { duration: 0.5, opacity: 1, scale: 1, ease: 'power2.out' });
	}
}

onMounted(async () => {
	await nextTick();
	
	// Устанавливаем ФИКСИРОВАННЫЕ размеры для canvas
	fx.value.width = CARD_WIDTH + 120;
	fx.value.height = CARD_HEIGHT + 120;
	fx.value.style.transform = 'translate(-60px,-60px)';
	ctx = fx.value.getContext('2d');
	
	starsCanvas.value.width = CARD_WIDTH;
	starsCanvas.value.height = CARD_HEIGHT;
	starsCtx = starsCanvas.value.getContext('2d');
	
	// Создаём звёзды
	for(let i = 0; i < 80; i++) {
		stars.push(createStar());
	}
	renderStars();
	
	// Устанавливаем высоту front/back элементов
	if(cardContent.value) {
		cardContent.value.querySelector('.front').style.height = CARD_HEIGHT + 'px';
		cardContent.value.querySelector('.back').style.height = CARD_HEIGHT + 'px';
	}
	
	// ФИКСИРОВАННАЯ траектория для 320x180
	tl = gsap.timeline({ repeat: -1, defaults: { ease: 'none' } });
	
	tl.to(rocket.value, {
		duration: 6,
		motionPath: {
			path: [
				// Координаты относительно фиксированных размеров
				{ x: -12, y: -12 },                           // Левый верх
				{ x: CARD_WIDTH - 12, y: -12 },              // Правый верх
				{ x: CARD_WIDTH - 12, y: CARD_HEIGHT - 12 }, // Правый низ
				{ x: -12, y: CARD_HEIGHT - 12 },             // Левый низ
				{ x: -12, y: -12 }                           // Возврат к началу
			],
			curviness: 1.15,
			autoRotate: true // 👈 Автоматический поворот по направлению
		},
		onUpdate: () => {
			// Получаем текущие координаты ракеты
			const matrix = new DOMMatrix(
				window.getComputedStyle(rocket.value).transform
			);
			
			// Центр ракеты относительно canvas
			const rocketCenterX = matrix.m41 + 13; // 13 = половина ширины emoji
			const rocketCenterY = matrix.m42 + 13; // 13 = половина высоты emoji
			
			// Создаём частицы в позиции ракеты
			for(let i = 0; i < 3; i++) {
				// Добавляем случайное смещение
				const offsetX = (Math.random() - 0.5) * 10;
				const offsetY = (Math.random() - 0.5) * 10;
				particles.push(createParticle(
					rocketCenterX + offsetX + 60, // +60 компенсация смещения canvas
					rocketCenterY + offsetY + 60  // +60 компенсация смещения canvas
				));
			}
		}
	});
	
	renderParticles();
});

onBeforeUnmount(() => {
	tl?.kill();
	cancelAnimationFrame(rafId);
	cancelAnimationFrame(starsRafId);
	particles = [];
	stars = [];
});
</script>

<style scoped>
.mission-card {
	position: relative;
	width: 100%;
	min-height: 180px;
	perspective: 1000px;
	margin: 0 auto;
}

.mission-card::before {
	content: '';
	display: block;
	padding-top: 56.25%; /* 180/320 = 0.5625 = 56.25% */
}

.card-content {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	transition: transform 0.8s;
	transform-style: preserve-3d;
}

.card-content.flipped {
	transform: rotateY(180deg);
}

.card-content .front, 
.card-content .back {
	position: absolute;
	width: 100%;
	height: 100%;
	backface-visibility: hidden;
	border-radius: 20px;
	padding: 24px;
	background: radial-gradient(circle at top, #12162b, #05060f);
	box-shadow: 0 30px 80px rgba(0,0,0,0.6), 
	            inset 0 0 40px rgba(80,120,255,0.15);
	color: #fff;
	overflow: hidden;
}

.card-content .front {
	top: 0;
	left: 0;
}

.card-content .back {
	top: 0; 
	left: 0;
	transform: rotateY(180deg);
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	font-size: 0.95rem;
}

.fx-layer {
	position: absolute;
	inset: 0;
	pointer-events: none;
	z-index: 1;
}

/* Фиксируем размеры слоёв с эффектами */
.stars-layer {
	width: 320px !important;
	height: 180px !important;
	left: 50%;
	transform: translateX(-50%);
}

.rocket-layer {
	width: 440px !important;
	height: 300px !important;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
}

.rocket {
	position: absolute;
	top: 0;
	left: 0;
	font-size: 26px;
	filter: drop-shadow(0 0 14px rgba(255,140,60,0.9));
	will-change: transform, opacity;
	z-index: 2;
	width: 26px;
	height: 26px;
	transform-origin: center center;
}

@media (max-width: 768px) {
	.mission-card {
		max-width: 280px;
	}
	
	.mission-card::before {
		padding-top: 64.29%;
	}
	
	.stars-layer {
		width: 280px !important;
		height: 180px !important;
	}
	
	.rocket-layer {
		width: 400px !important;
		height: 300px !important;
	}
}

.mission-card, 
.card-content, 
.fx-layer {
	box-sizing: border-box;
}
</style>