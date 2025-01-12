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

    Alpine.data('projectImageModal', () => ({
        showModal: false,
        imageSrc: null,
        imageTitle: null,
        imageTag: null,
        openModal(src, title, tag) {
            this.imageSrc = src;
            this.imageTitle = title;
            this.imageTag = tag;
            this.showModal = true;
        },
        closeModal() {
            this.showModal = false;
            this.imageSrc = null;
            this.imageTitle = null;
            this.imageTag = null;
        }
    }));
    
    Alpine.start();
});
