document.addEventListener("DOMContentLoaded", async () => {
    function getCurrentDate() {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}${month}${day}`;
    }

    function setBackgroundImage() {
        const bucketURL = 'https://backgroundparsa.s3.amazonaws.com/';
        const date = getCurrentDate();
        const imageURL = `${bucketURL}background-${date}.jpg`;

        const img = new Image();
        img.onload = function() {
            document.body.style.backgroundImage = `url(${imageURL})`;
        };
        img.onerror = function() {
            console.error('Error loading background image:', imageURL);
        };
        img.src = imageURL;
    }

    async function fetchAyah() {
        try {
            const response = await fetch('/ayah');
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            const ayah = await response.json();
            document.querySelector('.surah-ayah').textContent = `${ayah.surah}:${ayah.ayah}`;
            document.querySelector('.verse.arabic').textContent = ayah.original;
            document.querySelector('.verse.english').textContent = ayah.translate;
        } catch (error) {
            console.error('Error fetching ayah:', error);
        }
    }

    await fetchAyah();
    setBackgroundImage();
});

function redirectToUrl() {
    window.location.href = 'https://soroush.vercel.app/';
}
