import { useRef, useLayoutEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../services/productService";
import PicksCard from "./PicksCard";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function TopPicks() {
  const { data: products = [], isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const sectionRef = useRef(null);
  const sliderRef = useRef(null);

useLayoutEffect(() => {
  if (!products.length) return;

  const slider = sliderRef.current;
  const section = sectionRef.current;

  const distance = slider.scrollWidth - window.innerWidth;

  const ctx = gsap.context(() => {
    gsap.to(slider, {
      x: -distance,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=" + distance,
        pin: true,
        scrub: true,
        invalidateOnRefresh: true,
      },
    });
  }, section);

  ScrollTrigger.refresh();

  return () => ctx.revert();
}, [products]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong.</p>;

  return (
    <section
      ref={sectionRef}
      className="overflow-hidden bg-zinc-900 py-20"
    >
      <div className="px-8">
        <h2 className="text-5xl text-white mb-10">
          Top Picks
        </h2>

        <div
          ref={sliderRef}
          className="flex gap-6 w-max"
        >
          {products.slice(9, 16).map((product) => (
            <PicksCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default TopPicks;