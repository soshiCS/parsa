document.addEventListener("DOMContentLoaded", () => {
    // Removed Unsplash API call as it's no longer needed

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
});
