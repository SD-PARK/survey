## Description

설문

<p align="center">
  <img src ="https://img.shields.io/badge/TYPESCRIPT-3178C6.svg?&style=for-the-badge&logo=TypeScript&logoColor=white"/>
  <img src ="https://img.shields.io/badge/NESTJS-E0234E.svg?&style=for-the-badge&logo=NestJS&logoColor=white"/>
  <img src ="https://img.shields.io/badge/GRAPHQL-E10098.svg?&style=for-the-badge&logo=GraphQL&logoColor=white"/>
  <img src ="https://img.shields.io/badge/POSTGRESQL-4169E1.svg?&style=for-the-badge&logo=PostgreSQL&logoColor=white"/>
</p>

## Installation

```bash
$ npm install
```

## Settings

해당 프로젝트는 PostgreSQL을 사용합니다.

서버 실행을 위해서는 .env 파일을 생성해 DB 정보를 작성해야 합니다.

1. 프로젝트 루트 디렉토리에 `.env` 파일을 생성합니다.

2. `.env` 파일을 편집기로 열어 다음과 같이 작성합니다.
```
DB_HOST=[DB-HOST]
DB_PORT=[DB-PORT]
DB_USERNAME=[DB-USERNAME]
DB_PASSWORD=[DB-PASSWORD]
DB_NAME=[DB-NAME]
```

3. `.env` 파일을 저장합니다.

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```

`localhost:4000/graphql`에 접속해 API를 테스트할 수 있습니다.

## Test

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```

## ERD

![DB](https://github.com/SD-PARK/survey/assets/97375357/a2eb119c-5999-495c-9ad8-e6c15372f351)

## API

***"작성지 CRUD를 통해 설문지 완료, 완료된 설문지 확인, 설문지 총점 확인 등의 기능을 확인할 수 있습니다."***

### 설문지 CRUD
**CREATE**

```graphql
mutation {
  createSurvey(surveyInput: {
    title: "호그와트 기숙사 테스트"
    description: "본 온라인 호그와트 기숙사 배정 모자 테스트는 그리핀도르, 래번클로, 후플푸프, 슬리데린의 네 가지 호그와트 기숙사에 해당되는 점수를 매깁니다."
  }) {
    id
    title
    description
  }
}
```

**READ**

```graphql
query {
  getSurvey(id: 1) {
    id
    title
    description
  }
}
```

```graphql
query {
  getSurveys {
    id
    title
    description
  }
}
```

**UPDATE**

```graphql
mutation {
  updateSurvey(id: 1, surveyInput: {
    title: "호그와트 기숙사 배정 테스트"
    description: "테스트를 통해 그리핀도르, 래번클로, 후플푸프, 슬리데린의 네 가지 호그와트 기숙사 중 어울리는 기숙사를 찾습니다."
}) {
    id
    title
    description
  }
}
```

**DELETE**

```graphql
mutation {
  deleteSurvey(id: 1)
}
```

### 문항 CRUD
**CREATE**

```graphql
mutation {
  createQuestion(questionInput: {
    surveyId: 1
    content: "왼쪽인가? 오른쪽인가?"
  }) {
    id
    surveyId
    content
  }
}
```

**READ**

```graphql
query {
  getQuestion(id: 1) {
    id
    surveyId
    content
  }
}
```

```graphql
query {
  getQuestions {
    id
    surveyId
    content
  }
}
```

**UPDATE**

```graphql
mutation {
  updateQuestion(id: 1, questionInput: {
    surveyId: 2
    content: "머리인가? 꼬리인가?"
}) {
    id
    surveyId
    content
  }
}
```

**DELETE**

```graphql
mutation {
  deleteQuestion(id: 1)
}
```

### 선택지 CRUD
**CREATE**

```graphql
mutation {
  createChoice(choiceInput: {
    questionId: 1
    content: "왼쪽"
    score: 1
  }) {
    id
    questionId
    content
    score
  }
}
```

**READ**

```graphql
query {
  getChoice(id: 1) {
    id
    questionId
    content
    score
  }
}
```

```graphql
query {
  getChoices {
    id
    questionId
    content
    score
  }
}
```

**UPDATE**

```graphql
mutation {
  updateChoice(id: 1, choiceInput: {
    questionId: 2
    content: "머리"
    score: 2
}) {
    id
    questionId
    content
    score
  }
}
```

**DELETE**

```graphql
mutation {
  deleteChoice(id: 1)
}
```

### 답변 CRUD
**CREATE**

```graphql
mutation {
  createAnswer(answerInput: {
    surveyResponseId: 1
    choiceId: 1
  }) {
    id
    surveyResponseId
    choiceId
  }
}
```

**READ**

```graphql
query {
  getAnswer(id: 1) {
    id
    surveyResponseId
    choiceId
  }
}
```

```graphql
query {
  getAnswers {
    id
    surveyResponseId
    choiceId
  }
}
```

**UPDATE**

```graphql
mutation {
  updateAnswer(id: 1, answerInput: {
    surveyResponseId: 2
    choiceId: 2
}) {
    id
    surveyResponseId
    choiceId
  }
}
```

**DELETE**

```graphql
mutation {
  deleteAnswer(id: 1)
}
```

### 작성지 CRUD
**CREATE**

```graphql
mutation {
  createSurveyResponse(surveyResponseInput: {
    surveyId: 1
    userId: 1
  }) {
    id
    surveyId
    userId
    completionDate
    score
  }
}
```

**READ**

```graphql
query {
  getSurveyResponse(id: 1) {
    id
    surveyId
    userId
    completionDate
    score
  }
}
```

```graphql
query {
  getSurveyResponses {
    id
    surveyId
    userId
    completionDate
    score
  }
}
```

```graphql
query {
  getCompletedSurveys {
    id
    surveyId
    userId
    completionDate
    score
  }
}
```

**UPDATE**

```graphql
mutation {
  updateSurveyResponse(id: 1, surveyResponseInput: {
    surveyId: 2
    userId: 2
}) {
    id
    surveyId
    userId
    completionDate
    score
  }
}
```

```graphql
mutation {
  completeSurvey(id: 1) {
    id
    surveyId
    userId
    completionDate
    score
  }
}
```

**DELETE**

```graphql
mutation {
  deleteSurveyResponse(id: 1)
}
```
