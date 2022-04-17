class Piston_Block extends Block {
    constructor(x, y, settings = {})
    {
        let properties = {
            type: 'Piston_Block',
            settings: {}
        }

        properties.settings = settings;
        properties.settings.img = Piston_Main.imgs.find(el => el.block == properties.type).src;

        super(x, y, properties);
    }

    tick()
    {

        this.checkCharge();

    }
}