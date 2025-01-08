document.addEventListener('DOMContentLoaded', () => {
    Alpine.data('imageGallery', () => ({
        images: [],
        currentIndex: 0,
        showModal: false,
        init() {
            this.images = JSON.parse(document.getElementById('gallery-images').textContent);
        },
        get currentImage() {
            return this.images[this.currentIndex]?.src;
        },
        setCurrentImage(index) {
            this.currentIndex = index;
        },
        closeModal() {
            this.showModal = false;
        },

    }));
    
    Alpine.start();
});
