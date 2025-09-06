import { useState } from 'react';
import { Grid, List, MapPin, Star } from 'lucide-react';
import { ClimbingGym } from '../types';
import { GymCard } from './GymCard';
import { Button } from './ui/button';

interface SavedPageProps {
  savedGyms: ClimbingGym[];
  onGymTap: (gymId: string) => void;
  onSaveToggle: (gymId: string) => void;
}

export function SavedPage({ savedGyms, onGymTap, onSaveToggle }: SavedPageProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  if (savedGyms.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 pb-20 flex items-center justify-center">
        <div className="text-center px-4">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <MapPin className="w-8 h-8 text-gray-400" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">저장된 짐이 없습니다</h2>
          <p className="text-gray-600 mb-6">
            마음에 드는 클라이밍 짐을 찾아서<br />
            하트 버튼을 눌러 저장해보세요!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white px-4 pt-12 pb-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">💾 저장된 짐</h1>
          <div className="flex items-center bg-gray-100 rounded-lg p-1">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="p-2"
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="p-2"
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <p className="text-gray-600 mt-2">{savedGyms.length}개의 짐을 저장했습니다</p>
      </div>

      {/* Content */}
      <div className="px-4">
        {viewMode === 'grid' ? (
          <div className="grid gap-4">
            {savedGyms.map((gym) => (
              <GymCard
                key={gym.id}
                gym={gym}
                onTap={onGymTap}
                isSaved={true}
                onSaveToggle={onSaveToggle}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {savedGyms.map((gym) => (
              <div
                key={gym.id}
                onClick={() => onGymTap(gym.id)}
                className="bg-white rounded-lg p-4 border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">{gym.name}</h3>
                    <div className="flex items-center gap-2 mb-2 text-gray-600">
                      <MapPin className="w-3 h-3" />
                      <span className="text-sm">{gym.location.district}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium">{gym.rating}</span>
                        <span className="text-xs text-gray-500">({gym.reviewCount})</span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSaveToggle(gym.id);
                        }}
                        className="text-red-500 hover:text-red-600"
                      >
                        <span className="text-sm">저장 해제</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Comparison Section */}
      {savedGyms.length > 1 && (
        <div className="mt-6 mx-4 bg-white rounded-xl p-6">
          <h3 className="font-semibold text-gray-900 mb-4">📊 저장된 짐 비교</h3>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">평균 평점</span>
              <span className="font-medium">
                {(savedGyms.reduce((sum, gym) => sum + gym.rating, 0) / savedGyms.length).toFixed(1)}⭐
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">총 리뷰 수</span>
              <span className="font-medium">
                {savedGyms.reduce((sum, gym) => sum + gym.reviewCount, 0)}개
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">지역 분포</span>
              <span className="font-medium">
                {Array.from(new Set(savedGyms.map(gym => gym.location.district))).length}개 지역
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}