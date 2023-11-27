const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'mariadb',
    host: 'localhost',
    port: '3307',
    username: 'root',
    password: '0000',
    database: 'guild_manager',
});

const MainMember = sequelize.define('MainMember', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // 중복되지 않도록 설정
    },
}, {
    tableName: 'main_member', // 실제 테이블 이름
    freezeTableName: true, // 테이블 이름 고정
    timestamps: false, // createdAt 및 updatedAt 필드 생성 안 함
});

module.exports = MainMember;