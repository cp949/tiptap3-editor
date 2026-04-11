# 변경 로그 (Changelog)

`@cp949/tiptap3-editor`의 모든 주요 변경 사항은 이 파일에 기록됩니다.

## [Unreleased]

## [1.0.5] - 2026-04-11

### 변경됨 (Changed)

- **빌드 체인 현대화**: Vite 8, TypeScript 6, 최신 Rollup 패치 버전에 맞춰 패키지 빌드 구성을 정비했습니다.
- **배포 산출물 단순화**: 더 이상 사용하지 않는 UMD/CJS 출력 지원을 제거하고 ESM 배포 경로에 집중하도록 정리했습니다.
- **의존성 업데이트**: Tiptap 관련 패키지와 워크스페이스 의존성을 최신 상태로 끌어올려 호환성과 유지보수성을 개선했습니다.

### 개발 환경 (Internal)

- **플레이그라운드 정비**: 예제 앱 의존성을 함께 업데이트해 현재 패키지와 개발 환경이 같은 기준에서 검증되도록 맞췄습니다.

## [1.1.0] - 2026-02-05

### 성능 개선 (Performance)

- **Uncontrolled Mode 지원**: React 상태 동기화 오버헤드 없이 에디터를 실행할 수 있도록 `initialContent` prop을 도입했습니다.
- **콜백 패턴 (Callback Pattern)**: 리렌더링 강제 없이 에디터 인스턴스를 캡처하여 제어(초기화, 내용 삽입 등)할 수 있도록 `onCreate` prop을 추가했습니다.
- **디바운스 (Debounce)**: `onChange` 호출 주기를 `debounceDuration` prop으로 설정할 수 있도록 개선했습니다 (기본값: 300ms).

### 버그 수정 (Fixed)

- **UI 겹침 해결**: `TableBubbleMenu`와 `LinkControl` 팝오버가 동시에 떠서 겹치는 문제를 해결했습니다. 전역 UI 조율 상태(`activeToolbarPopup`)를 도입하여 상호 배타적으로 동작합니다.
- **Hook 순서 오류 수정**: `LinkBubbleMenu` 컴포넌트 내에서 조건부 렌더링으로 인해 발생하던 React Hook 순서 위반 오류를 수정했습니다.

### 추가됨 (Added)

- **사용자 가이드**: 상세한 사용법을 담은 [USER_GUIDE.md](https://github.com/cp949/tiptap3-editor/blob/main/USER_GUIDE.md)를 추가했습니다.
- **플레이그라운드**: 고성능 Uncontrolled 패턴을 시연하기 위한 `UncontrolledEditorExample`을 추가했습니다.
