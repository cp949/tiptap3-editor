# Umo-extensions 전환 가이드 & 로드맵

이 문서는 `umo-editor`의 우수한 기능들을 `@cp949/tiptap3-editor`로 전환하기 위한 핵심 정보를 담고 있습니다. 매번 소스 전체를 탐색하지 않고도 효율적으로 전환 작업을 수행할 수 있도록 돕습니다.

> [!IMPORTANT]
> **핵심 개발 원칙 (Migration-First Strategy)**
> **"새로 만들지 말고, 완벽하게 이식하십시오."**
>
> 1. **로직 이식 (No Reinventing)**: 기능의 작동 방식이나 알고리즘을 새로 고민하지 마세요. `umo-editor`의 로직이 곧 정답지입니다.
> 2. **디자인 일치 (Design Parity)**: UI/UX는 물론 **색상 목록(Palette)**, 버튼 배치, 미세한 스타일까지 Umo 에디터를 원본(Source of Truth)으로 삼아 똑같이 구현해야 합니다.
> 3. **기술 스택 변환**: 결과물(로직+디자인)은 Umo와 같아야 하지만, 구현 코드는 우리의 기술 스택(React, Radix UI, Tailwind)과 아키텍처에 맞춰 작성합니다.

---

## 1. Umo Editor 핵심 소스 위치 (`_work/thirdparty/umo-editor`)

extensions 기능을 분석하고 가져올 때 참고해야 할 주요 경로는 다음과 같습니다.

### 🔹 확장 로직 (Extension Logic)

- **경로**: `src/extensions/`
- **구조**: 각 기능별 파일 또는 폴더로 구성 (예: `src/extensions/table/`, `src/extensions/indent.ts`)
- **참고**: Tiptap의 `Node`, `Mark`, `Extension` 코어 로직이 정의되어 있습니다.

### 🔹 버블 메뉴 디스패처 (Bubble Menu Dispatcher)

- **경로**: `src/components/menus/bubble/menus.vue`
- **역할**: 현재 에디터의 상태(`isActive`)에 따라 어떤 버튼이나 메뉴를 보여줄지 결정하는 허브입니다.
- **활용**: 특정 노드(Table, Image 등)를 클릭했을 때 나타나는 UI 구성을 파악할 때 가장 먼저 확인해야 합니다.

### 🔹 UI 컴포넌트 & 버튼 (Toolbar/Menus)

- **경로**: `src/components/toolbar/` 및 `src/components/menus/`
- **구성**: 버튼, 팝오버, 컬러 피커 등의 개별 UI 조각들이 위치합니다.
- **참고**: Vue 컴포넌트이므로 React(`lucide-react`, `Radix UI`)로 전환 시 로직(Command 호출)을 참고합니다.

---

## 2. 주요 extensions별 참조 파일 (Key Files)

| 기능           | extensions 로직 위치           | UI 구성 참조 (`menus.vue`)                         | 중요 파일                                              |
| :------------- | :----------------------------- | :------------------------------------------------- | :----------------------------------------------------- |
| **Table**      | `src/extensions/table/`        | `<template v-else-if="editor?.isActive('table')">` | `cell.ts` (속성 관리), `index.ts` (엑셀 붙여넣기 로직) |
| **Image**      | `src/extensions/image/`        | `<template v-if="editor?.isActive('image') ...">`  | `image.ts` (리사이징, 업로드 핸들링)                   |
| **Link**       | `src/extensions/link.ts`       | `<menus-toolbar-insert-link />`                    | 자동 링크 및 팝업 입력 로직                            |
| **Node Align** | `src/extensions/node-align.ts` | 이미지/비디오 등의 정렬 UI                         | `node-align.ts`                                        |

---

## 3. extensions 전환 로드맵 (Checklist)

현재 완료된 항목과 향후 진행할 항목을 관리합니다.

- umo의 코드를 가져와서 @cp949/tiptap3-editor의 스타일에 맞게 구현합니다.
- (중요) 완전히 신규로 구현하는 것이 아니라, 기존에 구현된 것을 가져와서 @cp949/tiptap3-editor의 스타일에 맞게 구현합니다.

### ✅ 완료 (Completed)

- [x] **Core UI Framework**: 컴파운드 컴포넌트 기반 에디터 구조
- [x] **Base Typography**: Bold, Italic, Underline, Strike (StarterKit)
- [x] **Typography+**: TextAlign, LineHeight (일부)
- [ ] **Text Styling (Basic & Advanced)**
  - [x] 기본적인 굵게, 기울임 등 (StarterKit)
  - [x] **글자색 (Text Color)**: 컬러 피커 UI 및 최근 사용 색상 관리
  - [x] **텍스트 배경색 (Highlight)**: 컬러 피커 및 단일 색상 하이라이트
  - [x] **고급 하이라이트 (Presets)**: 글자색/배경색 동시 적용 프리셋 (Umo 방식)
- [ ] **Link (Basic Parity)**
  - [x] 자동 링크(autolink) 및 기본 입력
  - [ ] 인터랙티브 팝업 기반 링크 관리 (Umo 방식)
  - [ ] 에디터 모드에 따른 클릭 동작 최적화
- [ ] **Image (Migration & Advanced)**
  - [x] 기본 삽입 및 드래그 앤 드롭 업로드
  - [x] 기본적인 리사이저(Resizer) 통합
  - [ ] 인라인/블록 이미지 이원화 지원
  - [ ] 고급 속성 (회전, 반전, 정렬 값 유지)
  - [ ] 이미지 캡션(Caption) 지원
  - [ ] 필터 및 서버 업로드 통합 핸들러
- [x] **Table (Phase 1 & 2)**
  - [x] 그리드 피커 및 기본적인 표 생성
  - [x] 엑셀/스프레드시트 붙여넣기 로직
  - [x] 9그리드 셀 정렬 UI
  - [x] 셀 배경색 및 테두리 색상 커스터마이징
  - [x] 셀 병합 및 분할
  - [x] 개별 헤더 셀 토글 기능
  - [x] 테이블 구조 복구(Fix Tables) 명령어
  - [x] 키보드/UI를 통한 셀 탐색(Next/Prev Cell)
  - [ ] **테이블 너비 관리 (Width Management) - 보류**
    - [ ] 100% 너비 vs 고정 너비 토글 기능
    - [ ] 개별 열 너비 수동 조정 및 초기화
    - **문제 상황**: Tiptap의 `resizable` 기능이 활성화된 상태에서 열 너비를 조정하면 인라인 픽셀 너비가 강제로 삽입되어, CSS의 `width: 100%` 설정과 충돌함. `!important`를 사용한 강제 적용은 가능하나 리사이징 로직과의 완벽한 통합을 위해 추가 기술 검토 필요.

### 🚀 진행 예정 (Planned)

- [ ] **Table (Advanced)**
  - [ ] 표 내 복잡한 수식 지원 검토
  - [ ] 표 스타일 템플릿 제안 UI
- [ ] **Code Block**
  - [ ] Prism/Lowlight 기반 구문 강조 강화
- [ ] **Markdown**
  - [ ] 마크다운 입력 규칙 및 붙여넣기 강화
- [ ] **Iframe / Video**
  - [ ] 외부 콘텐츠 삽입 및 레이아웃 최적화

---

## 💡 전환 팁 (Tips)

1. **Command Chaining**: Umo의 `editor.chain()...` 로직을 그대로 React 핸들러로 옮기면 대부분 정상 작동합니다.
2. **Icon Mapping**: Umo는 특정 아이콘 라이브러리를 사용하므로, 우리 프로젝트에서는 `lucide-react`에서 유사한 아이콘을 찾아 대체합니다.
3. **Prefixing**: Umo의 스타일을 가져올 때는 반드시 우리 프로젝트의 `te-` 접두사 규칙과 CSS 변수 체계에 맞춰야 합니다.
