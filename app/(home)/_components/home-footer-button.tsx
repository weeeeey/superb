export default function HomeFooterButton() {
    return (
        <footer className="fixed bottom-5 right-5 min-x-[360px] flex justify-end ">
            <input
                className="border-4 border-blue-500 px-2 py-1"
                type="text"
                placeholder="checkbox number"
            />
            <button className="first-letter:uppercase bg-blue-500 text-white px-2 py-2">
                jump!
            </button>
        </footer>
    );
}
