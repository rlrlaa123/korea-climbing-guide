import { useState } from 'react';
import { Heart, MessageCircle, Star } from 'lucide-react';
import { Review } from '../types';
import { Button } from './ui/button';

interface ReviewCardProps {
  review: Review;
  onLike: (reviewId: string) => void;
  onComment: (reviewId: string) => void;
}

export function ReviewCard({ review, onLike, onComment }: ReviewCardProps) {
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    onLike(review.id);
  };

  const formatDate = (dateInput: Date | string) => {
    const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return '오늘';
    if (diffDays === 1) return '1일 전';
    if (diffDays < 30) return `${diffDays}일 전`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)}개월 전`;
    return `${Math.floor(diffDays / 365)}년 전`;
  };

  return (
    <div className="bg-white rounded-lg p-4 border border-gray-200">
      {/* Author Info */}
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
          <span className="text-white font-semibold text-sm">
            {review.author.nickname.charAt(0)}
          </span>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-medium text-gray-900">{review.author.nickname}</span>
            <span className="text-lg">{review.author.country.flag}</span>
            <span className="text-sm text-gray-600">{review.author.country.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              {Array.from({ length: 5 }, (_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${
                    i < review.rating 
                      ? 'text-yellow-400 fill-current' 
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500">
              {formatDate(review.createdAt)}
            </span>
          </div>
        </div>
      </div>

      {/* Review Content */}
      <p className="text-gray-700 mb-3 leading-relaxed">
        {review.text}
      </p>

      {/* Review Images */}
      {review.images && review.images.length > 0 && (
        <div className="flex gap-2 mb-3 overflow-x-auto">
          {review.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Review image ${index + 1}`}
              className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
            />
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-4 pt-2 border-t border-gray-100">
        <button
          onClick={handleLike}
          className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm transition-colors ${
            isLiked
              ? 'text-red-600 bg-red-50'
              : 'text-gray-600 hover:text-red-600 hover:bg-red-50'
          }`}
        >
          <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
          <span>{review.likes + (isLiked ? 1 : 0)}</span>
        </button>
        
        <button
          onClick={() => onComment(review.id)}
          className="flex items-center gap-2 px-3 py-1 rounded-full text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
        >
          <MessageCircle className="w-4 h-4" />
          <span>{review.comments.length}</span>
        </button>
      </div>
    </div>
  );
}