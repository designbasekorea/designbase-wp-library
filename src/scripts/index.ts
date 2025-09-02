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
    setDropdownValue
} from './components/dewp-dropdown';

import {
    initTabs,
    activateTab,
    getActiveTab,
    getTabInstance,
    destroyTabs
} from './components/dewp-tabs';

/**
 * DEWP 메인 객체
 * window.DEWP로 접근 가능
 */
const DEWP = {
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

    // 탭
    initTabs,
    activateTab,
    getActiveTab,
    getTabInstance,
    destroyTabs,

    // 편의 함수
    ready: onDOMReady,

    // 버전 정보
    version: '1.0.0',
    info: {
        name: 'DesignBase WordPress Library',
        description: '간단하고 강력한 프론트엔드 라이브러리',
        version: '1.0.0',
        author: 'DesignBase',
        license: 'MIT'
    }
};

// named exports
export { DEWP };

// 브라우저 환경에서 전역 객체로 직접 노출
if (typeof window !== 'undefined') {
    // window.DEWP에 직접 함수들을 할당 (편의성을 위해)
    const globalDEWP = (window as any).DEWP = {};

    // 모든 함수들을 window.DEWP에 직접 할당
    Object.keys(DEWP).forEach(key => {
        (globalDEWP as any)[key] = (DEWP as any)[key];
    });

    // 디버깅을 위한 로그
    console.log('🚀 DEWP 라이브러리 전역 객체 설정 완료');
    console.log('window.DEWP:', (window as any).DEWP);
    console.log('사용 가능한 함수들:', Object.keys((window as any).DEWP));
}
