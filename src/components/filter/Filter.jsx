import React from "react";

function Filter({
    categories,
    selectedCategory,
    onCategoryChange,
    sortBy,
    onSortChange,
}) {
    const categoryList = React.useMemo(
        () => ["All", ...categories],
        [categories]
    );
    return (
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

            <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-8 border-b border-zinc-800 pb-8">
                <div>
                    <p className="text-xs uppercase tracking-[0.4em] text-zinc-500">
                        Discover
                    </p>

                    <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-light text-white">
                        Shop Cameras
                    </h2>
                </div>

 
                <div className="flex items-center gap-4 overflow-x-auto whitespace-nowrap scrollbar-hide pb-2">

                    {categoryList.map((category) => (
                        <button
                            key={category}
                            onClick={() => onCategoryChange(category)}
                            className={`relative text-sm tracking-widest uppercase transition-all duration-300 ${selectedCategory === category
                                ? "text-white"
                                : "text-zinc-500 hover:text-white"}`}>
                            {category}
                            <span
                                className={`absolute left-0 -bottom-2 h-[1px] bg-white transition-all duration-300 ${selectedCategory === category
                                    ? "w-full"
                                    : "w-0 group-hover:w-full"
                                    }`} />
                        </button>))}

                    <div className="h-6 w-px bg-zinc-700 mx-3" />

                    <div className="relative">
                        <select
                            value={sortBy}
                            onChange={(e) => onSortChange(e.target.value)}
                            className="
                             appearance-none
                             sm:w-auto
                             bg-[#111111]
                             border border-zinc-700
                             text-white
                             px-4 pr-10
                             py-2.5
                             rounded-lg
                             text-sm
                             tracking-wide
                             outline-none
                             hover:border-black
                             focus:border-black
                             transition
                             cursor-pointer">
                            <option value="default">Sort By</option>
                            <option value="low-high">Price: Low → High</option>
                            <option value="high-low">Price: High → Low</option>
                            <option value="rating">Top Rated</option>
                        </select>

                        <svg
                            className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24">
                            <path d="M6 9l6 6 6-6" />
                        </svg>
                    </div>

                </div>

            </div>

        </div>
    );
}

export default Filter;