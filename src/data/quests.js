// 퀘스트 데이터 — 장소, 좌표, 선물 정보는 이 파일만 고치면 된다.
//
// 좌표(lat/lng)는 카카오맵 장소 검색 결과다(2026-11-22 확인).
// 장소를 바꾸면 카카오맵에서 새 좌표를 찾아 넣고, 확인 전에는 coordsVerified를 false로 둔다.
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
    address: '서울 마포구 양화로 (홍대입구역 4번 출구)',
    lat: 37.558144,
    lng: 126.925812,
    coordsVerified: true,
    radius: DEFAULT_RADIUS_M,
    hint: '모험의 출발점! 숫자 4가 적힌 출구를 찾아 올라와 봐.',
    description: '오늘의 여정이 시작되는 곳이야. 출구 앞에 서면 첫 번째 선물이 열려.',
    gift: {
      title: '첫 번째 선물',
      description: '여기에 선물 설명을 적어 주세요.',
      emoji: '🎁',
      image: 'gifts/1.png',
    },
  },
  {
    id: 'q2',
    place: '돈수백 홍대 직영점',
    address: '서울 마포구 홍익로6길 74',
    lat: 37.556946,
    lng: 126.925281,
    coordsVerified: true,
    radius: DEFAULT_RADIUS_M,
    hint: '뜨끈한 국물 냄새가 나는 곳. 든든하게 배부터 채우자!',
    description: '모험가에게는 밥심이 필요해. 식당 앞에 도착하면 두 번째 선물이 열려.',
    gift: {
      title: '두 번째 선물',
      description: '여기에 선물 설명을 적어 주세요.',
      emoji: '🍲',
      image: 'gifts/2.png',
    },
  },
  {
    id: 'q3',
    place: 'LC TOWER B3F',
    address: '서울 마포구 양화로 186 LC TOWER B3F',
    lat: 37.557668,
    lng: 126.925893,
    coordsVerified: true,
    radius: DEFAULT_RADIUS_M,
    hint: '큰길가의 높은 타워. 이번에는 위가 아니라 지하 3층으로!',
    description: '건물 아래에 숨겨진 장소야. 타워에 도착하면 세 번째 선물이 열려.',
    gift: {
      title: '세 번째 선물',
      description: '여기에 선물 설명을 적어 주세요.',
      emoji: '🎮',
      image: 'gifts/3.jpg',
    },
  },
  {
    id: 'q4',
    place: '히어로보드게임카페',
    address: '서울 마포구 와우산로21길 31-10 2층',
    lat: 37.552096,
    lng: 126.921846,
    coordsVerified: true,
    radius: DEFAULT_RADIUS_M,
    hint: '주사위와 카드가 기다리는 2층. 오늘의 영웅은 누구일까?',
    description: '한 판 승부의 시간! 카페 앞에 도착하면 네 번째 선물이 열려.',
    gift: {
      title: '네 번째 선물',
      description: '여기에 선물 설명을 적어 주세요.',
      emoji: '🎲',
      image: 'gifts/4.png',
    },
  },
  {
    id: 'q5',
    place: '들풀한상',
    address: '서울 마포구 동교로 156-5',
    lat: 37.555509,
    lng: 126.919817,
    coordsVerified: true,
    radius: DEFAULT_RADIUS_M,
    hint: '들풀 향이 가득한 한 상 차림이 기다리고 있어.',
    description: '생일에는 맛있는 밥상이지. 식당 앞에 도착하면 다섯 번째 선물이 열려.',
    gift: {
      title: '다섯 번째 선물',
      description: '여기에 선물 설명을 적어 주세요.',
      emoji: '🍚',
      image: 'gifts/5.png',
    },
  },
  {
    id: 'q6',
    place: '토커바웃커피 브루어스',
    address: '서울 마포구 동교로 185 2층',
    lat: 37.55711,
    lng: 126.921858,
    coordsVerified: true,
    radius: DEFAULT_RADIUS_M,
    hint: '커피 향을 따라 2층으로 올라가 봐.',
    description: '잠깐 쉬어 가는 카페야. 카페에 도착하면 여섯 번째 선물이 열려.',
    gift: {
      title: '여섯 번째 선물',
      description: '여기에 선물 설명을 적어 주세요.',
      emoji: '☕',
      image: 'gifts/6.png',
    },
  },
  {
    id: 'q7',
    place: '별빛마을웰카운티 1002동',
    address: '인천 남동구 논현로 235 1002동',
    lat: 37.406257,
    lng: 126.730733,
    coordsVerified: true,
    radius: 50,
    hint: '서울을 벗어나 인천으로! 별빛이 내리는 마을의 1002동을 찾아가.',
    description: '이번엔 범위가 좁아. 1002동 바로 앞까지 가야 일곱 번째 선물이 열려.',
    gift: {
      title: '일곱 번째 선물',
      description: '여기에 선물 설명을 적어 주세요.',
      emoji: '🌟',
      image: null,
    },
  },
  {
    id: 'q8',
    place: '아시아선수촌아파트 10동',
    address: '서울 송파구 올림픽로4길 15 아시아선수촌아파트 10동',
    lat: 37.506627,
    lng: 127.076065,
    coordsVerified: true,
    radius: 30,
    hint: '마지막 발자국은 잠실로! 선수들이 묵던 마을의 10동을 찾아가 봐.',
    description: '여정의 마지막 장소야. 범위가 아주 좁으니 10동 바로 앞까지 가야 마지막 선물이 열려.',
    gift: {
      title: '마지막 선물',
      description: '여기에 선물 설명을 적어 주세요.',
      emoji: '🎉',
      image: null,
    },
  },
]

export const ending = {
  eyebrow: 'Quest complete',
  title: '생일 축하해!',
  message:
    '발자국을 하나도 빠짐없이 모았어. 오늘 하루가 오래 기억에 남는 모험이었으면 좋겠어.',
  from: '',
}
