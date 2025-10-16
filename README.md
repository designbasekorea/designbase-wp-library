# DesignBase WordPress Library (DEWP)

[![npm version](https://img.shields.io/npm/v/designbase-wp-library.svg)](https://www.npmjs.com/package/designbase-wp-library)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

워드프레스 플러그인 개발을 위한 재사용 가능한 프론트엔드 UI 라이브러리입니다.

> **DEWP** = **D**esignBase W**o**rdPress Library

## ✨ 특징

- 🎨 **THEME_GUIDE.md v0.1.16 기준** - 최신 디자인 토큰 시스템
- 🌙 **자동 다크모드** - theme.css와 완벽 통합
- 📱 **완전 반응형** - 모바일 우선 설계
- ♿ **접근성 준수** - WCAG 가이드라인 적용
- 🔧 **TypeScript 지원** - 완전한 타입 정의
- 🚀 **CDN 지원** - unpkg, jsDelivr

---

## 📦 설치

### NPM
```bash
npm install designbase-wp-library
```

### CDN (권장)
```html
<!-- 1. Theme System (필수) -->
<link rel="stylesheet" href="https://unpkg.com/@designbasekorea/theme@latest/dist/css/theme.css">

<!-- 2. Icon System (필수) -->
<link rel="stylesheet" href="https://unpkg.com/@designbasekorea/icons-webfont@latest/dist/webfont/icons.css">

<!-- 3. DEWP Library -->
<link rel="stylesheet" href="https://unpkg.com/designbase-wp-library@latest/dist/css/dewp.min.css">
<script src="https://unpkg.com/designbase-wp-library@latest/dist/js/dewp.min.js"></script>
```

---

## 🚀 빠른 시작

### 기본 사용법

```html
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>DEWP 라이브러리</title>
  
  <!-- CDN -->
  <link rel="stylesheet" href="https://unpkg.com/@designbasekorea/theme@latest/dist/css/theme.css">
  <link rel="stylesheet" href="https://unpkg.com/@designbasekorea/icons-webfont@latest/dist/webfont/icons.css">
  <link rel="stylesheet" href="https://unpkg.com/designbase-wp-library@latest/dist/css/dewp.min.css">
</head>
<body>
  <!-- 버튼 -->
  <button class="dewp-button dewp-button--primary">Primary Button</button>
  
  <!-- 카드 -->
  <div class="dewp-card">
    <div class="dewp-card-header">카드 제목</div>
    <div class="dewp-card-body">카드 내용</div>
  </div>
  
  <script src="https://unpkg.com/designbase-wp-library@latest/dist/js/dewp.min.js"></script>
</body>
</html>
```

---

## 🧩 주요 컴포넌트

### 1. 버튼 (Button)
```html
<!-- 기본 버튼 -->
<button class="dewp-button dewp-button--primary">Primary</button>
<button class="dewp-button dewp-button--secondary">Secondary</button>
<button class="dewp-button dewp-button--tertiary">Tertiary</button>

<!-- 상태별 버튼 -->
<button class="dewp-button dewp-button--success">Success</button>
<button class="dewp-button dewp-button--warning">Warning</button>
<button class="dewp-button dewp-button--danger">Danger</button>

<!-- 크기 변형 -->
<button class="dewp-button dewp-button--primary dewp-button--sm">Small</button>
<button class="dewp-button dewp-button--primary dewp-button--lg">Large</button>

<!-- Outline 스타일 -->
<button class="dewp-button dewp-button--outline-primary">Outline</button>
```

### 2. 카드 (Card)
```html
<!-- 기본 카드 -->
<div class="dewp-card">
  <div class="dewp-card-header">카드 제목</div>
  <div class="dewp-card-body">카드 내용입니다.</div>
  <div class="dewp-card-footer">푸터 영역</div>
</div>

<!-- 카드 변형 -->
<div class="dewp-card dewp-card--outlined">Outlined</div>
<div class="dewp-card dewp-card--elevated">Elevated</div>
<div class="dewp-card dewp-card--hover">Hover Effect</div>
```

### 3. 모달 (Modal)
```javascript
// 기본 모달
window.DEWP.showModal({
  title: '모달 제목',
  content: '모달 내용입니다.',
  size: 'md' // sm, md, lg, xl
});

// 확인 모달
window.DEWP.showConfirmModal({
  title: '확인',
  message: '정말 삭제하시겠습니까?',
  confirmText: '삭제',
  cancelText: '취소',
  onConfirm: () => console.log('삭제됨')
});
```

### 4. 토스트 (Toast)
```javascript
// 타입별 토스트
window.DEWP.showSuccessToast('성공 메시지', 3000);
window.DEWP.showErrorToast('오류 메시지', 3000);
window.DEWP.showWarningToast('경고 메시지', 3000);
window.DEWP.showInfoToast('정보 메시지', 3000);

// 커스텀 토스트
window.DEWP.showToast('메시지', 'success', 3000, 'lg');
```

### 5. 드롭다운 (Dropdown)
```html
<div class="dewp-dropdown">
  <button class="dewp-dropdown-toggle">선택하세요</button>
  <div class="dewp-dropdown-menu">
    <div class="dewp-dropdown-item" data-value="1">옵션 1</div>
    <div class="dewp-dropdown-item" data-value="2">옵션 2</div>
  </div>
</div>

<script>
  window.DEWP.autoInitializeDropdowns();
</script>
```

### 6. 탭 (Tabs)
```html
<div class="dewp-tabs">
  <button class="dewp-tab-btn active" data-tab="tab1">탭 1</button>
  <button class="dewp-tab-btn" data-tab="tab2">탭 2</button>
</div>

<div class="dewp-tab-content">
  <div class="dewp-tab-pane active" data-tab="tab1">탭 1 내용</div>
  <div class="dewp-tab-pane" data-tab="tab2">탭 2 내용</div>
</div>

<script>
  window.DEWP.initTabs();
</script>
```

### 7. 아코디언 (Accordion)
```html
<div class="dewp-accordion">
  <div class="dewp-accordion-item">
    <div class="dewp-accordion-header">
      <span class="dewp-accordion-title">아코디언 제목 1</span>
      <span class="dewp-accordion-icon">▼</span>
    </div>
    <div class="dewp-accordion-content">아코디언 내용 1</div>
  </div>
</div>

<script>
  window.DEWP.initAccordions();
</script>
```

### 8. Drawer
```html
<div class="dewp-drawer" id="my-drawer">
  <div class="dewp-drawer-header">
    <h3 class="dewp-drawer-title">Drawer 제목</h3>
    <button class="dewp-drawer-close">×</button>
  </div>
  <div class="dewp-drawer-content">
    Drawer 내용
  </div>
</div>

<script>
  const drawer = window.DEWP.createDrawer({
    target: '#my-drawer',
    overlay: true,
    closeOnEscape: true
  });
  
  window.DEWP.openDrawer(drawer);
</script>
```

### 9. 폼 요소 (Forms)
```html
<!-- 입력 필드 -->
<div class="dewp-form-group">
  <label class="dewp-form-label">이름</label>
  <input type="text" class="dewp-form-input" placeholder="이름 입력">
</div>

<!-- 체크박스 -->
<div class="dewp-form-check dewp-form-checkbox">
  <input type="checkbox" class="dewp-form-check-input" id="check1">
  <label class="dewp-form-check-label" for="check1">동의합니다</label>
</div>

<!-- 라디오 버튼 -->
<div class="dewp-form-check dewp-form-radio">
  <input type="radio" class="dewp-form-check-input" name="radio" id="radio1">
  <label class="dewp-form-check-label" for="radio1">옵션 1</label>
</div>

<!-- 토글 스위치 -->
<label class="dewp-toggle-label">
  <input type="checkbox" class="dewp-toggle-input">
  <span class="dewp-toggle-slider"></span>
  <span class="dewp-toggle-text">알림 받기</span>
</label>
```

### 10. 테이블 (Table)
```html
<table class="dewp-table">
  <thead>
    <tr>
      <th>제목</th>
      <th>작성자</th>
      <th>날짜</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>게시글 1</td>
      <td>홍길동</td>
      <td>2025-01-01</td>
    </tr>
  </tbody>
</table>
```

---

## 🎨 디자인 시스템

### CSS 변수 (THEME_GUIDE.md v0.1.16 기준)

#### Surface (배경)
```css
--db-surface-base           /* 기본 배경 */
--db-surface-layer-1        /* 1단계 높이 */
--db-surface-layer-2        /* 2단계 높이 */
```

#### Text (텍스트)
```css
--db-text-primary           /* 주요 텍스트 */
--db-text-secondary         /* 보조 텍스트 */
--db-text-tertiary          /* 부가 텍스트 */
--db-text-link              /* 링크 텍스트 */
--db-text-inverse-primary   /* 반전 텍스트 */
```

#### Border (테두리)
```css
--db-border-base            /* 기본 테두리 */
--db-border-layer-1         /* 1단계 테두리 */
--db-border-layer-2         /* 2단계 테두리 */
```

#### Feedback (상태)
```css
--db-feedback-success-fg/bg /* 성공 */
--db-feedback-warning-fg/bg /* 경고 */
--db-feedback-error-fg/bg   /* 에러 */
--db-feedback-info-fg/bg    /* 정보 */
```

#### Brand (브랜드)
```css
--db-brand-primary          /* 주요 브랜드 색상 */
--db-brand-secondary        /* 보조 브랜드 색상 */
```

### 다크 모드

다크 모드는 **자동으로 적용**됩니다:

```html
<!-- 다크 모드 활성화 -->
<body data-theme="dark">
  <!-- 모든 컴포넌트가 자동으로 다크 모드로 전환됩니다 -->
</body>

<script>
  // JavaScript로 다크 모드 토글
  const toggleDarkMode = () => {
    const currentTheme = document.body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.body.setAttribute('data-theme', newTheme);
  };
</script>
```

---

## 📱 반응형 브레이크포인트

| 사이즈 | 최소 너비 |
|--------|-----------|
| xs | 0px |
| sm | 576px |
| md | 768px |
| lg | 992px |
| xl | 1200px |
| xxl | 1400px |

---

## 🔧 개발

### 빌드
```bash
# CSS + JS 빌드
npm run build

# CSS만 빌드
npm run build:css

# JS만 빌드
npm run build:js
```

### 개발 모드 (Watch)
```bash
# CSS + JS 동시 감시
npm run dev

# CSS만 감시
npm run dev:css

# JS만 감시
npm run dev:js
```

### 로컬 테스트
```bash
# 1. 빌드
npm run build

# 2. 서버 실행 (프로젝트 루트에서)
python3 -m http.server 8001

# 3. 브라우저에서 접속
# http://localhost:8001/test/local-test.html
```

---

## 📂 빌드 출력

```
dist/
├── css/
│   └── dewp.min.css        # 압축된 CSS (152.8 kB)
└── js/
    └── dewp.min.js         # 압축된 JavaScript (40.7 kB)
```

---

## 🌐 CDN 링크

### unpkg
```
https://unpkg.com/designbase-wp-library@latest/dist/css/dewp.min.css
https://unpkg.com/designbase-wp-library@latest/dist/js/dewp.min.js
```

### jsDelivr
```
https://cdn.jsdelivr.net/npm/designbase-wp-library@latest/dist/css/dewp.min.css
https://cdn.jsdelivr.net/npm/designbase-wp-library@latest/dist/js/dewp.min.js
```

---

## 📚 문서

자세한 사용법과 예제는 다음 링크에서 확인하세요:

- 📖 **공식 문서**: https://designbasekorea.github.io/designbase-wp-library/
- 🎨 **라이브 데모**: https://designbasekorea.github.io/designbase-wp-library/
- 📦 **NPM**: https://www.npmjs.com/package/designbase-wp-library

---

## 🎯 전체 컴포넌트 목록

### Layout
- Header
- Section
- Sidebar
- Card
- List

### Navigation
- Tabs
- Breadcrumb
- Pagination
- Dropdown

### Forms
- Input
- Textarea
- Select
- Checkbox
- Radio
- Toggle
- Stepper
- Range Slider

### Feedback
- Toast
- Modal
- Notice
- Badge
- Spinner
- Progress
- Progress Step
- Empty State

### Interactive
- Accordion
- Drawer
- Popover
- Tooltip

### Display
- Table
- Stat
- Chip
- Divider

---

## 🔄 버전 히스토리

### v0.6.0 (최신)
- 🎨 THEME_GUIDE.md v0.1.16 기준 전체 변수 시스템 통일
- ✨ 새로운 변수 시스템 적용 (Surface, Border, Feedback, Interactive, Brand)
- 🗑️ 하드코딩된 색상 및 수동 다크모드 제거
- ♿ 접근성 개선

### v0.5.6
- 이전 안정 버전

전체 변경 이력은 [CHANGELOG.md](./CHANGELOG.md)를 참조하세요.

---

## 🤝 기여

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 라이선스

이 프로젝트는 MIT License를 따릅니다.

재배포 시 원저작권 고지와 라이선스 전문을 반드시 포함해 주세요.

---

## 📞 지원

- **이메일**: designbasekorea@gmail.com
- **Issues**: [GitHub Issues](https://github.com/designbasekorea/designbase-wp-library/issues)

---

## 🔗 관련 프로젝트

- [@designbasekorea/theme](https://www.npmjs.com/package/@designbasekorea/theme) - 디자인 토큰 시스템
- [@designbasekorea/icons-webfont](https://www.npmjs.com/package/@designbasekorea/icons-webfont) - 아이콘 시스템

---

**Made with ❤️ by DesignBase Korea**
