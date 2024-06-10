module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        firstName: { type: DataTypes.STRING, allowNull: false },
        lastName: { type: DataTypes.STRING, allowNull: false },
        email: { type: DataTypes.STRING, allowNull: false, unique: true, validate: { isEmail: true } },
        phoneNumber: { type: DataTypes.STRING, allowNull: false, validate: { is: /^\d{10,15}$/ } },
        dob: { type: DataTypes.DATE, allowNull: false, validate: { isDate: true, is18orOlder(value) { const ageDiffMs = Date.now() - new Date(value).getTime(); const ageDate = new Date(ageDiffMs); const age = Math.abs(ageDate.getUTCFullYear() - 1970); if (age < 18) { throw new Error("User must be at least 18 years old."); } } } },
        gender: { type: DataTypes.ENUM('Male', 'Female', 'Other'), allowNull: false },
        authId: { type: DataTypes.INTEGER }
    });

    return User;
};
