import { arrType } from "../types/types";
const onDays = [0, 1, 6, 2, 3, 4, 5];

export const makeTime = (currentTime: number) => {
  const defaultTime = Math.round((Date.now() - currentTime) / 1000);
  console.log(defaultTime);
  if (defaultTime < 60) {
    return Math.round(defaultTime) + "초 전";
  } else if (defaultTime < 3600) {
    console.log(defaultTime / 6);
    return Math.round(defaultTime / 60) + "분 전";
  } else if (defaultTime < 86400) {
    return Math.round(defaultTime / (60 * 60)) + "시간 전";
  } else if (defaultTime < 2592000) {
    return Math.round(defaultTime / (60 * 60 * 24)) + "일 전";
  } else if (defaultTime < 31536000) {
    return Math.round(defaultTime / (60 * 60 * 24 * 30)) + "달 전";
  } else {
    return Math.round(defaultTime / (60 * 60 * 24 * 365)) + "년 전";
  }
};

export const cutingAttend = (arr: arrType[]) => {
  const passIcon = ["🔴"];
  const newArr = [];
  for (let i = 0; i < arr.length; i++) {
    if (!passIcon.includes(arr[i].attend) && arr[i].index !== -1) {
      newArr.push(arr[i]);
    }
  }
  return newArr;
};

export const getDate = () => {
  const nowDate = new Date();
  const date = {
    year: nowDate.getFullYear(),
    month: nowDate.getMonth() + 1,
    date: nowDate.getDate(),
    second: nowDate.getTime(),
  };
  return date;
};

export const getNowWeek = () => {
  // 아래는 월별 일요일 날짜와 개수 구하는 것
  const nowDate = getDate();
  const now = new Date().getDay();
  if (onDays.includes(now) === false) throw new Error("주일, 월요일에만 출석부 사용이 가능합니다.");
  const lastDate = new Date(nowDate.year, nowDate.month, 0).getDate();
  let weeksCount = 0;
  const zxczxc = [];

  // 이번달 주일 개수 구하기
  for (let i = 1; i <= lastDate; i++) {
    const day = new Date(nowDate.year, nowDate.month - 1, i).getDay();
    const date = new Date(nowDate.year, nowDate.month - 1, i).getDate();
    const totalWeeks = [];
    // 일요일이라면
    if (day === 0) {
      totalWeeks.push(date);
      if (date + 1 <= lastDate) {
        totalWeeks.push(date + 1);
      } else {
        totalWeeks.push(1);
      }
      zxczxc.push(totalWeeks);
      // weeksCount.push(
      //   `${date}~${date + 1} 일까지 ${weeksCount.length + 1}주차 `,
      // );
    }
  }
  for (let i = 0; i < zxczxc.length; i++) {
    if (zxczxc[i].includes(5)) {
      weeksCount = i + 1;
      break;
    }
  }
  // console.log('주일은 총', weeksCount.length, '번, ', weeksCount);
  // const result = [];
  // for (let i = 0; i < context.data.values.length; i++) {
  //   result.push(context.data.values[i][0]);
  // }
  return weeksCount;
};
export const getFamilyCode = (name: string) => {
  const useFulReaderName = [
    "지훈",
    "영은",
    "수민",
    "진실",
    "예은",
    "수정",
    "주연",
    "진희",
    "재운",
    "동욱",
    "혜성",
    "정현",
    "현승",
    "주영",
    "상현",
    "예람",
    "민지",
    "세은",
  ];
  if (useFulReaderName.includes(name) !== true) throw new Error("리더이름 제대로 입력 부탁함");
  let code = null;
  switch (name) {
    case "지훈":
    case "영은":
    case "김원":
      code = 1;
      break;
    case "수민":
    case "진실":
    case "예은":
      code = 2;
      break;
    case "수정":
    case "주연":
      code = 3;
      break;
    case "진희":
    case "재운":
    case "동욱":
      code = 4;
      break;
    case "혜성":
    case "정현":
    case "현승":
      code = 5;
      break;
    case "주영":
    case "상현":
    case "예람":
      code = 6;
      break;
    case "민지":
    case "세은":
      code = 7;
      break;
  }
  return code;
};
