레디미x큐시즘 기업 프로젝트 [백엔드]
========

---

### 🖊 사용 프레임 워크
+ node.js
+ mongo DB

---

### 📑 APIs
* API 명세 : https://standing1011.notion.site/API-b0cd2b95928f4386865100617fc65398

---

### 🖊 구현 기능

__auth__
  * 소셜로그인, 회원가입, 로그아웃
  
**board** 
  * 게시판 글 작성, 이미지 업로드, 수정, 삭제
  * 전체조회, 세부조회, 카테고리 별 조회
  * 게시글 검색, 카테고리 별 필터링
  
**comment**
  * 댓글 작성, 삭제, 대댓글 작성, 삭제
  
**user**
  * 사용자 정보 조회
  * 내가 쓴 글, 내가 댓글 단 글 조회
  
---

### 🖊 코드 실행
```
npm i
npm start
```
.env 파일 별도 입력 필요

---

### 📂 Foldering
The directory structure of your new project looks like this:
<pre>
<code>

src
├── config
│   ├── config.ts
│   ├── passport.ts
│   └── s3.ts
├── controllers
│   ├── auth.ts
│   ├── board.ts
│   ├── comment.ts
│   └── user.ts
├── index.ts
├── interfaces
│   ├── board.ts
│   ├── comment.ts
│   ├── counter.ts
│   └── user.ts
├── models
│   ├── board.ts
│   ├── comment.ts
│   ├── counter.ts
│   └── user.ts
├── routes
│   ├── auth.ts
│   ├── board.ts
│   ├── comment.ts
│   └── user.ts
└── util.js

</code>
</pre>

---

### 🖊 dependencies module

<pre>
<code>

"dependencies": {
"@types/multer": "^1.4.7",
"@types/multer-s3": "^2.7.11",
"aws-sdk": "^2.1089.0",
"connect-mongo": "^4.6.0",
"cookie-parser": "^1.4.6",
"cors": "^2.8.5",
"dotenv": "^16.0.0",
"express": "^4.17.3",
"express-session": "^1.17.2",
"google-auth-library": "^7.14.0",
"mongoose": "^6.2.4",
"multer": "^1.4.4",
"multer-s3": "^2.10.0",
"passport": "^0.5.2",
"passport-google-oauth2": "^0.2.0",
"ts-node": "^10.7.0",
"@types/cors": "^2.8.12",
"@types/express": "^4.17.13",
"@types/express-session": "^1.17.4",
"@types/node": "^17.0.21",
"@types/passport": "^1.0.7",
"@types/passport-google-oauth2": "^0.1.4",
"nodemon": "^2.0.15",
"typescript": "^4.6.2"
}

</code>
</pre>
