
let mods = [];
if(localStorage.mods && localStorage.mods.length != 0)
{
    mods = localStorage.mods.split(',');
}

class Mod {

    static name = `${this}`.split(' ')[1];

    static load()
    {
        for(let i = 0; i < this.imgs.length; i++)
        {
            this.imgs[i].src = `assets/mods/${this.name.replace('_Main', '')}/${this.imgs[i].src}`;
        }
    }
}

for(let mod of mods)
{
    let script = document.createElement('script');
    script.setAttribute('src', `assets/mods/${mod}/index.js`);
    script.setAttribute('id', mod);
    document.querySelector('body').append(script);
    $(`#${mod}`).on('load', () => {
        let files;
        eval(`files = ${mod}_Main.blocks`);
        for(let file of files)
        {
            let fileScript = document.createElement('script');
            fileScript.setAttribute('src', `assets/mods/${mod}/${file[0]}.js`);
            $('.blocks').append(fileScript);
        }

    })
}
