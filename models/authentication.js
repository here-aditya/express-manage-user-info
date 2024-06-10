const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
    const Authentication = sequelize.define('Authentication', {
        username: { type: DataTypes.STRING, allowNull: false, unique: true },
        password: { type: DataTypes.STRING, allowNull: false }
    });

    Authentication.beforeSave(async (auth, options) => {
        if (auth.changed('password')) {
            auth.password = await bcrypt.hash(auth.password, 10);
        }
    });

    Authentication.prototype.validPassword = async function (password) {
        return await bcrypt.compare(password, this.password);
    };

    return Authentication;
};
