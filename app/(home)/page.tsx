"use client";
import { useEffect, useState } from "react";
import { HomeFooterButton, HomeHeader, HomeMain } from "./_components";
import { GREEN, PURPLE, RED, YELLOW } from "@/constants";

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

export type ColorType =
  | typeof GREEN
  | typeof PURPLE
  | typeof RED
  | typeof YELLOW;

export default function HomePage() {
  const [mount, setMount] = useState(false);
  const [jumpToTarget, setJumpToTarget] = useState(-1);
  const [checkState, setCheckState] = useState<CheckStateType>({
    checkedIdxs: [],
    checkedCount: 0,
    colorCheckedCount: {
      green: 0,
      purple: 0,
      red: 0,
      yellow: 0,
    },
  });
  const [isShowIndex, setIsShowIndex] = useState(false);

  useEffect(() => {
    setMount(true);
  }, []);

  const handleClick = (
    isCheck: boolean,
    idx: number,
    color: ColorType | undefined,
  ) => {
    if (isCheck)
      setCheckState((p) => ({
        ...p,
        checkedCount: p.checkedCount + 1,
        checkedIdxs: [...p.checkedIdxs, idx],
      }));
    else
      setCheckState((p) => ({
        ...p,
        checkedCount: p.checkedCount - 1,
        checkedIdxs: p.checkedIdxs.filter((id) => id !== idx),
      }));
    if (color) {
      setCheckState((p) => ({
        ...p,
        colorCheckedCount: {
          ...p.colorCheckedCount,
          [color]: isCheck
            ? p.colorCheckedCount[color] + 1
            : p.colorCheckedCount[color] - 1,
        },
      }));
    }
  };

  const selectTarget = (inputValue: string) => {
    const targetNumber = Number(inputValue);
    if (isNaN(targetNumber)) return;
    if (targetNumber < 0) return;
    if (targetNumber > 1_000_000) return;
    if (targetNumber !== Math.floor(targetNumber)) return;

    setJumpToTarget(targetNumber);
  };

  const handleShowIndex = () => setIsShowIndex((p) => !p);

  if (!mount) return;

  return (
    <>
      <HomeHeader checkState={checkState} />
      <HomeMain
        jumpToTarget={jumpToTarget}
        handleClick={handleClick}
        checkedIdxs={checkState.checkedIdxs}
        isShowIndex={isShowIndex}
      />
      <HomeFooterButton
        selectTarget={selectTarget}
        handleShowIndex={handleShowIndex}
      />
    </>
  );
}
