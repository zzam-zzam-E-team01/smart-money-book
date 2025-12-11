# 스마트 가계부 - 화면단 파일 (HTML/CSS/JS)

이 폴더는 JSP로 작성된 원본 파일들을 순수 HTML, CSS, JavaScript로 변환한 화면단 파일들을 포함하고 있습니다.

## 📁 폴더 구조

```
smart-money-book/
├── index.html              # 메인 시작 페이지 (mainStart.jsp에서 변환)
├── account/                # 가계부 관련 페이지
│   ├── list.html          # 가계부 목록 (accountList.jsp)
│   ├── form.html          # 내역 추가 (accountForm.jsp)
│   ├── edit.html          # 내역 수정 (accountEdit.jsp)
│   └── stats.html         # 통계 페이지 (accountStats.jsp)
├── board/                  # 게시판 관련 페이지
│   ├── list.html          # 게시판 목록 (boardList.jsp)
│   ├── form.html          # 게시글 작성 (boardForm.jsp)
│   ├── edit.html          # 게시글 수정 (boardEdit.jsp)
│   └── view.html          # 게시글 보기 (boardView.jsp)
└── README.md              # 이 파일
```

## 🔄 변환 내역

### 제거된 요소
- JSP 지시자 (`<%@ page ... %>`, `<%@ taglib ... %>`)
- JSTL 태그 (`<c:forEach>`, `<c:if>`, `<c:choose>` 등)
- EL 표현식 (`${...}`)
- 서버 사이드 스크립트릿 (`<% ... %>`)

### 대체된 요소
- 서버 데이터 → 샘플 데이터로 대체
- 동적 날짜/시간 → JavaScript로 구현
- 폼 제출 동작 → JavaScript 이벤트 핸들러로 구현

## 💡 사용된 기술

- **HTML5**: 구조적 마크업
- **CSS3**: 
  - Bootstrap 5.0 (반응형 디자인)
  - Bootstrap Icons
  - 커스텀 그라데이션 효과
- **JavaScript**: 
  - Vanilla JS (순수 자바스크립트)
  - Chart.js (통계 차트)

## 🎨 주요 기능

### 1. 메인 페이지 (index.html)
- 프로젝트 소개
- 기능 카드 표시
- 실시간 시계

### 2. 가계부 (account/)
- **list.html**: 수입/지출 내역 목록, 월별 요약 통계
- **form.html**: 새 내역 추가 양식
- **edit.html**: 기존 내역 수정 양식
- **stats.html**: Chart.js를 활용한 시각적 통계
  - 카테고리별 지출 도넛 차트
  - 월별 추이 막대 차트

### 3. 게시판 (board/)
- **list.html**: 게시글 목록 테이블
- **form.html**: 새 게시글 작성
- **edit.html**: 게시글 수정
- **view.html**: 게시글 상세 보기

## 🚀 사용 방법

### 로컬에서 실행
1. 파일을 웹 브라우저로 직접 열기
   ```
   index.html 파일을 더블클릭하거나 브라우저로 드래그
   ```

2. 로컬 웹 서버 사용 (권장)
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Node.js (http-server)
   npx http-server
   
   # PHP
   php -S localhost:8000
   ```
   
   브라우저에서 `http://localhost:8000` 접속

## ⚠️ 주의사항

### 현재 상태
- **정적 파일**: 서버와의 통신 없이 동작
- **샘플 데이터**: 하드코딩된 샘플 데이터 사용
- **폼 제출**: 콘솔 로그와 alert()로 처리

### 실제 서버 연동 시 필요한 작업
1. **API 엔드포인트 구현**
   - `GET /account` - 가계부 목록 조회
   - `POST /account/write` - 내역 추가
   - `PUT /account/edit` - 내역 수정
   - `DELETE /account/delete/:id` - 내역 삭제
   - 게시판 관련 API들

2. **JavaScript fetch() 구현**
   ```javascript
   // 예시
   fetch('/account', {
     method: 'GET',
     headers: { 'Content-Type': 'application/json' }
   })
   .then(res => res.json())
   .then(data => {
     // 데이터 렌더링
   });
   ```

3. **환경 변수 설정**
   - API Base URL
   - 인증 토큰 (필요시)

## 🔗 원본 파일 위치

원본 JSP 파일들은 다음 경로에 있습니다:
```
jwbook/jwbook/src/main/webapp/WEB-INF/views/
```

## 📝 개발자 정보

- **개발자**: 김민석
- **프로젝트**: Spring Boot 기반 가계부 프로젝트
- **변환일**: 2024년 12월

## 📄 라이선스

이 프로젝트는 학습 목적으로 작성되었습니다.

---

**참고**: 이 파일들은 화면 프레젠테이션 용도로, 백엔드 서버와 연동하려면 추가 개발이 필요합니다.

