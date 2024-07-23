document.addEventListener("DOMContentLoaded", () => {
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
        const imageURL = `${baseURL}background-${date}.png`;

        document.body.style.backgroundImage = `url(${imageURL})`;
    }

    // Call the function to set the background image
    setBackgroundImage();
});

function redirectToUrl() {
    window.location.href = 'https://soroush.vercel.app/';
}
