# https://openapi.nexon.com/game/maplestory/?id=22

메이플 오픈 API는 여기 참고


## 개발 전달사항
`concurrently`라는 node.js 패키지를 설치해서 `guild-manager 경로에서 npm start`를 했을 때, 기본적으로 client와 server가 동시에 실행되도록 설정해 둠
   
리액트만 실행하고 싶을 경우 `npm run client`

노드 서버만 실행하고 싶을 경우 `npm run server`

# 작업중
관리자 페이지 들어갈 때 본인 길드만 보이게 만드는 중

# 해야 할 일!
1. GuildPage 에 검색, 정렬이 있어야 할 듯
<!-- 2. Adminpage : DB에서 길드 코드와 n주차 조회해서 데이터 불러오기 -->
<!-- 3. API 호출을 최소화 해야 할 것 같음 (길드 고유키와 길드 정보를 조회하고 있는데 2회 호출하는 것으로 찍힘) -->
<!-- 4. 회원가입 이름, 이메일 중복 시 무언가 출력되게 만들기 -->
5. record 테이블의 date는 timestamp가 아님!!!!!!!!!!!!!!!! 절대로 타입스탬프로 하면 안됨
6. 로그인하고 이전 페이지로 되돌아가게 만들기. 지금은 메인페이지로 감
7. 로그인 상태 유지 (쿠키를 사용할 것인지, 토큰 만료시간에 맞춰 삭제하는 로직)

# Hennie TODO

## 작업 편의성
    - 디렉토리 구조 정리

## 기능    
    - 길드 페이지에서 캐릭터 검색 기능
    - 서버측 api 조회 후 db 갱신 시 변경된 데이터가 있을 경우에만 갱신 하도록 수정 (성능 최적화)
    - 길드원 업데이트 로직에서 길드 변경한 길드원은 길드 번호 변경 되도록 수정
    - 길드명 미입력시 입력하라는 alret 뜨도록
    - 전체 월드 선택해서 길드명으로 조회 후 원하는 서버의 길드 선택 가능하도록 (ex. 츄츄지지의 길드 검색)
