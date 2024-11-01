import { GridChildComponentProps } from 'react-window';
import { ColorType } from '../page';
import { GREEN, PURPLE, RED, YELLOW } from '@/constants';
import { useMemo, useRef } from 'react';

const getColor = (idx: number): ColorType | undefined => {
    if (idx % 90 === 0) return YELLOW;
    if (idx % 370 === 0) return PURPLE;
    if (idx % 250 === 0) return RED;
    if (idx % 130 === 0) return GREEN;
    return undefined;
};

const getBorderColor = (idx: number): string => {
    if (idx % 90 === 0) return 'border-yellow-400';
    if (idx % 370 === 0) return 'border-purple-800';
    if (idx % 250 === 0) return 'border-red-800';
    if (idx % 130 === 0) return 'border-green-800';
    return 'border-black';
};

interface CheckItemProps extends GridChildComponentProps {
    data: {
        checkedIdxs: number[];
        columnCount: number;
        handleClick: (
            isCheck: boolean,
            idx: number,
            color: ColorType | undefined
        ) => void;
    };
}

export default function CheckItem({
    columnIndex,
    rowIndex,
    style,
    data,
}: CheckItemProps) {
    const { columnCount, handleClick, checkedIdxs } = data;
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
        <div
            ref={divRef}
            style={style}
            className="flex items-center justify-center"
        >
            <input
                className="hidden peer"
                type="checkbox"
                id={`checkbox-${idx}`}
                onChange={onChange}
                checked={checkedIdxs.some((id) => id === idx)}
            />
            <label
                className={`border-2 rounded-md size-full peer-checked:bg-red-500  cursor-pointer hover:bg-gray-100 
                    ${getBorderColor(idx)}`}
                htmlFor={`checkbox-${idx}`}
                title={`Item #${idx + 1}`}
            >
                {idx}
            </label>
        </div>
    );
}
