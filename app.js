let galleyElems = document.querySelectorAll('.galley');
const heroBox = document.querySelector('.heroBox');

// Calculate grid positions
const isMobile = window.innerWidth <= 768;
const columns = isMobile ? 2 : 4; // 2 columns for mobile, 4 for desktop
const spacing = isMobile ? 280 : 420; // Reduced spacing for mobile
const offsetAfterFirstRow = isMobile ? -100 : -200; // Adjusted offset for mobile

const updateLayout = () => {
    galleyElems.forEach((item, index) => {
        const row = Math.floor(index / columns);
        const col = index % columns;
        
        const top = (row * spacing + 100) + 'px';
        let left = (col * spacing + (window.innerWidth - spacing * (columns - 1)) / 2);
        
        if (index >= columns) {
            left += offsetAfterFirstRow;
        }
        
        item.style.top = top;
        item.style.left = left + 'px';
    });
};

// Initial layout
updateLayout();

// Update layout on resize
window.addEventListener('resize', () => {
    updateLayout();
});

// Animate images in pairs
galleyElems.forEach((item, index) => {
    if (index % 2 === 0) {
        gsap.to([galleyElems[index], galleyElems[index + 1]], {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.inout',
            scrollTrigger: {
                trigger: '.heroBox',
                start: `top+=${index * 200} top`,
                end: `top+=${(index * 150) + 200} top`,
                toggleActions: 'play none none reverse',
                scrub: 1
            }
        });
    }
});

// Add title horizontal scroll animation
gsap.to('.title', {
    x: -3000, // Adjust this value based on your text length
    ease: 'power1.inout',
    scrollTrigger: {
        trigger: '.heroBox',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1
    }
});