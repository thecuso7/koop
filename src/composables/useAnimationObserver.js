import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue';

export const useAnimationObserver = (anchorRef, componentRef) => {
    const showAnimationBlock = ref(false);

    watch(componentRef, (newComponent) => {
        if(newComponent) {
            nextTick(() => {
                newComponent.startAnimation();
            });
        }
    });

    onMounted(() => {
        const options = {
            rootMargin: '0px 0px 75px 0px',
            threshold: 0,
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    showAnimationBlock.value = true;
                }
            });
        }, options);

        observer.observe(anchorRef.value);
    });

    return { showAnimationBlock };
}
