document.addEventListener("DOMContentLoaded", () => {
    fetch('component/fotter.html')
        .then(response => response.text())
        .then(data => {
            document.querySelector('.footer-container').innerHTML = data;
        })
        .catch(error => console.error('Error loading footer:', error));
});