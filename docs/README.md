# DEWP 라이브러리 사용법 가이드

## 📖 개요

DEWP(DesignBase WordPress) 라이브러리는 WordPress 관리자 페이지와 플러그인을 위한 현대적이고 사용하기 쉬운 UI 컴포넌트 라이브러리입니다.

## 🚀 빠른 시작

### 설치

#### NPM을 통한 설치
```bash
npm install designbase-wp-library
```

#### CDN을 통한 연결
```html
<!-- CSS -->
<link rel="stylesheet" href="https://unpkg.com/designbase-wp-library@0.3.0/dist/css/dewp.min.css">

<!-- JavaScript -->
<script src="https://unpkg.com/designbase-wp-library@0.3.0/dist/js/dewp.min.js"></script>
```

### 기본 사용법
```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="https://unpkg.com/designbase-wp-library@0.3.0/dist/css/dewp.min.css">
</head>
<body>
  <!-- 버튼 컴포넌트 예시 -->
  <button class="dewp-btn dewp-btn-primary">Primary Button</button>
  
  <script src="https://unpkg.com/designbase-wp-library@0.3.0/dist/js/dewp.min.js"></script>
  <script>
    // DEWP 객체를 통해 컴포넌트 제어
    if (window.DEWP) {
      console.log('DEWP 라이브러리가 로드되었습니다!');
    }
  </script>
</body>
</html>
```

## 📚 컴포넌트 가이드

### 기본 컴포넌트
- [**버튼 (Button)**](./components/button.md) - 다양한 스타일과 상태의 버튼
- [**배지 (Badge)**](./components/badge.md) - 상태 표시 및 라벨링
- [**폼 (Form)**](./components/form.md) - 입력 필드, 체크박스, 라디오 버튼
- [**테이블 (Table)**](./components/table.md) - 데이터 표시용 테이블

### 인터랙티브 컴포넌트
- [**탭 (Tabs)**](./components/tabs.md) - 콘텐츠 분할 및 네비게이션
- [**아코디언 (Accordion)**](./components/accordion.md) - 접을 수 있는 콘텐츠 섹션
- [**드롭다운 (Dropdown)**](./components/dropdown.md) - 선택 메뉴
- [**모달 (Modal)**](./components/modal.md) - 팝업 다이얼로그
- [**토스트 (Toast)**](./components/toast.md) - 알림 메시지

### 레이아웃 컴포넌트
- [**헤더 (Header)**](./components/header.md) - 페이지 제목 및 액션
- [**섹션 (Section)**](./components/section.md) - 콘텐츠 그룹화
- [**사이드바 (Sidebar)**](./components/sidebar.md) - 고정 위치 네비게이션
- [**드로어 (Drawer)**](./components/drawer.md) - 슬라이드 아웃 패널

### 유틸리티 컴포넌트
- [**알림 (Notice)**](./components/notice.md) - 정보, 경고, 오류 메시지
- [**페이지네이션 (Pagination)**](./components/pagination.md) - 페이지 네비게이션
- [**빈 상태 (Empty State)**](./components/empty-state.md) - 데이터 없음 상태
- [**토글 (Toggle)**](./components/toggle.md) - 스위치 형태의 입력

## 🎨 테마 및 커스터마이징

### 기본 테마
- **라이트 테마**: 기본 테마
- **다크 테마**: `dewp-theme-dark` 클래스로 적용

### 색상 변수
```scss
// 주요 색상
$primary: #007cba;
$secondary: #6c757d;
$success: #28a745;
$warning: #ffc107;
$danger: #dc3545;
$info: #17a2b8;
```

### 크기 변수
```scss
// 컴포넌트 크기
$spacing-xs: 4px;
$spacing-s: 8px;
$spacing-m: 16px;
$spacing-l: 24px;
$spacing-xl: 32px;
```

## 🔧 JavaScript API

### 전역 객체
```javascript
window.DEWP // 모든 컴포넌트 함수들이 포함된 객체
```

### 주요 함수들
```javascript
// 컴포넌트 초기화
DEWP.initTabs(container, options)
DEWP.initAccordion(container, options)
DEWP.createModal(options)
DEWP.createDrawer(options)
DEWP.createSidebar(config)

// 컴포넌트 제어
DEWP.switchTab(containerId, tabId)
DEWP.toggleAccordionItem(containerId, itemId)
DEWP.showModal(modalId)
DEWP.openDrawer(drawerId)
DEWP.showToast(message, type, duration, size)
```

## 📱 반응형 디자인

### 브레이크포인트
```scss
$breakpoint-sm: 576px;
$breakpoint-md: 768px;
$breakpoint-lg: 992px;
$breakpoint-xl: 1200px;
```

### 모바일 최적화
- 모든 컴포넌트는 모바일 친화적
- 터치 제스처 지원
- 반응형 그리드 시스템

## 🐛 문제 해결

### 일반적인 문제들
1. **DEWP 객체를 찾을 수 없음**
   - JavaScript 파일이 CSS 파일보다 먼저 로드되었는지 확인
   - CDN 링크가 올바른지 확인

2. **스타일이 적용되지 않음**
   - CSS 파일 경로 확인
   - CSS 클래스명이 올바른지 확인

3. **컴포넌트가 동작하지 않음**
   - 초기화 함수 호출 확인
   - HTML 구조가 올바른지 확인

### 디버깅 팁
```javascript
// DEWP 객체 상태 확인
console.log('DEWP 객체:', window.DEWP);
console.log('사용 가능한 함수들:', Object.keys(window.DEWP));

// 컴포넌트 초기화 상태 확인
console.log('탭 컨테이너:', document.querySelectorAll('[data-tabs]'));
console.log('아코디언 컨테이너:', document.querySelectorAll('[data-accordion]'));
```

## 📄 라이선스

이 라이브러리는 MIT 라이선스 하에 배포됩니다.

## 🤝 기여하기

버그 리포트, 기능 요청, 풀 리퀘스트를 환영합니다!

---

**버전**: 0.3.0  
**최종 업데이트**: 2024년 1월  
**호환성**: WordPress 5.0+, 모던 브라우저
