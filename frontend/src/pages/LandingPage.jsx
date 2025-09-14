import React, { useState } from "react";
import { Code, Trophy, Users, TrendingUp } from "lucide-react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Stats from "../components/Stats";
import Features from "../components/Features";
import ProbCategories from "../components/ProbCategories";
import Testimonials from "../components/Testimonials";
import CTA from "../components/CTA";
import Footer from "../components/Footer";

function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const features = [
    {
      icon: Code,
      title: "1000+ Problems",
      description: "Curated coding challenges from beginner to expert level",
    },
    {
      icon: Trophy,
      title: "Competitive Contests",
      description:
        "Weekly contests to test your skills against global developers",
    },
    {
      icon: TrendingUp,
      title: "Progress Tracking",
      description: "Detailed analytics to monitor your coding journey",
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Learn from discussions and solutions shared by peers",
    },
  ];

  const stats = [
    { number: "50K+", label: "Active Users" },
    { number: "1M+", label: "Problems Solved" },
    { number: "500+", label: "Companies" },
    { number: "99%", label: "Success Rate" },
  ];

  const testimonials = [
    {
      name: "Alex Chen",
      role: "Software Engineer at Google",
      content:
        "This platform helped me ace my technical interviews. The problems are well-structured and the explanations are clear.",
      rating: 5,
    },
    {
      name: "Sarah Johnson",
      role: "Full Stack Developer",
      content:
        "The best coding practice platform I've used. Love the dark theme and smooth user experience.",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      {/* Hero Section */}
      <Hero />

      {/* Stats Section */}
      <Stats stats={stats} />

      {/* Features Section */}
      <Features features={features} />

      {/* Problem Categories */}
      <ProbCategories />

      {/* Testimonials */}
      <Testimonials testimonials={testimonials} />

      {/* CTA Section */}
      <CTA />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default LandingPage;
