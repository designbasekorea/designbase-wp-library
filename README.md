# DesignBase WordPress Library (DEWP)

워드프레스 플러그인용 재사용 가능한 프론트엔드 라이브러리입니다.

> **DEWP** - DesignBase WordPress Library의 약자로, `mcp-` 접두사를 `dewp-`로 변경한 최신 버전입니다.

## ✨ 특징

- **모듈화된 구조**: TypeScript로 작성된 컴포넌트 기반 아키텍처
- **체계적인 SCSS**: 변수, 믹스인, 컴포넌트를 체계적으로 구성
- **반응형 디자인**: 모바일 우선 접근법으로 모든 디바이스 지원
- **접근성 고려**: WCAG 가이드라인을 준수하는 컴포넌트
- **TypeScript 지원**: 완전한 타입 정의와 ES6+ 모듈 지원
- **WordPress 최적화**: 플러그인 개발에 특화된 컴포넌트

## 📦 설치

### 기본 설치
```bash
npm install designbase-wp-library
```

### 추가 기능 (선택사항)

#### npm 설치 방식
```bash
# 아이콘 시스템 사용시
npm install @designbasekorea/icons-webfont

# 테마 시스템 사용시  
npm install @designbasekorea/theme
```

#### CDN 방식 (권장)
```html
<!-- 아이콘 시스템 -->
<link rel="stylesheet" href="https://unpkg.com/@designbasekorea/icons-webfont@latest/dist/webfont/icons.css">

<!-- 테마 시스템 -->
<link rel="stylesheet" href="https://unpkg.com/@designbasekorea/theme@latest/dist/css/theme.css">
```

> **💡 팁**: CDN 방식을 사용하면 자동으로 최신 버전이 적용되며, 별도 설치나 업데이트가 필요 없습니다!

### 문서/데모 사이트

- 최신 문서와 라이브 데모: [DEWP Docs & Examples](https://designbasekorea.github.io/designbase-wp-library/)

### 로컬 테스트

로컬에서 라이브러리를 테스트하려면:

```bash
# 1. 라이브러리 빌드
npm run build

# 2. 로컬 서버 실행
python3 -m http.server 8000

# 3. 브라우저에서 테스트
# http://localhost:8000/test/local-test.html
```

> **💡 팁**: `test/` 폴더는 `.gitignore`에 포함되어 있어 Git에 커밋되지 않습니다.

> **🔒 보안**: `src/` 폴더(소스 코드)도 `.gitignore`에 포함되어 있어 핵심 코드가 공개되지 않습니다.

### CDN 사용

#### 기본 DEWP 라이브러리
```html
<!-- CSS -->
<link rel="stylesheet" href="https://unpkg.com/designbase-wp-library@latest/dist/css/dewp.min.css">

<!-- JavaScript -->
<script src="https://unpkg.com/designbase-wp-library@latest/dist/js/dewp.min.js"></script>
```

#### 아이콘 시스템 (선택사항)
```html
<!-- 아이콘 CSS -->
<link rel="stylesheet" href="https://unpkg.com/@designbasekorea/icons-webfont@latest/dist/webfont/icons.css">
```

#### 테마 시스템 (선택사항)
```html
<!-- 테마 CSS -->
<link rel="stylesheet" href="https://unpkg.com/@designbasekorea/theme@latest/dist/css/theme.css">
```

#### 전체 패키지 (권장)
```html
<!-- 테마 시스템 -->
<link rel="stylesheet" href="https://unpkg.com/@designbasekorea/theme@latest/dist/css/theme.css">

<!-- 아이콘 시스템 -->
<link rel="stylesheet" href="https://unpkg.com/@designbasekorea/icons-webfont@latest/dist/webfont/icons.css">

<!-- DEWP 라이브러리 -->
<link rel="stylesheet" href="https://unpkg.com/designbase-wp-library@latest/dist/css/dewp.min.css">
<script src="https://unpkg.com/designbase-wp-library@latest/dist/js/dewp.min.js"></script>
```

## 🔗 빠른 시작 링크

- 문서/예제: https://designbasekorea.github.io/designbase-wp-library/
- npm: `npm i designbase-wp-library@latest`
- unpkg: `https://unpkg.com/designbase-wp-library@latest/dist/{css|js}/dewp.min.{css|js}`
- jsDelivr: `https://cdn.jsdelivr.net/npm/designbase-wp-library@latest/dist/{css|js}/dewp.min.{css|js}`

## 🎯 사용법

### JavaScript 사용

#### 브라우저에서 직접 사용
```html
<script src="https://unpkg.com/designbase-wp-library@latest/dist/js/dewp.min.js"></script>
<script>
  // 전역 DEWP 객체 사용
  window.DEWP.showToast('안녕하세요!', 'success', 3000, 'md');
  
  // 모달 표시
  window.DEWP.showModal({ title: '알림', content: '모달이 표시됩니다!', size: 'md' });
</script>
```

#### 모듈 번들러 사용
```javascript
import { showToast, showModal, showConfirmModal } from 'designbase-wp-library';

// 토스트 표시
showToast('성공!', 'success');

// 모달 표시
showModal({ title: '제목', content: '내용', size: 'lg' });

// 확인 모달
showConfirmModal({ message: '정말 삭제하시겠습니까?' });
```

### CSS 사용

```html
<link rel="stylesheet" href="https://unpkg.com/designbase-wp-library@latest/dist/css/dewp.min.css">
```

## 🧩 컴포넌트

### 1. 토스트 알림 (Toast)
```javascript
// 기본 토스트
window.DEWP.showToast('메시지', 'success', 3000, 'md');

// 타입별 토스트 (크기 옵션 포함)
window.DEWP.showSuccessToast('성공 메시지', 3000, 'lg');
window.DEWP.showWarningToast('경고 메시지', 5000, 'sm');
window.DEWP.showErrorToast('오류 메시지', 4000, 'md');
window.DEWP.showInfoToast('정보 메시지', 3000, 'sm');
```

### 2. 모달 (Modal)
```javascript
// 기본 모달
window.DEWP.showModal({ title: '제목', content: '내용' });

// 확인 모달
window.DEWP.showConfirmModal({ message: '정말 삭제하시겠습니까?' });

// 모달 생성 및 제어
const modalId = window.DEWP.createModal({ title: '제목', content: '내용' });
window.DEWP.openModal(modalId);
window.DEWP.closeModal(modalId);
```

### 3. 드롭다운 (Dropdown)
```html
<div class="dewp-dropdown">
  <button class="dewp-dropdown-toggle">
    선택하세요
  </button>
  <div class="dewp-dropdown-menu">
    <div class="dewp-dropdown-item" data-value="option1">옵션 1</div>
    <div class="dewp-dropdown-item" data-value="option2">옵션 2</div>
  </div>
</div>

<script>
// 드롭다운 자동 초기화 (전역)
window.DEWP.autoInitializeDropdowns();
</script>
```

### 4. 탭 (Tabs)
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
// 탭 초기화
window.DEWP.initTabs();

// 특정 탭 활성화
window.DEWP.activateTab('tab2');

// 활성 탭 정보 가져오기
const activeTab = window.DEWP.getActiveTab('.dewp-tabs');
</script>
```

### 5. 헤더 컴포넌트
```html
<div class="dewp-header">
  <div class="dewp-header-content">
    <h1 class="dewp-header-title">플러그인 설정</h1>
    <p class="dewp-header-description">플러그인의 기본 설정을 관리할 수 있습니다.</p>
  </div>
  <div class="dewp-header-actions">
    <button class="dewp-header-btn dewp-btn-primary">설정 저장</button>
  </div>
</div>
```

### 6. 섹션 컴포넌트
```html
<div class="dewp-section">
  <div class="dewp-section-header">
    <div class="dewp-section-title-area">
      <h3 class="dewp-section-title">일반 설정</h3>
      <p class="dewp-section-description">플러그인의 기본 동작을 설정합니다.</p>
    </div>
    <div class="dewp-section-actions">
      <button class="dewp-section-btn dewp-btn-primary">저장</button>
    </div>
  </div>
  <div class="dewp-section-content">
    <!-- 폼 요소들 -->
  </div>
</div>
```

### 7. Drawer 컴포넌트
```html
<!-- 기본 Drawer 구조 -->
<div class="dewp-drawer" id="my-drawer">
  <div class="dewp-drawer-header">
    <h3 class="dewp-drawer-title">제목</h3>
    <button class="dewp-drawer-close">
      <svg viewBox="0 0 24 24">
        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
      </svg>
    </button>
  </div>
  <div class="dewp-drawer-content">
    <!-- Drawer 내용 -->
  </div>
</div>

<script>
// Drawer 생성 및 제어
const drawerId = window.DEWP.createDrawer({
  target: '#my-drawer',
  overlay: true,
  closeOnEscape: true
});

window.DEWP.openDrawer(drawerId);
window.DEWP.closeDrawer(drawerId);
window.DEWP.toggleDrawer(drawerId);
</script>
```

### 8. DOM 유틸리티
```javascript
// DOM 요소 선택
const element = window.DEWP.qs('.my-class');
const elements = window.DEWP.qsa('.my-class');

// 클래스 조작
window.DEWP.addClass(element, 'active');
window.DEWP.removeClass(element, 'inactive');
window.DEWP.toggleClass(element, 'visible');

// 텍스트 및 HTML 설정
window.DEWP.setText(element, '새로운 텍스트');
window.DEWP.setHTML(element, '<strong>HTML</strong>');

// 이벤트 처리
window.DEWP.on(element, 'click', (e) => console.log('클릭됨'));
window.DEWP.off(element, 'click');

// DOM 상태 확인
if (window.DEWP.isDOMReady()) {
  // DOM이 준비됨
}

window.DEWP.onDOMReady(() => {
  // DOM 로드 완료 후 실행
});
```

## 🎨 SCSS 컴포넌트

### 기본 컴포넌트

#### 버튼
```html
<button class="dewp-btn dewp-btn-primary">Primary Button</button>
<button class="dewp-btn dewp-btn-outline-secondary">Outline Button</button>
<button class="dewp-btn dewp-btn-success dewp-btn-lg">Large Success Button</button>
```

#### 배지
```html
<span class="dewp-badge dewp-badge-primary">Primary</span>
<span class="dewp-badge dewp-badge-success dewp-badge-pill">Success</span>
<span class="dewp-badge dewp-badge-danger dewp-badge-ring">Danger</span>
```

#### 폼
```html
<div class="dewp-form-group">
  <label class="dewp-form-label">이름</label>
  <input type="text" class="dewp-form-input" placeholder="이름을 입력하세요">
</div>
```

#### 테이블
```html
<table class="dewp-table">
  <thead>
    <tr>
      <th>제목</th>
      <th>설명</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>내용 1</td>
      <td>설명 1</td>
    </tr>
  </tbody>
</table>
```

#### 페이지네이션
```html
<div class="dewp-pagination">
  <div class="dewp-page-item">
    <a href="#" class="dewp-page-link">1</a>
  </div>
  <div class="dewp-page-item active">
    <a href="#" class="dewp-page-link">2</a>
  </div>
  <div class="dewp-page-item">
    <a href="#" class="dewp-page-link">3</a>
  </div>
</div>
```

#### 토글
```html
<!-- 기본 토글 -->
<label class="dewp-toggle-label">
  <input type="checkbox" class="dewp-toggle-input">
  <span class="dewp-toggle-slider"></span>
  <span class="dewp-toggle-text">기본 토글</span>
</label>

<!-- 크기 변형 -->
<label class="dewp-toggle-label dewp-toggle-sm">
  <input type="checkbox" class="dewp-toggle-input">
  <span class="dewp-toggle-slider"></span>
  <span class="dewp-toggle-text">작은 토글</span>
</label>

<label class="dewp-toggle-label dewp-toggle-lg">
  <input type="checkbox" class="dewp-toggle-input">
  <span class="dewp-toggle-slider"></span>
  <span class="dewp-toggle-text">큰 토글</span>
</label>
```

#### 알림
```html
<div class="dewp-notice dewp-notice-success">
  <p>성공 메시지입니다.</p>
</div>

<div class="dewp-notice dewp-notice-warning">
  <p>경고 메시지입니다.</p>
</div>
```

<!-- 유틸리티 클래스 섹션은 문서 사이트에서 관리합니다. -->

<!-- SCSS 커스터마이징 가이드는 문서 사이트로 이관했습니다. -->

## 📱 반응형 브레이크포인트

- **xs**: 0px 이상
- **sm**: 576px 이상
- **md**: 768px 이상
- **lg**: 992px 이상
- **xl**: 1200px 이상
- **xxl**: 1400px 이상

## 🔧 빌드 출력

```
dist/
├── css/
│   └── dewp.min.css     # 압축된 CSS (80.8kB)
└── js/
    └── dewp.min.js      # 압축된 JavaScript (16.0kB)
```

## 🚀 배포

### 프로덕션 빌드
```bash
npm run build:prod
```

### 배포 전 미리보기
```bash
npm run preview
```

### npm에 배포
```bash
npm run release
```

### 수동 배포
```bash
npm run build:prod
npm publish
```

## 📄 라이선스

이 프로젝트는 MIT License를 따릅니다. 재배포 시 원저작권 고지와 라이선스 전문을 반드시 포함해 주세요(출처 표기).

## 🤝 기여

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 지원

문제가 있거나 질문이 있으시면 이슈를 생성해 주세요.

- 이메일: designbasekorea@gmail.com

## 🔗 관련 링크

- [npm 패키지](https://www.npmjs.com/package/designbase-wp-library)
- [CDN (unpkg)](https://unpkg.com/designbase-wp-library@latest/)
- [CDN (jsDelivr)](https://cdn.jsdelivr.net/npm/designbase-wp-library@latest/)
