# Tiptap3 Editor 스타일 고도화 계획

## 1. 비전 및 철학

> **"설정 없이 아름답게, 커스터마이징은 자유롭게 (Zero-Config Beauty, Infinite Customization)"**

- **기본 제공이 예쁨 (Default is Pretty)**: 별도 설정 없이도 Notion이나 Linear처럼 현대적이고 완성도 높은 디자인을 제공해야 합니다.
- **스타일 커스터마이징 (Style Customization)**: 테마 색상 변경부터 전체 레이아웃 수정까지, 개발자가 라이브러리와 싸우지 않고 쉽게 스타일을 수정할 수 있어야 합니다.

---

## 2. 현재 상태 및 문제점

현재 에디터는 다음과 같은 방식을 사용 중입니다:

- `te-` 접두사가 붙은 하드코딩된 Tailwind 클래스 사용 (예: `te-border-gray-300`).
- 최상위 `TiptapEditor` 컴포넌트에 `className`이나 `style` prop이 노출되지 않음.
- 전역 초기화 및 ProseMirror 기본 스타일이 포함된 `te-editor.css` 번들링.

**주요 문제점:**

- **테마 변경 불가**: 파란색 포커스 링이나 회색 테두리 색상을 바꾸려면 복잡한 CSS 덮어쓰기가 필요합니다.
- **레이아웃 경직성**: 패딩, 그림자, 둥근 모서리(Radius) 등을 쉽게 수정할 수 없습니다.
- **통합의 어려움**: 호스트 애플리케이션의 디자인 시스템(MUI, AntD 등)과 스타일을 일치시키기 어렵습니다.

---

## 3. 고도화 전략

### A. "기본 제공이 예쁨" (비주얼 업그레이드)

Mantine Tiptap 수준의 깔끔하고 현대적인 디자인으로 기본 스타일을 개선합니다.

- **타이포그래피**: 가독성을 고려한 줄 간격(Line-height) 및 폰트 스무딩 최적화.
- **인터랙션**: 포커스 및 호버 시 부드러운 전환 효과(Transition) 적용.
- **여백**: 답답하지 않고 여유로운 패딩 적용.
- **아이콘**: Lucide 아이콘을 일관성 있게 적용하여 깔끔한 룩앤필 완성.

### B. "커스터마이징" (기술적 업그레이드)

**Compound Component 패턴**의 장점을 살리면서 Mantine과 같은 편의성을 제공하기 위해 **3단계 스타일링 구조**를 도입합니다.

#### Layer 1: CSS Variables (테마 설정)

하드코딩된 색상과 수치를 CSS 변수로 대체하여, CSS 몇 줄만으로 에디터의 "Look & Feel"을 변경할 수 있게 합니다.

```css
:root {
  --te-primary: #3b82f6; /* 메인 액션/포커스 색상 */
  --te-border: #e5e7eb; /* 기본 테두리 색상 */
  --te-radius: 0.375rem; /* 모서리 둥글기 */
  --te-bg-toolbar: #ffffff; /* 툴바 배경색 */
  --te-text-primary: #111827; /* 메인 텍스트 색상 */
}
```

코드베이스에서는 이 변수와 매핑되는 Tailwind 커스텀 클래스를 사용합니다 (예: `te-border-editor`).

#### Layer 2: ClassName 주입 (덮어쓰기)

라이브러리에서 export하는 모든 컴포넌트(Root, Toolbar, Content, Controls)에 `className`과 `style` prop을 엽니다.
이는 **Compound Component 패턴**의 가장 큰 장점으로, 복잡한 셀렉터 없이도 각 요소를 독립적으로 스타일링할 수 있습니다.

```tsx
<TiptapEditor className="shadow-none border-0">
  <TiptapEditorToolbar className="bg-slate-100 p-2 rounded-t-lg" />
  <TiptapEditorContent className="prose-slate" />
</TiptapEditor>
```

#### Layer 3: 기본 템플릿 제공 (보일러플레이트 해결)

Compound Component 패턴의 진입 장벽(초기 설정의 번거로움)을 해소하기 위해, 바로 사용할 수 있는 **완성형 템플릿**을 제공합니다.

- **`BasicEditor`**: 최소한의 툴바 + 컨텐츠 영역.
- **`RichEditor`**: 그룹화된 풀옵션 툴바 + 버블 메뉴 + 컨텐츠 영역.

```tsx
// 1. 간편 모드 (템플릿 사용)
import { RichEditor } from '@cp949/tiptap3-editor';
<RichEditor />

// 2. 커스텀 모드 (Compound Component 사용)
import { TiptapEditor, ... } from '@cp949/tiptap3-editor';
<TiptapEditor>...</TiptapEditor>
```

---

## 4. 구현 상세 계획

### Phase 1: 인프라 (기반 마련)

1.  **CSS 리팩토링**: `src/styles/variables.css`에 표준 CSS 변수셋 정의.
2.  **Tailwind 설정 업데이트**: Tailwind 색상/간격 시스템을 CSS 변수와 매핑.
3.  **유틸리티 구성**: `tailwind-merge`와 `clsx`를 도입하여 기본 스타일과 사용자 스타일을 안전하게 병합.

### Phase 2: 컴포넌트 리팩토링

`TiptapEditor` 및 하위 컴포넌트가 Layer 1, 2를 지원하도록 수정:

- **Root (`TiptapEditor`)**: `className` prop 허용 (기본 컨테이너 스타일에 병합).
- **Toolbar (`TiptapEditorToolbar`)**: 고정된 패딩/테두리 제거, override 허용.
- **Buttons (`Control`)**: `className`이 실제 `<button>` 요소에 올바르게 적용되도록 수정.

### Phase 3: "Default is Pretty" 폴리싱

기본 변수값을 조정하여 "설치 직후"의 디자인 품질을 높입니다.

- 접근성 표준을 준수하는 명도 대비 확인.
- 포커스 상태의 시인성과 심미성 확보.

### Phase 4: 템플릿 구현

`src/components/templates` 디렉토리를 생성하고 `BasicEditor`, `RichEditor`를 구현합니다.

---

## 5. 사용 예시 (Future State)

### 시나리오 A: 간편 테마 변경 (색상 변경)

```css
/* 사용자의 전역 CSS */
.te-editor-root {
  --te-primary: #7c3aed; /* 파란색 대신 보라색 사용 */
  --te-radius: 0px; /* 둥근 모서리 제거 (직각) */
}
```

### 시나리오 B: 프레임워크 통합 (Tailwind 사용자)

```tsx
<TiptapEditor className="border-2 border-indigo-500 shadow-xl rounded-2xl" />
```

### 시나리오 C: 다크 모드 지원

CSS 변수를 사용하므로 클래스 하나로 다크 모드 처리가 가능합니다.

```css
.dark .te-editor-root {
  --te-bg-toolbar: #1f2937;
  --te-text-primary: #f9fafb;
  --te-border: #374151;
}
```

## 6. 액션 플랜

### Phase 1: 인프라 (완료)

- [x] `tailwind-merge`, `clsx` 설치.
- [x] `variables.css` 생성 및 변수 정의.
- [x] `tailwind.config.js` 업데이트.

### Phase 2: 컴포넌트 리팩토링 (완료)

- [x] `TiptapEditor.tsx` (Root) 리팩토링: `className` 병합 로직 추가.
- [x] `TiptapEditorToolbar.tsx` 및 하위 컴포넌트 리팩토링.
- [x] `Control` (버튼) 컴포넌트 리팩토링.

### Phase 3~4: 템플릿 및 검증 (완료)

- [x] `RichEditor`, `BasicEditor` 템플릿 구현.
- [x] 데모 페이지(Playground)에서 커스터마이징 검증.

---

## 7. 컨텍스트 (완료)

**최종 업데이트: 2026-02-04 (모든 단계 완료)**

### 완료된 작업

1.  **인프라 구축**: `variables.css`, `tailwind.config.js`, `cn` 유틸리티.
2.  **컴포넌트 리팩토링**: `TiptapEditor`, `Toolbar` 등이 `className`과 CSS 변수를 지원하도록 수정됨.
3.  **템플릿 제공**: `BasicEditor`, `RichEditor` 구현 및 `README` 문서화 완료.
4.  **검증**: Playground에 예제 추가 및 빌드 확인 완료.

### 다음 단계

스타일 고도화 작업이 완료되었습니다. 다음 로드맵(다국어 등)으로 진행하세요.
