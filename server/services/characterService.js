const Guild = require('../models/Guild.js');
const Character = require('../models/Character.js');
const WorldService = require('./worldService.js');
const GuildService = require('./guildService.js');
const APIService = require('./apiService.js');

async function getCharacter(characterName) {
    return await Character.findOne({ where: { name: characterName } });
}

async function getCharacterByOcid(ocid) {
    const character = await Character.findOne({ where: { ocid: ocid } });

    return character;
}

async function getCharactersByGuild(guildName, worldName) {
    // const worldId = await WorldService.getWorldId(worldName);
    const guildId = await GuildService.getGuildId(guildName, worldName);
    const characters = await Character.findAll({
        where: { guild_id: guildId },
        order: [['name', 'ASC']]
    });
    return characters;
}

async function createCharacter(guildName, worldName, characterName) {
    const worldId = await WorldService.getWorldId(worldName);
    const guildId = await GuildService.getGuildId(guildName, worldName);
    try {
        let apiData = await APIService.getCharacterOcid(characterName);
        apiData = {
            ...apiData,
            ... await APIService.getCharacterBasicData(apiData.ocid),
            ... await APIService.getMainCharacterName(worldName, apiData.ocid)
        };

        const apiDate = new Date(apiData.date);
        apiDate.setHours(apiDate.getHours() + 9);

        const character = {
            world_id: worldId,
            guild_id: guildId,
            name: characterName,
            ocid: apiData.ocid,
            class: apiData.character_class,
            level: apiData.character_level,
            main_character_name: apiData.ranking[0].character_name,
            image: apiData.character_image,
            last_updated: apiDate,
        };

        const createdCharacter = await Character.create(character);
        console.log(characterName, "캐릭터 정보 추가 성공");

        return createdCharacter;
    } catch (error) {
        console.error('에러 발생:', error);

        // 에러가 발생하면 특정 필드만 null로 설정하여 저장
        const nullCharacterData = {
            world_id: worldId,
            guild_id: guildId,
            name: characterName,
            ocid: null,
            class: null,
            level: null,
            image: null,
            last_updated: null,
        };

        await Character.create(nullCharacterData);
        console.log("에러 발생으로 캐릭터 정보 일부만 추가");
    }
}

async function updateCharacter(characterName) {
    try {
        const character = await getCharacter(characterName);
        console.log("character: ", character);
        let apiData = await APIService.getCharacterBasicData(character.ocid)
        apiData = {
            ...apiData,
            ... await APIService.getMainCharacterName(apiData.world_name, character.ocid)
        };
        console.log(apiData);
        // 업데이트 시점에는 길드를 옮기거나 월드 리프 했을 가능성이 있음!
        const worldId = await WorldService.getWorldId(apiData.world_name);
        const guildId = await GuildService.getGuildId(apiData.character_guild_name, apiData.world_name);

        const apiDate = new Date(apiData.date);
        apiDate.setHours(apiDate.getHours() + 9);

        const updatedCharacter = {
            world_id: worldId,
            guild_id: guildId,
            name: characterName,
            class: apiData.character_class,
            level: apiData.character_level,
            main_character_name: apiData.ranking[0].character_name,
            image: apiData.character_image,
            last_updated: apiDate,
        };
        console.log(characterName, "캐릭터 정보 업데이트 성공");
        return await Character.update(updatedCharacter, { where: { ocid: character.ocid } });
        
    } catch (error) {
        console.error('에러 발생:', error);
        console.log("에러 발생으로 캐릭터 정보 업데이트 실패");
    }
}

async function removeGuildCharacter(characterName) {
    try {
        const character = await getCharacter(characterName);
        const nullGuild = { guild_id: null };
        await Character.update(nullGuild, { where: { ocid: character.ocid }});
        console.log("탈퇴자 길드 null 설정 성공")
    } catch (error) {
        console.error('에러 발생:', error);
        console.log("에러 발생으로 탈퇴자 길드 null 설정 실패");
    }
} 

module.exports = {
    getCharacter,
    getCharacterByOcid,
    getCharactersByGuild,
    createCharacter,
    updateCharacter,
    removeGuildCharacter,
}