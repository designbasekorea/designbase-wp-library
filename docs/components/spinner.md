# Spinner (스피너)

로딩 상태를 표시하는 인디케이터입니다. 버튼/카드 등 어디서든 사용 가능합니다.

## 사용법
```html
<div class="dewp-spinner"></div>
<div class="dewp-spinner dewp-spinner-sm"></div>
<div class="dewp-spinner dewp-spinner-lg dewp-spinner-primary"></div>
```

## 사이즈
- `dewp-spinner-sm`
- `dewp-spinner-md` (기본)
- `dewp-spinner-lg`

## 색상(테마)
- `dewp-spinner-primary`
- `dewp-spinner-secondary`
- `dewp-spinner-success`
- `dewp-spinner-warning`
- `dewp-spinner-danger`
- `dewp-spinner-info`

## 버튼과 함께 사용
```html
<button class="dewp-btn dewp-btn-primary" disabled>
  <span class="dewp-spinner dewp-spinner-sm dewp-spinner-light"></span>
</button>
```

- 버튼 로딩 시 텍스트를 숨기고 스피너만 보이도록 처리하세요.
