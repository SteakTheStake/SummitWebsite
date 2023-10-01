const customCursor = document.getElementById('custom-cursor');
const cursorSpeed = 0.1; // Adjust the speed as needed

document.addEventListener('mousemove', (e) => {
  gsap.to(customCursor, {
    x: e.clientX,
    y: e.clientY,
    duration: cursorSpeed,
    overwrite: true
  });
});
