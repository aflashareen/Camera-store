import Categories from "../../components/category/Categories";
import Hero from "../../components/hero/Hero";
import Collections from "./Collection";
import TopPicks from "../../components/topPicks/TopPicks";

function Home() {
    return (
        <>
        <Hero />
        <Categories />
        <TopPicks />
        {/* <FeaturedCamera /> */}
        <Collections />
        
        </>
    )
}
export default Home;