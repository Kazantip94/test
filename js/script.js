$(document).ready(function () {
    $('.slider').slick({
        arrows: true,
        slidesToShow: 4,
        speed: 500,
        easing: 'ease',
        autoplay: false,
        autoplaySpeed: 1500,
        pauseOnFocus: true,
        responsive: [{
            breakpoint: 1200,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1  
            }
        },
        {
            breakpoint: 920,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1  
        }
        }]
    });
});