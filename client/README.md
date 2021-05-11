# SSU web programming final project.

### Requirements
- nodejs >= 12
- npm >= 6

### Setup

```shell
npm install -g pnpm
pnpm install  # deps 설치
pnpm dev      # dev server 실행
```

### Stack
- react-router : react router library, page history 관리에 좋음
- mobx-react-lite : typescript로 작성된 상태 관리 라이브러리, 생산성이 좋음
- vitejs : ESM 기반 빌드툴, CRA보다 훨씬 빠르게 개발가능
- emotion : material ui for react에서도 선택되고 빠르게 성숙해진 css-in-js 라이브러리
    - [다운로드 차트](https://npm-stat.com/charts.html?package=react-jss&package=%40emotion%2Fcore&package=styled-components&package=styletron-react&from=2019-08-01&to=2021-03-23)
    - [MUI 비교 리서치 이슈](https://github.com/mui-org/material-ui/issues/22342)

### 최대한 빨리 학습하기
1. https://react.vlpt.us/ - velopert님의 리액트 강좌
1. https://mobx.js.org/README.html
1. https://vitejs.dev/guide/
1. https://reactrouter.com/web/guides/quick-start
1. https://react.vlpt.us/styling/03-styled-components.html
1. https://emotion.sh/docs/introduction