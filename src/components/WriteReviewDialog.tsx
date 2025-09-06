import { useState } from "react";
import { Star } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { countries } from "../data/countries";
import { Country } from "../types";

interface WriteReviewDialogProps {
  isOpen: boolean;
  onClose: () => void;
  gymName: string;
  onSubmit: (review: {
    nickname: string;
    country: Country;
    rating: number;
    text: string;
  }) => void;
}

export function WriteReviewDialog({
  isOpen,
  onClose,
  gymName,
  onSubmit,
}: WriteReviewDialogProps) {
  const [nickname, setNickname] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [hoverRating, setHoverRating] = useState(0);

  const handleSubmit = () => {
    if (
      !nickname.trim() ||
      !selectedCountry ||
      rating === 0 ||
      !reviewText.trim()
    ) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    onSubmit({
      nickname: nickname.trim(),
      country: selectedCountry,
      rating,
      text: reviewText.trim(),
    });

    // Reset form
    setNickname("");
    setSelectedCountry(null);
    setRating(0);
    setReviewText("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>{gymName} 리뷰 작성</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Nickname Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              닉네임 *
            </label>
            <Input
              placeholder="닉네임을 입력하세요"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
          </div>

          {/* Country Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              국가 *
            </label>
            <Select
              value={selectedCountry?.code || ""}
              onValueChange={(code) => {
                const country = countries.find((c) => c.code === code);
                setSelectedCountry(country || null);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="국가를 선택하세요">
                  {selectedCountry && (
                    <div className="flex items-center gap-2">
                      <span>{selectedCountry.flag}</span>
                      <span>{selectedCountry.name}</span>
                    </div>
                  )}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {countries.map((country) => (
                  <SelectItem key={country.code} value={country.code}>
                    <div className="flex items-center gap-2">
                      <span>{country.flag}</span>
                      <span>{country.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Rating */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              별점 *
            </label>
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }, (_, i) => i + 1).map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-1 transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-6 h-6 ${
                      star <= (hoverRating || rating)
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
              <span className="ml-2 text-sm text-gray-600">
                {rating > 0 ? `${rating}/5` : "별점을 선택하세요"}
              </span>
            </div>
          </div>

          {/* Review Text */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              리뷰 내용 *
            </label>
            <Textarea
              placeholder="클라이밍 짐에 대한 리뷰를 작성해주세요..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              className="min-h-[100px] resize-none"
            />
            <div className="text-xs text-gray-500 mt-1">
              {reviewText.length}/500
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1">
              취소
            </Button>
            <Button onClick={handleSubmit} className="flex-1">
              리뷰 등록
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
