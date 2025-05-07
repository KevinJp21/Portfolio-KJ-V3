import { Metadata } from "next";
import Layout from "./components/layout/Layout";
import Hero from "./sections/Home/Hero/Hero";
export const metadata: Metadata = {
    title: "Portfolio | Kevin Julio",
    description: "Soy Kevin Julio Pineda (KevinJp21), ingeniero de sistemas especializado en desarrollo Full-Stack Descubre mis trabajos y habilidades en mi portfolio.",
  };
  
export default function Home() {
  return (
    <Layout>
      <Hero />
    </Layout>
  );
}

