import { useState } from "react";
import {
  ArrowLeft,
  Heart,
  Star,
  MapPin,
  Clock,
  Phone,
  Globe,
  Car,
  Users,
  Coffee,
  Droplets,
  Package,
  Edit,
} from "lucide-react";
import { ClimbingGym, Country, Review, TabType } from "../types";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";
import { ReviewCard } from "./ReviewCard";
import { WriteReviewDialog } from "./WriteReviewDialog";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface GymDetailPageProps {
  gym: ClimbingGym;
  reviews: Review[];
  isSaved: boolean;
  loading?: boolean;
  onBack: () => void;
  onSaveToggle: (gymId: string) => void;
  onReviewLike: (reviewId: string) => void;
  onReviewComment: (reviewId: string) => void;
  onNewReview: (review: {
    nickname: string;
    country: Country;
    rating: number;
    text: string;
  }) => void;
}

export function GymDetailPage({
  gym,
  reviews,
  isSaved,
  loading = false,
  onBack,
  onSaveToggle,
  onReviewLike,
  onReviewComment,
  onNewReview,
}: GymDetailPageProps) {
  const [activeTab, setActiveTab] = useState<TabType>("info");
  const [isWriteReviewOpen, setIsWriteReviewOpen] = useState(false);

  const facilityIcons = {
    샤워실: Droplets,
    락커: Package,
    렌탈장비: Package,
    카페: Coffee,
    주차장: Car,
    키즈존: Users,
  };

  return (
    <div className="min-h-screen bg-white pb-6">
      {/* Header Image */}
      <div className="relative h-64">
        <ImageWithFallback
          src={gym.image}
          alt={gym.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/50 to-transparent">
          <div className="flex items-center justify-between p-4 pt-12">
            <button
              onClick={onBack}
              className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => onSaveToggle(gym.id)}
              className={`p-2 backdrop-blur-sm rounded-full ${
                isSaved
                  ? "bg-red-500 text-white"
                  : "bg-white/20 text-white hover:bg-white/30"
              }`}
            >
              <Heart className={`w-5 h-5 ${isSaved ? "fill-current" : ""}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Basic Info */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h1 className="text-2xl font-bold text-gray-900">{gym.name}</h1>
          <div className="flex items-center gap-1">
            <Star className="w-5 h-5 text-yellow-400 fill-current" />
            <span className="font-semibold text-gray-900">{gym.rating}</span>
            <span className="text-gray-600">({gym.reviewCount})</span>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-4 text-gray-600">
          <MapPin className="w-4 h-4" />
          <span>{gym.location.address}</span>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {gym.tags.map((tag, index) => (
            <Badge key={index} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as TabType)}
      >
        <TabsList className="w-full mx-4 mb-6">
          <TabsTrigger value="info" className="flex-1">
            정보
          </TabsTrigger>
          <TabsTrigger value="routes" className="flex-1">
            루트
          </TabsTrigger>
          <TabsTrigger value="reviews" className="flex-1">
            리뷰
          </TabsTrigger>
        </TabsList>

        <div className="px-4">
          <TabsContent value="info" className="space-y-4">
            {/* Operating Hours */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-gray-600" />
                <span className="font-medium">운영시간</span>
              </div>
              <p className="text-gray-700">{gym.info.hours}</p>
            </div>

            {/* Contact */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-600" />
                  <span className="text-gray-700">{gym.info.phone}</span>
                </div>
                {gym.info.website && (
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-gray-600" />
                    <a
                      href={gym.info.website}
                      className="text-blue-600 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      웹사이트
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Pricing */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium mb-2">이용요금</h3>
              <div className="space-y-1 text-gray-700">
                <div>일일권: {gym.info.pricing.dayPass}</div>
                <div>월회원: {gym.info.pricing.monthly}</div>
              </div>
            </div>

            {/* Facilities */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium mb-3">시설 정보</h3>
              <div className="grid grid-cols-2 gap-3">
                {gym.info.facilities.map((facility, index) => {
                  const IconComponent =
                    facilityIcons[facility as keyof typeof facilityIcons] ||
                    Package;
                  return (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-gray-700"
                    >
                      <IconComponent className="w-4 h-4" />
                      <span className="text-sm">{facility}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="routes" className="space-y-4">
            {/* Bouldering Routes */}
            {gym.routes.bouldering.count > 0 && (
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-medium mb-3">
                  볼더링 ({gym.routes.bouldering.count}개 루트)
                </h3>
                <div className="flex flex-wrap gap-2">
                  {gym.routes.bouldering.grades.map((grade, index) => (
                    <Badge key={index} variant="outline">
                      {grade}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Lead Climbing Routes */}
            {gym.routes.leading.count > 0 && (
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-medium mb-3">
                  리드 클라이밍 ({gym.routes.leading.count}개 루트)
                </h3>
                <div className="flex flex-wrap gap-2">
                  {gym.routes.leading.grades.map((grade, index) => (
                    <Badge key={index} variant="outline">
                      {grade}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="reviews" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">리뷰 ({reviews.length})</h3>
              <Button
                onClick={() => setIsWriteReviewOpen(true)}
                className="flex items-center gap-2"
              >
                <Edit className="w-4 h-4" />
                리뷰 쓰기
              </Button>
            </div>

            <div className="space-y-4">
              {loading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              ) : reviews.length > 0 ? (
                reviews.map((review) => (
                  <ReviewCard
                    key={review.id}
                    review={review}
                    onLike={onReviewLike}
                    onComment={onReviewComment}
                  />
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>아직 리뷰가 없습니다.</p>
                  <p className="text-sm mt-1">첫 번째 리뷰를 작성해보세요!</p>
                </div>
              )}
            </div>
          </TabsContent>
        </div>
      </Tabs>

      <WriteReviewDialog
        isOpen={isWriteReviewOpen}
        onClose={() => setIsWriteReviewOpen(false)}
        gymName={gym.name}
        onSubmit={onNewReview}
      />
    </div>
  );
}
