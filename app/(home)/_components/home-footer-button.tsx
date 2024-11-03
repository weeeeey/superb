import { FormEvent, useState } from "react";

export default function HomeFooterButton({
  selectTarget,
  handleShowIndex,
}: {
  selectTarget: (inputValue: string) => void;
  handleShowIndex: () => void;
}) {
  const [inputValue, setInputValue] = useState("");
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    selectTarget(inputValue);
  };
  return (
    <footer className="min-x-[360px] fixed bottom-5 right-5">
      <button
        className="bg-red-500 p-1 px-4 font-semibold text-white"
        onClick={handleShowIndex}
      >
        체크박스 인덱스 보기
      </button>
      <form className="flex items-center" onSubmit={handleSubmit}>
        <input
          className="border-4 border-blue-500 px-2 py-1"
          type="text"
          placeholder="checkbox number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button className="bg-blue-500 px-2 py-2 text-white first-letter:uppercase">
          jump!
        </button>
      </form>
    </footer>
  );
}
