import BestSellers from "../../components/bestSellers/BestSellers";
import Categories from "../../components/category/Categories";
import Hero from "../../components/hero/Hero";
import Collections from "./Collection";

function Home() {
    return (
        <>
        <Hero />
        <Categories />
        <BestSellers />
        {/* <FeaturedCamera /> */}
        <Collections />
        
        </>
    )
}
export default Home;