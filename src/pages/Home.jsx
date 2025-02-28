import { useState } from 'react';
//import Footer from '../components/Footer'

import Hero from '@/components/Hero';
import Features from '@/components/Features';
import { FaPaintBrush, FaShieldAlt, FaUsers } from 'react-icons/fa';
import { useArts } from '@/features/arts/useArts';
import RollingGallery from '../components/RollingGallery';
<<<<<<< HEAD
import NavBar from '../components/NavBar.jsx';
=======
import NavBar from '../components/NavBar'
>>>>>>> b775dd246f94abefe8a2711c934647a3fb22146a
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';

const Home = () => {
  const { arts, isLoading } = useArts();

  const whyChooseUs = [
    {
      title: 'Exclusive art collection',
      description:
        'Discover unique, high-quality artwork from talented artists worldwide',
      icon: <FaPaintBrush className="text-3xl text-neutral-white" />,
    },
    {
      title: 'Secure Transactions',
      description:
        'Safe and protected payment processing for buyers and sellers',
      icon: <FaShieldAlt className="text-3xl text-neutral-white" />,
    },
    {
      title: 'Artist Community',
      description: 'Join a thriving community of creative professionals',
      icon: <FaUsers className="text-3xl text-neutral-white" />,
    },
  ];

  if (isLoading)
    return (
      <div className="h-screen flex justify-center items-center">
        {' '}
        <div className="loader"></div>
      </div>
    );
  return (
    <div className="font-['Baskerville'] bg-secondary min-h-screen">
      {/* Hero Section */}
      <NavBar />
      <Hero></Hero>

      {/* Features Section */}
      <Features></Features>
      {/* Why Choose Us */}
      <section id="about" className="py-28">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl text-center mb-12 font-['Baskerville'] text-primary">
            Why Choose Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whyChooseUs.map((item, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-accent rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg transform transition-transform group-hover:scale-110 group-hover:bg-primary">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-primary">
                  {item.title}
                </h3>
                <p className="text-gray-700 text-lg leading-relaxed ">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Artworks */}
      <section id="arts" className="py-16 bg-[#F8FAFC]">
        <div className="container mx-auto">
          <h2 className="text-4xl text-center mb-12 font-['Baskerville'] text-primary">
            Featured ArtWorks
          </h2>
          {arts && arts.length > 0 ? (
            <RollingGallery arts={arts} autoplay={true} pauseOnHover={true} />
          ) : (
            <div className="text-center text-gray-500">
              No artworks available
            </div>
          )}

          <div className="flex justify-center ">
            {' '}
            <button className="bg-primary text-neutral-white px-8 py-3 rounded-full hover:bg-accent transition-colors">
              Explore Gallery
            </button>
          </div>
        </div>
      </section>

      <FAQ></FAQ>
      {/* Call to Action */}
      <Footer/>
    </div>
  );
};

export default Home;
