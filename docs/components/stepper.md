# Stepper (스테퍼)

숫자 입력 증가/감소를 편리하게 제어하는 컴포넌트입니다.

## 마크업
```html
<div class="dewp-stepper">
  <button class="dewp-stepper-decrement" type="button">-</button>
  <input class="dewp-stepper-input" type="number" value="0">
  <button class="dewp-stepper-increment" type="button">+</button>
</div>
```

## 초기화
```ts
// 특정 루트 요소에 대해 초기화
const root = document.querySelector('.dewp-stepper');
window.DEWP.initStepper(root, {
  min: 0,
  max: 10,
  step: 1,
  value: 2,
  onChange: (v) => console.log('value:', v),
});
```

## 옵션
- `min`/`max`: 최소/최대값
- `step`: 증감 단위
- `value`: 초기 값
- `onChange(value: number)`: 값 변경 콜백

## 동작
- 버튼 클릭/직접 입력 모두 지원
- `min/max` 경계에서 버튼이 자동 비활성화
