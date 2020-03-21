module.exports = (database, DataTypes) => {

    return database.define('guilds', {
        guild_id: {
            field: 'guild_id',
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        settings: {
            field: 'settings',
            type: DataTypes.JSON,
            allowNull: false
        }
    });

};