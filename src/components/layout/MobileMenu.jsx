import { Search, UserRound, Heart, ShoppingBag, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

function MobileMenu({ open, setMenuOpen, user, search, handleSearch, wishlistCount, cartCount }) {

    const closeMenu = () => {
        setMenuOpen(false);
    };

    return (
        <>
            <div className="flex items-center gap-4 lg:hidden">
                <Link to="/cart" className="relative">
                    <ShoppingBag size={20} />
                    {cartCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                            {cartCount}
                        </span>
                    )}
                </Link>
                <button onClick={() => setMenuOpen(!open)}
                    className="p-1">
                    {open ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {open && (
                <div className="absolute top-full left-0 w-full lg:hidden border-t border-white/10 bg-neutral-950">
                    <div className="px-6 py-6 space-y-6">
                        <div className="relative">
                            <Search size={18}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input type="text"
                                placeholder="Search cameras..."
                                value={search}
                                onChange={handleSearch}
                                className="w-full rounded bg-white px-4 py-3 pl-10 text-black focus:outline-none"
                            />
                        </div>
                        <div className="flex flex-col gap-5">
                            <MobileNavItem to="/"
                                text="Home"
                                onClick={closeMenu} />

                            <MobileNavItem to="/shop"
                                text="Shop"
                                onClick={closeMenu} />

                            <MobileNavItem to="/collection"
                                text="Collection"
                                onClick={closeMenu} />

                            <MobileNavItem to="/about"
                                text="About"
                                onClick={closeMenu} />
                        </div>
                        <div className="flex items-center gap-6 pt-4 border-t border-white/10">
                            <Link to={user ? "/profile" : "/login"}
                                onClick={closeMenu}
                                className="flex items-center gap-2 text-zinc-400 hover:text-white">
                                {user ? (<div className="w-7 h-7 rounded-full bg-white text-black flex items-center justify-center text-sm">
                                    {user?.fullname?.charAt(0).toUpperCase()}
                                </div>) : (
                                    <UserRound size={20} />
                                )}
                                <span>
                                    {user ? "Profile" : "Login"}
                                </span>
                            </Link>
                            <Link
                                to="/wishlist"
                                onClick={closeMenu}
                                className="flex items-center gap-2 text-zinc-400 hover:text-white">
                                <Heart size={20} />
                                <span>
                                    Wishlist
                                    {wishlistCount > 0 && ` (${wishlistCount})`}
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

function MobileNavItem({ to, text, onClick }) {
    return (
        <Link
            to={to}
            onClick={onClick}
            className="text-lg tracking-[0.15em] uppercase text-zinc-300 hover:text-white">

            {text}
        </Link>
    );
}

export default MobileMenu;