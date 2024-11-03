[https://github.com/weeeeey/superb](github repo) 주소입니다.

## Getting Started

```bash
npm install
npm run dev
```

[http://localhost:3000](http://localhost:3000)에 접근합니다.

## 프로젝트 개요

- 1,000,000개의 체크박스를 성능 저하 없이 그리드 형태로 렌더링하는 컴포넌트를 구현

## 요구사항

- 1,000,000개의 체크박스 그리드 렌더링
  - 체크박스는 브라우저의 가로 크기에 맞춰 그리드 형태로 렌더링
  - 브라우저의 크기에 따라 자동으로 조정되어야 한다.
  - 가능한 많은 체크박스가 화면에 표시되어야 한다.
- 체크 된 박스의 전체 및 색상 별 갯수를 실시간으로 화면에 표시
- 화면 하단에 체크박스의 인덱스를 입력 후 Jump 버튼을 클릭시 해당 인덱스로 스크롤 되어야한다.
- 성능 저하 없이 체크박스의 선택/해제 애니메이션을 구현한다.

## 문제 해결방안

- 채크 박스의 갯수가 10,000개가 넘어간다면 초기 렌더링 시 브라우저 멈춤 현상이 발생
- 해당 문제를 해결하기 위해 처음에 생각한 것은 intersection observer를 활용
  - 체크 박스를 1,000개씩 묶어 각 섹션을 선언.
  - 선언 된 천개의 섹션에 대해 observer를 통해 실시간 감지를 하여 inView일시 렌더링 되도록 구현
  - ------해당 과정의 문제점-----
- lazy loading의 한계를 극복하기 위해 windowing 기법을 사용
- [윈도우잉 기법]
  - 화면에 보이는 데이터만 렌더링하는 기법으로 lazy loading 기법과 목적 같음
  - 스크롤 시 새로운 데이터를 동적으로 렌더링
  - 이를 통해 성능 향상, 메모리 사용 감소, 사용자 경험 향상을 기대할 수 있음

## 내부 구현

- 하나의 state를 선언하여 전체의 체크박스를 관리

  ```javascript
  export type CheckStateType = {
      checkedIdxs: number[];
      checkedCount: number;
      colorCheckedCount: {
          [GREEN]: number;
          [PURPLE]: number;
          [RED]: number;
          [YELLOW]: number;
      };
  };
  ```

  - checkedIdxs
    - windowing 기법을 통해 화면에 보이는 부분만 렌더링한다면 스크롤에서 벗어난 부분에 다시 접근했을 시 체크박스는 리렌더링 되어 이전 체크를 기억하지 못하기 때문에 해당 state를 통해 관리
  - checkedCount
    - 체크 되어 있는 체크박스의 갯수
  - colorCheckedCount
    - 색상 별 박스 중 체크 된 박스의 갯수

- footer input에 숫자를 입력한 후 Jump 버튼을 클릭하면 해당 인덱스로 이동

  - jumpToTarget state를 통해 이동 될 인덱스를 관리
  - Jump 버튼을 클릭하면 selectTarget 함수가 실행되고 내부에서 입력값이 적절한 숫자인지 검토 후 state를 업데이트
  - 윈도우잉 기법 특성상 현재 뷰포트가 아니라면 생성되지 않기에 ref 자체 접근이 아닌 jumpToTarget의 row를 구한 뒤 체크박스 크기를 곱하여 scroll 시킴
