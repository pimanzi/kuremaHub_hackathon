import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqData = [
    {
      question: 'What is Kurema Hub?',
      answer:
        'Kurema Hub is an art platform designed to help artists showcase their artwork, connect with viewers, and receive feedback. It allows artists to upload, update, and delete their artwork, all for free, without commissions.',
    },
    {
      question: 'How can I upload my artwork to Kurema Hub?',
      answer:
        'To upload your artwork, first create an account. Once logged in, click on your profile avatar to access the page where you can manage your arts. From there, you can upload as many pieces as you like.',
    },
    {
      question: 'Is there a limit to the number of artworks I can upload?',
      answer:
        'No, there is no limit. Artists can upload as many artworks as they wish for free.',
    },
    {
      question: 'Do I need to pay to use Kurema Hub as an artist?',
      answer:
        'No, Kurema Hub is currently free for artists. There are no fees or commissions.',
    },
    {
      question: 'Can I update the details of my uploaded artwork later?',
      answer:
        'Yes, you can update your artwork details. Simply log in, click on your profile avatar, and navigate to the "Manage Arts" page, where you can update any information about your artwork.',
    },
    {
      question: 'What should I do if I want to delete an artwork?',
      answer:
        'Deleting artwork is also managed through the "Manage Arts" page. Log in, click on your profile avatar, and you\'ll find the option to delete any of your uploaded artworks.',
    },
    {
      question: 'How can I contact the admins of Kurema Hub?',
      answer:
        'To contact the admins, visit the "Contact" section of the website, where you\'ll find all the information you need to reach out to them.',
    },
    {
      question:
        'Is there any quality or size restriction for uploading artwork images?',
      answer:
        'Yes, the artwork must be an image file, and only one image can be uploaded per art piece.',
    },
    {
      question: 'Can I get feedback on my artwork from other users?',
      answer:
        "Yes, users can leave feedback on your artwork. To view the feedback, simply click on the artwork, and you'll immediately see who has provided feedback.",
    },
    {
      question:
        'Do users need an account to view or provide feedback on my artwork?',
      answer:
        'No, users are not required to have an account to view or provide feedback on your artwork.',
    },
  ];

  return (
    <section id="faq" className="py-28 bg-neutral-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-center mb-4 font-['Baskerville'] text-primary">
          FAQs
        </h2>
        <p className="text-center md:text-xl text-gray-600 mb-12">
          Find answers to common questions about Kurema Hub
        </p>
        <div className="w-full mx-auto">
          {faqData.map((faq, index) => (
            <div key={index} className="mb-4">
              <button
                className="w-full text-left p-4 rounded-lg bg-gray-50/20 border-2 border-gray-700 hover:bg-gray-100 transition-colors duration-200 flex justify-between items-center"
                onClick={() =>
                  setActiveIndex(activeIndex === index ? null : index)
                }
              >
                <span className="font-semibold text-primary md:text-2xl">
                  {faq.question}
                </span>
                <span className="text-accent text-xl">
                  {activeIndex === index ? '−' : '+'}
                </span>
              </button>
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 text-gray-600 bg-white rounded-b-lg border-x border-b">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
