---
"designbase-wp-library": minor
---

🎨 Quick Reference 기준 전체 SCSS 변수 시스템 완전 업데이트

### 🔧 주요 변경사항

#### **1. Quick Reference 변수 시스템 완전 적용**
- **Surface**: `--db-surface-base/layer-1/layer-2/layer-3` 계층화
- **Border**: `--db-border-base/layer-1/layer-2/layer-3` 계층화  
- **Text**: `--db-text-primary/secondary/tertiary` 체계화
- **Brand**: `--db-brand-primary/secondary/tertiary` 브랜드 색상
- **Feedback**: `--db-feedback-success/warning/error/info` (fg/bg 분리)

#### **2. 전용 변수 시스템 도입**
- **Button**: `--db-btn-primary/secondary/tertiary` (*-bg/text/border)
- **Field**: `--db-field-bg/border/text/placeholder` (*-focus/error/disabled)
- **Icon**: `--db-icon-default/hover/muted/disabled`

#### **3. 모든 컴포넌트 업데이트 (32개 파일)**
- `_dewp-accordion.scss` ~ `_dewp-tooltip.scss` 전체 업데이트
- `dewp-styles.scss`, `basic/_index.scss` 메인 파일 업데이트
- 모든 `calc()` 함수 제거, fallback 값 제거

#### **4. 클래스명 호환성 개선**
- `.dewp-button` + `.dewp-btn` 동시 지원
- `&--primary` + `&-primary` 동시 지원

#### **5. 테스트 환경 개선**
- `test/_examples-shell.css` CDN 자동 로드 추가
- `local-button.html` 예시 추가
- 중복 CDN 링크 제거로 일관성 확보

### 🎯 호환성
- 기존 클래스명 완전 호환
- CDN 의존성 유지
- 다크모드 자동 지원

### 📦 배포 정보
- **버전**: v0.6.1 → v0.7.0 (마이너 업데이트)
- **빌드**: CSS/JS 최적화 완료
- **테스트**: 로컬 환경 완전 검증
