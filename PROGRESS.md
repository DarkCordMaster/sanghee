# 상희 프로젝트 진행 상황

_최종 업데이트: 2026-08-21_

## 현재 한 것

### 프론트엔드 (`/`)
- Vite + React + TypeScript + Tailwind CSS v4 스캐폴딩
- ui_sample(`ui_sample/상희.dc.html`) 기반 5개 화면 컴포넌트 구현
  - 온보딩 (`OnboardingScreen`)
  - 채팅 (`ChatScreen`) — 설치 배너, 오프라인 배지 포함
  - 음성 모드 (`VoiceScreen`) — 듣는 중/생각 중/말하는 중 웨이브폼 애니메이션
  - 설정 (`SettingsScreen`) — 성격/애정도 슬라이더, 목소리 선택, 오프라인 미리보기 토글
  - 사이드바 (`SidebarDrawer`) — 대화 기록 목록(현재는 하드코딩)
- oklch 팔레트 + Unbounded/Manrope 폰트를 Tailwind `@theme` 토큰으로 등록, 다크 테마 고정
- `src/hooks/useChat.ts` + `src/api/chatApi.ts`로 채팅 상태·API 호출 로직 분리
  - 낙관적 업데이트(내 메시지 먼저 표시), 세션 ID 관리, 실패 시 폴백 메시지
- `vite.config.ts`에 `/api` → `localhost:8080` dev 프록시 설정

### 백엔드 (`/backend`)
- Spring Boot 4.0.8 + Java 17 + MyBatis + H2(파일 DB) 스캐폴딩 (Spring Initializr로 생성)
- `POST /api/chat/message` 실제 구현
  - `characters/sanghee.json`에 캐릭터 성격/말투(시스템 프롬프트) 분리
  - `chat_message` 테이블(H2)에 세션별 대화 저장, 최근 6턴만 불러와 프롬프트에 포함
  - 로컬 Ollama(`qwen3:8b`)에 `/api/chat`으로 요청, `think:false`로 응답 속도 70초대 → 8초대로 개선
  - CORS 설정(프록시 없이 직접 호출하는 경우 대비)

### DB: MySQL 전환 사전 준비
- `mysql-connector-j` 의존성 추가, `application-mysql.properties` 프로필 파일 작성
- `schema.sql` → `schema-h2.sql`로 분리하고 `schema-mysql.sql` 신규 작성(DB별 DDL 문법 차이 대응)
- 기본 실행은 여전히 H2 — MySQL 프로필은 아직 활성화 안 함 (설치된 MySQL 서버 없음)
- 실제 전환 시 필요한 절차는 `application-mysql.properties` 상단 주석에 정리해둠

### 검증
- 헤드리스 Chrome으로 프론트 5개 화면 렌더링·클릭 인터랙션 확인
- curl로 백엔드 → Ollama 실제 응답까지 end-to-end 확인 (DB 저장 포함)

### Git
- `https://github.com/DarkCordMaster/sanghee` `main` 브랜치에 7개 커밋 push 완료
  (세팅 → 컴포넌트 구조 → 스타일링 → 채팅 연동 → 백엔드 스캐폴딩 → 채팅 API 구현)

## 다음 할 것

우선순위 순으로 정리 (필요하면 순서 바꿔서 진행 가능):

1. **MySQL 설치 및 실전환** — 이 머신에 MySQL 서버 설치, `sanghee` DB 생성, `application-mysql.properties` 값 맞추고 `mysql` 프로필로 실제 기동 테스트
2. **대화 기록 실제 연동** — 사이드바 히스토리가 지금은 하드코딩. `GET /api/chat/sessions` 같은 조회 API를 추가하고 프론트에서 실제 DB 데이터를 불러오도록 연결
3. **설정 값 저장** — 성격/애정도/목소리 선택이 새로고침하면 날아감. 우선 localStorage로 저장하거나, 캐릭터별 사용자 설정을 백엔드에 영속화
4. **음성 모드 실제 구현** — 지금은 UI 상태(듣는 중/생각 중/말하는 중)만 있고 실제 STT/TTS 없음. 브라우저 Web Speech API로 우선 붙이거나, 서버 사이드 STT/TTS 검토
5. **에러/타임아웃 처리 보강** — Ollama가 꺼져 있거나 느릴 때의 UX(현재는 폴백 문구 하나뿐), 백엔드 요청 타임아웃 설정
6. **테스트 코드** — 백엔드 `ChatService`/`ChatController` 단위 테스트, 프론트 컴포넌트 테스트 아직 없음
7. **PWA 마무리** — "홈 화면에 추가" 배너가 지금은 UI만 있고 실제 manifest.json/서비스워커 없음
8. **배포 방식 결정** — 로컬 전용으로 둘지, 프로덕션 빌드(백엔드가 프론트 정적 파일 서빙 등)를 준비할지

## 알아두면 좋은 점

- MyBatis starter가 아직 Spring Boot 4.1.x와 호환되지 않아서 백엔드는 **4.0.8**로 고정해둠 — 나중에 Boot 버전 올릴 때 MyBatis 호환 여부 먼저 확인 필요
- qwen3는 기본적으로 "생각 모드"가 있는 하이브리드 추론 모델이라, 간단한 잡담에도 답하기 전에 오래 고민함 → `OllamaClient`에서 `think:false`로 꺼둔 상태. 더 똑똑한 답이 필요해지면 이 설정부터 의심할 것
- H2는 파일 모드(`./backend/data/`)라 서버를 껐다 켜도 대화 기록이 남음 — 로컬 1인 개발 기준으로 별도 DB 서버 설치 없이 돌아가게 한 선택이라, 여러 명이 같이 쓰게 되면 MySQL/PostgreSQL 등으로 교체 검토 필요
