// 공통 셀 레이아웃과 사이드바를 동적으로 생성
(function () {
    function buildSidebar(manifest) {
        var nav = document.createElement('nav');
        var path = location.pathname.split('/').pop();
        var fullPath = location.pathname;
        var inDocs = fullPath.indexOf('/docs/') !== -1; // kept for backward compat, not used for links
        // 홈(index) 링크를 최상단에 추가
        var home = document.createElement('a');
        home.href = './index.html';
        home.textContent = 'Getting Started';
        if (path === 'index.html') home.className = 'active';
        nav.appendChild(home);
        var sorted = manifest.slice().sort(function (a, b) {
            var ta = (a.title || '').toLowerCase();
            var tb = (b.title || '').toLowerCase();
            if (ta < tb) return -1;
            if (ta > tb) return 1;
            return 0;
        });
        sorted.forEach(function (item) {
            var a = document.createElement('a');
            a.href = './' + item.file;
            a.textContent = item.title;
            if (path === item.file) a.className = 'active';
            nav.appendChild(a);
        });
        return nav;
    }

    function mountShell() {
        if (!window.DEWP_EXAMPLES) return;
        var shell = document.createElement('div');
        shell.className = 'ex-shell';

        var sidebar = document.createElement('aside');
        sidebar.className = 'ex-sidebar';
        var brand = document.createElement('div');
        brand.className = 'ex-brand';
        brand.textContent = 'DEWP Examples';
        sidebar.appendChild(brand);
        sidebar.appendChild(buildSidebar(window.DEWP_EXAMPLES));

        var content = document.createElement('div');
        content.className = 'ex-content';
        var header = document.createElement('div');
        header.className = 'ex-header';
        var title = document.createElement('div');
        title.innerHTML = '<strong>' + document.title + '</strong>';
        var toggle = document.createElement('button');
        toggle.className = 'ex-sidebar-toggle';
        toggle.type = 'button';
        toggle.setAttribute('aria-label', '사이드바 열기/닫기');
        toggle.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>';
        toggle.addEventListener('click', function () {
            var isMobile = window.matchMedia('(max-width: 1024px)').matches;
            if (isMobile) {
                shell.classList.toggle('is-sidebar-open');
            } else {
                shell.classList.toggle('is-sidebar-collapsed');
            }
        });
        var main = document.createElement('div');
        main.className = 'ex-main';
        var container = document.createElement('div');
        container.className = 'container';

        // 기존 body 내용을 container로 이동 후 main에 부착
        while (document.body.firstChild) {
            container.appendChild(document.body.firstChild);
        }
        main.appendChild(container);

        header.appendChild(toggle);
        header.appendChild(title);
        content.appendChild(header);
        content.appendChild(main);

        var overlay = document.createElement('div');
        overlay.className = 'ex-overlay';
        overlay.addEventListener('click', function () {
            shell.classList.remove('is-sidebar-open');
        });

        shell.appendChild(sidebar);
        shell.appendChild(content);
        shell.appendChild(overlay);
        document.body.appendChild(shell);
    }

    if (document.readyState !== 'loading') mountShell();
    else document.addEventListener('DOMContentLoaded', mountShell);
})();


