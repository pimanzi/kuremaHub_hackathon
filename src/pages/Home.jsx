//import Footer from '../components/Footer'
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import { FaPaintBrush, FaShieldAlt, FaUsers } from 'react-icons/fa';
import { useArts } from '@/features/arts/useArts';
import RollingGallery from '../components/RollingGallery';
import NavBar from '../components/NavBar';
import FAQ from '@/components/FAQ';
import ChatBot from '@/components/ArtChartBot/ChatBot';
import { useNavigate } from 'react-router-dom';
import Footer from '@/components/Footer';
import SpotlightCard from '@/components/SpotlightCard';

const Home = () => {
  const { arts, isLoading } = useArts();
  const navigate = useNavigate();

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
            <button
              onClick={() => {
                navigate('catalogue');
              }}
              className="bg-primary text-neutral-white px-8 py-3 rounded-full hover:bg-accent transition-colors"
            >
              Explore Gallery
            </button>
          </div>
        </div>
      </section>

      <FAQ></FAQ>
      {/* Call to Action */}

      <div className="bg-white pb-10">
        <div className="  mx-auto w-full lg:w-[40vw]">
          <SpotlightCard spotlightColor="rgba(52, 73, 94, 0.3)">
            <div className="w-full flex flex-col items-center py-9">
              <h2 className="text-4xl mb-6">Ready To Show Case your Arts</h2>
              <p className="mb-8">
                Join Other Artists who trust us to showcase their artwork
              </p>
              <button className="bg-primary text-neutral-white px-6 sm:px-8 py-2 sm:py-3 rounded-full hover:bg-accent transition-colors  text-center">
                <a href="tel:0790101642" className="block">
                  Contact us
                </a>
              </button>
            </div>
          </SpotlightCard>
        </div>
      </div>

      <Footer></Footer>
      <ChatBot />
    </div>
  );
};

export default Home;
