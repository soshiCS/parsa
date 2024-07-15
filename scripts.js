document.addEventListener("DOMContentLoaded", () => {
    // Fetch a random Quran verse
    const quranApiUrl = 'https://api.alquran.cloud/v1/ayah/random';
    fetch(quranApiUrl)
        .then(response => response.json())
        .then(data => {
            const verse = data.data.text;
            const surah = data.data.surah.englishName;
            const ayah = data.data.numberInSurah;
            document.getElementById('quote').innerText = `“${verse}” - Surah ${surah}, Ayah ${ayah}`;
        })
        .catch(error => console.error('Error fetching the Quran verse:', error));

    // Function to get the current date as an integer (e.g., 20240715)
    function getCurrentDate() {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}${month}${day}`;
    }

    // Function to set the background image
    function setBackgroundImage() {
        const baseURL = 'images/';
        const date = getCurrentDate();
        const imageURL = `${baseURL}background-${date}.jpg`;

        document.body.style.backgroundImage = `url(${imageURL})`;
    }

    // Call the function to set the background image
    setBackgroundImage();
});

function redirectToUrl() {
    window.location.href = 'https://soroush.vercel.app/';
}
