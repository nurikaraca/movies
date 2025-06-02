
import GenreSection from "../components/category/GenreSection";
import HeroSection from "../components/HeroSection";
import { StarBackground } from "../components/StarBackground";

function Home() {
  return (
    <div className=" min-h-screen  text-foreground overflow-x-hidden ">
      {/* Background Effects */}

      <StarBackground />

      <main>
        <HeroSection /> 
      <GenreSection />
      </main>

    </div>
  );
}

export default Home;
