# 당충전 프로젝트 프론트

## 1.프로젝트 설명
전기 차는 다른 차량들에 비해 주유를 할 수 있는 충전소가 보편화 되지 않아 방문하려면 많은 시간이 걸린다거나 이미 충전 중인 차량 때문에 헛걸음하게 된다는 단점이 있습니다.
저희 프로젝트는 충전소를 찾기 위해 많은 시간을 소비되는 것을 방지하고 원하는 충전소에 대한 위치와 정보를 손쉽게 얻을 수 있는 서비스를 제공합니다.
## 2.주요 기능
### [공통]
- 로그인
- 회원가입
### [홈]
- 지도
- 충전소 위치 조회
- 검색 및 필터 조회
- 즐겨찾기
- 메모 추가
### [정보마당]
- 전기차 종류 조회
- 브랜드 별 요금 조회
### [커뮤니티]
- 리뷰 작성 게시판
- 신고하기 게시판
### [마이페이지]
- 내 차 정보 조회
- 개인정보 조회 및 수정
- 배터리 잔량 알림


## 3.팀원 소개
|🐰**이은수**|🐣**노효민**|😻**박유진**|🐼**손예림**|🐹**호경화**|
| :--: | :--: | :--: | :--: | :--: |
| <img src="https://i.ibb.co/YDdXZ3c/image.png"  height=220 width=180> | <img src="https://i.ibb.co/Hd9Pz5B/image.jpg" height=220 width=180> | <img src="https://i.ibb.co/dmpjVPY/image.png" height=220 width=180> | <img src="https://i.ibb.co/DpmsYD3/image.png" height=220 width=180> | <img src="https://i.ibb.co/F33Jpn5/image.png" height=220 width=180> 
| 팀장, FE, BE | FE, BE | FE, BE | FE, BE | FE |   


## 4.개발 환경

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![MySQL](https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white)
![Mui](https://img.shields.io/badge/Mui-007FFF?style=for-the-badge&logo=mui&logoColor=white)


## 5.역할분담
#### 🐰이은수
```
- 로그인 기능 구현
- 로그인 / 토큰 back 환경구성
- 마이페이지 내 차 정보 페이지
```
#### 🐣노효민
```
- 마이페이지 개인정보 수정 제작
- 후기 페이지, 후기 작성페이지
- 지도 마커, 컨트롤 바, 현재 위치 이동
```
#### 😻박유진
```
- 회원가입
- 충전소 리스트 조회
- 필터 검색, 즐겨 찾기, 메모 작성
```
#### 🐼손예림
```
- 헤더, 서브헤더
- 정보마당 요금표
- 신고하기
- 홈 화면 내 검색 기능
```
#### 🐹호경화
```
- 로딩페이지
- 에러페이지
- 마이페이지 내 배터리 잔량 알림
- 전기차 종류 조회
```


## 6.구조

```
root/
  ├─ src/
  │  ├─ api/
  │  ├─ assets/
  │  ├─ components/
  │  ├─ contexts/
  │  ├─ hooks/
  │  ├─ pages/
  │  ├─ App.css
  │  ├─ App.js
  │  ├─ index.js
  ├─ .env
  ├─ .gitigore  
  ├─ package.json
  └─ README.md
```


## 7.트러블 슈팅

#### 1.
#### - 문제
충전소 리스트 컴포넌트에서 생성되는 데이터를 필요로 하는 컴포넌트들이 많아짐
#### - 원인
데이터를 전달하는 방법이 복잡해짐(Prop Drilling 발생)
#### - 해결
Context를 제작해서 데이터를 전역적으로 활용할 수 있게 변경

#### 2.
#### - 문제
컴포넌트를 제작 할 때 코드의 길이가 길어져서 코드를 이해하기가 어려워짐
#### - 원인
하나의 파일 내에 많은 기능들이 작성되어 있음
#### - 해결
아래의 구조로 프로젝트 설계 재구축
```
페이지/
  ├─ 📁components(페이지 내에서 활용하는 컴포넌트들을 모아놓은 폴더)
  ├─ 📁utill(페이지 내에서 활용하는 기능들을 모아놓은 폴더)
  ├─ 📄루트 컴포넌트.js
  └─ 📄index.js
```


## 8.추후 개선 사항
- 관리자 페이지 제작
- 전기차 API확보 및 적용


## 9.프로젝트를 마치며...
| :-: |
| 🐰**이은수** | 
| 프로젝트 경험이 충분하지 않았지만, 팀원들에게 많이 배울 수 있었기에 매우 유익한 반년이었다. 프로젝트를 원활하게 진행하기 위해 열심히 복습하고 공부했던 나의 노력이 매우 뿌듯하다. 프론트엔드에 대해 하나도 모른 상태로 시작했지만, 결국 우리 팀만의 페이지를 완성했다는 사실이 큰 성취감을 주었다. 앞으로도 지속적으로 학습하고 성장해 더 나은 개발자가 되고 싶다. 이 경험을 통해 팀워크와 문제 해결 능력의 중요성을 깨닫게 되었고, 이러한 교훈을 바탕으로 앞으로 더 나은 프로젝트를 진행할 수 있을 것이다. |
| 🐣**노효민** | 
| 이전에 팀프로젝트 할 때는 결과물에만 집중하여 컴포넌트 설계에 관하여 많은 신경을 쓰지 않던 습관이 이번에 악영향을 끼친 것 같아 힘들었던것 같습니다. 이번 프로젝트를 기회로 컴포넌트 및 파일 설계에 대하여 공부할 수 있는 기회가 되었고 친분이 없는 사람들과 한 팀을 꾸려 진행하는 것이 큰 용기였는데 합도 잘 맞고 이야기도 잘 통하여 큰 팀원들 간의 불화 없이 진행되어 너무 행복했던 프로젝트 시간이었습니다. 서로 욕심 부리지 않고 맡은 부분 잘 이루어 내서 좋은 결과물이 나온 것 같아서 뿌듯하고 해본 팀프로젝트 중 가장 합이 잘 맞는 팀이었습니다. 팀원들께 너무 감사하고 수고 많았다는 말씀 드리고 싶습니다.|
| 😻**박유진** | 
| 리액트를 활용한 팀 프로젝트를 처음 진행하면서, 성격 좋은 팀원들을 만나 순조로운 진행이 이루어졌습니다. 수업에서 배운 내용을 기반으로 원했던 기능들을 구현하고 팀원들과의 협업을 통해 개발자로서의 첫 발을 내딛은 것 같습니다. 모두 수고 많으셨고, 앞으로도 좋은 결과만 있기를 기대합니다.|
| 🐼**손예림** | 
| 프론트엔드 개발자로서 필수 기술인 리액트를 써서  props나 여러 훅들을 활용할 수 있어서 좋았습니다. 아직 완성하지 못한 부분도 있지만 한달 조금 넘는 시간동안에 혼자 독학하던 시간보다 훨씬 성장한 것 같아서 이 프로그램에 참여하길 정말 잘했다는 생각이 들었습니다. 다른 팀원분들에게 배워가는 점도 많았고, 스스로의 강점과 약점도 알 수 있었던 유익한 시간이었습니다! |
| 🐹**호경화** | 
| 팀프로젝트를 시작하면서 부족한 실력으로 팀에 도움이 되지 않을까 너무 고민을 많이 했는데 이 프로젝트를 끝까지 할 수 있었던 것은 모두 팀원들 덕분이라고 생각합니다. 특히, 프로젝트를 통해 적극적으로 소통하는 방법에 대해 배울 수 있었습니다. 어려운 부분에 대해 함께 고민해준 팀원들 너무 고맙습니다.  여전히 부족하지만 그래도 이 프로젝트를 하면서 조금이나마 성장한 기회가 된 것 같고, 앞으로 더욱 노력해서 좋은 개발자가 될 수 있도록 하겠습니다! |
