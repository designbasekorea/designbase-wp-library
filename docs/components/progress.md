# Progress (프로그레스)

진행 상태를 보여주는 막대형 컴포넌트입니다.

## 마크업
```html
<div class="dewp-progress">
  <div class="dewp-progress-bar" style="width: 60%"></div>
</div>
```

## 애니메이션 업데이트 예시
```html
<div class="dewp-progress"><div class="dewp-progress-bar" id="pb"></div></div>
<script>
let v = 0; const el = document.getElementById('pb');
const t = setInterval(() => {
  v = Math.min(100, v + 5);
  el.style.width = v + '%';
  if (v === 100) clearInterval(t);
}, 200);
</script>
```

## 팁
- 색 변형이 필요하면 보조 클래스(예: `.dewp-progress-success`)를 추가해 확장하세요.
