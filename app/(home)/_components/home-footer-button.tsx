import { FormEvent, useState } from "react";

export default function HomeFooterButton({
  selectTarget,
}: {
  selectTarget: (inputValue: string) => void;
}) {
  const [inputValue, setInputValue] = useState("");
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    selectTarget(inputValue);
  };
  return (
    <footer className="min-x-[360px] fixed bottom-5 right-5">
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
