import { ColorType } from "../page";
import { memo, useEffect, useRef } from "react";
import { FixedSizeGrid } from "react-window";
import CheckItem from "./home-check-item";

const TOTAL_ITEMS = 1_000_000;
const ITEM_SIZE = 40;
const GAP_SIZE = 4;

const config = { columns: 20, width: 1000 };
const rowCount = Math.ceil(TOTAL_ITEMS / config.columns);
interface HomeMainProps {
  jumpToTarget: number;
  checkedIdxs: number[];
  handleClick: (
    isCheck: boolean,
    idx: number,
    color: ColorType | undefined,
  ) => void;
}

const HomeMain = memo(
  ({ handleClick, checkedIdxs, jumpToTarget }: HomeMainProps) => {
    const gridRef = useRef<FixedSizeGrid>(null);

    useEffect(() => {
      if (jumpToTarget >= 0 && gridRef.current) {
        const rowIndex = Math.floor(jumpToTarget / config.columns);

        gridRef.current.scrollTo({
          scrollTop: rowIndex * 44 - 320,
        });
      }
    }, [jumpToTarget]);

    return (
      <main className="h-full px-4 pt-20 sm:px-6 md:px-8 lg:px-10 xl:px-20">
        <section className="h-full overflow-hidden">
          <FixedSizeGrid
            ref={gridRef}
            columnCount={config.columns}
            columnWidth={ITEM_SIZE + GAP_SIZE}
            height={window.innerHeight - 80}
            rowCount={rowCount}
            rowHeight={ITEM_SIZE + GAP_SIZE}
            width={config.width}
            itemData={{
              columnCount: config.columns,
              checkedIdxs,
              handleClick,
            }}
            className="mx-auto bg-slate-200"
          >
            {CheckItem}
          </FixedSizeGrid>
        </section>
      </main>
    );
  },
);
HomeMain.displayName = "HomeMain";

export default HomeMain;
