function log(text)
{
    console.log(text);
}

function setevent(event, func, item = document)
{
    item.addEventListener(event, func);
}

function cnv(func)
{
    ctx.beginPath();

    func();

    ctx.closePath();
}

function bnv(func)
{
    bg.beginPath();

    func();

    bg.closePath();
}

function eff(func)
{
    effect.beginPath();

    func();

    effect.closePath();
}

function hqual(func, func2 = function() {}) {
    if(!config.game.lowGraphic)
    {
        func();
    }else{
        func2();
    }
} 

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function clearBlock(x, y) {
    cnv(
        () => {
            ctx.clearRect(x * config.bg.gridSize - config.bg.gridSize, y * config.bg.gridSize - config.bg.gridSize, config.bg.gridSize, config.bg.gridSize);
        }
    )
}

function moveBlocks(x, y) {
    for(let block of blocks)
    {
        block.x += x;
        block.y += y;
        block.draw(1);
    }
}

/*

    render menu | HTML

*/

function renderMenu()
{

    $('.menu').html('');

    for(let block of allBlocks)
    {
        let tool = document.createElement('div');
        tool.classList.add('menu-tool');
        tool.setAttribute('data-name', block.type);
    
        if(block.mod)
        {
            tool.innerHTML = `
        
            <img class="menu-tool-img" src="${block.src}" alt="">
        
            <p class="menu-tool-title">${block.title}</p>
        
            `;
        }else{
            tool.innerHTML = `
        
            <img class="menu-tool-img" src="assets/imgs/${config.game.texturepack}/${block.type.toLowerCase()}.png" alt="">
        
            <p class="menu-tool-title">${block.title}</p>
        
            `;
        }
    
        
    
        $('.menu').append(tool);
    
    }
    
    $('.menu-tool').first().addClass('tool-active');
}


/* 

    Krekcr | 2021
    if you want to cooperate: vk.com/krekcr || shilenkok@bk.ru

*/