# Assets 폴더 구조

이 폴더는 CSS와 JavaScript 파일들을 체계적으로 관리하기 위한 폴더입니다.

## 📁 폴더 구조

```
assets/
├── css/
│   ├── main.css                    # 모든 페이지 공통 스타일
│   └── account/
│       ├── account-card.css        # 요약 카드 스타일 (list, stats 공유)
│       ├── account-form.css        # 폼 스타일 (form, edit 공유)
│       ├── list.css               # list.html 전용
│       └── stats.css              # stats.html 전용
└── js/
    ├── main.js                     # 모든 페이지 공통 스크립트
    └── account/
        ├── account-form.js         # 폼 기능 (form, edit 공유)
        ├── list.js                # list.html 전용
        ├── form.js                # form.html 전용
        ├── edit.js                # edit.html 전용
        └── stats.js               # stats.html 전용
```

## 🎯 3계층 구조

### 1. 공통 파일 (모든 페이지)
- **main.css**: 기본 레이아웃, 메인 카드 스타일
- **main.js**: 유틸리티 함수 (숫자 포맷, 날짜 포맷 등)

### 2. 공유 파일 (일부 페이지)
- **account-card.css**: list.html, stats.html에서 사용하는 요약 카드
- **account-form.css**: form.html, edit.html에서 사용하는 폼 스타일
- **account-form.js**: form.html, edit.html에서 사용하는 폼 기능

### 3. 개별 파일 (각 페이지)
- **list.css / list.js**: 목록 페이지 전용
- **stats.css / stats.js**: 통계 페이지 전용 (Chart.js)
- **form.js**: 추가 페이지 전용 (초기화 로직)
- **edit.js**: 수정 페이지 전용 (초기화 로직)

## 📌 사용 방법

### HTML에서 로드하기

각 페이지는 필요한 파일들만 로드합니다:

#### list.html
```html
<link rel="stylesheet" href="../assets/css/main.css">
<link rel="stylesheet" href="../assets/css/account/account-card.css">
<link rel="stylesheet" href="../assets/css/account/list.css">

<script src="../assets/js/main.js"></script>
<script src="../assets/js/account/list.js"></script>
```

#### form.html
```html
<link rel="stylesheet" href="../assets/css/main.css">
<link rel="stylesheet" href="../assets/css/account/account-form.css">

<script src="../assets/js/main.js"></script>
<script src="../assets/js/account/account-form.js"></script>
<script src="../assets/js/account/form.js"></script>
```

#### edit.html
```html
<link rel="stylesheet" href="../assets/css/main.css">
<link rel="stylesheet" href="../assets/css/account/account-form.css">

<script src="../assets/js/main.js"></script>
<script src="../assets/js/account/account-form.js"></script>
<script src="../assets/js/account/edit.js"></script>
```

#### stats.html
```html
<link rel="stylesheet" href="../assets/css/main.css">
<link rel="stylesheet" href="../assets/css/account/account-card.css">
<link rel="stylesheet" href="../assets/css/account/stats.css">

<script src="../assets/js/main.js"></script>
<script src="../assets/js/account/stats.js"></script>
```

## 💡 장점

1. **유지보수성**: 공통 스타일/스크립트를 한 곳에서 관리
2. **재사용성**: 여러 페이지에서 공유하는 코드 중복 제거
3. **가독성**: HTML 파일이 간결해지고 핵심 구조에 집중 가능
4. **성능**: 필요한 파일만 로드하여 최적화
5. **확장성**: 새로운 페이지 추가 시 기존 파일 재사용 가능

## 🔧 수정 가이드

### 공통 스타일 수정
→ `css/main.css` 수정 (모든 페이지에 영향)

### 요약 카드 스타일 수정
→ `css/account/account-card.css` 수정 (list, stats에 영향)

### 폼 기능 수정
→ `js/account/account-form.js` 수정 (form, edit에 영향)

### 특정 페이지만 수정
→ 해당 페이지의 전용 파일 수정 (다른 페이지에 영향 없음)

## 📝 코드 컨벤션

- CSS: BEM 방식 권장
- JavaScript: ES6+ 문법 사용
- 주석: 각 파일 상단에 용도 명시
- 함수: 명확한 이름과 JSDoc 주석

