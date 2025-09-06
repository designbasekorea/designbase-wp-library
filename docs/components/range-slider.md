# Range Slider (레인지 슬라이더)

단일/듀얼 범위 선택을 지원합니다. 트랙 높이/썸 크기/수직 보정 등을 CSS 변수로 제어할 수 있습니다.

## 단일 슬라이더
```html
<div class="dewp-range">
  <label class="dewp-range-label">값: <span id="r1v">50</span></label>
  <div class="dewp-range-track" style="--dewp-track-size: 4px; --dewp-thumb-size: 18px; --dewp-thumb-shift-y: 0px;">
    <input type="range" min="0" max="100" value="50" oninput="r1v.textContent=this.value">
  </div>
</div>
```

## 듀얼 슬라이더
```html
<div class="dewp-range dewp-range--dual" style="--dewp-track-size: 4px; --dewp-thumb-size: 18px;">
  <label class="dewp-range-label">범위: <span id="r2v">20–80</span></label>
  <div class="dewp-range-dual-wrap">
    <input id="r2a" type="range" min="0" max="100" value="20" oninput="updateDual()">
    <input id="r2b" type="range" min="0" max="100" value="80" oninput="updateDual()">
  </div>
</div>
<script>
function updateDual(){
  const a = Math.min(+r2a.value, +r2b.value);
  const b = Math.max(+r2a.value, +r2b.value);
  r2v.textContent = `${a}–${b}`;
  const wrap = r2a.closest('.dewp-range');
  wrap?.style.setProperty('--dewp-range-start', a + '%');
  wrap?.style.setProperty('--dewp-range-end', b + '%');
}
updateDual();
</script>
```

## CSS 변수
- `--dewp-track-size`: 트랙 두께(px)
- `--dewp-thumb-size`: 썸(조절 원) 지름(px)
- `--dewp-thumb-shift-y`: 썸 수직 미세 보정(px)
- `--dewp-range-start`/`--dewp-range-end`: 듀얼 슬라이더 채움 시작/끝 지점(%)

## 팁
- 브라우저별 렌더링 차이를 `--dewp-thumb-shift-y`로 보정할 수 있습니다.
- 단일 슬라이더 채움 색은 내부 그래디언트로 표현되며, 듀얼 슬라이더는 두 입력의 값으로 채움 범위를 계산합니다.
