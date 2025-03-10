// A reusable function to load thumbnails dynamically
export function loadThumbnails(category, container, images, changeImageCallback) {
    images[category].forEach((image, index) => {
        const thumbnail = document.createElement('img');
        thumbnail.src = image.src;
        thumbnail.alt = `Thumbnail ${index + 1}`;
        thumbnail.addEventListener('click', () => {
            changeImageCallback(category, index);
        });
        container.appendChild(thumbnail);
    });
}
