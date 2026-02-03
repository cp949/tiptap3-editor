# 요구사항 및 로드맵

## 1. 프로젝트 개요

- **목표**: npm 배포 가능한 Tiptap 3.x 기반 React 에디터 라이브러리 개발
- **패키지명**: `@cp949/tiptap3-editor`
- **핵심 가치**: 사용자 친화적 UI, 엑셀 호환성, 직관적인 이미지 관리, 쉬운 통합 (Drop-in solution).
- **기술 스택**: React 19, TypeScript, Vite (Library Mode), TailwindCSS (Prefix `te-`, Preflight 없음).

## 2. 상세 요구사항

### 2.1 텍스트 포맷팅

- [x] 기본 스타일: 굵게(Bold), 기울임(Italic), 취소선(Strike), 밑줄(Underline).
- [x] 제목(Heading): H1, H2, H3.
- [x] 목록(List): 글머리 기호(Bullet List), 번호 매기기(Ordered List).
- [x] 정렬(Alignment): 왼쪽, 가운데, 오른쪽, 양쪽 정렬.
- [x] 링크, 색상, 하이라이트 지원.

### 2.2 테이블 (엑셀 호환)

- [x] N x M 테이블 생성.
- [x] **엑셀 붙여넣기**: 엑셀/구글 스프레드시트 클립보드 데이터를 HTML 테이블로 자동 파싱.
- [x] 테이블 조작: 행/열 추가 및 삭제, 셀 병합.
- [x] **테이블 버블 메뉴**: 테이블 조작을 위한 전용 팝업 메뉴.

### 2.3 미디어 및 확장기능

- [x] **이미지 처리**:
  - 로컬 파일 업로드 (드래그 앤 드롭, 붙여넣기).
  - **리사이저(Resizer)**: 이미지 클릭 시 선택, 핸들을 드래그하여 크기 조절.
- [ ] **유튜브 지원**:
  - URL을 통한 유튜브 영상 삽입.
  - **HTML 붙여넣기**: HTML 붙여넣기 시 유튜브 링크/iframe을 감지하여 자동 삽입.
- [ ] **다국어(I18n) 시스템**:
  - UI 컴포넌트(툴팁, 플레이스홀더 등)에 대한 다국어(한국어, 영어 등) 지원.

### 2.4 UI 및 아키텍처

- [x] **컴파운드 컴포넌트 패턴(Compound Component Pattern)**:
  - `<TiptapEditor>`, `<TiptapEditor.Toolbar>`, `<TiptapEditor.Content>`를 제공하여 유연성 극대화.
  - **Context API**: `TiptapEditorContext`를 통한 에디터 상태 공유.
- [x] **스타일링**:
  - **격리(Isolation)**: 호스트 앱(MUI 등)과의 충돌 방지를 위해 모든 Tailwind 클래스에 `te-` 접두사 사용.
  - **Preflight 제거**: `corePlugins: { preflight: false }` 설정으로 글로벌 스타일 리셋 방지.
- [x] **HTML 소스 모드**: WYSIWYG 모드와 HTML 소스 코드 편집 모드 간 토글 지원.

## 3. 로드맵 및 향후 개선사항

### Phase 3: 기능 확장 (현재 단계)

- [ ] **Iframe 삽입 (커스텀 확장)**: 임의의 외부 콘텐츠 삽입을 위한 범용 iframe 기능 지원.
- [ ] **유튜브 통합**: 유튜브 확장 프로그램 및 붙여넣기 규칙 구현.
- [ ] **I18n 시스템**: 번역 인프라 구축.

### Phase 4: 안정화 및 고도화

- [ ] **일반 버블 메뉴**: 텍스트 선택 시 나타나는 플로팅 메뉴(Bold, Italic 등).
- [ ] **접근성(A11y)**: ARIA 레이블 및 키보드 탐색 개선.
- [ ] **SSR 호환성**: Next.js App Router 환경에서의 안정성 확보.
