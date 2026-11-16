// 퀘스트 데이터 — 장소, 좌표, 선물 정보는 이 파일만 고치면 된다.
//
// 좌표(lat/lng) 주의: 아래 값은 주소를 보고 넣은 "추정치"다.
// 반경 100m 인증에 쓰기에는 부정확할 수 있으므로, GPS 인증을 붙이는 단계에서
// 카카오맵 주소 검색으로 정확한 값을 확인한 뒤 coordsVerified를 true로 바꾼다.
//
// 선물(gift) 정보는 아직 예시다. image에는 public/ 폴더 기준 경로를 넣는다.
// (예: public/gifts/1.jpg → image: 'gifts/1.jpg') 비워 두면 emoji가 대신 보인다.

export const site = {
  brand: '오타쿠 발자국',
  eyebrow: 'Birthday party',
  titleLine1: 'YOU',
  titleLine2: 'B IN vited.',
  introCopy:
    '티켓에 적힌 장소를 따라가 봐!! 각 장소에 도착해야만 어떤 선물인지 확인할 수 있어.',
  heroSpeech: ['지도를 따라가면 숨겨진', '선물을 찾을 수 있어!'],
  // 첫 화면 배너 이미지. public/ 기준 경로를 넣으면 기본 일러스트 대신 보인다.
  heroImage: null,
}

export const DEFAULT_RADIUS_M = 100

export const quests = [
  {
    id: 'q1',
    place: '홍대입구역 4번 출구',
    address: '서울 마포구 양화로 지하 160 홍대입구역 4번 출구',
    lat: 37.5579,
    lng: 126.9256,
    coordsVerified: false,
    radius: DEFAULT_RADIUS_M,
    hint: '모험의 출발점! 숫자 4가 적힌 출구를 찾아 올라와 봐.',
    description: '오늘의 여정이 시작되는 곳이야. 출구 앞에 서면 첫 번째 선물이 열려.',
    gift: {
      title: '첫 번째 선물',
      description: '여기에 선물 설명을 적어 주세요.',
      emoji: '🎁',
      image: null,
    },
  },
  {
    id: 'q2',
    place: '돈수백 홍대 직영점',
    address: '서울 마포구 홍익로6길 74',
    lat: 37.5561,
    lng: 126.9236,
    coordsVerified: false,
    radius: DEFAULT_RADIUS_M,
    hint: '뜨끈한 국물 냄새가 나는 곳. 든든하게 배부터 채우자!',
    description: '모험가에게는 밥심이 필요해. 식당 앞에 도착하면 두 번째 선물이 열려.',
    gift: {
      title: '두 번째 선물',
      description: '여기에 선물 설명을 적어 주세요.',
      emoji: '🍲',
      image: null,
    },
  },
  {
    id: 'q3',
    place: 'LC TOWER B3F',
    address: '서울 마포구 양화로 186 LC TOWER B3F',
    lat: 37.5577,
    lng: 126.9263,
    coordsVerified: false,
    radius: DEFAULT_RADIUS_M,
    hint: '큰길가의 높은 타워. 이번에는 위가 아니라 지하 3층으로!',
    description: '건물 아래에 숨겨진 장소야. 타워에 도착하면 세 번째 선물이 열려.',
    gift: {
      title: '세 번째 선물',
      description: '여기에 선물 설명을 적어 주세요.',
      emoji: '🎮',
      image: null,
    },
  },
  {
    id: 'q4',
    place: '히어로보드게임카페',
    address: '서울 마포구 와우산로21길 31-10 2층',
    lat: 37.5537,
    lng: 126.9243,
    coordsVerified: false,
    radius: DEFAULT_RADIUS_M,
    hint: '주사위와 카드가 기다리는 2층. 오늘의 영웅은 누구일까?',
    description: '한 판 승부의 시간! 카페 앞에 도착하면 네 번째 선물이 열려.',
    gift: {
      title: '네 번째 선물',
      description: '여기에 선물 설명을 적어 주세요.',
      emoji: '🎲',
      image: null,
    },
  },
  {
    id: 'q5',
    place: '들풀한상',
    address: '서울 마포구 동교로 156-5',
    lat: 37.5571,
    lng: 126.9203,
    coordsVerified: false,
    radius: DEFAULT_RADIUS_M,
    hint: '들풀 향이 가득한 한 상 차림이 기다리고 있어.',
    description: '생일에는 맛있는 밥상이지. 식당 앞에 도착하면 다섯 번째 선물이 열려.',
    gift: {
      title: '다섯 번째 선물',
      description: '여기에 선물 설명을 적어 주세요.',
      emoji: '🍚',
      image: null,
    },
  },
  {
    id: 'q6',
    place: '토커바웃커피 브루어스',
    address: '서울 마포구 동교로 185 2층',
    lat: 37.5589,
    lng: 126.9217,
    coordsVerified: false,
    radius: DEFAULT_RADIUS_M,
    hint: '마지막 발자국은 커피 향을 따라 2층으로.',
    description: '여정의 마지막 장소야. 카페에 도착하면 마지막 선물이 열려.',
    gift: {
      title: '마지막 선물',
      description: '여기에 선물 설명을 적어 주세요.',
      emoji: '☕',
      image: null,
    },
  },
]

export const ending = {
  eyebrow: 'Quest complete',
  title: '생일 축하해!',
  message:
    '여섯 개의 발자국을 모두 모았어. 오늘 하루가 오래 기억에 남는 모험이었으면 좋겠어.',
  from: '',
}
