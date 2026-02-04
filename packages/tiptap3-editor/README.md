# @cp949/tiptap3-editor

높은 유연성과 쉬운 통합을 위해 설계된 **Tiptap 3.x 기반 React 에디터 라이브러리**입니다.
**컴파운드 컴포넌트(Compound Component)** 아키텍처를 채택하여, 완성된 에디터를 그대로 사용하거나 원하는 대로 레이아웃을 구성할 수 있습니다.

## 주요 기능

- 🚀 **Tiptap 3.x**: 최신 Tiptap 코어 기반.
- 🎨 **Tailwind CSS**: `te-` 접두사 사용 및 **Preflight(Reset) 비활성화**로 스타일 격리 (MUI, AntD 등과 함께 사용 시 안전).
- 🖼️ **이미지 리사이징**: 이미지 업로드(드래그 앤 드롭, 붙여넣기) 및 크기 조절 핸들 내장.
- 📊 **엑셀 호환 테이블**: 엑셀/구글 스프레드시트 복사-붙여넣기 완벽 지원.
- 🛠️ **컴파운드 컴포넌트**: 툴바와 컨텐츠 레이아웃에 대한 완전한 제어권 제공.
- 📝 **HTML 소스 모드**: 위지윅(WYSIWYG)과 HTML 소스 편집 간 자유로운 전환.

📖 **[상세 사용자 가이드 (User Guide) 보러가기](./USER_GUIDE.md)**  
설치, 성능 최적화(Uncontrolled Mode), 커스터마이징에 대한 상세한 설명은 사용자 가이드를 참고하세요.

## 설치 방법

```bash
pnpm add @cp949/tiptap3-editor

# Peer Dependencies 설치
pnpm add @tiptap/react @tiptap/pm react react-dom lucide-react
```

### 1. 템플릿 사용 (Recommended)

가장 쉽고 빠르게 시작하는 방법입니다. 목적에 맞는 미리 구성된 에디터를 사용하세요.

#### BasicEditor (기본형)

필수 서식 도구만 포함된 경량 에디터입니다.

```tsx
import { BasicEditor } from "@cp949/tiptap3-editor";
import "@cp949/tiptap3-editor/style.css";

function App() {
  return (
    <BasicEditor content="<p>내용을 입력하세요...</p>" placeholder="입력..." />
  );
}
```

#### RichEditor (고급형)

이미지, 테이블, 버블 메뉴 등 모든 기능이 포함된 에디터입니다.

```tsx
import { RichEditor } from "@cp949/tiptap3-editor";
import "@cp949/tiptap3-editor/style.css";

function App() {
  return <RichEditor content="<p>풍부한 기능의 에디터입니다.</p>" />;
}
```

### 2. 고급 사용법 (컴파운드 컴포넌트)

컴포넌트 합성 패턴을 사용하여 레이아웃을 입맛대로 구성할 수 있습니다 (예: 스티키 툴바, 커스텀 배치).

```tsx
import { TiptapEditor } from "@cp949/tiptap3-editor";
import "@cp949/tiptap3-editor/style.css";

function App() {
  return (
    <TiptapEditor content="<p>편집을 시작하세요...</p>">
      <div className="my-layout-container">
        {/* 스티키 툴바 예시 */}
        <div className="sticky top-0 z-10">
          <TiptapEditor.Toolbar>{/* ... */}</TiptapEditor.Toolbar>
        </div>

        <TiptapEditor.Content />
      </div>
    </TiptapEditor>
  );
}
```

## 툴바 구성 (Toolbar Configuration)

- **기록 (History)**: Undo, Redo
- **서식 (Typography)**: Bold, Italic, Underline, Strike, Code, Clear Formatting, Color, Highlight
- **제목 (Headings)**: H1, H2, H3, Blockquote
- **정렬 (Alignment)**: Left, Center, Right, Justify
- **목록 (Lists)**: Bullet List, Ordered List
- **삽입 (Inserts)**: Image (Resize & Drag/Drop), Table (Excel Paste), Link
- **유틸리티**: HTML Source View (소스 보기 전환)

## 예제 (Examples)

Playground 앱에서 다양한 사용 예시를 직접 확인하고 코드를 참고할 수 있습니다.

- **[Full Editor](https://github.com/cp949/tiptap3-editor/blob/main/apps/playground/components/examples/RichEditorExample.tsx)**: 모든 기능이 활성화된 에디터.
- **[Minimal / Notion Style](https://github.com/cp949/tiptap3-editor/blob/main/apps/playground/components/examples/styles/NotionStyleExample.tsx)**: 툴바를 커스터마이징하고 미니멀한 스타일 적용.
- **[Save Button Integration](https://github.com/cp949/tiptap3-editor/blob/main/apps/playground/components/examples/SaveButtonExample.tsx)**: 외부 버튼으로 에디터 상태(HTML) 가져오기.
- **[Dark Mode](https://github.com/cp949/tiptap3-editor/blob/main/apps/playground/components/examples/styles/DarkThemeExample.tsx)**: 다크 모드 적용 예시.

## 스타일 커스터마이징 (Style Customization)

이 라이브러리는 **CSS 변수**와 **Tailwind CSS**를 기반으로 스타일링되어 있어, 디자인 시스템에 맞춰 쉽게 테마를 변경할 수 있습니다.

🎨 **[디자인 커스터마이징 가이드 (STYLE_GUIDE.md)](./STYLE_GUIDE.md)**  
👉 CSS 변수 목록, 테마 적용 방법, 레시피(Recipe) 등을 상세히 다룹니다.

간단한 수정 방법은 아래와 같습니다.

### 1. 테마 색상 변경 (CSS Variables)

`root` 또는 상위 엘리먼트에서 CSS 변수를 덮어씌워 색상을 변경할 수 있습니다.

```css
:root {
  --te-primary: #6366f1; /* Indigo 500 */
  --te-bg-toolbar: #f3f4f6;
  --te-radius: 8px;
}
```

### 2. 클래스 오버라이드 (ClassName)

모든 컴포넌트는 `className` prop을 지원합니다. Tailwind 유틸리티를 병합(`cn`)하여 적용하므로 안전하게 스타일을 덮어쓸 수 있습니다.

```tsx
<TiptapEditor className="my-custom-border shadow-lg">
  <TiptapEditor.Toolbar className="bg-gray-100" />
  {/* ... */}
</TiptapEditor>
```

## 로드맵

- [ ] **다국어(I18n) 지원**: UI 다국어화.
- [ ] **유튜브 및 Iframe**: 외부 콘텐츠 삽입.
- [ ] **확장 프로그램 주입**: 사용자 정의 Extension 지원.

## 라이선스

ISC
