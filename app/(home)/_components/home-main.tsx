import { ColorType } from "../page";
import { memo, useEffect, useRef, useState } from "react";
import { FixedSizeGrid } from "react-window";
import CheckItem from "./home-check-item";

const TOTAL_ITEMS = 1_000_000;
const ITEM_SIZE = 40;
const GAP_SIZE = 4;

interface HomeMainProps {
  isShowIndex: boolean;
  jumpToTarget: number;
  checkedIdxs: number[];
  handleClick: (
    isCheck: boolean,
    idx: number,
    color: ColorType | undefined,
  ) => void;
}

type ConfigType = {
  columns: number;
  width: number;
};

const getColums = (width: number) => Math.floor(width / (ITEM_SIZE + GAP_SIZE));

const HomeMain = memo(
  ({ handleClick, checkedIdxs, jumpToTarget, isShowIndex }: HomeMainProps) => {
    const gridRef = useRef<FixedSizeGrid>(null);
    const [config, setConfig] = useState<ConfigType>({
      columns: getColums(window.innerWidth),
      width: window.innerWidth,
    });

    const rowCount = Math.ceil(TOTAL_ITEMS / config.columns);

    useEffect(() => {
      if (jumpToTarget >= 0 && gridRef.current) {
        const rowIndex = Math.floor(jumpToTarget / config.columns);

        gridRef.current.scrollTo({
          scrollTop: rowIndex * (ITEM_SIZE + GAP_SIZE) - 320,
        });
      }
    }, [jumpToTarget, config.columns]);

    useEffect(() => {
      const handleResize = () => {
        const count = getColums(window.innerWidth);
        if (count === config.columns) return;
        else
          setConfig({
            columns: count,
            width: window.innerWidth,
          });
      };

      window.addEventListener("resize", handleResize);

      return () => window.removeEventListener("resize", handleResize);
    }, [config.columns]);

    return (
      <main className="h-full pt-20">
        <section className="h-full bg-slate-200">
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
              isShowIndex,
              jumpToTarget,
              checkedIdxs,
              handleClick,
            }}
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
