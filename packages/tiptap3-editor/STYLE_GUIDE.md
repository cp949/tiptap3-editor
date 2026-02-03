# 🎨 디자인 커스터마이징 가이드

`@cp949/tiptap3-editor`의 스타일링은 **"3단계 레이어"**로 구성되어 있습니다.  
원하는 깊이만큼 선택해서 커스터마이징하세요.

---

## ⚡️ 요약 (Quick Start)

가장 빠르게 테마를 변경하려면, 아래 CSS 변수를 여러분의 `globals.css` 또는 루트 스타일 파일에 복사해서 붙여넣으세요.

```css
:root {
  /* [1] 브랜드 컬러 (Primary) */
  --te-primary: #228be6; /* 메인 포인트 컬러 */
  --te-primary-focus: rgba(34, 139, 230, 0.15); /* 포커스 링 배경 */

  /* [2] 배경색 (Backgrounds) */
  --te-bg-editor: #ffffff; /* 에디터 전체 배경 */
  --te-bg-toolbar: #ffffff; /* 툴바 배경 */
  --te-bg-toolbar-hover: #f1f3f5; /* 버튼 호버 배경 */

  /* [3] 테두리 및 그림자 (Borders) */
  --te-border: #dee2e6; /* 기본 라인 색상 */
  --te-border-focus: #228be6; /* 활성화 시 라인 색상 */
  --te-radius: 6px; /* 둥근 모서리 (0px로 하면 직각) */

  /* [4] 텍스트 (Typography) */
  --te-text-primary: #212529; /* 기본 텍스트 */
  --te-text-muted: #adb5bd; /* 비활성 텍스트 */
}
```

---

## 🏗 3단계 스타일링 전략 (3-Layer Strategy)

| Layer       | 범위                  | 방법                      | 추천 상황                                           |
| :---------- | :-------------------- | :------------------------ | :-------------------------------------------------- |
| **Level 1** | **테마 (Theme)**      | CSS 변수 재정의           | 브랜드 컬러, 다크 모드, 둥근 모서리 변경 시         |
| **Level 2** | **레이아웃 (Layout)** | `className` Prop 주입     | 테두리 제거, 그림자 추가, 패딩 조절 시              |
| **Level 3** | **컨텐츠 (Content)**  | `.ProseMirror` CSS 타겟팅 | 폰트 사이즈, 줄 간격, 제목 스타일 등 본문 디자인 시 |

---

## 🧩 Level 1: CSS 변수 (Theming)

에디터는 모든 스타일에 `te-` 접두사가 붙은 CSS 변수를 사용합니다.  
특정 영역에만 다른 테마를 적용하고 싶다면, 감싸는 태그에 스타일을 주입하세요.

### 예시: 보라색 테마 영역 만들기

```tsx
<div
  style={{
    "--te-primary": "#7c3aed",
    "--te-radius": "12px",
  }}
>
  <BasicEditor />
</div>
```

---

## 💅 Level 2: Tailwind 클래스 (ClassName)

모든 컴포넌트는 `className`을 지원하며, 내부적으로 `tailwind-merge`를 사용하여 안전하게 덮어써집니다.

### ✅ Do

```tsx
// 테두리를 없애고 그림자만 남기고 싶을 때
<TiptapEditor className="border-0 shadow-lg" />
```

### ❌ Don't

```tsx
// !important를 남발하지 마세요. className으로 충분히 덮어써집니다.
<TiptapEditor className="!border-0 !shadow-lg" />
```

### 주요 컴포넌트별 ClassName 적용 위치

- **`TiptapEditor`**: 최상위 컨테이너 (테두리, 배경, 둥근 모서리 담당)
- **`TiptapEditor.Toolbar`**: 상단 툴바 영역 (배경, 하단 라인 담당)
- **`TiptapEditor.Content`**: 실제 텍스트가 입력되는 영역 (패딩, 높이 담당)

---

## 🖋 Level 3: 본문 스타일링 (Typography)

에디터 내부에 작성된 글(`h1`, `p`, `blockquote` 등)의 스타일은 **Tailwind Typography** 플러그인을 기반으로 합니다.  
세부 수정이 필요하면 CSS 파일에서 `.ProseMirror` 클래스를 타겟팅하세요.

```css
/* 글로벌 CSS 파일 예시 */

/* 본문 폰트 및 줄간격 수정 */
.ProseMirror p {
  font-size: 16px;
  line-height: 1.75;
  color: #333;
}

/* 제목(H1) 스타일 수정 */
.ProseMirror h1 {
  color: var(--te-primary);
  border-bottom: 2px solid var(--te-border);
  padding-bottom: 0.5rem;
}

/* 인용구 스타일 */
.ProseMirror blockquote {
  border-left-color: var(--te-primary);
  background: var(--te-bg-toolbar-hover);
}
```

---

## 💡 실전 레시피 (Copy & Paste Recipes)

각 레시피의 전체 코드는 Playground 예제에서 확인할 수 있습니다.

### 1. 다크 모드 (Dark Mode)

부모 요소에 `.dark` 클래스가 있을 때 자동으로 적용되는 CSS입니다.

> **참고 소스**: [`apps/playground/components/examples/styles/DarkThemeExample.tsx`](https://github.com/cp949/tiptap3-editor/blob/main/apps/playground/components/examples/styles/DarkThemeExample.tsx)

```css
.dark {
  --te-bg-editor: #1f2937;
  --te-bg-toolbar: #111827;
  --te-bg-toolbar-hover: #374151;
  --te-border: #374151;
  --te-border-focus: #60a5fa;
  --te-text-primary: #f9fafb;
  --te-text-muted: #9ca3af;
}
```

### 2. 노션(Notion) 스타일

경계선이 없고, 툴바가 상단에 고정되는 스타일입니다.

> **참고 소스**: [`apps/playground/components/examples/styles/NotionStyleExample.tsx`](https://github.com/cp949/tiptap3-editor/blob/main/apps/playground/components/examples/styles/NotionStyleExample.tsx)

```tsx
<TiptapEditor className="border-0 shadow-none">
  {/* Sticky Toolbar + Backdrop Blur */}
  <TiptapEditor.Toolbar className="sticky top-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur" />

  {/* 좁은 컨텐츠 폭 + 넉넉한 여백 */}
  <TiptapEditor.Content className="max-w-[700px] mx-auto py-12 px-4 shadow-none" />
</TiptapEditor>
```

### 3. 파스텔 테마 (Pastel Theme)

CSS 변수만으로 분위기를 완전히 바꾸는 예시입니다.

> **참고 소스**: [`apps/playground/components/examples/styles/PastelThemeExample.tsx`](https://github.com/cp949/tiptap3-editor/blob/main/apps/playground/components/examples/styles/PastelThemeExample.tsx)

### 4. 채팅 입력창 스타일 (Chat Input)

툴바를 하단으로 내리고, 심플한 박스 형태로 만듭니다.

```tsx
<TiptapEditor className="flex-col-reverse border border-gray-300 rounded-2xl overflow-hidden focus-within:ring-2 ring-blue-500/20">
  <TiptapEditor.Toolbar className="border-t border-gray-100 bg-transparent px-2 py-1" />
  <TiptapEditor.Content className="min-h-[40px] max-h-[150px] overflow-y-auto px-3 py-2" />
</TiptapEditor>
```
