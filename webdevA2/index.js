var images = document.querySelectorAll('.articleimage'); // click image to zoom in new tab
images.forEach(function (image) {
    image.addEventListener('click', function () {
        window.open(this.src, '_blank');
    });
});

var container = document.querySelector('.circles'); // creating circles for background
for (var i = 1; i <= 10; i++) {
    var circle = document.createElement('li');
    circle.style.bottom = '-25vh';
    circle.style.left = Math.random() * 100 + '%';
    circle.style.width = (Math.random() * 50 + 50) + 'px';
    circle.style.height = (Math.random() * 50 + 50) + 'px';
    circle.style.animationDelay = Math.random() * 10 + 's';
    circle.style.animationDuration = (Math.random() * 20 + 5) + 's';

    container.appendChild(circle);
}
function scrollToElement(elementId) { // smooth scrolling for articles
    const element = document.getElementById(elementId);
    if (element) {window.scrollTo({
            top: element.offsetTop - 100,
            behavior: "smooth"
        });
    }
}

window.addEventListener('scroll', function () { // progress bar
    const scrollProgress = (document.documentElement.scrollTop / (document.documentElement.scrollHeight - document.documentElement.clientHeight)) * 100;
    document.querySelector('.progress-bar').style.width = scrollProgress + '%';
});

