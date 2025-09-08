/**
 * DesignBase WordPress Library (DEWP)
 * 간단하고 강력한 프론트엔드 라이브러리
 */

// DOM 유틸리티 함수들
import {
    qs,
    qsa,
    create,
    addClass,
    removeClass,
    toggleClass,
    hasClass,
    setText,
    setHTML,
    on,
    off,
    remove,
    append,
    insertBefore,
    setStyle,
    setData,
    getData,
    isDOMReady,
    onDOMReady,
    isElementVisible,
    scrollToElement,
    getElementRect,
    isChildOf,
    clearChildren
} from './utils/dom';

// 컴포넌트들
import {
    showToast,
    showSuccessToast,
    showWarningToast,
    showErrorToast,
    showInfoToast
} from './components/dewp-toast';

import {
    createModal,
    openModal,
    closeModal,
    showModal,
    showConfirmModal
} from './components/dewp-modal';

import {
    createDropdown,
    toggleDropdown,
    showDropdown,
    hideDropdown,
    closeAllDropdowns,
    getSelectedValue,
    getSelectedText,
    setDropdownValue,
    autoInitializeDropdowns
} from './components/dewp-dropdown';

import {
    createDrawer,
    openDrawer,
    closeDrawer,
    toggleDrawer,
    closeAllDrawers,
    destroyDrawer,
    isDrawerOpen,
    autoInitializeDrawers
} from './components/dewp-drawer';

import {
    initTabs,
    activateTab,
    getActiveTab,
    getTabInstance,
    destroyTabs
} from './components/dewp-tabs';

import {
    initAccordion,
    toggleAccordionItem,
    openAccordionItem,
    closeAccordionItem,
    openAllAccordionItems,
    closeAllAccordionItems,
    getActiveAccordionItems,
    isAccordionItemOpen,
    getAccordionInstance,
    destroyAccordion,
    destroyAllAccordions
} from './components/dewp-accordion';

import {
    createPopover,
    openPopover,
    closePopover,
    togglePopover
} from './components/dewp-popover';

import {
    DEWPSidebar
} from './components/dewp-sidebar';

import { DEWPStepper, initStepper } from './components/dewp-stepper';

// 현재 번들 버전 (배포 시 수동 갱신)
const DEWP_VERSION = '0.5.0';

/**
 * DEWP 메인 객체
 * window.DEWP로 접근 가능
 */
export default {
    // DOM 유틸리티
    qs,
    qsa,
    create,
    addClass,
    removeClass,
    toggleClass,
    hasClass,
    setText,
    setHTML,
    on,
    off,
    remove,
    append,
    insertBefore,
    clearChildren,
    setStyle,
    setData,
    getData,

    // DOM 상태 관리
    isDOMReady,
    onDOMReady,
    isElementVisible,
    scrollToElement,
    getElementRect,
    isChildOf,

    // 토스트 알림
    showToast,
    showSuccessToast,
    showWarningToast,
    showErrorToast,
    showInfoToast,

    // 모달
    createModal,
    openModal,
    closeModal,
    showModal,
    showConfirmModal,

    // 드롭다운
    createDropdown,
    toggleDropdown,
    showDropdown,
    hideDropdown,
    closeAllDropdowns,
    getSelectedValue,
    getSelectedText,
    setDropdownValue,
    autoInitializeDropdowns,

    // 탭
    initTabs,
    activateTab,
    getActiveTab,
    getTabInstance,
    destroyTabs,

    // 아코디언
    initAccordion,
    toggleAccordionItem,
    openAccordionItem,
    closeAccordionItem,
    openAllAccordionItems,
    closeAllAccordionItems,
    getActiveAccordionItems,
    isAccordionItemOpen,
    getAccordionInstance,
    destroyAccordion,
    destroyAllAccordions,

    // Drawer
    createDrawer,
    openDrawer,
    closeDrawer,
    toggleDrawer,
    closeAllDrawers,
    destroyDrawer,
    isDrawerOpen,
    autoInitializeDrawers,

    // Popover
    createPopover,
    openPopover,
    closePopover,
    togglePopover,

    // 사이드바
    DEWPSidebar,
    DEWPStepper,
    initStepper,

    // 편의 함수
    ready: onDOMReady,

    // 버전 정보
    version: DEWP_VERSION,
    info: {
        name: 'DesignBase WordPress Library',
        description: '간단하고 강력한 프론트엔드 라이브러리',
        version: DEWP_VERSION,
        author: 'DesignBase',
        license: 'MIT'
    }
};

// 브라우저 환경에서 전역 객체로 직접 노출
if (typeof window !== 'undefined') {
    // window.DEWP에 직접 함수들을 할당 (편의성을 위해)
    const globalDEWP = (window as any).DEWP = {};

    // 모든 함수들을 window.DEWP에 직접 할당
    const dewpFunctions = {
        qs, qsa, create, addClass, removeClass, toggleClass, hasClass,
        setText, setHTML, on, off, remove, append, insertBefore, clearChildren,
        setStyle, setData, getData, isDOMReady, onDOMReady, isElementVisible,
        scrollToElement, getElementRect, isChildOf, showToast, showSuccessToast,
        showWarningToast, showErrorToast, showInfoToast, createModal, openModal,
        closeModal, showModal, showConfirmModal, createDropdown, toggleDropdown,
        showDropdown, hideDropdown, closeAllDropdowns, getSelectedValue,
        getSelectedText, setDropdownValue, autoInitializeDropdowns, createDrawer, openDrawer, closeDrawer, toggleDrawer, closeAllDrawers, destroyDrawer, isDrawerOpen, autoInitializeDrawers, initTabs, activateTab, getActiveTab,
        getTabInstance, destroyTabs, initAccordion, toggleAccordionItem,
        openAccordionItem, closeAccordionItem, openAllAccordionItems,
        closeAllAccordionItems, getActiveAccordionItems, isAccordionItemOpen,
        getAccordionInstance, destroyAccordion, destroyAllAccordions, DEWPSidebar,
        // Popover
        createPopover, openPopover, closePopover, togglePopover,
        ready: onDOMReady, version: DEWP_VERSION, info: {
            name: 'DesignBase WordPress Library',
            description: '간단하고 강력한 프론트엔드 라이브러리',
            version: DEWP_VERSION,
            author: 'DesignBase',
            license: 'MIT'
        }
    };

    Object.keys(dewpFunctions).forEach(key => {
        (globalDEWP as any)[key] = (dewpFunctions as any)[key];
    });

    // 단일 버전 로그만 출력
    try { console.log(`[DEWP] v${DEWP_VERSION} loaded`); } catch { }

    // 기본 컴포넌트 자동 초기화 (접근성 속성 포함)
    onDOMReady(() => {
        try {
            autoInitializeDropdowns();
        } catch { }
        try {
            autoInitializeDrawers();
        } catch { }
    });

    // DOM이 이미 로드된 상태일 경우 즉시 초기화 (테스트 안정화)
    try {
        if (document.readyState !== 'loading') {
            autoInitializeDropdowns();
            autoInitializeDrawers();
        }
    } catch { }
}
