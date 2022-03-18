레디미x큐시즘 기업 프로젝트 [백엔드]
========

### dependencies module
---
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

### APIs
---
* API 명세 : https://standing1011.notion.site/API-b0cd2b95928f4386865100617fc65398

### The resulting directory structure
---
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
