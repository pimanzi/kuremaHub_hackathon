import {
  MdCollections,
  MdGroups,
  MdSmartToy,
  MdAutoAwesome,
} from 'react-icons/md';
import { FaPalette, FaHandshake, FaRobot, FaLightbulb } from 'react-icons/fa';
import SpotlightCard from './SpotlightCard';
import { useState } from 'react';

const Features = () => {
  const [expandedFeatures, setExpandedFeatures] = useState({});

  const features = [
    {
      title: 'Managing Arts',
      description:
        'Easily manage and showcase your artwork collection with our intuitive tools and beautiful gallery layouts. Create stunning portfolios that capture the essence of your artistic vision. Our platform provides comprehensive tools for organizing, tagging, and presenting your work professionally.',
      shortDescription:
        'Easily manage and showcase your artwork collection with our intuitive tools and beautiful gallery layouts. Create stunning portfolios that capture the essence of your artistic vision.',
      icon: <FaPalette className="text-3xl text-primary" />,
      secondaryIcon: <MdCollections className="text-2xl text-accent" />,
      spotlightColor: 'rgba(44, 62, 80, 0.3)',
    },
    {
      title: 'Collaboration',
      description:
        'Connect with fellow artists and art enthusiasts in our vibrant community. Share ideas, receive valuable feedback, and collaborate on projects that push creative boundaries. Join discussion groups, participate in virtual exhibitions, and grow your artistic network globally.',
      shortDescription:
        'Connect with fellow artists and art enthusiasts in our vibrant community. Share ideas, receive valuable feedback, and collaborate on projects that push creative boundaries.',
      icon: <FaHandshake className="text-3xl text-primary" />,
      secondaryIcon: <MdGroups className="text-2xl text-accent" />,
      spotlightColor: 'rgba(52, 73, 94, 0.3)',
    },
    {
      title: 'AI Support Chatbot',
      description:
        'Experience 24/7 intelligent assistance tailored to your artistic needs. Get instant answers to your questions and helpful guidance whenever inspiration strikes.',
      icon: <FaRobot className="text-3xl text-primary" />,
      secondaryIcon: <MdSmartToy className="text-2xl text-accent" />,
      spotlightColor: 'rgba(44, 62, 80, 0.15)',
    },
    {
      title: 'AI Assistant',
      description:
        'Unlock personalized recommendations and insights that help you discover new artistic possibilities. Let our AI guide you to inspiration and connect you with art that resonates.',
      icon: <FaLightbulb className="text-3xl text-primary" />,
      secondaryIcon: <MdAutoAwesome className="text-2xl text-accent" />,
      spotlightColor: 'rgba(52, 73, 94, 0.15)',
    },
  ];

  return (
    <section id="features" className="py-28 bg-neutral-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl text-center mb-12 font-['Baskerville'] text-primary">
          Our Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <SpotlightCard key={index} spotlightColor={feature.spotlightColor}>
              <div className="flex flex-col h-full p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative w-16 h-16 rounded-xl bg-gray-100 flex items-center justify-center shadow-md group">
                    {feature.icon}
                    <div className="absolute -bottom-2 -right-2 w-9 h-9 rounded-lg bg-neutral-white shadow-md flex items-center justify-center transform transition-transform group-hover:scale-110">
                      {feature.secondaryIcon}
                    </div>
                  </div>
                  <h3 className="text-2xl font-semibold text-primary font-['Baskerville']">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-gray-700 text-lg leading-relaxed">
                  {expandedFeatures[index]
                    ? feature.description
                    : feature.shortDescription || feature.description}
                </p>
                {feature.shortDescription && (
                  <button
                    onClick={() =>
                      setExpandedFeatures((prev) => ({
                        ...prev,
                        [index]: !prev[index],
                      }))
                    }
                    className="mt-4 text-accent hover:text-primary transition-colors duration-300 text-sm font-medium flex items-center gap-1"
                  >
                    {expandedFeatures[index] ? 'Read Less' : 'Read More'}
                    <span className="text-xs">
                      {expandedFeatures[index] ? '↑' : '↓'}
                    </span>
                  </button>
                )}
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
