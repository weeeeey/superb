import { type CheckStateType, ColorType } from "../page";

interface HomeHeaderProps {
  checkState: CheckStateType;
}

export default function HomeHeader({ checkState }: HomeHeaderProps) {
  return (
    <header className="fixed left-0 top-0 flex h-20 w-full min-w-[360px] flex-col bg-black px-2 text-white sm:px-5 md:px-10">
      <section className="my-auto flex items-center justify-between gap-x-4 whitespace-nowrap">
        <div>위영진</div>
        <h1 className="text-xl font-extrabold">백만개의 체크 박스</h1>
        <div>{checkState.checkedCount}개의 박스가 체크</div>
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
