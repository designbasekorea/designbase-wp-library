---
"designbase-wp-library": patch
---

빌드/버전 주입 개선 및 로그 정리

- 빌드 시 `package.json`의 버전을 번들에 주입(rollup-replace)
- 로드 시 단일 버전 로그(`[DEWP] vX.Y.Z loaded`)만 출력
- 개발용 console.log 제거(Drawer/Toast 등)
- 문서/데모는 항상 CDN `@latest` 사용(연결 확인)


