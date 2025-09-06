# Breadcrumb (브레드크럼)

현재 위치를 계층적으로 표시하는 내비게이션입니다.

## 마크업
```html
<nav class="dewp-breadcrumb" aria-label="Breadcrumb">
  <ol>
    <li><a href="#">홈</a></li>
    <li><a href="#">설정</a></li>
    <li aria-current="page">일반</li>
  </ol>
</nav>
```

## 팁
- `aria-current="page"`는 현재 페이지에 적용합니다.
- 길어질 경우 마지막 항목 외에는 생략(...) 처리하는 UI를 고려할 수 있습니다.
