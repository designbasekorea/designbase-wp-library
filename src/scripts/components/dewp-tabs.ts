/**
 * DEWP 탭 시스템
 * 콘텐츠를 탭으로 구분하여 표시하는 컴포넌트
 */

interface TabOptions {
    container: string | HTMLElement;
    tabs?: string[];
    activeTab?: string;
    onTabChange?: (tabId: string, previousTabId?: string) => void;
    animation?: boolean;
}

interface TabInstance {
    id: string;
    container: HTMLElement;
    options: TabOptions;
    tabs: Map<string, HTMLElement>;
    panels: Map<string, HTMLElement>;
    activeTabId: string | null;
}

class DEWPTabs {
    private tabInstances: Map<string, TabInstance> = new Map();

    constructor() {
        this.autoInit();
    }

    private autoInit(): void {
        // 페이지 로드 시 자동으로 탭 초기화
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.autoInitTabs());
        } else {
            this.autoInitTabs();
        }
    }

    private autoInitTabs(): void {
        // data-tabs 속성이 있는 컨테이너들을 자동으로 초기화
        const containers = document.querySelectorAll('[data-tabs]');
        containers.forEach(container => {
            const containerId = container.getAttribute('data-tabs') || container.id || 'tabs-' + Date.now();
            this.initTabs(container as HTMLElement, { container: container as HTMLElement });
        });
    }

    initTabs(container: HTMLElement, options: TabOptions): string {
        const containerId = container.id || 'tabs-' + Date.now();

        // 기존 인스턴스가 있으면 제거
        if (this.tabInstances.has(containerId)) {
            this.destroy(containerId);
        }

        // 탭 리스트 역할/속성 설정 (ARIA)
        const tabsList = container.querySelector('.dewp-tabs');
        if (tabsList) {
            tabsList.setAttribute('role', 'tablist');
        }

        // 탭과 패널 요소들 찾기
        const tabs = this.findTabElements(container);
        const panels = this.findPanelElements(container);

        if (tabs.size === 0 || panels.size === 0) {
            throw new Error('탭 또는 패널 요소를 찾을 수 없습니다.');
        }

        // 탭 인스턴스 생성
        const instance: TabInstance = {
            id: containerId,
            container,
            options,
            tabs,
            panels,
            activeTabId: null
        };

        this.tabInstances.set(containerId, instance);

        // 탭/패널 ARIA 초기화
        tabs.forEach((tabEl, key) => {
            const tabId = `${containerId}-tab-${key}`;
            const panelEl = panels.get(key);
            if (panelEl) {
                const panelId = `${containerId}-panel-${key}`;
                tabEl.setAttribute('id', tabId);
                tabEl.setAttribute('role', 'tab');
                tabEl.setAttribute('aria-controls', panelId);
                tabEl.setAttribute('tabindex', '-1');
                panelEl.setAttribute('id', panelId);
                panelEl.setAttribute('role', 'tabpanel');
                panelEl.setAttribute('aria-labelledby', tabId);
                panelEl.setAttribute('tabindex', '0');
            }
        });

        // 이벤트 바인딩
        this.bindTabEvents(instance);

        // 기본 활성 탭 설정
        const activeTabId = options.activeTab || Array.from(tabs.keys())[0];
        this.activateTab(containerId, activeTabId);

        return containerId;
    }

    private findTabElements(container: HTMLElement): Map<string, HTMLElement> {
        const tabs = new Map<string, HTMLElement>();

        // data-tab 속성이 있는 버튼들 찾기
        const tabButtons = container.querySelectorAll('[data-tab]');
        tabButtons.forEach(button => {
            const tabId = button.getAttribute('data-tab');
            if (tabId) {
                tabs.set(tabId, button as HTMLElement);
            }
        });

        // .tab-btn 클래스가 있는 버튼들 찾기
        if (tabs.size === 0) {
            const tabButtons = container.querySelectorAll('.dewp-tab-btn');
            tabButtons.forEach((button, index) => {
                const tabId = button.getAttribute('data-tab') || `tab-${index}`;
                tabs.set(tabId, button as HTMLElement);
            });
        }

        return tabs;
    }

    private findPanelElements(container: HTMLElement): Map<string, HTMLElement> {
        const panels = new Map<string, HTMLElement>();

        // data-panel 속성이 있는 요소들 찾기
        const panelElements = container.querySelectorAll('[data-panel]');
        panelElements.forEach(panel => {
            const panelId = panel.getAttribute('data-panel');
            if (panelId) {
                panels.set(panelId, panel as HTMLElement);
            }
        });

        // .tab-panel 클래스가 있는 요소들 찾기
        if (panels.size === 0) {
            const panelElements = container.querySelectorAll('.dewp-tab-panel');
            panelElements.forEach((panel, index) => {
                const panelId = panel.getAttribute('data-panel') || `panel-${index}`;
                panels.set(panelId, panel as HTMLElement);
            });
        }

        return panels;
    }

    private bindTabEvents(instance: TabInstance): void {
        const { tabs, container } = instance;

        tabs.forEach((tabElement, tabId) => {
            tabElement.addEventListener('click', (e) => {
                e.preventDefault();
                this.activateTab(instance.id, tabId);
            });

            tabElement.addEventListener('keydown', (e: KeyboardEvent) => {
                const keys = ['Enter', ' '];
                if (keys.includes(e.key)) {
                    e.preventDefault();
                    this.activateTab(instance.id, tabId);
                }
                // 좌우 화살표 이동
                const tabKeys = Array.from(tabs.keys());
                const currentIndex = tabKeys.indexOf(tabId);
                if (e.key === 'ArrowRight') {
                    const next = tabKeys[(currentIndex + 1) % tabKeys.length];
                    const nextEl = tabs.get(next);
                    nextEl?.focus();
                } else if (e.key === 'ArrowLeft') {
                    const prev = tabKeys[(currentIndex - 1 + tabKeys.length) % tabKeys.length];
                    const prevEl = tabs.get(prev);
                    prevEl?.focus();
                }
            });
        });
    }

    activateTab(containerId: string, tabId: string): void {
        const instance = this.tabInstances.get(containerId);
        if (!instance) return;

        const { tabs, panels, activeTabId, options } = instance;
        const targetTab = tabs.get(tabId);
        const targetPanel = panels.get(tabId);

        if (!targetTab || !targetPanel) return;

        // 이전 활성 탭 비활성화
        if (activeTabId) {
            const previousTab = tabs.get(activeTabId);
            const previousPanel = panels.get(activeTabId);

            if (previousTab) {
                previousTab.classList.remove('active');
                previousTab.setAttribute('aria-selected', 'false');
                previousTab.setAttribute('tabindex', '-1');
            }

            if (previousPanel) {
                previousPanel.classList.remove('active');
                previousPanel.setAttribute('aria-hidden', 'true');
            }
        }

        // 새 활성 탭 활성화
        targetTab.classList.add('active');
        targetTab.setAttribute('aria-selected', 'true');
        targetTab.setAttribute('tabindex', '0');
        // 활성 탭에 포커스 이동
        targetTab.focus();
        targetPanel.classList.add('active');
        targetPanel.setAttribute('aria-hidden', 'false');

        // 활성 탭 ID 업데이트
        const previousTabId = instance.activeTabId;
        instance.activeTabId = tabId;

        // 이벤트 콜백 호출
        if (options.onTabChange) {
            options.onTabChange(tabId, previousTabId || undefined);
        }

        // 애니메이션 효과
        if (options.animation !== false) {
            this.animateTabChange(targetPanel);
        }
    }

    private animateTabChange(panel: HTMLElement): void {
        // 페이드 인 애니메이션
        panel.style.opacity = '0';
        panel.style.transform = 'translateY(10px)';

        requestAnimationFrame(() => {
            panel.style.transition = 'all 0.3s ease';
            panel.style.opacity = '1';
            panel.style.transform = 'translateY(0)';
        });
    }

    // 편의 메서드들
    getActiveTab(containerId: string): string | null {
        const instance = this.tabInstances.get(containerId);
        return instance ? instance.activeTabId : null;
    }

    getTabInstance(containerId: string): TabInstance | undefined {
        return this.tabInstances.get(containerId);
    }

    // 유틸리티 메서드들
    destroy(containerId: string): void {
        const instance = this.tabInstances.get(containerId);
        if (!instance) return;

        // 이벤트 리스너 제거
        instance.tabs.forEach(tab => {
            tab.replaceWith(tab.cloneNode(true));
        });

        this.tabInstances.delete(containerId);
    }

    destroyAll(): void {
        this.tabInstances.forEach((instance, id) => {
            this.destroy(id);
        });
    }
}

// 싱글톤 인스턴스 생성
const dewpTabs = new DEWPTabs();

// 전역 함수들 export
export const initTabs = (container: HTMLElement, options?: TabOptions): string => {
    return dewpTabs.initTabs(container, options || { container });
};

export const activateTab = (containerId: string, tabId: string): void => {
    dewpTabs.activateTab(containerId, tabId);
};

export const getActiveTab = (containerId: string): string | null => {
    return dewpTabs.getActiveTab(containerId);
};

export const getTabInstance = (containerId: string): TabInstance | undefined => {
    return dewpTabs.getTabInstance(containerId);
};

export const destroyTabs = (containerId: string): void => {
    dewpTabs.destroy(containerId);
};

// 기본 export
export default dewpTabs;
