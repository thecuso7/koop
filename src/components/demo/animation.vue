<template>
  <div ref="animationContainer" class="complex-animation">
    <!-- Слой с градиентным фоном -->
    <div class="gradient-background"></div>
    
    <!-- Плавающие геометрические формы -->
    <div class="floating-shapes">
      <div v-for="(shape, index) in shapes" 
           :key="`shape-${index}`" 
           :class="`shape shape-${shape.type}`"
           :style="shape.style"></div>
    </div>
    
    <!-- Частицы первого слоя (основные) -->
    <div class="particles-layer-1">
      <div v-for="(particle, index) in particlesLayer1" 
           :key="`p1-${index}`" 
           class="particle particle-layer-1"
           :style="particle.style"></div>
    </div>
    
    <!-- Частицы второго слоя (мелкие) -->
    <div class="particles-layer-2">
      <div v-for="(particle, index) in particlesLayer2" 
           :key="`p2-${index}`" 
           class="particle particle-layer-2"
           :style="particle.style"></div>
    </div>
    
    <!-- Центральная сфера с эффектами -->
    <div class="central-sphere">
      <div class="sphere-core"></div>
      <div class="sphere-glow"></div>
      <div class="sphere-pulse" v-for="n in 5" :key="`pulse-${n}`" 
           :class="`pulse-${n}`"></div>
      
      <!-- Вращающиеся кольца -->
      <div class="orbital-ring ring-1"></div>
      <div class="orbital-ring ring-2"></div>
      <div class="orbital-ring ring-3"></div>
      
      <!-- Орбитальные элементы -->
      <div class="orbital-element" v-for="(orbital, index) in orbitals" 
           :key="`orbital-${index}`"
           :style="orbital.style">
        <div class="orbital-dot"></div>
        <div class="orbital-trail"></div>
      </div>
    </div>
    
    <!-- Энергетические лучи -->
    <div class="energy-rays">
      <div v-for="ray in 12" :key="`ray-${ray}`" 
           :class="`energy-ray ray-${ray}`"></div>
    </div>
    
    <!-- Вихри частиц -->
    <div class="vortex-container">
      <div v-for="vortex in 3" :key="`vortex-${vortex}`" 
           :class="`vortex vortex-${vortex}`">
        <div v-for="v in 30" :key="`v-particle-${vortex}-${v}`" 
             class="vortex-particle"></div>
      </div>
    </div>
    
    <!-- Волновые эффекты -->
    <div class="wave-effects">
      <div class="wave wave-1"></div>
      <div class="wave wave-2"></div>
      <div class="wave wave-3"></div>
    </div>
    
    <!-- Контент -->
    <div class="animated-content">
      <slot>
        <h2 data-text="Сложная анимация">Блок с анимацией</h2>
      </slot>
    </div>
    
    <!-- Индикатор нагрузки (для демонстрации) -->
    <div class="performance-indicator" v-if="showPerformance">
      <div class="indicator-text">
        CPU: {{ Math.floor(performanceLoad) }}% | 
        Элементов: {{ totalElements }}
      </div>
    </div>
  </div>
</template>

<script setup>
/**
 * 
 * (ВЗЯТО ИЗ GPT ДЛЯ ТЕСТА)
 * 
 */
import { ref, onMounted, onUnmounted, computed, watch } from 'vue'
import gsap from 'gsap'

const props = defineProps({
  intensity: {
    type: Number,
    default: 1,
    validator: value => value >= 0.1 && value <= 3
  },
  showPerformance: {
    type: Boolean,
    default: false
  },
});

const animationContainer = ref(null)
let masterTimeline = null
let animationInterval = null
const performanceLoad = ref(50)
const lastUpdate = ref(Date.now())

// Генерация данных для анимации
const particlesLayer1 = ref(generateParticles(150, 2, 6))
const particlesLayer2 = ref(generateParticles(300, 1, 3))
const shapes = ref(generateShapes(25))
const orbitals = ref(generateOrbitals(8))

// Общее количество элементов
const totalElements = computed(() => 
  particlesLayer1.value.length + 
  particlesLayer2.value.length + 
  shapes.value.length + 
  orbitals.value.length + 
  12 + 90 + 5 + 3 + 3
)

const startAnimation = () => {
	console.log('Стартик', masterTimeline);
	if(masterTimeline) {
		masterTimeline.play();
	}
}

function generateParticles(count, minSize, maxSize) {
  return Array.from({ length: count }, (_, i) => ({
    style: {
      '--x': `${Math.random() * 100}vw`,
      '--y': `${Math.random() * 100}vh`,
      '--size': `${minSize + Math.random() * (maxSize - minSize)}px`,
      '--duration': `${5 + Math.random() * 10}s`,
      '--delay': `${Math.random() * 5}s`,
      '--angle': `${Math.random() * 360}deg`
    }
  }))
}

function generateShapes(count) {
  const shapeTypes = ['triangle', 'square', 'pentagon', 'hexagon', 'circle']
  return Array.from({ length: count }, (_, i) => ({
    type: shapeTypes[Math.floor(Math.random() * shapeTypes.length)],
    style: {
      '--shape-x': `${Math.random() * 100}vw`,
      '--shape-y': `${Math.random() * 100}vh`,
      '--shape-size': `${20 + Math.random() * 60}px`,
      '--shape-rotation': `${Math.random() * 360}deg`,
      '--shape-opacity': `${0.1 + Math.random() * 0.4}`,
      '--shape-duration': `${8 + Math.random() * 15}s`
    }
  }))
}

function generateOrbitals(count) {
  return Array.from({ length: count }, (_, i) => ({
    style: {
      '--orbital-radius': `${80 + i * 40}px`,
      '--orbital-speed': `${10 + i * 2}s`,
      '--orbital-start': `${Math.random() * 360}deg`
    }
  }))
}

// Создание сложной анимации
const createComplexAnimation = () => {
  if (!animationContainer.value) return
  
  // Основная timeline
  masterTimeline = gsap.timeline({
	paused: true,
    repeat: -1, // Бесконечное повторение
    defaults: {
      ease: "none"
    }
  });
  
  const container = animationContainer.value
  
  // 1. Анимация градиентного фона
  const gradient = container.querySelector('.gradient-background')
  masterTimeline.to(gradient, {
    backgroundPosition: '200% 200%',
    duration: 20,
    repeat: -1,
    ease: "linear"
  })
  
  // 2. Плавающие формы
  const floatingShapes = container.querySelectorAll('.shape')
  floatingShapes.forEach(shape => {
    masterTimeline.to(shape, {
      x: `+=${100 + Math.random() * 200}`,
      y: `+=${100 + Math.random() * 200}`,
      rotation: `+=${180 + Math.random() * 180}`,
      duration: 15 + Math.random() * 20,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    })
  })
  
  // 3. Частицы слоя 1
  const particles1 = container.querySelectorAll('.particle-layer-1')
  particles1.forEach(particle => {
    masterTimeline.to(particle, {
      x: `+=${200 + Math.random() * 300}`,
      y: `+=${200 + Math.random() * 300}`,
      rotation: `+=${360}`,
      duration: `random(8, 15)`,
      repeat: -1,
      ease: "sine.inOut"
    })
  })
  
  // 4. Частицы слоя 2
  const particles2 = container.querySelectorAll('.particle-layer-2')
  particles2.forEach(particle => {
    masterTimeline.to(particle, {
      x: `+=${300 + Math.random() * 400}`,
      y: `+=${300 + Math.random() * 400}`,
      duration: `random(12, 20)`,
      repeat: -1,
      ease: "power1.inOut"
    })
  })
  
  // 5. Центральная сфера
  const sphereCore = container.querySelector('.sphere-core')
  masterTimeline.to(sphereCore, {
    scale: 1.2,
    duration: 2,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  })
  
  // 6. Пульсации сферы
  const pulses = container.querySelectorAll('.sphere-pulse')
  pulses.forEach((pulse, i) => {
    masterTimeline.to(pulse, {
      scale: 3,
      opacity: 0,
      duration: 3,
      delay: i * 0.5,
      repeat: -1,
      ease: "power2.out"
    })
  })
  
  // 7. Вращающиеся кольца
  const rings = container.querySelectorAll('.orbital-ring')
  rings.forEach((ring, i) => {
    masterTimeline.to(ring, {
      rotation: 360,
      duration: 15 + i * 5,
      repeat: -1,
      ease: "linear"
    })
  })
  
  // 8. Орбитальные элементы
  const orbitalElements = container.querySelectorAll('.orbital-element')
  orbitalElements.forEach(element => {
    masterTimeline.to(element, {
      rotation: 360,
      duration: `random(20, 40)`,
      repeat: -1,
      ease: "linear"
    })
  })
  
  // 9. Энергетические лучи
  const rays = container.querySelectorAll('.energy-ray')
  rays.forEach((ray, i) => {
    masterTimeline.to(ray, {
      scaleY: 1.5,
      opacity: 0.8,
      duration: 1.5,
      delay: i * 0.1,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    })
  })
  
  // 10. Вихри
  const vortices = container.querySelectorAll('.vortex')
  vortices.forEach((vortex, i) => {
    masterTimeline.to(vortex, {
      rotation: 360 * (i % 2 === 0 ? 1 : -1),
      duration: 20 + i * 10,
      repeat: -1,
      ease: "linear"
    })
    
    const vortexParticles = vortex.querySelectorAll('.vortex-particle')
    vortexParticles.forEach((particle, pIndex) => {
      masterTimeline.to(particle, {
        x: `random(-100, 100)`,
        y: `random(-100, 100)`,
        duration: `random(3, 8)`,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: pIndex * 0.1
      })
    })
  })
  
  // 11. Волновые эффекты
  const waves = container.querySelectorAll('.wave')
  waves.forEach((wave, i) => {
    masterTimeline.to(wave, {
      scale: 2,
      opacity: 0,
      duration: 4 + i,
      repeat: -1,
      ease: "power2.out",
      delay: i * 0.5
    })
  })
  
  // 12. Текст с эффектом свечения
  const heading = container.querySelector('h2')
  masterTimeline.to(heading, {
    textShadow: '0 0 20px rgba(100, 200, 255, 0.8)',
    duration: 2,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  })
  
  // Обновление индикатора производительности
  if (props.showPerformance) {
    animationInterval = setInterval(() => {
      const now = Date.now()
      const delta = now - lastUpdate.value
      performanceLoad.value = 40 + Math.sin(now * 0.001) * 30 + Math.random() * 20
      lastUpdate.value = now
    }, 1000)
  }
  
  console.log(`Запущена сложная анимация с ${totalElements.value} элементами`);
}
// Инициализация
onMounted(() => {
  console.log('Инициализация сложной анимации...')
    createComplexAnimation()
});

// Очистка
onUnmounted(() => {
  if (masterTimeline) {
    masterTimeline.kill()
  }
  if (animationInterval) {
    clearInterval(animationInterval)
  }
  console.log('Анимация остановлена')
})

defineExpose({
  startAnimation
});
</script>

<style scoped>
.complex-animation {
  position: relative;
  width: 100%;
  min-height: 600px;
  overflow: hidden;
  background: #0a0a0a;
  border-radius: 8px;
  margin: 20px 0;
}

/* Градиентный фон */
.gradient-background {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: 
    radial-gradient(circle at 30% 30%, 
      rgba(100, 50, 255, 0.15) 0%, 
      transparent 50%),
    radial-gradient(circle at 70% 70%, 
      rgba(255, 50, 100, 0.1) 0%, 
      transparent 50%),
    linear-gradient(45deg, 
      #0a0a0a 0%, 
      #1a1a2e 50%, 
      #16213e 100%);
  background-size: 200% 200%;
  filter: blur(40px);
}

/* Плавающие формы */
.floating-shapes {
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.shape {
  position: absolute;
  opacity: var(--shape-opacity, 0.2);
  transform: 
    translate(var(--shape-x), var(--shape-y)) 
    rotate(var(--shape-rotation));
  pointer-events: none;
}

.shape-triangle {
  width: 0;
  height: 0;
  border-left: calc(var(--shape-size) / 2) solid transparent;
  border-right: calc(var(--shape-size) / 2) solid transparent;
  border-bottom: var(--shape-size) solid rgba(100, 200, 255, 0.3);
}

.shape-square {
  width: var(--shape-size);
  height: var(--shape-size);
  background: rgba(255, 100, 200, 0.2);
  border: 1px solid rgba(255, 100, 200, 0.4);
}

.shape-pentagon,
.shape-hexagon {
  width: var(--shape-size);
  height: var(--shape-size);
  background: rgba(100, 255, 200, 0.2);
  clip-path: polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%);
}

.shape-circle {
  width: var(--shape-size);
  height: var(--shape-size);
  border-radius: 50%;
  background: rgba(255, 200, 100, 0.2);
  border: 1px solid rgba(255, 200, 100, 0.4);
}

/* Частицы */
.particles-layer-1,
.particles-layer-2 {
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.particle {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
}

.particle-layer-1 {
  width: var(--size, 4px);
  height: var(--size, 4px);
  background: radial-gradient(circle at 30% 30%, 
    rgba(100, 200, 255, 0.8), 
    rgba(50, 150, 255, 0.4));
  box-shadow: 0 0 10px rgba(100, 200, 255, 0.6);
  left: var(--x, 50%);
  top: var(--y, 50%);
}

.particle-layer-2 {
  width: var(--size, 2px);
  height: var(--size, 2px);
  background: rgba(255, 255, 255, 0.3);
  box-shadow: 0 0 5px rgba(255, 255, 255, 0.4);
  left: var(--x, 50%);
  top: var(--y, 50%);
}

/* Центральная сфера */
.central-sphere {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  height: 200px;
  pointer-events: none;
}

.sphere-core {
  position: absolute;
  width: 60px;
  height: 60px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, 
    #4a90e2, #2a70c2);
  box-shadow: 
    0 0 60px rgba(74, 144, 226, 0.8),
    inset 0 0 20px rgba(255, 255, 255, 0.3);
  z-index: 10;
}

.sphere-glow {
  position: absolute;
  width: 100px;
  height: 100px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  background: radial-gradient(circle, 
    rgba(74, 144, 226, 0.4) 0%, 
    rgba(74, 144, 226, 0) 70%);
  filter: blur(20px);
}

.sphere-pulse {
  position: absolute;
  width: 60px;
  height: 60px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  border: 2px solid rgba(100, 200, 255, 0.3);
}

/* Орбитальные кольца */
.orbital-ring {
  position: absolute;
  top: 50%;
  left: 50%;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transform-origin: center;
}

.ring-1 {
  width: 140px;
  height: 140px;
  margin: -70px 0 0 -70px;
  border-color: rgba(100, 200, 255, 0.2);
}

.ring-2 {
  width: 180px;
  height: 180px;
  margin: -90px 0 0 -90px;
  border-color: rgba(255, 100, 200, 0.2);
}

.ring-3 {
  width: 220px;
  height: 220px;
  margin: -110px 0 0 -110px;
  border-color: rgba(100, 255, 200, 0.2);
}

/* Орбитальные элементы */
.orbital-element {
  position: absolute;
  top: 50%;
  left: 50%;
  width: var(--orbital-radius, 100px);
  height: var(--orbital-radius, 100px);
  transform-origin: center;
  transform: rotate(var(--orbital-start, 0deg));
  pointer-events: none;
}

.orbital-dot {
  position: absolute;
  width: 8px;
  height: 8px;
  top: 0;
  left: calc(50% - 4px);
  border-radius: 50%;
  background: rgba(255, 200, 100, 0.8);
  box-shadow: 0 0 10px rgba(255, 200, 100, 0.6);
}

.orbital-trail {
  position: absolute;
  width: 1px;
  height: 50px;
  top: 8px;
  left: calc(50% - 0.5px);
  background: linear-gradient(to bottom, 
    rgba(255, 200, 100, 0.6), 
    transparent);
}

/* Энергетические лучи */
.energy-rays {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  height: 300px;
  pointer-events: none;
}

.energy-ray {
  position: absolute;
  width: 2px;
  height: 100px;
  top: 50%;
  left: 50%;
  transform-origin: center bottom;
  background: linear-gradient(to top, 
    rgba(100, 200, 255, 0), 
    rgba(100, 200, 255, 0.8));
  margin-left: -1px;
  margin-top: -100px;
}

.ray-1 { transform: rotate(0deg); }
.ray-2 { transform: rotate(30deg); }
.ray-3 { transform: rotate(60deg); }
.ray-4 { transform: rotate(90deg); }
.ray-5 { transform: rotate(120deg); }
.ray-6 { transform: rotate(150deg); }
.ray-7 { transform: rotate(180deg); }
.ray-8 { transform: rotate(210deg); }
.ray-9 { transform: rotate(240deg); }
.ray-10 { transform: rotate(270deg); }
.ray-11 { transform: rotate(300deg); }
.ray-12 { transform: rotate(330deg); }

/* Вихри */
.vortex-container {
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.vortex {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
}

.vortex-1 { width: 300px; height: 300px; }
.vortex-2 { width: 400px; height: 400px; }
.vortex-3 { width: 500px; height: 500px; }

.vortex-particle {
  position: absolute;
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: rgba(255, 100, 200, 0.6);
  top: 50%;
  left: 50%;
  transform-origin: center;
}

/* Волновые эффекты */
.wave-effects {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
}

.wave {
  position: absolute;
  border-radius: 50%;
  border: 1px solid rgba(100, 200, 255, 0.3);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.wave-1 { width: 250px; height: 250px; }
.wave-2 { width: 350px; height: 350px; }
.wave-3 { width: 450px; height: 450px; }

/* Контент */
.animated-content {
  position: relative;
  z-index: 100;
  text-align: center;
  padding: 40px;
  color: white;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
}

.animated-content h2 {
  font-size: 3rem;
  margin-bottom: 20px;
  background: linear-gradient(90deg, #60a5fa, #a78bfa, #f472b6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  transition: text-shadow 0.3s ease;
}

.animated-content p {
  font-size: 1.3rem;
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto;
}

/* Индикатор производительности */
.performance-indicator {
  position: absolute;
  bottom: 20px;
  right: 20px;
  background: rgba(0, 0, 0, 0.7);
  color: #00ff00;
  padding: 8px 12px;
  border-radius: 4px;
  font-family: monospace;
  font-size: 12px;
  z-index: 1000;
  border: 1px solid rgba(0, 255, 0, 0.3);
}

@media (max-width: 768px) {
  .complex-animation {
    display: none;
  }
  
  .mobile-alternative {
    display: block;
    padding: 40px;
    text-align: center;
    background: #1a1a2e;
    color: white;
    border-radius: 8px;
  }
}
</style>