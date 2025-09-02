# DEWP 라이브러리 예시 모음

이 폴더는 DesignBase WordPress Library (DEWP)의 다양한 사용 예시를 제공합니다.

## 📁 폴더 구조

```
examples/
├── README.md                    # 이 파일 (사용법 설명)
├── simple-test.html            # 🧪 간단한 기능 테스트 (개발자용)
├── dewp-test.html              # 🚀 전체 기능 테스트 (사용자용)
├── components.html              # 🎨 컴포넌트 예시 (디자이너용)
├── js-examples/                # 📜 JavaScript 사용 예시
│   ├── basic-usage.html        # 기본 사용법
│   ├── advanced-features.html  # 고급 기능
│   └── real-world.html         # 실제 워드프레스 플러그인 예시
└── css-examples/               # 🎨 CSS 스타일링 예시
    ├── custom-themes.html      # 커스텀 테마
    └── responsive-design.html   # 반응형 디자인
```

## 🚀 빠른 시작

### 1. 간단한 테스트
```html
<!-- 기본 기능 테스트 -->
<script src="../dist/js/dewp.min.js"></script>
<script>
  // 토스트 알림
  window.DEWP.DEWP.showToast('안녕하세요!', 'success');
  
  // 모달 표시
  window.DEWP.DEWP.showModal({
    title: '제목',
    content: '내용'
  });
</script>
```

### 2. 전체 기능 테스트
- `dewp-test.html` - 모든 기능을 체계적으로 테스트
- `components.html` - UI 컴포넌트 예시

## 📚 사용법 가이드

### 토스트 알림
```javascript
// 기본 토스트
window.DEWP.DEWP.showToast('메시지');

// 타입별 토스트
window.DEWP.DEWP.showSuccessToast('성공!');
window.DEWP.DEWP.showErrorToast('오류!');
window.DEWP.DEWP.showWarningToast('경고!');
window.DEWP.DEWP.showInfoToast('정보!');
```

### 모달
```javascript
// 기본 모달
window.DEWP.DEWP.showModal({
  title: '제목',
  content: '내용'
});

// 확인 모달
window.DEWP.DEWP.showConfirmModal({
  title: '확인',
  message: '정말 삭제하시겠습니까?',
  onConfirm: () => console.log('확인됨'),
  onCancel: () => console.log('취소됨')
});
```

### 드롭다운
```javascript
// 드롭다운 생성
const dropdownId = window.DEWP.DEWP.createDropdown({
  trigger: document.querySelector('.dropdown-trigger'),
  content: '<div>메뉴 내용</div>',
  position: 'bottom'
});

// 드롭다운 제어
window.DEWP.DEWP.showDropdown(dropdownId);
window.DEWP.DEWP.hideDropdown(dropdownId);
window.DEWP.DEWP.toggleDropdown(dropdownId);
```

### DOM 유틸리티
```javascript
// 요소 선택
const element = window.DEWP.DEWP.qs('.my-class');
const elements = window.DEWP.DEWP.qsa('.my-class');

// 클래스 조작
window.DEWP.DEWP.addClass(element, 'active');
window.DEWP.DEWP.removeClass(element, 'inactive');
window.DEWP.DEWP.toggleClass(element, 'visible');

// 이벤트 처리
window.DEWP.DEWP.on(element, 'click', () => console.log('클릭됨'));
```

## 🎨 CSS 스타일링

DEWP 라이브러리는 기본 스타일을 제공하지만, 필요에 따라 커스터마이징할 수 있습니다.

```html
<link rel="stylesheet" href="../dist/css/dewp.min.css">
```

## 🔧 개발자 도구

### 디버깅
브라우저 콘솔에서 다음을 실행하여 라이브러리 상태를 확인할 수 있습니다:

```javascript
console.log('DEWP 객체:', window.DEWP);
console.log('사용 가능한 함수들:', Object.keys(window.DEWP.DEWP));
```

### 라이브러리 정보
```javascript
console.log('버전:', window.DEWP.DEWP.version);
console.log('정보:', window.DEWP.DEWP.info);
```

## 📝 참고사항

- 모든 함수는 `window.DEWP.DEWP` 네임스페이스 하에 있습니다
- TypeScript 지원을 위한 타입 정의가 포함되어 있습니다
- 워드프레스 플러그인과 함께 사용할 수 있도록 설계되었습니다

## 🆘 문제 해결

문제가 발생하면 다음을 확인하세요:

1. **파일 경로**: `../dist/js/dewp.min.js`가 올바른지 확인
2. **로드 순서**: HTML에서 스크립트가 올바른 순서로 로드되는지 확인
3. **콘솔 에러**: 브라우저 개발자 도구에서 에러 메시지 확인

---

더 자세한 정보는 프로젝트 루트의 `README.md`를 참조하세요.
