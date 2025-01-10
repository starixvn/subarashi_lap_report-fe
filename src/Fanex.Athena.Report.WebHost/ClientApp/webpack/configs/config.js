let appSetting = {};

if (process.env.TRANSFORM_CONFIG) {
    appSetting = require(`../../../appsettings.${process.env.TRANSFORM_CONFIG}.json`);
} else {
    appSetting = require(`../../../appsettings.Development.json`);
}

module.exports = {
    ...appSetting.ClientSetting
};
