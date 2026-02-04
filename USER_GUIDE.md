# @cp949/tiptap3-editor 사용자 가이드

`@cp949/tiptap3-editor`는 Tiptap 3.x를 기반으로 한 강력하고 성능 최적화된 React 에디터 라이브러리입니다.

---

## 🚀 1. 설치 방법 (Installation)

```bash
pnpm add @cp949/tiptap3-editor

# Peer Dependencies (필수 설치)
pnpm add @tiptap/react @tiptap/pm react react-dom lucide-react
```

---

## 💡 2. 컴포넌트 사용법 (Usage)

### 2.1. Basic Editor (기본형)

댓글이나 짧은 게시글 작성 등 간단한 용도에 적합합니다.

```tsx
import { BasicEditor } from "@cp949/tiptap3-editor";

function App() {
  return <BasicEditor placeholder="내용을 입력하세요..." />;
}
```

### 2.2. Rich Editor (고급형)

테이블, 이미지, 링크 등 모든 기능이 포함된 완전한 에디터입니다.

```tsx
import { RichEditor } from "@cp949/tiptap3-editor";

function App() {
  return <RichEditor />;
}
```

---

## ⚡ 3. 성능 최적화 패턴 (중요!)

이 라이브러리는 두 가지 동작 모드를 지원합니다. **최고의 성능(특히 한글 입력 시)을 위해 Uncontrolled Mode 사용을 강력히 권장합니다.**

### 🥉 Controlled Mode (비권장)

`content` prop을 사용하여 React 상태와 에디터를 실시간으로 동기화하는 방식입니다. 매 타이핑마다 HTML 직렬화(`getHTML()`)와 비교 연산이 발생하여 성능 저하 및 커서 튐 현상이 발생할 수 있습니다.

```tsx
// ⚠️ 문서 양이 많아지면 입력이 끊기거나 느려질 수 있습니다.
<TiptapEditor content={content} onChange={setContent} />
```

### 🥇 Uncontrolled Mode (권장)

Tiptap이 자체적으로 상태를 관리하게 하고, 필요한 시점에만 데이터를 가져오는 방식입니다. `initialContent`로 초기값을 설정하고, `onCreate`로 에디터 인스턴스를 받아 제어합니다.

```tsx
import { useState } from "react";
import { TiptapEditor, type Editor } from "@cp949/tiptap3-editor";

function App() {
  const [editor, setEditor] = useState<Editor | null>(null);

  const handleSave = () => {
    // 저장 버튼을 누를 때만 HTML을 추출합니다. (타이핑 시 성능 저하 0)
    const html = editor?.getHTML();
    console.log(html);
  };

  const handleReset = () => {
    // 에디터 인스턴스를 통해 직접 내용을 변경합니다.
    editor?.commands.setContent("");
  };

  return (
    <>
      <TiptapEditor
        initialContent="<p>입력을 시작하세요...</p>"
        onCreate={setEditor} // 인스턴스 캡처
      />
      <button onClick={handleSave}>저장</button>
      <button onClick={handleReset}>초기화</button>
    </>
  );
}
```

**Uncontrolled Mode의 장점:**

- ✅ **네이티브 타이핑 속도**: React 리렌더링의 간섭이 없습니다.
- ✅ **커서 튐 방지**: 한글(IME) 입력 시 자소 분리나 커서 이동 문제가 해결됩니다.
- ✅ **효율성**: 정말 필요할 때(예: 저장)만 HTML 변환을 수행합니다.

### 3.1. 디바운스 제어 (Debounce Control)

`onChange` 이벤트는 성능을 위해 기본적으로 **300ms**의 지연 시간(Debounce)을 가집니다. 즉, 사용자가 타이핑을 멈춘 후 0.3초 뒤에 호출됩니다.  
이 시간은 `debounceDuration` prop으로 조절할 수 있습니다.

```tsx
<TiptapEditor
  // 1초(1000ms) 동안 입력이 없으면 onChange 실행
  debounceDuration={1000}
  onChange={(html) => {
    console.log("Auto saving...", html);
  }}
/>
```

---

## 🛠 4. 유용한 에디터 메서드 (Useful Methods)

`onCreate`를 통해 획득한 `editor` 인스턴스로 다양한 작업을 수행할 수 있습니다.

### HTML 내용 가져오기

현재 작성된 내용을 HTML 문자열로 반환합니다.

```ts
const html = editor.getHTML();
```

### 텍스트만 가져오기

태그를 제외한 순수 텍스트만 반환합니다. (검색 미리보기, 글자수 세기 등에 유용)

```ts
const text = editor.getText();
```

### JSON 데이터 가져오기

문서 구조를 JSON 객체 형태로 반환합니다.

```ts
const json = editor.getJSON();
```

### 내용 덮어쓰기 (교체)

에디터의 모든 내용을 새로운 내용으로 교체합니다.

```ts
editor.commands.setContent("<p>새로운 내용</p>");
```

### 내용 삽입하기

현재 커서 위치에 내용을 추가합니다.

```ts
editor.commands.insertContent("삽입할 텍스트");
```

### 내용 비우기 (초기화)

에디터의 모든 내용을 지웁니다.

```ts
editor.commands.clearContent();
```

### 읽기 전용 모드 전환

에디터를 수정 불가능한 상태로 변경하거나 해제합니다.

```ts
editor.setEditable(false); // 읽기 전용
editor.setEditable(true); // 편집 가능
```

### 포커스 및 실행 (Chaining)

여러 명령어를 한 번에 실행할 때는 `.chain()`을 사용합니다.

```ts
// 포커스를 맞추고 -> 볼드 처리하고 -> 실행
editor.chain().focus().toggleBold().run();
```

---

## 🎨 5. 커스터마이징 (Customization)

### 5.1. 커스텀 툴바

제공되는 컴포넌트들을 조합(Compound Component)하여 원하는 레이아웃을 구성할 수 있습니다.

```tsx
<TiptapEditor>
  {/* 원하는 대로 배치 가능한 커스텀 툴바 */}
  <div className="my-toolbar flex gap-2 p-2 bg-gray-100">
    <TiptapEditor.Bold />
    <TiptapEditor.Italic />
    <div className="w-px h-6 bg-gray-300 mx-2" />
    <TiptapEditor.Image />
  </div>

  {/* 에디터 본문 영역 */}
  <div className="p-4 border min-h-[300px]">
    <TiptapEditor.Content />
  </div>

  {/* 필요한 버블 메뉴만 추가 */}
  <TiptapEditor.TableBubbleMenu />
  <TiptapEditor.LinkBubbleMenu />
</TiptapEditor>
```

---

## ❓ 6. 자주 묻는 질문 (FAQ)

**Q: `onChange`가 바로바로 실행되지 않아요.**
A: 성능을 위해 기본적으로 300ms **디바운스(Debounce)** 처리가 되어 있습니다. 즉, 타이핑을 멈추고 0.3초 뒤에 호출됩니다. `debounceDuration` prop으로 조절 가능합니다.

**Q: 에디터 명령어를 어떻게 실행하나요?**
A: `onCreate` 콜백으로 `editor` 인스턴스를 저장해 두었다가, `editor.commands...` 형태로 사용하시면 됩니다.
