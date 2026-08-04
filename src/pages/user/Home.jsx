import Categories from "../../components/category/Categories";
import Hero from "../../components/hero/Hero";
import TopPicks from "../../components/topPicks/TopPicks";
import FeaturedBrands from "../../components/featuredBrands/FeaturedBrands";

function Home() {
    return (
        <>
        <Hero />
        <Categories />
        <TopPicks />
        <FeaturedBrands />       
        </>
    )
}
export default Home;