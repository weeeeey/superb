export default function HomeMain() {
    return (
        <main className="h-full pt-20 bg-red-500 px-20 ">
            <section className="h-full bg-green-500 overflow-y-auto ">
                <div className="grid grid-cols-[repeat(auto-fill,minmax(40px,1fr))] gap-1">
                    {Array.from({ length: 1200 }).map((_, idx) => (
                        <div
                            key={idx}
                            className="flex items-center justify-center"
                        >
                            <input
                                className="hidden peer"
                                type="checkbox"
                                id={'' + idx}
                            />
                            <label
                                className="border border-black rounded-md size-4 peer-checked:bg-blue-600 transition-all cursor-pointer"
                                htmlFor={'' + idx}
                            ></label>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}
