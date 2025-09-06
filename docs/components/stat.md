# Stat (스탯)

핵심 지표를 카드 형태로 보여줍니다. 아이콘/라벨/값/증감 등 요소를 포함합니다.

## 마크업 예시
```html
<div class="dewp-stat">
  <div class="dewp-stat-icon">📈</div>
  <div class="dewp-stat-content">
    <div class="dewp-stat-label">주간 사용자</div>
    <div class="dewp-stat-value">12,340</div>
    <div class="dewp-stat-trend is-up">+8.4%</div>
  </div>
</div>
```

## 변형
- 아이콘 형태: 원형 배경 아이콘(`.dewp-stat-icon`)
- 트렌드: `.is-up` / `.is-down`

## 팁
- 그리드로 여러 스탯을 배치해 대시보드 구성에 활용하세요.
