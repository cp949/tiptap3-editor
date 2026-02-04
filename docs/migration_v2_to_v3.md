# Tiptap v2 -> v3 마이그레이션 가이드

이 문서는 Tiptap v2에서 v3로 마이그레이션할 때 알아야 할 주요 변경 사항과 확장 개발 시 주의할 점을 다룹니다.

> **참고**: v3는 내부적으로 많은 최적화가 이루어졌으며, 일부 API와 패키지 구조가 변경되었습니다.

## 1. 패키지 구조 변경 및 이름 변경

가장 큰 변화는 패키지 정리입니다. 의존성을 줄이고 관리를 용이하게 하기 위해 여러 패키지가 통합되었습니다.

### 주요 변경 사항

- **UMD 빌드 제거**: 더 이상 UMD 빌드(브라우저 직접 로딩용)를 제공하지 않습니다. ESM(ECMAScript Modules) 기반으로 전환되었습니다.
- **패키지 통합**:
  - **Table 관련**: `extension-table-row`, `extension-table-cell`, `extension-table-header` 등이 `@tiptap/extension-table` 하나로 통합되었습니다.
  - **List 관련**: `extension-list-item`, `extension-bullet-list`, `extension-ordered-list` 등이 `@tiptap/extension-list`로 통합되었습니다.
- **새로운 패키지**: `@tiptap/extensions` 패키지가 신설되어 `CharacterCount`, `Dropcursor`, `Gapcursor`, `Placeholder`, `History` 등을 포함합니다.

### 이름 변경

- **History**: `History` 확장이 `UndoRedo`로 이름이 변경되었으며 `@tiptap/extensions`에 포함되었습니다.
- **CollaborationCursor**: `@tiptap/extension-collaboration-cursor`가 `@tiptap/extension-collaboration-caret`으로 이름이 변경되었습니다.

## 2. API 변경 사항 (Breaking Changes)

확장 개발 시 기존 코드가 작동하지 않을 수 있는 부분입니다.

### NodeView의 `getPos()`

v3에서는 `NodeView`의 `getPos()` 메서드가 `undefined`를 반환할 수 있게 되었습니다. 이는 노드가 아직 문서에 완전히 삽입되지 않았거나 삭제된 상태일 때 발생할 수 있습니다.
따라서 반드시 `undefined` 체크를 해야 합니다.

```typescript
// v2
const pos = this.getPos();

// v3
const pos = this.getPos();
if (pos === undefined) {
  return; // 또는 적절한 처리
}
```

### 명령어 (Commands)

- **`setContent`, `clearContent`**: 이제 기본적으로 업데이트 이벤트를 발생시킵니다.
- **`insertContent`**: 텍스트 노드의 시작 부분에서 노드가 분리되는 것을 방지하도록 동작이 개선되었습니다.
- **`getCharacterCount()` 제거**: `editor.getCharacterCount()`가 제거되었습니다. 대신 `editor.storage.characterCount.characters()`를 사용해야 합니다.

### StarterKit 기본값

- `StarterKit`에 `Underline`과 `Link` 확장이 기본적으로 포함되었습니다.
- 만약 커스텀 Link 확장을 사용하거나 별도로 추가하고 있었다면 중복될 수 있으므로 `StarterKit` 설정에서 비활성화해야 합니다.

```typescript
StarterKit.configure({
  link: false, // 기본 Link 확장 비활성화
  underline: false, // 기본 Underline 확장 비활성화
});
```

## 3. UI 라이브러리 변경 (Tippy.js -> Floating UI)

BubbleMenu와 FloatingMenu에서 사용하던 `tippy.js`가 `Floating UI`로 대체되었습니다.
`tippyOptions` 대신 `pluginKey`나 다른 설정 방식을 확인해야 하며, 메뉴 컴포넌트 import 경로가 `@tiptap/react/menus` 등으로 변경되었을 수 있습니다.

## 4. 마이그레이션 단계

1. **v2 패키지 삭제**: 기존 `@tiptap/*` 패키지들을 모두 삭제합니다.
2. **v3 패키지 설치**: 필요한 패키지들을 v3 버전으로 설치합니다.
3. **Import 경로 수정**: 통합되거나 이름이 변경된 패키지들의 import 경로를 수정합니다.
4. **코드 수정**:
   - `getPos()` 체크 로직 추가
   - `History` -> `UndoRedo` 등 클래스명 변경
   - `StarterKit` 설정 확인
5. **테스트**: 에디터가 정상적으로 로드되고 각 기능이 작동하는지 확인합니다.

---

더 자세한 변경 내역은 [Tiptap 공식 문서](https://tiptap.dev)나 GitHub 릴리즈 노트를 참고하시기 바랍니다.
