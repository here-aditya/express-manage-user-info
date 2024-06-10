module.exports = (sequelize, DataTypes) => {
    const Address = sequelize.define('Address', {
        street: { type: DataTypes.STRING, allowNull: false },
        city: { type: DataTypes.STRING, allowNull: false },
        state: { type: DataTypes.STRING, allowNull: false },
        postalCode: { type: DataTypes.STRING, allowNull: false, validate: { is: /^[0-9]{6}?$/ } },
        country: { type: DataTypes.STRING, allowNull: false },
        userId: { type: DataTypes.INTEGER }
    });

    return Address;
};
