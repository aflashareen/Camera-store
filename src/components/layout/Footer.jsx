import { FaInstagram, FaFacebook, FaYoutube, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-black text-gray-400 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-14">

        <div className="grid md:grid-cols-4 gap-10">
          <div>
            <h3 className="text-white font-semibold mb-4">
              Explore
            </h3>
            <ul className="space-y-3">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/shop">Shop</Link></li>
              <li><Link to="/collection">Collection</Link></li>
              <li><Link to="/about">About</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">
              Group Companies
            </h3>

            <ul className="space-y-3">
              <li>
                <a href="https://www.nikon.co.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-white transition">
                  Nikon
                </a>
              </li>

              <li>
                <a href="https://in.canon/en/consumer"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-white transition">
                  Canon
                </a>
              </li>

              <li>
                <a href="https://www.sony.co.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-white transition">
                  Sony
                </a>
              </li>

              <li>
                <a href="https://www.minoltadigital.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 transition hover:text-white">
                  Minolta
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">
              Support
            </h3>
            <ul className="space-y-3">
              <li>Contact</li>
              <li>FAQs</li>
              <li>Shipping</li>
              <li>Returns</li>
            </ul>
          </div>

          <div>
            <p className="text-2xl text-white">Connect with us</p>
            <br />
            <input type="email"
              className="bg-white rounded h-9 w-62"
              placeholder="  Enter your Email" />
            <div className="flex gap-4 mt-6">
              <FaInstagram size={22} className="hover:text-white cursor-pointer transition" />
              <FaFacebook size={22} className="hover:text-white cursor-pointer transition" />
              <FaTwitter size={22} className="hover:text-white cursor-pointer transition" />
              <FaYoutube size={22} className="hover:text-white cursor-pointer transition" />
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center text-sm">
          <p>© 2026 LENSÉ. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;