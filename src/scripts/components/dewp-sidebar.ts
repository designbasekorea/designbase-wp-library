/**
 * DEWP Sidebar Component
 * 워드프레스 관리자 페이지용 고정 사이드바
 */

export interface SidebarMenuItem {
    id: string;
    text: string;
    icon?: string;
    url?: string;
    isActive?: boolean;
    hasSubmenu?: boolean;
    submenu?: SidebarMenuItem[];
}

export interface SidebarGroup {
    id: string;
    title?: string;
    items: SidebarMenuItem[];
}

export interface SidebarConfig {
    title: string;
    subtitle?: string;
    groups: SidebarGroup[];
    footerText?: string;
}

export class DEWPSidebar {
    private sidebar: HTMLElement | null = null;
    private config: SidebarConfig;
    private activeItemId: string | null = null;
    private isCollapsed: boolean = false;

    constructor(config: SidebarConfig) {
        this.config = config;
        this.init();
    }

    /**
     * 사이드바 초기화
     */
    private init(): void {
        this.createSidebar();
        this.render();
        this.bindEvents();
        this.setActiveItem();
    }

    /**
     * 사이드바 DOM 요소 생성
     */
    private createSidebar(): void {
        // 기존 사이드바가 있다면 제거
        const existingSidebar = document.querySelector('.dewp-sidebar');
        if (existingSidebar) {
            existingSidebar.remove();
        }

        // 사이드바 컨테이너 생성
        this.sidebar = document.createElement('div');
        // 기본 타입/포지션: wrapper + sticky
        this.sidebar.className = 'dewp-sidebar dewp-sidebar--wrapper is-sticky';
        this.sidebar.id = 'dewp-sidebar';

        // body에 추가
        document.body.appendChild(this.sidebar);
    }

    /**
     * 사이드바 렌더링
     */
    private render(): void {
        if (!this.sidebar) return;

        this.sidebar.innerHTML = `
      <div class="dewp-sidebar-inner">
        ${this.renderHeader()}
        ${this.renderGroups()}
        ${this.renderFooter()}
      </div>
    `;
    }

    /**
     * 헤더 렌더링
     */
    private renderHeader(): string {
        const subtitle = this.config.subtitle
            ? `<p class="dewp-sidebar-subtitle">${this.config.subtitle}</p>`
            : '';

        return `
      <div class="dewp-sidebar-header">
        <h1 class="dewp-sidebar-title">${this.config.title}</h1>
        ${subtitle}
      </div>
    `;
    }

    /**
     * 메뉴 그룹 렌더링
     */
    private renderGroups(): string {
        return this.config.groups.map(group => `
      <div class="dewp-sidebar-group" data-group-id="${group.id}">
        ${group.title ? `<h2 class="dewp-sidebar-group-title">${group.title}</h2>` : ''}
        <ul class="dewp-sidebar-menu">
          ${this.renderMenuItems(group.items)}
        </ul>
      </div>
    `).join('');
    }

    /**
     * 메뉴 아이템 렌더링
     */
    private renderMenuItems(items: SidebarMenuItem[]): string {
        return items.map(item => {
            const icon = item.icon ? `<span class="dewp-sidebar-menu-icon">${item.icon}</span>` : '';
            const arrow = item.hasSubmenu ? `
        <span class="dewp-sidebar-menu-arrow">
          <svg viewBox="0 0 24 24">
            <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
          </svg>
        </span>
      ` : '';

            const submenu = item.hasSubmenu && item.submenu ? `
        <ul class="dewp-sidebar-submenu" id="submenu-${item.id}" aria-hidden="true">
          ${this.renderMenuItems(item.submenu)}
        </ul>
      ` : '';

            return `
        <li class="dewp-sidebar-menu-item ${item.isActive ? 'is-active' : ''} ${item.hasSubmenu ? 'has-submenu' : ''}" data-item-id="${item.id}">
          <a href="${item.url || '#'}" class="dewp-sidebar-menu-link" ${item.url ? '' : 'onclick="return false;"'} ${item.hasSubmenu ? 'role="button" aria-expanded="false" aria-controls="submenu-' + item.id + '"' : ''}>
            ${icon}
            <span class="dewp-sidebar-menu-text">${item.text}</span>
            ${arrow}
          </a>
          ${submenu}
        </li>
      `;
        }).join('');
    }

    /**
     * 푸터 렌더링
     */
    private renderFooter(): string {
        if (!this.config.footerText) return '';

        return `
      <div class="dewp-sidebar-footer">
        <p class="dewp-sidebar-footer-text">${this.config.footerText}</p>
      </div>
    `;
    }

    /**
     * 이벤트 바인딩
     */
    private bindEvents(): void {
        if (!this.sidebar) return;

        // 메뉴 클릭 이벤트
        this.sidebar.addEventListener('click', (e) => {
            const target = e.target as HTMLElement;
            const menuItem = target.closest('.dewp-sidebar-menu-item');

            if (!menuItem) return;

            const itemId = menuItem.getAttribute('data-item-id');
            if (!itemId) return;

            // 서브메뉴가 있는 경우 토글
            if (menuItem.classList.contains('has-submenu')) {
                e.preventDefault();
                this.toggleSubmenu(menuItem);
            } else {
                // 일반 메뉴 클릭 시 활성화
                this.setActiveItem(itemId);
            }
        });

        // ESC 키로 사이드바 닫기 (모바일)
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && window.innerWidth <= 768) {
                this.closeMobileSidebar();
            }
        });
    }

    /**
     * 서브메뉴 토글
     */
    private toggleSubmenu(menuItem: Element): void {
        const submenu = menuItem.querySelector('.dewp-sidebar-submenu') as HTMLElement;
        if (!submenu) return;

        const isExpanded = submenu.classList.contains('expanded');

        // 아코디언: 같은 레벨의 다른 서브메뉴는 닫기
        const siblings = menuItem.parentElement?.querySelectorAll('.dewp-sidebar-menu-item.has-submenu');
        siblings?.forEach((sib) => {
            if (sib !== menuItem) {
                const sibSub = sib.querySelector('.dewp-sidebar-submenu') as HTMLElement | null;
                const sibToggle = sib.querySelector('.dewp-sidebar-menu-link') as HTMLElement | null;
                if (sibSub && sibSub.classList.contains('expanded')) {
                    sibSub.classList.remove('expanded');
                    sibSub.style.maxHeight = '0';
                    sibToggle?.setAttribute('aria-expanded', 'false');
                    sibSub.setAttribute('aria-hidden', 'true');
                }
                sib.classList.remove('is-open');
            }
        });

        if (isExpanded) {
            submenu.classList.remove('expanded');
            submenu.style.maxHeight = '0';
            const toggle = menuItem.querySelector('.dewp-sidebar-menu-link') as HTMLElement;
            toggle?.setAttribute('aria-expanded', 'false');
            submenu.setAttribute('aria-hidden', 'true');
            menuItem.classList.remove('is-open');
        } else {
            submenu.classList.add('expanded');
            submenu.style.maxHeight = submenu.scrollHeight + 'px';
            const toggle = menuItem.querySelector('.dewp-sidebar-menu-link') as HTMLElement;
            toggle?.setAttribute('aria-expanded', 'true');
            submenu.setAttribute('aria-hidden', 'false');
            menuItem.classList.add('is-open');
        }
    }

    /**
     * 활성 메뉴 설정
     */
    private setActiveItem(itemId?: string): void {
        if (itemId) {
            this.activeItemId = itemId;
        }

        // 모든 활성 상태 제거
        const activeItems = this.sidebar?.querySelectorAll('.dewp-sidebar-menu-item.is-active');
        activeItems?.forEach(item => item.classList.remove('is-active'));

        // 지정된 아이템 활성화
        if (this.activeItemId) {
            const targetItem = this.sidebar?.querySelector(`[data-item-id="${this.activeItemId}"]`);
            targetItem?.classList.add('is-active');
        }
    }

    /**
     * 구분선 추가
     */
    public addDivider(groupId: string, position: 'before' | 'after' = 'after'): void {
        const group = this.sidebar?.querySelector(`[data-group-id="${groupId}"]`);
        if (!group) return;

        const divider = document.createElement('div');
        divider.className = 'dewp-sidebar-divider';

        if (position === 'before') {
            group.insertBefore(divider, group.firstChild);
        } else {
            group.appendChild(divider);
        }
    }

    /**
     * 메뉴 그룹 추가
     */
    public addGroup(group: SidebarGroup): void {
        this.config.groups.push(group);
        this.render();
        this.bindEvents();
    }

    /**
     * 메뉴 아이템 추가
     */
    public addMenuItem(groupId: string, item: SidebarMenuItem): void {
        const group = this.config.groups.find(g => g.id === groupId);
        if (group) {
            group.items.push(item);
            this.render();
            this.bindEvents();
        }
    }

    /**
     * 메뉴 아이템 제거
     */
    public removeMenuItem(groupId: string, itemId: string): void {
        const group = this.config.groups.find(g => g.id === groupId);
        if (group) {
            group.items = group.items.filter(item => item.id !== itemId);
            this.render();
            this.bindEvents();
        }
    }

    /**
     * 사이드바 표시/숨김
     */
    public toggle(): void {
        if (!this.sidebar) return;

        if (window.innerWidth <= 768) {
            this.sidebar.classList.toggle('is-open');
        }
    }

    /**
     * 사이드바 콜랩스/확장 토글 (아이콘 전용 모드)
     */
    public toggleCollapse(): void {
        if (!this.sidebar) return;
        this.isCollapsed = !this.isCollapsed;
        this.sidebar.classList.toggle('is-collapsed', this.isCollapsed);
    }

    /** 사이드바 콜랩스 */
    public collapse(): void {
        if (!this.sidebar) return;
        this.isCollapsed = true;
        this.sidebar.classList.add('is-collapsed');
    }

    /** 사이드바 확장 */
    public expand(): void {
        if (!this.sidebar) return;
        this.isCollapsed = false;
        this.sidebar.classList.remove('is-collapsed');
    }

    /**
     * 모바일 사이드바 열기
     */
    public openMobileSidebar(): void {
        if (!this.sidebar) return;
        this.sidebar.classList.add('is-open');
    }

    /**
     * 모바일 사이드바 닫기
     */
    public closeMobileSidebar(): void {
        if (!this.sidebar) return;
        this.sidebar.classList.remove('is-open');
    }

    /**
     * 사이드바 제거
     */
    public destroy(): void {
        if (this.sidebar) {
            this.sidebar.remove();
            this.sidebar = null;
        }
    }

    /**
     * 설정 업데이트
     */
    public updateConfig(newConfig: Partial<SidebarConfig>): void {
        this.config = { ...this.config, ...newConfig };
        this.render();
        this.bindEvents();
    }

    /**
     * 활성 메뉴 ID 가져오기
     */
    public getActiveItemId(): string | null {
        return this.activeItemId;
    }

    /**
     * 사이드바 요소 가져오기
     */
    public getElement(): HTMLElement | null {
        return this.sidebar;
    }
}

// 전역 함수로 등록
declare global {
    interface Window {
        DEWPSidebar: typeof DEWPSidebar;
    }
}

window.DEWPSidebar = DEWPSidebar;
