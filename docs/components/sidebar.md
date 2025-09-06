# Sidebar (사이드바)

워드프레스 관리자 페이지용 고정 사이드바입니다. 좌측 고정, 아래로 확장되는 메뉴, 그룹 구분선 등을 지원합니다.

## 구성
- 고정 컨테이너 `.dewp-sidebar`와 내부 `.dewp-sidebar-inner`
- 그룹: 제목 + 메뉴 리스트 `.dewp-sidebar-group`
- 메뉴 아이템: `.dewp-sidebar-menu-item` (하위 메뉴 보유 시 `.has-submenu`)
- 하위 메뉴: `.dewp-sidebar-submenu` (토글 시 `expanded` + max-height)

## 초기화
```ts
const sidebar = new window.DEWPSidebar({
  title: '설정',
  subtitle: '플러그인 관리',
  groups: [
    {
      id: 'general',
      title: '일반',
      items: [
        { id: 'dashboard', text: '대시보드', url: '#', isActive: true },
        { id: 'tools', text: '도구', hasSubmenu: true, submenu: [
          { id: 'import', text: '가져오기', url: '#' },
          { id: 'export', text: '내보내기', url: '#' },
        ]},
      ],
    },
  ],
  footerText: 'DesignBase'
});
```

## 동작
- 하위 메뉴가 있는 아이템 클릭 시 펼침/접힘(`aria-expanded`/`aria-hidden` 업데이트)
- 일반 메뉴 클릭 시 활성화 전환(`.is-active`)
- 모바일에서 토글하여 표시/숨김(`.is-open`)

## 메서드
```ts
sidebar.addDivider('general');                 // 그룹 구분선 추가
sidebar.addGroup({ id: 'adv', title: '고급', items: [] });
sidebar.addMenuItem('general', { id: 'new', text: '새 메뉴', url: '#' });
sidebar.removeMenuItem('general', 'new');
sidebar.updateConfig({ title: '설정(업데이트)' });
sidebar.getActiveItemId();
sidebar.getElement();
sidebar.openMobileSidebar();
sidebar.closeMobileSidebar();
sidebar.toggle();
sidebar.destroy();
```

## 접근성
- 하위 메뉴 토글 링크: `role="button"`, `aria-expanded`, `aria-controls` 설정
- 하위 메뉴 컨테이너: `id`, `aria-hidden` 유지

## 팁
- 관리자 테마와 함께 사용할 때는 `.dewp-sidebar` 레이어가 레이아웃을 차지하므로 메인 콘텐츠 레이어의 패딩/마진을 조절해 주세요.
