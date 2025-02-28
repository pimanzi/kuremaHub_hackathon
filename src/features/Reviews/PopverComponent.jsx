import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { useState } from 'react';
import ReviewForm from './ReviewForm';

export function LeaveReview({ id }) {
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen} sideOffset={10}>
      <PopoverTrigger asChild>
        <button className="w-full bg-[#FFFFFF] text-[#2C3E50] py-3 rounded-lg border border-[#2C3E50] hover:bg-[#E9ECEF] transition duration-200">
          Add a Review
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-full">
        <ReviewForm setOpen={setOpen} id={id}></ReviewForm>
      </PopoverContent>
    </Popover>
  );
}
