# 🐛 디버깅 가이드 - localhost:8000 접속 문제 해결

## 1. 서버 실행 확인

### 서버가 실행 중인지 확인
```bash
# 포트 8000이 사용 중인지 확인
lsof -i :8000

# 또는
netstat -an | grep 8000
```

### 서버 실행 방법

#### 방법 1: Python HTTP 서버 (권장)
```bash
cd "/Users/haku/Desktop/가계부 프로젝트/Smart-app-ready--main"
python3 -m http.server 8000
```

서버가 실행되면 다음과 같은 메시지가 표시됩니다:
```
Serving HTTP on 0.0.0.0 port 8000 (http://0.0.0.0:8000/) ...
```

#### 방법 2: Node.js http-server
```bash
npx http-server -p 8000
```

#### 방법 3: PHP 내장 서버
```bash
php -S localhost:8000
```

## 2. 브라우저 접속 확인

서버 실행 후 브라우저에서 다음 주소로 접속:
- `http://localhost:8000`
- `http://127.0.0.1:8000`

## 3. 일반적인 문제 해결

### 문제 1: "연결할 수 없음" 또는 "ERR_CONNECTION_REFUSED"
**원인**: 서버가 실행되지 않음
**해결**:
1. 터미널에서 서버가 실행 중인지 확인
2. 서버를 실행하세요 (위의 "서버 실행 방법" 참조)

### 문제 2: "포트가 이미 사용 중"
**원인**: 다른 프로세스가 포트 8000을 사용 중
**해결**:
```bash
# 포트를 사용하는 프로세스 찾기
lsof -i :8000

# 프로세스 종료 (PID는 위 명령어 결과에서 확인)
kill -9 [PID]

# 또는 다른 포트 사용
python3 -m http.server 8001
```

### 문제 3: "파일을 찾을 수 없음" (404 에러)
**원인**: 잘못된 경로 또는 서버가 잘못된 디렉토리에서 실행됨
**해결**:
1. 서버를 프로젝트 루트 디렉토리에서 실행했는지 확인
2. `index.html` 파일이 있는 디렉토리에서 서버 실행

### 문제 4: CSS/JS 파일이 로드되지 않음
**원인**: 상대 경로 문제 또는 CORS 정책
**해결**:
1. 브라우저 개발자 도구(F12) → Network 탭에서 실패한 요청 확인
2. 서버를 올바른 디렉토리에서 실행했는지 확인
3. 파일 경로가 올바른지 확인

## 4. 브라우저 개발자 도구 활용

### Chrome/Edge 개발자 도구 열기
- `F12` 또는 `Cmd + Option + I` (Mac)
- `Ctrl + Shift + I` (Windows/Linux)

### 확인할 항목

#### Console 탭
- JavaScript 오류 확인
- `console.log()` 출력 확인

#### Network 탭
- 요청이 실패하는지 확인
- HTTP 상태 코드 확인 (200 = 성공, 404 = 파일 없음, 500 = 서버 오류)
- 요청 URL이 올바른지 확인

#### Elements 탭
- HTML 구조 확인
- CSS가 적용되었는지 확인

## 5. 단계별 디버깅 체크리스트

- [ ] 서버가 실행 중인가? (`lsof -i :8000`로 확인)
- [ ] 올바른 디렉토리에서 서버를 실행했는가?
- [ ] 브라우저에서 `http://localhost:8000`로 접속했는가?
- [ ] 브라우저 개발자 도구에서 오류가 있는가?
- [ ] Network 탭에서 요청이 실패하는가?
- [ ] 파일 경로가 올바른가? (상대 경로 확인)

## 6. 빠른 테스트

### 서버 실행 및 확인
```bash
# 1. 프로젝트 디렉토리로 이동
cd "/Users/haku/Desktop/가계부 프로젝트/Smart-app-ready--main"

# 2. 서버 실행
python3 -m http.server 8000

# 3. 다른 터미널에서 서버가 실행 중인지 확인
curl http://localhost:8000
```

### 예상 결과
- 서버 실행 시: HTML 내용이 출력됨
- 서버 미실행 시: `curl: (7) Failed to connect to localhost port 8000: Connection refused`

## 7. 추가 팁

### 서버를 백그라운드로 실행
```bash
python3 -m http.server 8000 &
```

### 서버 로그 확인
서버를 실행한 터미널에서 요청 로그를 확인할 수 있습니다.

### 포트 변경
8000 포트가 사용 중이면 다른 포트 사용:
```bash
python3 -m http.server 8080
```
그리고 브라우저에서 `http://localhost:8080` 접속

---

**문제가 계속되면**: 브라우저 개발자 도구의 Console과 Network 탭 스크린샷을 확인하세요.

