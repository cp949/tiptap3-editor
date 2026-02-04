---
description: @cp949/tiptap3-editor 배포 준비 (검증, 버전 업데이트, 빌드)
---

이 워크플로우는 `@cp949/tiptap3-editor` 패키지를 npmjs에 배포하기 전, 코드 무결성을 확인하고 버전을 업데이트하며 빌드 아티팩트를 생성하는 과정을 자동화합니다.

1.  **패키지 디렉토리로 이동 및 의존성 확인**
    먼저 작업 디렉토리를 확인합니다.
    명령어: `cd packages/tiptap3-editor`

2.  **코드 품질 검사 (Type Check & Lint)**
    // turbo
    배포 전 코드에 오류가 없는지 확인합니다.
    명령어: `cd packages/tiptap3-editor && pnpm check-types && pnpm lint`

3.  **버전 업데이트 (Patch)**
    `package.json`의 버전을 올리고 Git 태그를 생성합니다. (기본값: Patch)
    명령어: `cd packages/tiptap3-editor && npm version patch`

4.  **패키지 빌드 (문서 동기화 포함)**
    // turbo
    배포용 파일을 빌드합니다. 문서 동기화 스크립트가 포함되어 있습니다.
    명령어: `cd packages/tiptap3-editor && pnpm build`

5.  **배포 준비 완료**
    모든 준비가 완료되었습니다. 아래 명령어로 수동 배포하세요.
    명령어: `cd packages/tiptap3-editor && pnpm publish --access public --no-git-checks`
