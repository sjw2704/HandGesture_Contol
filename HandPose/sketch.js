//핸드포즈 인식 변수
 let handPose;
 let video;
 let hands = [];
 let v_width = 640;
 let v_height = 480;

//이미지 변수
let img = [];
let randomImg = [];
let totalFrames = 180; // 3초 (60fps)
let currentFrame = [];
let showEmoji_0Index = 100;
let showEmoji_1Index = 100;
let showEmoji_2Index = 100;
let showEmoji_3Index = 100;

//기타 변수
let drawing = [];
let isDrawing = false;
let isNext = true;
let selecColor = 'none';
let pose = 'none';
let red = 255;
let green = 255;
let blue = 255;

 //핸드포즈 모델 및 이미지 로드
 function preload(){
  for (let i = 0; i < 4; i++) {
    img[i] = loadImage(`assets/img${i}.png`); // 이미지 로딩
  }
  handPose = ml5.handPose();// 핸드포즈 모델 로드
}
 
 function setup() {
  createCanvas(v_width, v_height); // 캔버스 생성
  //비디오 출력 변수 설정
  video = createCapture(VIDEO, {flipped:true}); // 비디오 객체 생성(x축 반전)
  video.size(v_width, v_height);
  video.position(0,0);
  video.hide();
  handPose.detectStart(video, gotHands); // 손이 포착될 때마다, gothand라는 콜백 함수 호출
  //이미지 설정 및 생성
  frameRate(60);
  for (let i = 0; i < 10; i++) {
    currentFrame[i] = 0;
    resetEmoji(i); // 랜덤한 크기와 위치의 이모지 생성
  }  
  setInterval(detecting_Hand, 500);//500ms 마다 해당 함수 호출
 }
 
 function draw() {
  image(video, 0, 0, v_width, v_height); // 비디오 canvas에 표현
  Hand_drawing(); // 비디오에 검지 Landmarks 표시하고 그리기
  showEmoji_0(showEmoji_0Index); // 이모지 y축 조정 및 framerate 계산
  showEmoji_1(showEmoji_1Index); // 이모지 y축 조정 및 framerate 계산
  showEmoji_2(showEmoji_2Index); // 이모지 y축 조정 및 framerate 계산
  showEmoji_3(showEmoji_3Index); // 이모지 y축 조정 및 framerate 계산

  fill(50);
  textSize(20);
  noStroke();
  text("POSE : " + pose, 30, 30); // 어떤 제스처를 사용하고 있는지 텍스트로 표시
 }

//========================= HandPose 인식 함수 =========================

// 그리기 함수
function Hand_drawing()
{
  let hand = [];
  let indexTip;
  if (hands.length > 0) {
    hand = hands[0];
    indexTip = hand.keypoints[8]; // 검지 손가락의 좌표를 받음

    let x = v_width - indexTip.x;
    let y = indexTip.y;

    if (isDrawing) {
      drawing.push({ x, y }); // 검지 손가락 좌표를 배열에 저장
    }

    fill(0, 255, 0);
    strokeWeight(2);
    ellipse(x, y, 10, 10); // 검지 손가락 트랙킹 점

    // Draw path
    noFill();
    stroke(red, green, blue);
    strokeWeight(4);
    beginShape();
    for (let pt of drawing) {
      curveVertex(pt.x, pt.y); // 배열에 저장된 좌표에 따라서 라인 그리기
    }
    endShape();
  }
  
}


//손동작 확인 함수
function detecting_Hand()
{
  //손동작을 확인을 주관하는 함수
  if(hands.length > 0){
    let hand = hands[0]; // 첫 번째 손을 가져옴
      let thumbTip = hand.keypoints[4];  // 엄지 끝
      let thumbBase = hand.keypoints[3]; // 엄지 관절
    
      let indexTip = hand.keypoints[8];   // 검지 끝
      let indexBase = hand.keypoints[6];  // 검지 관절

      let middleTip = hand.keypoints[12];  // 중지 끝
      let middleBase = hand.keypoints[10];  // 중지 관절

      let ringTip = hand.keypoints[16];  // 약지 끝
      let ringBase = hand.keypoints[14];  // 약지 관절

      let pinkyTip = hand.keypoints[20];  // 소지 끝
      let pinkyBase = hand.keypoints[18]; // 소지 관절

      let isIndexUp = indexTip.y < indexBase.y; // 검지 손가락이 위로 펴짐
      let isIndexDown = !isIndexUp; // 검지 손가락이 접힘
      let isIndexDownX = indexTip.x < indexBase.x; // 검지 손가락이 X축접힘
      let isIndexUpX = !isIndexDownX; // 검지 손가락이 X축 펴짐

      let isMiddleUp = middleTip.y < middleBase.y; // 중지 위로 펴짐
      let isMiddleDown = !isMiddleUp; // 중지 접힘
      let isMiddleDownX = middleTip.x < middleBase.x; // 엄지 손가락이 X축 접힘

      let isRingUp = ringTip.y < ringBase.y; // 약지 위로 펴짐
      let isRingDown = !isRingUp // 약지 접힘
      let isRingDownX = ringTip.x < ringBase.x;// 약지 손가락이 X축 접힘

      let isPinkyUp = pinkyTip.y < pinkyBase.y; // 소지 위로 펴짐
      let isPinkyDown = !isPinkyUp;
      let isPinkyDownX = pinkyTip.x < pinkyBase.x; // 소지 손가락이 X축 접힘
      
      let isThumbUp = thumbTip.y < thumbBase.y; // 엄지 접힘
      let isThumbDown = !isThumbUp; // 엄지 위로 펴짐
      let isThumbDownX = thumbTip.x < thumbBase.x; // 엄지 손가락이 X축 접힘
      let isThumbUpX = !isThumbDownX; // 엄지 손가락이 X축 펴짐
    
    //손동작을 구분해주는 함수들을 호출함
    HandForisDrawing(isIndexUp,isIndexDown,isMiddleUp,isMiddleDown,isRingUp,isRingDown,isPinkyUp,isPinkyDown,isThumbDownX);
    HandForColor(isIndexUp,isMiddleUp,isMiddleDown,isRingUp,isRingDown,isPinkyUp,isPinkyDown,isThumbDownX);
    if(isNext){
      HandForEmoji(isIndexUp,isIndexDown,isIndexDownX,isIndexUpX,isMiddleUp,isMiddleDown,isMiddleDownX,isRingUp,isRingDown,isRingDownX,isPinkyUp,isPinkyDown,isPinkyDownX,isThumbUp,isThumbDown,isThumbDownX,isThumbUpX);
    }
  }
  else{
    pose = 'none';
  }
}

//그리기를 위한 손동작 판단 함수
function HandForisDrawing(isIndexUp,isIndexDown,isMiddleUp,isMiddleDown,isRingUp,isRingDown,isPinkyUp,isPinkyDown,isThumbDownX)
{
  //손그림을 그릴지 안 그릴지 선택하는 손동작과 지우기 기능의 손동작을 구분하는 함수
  if (isIndexUp && isMiddleDown && isRingDown && isPinkyDown && isThumbDownX) {
    pose = 'start drawing';
    isDrawing = true;
    isNext = false;
  }
  else if (isIndexUp && isMiddleDown && isRingDown && isPinkyUp && isThumbDownX) {  // 지우기 기능을 판단하는 조건
    pose = 'erase drawing';
    isDrawing = false;
    isNext = true;
    drawing = []; 
  }
}

function HandForColor(isIndexUp,isMiddleUp,isMiddleDown,isRingUp,isRingDown,isPinkyUp,isPinkyDown,isThumbDownX)
{
  //그리기 색상을 선택하는 손동작을 구분하는 함수
  if (isIndexUp && isMiddleUp && isRingDown && isPinkyDown && isThumbDownX) { // 빨강
    pose = 'red';
    red = 237;
    green = 66;
    blue = 66;
  }
  else if (isIndexUp && isMiddleUp && isRingUp && isPinkyDown && isThumbDownX) { // 파랑
    pose = 'blue';
    red = 65;
    green = 110;
    blue = 242;
  }
  else if (isIndexUp && isMiddleUp && isRingUp && isPinkyUp && isThumbDownX) { // 초록
    pose = 'green';
    red = 73;
    green = 245;
    blue = 125;
  }
}

function HandForEmoji(isIndexUp,isIndexDown,isIndexDownX,isIndexUpX,isMiddleUp,isMiddleDown,isMiddleDownX,isRingUp,isRingDown,isRingDownX,isPinkyUp,isPinkyDown,isPinkyDownX,isThumbUp,isThumbDown,isThumbDownX,isThumbUpX){
  //어떤 emoji를 띄울 것인지 손동작을 통해 구분하는 함수
  if (isIndexUp && isMiddleUp && isRingUp && isPinkyUp && !isThumbDownX) { //img0 (발언권)
    pose = 'My Turn';
    showEmoji_0Index = 0;
  }
  else if (isIndexUpX && isMiddleDownX && isRingDownX && isPinkyDownX && isThumbUpX) { //img1 (사진 모드)
    pose = 'photo';
    showEmoji_1Index = 1;
  }
  else if (isIndexDownX && isMiddleDownX && isRingDownX && isPinkyDownX && isThumbUp) { //img2 (좋아요)
    pose = 'Good';
    showEmoji_2Index = 2;
  }
  else if (isIndexDownX && isMiddleDownX && isRingDownX && isPinkyDownX && isThumbDown) { //img3 (싫어요)
    pose = 'Bad';
    showEmoji_3Index = 3;
  }    
}

//이모지 애니메이션을 표현하는 함수
function showEmoji_0(index){
  if(index < 4){
    let progress = constrain(currentFrame[index] / totalFrames, 0, 1); // 0 ~ 1의 값으로 현재 프레임rate를 표현

    for (let Emo of randomImg[index]) {
      let newY = Emo.y - progress * 100; // 위로 이동
      image(img[index], Emo.x, newY, Emo.size, Emo.size); // 이모지 사이즈와 위치에 맞게 그림
    }
  
    currentFrame[index]++;
  
    // 프레임 rate가 total을 넘어서면 초기화 + 프레임 리셋
    if (currentFrame[index] >= totalFrames) {
      resetEmoji(index);
      currentFrame[index] = 0;
      showEmoji_0Index = 100;
    }  
  }
}

function showEmoji_1(index){
  if(index < 4){
    let progress = constrain(currentFrame[index] / totalFrames, 0, 1);

    for (let Emo of randomImg[index]) {
      let newY = Emo.y - progress * 100;
      image(img[index], Emo.x, newY, Emo.size, Emo.size);
    }
  
    currentFrame[index]++;
  
    if (currentFrame[index] >= totalFrames) {
      resetEmoji(index);
      currentFrame[index] = 0;
      showEmoji_1Index = 100;
    }  
  }
}

function showEmoji_2(index){
  if(index < 4){
    let progress = constrain(currentFrame[index] / totalFrames, 0, 1);

    for (let Emo of randomImg[index]) {
      let newY = Emo.y - progress * 100;
      image(img[index], Emo.x, newY, Emo.size, Emo.size);
    }
  
    currentFrame[index]++;
  
    if (currentFrame[index] >= totalFrames) {
      resetEmoji(index);
      currentFrame[index] = 0;
      showEmoji_2Index = 100;
    }  
  }
}

function showEmoji_3(index){
  if(index < 4){
    let progress = constrain(currentFrame[index] / totalFrames, 0, 1);

    for (let Emo of randomImg[index]) {
      let newY = Emo.y - progress * 100;
      image(img[index], Emo.x, newY, Emo.size, Emo.size);
    }
  
    currentFrame[index]++;
  
    if (currentFrame[index] >= totalFrames) {
      resetEmoji(index);
      currentFrame[index] = 0;
      showEmoji_3Index = 100;
    }  
  }
}

// 이모지 초기화
function resetEmoji(index){
  randomImg[index] = []; // 랜덤하게 생성된 이모지 배열을 초기화
  for (let i = 0; i < 10; i++) { // 그리고 다시 이모지 배열을 재설정함
    let size = random(40, 100);
    randomImg[index].push({
      x: random(0, width - size),
      y: random(0, height - size),
      size: size,
    });
  }
}

// 손이 감지될 때마다 호출되는 콜백 함수
function gotHands(results) {
  hands = results;
}
