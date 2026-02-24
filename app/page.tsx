import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import GitHubGraph from "@/components/GitHubGraph";
import LeetCodeStats from "@/components/LeetCodeStats";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import CurrentlyLearning from "@/components/CurrentlyLearning";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <GitHubGraph />
        <LeetCodeStats />
        <Experience />
        <Education />
        <CurrentlyLearning />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
