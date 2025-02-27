import { useState } from 'react';
import Hero from '../components/Hero';

const Home = () => {
  const [selectedFaq, setSelectedFaq] = useState(null);

  const features = [
    {
      title: 'Managing Arts',
      description: 'Easily manage and showcase your artwork collection',
    },
    {
      title: 'Collaboration',
      description: 'Connect with other artists and art enthusiasts',
    },
    {
      title: 'AI support chatbot',
      description: 'Get instant help with our intelligent assistant',
    },
    {
      title: 'AI Assistant',
      description: 'Personalized recommendations and insights',
    },
  ];

  const whyChooseUs = [
    {
      title: 'Exclusive art collection',
      description:
        'Discover unique, high-quality artwork from talented artists worldwide',
    },
    {
      title: 'Secure Transactions',
      description:
        'Safe and protected payment processing for buyers and sellers',
    },
    {
      title: 'Artist Community',
      description: 'Join a thriving community of creative professionals',
    },
  ];

  const featuredArtworks = [
    { title: 'Iron Throne', price: 400, artist: 'Michael', rating: 4.5 },
    { title: 'Abstract Dreams', price: 550, artist: 'Sarah', rating: 4.8 },
    { title: "Nature's Call", price: 300, artist: 'David', rating: 4.7 },
  ];

  const faqs = [
    {
      question: 'What is KuremaHub?',
      answer:
        'KuremaHub is a platform for artists to showcase and sell their artwork...',
    },
    {
      question: 'How can I upload my artwork to KuremaHub?',
      answer: 'Simply create an account and follow our easy upload process...',
    },
    {
      question: 'Do I need to pay to use KuremaHub?',
      answer:
        'Basic accounts are free. Premium features available for subscribers...',
    },
    {
      question: 'What payment methods does KuremaHub use?',
      answer: 'We accept major credit cards, PayPal, and bank transfers...',
    },
  ];

  return (
    <div className="font-['Baskerville'] bg-secondary min-h-screen">
      {/* Hero Section */}
      <Hero></Hero>

      {/* Features Section */}
      <section className="py-16 bg-neutral-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl text-center mb-12">Our Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="p-6 bg-gray-100 rounded-lg">
                <div className="w-12 h-12 bg-primary rounded-full mb-4"></div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-700">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl text-center mb-12">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whyChooseUs.map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-accent rounded-full mx-auto mb-4"></div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-700">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Artworks */}
      <section className="py-16 bg-neutral-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl text-center mb-12">Featured ArtWorks</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredArtworks.map((artwork, index) => (
              <div
                key={index}
                className="bg-gray-100 rounded-lg overflow-hidden"
              >
                <div className="h-64 bg-gray-200"></div>{' '}
                {/* Placeholder for artwork image */}
                <div className="p-4">
                  <h3 className="text-xl font-semibold">{artwork.title}</h3>
                  <p className="text-primary font-bold">${artwork.price}</p>
                  <div className="flex items-center mt-2">
                    <span className="text-sm text-gray-700">
                      {artwork.artist}
                    </span>
                    <div className="ml-auto">
                      {/* Star rating */}
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={`text-sm ${
                              i < artwork.rating
                                ? 'text-accent'
                                : 'text-gray-300'
                            }`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <button className="bg-primary text-neutral-white px-6 py-2 rounded-full">
              Discover More
            </button>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl text-center mb-12">FAQs</h2>
          <div className="max-w-2xl mx-auto">
            {faqs.map((faq, index) => (
              <div key={index} className="mb-4">
                <button
                  className="w-full text-left p-4 bg-neutral-white rounded-lg flex justify-between items-center"
                  onClick={() =>
                    setSelectedFaq(selectedFaq === index ? null : index)
                  }
                >
                  <span className="font-semibold">{faq.question}</span>
                  <span>{selectedFaq === index ? '−' : '+'}</span>
                </button>
                {selectedFaq === index && (
                  <div className="p-4 bg-gray-100 mt-2 rounded-lg">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary text-neutral-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl mb-6">Ready To Show Case your Arts</h2>
          <p className="mb-8">
            Join Other Artists who trust us to showcase their artwork
          </p>
          <button className="bg-neutral-white text-primary px-8 py-3 rounded-full font-semibold">
            Contact Us
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
