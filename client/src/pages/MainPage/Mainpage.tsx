import React, { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, CircularProgress, IconButton } from "@mui/material";
import SelectServer from "./components/SelectServer";
import InputBox from "./components/InputBox";
import SearchIcon from "@mui/icons-material/Search";
import styles from "./styles/Mainpage.module.css";

const Mainpage = () => {
  const navigate = useNavigate();
  const [worldName, setSelectedServer] = useState("스카니아");
  const [guildName, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleButtonClick = async (e: FormEvent) => {
    e.preventDefault();

    try {
      // 로딩 시작
      setIsLoading(true);

      // 서버에 데이터를 전송하는 fetch 사용
      await fetch(
        `/GuildPage/${encodeURIComponent(worldName)}/${encodeURIComponent(
          guildName
        )}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // 필요에 따라 적절한 Content-Type 설정
          },
          // body에 필요한 데이터를 JSON 형태로 전달
          body: JSON.stringify({
            worldName: encodeURIComponent(worldName),
            guildName: encodeURIComponent(guildName),
          }),
        }
      );

      // 로딩 종료
      setIsLoading(false);

      // 성공적으로 요청이 완료되면 페이지 이동
      navigate(
        `/GuildPage/${encodeURIComponent(worldName)}/${encodeURIComponent(
          guildName
        )}`
      );
    } catch (error) {
      // 에러 처리
      console.error("Error submitting data:", error);

      // 에러가 발생한 경우에도 로딩 종료
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div>
        <form
          onSubmit={handleButtonClick}
          style={{ width: "100%", marginTop: "15vh" }}
        >
          <Grid
            container
            spacing={0}
            alignItems="center"
            justifyContent="center"
          >
            <Grid item>
              <SelectServer value={worldName} onChange={setSelectedServer} />
            </Grid>
            <Grid item>
              <InputBox value={guildName} onChange={setInputValue} />
            </Grid>
            <Grid item>
              <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
                <SearchIcon />
              </IconButton>
            </Grid>
          </Grid>
          <div className={styles.caution}>⚠️매일 API 갱신 후 첫 접속은 오래 걸릴 수 있습니다.</div>
          {isLoading && (
            <div style={{ marginTop: 20, display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
              <CircularProgress />
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Mainpage;
