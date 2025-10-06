import AboutVereda from "@/components/home/AboutVereda";
import FeaturedCourses from "@/components/home/FeaturedCourses";
import Hero from "@/components/home/Hero";
import Management from "@/components/home/Management";
import MentorSuccess from "@/components/home/MentorSuccess";
import Nav from "@/components/navbar/Nav";
import Navbar from "@/components/navbar/Navbar";

export default function Home() {
  return (
    < >
    <Nav/>
        <Navbar/>
      <Hero/>
      <FeaturedCourses/>
      <AboutVereda/>
      <Management/>
      <MentorSuccess/>
      
    </>
  )
}
