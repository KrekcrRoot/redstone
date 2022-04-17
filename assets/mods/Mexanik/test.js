class Mexanik_Test extends Block {
    constructor(x, y, settings = {})
    {
        let properties = {
            type: 'Mexanik_Test',
            settings: {}
        }

        properties.settings = settings;
        properties.settings.img = Mexanik_Main.imgs.find(el => el.block == properties.type).src;

        super(x, y, properties);
    }

    tick()
    {

        this.checkCharge();

    }
}