import React from 'react';

interface ReviewCardProps {
  name: string;
  rating: number;
  comment: string;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ name, rating, comment }) => {
  return (
    <div className="border p-4 rounded bg-white shadow-sm">
      <h3 className="text-lg font-semibold">{name}</h3>
      <div className="text-yellow-500">
        {'★'.repeat(rating)}{'☆'.repeat(5 - rating)}
      </div>
      <p className="mt-2 text-gray-600">{comment}</p>
    </div>
  );
};

export default ReviewCard;
