import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
// import Button from '../../components/Button';
import { Button, Container, Grid, Typography, Card, CardMedia, CardContent, Paper } from '@mui/material';

interface GuildData {
  id: number;
  master_name: string;
  member_count: number;
  level: number;
  noblesse_skill_level: number;
  guild_mark_custom: string;
}

interface CharacterData {
  id: number;
  guild_id: number;
  name: string;
  class: string;
  level: number;
  image: string;
}

const Guildpage: React.FC = () => {
  const { worldName, guildName } = useParams();
  const [guildData, setGuildData] = useState<GuildData | null>(null);
  const [characterData, setCharacterData] = useState<CharacterData[] | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGuildData = async () => {
      try {
        const response = await fetch(`/Guild/${worldName}/${guildName}`);

        if (response.ok) {
          const data = await response.json();
          console.log('서버로부터 받은 데이터:', data);
          setGuildData(data);
        } else {
          console.error('서버에서 에러 응답 받음:', response.status);
        }
      } catch (error) {
        console.error('데이터 가져오기 중 오류 발생:', error);
      }
    };

    const fetchGuildMembers = async () => {
      try {
        const response = await fetch(`/GuildMembers/${worldName}/${guildName}`);

        if (response.ok) {
          const data = await response.json();
          console.log('서버로부터 받은 데이터:', data);
          setCharacterData(data);
        } else {
          console.error('서버에서 에러 응답 받음:', response.status);
        }
      } catch (error) {
        console.error('데이터 가져오기 중 오류 발생:', error);
      }
    };

    fetchGuildData();
    fetchGuildMembers();
  }, [worldName, guildName]);

  const AdminButtonClick = () => {
    navigate(`/Adminpage`);
  };

  const handleMemberClick = (character: CharacterData) => {
    navigate(`/Graphpage/${character.name}`);
  };

  return (
    <>
      {guildData && (
        <div>
          <Grid container spacing={0} alignItems="center">
            <Grid item>
              <img src={`data:image/png;base64,${guildData.guild_mark_custom}`} width="34" height="34" alt="Guild Mark" />
            </Grid>
            <Grid item style={{ marginLeft: 5 }}>
              <Typography variant="h4" style={{ fontWeight: 'bold', textAlign: 'center' }}>{guildName}</Typography>
            </Grid>
            <Grid item style={{ marginLeft: 10 }}>
            <Typography variant="body1" style={{ fontSize: '14px' }}>{worldName}</Typography>
            </Grid>
            <Button variant="outlined" style={{ marginLeft: '20px' }} onClick={AdminButtonClick}>노블제한</Button>
            <Grid item xs={12} md={12}>
              <Typography variant="body1">마스터: {guildData.master_name}</Typography>
              <Typography variant="body1">길드원: {guildData.member_count}명</Typography>
              <Typography variant="body1">노블: {guildData.noblesse_skill_level}</Typography>
            </Grid>
          </Grid>
        </div>
      )}

      {characterData && characterData.length > 0 && (
        <Grid container spacing={4} justifyContent="center">
          {characterData.map((character, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={3} xl={2}>
              <Card 
              variant="outlined"
              // style={{ borderColor: 'your_color_code_or_name' }} 
              onClick={() => handleMemberClick(character)}
              >
                <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <img
                    src={character.image}
                    alt="Character Image"
                    style={{ width: 'auto', height: '100%' }}
                  />
                  <Typography variant="subtitle1" style={{ fontSize: '14px' }}>{character.name}</Typography>
                  <Typography variant="body2">Lv.{character.level}</Typography>
                  <Typography variant="body2">{character.class}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

    </>
  );
};

export default Guildpage;
