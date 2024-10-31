import { GREEN, PURPLE, RED, YELLOW } from '@/constants';
import { ColorType } from '../page';

interface HomeMainProps {
    handleClick: (isCheck: boolean, color?: ColorType) => void;
}

export default function HomeMain({ handleClick }: HomeMainProps) {
    return (
        <main className="h-full pt-20 bg-red-500 px-20 ">
            <section className="h-full bg-blue-400 overflow-y-auto  ">
                <div className="grid grid-cols-[repeat(auto-fill,minmax(40px,1fr))] gap-1">
                    <CheckWrapper handleClick={handleClick} sectionNumber={0} />
                    <CheckWrapper handleClick={handleClick} sectionNumber={1} />
                    <CheckWrapper handleClick={handleClick} sectionNumber={2} />
                </div>
            </section>
        </main>
    );
}

interface CheckWrapperProps extends HomeMainProps {
    sectionNumber: number;
}

function CheckWrapper({ handleClick, sectionNumber }: CheckWrapperProps) {
    return (
        <section className="contents">
            {Array.from({ length: 1000 }).map((_, idx) => (
                <CheckItem
                    key={idx + sectionNumber * 1000}
                    handleClick={handleClick}
                    idx={idx}
                    sectionNumber={sectionNumber}
                />
            ))}
        </section>
    );
}

interface CheckItemProps extends HomeMainProps {
    idx: number;
    sectionNumber: number;
}

function CheckItem({ handleClick, idx, sectionNumber }: CheckItemProps) {
    const checkItemId = String(idx + sectionNumber * 1000);
    return (
        <div className="flex items-center justify-center">
            <input
                className="hidden peer"
                type="checkbox"
                id={checkItemId}
                onChange={(e) => {
                    let color;
                    if (idx % 30 === 0) color = GREEN;
                    if (idx % 50 === 0) color = RED;
                    if (idx % 70 === 0) color = PURPLE;
                    if (idx % 90 === 0) color = YELLOW;

                    if (color)
                        handleClick(e.target.checked, color as ColorType);
                    else handleClick(e.target.checked);
                }}
            />
            <label
                className={`border-2 rounded-md size-4 peer-checked:bg-blue-600 transition-all cursor-pointer border-black
                                    ${idx % 30 === 0 && 'border-green-800'}
                                    ${idx % 50 === 0 && 'border-red-800'}
                                    ${idx % 70 === 0 && 'border-purple-800'}
                                    ${idx % 90 === 0 && 'border-yellow-400'}
                                    `}
                htmlFor={checkItemId}
            ></label>
        </div>
    );
}
