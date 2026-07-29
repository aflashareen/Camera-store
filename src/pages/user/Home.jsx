function Home() {
    return (
        <>
            <div className="bg-neutral-950 text-white w-full h-screen">
                <div className="max-w-7xl flex items-center justify-center h-full px-10 mx-auto">

                    <div className="max-w-lg space-y-8">

                        <span className="tracking-[0.4em] text-sm text-zinc-500 uppercase leading-10">
                            Premium Collection
                        </span>

                        <h1 className="text-6xl font-light leading-tight text-white w-80"> Capture Every Detail.</h1>

                        <p className="font-thin">Crafted for photographers who demand precision in every frame.</p>

                        <button className="px-8 py-4 border border-white hover:bg-white hover:text-black duration-300">Explore Collections </button>
                    </div>

                    <div className="w-[650px] h-[650px]">
                        {/* Canvas goes here */}
                    </div>

                </div>
            </div>
        </>
    )
}
export default Home;