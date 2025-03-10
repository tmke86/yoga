// Main script for interactivity
import { config } from './config.js';
import { loadThumbnails } from './thumbnailHandler.js';

const mainImage = document.getElementById('currentImage');
const imageDescription = document.getElementById('imageDescription');
const warmupContainer = document.getElementById('warmup');
const coreFlowContainer = document.getElementById('core-flow');
const coolDownContainer = document.getElementById('cool-down');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');

let currentCategory = "warmup";
let currentIndex = 0;

// Fetch images dynamically
fetch('images.json')
    .then(response => response.json())
    .then(images => {
        function changeImage(category, index) {
            const categoryImages = images[category];
            currentIndex = index;
            currentCategory = category;
            mainImage.src = categoryImages[currentIndex].src;
            imageDescription.textContent = categoryImages[currentIndex].description;
        }

        // Load thumbnails
        loadThumbnails('warmup', warmupContainer, images, changeImage);
        loadThumbnails('coreFlow', coreFlowContainer, images, changeImage);
        loadThumbnails('coolDown', coolDownContainer, images, changeImage);

        // Initialize with the first image
        changeImage("warmup", 0);

        // Handle navigation
        nextButton.addEventListener('click', () => {
            const categoryImages = images[currentCategory];
            currentIndex = (currentIndex + 1) % categoryImages.length;
            changeImage(currentCategory, currentIndex);
        });

        prevButton.addEventListener('click', () => {
            const categoryImages = images[currentCategory];
            currentIndex = (currentIndex - 1 + categoryImages.length) % categoryImages.length;
            changeImage(currentCategory, currentIndex);
        });

        // Event delegation for thumbnail clicks
        document.querySelector('.categories').addEventListener('click', (event) => {
            if (event.target.tagName === 'IMG') {
                const category = event.target.parentElement.id;
                const index = Array.from(event.target.parentElement.children).indexOf(event.target);
                changeImage(category, index);
            }
        });
    })
    .catch(error => console.error('Error loading images:', error));
