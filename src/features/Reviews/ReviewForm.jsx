import { useForm, Controller } from 'react-hook-form';
import { useState } from 'react';
import { useCreateReview } from './useCreateReview';
import Stars from '@/components/Stars';

export default function ReviewForm({ id, setOpen }) {
  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  const { createReview, isCreating } = useCreateReview();
  const [rating, setRating] = useState(0);

  const onSubmit = (data) => {
    createReview(
      {
        ...data,
        rate: rating,
        artId: id,
      },
      {
        onSettled: () => {
          setOpen(false);
          reset();
        },
      }
    );
  };

  return (
    <div className="space-y-4 border-t border-gray-200 pt-6">
      <h3 className="text-lg font-semibold">Leave a Review</h3>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        {/* Name Field */}
        <div>
          <input
            id="name"
            placeholder="Your Name"
            className="w-full rounded-md border border-gray-200 px-3 py-2 focus:border-primary focus:outline-none"
            {...register('names', { required: 'Name is required' })}
          />
          {errors.names && (
            <span className="text-xs text-red-500">{errors.names.message}</span>
          )}
        </div>

        {/* Email Field */}
        <div>
          <input
            id="email"
            type="email"
            placeholder="Your Email"
            className="w-full rounded-md border border-gray-200 px-3 py-2 focus:border-primary focus:outline-none"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: 'Please enter a valid email address',
              },
            })}
          />
          {errors.email && (
            <span className="text-xs text-red-500">{errors.email.message}</span>
          )}
        </div>

        {/* Review Field */}
        <div>
          <Controller
            name="comment"
            rules={{ required: 'Review is required' }}
            control={control}
            render={({ field }) => (
              <textarea
                {...field}
                value={field.value}
                disabled={false}
                placeholder="Write your review..."
                className="w-full rounded-md border border-gray-200 px-3 py-2 focus:border-primary focus:outline-none"
                rows={4}
              />
            )}
          />
          {errors.comment && (
            <span className="text-xs text-red-500">
              {errors.comment.message}
            </span>
          )}
        </div>

        <div className="space-y-2">
          <Stars
            rating={rating} // Current rating
            maxStars={5}
            color="#2C3E50"
            size={20}
            showRating={true}
            onSetRatingOutside={(newRating) => setRating(newRating)} // Update the rating
          />
          {rating > 0 && (
            <p className="text-sm text-gray-700">
              Selected Rating: {rating} / 5
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          disabled={isCreating}
          type="submit"
          className="w-full rounded-md bg-primary py-2 text-sm font-medium text-neutral-white hover:opacity-90"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
}
