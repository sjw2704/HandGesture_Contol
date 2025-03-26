# 🤚Handpose 기반 Gesture Interaction

## **1. 개요**

이 프로그램은 **ml5.js의 Handpose 모델**을 기반으로, **웹캠을 통해 사용자의 손가락 제스처를 인식**하고, 인식된 제스처에 따라 **화면에 그림을 그리거나 특정 이모티콘을 표시**하는 기능을 제공합니다. 사용자는 마우스나 터치스크린 없이 손동작만으로 표현이 가능하며, 직관적인 인터페이스를 통해 사용자 경험을 극대화할 수 있습니다.

## **2. 시연 영상**

[201901975 서종원 손동작 p5&zoom](https://youtu.be/UWFk8JTqfMc)

## **3. 사용 기술**

| **기술 요소** | **설명** |
| --- | --- |
| **ml5.js** | 머신러닝 모델 Handpose를 사용하여 손가락 위치와 구조를 추정함 |
| **p5.js** | 인터랙티브 그래픽을 구현하기 위한 JS 라이브러리 (캔버스, 드로잉) |
| **JavaScript (ES6)** | 제스처 분석 로직 및 UI 제어 구현 |
| **HTML/CSS** | 웹 인터페이스 구성 및 스타일링 |

## **4. 주요 기능**

**🧠 제스처 인식**

- Handpose 모델이 제공하는 **21개의 손가락 관절 좌표**를 기반으로, 간단한 벡터 연산을 통해 제스처 분석.
- 제스처 조건(예: 각 손가락의 x좌표와 y좌표)을 기반으로 동작 수행.(자세한 제스처 조건은 사용 방법에 있음)

**✍️ 손가락 드로잉**

- 손 제스처를 통해서 펜의 색상 선정.(빨강,파랑,초록)
- 사용자의 **검지 손가락 끝 좌표**를 추적하여 **캔버스 위에 자유롭게 그림**을 그릴 수 있음.
- 손 제스처를 통해 드로잉 중지 및 지우기 가능.

**😊 이모티콘 출력**

- 특정 손 제스처를 인식하면, 화면에 **이모티콘 10개(랜덤한 크기와 위치)를** 출력.
- 제스처에 따라 다른 이모티콘을 표시하도록 구현함.

## **5. 사용 방법**

### 제스처 설명

| **제스처 모양** | **기능** |
| --- | --- |
| <img src= "[https://github.com/sjw2704/HandGesture_Contol/blob/main/HandPose/img/Red.jpg](https://github.com/sjw2704/HandGesture_Contol/blob/main/HandPose/img/Red.jpg)" width="200" /> | 펜 색상을 빨간색으로 설정함 |
| <img src= "[https://github.com/sjw2704/HandGesture_Contol/blob/main/HandPose/img/blue.jpg](https://github.com/sjw2704/HandGesture_Contol/blob/main/HandPose/img/blue.jpg)" width="200" /> | 펜 색상을 파란색으로 설정함 |
| <img src= "[https://github.com/sjw2704/HandGesture_Contol/blob/main/HandPose/img/green.jpg](https://github.com/sjw2704/HandGesture_Contol/blob/main/HandPose/img/green.jpg)" width="200" /> | 펜 색상을 초록색으로 설정함 |
| <img src= "[https://github.com/sjw2704/HandGesture_Contol/blob/main/HandPose/img/drawing.jpg](https://github.com/sjw2704/HandGesture_Contol/blob/main/HandPose/img/drawing.jpg)" width="200" /> | 검지 손가락 좌표에 따라서 화면에 line을 그려줌 |
| <img src= "[https://github.com/sjw2704/HandGesture_Contol/blob/main/HandPose/img/erase.jpg](https://github.com/sjw2704/HandGesture_Contol/blob/main/HandPose/img/erase.jpg)" width="200" /> | 라인을 모두 지워줌 |
| <img src= "[https://github.com/sjw2704/HandGesture_Contol/blob/main/HandPose/img/good.jpg](https://github.com/sjw2704/HandGesture_Contol/blob/main/HandPose/img/good.jpg)" width="200" /> | 밝은 얼굴의 이모지 10개(랜덤한 위치와 크기)를 화면에 띄움 → 3초 동안 y축 상승을 하다가 사라짐 |
| <img src= "[https://github.com/sjw2704/HandGesture_Contol/blob/main/HandPose/img/bad.jpg](https://github.com/sjw2704/HandGesture_Contol/blob/main/HandPose/img/bad.jpg)" width="200" /> | 울먹이는 이모지 10개(랜덤한 위치와 크기)를 화면에 띄움 → 3초 동안 y축 상승을 하다가 사라짐 |
| <img src= "[https://github.com/sjw2704/HandGesture_Contol/blob/main/HandPose/img/myturn.jpg](https://github.com/sjw2704/HandGesture_Contol/blob/main/HandPose/img/myturn.jpg)" width="200" /> | 손을 든 남성 이모지 10개(랜덤한 위치와 크기)를 화면에 띄움 → 3초 동안 y축 상승을 하다가 사라짐 |
| <img src= "[https://github.com/sjw2704/HandGesture_Contol/blob/main/HandPose/img/love.jpg](https://github.com/sjw2704/HandGesture_Contol/blob/main/HandPose/img/love.jpg)" width="200" /> | 하트 이모지 10개(랜덤한 위치와 크기)를 화면에 띄움 → 3초 동안 y축 상승을 하다가 사라짐 |

### 작동 순서

1. VS Code에서 Go Live 버튼을 통해 프로그램 실행
2. 웹캠 접근 허용 (브라우저에서 요청)
3. 프로그램 실행 시 자동으로 손 인식 시작
4. 제스처에 따라 화면에 그림 및 이모지 출력
5. VS Code에서 port:5500 중지 버튼을 통해 프로그램 종료

## **6. 코드 구조 설명**

### `preload() 함수의 기능`

<aside>
💡

- setup 함수가 실행되기 전에 호출되는 함수
- ‘assets’이름의 파일에 있는 이미지 로드
- 핸드포즈 모델 로드
</aside>

### `setup() 함수의 기능`

<aside>
💡

- 캔버스를 초기 설정함
- 비디오 출력을 위한 변수 설정
- 이모티콘 y축 상승을 위한 frameRate 설정
</aside>

### `detecting_Hand() 함수의 기능`

<aside>
💡

- 손이 인식되고 있는지 확인
- 각 손가락이 x축 기준과 y축 기준으로 펴졌는지 접혔는지 논리값을 저장하는 변수 설정
- 위의 변수를 기준으로 제스처를 판단하는 함수들에게 파라미터 전달
</aside>

### `Hand_drawing() 함수의 기능`

<aside>
💡

- 검지 손가락의 좌표를 받고 포인트 색상의 원으로 손가락을 트랙킹 함
- 좌표를 drawing이라는 배열에 저장함
- drawing 배열에 있는 값을 받아서 curveVertex함수로 라인을 그림
</aside>

### `showEmoji_n() 함수의 기능`

<aside>
💡

- 현재 프레임이 전체 프레임 기준 어느 정도 진행되었는지 0~1 사이의 값으로 표현
- progress의 값에 따라서 각 이모지의 y축 좌표 수정
- 현재 프레임 수가 전체 프레임 수를 넘어서게 되면 이모지 초기화
</aside>

## **7. 주의 사항**

- 🚨정확한 제스처를 표현하지 않으면 오류가 생길 수 있으니 주의하시기 바랍니다.
