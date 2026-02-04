# 사용 중인 Tiptap 확장 목록

이 문서는 현재 프로젝트에서 사용 중인 Tiptap 확장들의 목록과 간단한 설명, 용도를 기술합니다.
향후 개발을 진행하며 더 많은 확장이 추가될 예정입니다.

## 기본 확장 (Starter Kit)

### StarterKit

- **설명**: 가장 일반적으로 사용되는 Tiptap 확장들의 모음입니다.
- **용도**: 문단, 제목(H1~H6), 볼드, 이탤릭, 취소선, 인용구, 코드 블록, 글머리 기호 목록, 번호 매기기 목록 등 기본적인 편집 기능을 제공합니다.
- **주소**: [npm](https://www.npmjs.com/package/@tiptap/starter-kit) | [docs](https://tiptap.dev/api/extensions/starter-kit)

## 스타일링 확장

### Underline

- **설명**: 텍스트에 밑줄을 긋는 기능을 제공합니다.
- **용도**: 강조하고 싶은 텍스트의 하단에 줄을 표시할 때 사용합니다. (예: `<u>밑줄</u>`)
- **주소**: [npm](https://www.npmjs.com/package/@tiptap/extension-underline) | [docs](https://tiptap.dev/api/extensions/underline)

### TextStyle

- **설명**: 텍스트에 인라인 스타일을 적용할 수 있는 기반이 되는 확장입니다.
- **용도**: Color나 FontFamily와 같은 다른 스타일링 확장이 작동하기 위해 필요합니다.
- **주소**: [npm](https://www.npmjs.com/package/@tiptap/extension-text-style) | [docs](https://tiptap.dev/api/extensions/text-style)

### Color

- **설명**: 텍스트의 색상을 변경하는 기능을 제공합니다.
- **용도**: 글자의 색상을 원하는 색으로 지정할 때 사용합니다.
- **주소**: [npm](https://www.npmjs.com/package/@tiptap/extension-color) | [docs](https://tiptap.dev/api/extensions/color)

### Highlight

- **설명**: 텍스트의 배경색(형광펜 효과)을 지정하는 기능을 제공합니다.
- **용도**: 텍스트를 강조하기 위해 배경색을 입힐 때 사용합니다. 현재 `multicolor: true` 설정으로 다양한 색상을 지원합니다.
- **주소**: [npm](https://www.npmjs.com/package/@tiptap/extension-highlight) | [docs](https://tiptap.dev/api/extensions/highlight)

### TextAlign

- **설명**: 텍스트 정렬 기능을 제공합니다.
- **용도**: 문단이나 제목을 왼쪽, 가운데, 오른쪽, 양쪽 정렬할 때 사용합니다.
- **주소**: [npm](https://www.npmjs.com/package/@tiptap/extension-text-align) | [docs](https://tiptap.dev/api/extensions/text-align)

## 기능성 확장

### Placeholder

- **설명**: 에디터가 비어있을 때 안내 문구를 표시합니다.
- **용도**: "내용을 입력하세요..."와 같은 힌트 텍스트를 보여주어 사용자 경험을 개선합니다.
- **주소**: [npm](https://www.npmjs.com/package/@tiptap/extension-placeholder) | [docs](https://tiptap.dev/api/extensions/placeholder)

### Link

- **설명**: 텍스트에 하이퍼링크를 생성합니다.
- **용도**: URL을 클릭 가능한 링크로 변환하거나, 텍스트에 링크를 걸 때 사용합니다. `autolink: true` 설정으로 URL 입력 시 자동으로 링크가 생성됩니다.
- **주소**: [npm](https://www.npmjs.com/package/@tiptap/extension-link) | [docs](https://tiptap.dev/api/extensions/link)

### Image

- **설명**: 이미지를 삽입하는 기능을 제공합니다.
- **용도**: 에디터 내에 이미지를 표시합니다. 현재 `inline: true` 및 `allowBase64: true` 설정이 되어 있으며, 커스텀 리사이저(`ImageResizer`)가 적용되어 있습니다.
- **주소**: [npm](https://www.npmjs.com/package/@tiptap/extension-image) | [docs](https://tiptap.dev/api/extensions/image)

## 표 (Table) 관련 확장

### Table, TableRow, TableHeader, TableCell

- **설명**: 표를 생성하고 관리하는 확장들입니다.
- **용도**: 에디터 내에 행과 열이 있는 표를 삽입하고 편집합니다. `resizable: true` 설정으로 크기 조절이 가능합니다.
- **주소**:
  - Table: [npm](https://www.npmjs.com/package/@tiptap/extension-table) | [docs](https://tiptap.dev/api/extensions/table)
  - 하위 확장들은 Table 확장에 의존적이며 함께 사용됩니다.

---

## 개발 관련 문서

- **[Tiptap 확장 개발 지침서](./extension-development-guide.md)**: 새로운 확장을 개발할 때 지켜야 할 Do & Don't 가이드라인입니다.
