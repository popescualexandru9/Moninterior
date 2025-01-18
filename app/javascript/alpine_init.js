document.addEventListener("DOMContentLoaded", () => {
  Alpine.data("imageGallery", (initialImages = []) => ({
    images: initialImages,
    currentIndex: 0,
    showModal: false,
    init() {
      if (initialImages.length === 0) {
        const galleryImages = document.getElementById("gallery-images");
        if (galleryImages) {
          this.images = JSON.parse(galleryImages.textContent);
        }
      }
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

  Alpine.data("projectImageModal", () => ({
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
    },
  }));

  Alpine.start();
});
