'use client';
import { useState } from 'react';
import { HomeFooterButton, HomeHeader, HomeMain } from './_components';
import { GREEN, PURPLE, RED, YELLOW } from '@/constants';

export type CheckStateType = {
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
    const [checkState, setCheckState] = useState<CheckStateType>({
        checkedCount: 0,
        colorCheckedCount: {
            green: 0,
            purple: 0,
            red: 0,
            yellow: 0,
        },
    });
    const handleClick = (isCheck: boolean, color?: ColorType) => {
        setCheckState((p) => ({
            ...p,
            checkedCount: isCheck ? p.checkedCount + 1 : p.checkedCount - 1,
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
    return (
        <>
            <HomeHeader checkState={checkState} />
            <HomeMain handleClick={handleClick} />
            <HomeFooterButton />
        </>
    );
}
