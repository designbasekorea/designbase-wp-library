# 설치 및 연결 가이드

## 📖 개요

DEWP 라이브러리를 프로젝트에 설치하고 연결하는 방법을 단계별로 설명합니다.

## 🚀 설치 방법

### 1. NPM을 통한 설치 (권장)

#### Node.js 프로젝트에 설치
```bash
# 프로덕션 의존성으로 설치
npm install designbase-wp-library

# 개발 의존성으로 설치
npm install --save-dev designbase-wp-library
```

#### Yarn을 사용하는 경우
```bash
yarn add designbase-wp-library
```

#### pnpm을 사용하는 경우
```bash
pnpm add designbase-wp-library
```

### 2. CDN을 통한 연결

#### 최신 버전 (권장)
```html
<!-- CSS -->
<link rel="stylesheet" href="https://unpkg.com/designbase-wp-library@latest/dist/css/dewp.min.css">

<!-- JavaScript -->
<script src="https://unpkg.com/designbase-wp-library@latest/dist/js/dewp.min.js"></script>
```

#### jsDelivr 최신 버전
```html
<!-- CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/designbase-wp-library@latest/dist/css/dewp.min.css">

<!-- JavaScript -->
<script src="https://cdn.jsdelivr.net/npm/designbase-wp-library@latest/dist/js/dewp.min.js"></script>
```

#### 특정 버전
```html
<!-- CSS -->
<link rel="stylesheet" href="https://unpkg.com/designbase-wp-library@0.4.0/dist/css/dewp.min.css">

<!-- JavaScript -->
<script src="https://unpkg.com/designbase-wp-library@0.4.0/dist/js/dewp.min.js"></script>
```

#### jsDelivr CDN (대안)
```html
<!-- CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/designbase-wp-library@0.4.0/dist/css/dewp.min.css">

<!-- JavaScript -->
<script src="https://cdn.jsdelivr.net/npm/designbase-wp-library@0.4.0/dist/js/dewp.min.js"></script>
```

### 3. 로컬 파일 다운로드

#### 직접 다운로드
1. [GitHub 릴리즈 페이지](https://github.com/designbasekorea/designbase-wp-library/releases)에서 최신 버전 다운로드
2. 압축 해제 후 `dist` 폴더를 프로젝트에 복사

#### 프로젝트 구조
```
your-project/
├── assets/
│   ├── css/
│   │   └── dewp.min.css
│   └── js/
│       └── dewp.min.js
├── index.html
└── ...
```

## 🔗 연결 방법

### 1. HTML 파일에 연결

#### 기본 HTML 템플릿
```html
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>DEWP 라이브러리 테스트</title>
  
  <!-- DEWP CSS 로드 -->
  <link rel="stylesheet" href="https://unpkg.com/designbase-wp-library@latest/dist/css/dewp.min.css">
</head>
<body>
  <!-- 페이지 콘텐츠 -->
  <div class="container">
    <h1>DEWP 라이브러리 테스트</h1>
    
    <!-- 버튼 컴포넌트 예시 -->
    <button class="dewp-btn dewp-btn-primary">Primary Button</button>
    <button class="dewp-btn dewp-btn-secondary">Secondary Button</button>
  </div>
  
  <!-- DEWP JavaScript 로드 -->
  <script src="https://unpkg.com/designbase-wp-library@latest/dist/js/dewp.min.js"></script>
  
  <script>
    // DEWP 라이브러리 로드 확인
    if (window.DEWP) {
      console.log('✅ DEWP 라이브러리가 성공적으로 로드되었습니다!');
      console.log('📋 사용 가능한 함수들:', Object.keys(window.DEWP));
    } else {
      console.error('❌ DEWP 라이브러리를 찾을 수 없습니다.');
    }
  </script>
</body>
</html>
```

### 2. WordPress 플러그인에 연결

#### 플러그인 메인 파일
```php
<?php
/**
 * Plugin Name: My Plugin with DEWP
 * Description: DEWP 라이브러리를 사용하는 플러그인
 * Version: 1.0.0
 * Author: Your Name
 */

// 보안 체크
if (!defined('ABSPATH')) {
    exit;
}

// DEWP 라이브러리 로드
function my_plugin_load_dewp() {
    // 관리자 페이지에서만 로드
    if (is_admin()) {
        // CSS 로드
        wp_enqueue_style(
            'dewp-library',
            'https://unpkg.com/designbase-wp-library@latest/dist/css/dewp.min.css',
            array(),
            null
        );
        
        // JavaScript 로드
        wp_enqueue_script(
            'dewp-library',
            'https://unpkg.com/designbase-wp-library@latest/dist/js/dewp.min.js',
            array(),
            null,
            true // footer에 로드
        );
    }
}
add_action('admin_enqueue_scripts', 'my_plugin_load_dewp');

// 플러그인 설정 페이지
function my_plugin_admin_page() {
    ?>
    <div class="wrap">
        <h1>My Plugin Settings</h1>
        
        <div class="dewp-section">
            <div class="dewp-section-header">
                <h3 class="dewp-section-title">일반 설정</h3>
            </div>
            <div class="dewp-section-content">
                <form method="post" action="options.php">
                    <?php settings_fields('my_plugin_options'); ?>
                    <div class="dewp-form-group">
                        <label class="dewp-form-label">플러그인 이름</label>
                        <input type="text" class="dewp-form-input" name="my_plugin_name" value="<?php echo esc_attr(get_option('my_plugin_name')); ?>">
                    </div>
                    <button type="submit" class="dewp-btn dewp-btn-primary">설정 저장</button>
                </form>
            </div>
        </div>
    </div>
    
    <script>
    // DEWP 라이브러리 초기화
    document.addEventListener('DOMContentLoaded', function() {
        if (window.DEWP) {
            console.log('DEWP 라이브러리가 WordPress에 로드되었습니다!');
        }
    });
    </script>
    <?php
}
```

### 3. WordPress 테마에 연결

#### functions.php
```php
<?php
// DEWP 라이브러리 로드
function my_theme_load_dewp() {
    // 관리자 페이지에서만 로드
    if (is_admin()) {
        wp_enqueue_style(
            'dewp-library',
            'https://unpkg.com/designbase-wp-library@latest/dist/css/dewp.min.css',
            array(),
            null
        );
        
        wp_enqueue_script(
            'dewp-library',
            'https://unpkg.com/designbase-wp-library@latest/dist/js/dewp.min.js',
            array(),
            null,
            true
        );
    }
}
add_action('admin_enqueue_scripts', 'my_theme_load_dewp');

// 프론트엔드에서도 로드하려면
function my_theme_load_dewp_frontend() {
    wp_enqueue_style(
        'dewp-library',
        'https://unpkg.com/designbase-wp-library@0.3.0/dist/css/dewp.min.css',
        array(),
        '0.3.0'
    );
    
    wp_enqueue_script(
        'dewp-library',
        'https://unpkg.com/designbase-wp-library@0.3.0/dist/js/dewp.min.js',
        array(),
        '0.3.0',
        true
    );
}
add_action('wp_enqueue_scripts', 'my_theme_load_dewp_frontend');
```

## 🔧 빌드 도구와 함께 사용

### 1. Webpack과 함께 사용

#### webpack.config.js
```javascript
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    alias: {
      '@dewp': path.resolve(__dirname, 'node_modules/designbase-wp-library'),
    },
  },
};
```

#### src/index.js
```javascript
// DEWP CSS 임포트
import '@dewp/dist/css/dewp.min.css';

// DEWP JavaScript는 전역으로 로드되므로 별도 임포트 불필요
console.log('DEWP CSS가 Webpack을 통해 로드되었습니다!');
```

### 2. Vite와 함께 사용

#### vite.config.js
```javascript
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      external: ['designbase-wp-library'],
    },
  },
});
```

#### index.html
```html
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Vite + DEWP</title>
</head>
<body>
  <div id="app"></div>
  
  <!-- DEWP 라이브러리 로드 -->
  <script src="https://unpkg.com/designbase-wp-library@latest/dist/js/dewp.min.js"></script>
  <script type="module" src="/src/main.js"></script>
</body>
</html>
```

### 3. Create React App과 함께 사용

#### public/index.html
```html
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>React + DEWP</title>
  
  <!-- DEWP CSS -->
  <link rel="stylesheet" href="https://unpkg.com/designbase-wp-library@latest/dist/css/dewp.min.css">
</head>
<body>
  <div id="root"></div>
  
  <!-- DEWP JavaScript -->
  <script src="https://unpkg.com/designbase-wp-library@latest/dist/js/dewp.min.js"></script>

## 🆕 최신 버전 사용 요약

- npm: `npm install designbase-wp-library@latest`
- unpkg: `https://unpkg.com/designbase-wp-library@latest/dist/{css|js}/dewp.min.{css|js}`
- jsDelivr: `https://cdn.jsdelivr.net/npm/designbase-wp-library@latest/dist/{css|js}/dewp.min.{css|js}`

주의: 프로덕션에서는 예기치 않은 변경을 피하려면 고정 버전(예: `@0.4.0`)을 권장합니다. 개발/프리뷰 환경에는 `@latest`가 편리합니다.
</body>
</html>
```

#### src/App.js
```jsx
import React, { useEffect } from 'react';

function App() {
  useEffect(() => {
    // DEWP 라이브러리 확인
    if (window.DEWP) {
      console.log('DEWP 라이브러리가 React 앱에 로드되었습니다!');
    }
  }, []);

  return (
    <div className="App">
      <h1>React + DEWP 라이브러리</h1>
      
      {/* DEWP 컴포넌트 사용 */}
      <button className="dewp-btn dewp-btn-primary">Primary Button</button>
      <button className="dewp-btn dewp-btn-secondary">Secondary Button</button>
    </div>
  );
}

export default App;
```

## 📱 모바일 및 반응형 고려사항

### 1. 뷰포트 설정
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
```

### 2. 터치 디바이스 지원
```css
/* 터치 디바이스에서 버튼 크기 최적화 */
@media (max-width: 768px) {
  .dewp-btn {
    min-height: 44px; /* iOS 권장 최소 터치 크기 */
  }
}
```

## 🔍 연결 확인 및 디버깅

### 1. 브라우저 개발자 도구로 확인

#### Console 탭
```javascript
// DEWP 객체 존재 확인
console.log('DEWP 객체:', window.DEWP);

// 사용 가능한 함수들 확인
console.log('DEWP 함수들:', Object.keys(window.DEWP));

// 특정 함수 존재 확인
console.log('initTabs 함수:', typeof window.DEWP?.initTabs);
```

#### Network 탭
- CSS와 JavaScript 파일이 성공적으로 로드되었는지 확인
- HTTP 상태 코드가 200인지 확인
- 파일 크기가 예상과 일치하는지 확인

#### Elements 탭
- CSS 클래스가 올바르게 적용되었는지 확인
- 스타일이 제대로 로드되었는지 확인

### 2. 일반적인 문제 해결

#### DEWP 객체를 찾을 수 없음
```javascript
// 문제 진단
console.log('window 객체:', window);
console.log('DEWP 속성:', window.DEWP);
console.log('스크립트 로드 상태:', document.readyState);

// 해결 방법
document.addEventListener('DOMContentLoaded', function() {
  if (window.DEWP) {
    console.log('DEWP 로드됨');
  } else {
    console.error('DEWP 로드 실패');
  }
});
```

#### CSS가 적용되지 않음
```css
/* CSS 우선순위 문제 해결 */
.dewp-btn.dewp-btn-primary {
  background-color: #007cba !important;
  color: #ffffff !important;
}
```

#### JavaScript 오류 발생
```javascript
// 오류 처리
try {
  if (window.DEWP && window.DEWP.initTabs) {
    window.DEWP.initTabs(container, options);
  } else {
    console.warn('DEWP.initTabs 함수를 찾을 수 없습니다.');
  }
} catch (error) {
  console.error('DEWP 초기화 오류:', error);
}
```

## 📋 체크리스트

### 설치 전 확인사항
- [ ] Node.js 버전 확인 (v14+ 권장)
- [ ] 프로젝트 타입 결정 (WordPress, React, Vue 등)
- [ ] 빌드 도구 결정 (Webpack, Vite, CRA 등)

### 설치 후 확인사항
- [ ] CSS 파일이 로드되었는지 확인
- [ ] JavaScript 파일이 로드되었는지 확인
- [ ] `window.DEWP` 객체가 존재하는지 확인
- [ ] 기본 컴포넌트가 렌더링되는지 확인
- [ ] 콘솔에 오류가 없는지 확인

### 성능 최적화 확인사항
- [ ] CSS/JS 파일이 압축되어 있는지 확인
- [ ] 불필요한 중복 로드가 없는지 확인
- [ ] CDN 사용 시 지리적 위치 고려
- [ ] 캐싱 설정 확인

---

**다음 단계**: [컴포넌트 사용법](./README.md#컴포넌트-가이드) 또는 [문제 해결](./README.md#문제-해결)
