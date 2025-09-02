# 🚀 배포 가이드

## 📋 배포 전 체크리스트

### 1. 코드 품질 확인
- [ ] 모든 TypeScript 컴파일 오류 해결
- [ ] SCSS 빌드 오류 해결
- [ ] JavaScript 린트 오류 해결
- [ ] 테스트 파일들이 제대로 작동하는지 확인

### 2. 빌드 확인
- [ ] `npm run build:prod` 성공
- [ ] `dist/` 폴더에 올바른 파일들이 생성되었는지 확인
- [ ] CSS와 JS 파일이 압축되어 있는지 확인

### 3. 배포 파일 확인
- [ ] `package.json`의 `files` 필드가 `["dist"]`로 설정되어 있는지 확인
- [ ] `.npmignore` 파일이 올바르게 설정되어 있는지 확인
- [ ] `npm run preview`로 배포될 파일들 확인

### 4. 버전 관리
- [ ] `package.json`의 버전 번호 업데이트
- [ ] `CHANGELOG.md` 업데이트
- [ ] 변경사항이 모두 문서화되었는지 확인

### 5. Git 상태 확인
- [ ] 모든 변경사항이 커밋되었는지 확인
- [ ] `.gitignore`가 올바르게 설정되었는지 확인
- [ ] 불필요한 파일들이 Git에 포함되지 않았는지 확인

## 🚀 배포 과정

### 1단계: 프로덕션 빌드
```bash
npm run build:prod
```

### 2단계: 배포 전 미리보기
```bash
npm run preview
```

### 3단계: Git 커밋 및 푸시 (소스 코드)
```bash
git add .
git commit -m "feat: v0.1.0 배포 준비 완료 - DEWP 라이브러리"
git push origin main
```

### 4단계: npm에 배포 (빌드된 파일만)
```bash
npm run release
```

또는 수동으로:
```bash
npm publish
```

## 📦 배포 전략

### GitHub vs npm 차이점

#### **GitHub에 포함되는 파일들** (소스 코드)
- ✅ `src/` - TypeScript 소스 코드
- ✅ `scripts/` - 컴포넌트 스크립트
- ✅ `styles/` - SCSS 소스 파일
- ✅ `examples/` - 사용 예시
- ✅ `tsconfig.json`, `rollup.config.mjs` - 빌드 설정
- ✅ `README.md`, `DEPLOYMENT.md` - 문서

#### **npm에 포함되는 파일들** (빌드된 파일만)
- ✅ `dist/css/dewp.min.css` - 압축된 CSS
- ✅ `dist/js/dewp.min.js` - 압축된 JavaScript
- ✅ `package.json` - 패키지 정보
- ✅ `README.md` - 사용법 문서

#### **npm에 제외되는 파일들**
- ❌ `src/` - 소스 코드 (불필요)
- ❌ `scripts/` - 개발 스크립트
- ❌ `styles/` - SCSS 파일
- ❌ `examples/` - 예시 파일
- ❌ `tsconfig.json` - TypeScript 설정
- ❌ `rollup.config.mjs` - Rollup 설정

## 📦 배포 후 확인사항

### 1. npm 패키지 확인
- [ ] npm에서 패키지가 올바르게 표시되는지 확인
- [ ] 버전 번호가 올바른지 확인
- [ ] README.md가 올바르게 표시되는지 확인

### 2. CDN 확인
- [ ] unpkg.com에서 패키지가 접근 가능한지 확인
- [ ] jsDelivr에서 패키지가 접근 가능한지 확인

### 3. 사용자 피드백 모니터링
- [ ] GitHub Issues 모니터링
- [ ] npm 다운로드 통계 확인
- [ ] 사용자 피드백 수집

## 🔧 문제 해결

### 빌드 실패 시
```bash
# 의존성 재설치
rm -rf node_modules package-lock.json
npm install

# 캐시 정리
npm run clean
npm run build:prod
```

### 배포 실패 시
```bash
# npm 로그인 확인
npm whoami

# npm 로그인
npm login

# 배포 재시도
npm publish
```

### 버전 충돌 시
```bash
# 로컬 변경사항 백업
git stash

# 원격 변경사항 가져오기
git pull origin main

# 변경사항 복원
git stash pop

# 충돌 해결 후 재배포
npm run build:prod
npm publish
```

## 📚 추가 리소스

- [npm 배포 가이드](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)
- [Changesets 문서](https://github.com/changesets/changesets)
- [Rollup 설정 가이드](https://rollupjs.org/guide/en/)
- [Sass 컴파일 가이드](https://sass-lang.com/documentation/cli/)

## 🎯 성공적인 배포를 위한 팁

1. **작은 단위로 배포**: 큰 변경사항보다는 작은 단위로 자주 배포
2. **테스트 우선**: 배포 전 충분한 테스트 수행
3. **문서화**: 모든 변경사항을 명확하게 문서화
4. **사용자 커뮤니케이션**: 주요 변경사항을 사용자에게 미리 알림
5. **롤백 계획**: 문제 발생 시 빠른 롤백 계획 수립
