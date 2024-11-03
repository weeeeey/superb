import { GridChildComponentProps } from "react-window";
import { ColorType } from "../page";
import { GREEN, PURPLE, RED, YELLOW } from "@/constants";
import { useMemo, useRef } from "react";

const getColor = (idx: number): ColorType | undefined => {
  if (idx % 25 === 0) return YELLOW;
  if (idx % 37 === 0) return PURPLE;
  if (idx % 59 === 0) return RED;
  if (idx % 89 === 0) return GREEN;
  return undefined;
};

const getBorderColor = (idx: number): string => {
  if (idx % 25 === 0) return "border-yellow-500";
  if (idx % 37 === 0) return "border-purple-500";
  if (idx % 59 === 0) return "border-red-500";
  if (idx % 89 === 0) return "border-green-500";
  return "border-black";
};

interface CheckItemProps extends GridChildComponentProps {
  data: {
    checkedIdxs: number[];
    jumpToTarget: number;
    columnCount: number;
    isShowIndex: boolean;
    handleClick: (
      isCheck: boolean,
      idx: number,
      color: ColorType | undefined,
    ) => void;
  };
}

export default function CheckItem({
  columnIndex,
  rowIndex,
  style,
  data,
}: CheckItemProps) {
  const { columnCount, handleClick, checkedIdxs, jumpToTarget, isShowIndex } =
    data;
  const divRef = useRef<HTMLDivElement>(null);

  const idx = useMemo(() => {
    return rowIndex * columnCount + columnIndex;
  }, [rowIndex, columnCount, columnIndex]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    const color = getColor(idx);
    handleClick(isChecked, idx, color);
  };

  return (
    <div ref={divRef} style={style}>
      <input
        className="hidden"
        type="checkbox"
        id={`checkbox-${idx}`}
        onChange={onChange}
        checked={checkedIdxs.some((id) => id === idx)}
      />
      <label htmlFor={`checkbox-${idx}`} title={`checkbox ${idx}`}>
        <span
          className={`truncate ${getBorderColor(idx)} border-2 ${jumpToTarget === idx && "ring-2 ring-blue-500 ring-offset-2"}`}
        >
          {isShowIndex && idx}
        </span>
      </label>
    </div>
  );
}
