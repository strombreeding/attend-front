export const fightingMsgArr = [
  {
    content: "하잉 모두들 안녕 내가 누군지 아니? 오늘도 힘내라",
    author: "노스트라무스",
    likes: 0,
  },
  {
    content: "윈터바텀킷을 차지해야해! 그건 우리 가문의 보물이니깐!",
    author: "보리스 진네만",
    likes: 0,
  },
  {
    content: "계승 중입니다 아버지.",
    author: "아서스-리치킹",
    likes: 0,
  },
  {
    content: "하나되어 !  싸워라!! 얼라이언스를 위하여!",
    author: "안두인 린",
    likes: 0,
  },
];
export const pick = (arr: any) => {
  let c = 0;
  c = Math.round(Math.random() * arr.length - 1);
  return c;
};
