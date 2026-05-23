import Banner from "@/components/Banner";
import InnovationStats from "@/components/InnovationStats";
import StartupRoadmap from "@/components/StartUpRoadMap";
import TopInnovators from "@/components/TopInnovators";
import TrendingPage from "@/components/Trending";

export default function Home() {
  return (
    <div className="container mx-auto">

      <Banner></Banner>
      <TrendingPage></TrendingPage>
      <InnovationStats></InnovationStats>
      <StartupRoadmap></StartupRoadmap>
      <TopInnovators></TopInnovators>
      
    </div>
  );
}
