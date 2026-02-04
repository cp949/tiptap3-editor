# Umo 확장 전환 가이드 & 로드맵

이 문서는 `umo-editor`의 우수한 기능들을 `@cp949/tiptap3-editor`로 전환하기 위한 핵심 정보를 담고 있습니다. 매번 소스 전체를 탐색하지 않고도 효율적으로 전환 작업을 수행할 수 있도록 돕습니다.

---

## 1. Umo Editor 핵심 소스 위치 (`_work/thirdparty/umo-editor`)

확장 기능을 분석하고 가져올 때 참고해야 할 주요 경로는 다음과 같습니다.

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

## 2. 주요 확장별 참조 파일 (Key Files)

| 기능           | 확장 로직 위치                 | UI 구성 참조 (`menus.vue`)                         | 중요 파일                                              |
| :------------- | :----------------------------- | :------------------------------------------------- | :----------------------------------------------------- |
| **Table**      | `src/extensions/table/`        | `<template v-else-if="editor?.isActive('table')">` | `cell.ts` (속성 관리), `index.ts` (엑셀 붙여넣기 로직) |
| **Image**      | `src/extensions/image/`        | `<template v-if="editor?.isActive('image') ...">`  | `image.ts` (리사이징, 업로드 핸들링)                   |
| **Link**       | `src/extensions/link.ts`       | `<menus-toolbar-insert-link />`                    | 자동 링크 및 팝업 입력 로직                            |
| **Node Align** | `src/extensions/node-align.ts` | 이미지/비디오 등의 정렬 UI                         | `node-align.ts`                                        |

---

## 3. 확장 전환 로드맵 (Checklist)

현재 완료된 항목과 향후 진행할 항목을 관리합니다.

### ✅ 완료 (Completed)

- [x] **Core UI Framework**: 컴파운드 컴포넌트 기반 에디터 구조
- [x] **Base Typography**: Bold, Italic, Underline, Strike (StarterKit)
- [x] **Text Styling**: Color, Background Color, Highlight
- [x] **Typography+**: TextAlign, LineHeight (일부)
- [x] **Link**: 인터랙티브 링크 입력 및 관리
- [x] **Image**: 기본 삽입 및 리사이저 통합
- [x] **Table (Phase 1)**: 그리드 피커, 엑셀 붙여넣기, 9그리드 정렬, 셀 스타일(배경/테두리)

### 🚀 진행 예정 (Planned)

- [ ] **Table (Phase 2)**: 셀 병합/분할 UI 고도화, 표 내 복잡한 수식 지원 검토
- [ ] **Image (Advanced)**: 이미지 캡션, 필터, 서버 업로드 통합 핸들러
- [ ] **Code Block**: Prism/Lowlight 기반 구문 강조 강화 (Umo의 `code-block` 참조)
- [ ] **Markdown**: 마크다운 입력 규칙 및 붙여넣기 강화
- [ ] **Iframe / Video**: 외부 콘텐츠 삽입 레이아웃 최적화
- [ ] **AI Assistant**: Umo의 AI 기능을 프로젝트 아키텍처에 맞게 이식 (미정)

---

## 💡 전환 팁 (Tips)

1. **Command Chaining**: Umo의 `editor.chain()...` 로직을 그대로 React 핸들러로 옮기면 대부분 정상 작동합니다.
2. **Icon Mapping**: Umo는 특정 아이콘 라이브러리를 사용하므로, 우리 프로젝트에서는 `lucide-react`에서 유사한 아이콘을 찾아 대체합니다.
3. **Prefixing**: Umo의 스타일을 가져올 때는 반드시 우리 프로젝트의 `te-` 접두사 규칙과 CSS 변수 체계에 맞춰야 합니다.
