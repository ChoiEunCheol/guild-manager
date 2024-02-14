
const { DataTypes } = require('sequelize');
const sequelize = require('../db.js');
const Guild = require('./Guild.js');

const Characters = sequelize.define('Characters', {
  id: {         // index
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  guild_id: {       // 길드 번호 (guilds 테이블의 id를 외래키로 사용)
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Guild,
      key: 'id',
    },
  },
  name: {           // 캐릭터명  
    type: DataTypes.STRING(12),
    allowNull: true,
  },
  ocid: {           // nexon api 사용을 위한 ocid 
    type: DataTypes.STRING,
    allowNull: true,
    unique: true
  },
  class: {          // 직업
    type: DataTypes.STRING(18),
    allowNull: true,
  },
  level: {          // 캐릭터 레벨
    type: DataTypes.SMALLINT.UNSIGNED,
    allowNull: true,
  },
  image: {          // 캐릭터 외형 이미지
    type: DataTypes.STRING(511),
    allowNull: true,
  },
  last_updated: {   // 최근 갱신일
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  tableName: 'characters',
  timestamps: false, // 만약 테이블에 createdAt 및 updatedAt 컬럼을 추가하고 싶지 않다면 false로 설정
  collate: 'utf8mb4_unicode_ci',
  engine: 'InnoDB',
});

module.exports = Characters;
