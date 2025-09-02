# DesignBase WordPress Library (DEWP)

워드프레스 플러그인용 재사용 가능한 프론트엔드 라이브러리입니다.

> **DEWP** - DesignBase WordPress Library의 약자로, `mcp-` 접두사를 `dewp-`로 변경한 최신 버전입니다.

## 🚀 특징

- **모듈화된 구조**: 핵심 기능과 전체 기능을 분리하여 필요한 만큼만 로드
- **체계적인 SCSS**: 변수, 믹스인, 컴포넌트를 체계적으로 구성
- **반응형 디자인**: 모바일 우선 접근법으로 모든 디바이스 지원
- **접근성 고려**: WCAG 가이드라인을 준수하는 컴포넌트
- **TypeScript 지원**: 완전한 타입 정의 제공

## 📦 설치

```bash
npm install designbase-wp-library
```

### CDN 사용

```html
<!-- CSS -->
<link rel="stylesheet" href="https://unpkg.com/designbase-wp-library@latest/dist/css/dewp.min.css">

<!-- JavaScript -->
<script src="https://unpkg.com/designbase-wp-library@latest/dist/js/dewp.min.js"></script>
```

## 🏗️ 프로젝트 구조

```
src/
├── js/
│   ├── common/          # 공통 JavaScript 모듈
│   │   ├── mcp-modal.js
│   │   ├── mcp-dropdown.js
│   │   └── mcp-toast.js
│   ├── frontend/        # 프론트엔드 전용 모듈
│   └── admin/           # 관리자 전용 모듈
├── styles/
│   └── scss/
│       ├── basic/       # 기본 스타일 (변수, 믹스인, 타이포그래피, 레이아웃)
│       ├── components/  # 재사용 가능한 컴포넌트
│       ├── common/      # 공통 컴포넌트 스타일
│       └── main.scss    # 메인 스타일시트
├── utils/
│   └── dom.ts          # DOM 유틸리티 함수
├── core.ts             # 핵심 모듈 (가벼운 버전)
└── index.ts            # 전체 기능 모듈
```

## 🎯 사용법

### JavaScript 사용

#### 브라우저에서 직접 사용
```html
<script src="dist/js/dewp.min.js"></script>
<script>
  // 전역 DEWP 객체 사용
  window.DEWP.showToast('안녕하세요!', 'success');
  
  // 모달 표시
  window.DEWP.showModal({
    title: '알림',
    content: '모달이 표시됩니다!',
    size: 'md'
  });
  
  // 확인 모달
  window.DEWP.showConfirmModal({
    title: '확인',
    message: '정말로 진행하시겠습니까?',
    onConfirm: () => console.log('확인됨'),
    onCancel: () => console.log('취소됨')
  });
</script>
```

#### 모듈 번들러 사용
```javascript
import { showToast, showModal, showConfirmModal } from 'designbase-wp-library';

// 토스트 표시
showToast('성공!', 'success');

// 모달 표시
showModal({
  title: '알림',
  content: '모달입니다!',
  size: 'lg'
});
```

### CSS 사용

```html
<link rel="stylesheet" href="dist/css/dewp.min.css">
```

## 🛠️ 개발

### 의존성 설치
```bash
npm install
```

### 개발 모드
```bash
# CSS와 JS 모두 감시 모드
npm run dev

# CSS만 감시 모드
npm run dev:css

# JS만 감시 모드
npm run dev:js
```

### 빌드
```bash
# 전체 빌드
npm run build

# CSS만 빌드
npm run build:css

# JS만 빌드
npm run build:js
```

## 📚 컴포넌트

### 기본 컴포넌트

#### 버튼
```html
<button class="btn btn-primary">Primary Button</button>
<button class="btn btn-outline-secondary">Outline Button</button>
<button class="btn btn-success btn-lg">Large Success Button</button>
```

#### 배지
```html
<span class="badge badge-primary">Primary</span>
<span class="badge badge-success badge-pill">Success</span>
<span class="badge badge-danger badge-ring"></span>
```

#### 그리드
```html
<div class="container">
  <div class="row">
    <div class="col-md-6">Left Column</div>
    <div class="col-md-6">Right Column</div>
  </div>
</div>
```

### 유틸리티 클래스

#### 간격
```html
<div class="p-3 m-2">패딩과 마진</div>
<div class="px-4 py-2">가로/세로 패딩</div>
```

#### 플렉스
```html
<div class="d-flex justify-between align-center">
  <span>Left</span>
  <span>Right</span>
</div>
```

#### 색상
```html
<p class="text-primary">Primary 텍스트</p>
<div class="bg-secondary">Secondary 배경</div>
```

## 🎨 SCSS 커스터마이징

### 변수 재정의
```scss
// _custom-variables.scss
$primary: #your-color;
$font-family-base: 'Your Font', sans-serif;

// main.scss
@import 'custom-variables';
@import 'basic/variables';
// ... 나머지 import
```

### 믹스인 사용
```scss
.my-component {
  @include flex-center;
  @include shadow(2);
  @include respond-to(md) {
    // 중간 화면 이상에서만 적용
  }
}
```

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
│   └── dewp.min.css     # 압축된 CSS
└── js/
    └── dewp.min.js      # 압축된 JavaScript
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

MIT License

## 🤝 기여

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 지원

문제가 있거나 질문이 있으시면 이슈를 생성해 주세요.
