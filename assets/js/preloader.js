
/* 

    tool img

*/

$('.tool img').attr('src', `assets/imgs/${config.game.texturepack}/redstone.png`);

/* 

    Transition

*/

if(!config.game.lowGraphic)
{
    document.querySelector('.canvases').style.transition = 'all 100ms ease-in-out';
    document.querySelector('.xy').style.transition = 'transition: all 0.02s ease-in-out;';
    document.querySelector('.menu').style.transition = 'all 50ms linear';
    document.querySelector('.tool img').style.transition = 'all 150ms ease';
    for(let menuTool of document.querySelectorAll('.menu-tool'))
    {
        menuTool.style.transition = 'all 25ms ease-in-out';
    }
    for(let menuToolImg of document.querySelectorAll('.menu-tool-img'))
    {
        menuToolImg.style.transition = 'all 150ms ease-in-out';
    }
}

$('.tool img').height(50 * config.game.scale);
$('.xy').css('font-size', `${18 * config.game.scale}px`);
$('#status').css('font-size', `${18 * config.game.scale}px`);

let wrong = setTimeout(function() {}, 5000);

setevent('DOMContentLoaded', () => {
    setTimeout( () => {
        $('.preloader').css({opacity: 0});
        setTimeout( () => {
            renderMenu();
            $('.preloader').remove();
        }, 200);
    }, 1000);
});




/* 

    Krekcr | 2021
    if you want to cooperate: vk.com/krekcr || shilenkok@bk.ru

*/