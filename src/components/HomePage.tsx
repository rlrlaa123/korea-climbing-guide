import { useState } from "react";
import { Search, ChevronRight } from "lucide-react";
import { ClimbingGym } from "../types";
import { GymCard } from "./GymCard";
import { Input } from "./ui/input";

interface HomePageProps {
  gyms: ClimbingGym[];
  savedGymIds: string[];
  onGymTap: (gymId: string) => void;
  onSaveToggle: (gymId: string) => void;
}

export function HomePage({
  gyms,
  savedGymIds,
  onGymTap,
  onSaveToggle,
}: HomePageProps) {
  const [searchQuery, setSearchQuery] = useState("");

  // 카테고리별 데이터 분류
  const popularGyms = gyms.filter((gym) => gym.reviewCount > 100);
  const gangnamGyms = gyms.filter((gym) =>
    gym.location.district.includes("강남"),
  );
  const boulderingGyms = gyms.filter((gym) => gym.tags.includes("볼더링"));

  const categories = [
    { title: "인기 클라이밍 짐", gyms: popularGyms, color: "text-purple-600" },
    { title: "강남 지역", gyms: gangnamGyms, color: "text-blue-600" },
    { title: "볼더링 전문", gyms: boulderingGyms, color: "text-green-600" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white px-4 pt-12 pb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          🏔 Korea Climbing Guide
        </h1>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="클라이밍 짐 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-gray-50 border-gray-200"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="space-y-6">
        {categories.map((category, categoryIndex) => (
          <div key={categoryIndex}>
            <div className="flex items-center justify-between px-4 mb-3">
              <h2 className={`text-lg font-semibold ${category.color}`}>
                {category.title}
              </h2>
              <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700">
                더보기
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <div className="flex gap-4 px-4 pb-2">
                {category.gyms.map((gym) => (
                  <div key={gym.id} className="flex-shrink-0 w-72">
                    <GymCard
                      gym={gym}
                      onTap={onGymTap}
                      isSaved={savedGymIds.includes(gym.id)}
                      onSaveToggle={onSaveToggle}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="mt-8 mx-4 bg-white rounded-xl p-6">
        <h3 className="font-semibold text-gray-900 mb-4">📊 커뮤니티 현황</h3>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-600">
              {gyms.length}
            </div>
            <div className="text-sm text-gray-600">등록된 짐</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">
              {gyms.reduce((sum, gym) => sum + gym.reviewCount, 0)}
            </div>
            <div className="text-sm text-gray-600">전체 리뷰</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-600">12</div>
            <div className="text-sm text-gray-600">참여 국가</div>
          </div>
        </div>
      </div>
    </div>
  );
}
