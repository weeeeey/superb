import { type CheckStateType, ColorType } from '../page';

interface HomeHeaderProps {
    checkState: CheckStateType;
}

export default function HomeHeader({ checkState }: HomeHeaderProps) {
    return (
        <header className="fixed top-0 inset-x-0 bg-white h-20">
            <section className="flex justify-between items-center">
                <div>edited by 위영진</div>
                <h1>백만개의 체크 박스</h1>
                <div>{checkState.checkedCount}의 박스가 체크 됨</div>
            </section>
            <ul className="flex items-center justify-end">
                현재 {checkState.checkedCount} (
                {Object.keys(checkState.colorCheckedCount).map((color) => (
                    <li className="mx-2" style={{ color }} key={color}>
                        {checkState.colorCheckedCount[color as ColorType]}
                    </li>
                ))}
                )
            </ul>
        </header>
    );
}
