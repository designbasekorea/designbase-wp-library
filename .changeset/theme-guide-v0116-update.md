---
"designbase-wp-library": minor
---

🎨 THEME_GUIDE.md v0.1.16 기준 전체 SCSS 변수 시스템 통일

## 주요 변경사항

### 새로운 변수 시스템 적용
- Surface 레이어 시스템 (`--db-surface-base`, `--db-surface-layer-1`, `--db-surface-layer-2`)
- Border 레이어 시스템 (`--db-border-base`, `--db-border-layer-1`, `--db-border-layer-2`)
- Feedback 색상 (`--db-feedback-success-fg/bg`, `--db-feedback-warning-fg/bg`, etc.)
- Interactive 상태 (`--db-interactive-text/bg/border`, `--db-interactive-text-hover`, etc.)
- Brand 색상 (`--db-brand-primary`, `--db-brand-secondary`)

### 제거된 것들
- 모든 하드코딩된 HEX 색상 및 rgba() 값 제거
- 수동 다크모드 스타일 제거 (theme.css가 자동 처리)
- 불필요한 fallback 값 제거
- 구식 변수명 제거

### 업데이트된 파일 (42개 전체)
- Basic 폴더: 11개 파일 모두 v0.1.16으로 업데이트
- Components 폴더: 30개 파일 모두 v0.1.16으로 업데이트
- 메인 스타일시트: dewp-styles.scss 업데이트

### Breaking Changes
없음 (하위 호환성 유지)

