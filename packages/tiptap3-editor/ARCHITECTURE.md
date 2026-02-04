# 아키텍처 결정 기록 (Architecture Decision Record)

이 문서는 프로젝트의 주요 아키텍처 결정 사항과 그 이유를 기록합니다. 이 원칙을 무시하고 코드를 변경할 경우 심각한 성능 저하가 발생할 수 있습니다.

---

## 1. 렌더링 성능 최적화: Uncontrolled Mode 우선 정책

### 1.1. 배경 (Context)

React의 Controlled Component 패턴(`State` -> `Value` 동기화)을 텍스트 에디터에 순진하게 적용할 경우, 엄청난 성능 비용이 발생합니다.

- 사용자가 키보드를 칠 때마다 `onChange`가 발생합니다.
- React 상태가 업데이트되고 리렌더링이 발생합니다.
- `useEffect`가 실행되어 `content` prop과 내부 에디터 상태를 비교합니다 (`editor.getHTML() !== content`).
- **문제점**: `getHTML()`은 전체 문서를 직렬화하는 비싼 연산입니다. 매 타이핑마다 이것이 실행되면 한글 입력 시 자소 분리, 커서 튀는 현상, 끊김이 무조건 발생합니다.

### 1.2. 결정 사항 (Decision)

**우리는 성능을 위해 `useEffect`를 이용한 자동 동기화 로직을 제거한다.**

대신 **Uncontrolled Mode**를 기본으로 채택하고, 필요한 경우에만 외부에서 제어하는 **하이브리드 패턴**을 사용한다.

1.  **초기화**: `initialContent` prop을 사용하여 Tiptap 생성 시점에만 값을 주입한다.
2.  **외부 제어**: `onCreate` 콜백으로 `editor` 인스턴스를 부모에게 전달하고, 부모는 이 인스턴스를 통해 명령형(Imperative)으로 제어한다.
    - 예: `editor.commands.setContent(newValue)`
3.  **동기화 제거**: `TiptapEditor.tsx` 내부에 `useEffect`로 `getHTML()`을 비교하여 `setContent`를 호출하는 로직은 **절대 추가하지 않는다.** (특수한 읽기 전용 모드 등 제외)

### 1.3. 요약 (Summary)

> "Async Loading이나 Reset이 필요 없다면 useEffect 동기화 로직은 과감히 빼버리는 게 성능상 훨씬 이득입니다."

- **Controlled Mode**는 "만약의 외부 변경"을 대비하기 위해 매번 "검문(getHTML)"을 하는 비효율적인 구조입니다.
- **Uncontrolled Mode**는 이 검문 절차를 생략하여 네이티브에 가까운 타이핑 성능을 보장합니다.

---

## 2. Global UI Coordination (전역 UI 조율)

(TBD: `extension-development-guide.md`의 내용 요약)
