

function addBlock()
{

    let founded = false;

    for(let block of blocks)
    {
        if(block.x == config.user.mouse.gridXY.x && block.y == config.user.mouse.gridXY.y)
        {
            founded = true;
        }
    }

    if(!founded)
    {
        eval(`blocks.push(new ${config.user.tool}(${config.user.mouse.gridXY.x}, ${config.user.mouse.gridXY.y}))`);
    }

}

function delBlock()
{
    for(let block of blocks)
    {
        if(block.x == config.user.mouse.gridXY.x && block.y == config.user.mouse.gridXY.y)
        {
            block.remove();
        }
    }
}

setevent('wheel', (e) => {
    if(config.user.menuOpened)
    {
        if(e.deltaY < 0 && config.user.toolId != 1)
        {
            config.user.toolId--;
        }else if(e.deltaY > 0 && config.user.toolId != allBlocks.length){
            config.user.toolId++;
        }

        let block = allBlocks[(config.user.toolId - 1)];
        let type = block.type;

        config.user.tool = type;

        if(type == 'Arrow')
        {
            $('.tool img').attr('src', `assets/imgs/${config.game.texturepack}/${type.toLowerCase()}.png`);
            config.user.arrowDirection == 'top' ? $('.tool img').css('transform', 'rotate(0deg)') : false;
            config.user.arrowDirection == 'right' ? $('.tool img').css('transform', 'rotate(90deg)') : false;
            config.user.arrowDirection == 'bottom' ? $('.tool img').css('transform', 'rotate(180deg)') : false;
            config.user.arrowDirection == 'left' ? $('.tool img').css('transform', 'rotate(270deg)') : false;
        }else{
            if(block.mod)
            {
                $('.tool img').attr('src', block.src);
            }else{
                $('.tool img').attr('src', `assets/imgs/${config.game.texturepack}/${type.toLowerCase()}.png`);
            }
        }


        for(let tool of document.querySelector('.menu').childNodes)
        {
            if(tool.dataset.name == config.user.tool)
            {
                tool.classList.add('tool-active');  
            }else{
                tool.classList.remove('tool-active');
            }
        }
    }
})


setevent('mousemove', (e) => {
    config.user.mouse.x = e.clientX;
    config.user.mouse.y = e.clientY;

    config.user.mouse.gridXY.x = Math.floor( config.user.mouse.x / config.bg.gridSize ) + 1;
    config.user.mouse.gridXY.y = Math.floor( config.user.mouse.y / config.bg.gridSize ) + 1;

    $('#x').text(config.user.mouse.gridXY.x);
    $('#y').text(config.user.mouse.gridXY.y);

    if(config.user.mouse.x < 45 && config.user.mouse.y < 45)
    {
        $('.xy').css({opacity: 0});
    }else{
        $('.xy').css({opacity: 1});
    }

    if(config.user.mouse.pressed && config.user.mouse.btn == 0 && !config.user.menuOpened && !config.user.codeMenu && !config.user.settingsMenuOpened)
    {
        addBlock();
    }
    if(config.user.mouse.pressed && config.user.mouse.btn == 2 && !config.user.menuOpened && !config.user.codeMenu && !config.user.settingsMenuOpened)
    {
        delBlock();
    }

})

setevent('contextmenu', (e) => {
    e.preventDefault();
})

setevent('keydown', (e) => {
    if(e.key == 's' && e.ctrlKey && config.user.codeMenu)
    {
        e.preventDefault();
        $('.saveCodeMenu').click();
    }
    if(e.key == 'Shift' && !config.user.codeMenu && !config.user.settingsMenuOpened)
    {
        config.user.menuOpened = true;
        hqual(
            () => {
                $('.canvases').css('filter', 'blur(5px)');
            }
        )
        $('.menu').removeClass('none');
        $('.menu').css('opacity', '1');
    }
})

setevent('keyup', (e) => {

    if(e.key == 'Shift' && !config.user.codeMenu && !config.user.settingsMenuOpened)
    {

        config.user.menuOpened = false;
        $('.menu').css('opacity', '0');
        hqual(
            () => {
                $('.canvases').css('filter', 'blur(0px)');
            }
        )
        setTimeout( () => {
            $('.menu').addClass('none');
        }, 51);
    }

    if(e.code == 'Space' && !config.user.codeMenu && !config.user.settingsMenuOpened)
    {

        if(config.game.render == false)
        {
            $('#status').css('color', 'springgreen');
            $('#status').text('on');
            config.game.render = !config.game.render;
        }else{
            $('#status').css('color', 'red');
            $('#status').text('off');
            config.game.render = !config.game.render;
        }

    }

    if(config.user.menuOpened && config.user.tool == 'Arrow')
    {
        if(e.code == 'Digit1')
        {
            config.user.arrowDirection = 'top';
            $('div [data-name="Arrow"] img').css('transform', 'rotate(0deg)');
            $('.tool img').css('transform', 'rotate(0deg)');
        }else if(e.code == 'Digit2')
        {
            config.user.arrowDirection = 'right';
            $('div [data-name="Arrow"] img').css('transform', 'rotate(90deg)');
            $('.tool img').css('transform', 'rotate(90deg)');
        }else if(e.code == 'Digit3')
        {
            config.user.arrowDirection = 'bottom';
            $('div [data-name="Arrow"] img').css('transform', 'rotate(180deg)');
            $('.tool img').css('transform', 'rotate(180deg)');
        }else if(e.code == 'Digit4')
        {
            config.user.arrowDirection = 'left';
            $('div [data-name="Arrow"] img').css('transform', 'rotate(270deg)');
            $('.tool img').css('transform', 'rotate(270deg)');
        }
    }

    if(e.key == '`')
    {
        toggleSettings();
    }
})

function toggleSettings()
{
    $('.settingsFlex').toggleClass('none');

    if($('.settingsFlex').hasClass('none'))
    {
        config.user.settingsMenuOpened = false;
    }else{
        config.user.settingsMenuOpened = true;
    }
}

setevent('mousedown', (e) => {
    config.user.mouse.btn = e.button;
    config.user.mouse.btn = e.button;

    config.user.mouse.pressed = true;

    if(e.ctrlKey)
    {
        if(config.user.mouse.btn == 0)
        {
            let x = config.user.mouse.gridXY.x;
            let y = config.user.mouse.gridXY.y;
            for(let block of blocks)
            {
                if(block.x == x && block.y == y && block.cbo)
                {
                    block.click();
                }
            }
        }
    }else if(e.altKey) {
        if(config.user.mouse.btn == 0)
        {
            let x = config.user.mouse.gridXY.x;
            let y = config.user.mouse.gridXY.y;
            for(let block of blocks)
            {
                if(block.x == x && block.y == y)
                {
                    config.user.tool = block.type;
                    for(let i = 0; i < allBlocks.length; i++)
                    {
                        if(allBlocks[i].type == block.type)
                        {
                            config.user.toolId = i;
                            break;
                        }
                    }
                    new Msg('Блок скопирован', 0, 3);

                    for(let tool of $('.menu').children())
                    {
                        if(tool.dataset.name == config.user.tool)
                        {
                            tool.classList.add('tool-active');  
                        }else{
                            tool.classList.remove('tool-active');
                        }
                    }

                    $('.tool img').attr('src', `assets/imgs/${config.game.texturepack}/${block.type}.png`);

                }
            }
        }
    }else{
        if(!config.user.codeMenu &&!config.user.settingsMenuOpened)
        {
            config.user.mouse.btn == 0 && !config.user.menuOpened ? addBlock() : false;
            config.user.mouse.btn == 2 && !config.user.menuOpened ? delBlock() : false;
        }
    }

    

})
setevent('mouseup', (e) => {
    config.user.mouse.btn = e.button;
    config.user.mouse.btn = e.button;

    config.user.mouse.pressed = false;
})


function loadSave(json)
{
    let loadBlocks = JSON.parse(json);
    for(let block of loadBlocks)
    {

        let settings = {};
        for(let setting of Object.keys(block)) {
            if(setting != 'x' && setting != 'y' && setting != 'oneBlock') {
                settings[setting] = block[setting];
            }
        }

        if(JSON.stringify(settings.img) == "{}")
        {
            delete settings.img;
        }
        

        let cmd = `blocks.push(new ${block.type}(block.x, block.y, settings))`;
        eval(cmd);
    }
    new Msg('Сохранение открыто');
}

function refresh()
{

    cnv(
        () => {
            ctx.clearRect(0, 0, canv.width, canv.height);
        }
    )
    eff(
        () => {
            effect.clearRect(0, 0, canvEffect.width, canvEffect.height);
        }
    )

    for(let block of blocks)
    {
        block.draw();
    }

}

$('.close').on('click', () => {
    $('.close').parent().addClass('none'); 
    config.user.settingsMenuOpened = false;
})









/*

    Krekcr | 2021
    if you want to cooperate: vk.com/krekcr || shilenkok@bk.ru

*/