import { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useArts } from './useArts';
import Stars from '@/components/Stars';
import { useReviews } from '../Reviews/useReviews';
import { useParams } from 'react-router-dom';
import { LeaveReview } from '../Reviews/PopverComponent';

const ArtPage = () => {
  const { reviews } = useReviews();
  const { id } = useParams();
  const { isLoading, arts } = useArts();

  const artShow = arts?.find((art) => art.id === Number(id));
  const Author =
    artShow?.authUsers?.firstName + ' ' + artShow?.authUsers?.lastName;

  const email = artShow?.authUsers?.email;
  const avatar = artShow?.authUsers?.avatar;
  const artReviews =
    reviews?.filter((review) => review.artId === Number(id)) || [];
  const rateAverage = artReviews?.length
    ? artReviews.reduce((acc, elem) => acc + elem.rate, 0) / artReviews.length
    : 0;

  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);

  const handlePrevReview = () => {
    setCurrentReviewIndex((prevIndex) =>
      prevIndex === 0 ? artReviews.length - 1 : prevIndex - 1
    );
  };

  const handleNextReview = () => {
    setCurrentReviewIndex((prevIndex) =>
      prevIndex === artReviews.length - 1 ? 0 : prevIndex + 1
    );
  };

  if (isLoading)
    return (
      <div className="h-screen flex justify-center items-center">
        <div className="loader"></div>
      </div>
    );

  return (
    <div className="h-screen bg-[#F8F9FA] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-[#FFFFFF] rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            {/* Art Image */}
            <div className="md:w-1/2">
              <div className="h-[40vh] md:h-[60vh] bg-[#E9ECEF] relative">
                <img
                  src={artShow.image}
                  alt={artShow.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Art Details */}
            <div className="md:w-1/2 p-6">
              <h1 className="text-3xl font-bold text-[#2C3E50] mb-2">
                {artShow.name}
              </h1>

              <div className="flex items-center mb-4">
                <Stars rating={rateAverage} color="#2C3E50" size={24} />
                <span className="text-gray-600">
                  ({rateAverage.toFixed(1)} / 5)
                </span>
              </div>

              <div className="flex items-center mb-6">
                <img
                  src={avatar ? avatar : '/images/default-user.jpg'}
                  alt="avatar"
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <div className="text-[#2C3E50] font-medium">
                    Author name: {Author}
                  </div>
                  <div className="text-[#495057]">Author email: {email}</div>
                </div>
              </div>

              <p className="text-[#495057] mb-6">{artShow.description}</p>

              <div className="mb-6">
                <span className="text-[#495057] font-medium">Price:</span>
                <span className="text-[#2C3E50] text-xl font-bold ml-2">
                  {artShow.price}
                </span>
              </div>

              <div className=" flex justify-center w-full bg-[#2C3E50] text-[#E9ECEF] py-3 rounded-lg mb-4 hover:bg-opacity-90 transition duration-200">
                <a href={`mailto: ${artShow?.authUsers.email}`}>
                  Chat with Author
                </a>
              </div>

              <LeaveReview id={id}></LeaveReview>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="p-6 border-t border-[#E9ECEF]">
            <h2 className="text-2xl font-bold text-[#2C3E50] mb-6 text-center">
              Reviews
            </h2>

            <div className="relative">
              <div className="max-w-2xl mx-auto bg-[#FFFFFF] rounded-lg border border-[#E9ECEF] p-6 min-h-[200px]">
                {artReviews.length > 0 ? (
                  artReviews.map((review, index) => (
                    <div
                      key={index}
                      className={`${
                        index === currentReviewIndex ? 'block' : 'hidden'
                      }`}
                    >
                      <div className="flex items-center mb-3">
                        <img
                          src="/images/default-user.jpg"
                          alt="avatar"
                          className="w-12 h-12 rounded-full mr-3"
                        />
                        <div>
                          <div className="text-[#2C3E50] font-medium">
                            {review.names}
                          </div>
                          <div className="text-[#495057] text-sm">
                            {review.email}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center mb-2">
                        <Stars rating={review.rate} color="#ffcb05" size={20} />
                        <span className="text-[#495057] ml-2">
                          {new Date(review.created_at).toLocaleDateString()}
                        </span>
                      </div>

                      <p className="text-[#495057]">{review.comment}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-[#495057] text-center">No reviews yet.</p>
                )}
              </div>

              {/* Navigation Buttons (Only show if more than one review) */}
              {artReviews.length > 1 && (
                <>
                  <button
                    onClick={handlePrevReview}
                    className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-4 bg-[#2C3E50] text-[#E9ECEF] rounded-full p-2 hover:bg-opacity-90 transition duration-200"
                  >
                    <FaChevronLeft />
                  </button>
                  <button
                    onClick={handleNextReview}
                    className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-4 bg-[#2C3E50] text-[#E9ECEF] rounded-full p-2 hover:bg-opacity-90 transition duration-200"
                  >
                    <FaChevronRight />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtPage;
