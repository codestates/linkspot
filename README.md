## 1. Intro

![123.png](https://codestates.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F4f306f6f-a84f-4798-968d-06fadfe372a7%2F123.png?table=block&id=c2ed13d0-81e4-4f42-937b-53f4dba3506d&spaceId=82d63a72-8254-4cde-bf1e-b2597b7c099c&width=670&userId=&cache=v2)

- **팀 명 :** 토레타
- **프로젝트 명 :** LinkSpot
- **프로젝트 형태 : 수강생 프로젝트**
- **팀원 :** 황호준(팀장), 전원재, 최동현, 한성민
- **배포 링크 :** [https://www.linkspot.shop](https://www.linkspot.shop)

## 2. Project

## 1. 소개

관심사를 서로 공유하는 서버를 만들고 정보를 공유하세요.

서로 대화가 필요하다면 비디오채팅으로 서로 만나 의견을 공유하세요.

## 2. 사용 스택 및 스택 아키텍쳐

### Back-end

- Node.js ([https://nodejs.org/ko/](https://nodejs.org/ko/))
- Express ([https://expressjs.com/ko/](https://expressjs.com/ko/))
- JSON Web Tokens, JWT ([https://jwt.io/](https://jwt.io/))
- Mailgun ([https://www.mailgun.com/](https://www.mailgun.com/))
- MongoDB ([https://www.mongodb.com/](https://www.mongodb.com/))
- Mongoose ([https://mongoosejs.com/](https://mongoosejs.com/))

![back-end.png](https://codestates.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F01638e82-2cdd-4407-8ea4-a02f58cb44c2%2Fback-end.png?table=block&id=a7f47956-08e9-4526-bec6-e90428d719d0&spaceId=82d63a72-8254-4cde-bf1e-b2597b7c099c&width=860&userId=&cache=v2)

## Front-End

![font-end.png](https://codestates.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fa4014ab1-ac2f-496a-939d-eef634e76c20%2Ffont-end.png?table=block&id=178203e5-24e9-48b6-a85e-9f0afe08fa14&spaceId=82d63a72-8254-4cde-bf1e-b2597b7c099c&width=960&userId=&cache=v2)

## Depoly

- Apache2
- Jenkins
- MongoDB Atlas

## 완성된 기능 시연

- 회원가입, 로그인, 이메일인증, 로그아웃, 회원 탈퇴
    
    ![user.gif](https://codestates.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F651cc954-cd52-4767-b3b2-45d80dd65fe1%2Fuser.gif?table=block&id=1f103b8b-0e98-444d-bd13-60c4184764dc&spaceId=82d63a72-8254-4cde-bf1e-b2597b7c099c&userId=&cache=v2)
    
- 이메일 수정
    
    ![test02.gif](https://codestates.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fcb1397b5-d116-4a05-a52b-3df10683d5e3%2Ftest02.gif?table=block&id=e2453cfb-23a0-4a52-a1d2-4072f4446f8e&spaceId=82d63a72-8254-4cde-bf1e-b2597b7c099c&userId=&cache=v2)
    
- 서버 생성 및 채널에 메시지 전달
    
    ![test03.gif](https://codestates.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fe6e2e758-fc30-4e9f-be9b-6a159a8c9fd8%2Ftest03.gif?table=block&id=d9f97bbd-c98c-4b65-833b-ff7876433df4&spaceId=82d63a72-8254-4cde-bf1e-b2597b7c099c&userId=&cache=v2)
    
## 3. Members

### 팀장 : 황호준

- Role : Team Leader
- Position : Back-end
- Stack : Node.js, Express, JWT, MongoDB, Mongoose, Socket.io
- Works :
    - DB Schema 작성
    - Model 작성
    - DB 컨트롤러 작성
    - Services 컨트롤러 작성
    - Services 컨트롤러 에러 핸들링
    - API 문서 작성 및 기능 테스트
    - 배포 시스템 구축


### 팀원 : 한성민

- Role : Team member
- Position : Back-end
- Stack : Node.js, Express, JWT, MongoDB, Mongoose, Mailgun
- Works :
    - Class 를 이용한 메인 서버 파일 및 폴더 구조 작성
    - 파일 내에서 DB 함수 분리
    - 유저 컨트롤러 작성
    - 이메일 인증 기능 작성
    - 전체 에러 핸들링 (class)
    - 재사용성을 위한 코드 리펙터링
    -

### 팀원 : 전원재

- Role : Team member
- Position : Front-end
- Stack : React, axios, react-router-dom
- Works :
    1. 로그인 / 회원가입 구현
    2. 프로필 창, 수정 기능구현
    3. 채팅 기능 구현(axios를 통해 구현)

### 팀원 : 최동현

- Role : Team member
- Position : Front-end
- Stack : React, axios, react-router-dom
- Works :
    1. Restrict Router를 이용한 권한별 페이지 접근 통제 기능
    2. 서버 추가 / 삭제 기능
    3. 친구 추가/삭제/추가/블락 기능
