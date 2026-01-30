// Enhanced Tree Drag and Zoom functionality
document.addEventListener('DOMContentLoaded', () => {
    const treeContainer = document.getElementById('tree-container');
    if (!treeContainer) return;

    let isDragging = false;
    let startX, startY;
    let scrollLeft, scrollTop;
    let scale = 1;
    let offsetX = 0;
    let offsetY = 0;

    // Initialize the tree container for mobile optimization
    treeContainer.style.touchAction = 'none';

    // Mouse events for desktop
    treeContainer.addEventListener('mousedown', (e) => {
        if (e.target.closest('.upgrade-node')) return; // Don't drag when clicking on upgrade nodes
        
        isDragging = true;
        startX = e.pageX - treeContainer.offsetLeft;
        startY = e.pageY - treeContainer.offsetTop;
        scrollLeft = treeContainer.scrollLeft;
        scrollTop = treeContainer.scrollTop;
        
        treeContainer.style.cursor = 'grabbing';
    });

    treeContainer.addEventListener('mouseleave', () => {
        isDragging = false;
        treeContainer.style.cursor = 'default';
    });

    treeContainer.addEventListener('mouseup', () => {
        isDragging = false;
        treeContainer.style.cursor = 'default';
    });

    treeContainer.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        
        const x = e.pageX - treeContainer.offsetLeft;
        const y = e.pageY - treeContainer.offsetTop;
        const walkX = (x - startX) * 2; // Multiply by 2 for faster scrolling
        const walkY = (y - startY) * 2;
        
        treeContainer.scrollLeft = scrollLeft - walkX;
        treeContainer.scrollTop = scrollTop - walkY;
    });

    // Touch events for mobile
    treeContainer.addEventListener('touchstart', (e) => {
        if (e.target.closest('.upgrade-node')) return; // Don't drag when touching upgrade nodes
        
        isDragging = true;
        const touch = e.touches[0];
        startX = touch.clientX - treeContainer.offsetLeft;
        startY = touch.clientY - treeContainer.offsetTop;
        scrollLeft = treeContainer.scrollLeft;
        scrollTop = treeContainer.scrollTop;
        
        e.preventDefault(); // Prevent default touch behavior
    }, { passive: false });

    treeContainer.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        const touch = e.touches[0];
        const x = touch.clientX - treeContainer.offsetLeft;
        const y = touch.clientY - treeContainer.offsetTop;
        const walkX = (x - startX) * 2; // Multiply by 2 for faster scrolling
        const walkY = (y - startY) * 2;
        
        treeContainer.scrollLeft = scrollLeft - walkX;
        treeContainer.scrollTop = scrollTop - walkY;
        
        e.preventDefault(); // Prevent default touch behavior
    }, { passive: false });

    treeContainer.addEventListener('touchend', () => {
        isDragging = false;
    });

    // Wheel event for zooming
    treeContainer.addEventListener('wheel', (e) => {
        if (e.ctrlKey) {
            e.preventDefault();
            const delta = e.deltaY > 0 ? 0.9 : 1.1;
            scale *= delta;
            scale = Math.max(0.5, Math.min(scale, 2)); // Limit scale between 0.5 and 2
            
            treeContainer.style.transform = `scale(${scale})`;
            treeContainer.style.transformOrigin = 'center center';
        }
    }, { passive: false });

    // Prevent context menu on long press (mobile)
    treeContainer.addEventListener('contextmenu', (e) => {
        e.preventDefault();
    });

    // Initialize the tree with some sample nodes if needed
    setTimeout(() => {
        initializeTree();
    }, 100);
});

function initializeTree() {
    // This function would normally initialize the upgrade tree
    // For now, we just ensure it's properly positioned for mobile
    const treeContainer = document.getElementById('tree-container');
    if (treeContainer) {
        // Position the tree in a way that makes sense for mobile users
        // This ensures that important nodes are visible without needing to scroll up initially
        treeContainer.scrollLeft = treeContainer.scrollWidth / 4; // Start slightly scrolled to the right
        treeContainer.scrollTop = treeContainer.scrollHeight / 4; // Start slightly scrolled down
    }
}

// Mobile-specific enhancements
document.addEventListener('DOMContentLoaded', () => {
    // Add swipe gestures for better mobile experience
    let touchStartX = 0;
    let touchStartY = 0;
    
    document.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    }, { passive: true });
    
    document.addEventListener('touchend', (e) => {
        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;
        
        const diffX = touchStartX - touchEndX;
        const diffY = touchStartY - touchEndY;
        
        // Only consider horizontal swipes if they're larger than vertical ones
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
            if (diffX > 0) {
                // Swipe left - next section
            } else {
                // Swipe right - previous section
            }
        }
    }, { passive: true });
});