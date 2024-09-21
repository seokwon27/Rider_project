# Riders
![Riders_Logo](https://github.com/user-attachments/assets/57338532-295a-4f82-8703-6f93d5afbfdf)
우리들의 자전거 여행을 공유해보세요!
각자의 자전거 여행 경로를 피드로 남겨 공유하고, 사용자들과 공유할 수 있습니다.

<br/>

## 🔥배포 링크

[Riders - 내일배움캠프 6기 4조](https://naver.com)

<br/>

## 📦폴더 구조

<details>
<summary>폴더구조</summary>
 </details>

<br/>

## 💻 개발 환경

![](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white)
![](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)
![](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)
![](https://img.shields.io/badge/TanstackQuery-FF4154?style=for-the-badge&logo=reactquery&logoColor=white)
![](https://img.shields.io/badge/Zustand-181818?style=for-the-badge)
![](https://img.shields.io/badge/JsonServer-181818?style=for-the-badge)

<br/>

## 🔧 주요기능

### 회원가입 페이지 / 로그인 페이지
![회원가입](https://github.com/user-attachments/assets/3f26a045-c21c-41ab-ace5-76d4b79f58ef)
- 아이디, 비밀번호, 닉네임을 입력하여 회원가입 할 수 있습니다.

![로그인](https://github.com/user-attachments/assets/9e9e83e9-8147-4050-9ae3-6149992cd5b5)
- 아이디, 비밀번호를 입력하여 로그인 할 수 있습니다.

<br/>

### 랜딩 페이지
![랜딩페이지](https://github.com/user-attachments/assets/4f3f54f3-6c89-49d7-b9c9-8fde2c96578c)
- 사이트 소개글을 확인할 수 있습니다.

<br/>

### 홈 페이지
![메인페이지_종주로검색및선택_피드작성](https://github.com/user-attachments/assets/38e630b1-b692-4386-b521-35b195a1b193)
- 4대강 관련 종주길을 확인할 수 있으며, 검색을 통해 원하는 종주길을 찾을 수 있습니다.
- 종주로를 선택하면 해당 경로를 보여주고, 출발지 및 도착지, 총 길이를 알 수 있습니다.
- 원하는 종주로가 맞다면 종주로 등록을 통해 피드에 등록할 수 있습니다.

![메인페이지_공공시설마커](https://github.com/user-attachments/assets/901def0b-b1ed-49e2-9e6f-b5ef7e496055)
- 해당 종주로 관련 공공시설을 좌측 탭에서 분류된 상태로 확인할 수 있으며, 각 공공시설은 페이지네이션을 통해 5개씩 확인할 수 있습니다
- 해당 페이지의 해당 공공시설을 지도의 마커로 확인할 수 있습니다.

<br/>

### 모아보기(피드) 페이지
![피드페이지_무한스크롤](https://github.com/user-attachments/assets/eca7cab2-12dc-4b64-b557-3aca0a922017)
- 공개설정된 게시물 전체를 무한스크롤을 통해 확인할 수 있습니다.

![피드페이지_좋아요_지도모달](https://github.com/user-attachments/assets/6783d118-fde0-4d55-a6e9-6308faa6d5ef)
- 좋아요 버튼을 눌러 해당 피드에 좋아요를 추가할 수 있습니다.
- 지도를 클릭하여 자세한 지도정보를 확인할 수 있습니다.

<br/>

### 마이 페이지
![마이페이지_무한스크롤](https://github.com/user-attachments/assets/f04f0cc4-f7cc-45c8-b78b-88ffa43f7b2b)
- 무한스크롤로 내가 만든 종주 피드 목록을 확인할 수 있습니다.

![마이페이지_공개전환_삭제_닉네임변경](https://github.com/user-attachments/assets/8e2f2fa9-3e9f-4e0a-ba03-2a51556ca4af)
- 내가 만든 피드의 공개를 설정하고 삭제할 수 있으며, 닉네임을 변경할 수 있습니다.

<br/>

## 🏹 트러블 슈팅

### 1. 개발당사자에 따라 무한스크롤이 작동하지 않는 문제

![트러블슈팅1_1](https://github.com/user-attachments/assets/814b88c6-18e9-4e12-8563-96ee56482d6c)
![트러블슈팅1_2](https://github.com/user-attachments/assets/af1ef95d-7bab-4688-b58f-516c0231ce9c)
```
 json-server의 버전 차이로 인해 useInfiniteQuery의 return값에 차이가 발생하여 page관리의 방법이 달라야 했습니다.
 무한스크롤 데이터 요청의 page관리 방법을 변경하여 정상 작동하도록 수정하였습니다.
```
![트러블슈팅1_3](https://github.com/user-attachments/assets/3d8fd192-782c-4014-b9f8-31d0d73329bd)

<br />

### 2. 지도 생성 함수를 한 페이지의 두 컴포넌트에서 호출 시 지도가 불러와지지 않는 문제

![트러블슈팅2_1](https://github.com/user-attachments/assets/8dfbac11-fc29-4602-a072-8208ece2b341)
```
함수 내부에서 getElementById로 id값을 사용하는데, 두 컴포넌트가 같은 id를 지니고 있어 앞쪽 요소만 지도가 담겼습니다.
id생성방식을 변경하여 다른 id값을 지니게 해 문제를 해결하였습니다.
```
<br />

### 3. 검색결과 내용에 대한 좌표가 정상적으로 불러와지지 않는 문제
```
 api응답 데이터를 바로 사용하여 promise객체가 사용되는 문제를 확인하여 promise.all을 통해 모든 값이 할당되는 변수를 새로 선언하여 해결하였습니다.
```
<br />

### 4. 좌표 데이터를 무한히 반복하여 요청하는 문제
```
 useEffect의 의존성 배열 내부 값이 문제인 것을 확인하여 의존성 배열을 해당 변수의 계산에 필요한 state로 변경하여 useEffect가 실행되는 조건은 유지하며, 반복 실행되지 않도록 해결했습니다.
```
<br />

## 🗣️ 프로젝트 소감

### 이석원(팀장)

```
 팀원 간 적극적이고 존중하는 소통으로 협업의 어려움이 대부분 상쇄되었다고 느껴지는 프로젝트였고, PR 내용에 대한 comment를 처음으로 활용해보며 코드에 대한 즉각적인 피드백을 볼 수 있던 유익한 기간이었습니다.
```

<br/>

### 김서연

```

```

<br/>

### 전상국

```
 프로젝트에 늦게 참여하여 SA를 참여하지 못했고 그에따라 프로젝트 파악이 어려웠는데, 팀원분들의 배려와 도움으로 빠르게 적응할 수 있었으며, 소통을 통해 여러 문제를 해결할 수 있어 좋았습니다.
```

<br/>

### 이태연

```
 프로젝트 기간에 연휴가 끼어있어 시간적 제약이 있었지만 팀원들과 함께 빠듯한 시간이었지만 원하는 목표는 달성한 거 같아 기분이 좋습니다!
```

<br/>

### 설하영

```
 지난 뉴스피드 과제에서는 어떤형태의 페이지를 만드는지 방향성이 있었다면, 이번 아웃소싱 과제에서는 api를 선택하여 어떤 페이지를 만들어야 하는지부터 기획을 했어야 해서 조금 막막했었습니다. 그치만 팀원분들과 이런저런 아이디어를 내면서 기획을 하고 막히는 부분이 있을때 마다 소통하면서 문제를 해결해나갈 수 있어서 힘들었지만 재미있었습니다.
```

<br/>

## 📗 프로젝트 피드백

- 피드백입니다.
