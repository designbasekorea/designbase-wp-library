---
"designbase-wp-library": minor
---

Progress Step 컴포넌트 추가 및 문서 보강

- 새 컴포넌트: `dewp-progress-step`
  - 수평 단계 진행 표시(완료/활성/대기 상태 지원)
  - 크기 변형: `.dewp-progress-step-sm`, `.dewp-progress-step-lg`
- 세로형 변형: `.dewp-progress-step-vertical` (sm/lg 보정 포함)
- 문서 추가: `docs/dewp-progress-step.html` (예제/HTML 구조/상태/변형)
- 번들 등록: SCSS 메인에 `@use 'components/dewp-progress-step'`

마이그레이션 안내
- 기존 UI와 독립적인 신규 컴포넌트로, 다른 컴포넌트에 영향 없음
- 표준 클래스 조합으로 상태를 제어하세요: `.is-completed`, `.is-active`
