import { useEffect, useState } from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useMatch,
  useNavigate,
} from "react-router-dom";
import { Navigation } from "./components/Navigation";
import { HomePage } from "./components/HomePage";
import { GymDetailPage } from "./components/GymDetailPage";
import { SavedPage } from "./components/SavedPage";
import { mockGyms } from "./data/mockData";
import { Review, ClimbingGym, Country } from "./types";
import { reviewsApi, savedGymsApi } from "./services/api";
import { getDeviceId } from "./utils/device";
import { Toast, toast } from "./components/Toast";

function MapPage() {
  return (
    <div className="min-h-screen bg-gray-50 pb-20 flex items-center justify-center">
      <div className="text-center px-4">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">🗺</span>
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">지도 보기</h2>
        <p className="text-gray-600">
          클라이밍 짐 위치를 지도에서
          <br />
          확인할 수 있습니다.
        </p>
      </div>
    </div>
  );
}

function ProfilePage() {
  return (
    <div className="min-h-screen bg-gray-50 pb-20 flex items-center justify-center">
      <div className="text-center px-4">
        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">👤</span>
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">프로필</h2>
        <p className="text-gray-600">
          로그인 없이 이용하는 서비스로
          <br />
          프로필 기능은 준비 중입니다.
        </p>
      </div>
    </div>
  );
}

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const gymMatch = useMatch("/gym/:gymId");
  const selectedGymId = gymMatch?.params?.gymId ?? null;
  const [savedGymIds, setSavedGymIds] = useState<string[]>([]);
  const [gyms] = useState<ClimbingGym[]>(mockGyms);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [deviceId] = useState<string>(getDeviceId());

  useEffect(() => {
    loadSavedGyms();
  }, []);

  useEffect(() => {
    if (selectedGymId) {
      loadReviews(selectedGymId);
    } else {
      setReviews([]);
    }
  }, [selectedGymId]);

  const loadSavedGyms = async () => {
    try {
      const savedIds = await savedGymsApi.getSavedGyms(deviceId);
      setSavedGymIds(savedIds);
    } catch (error) {
      console.error("Failed to load saved gyms:", error);
      toast.error("저장된 짐 목록을 불러오는데 실패했습니다.");
    }
  };

  const loadReviews = async (gymId: string) => {
    try {
      setLoading(true);
      const gymReviews = await reviewsApi.getReviews(gymId);
      setReviews(gymReviews);
    } catch (error) {
      console.error("Failed to load reviews:", error);
      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

  const handleGymTap = (gymId: string) => {
    navigate(`/gym/${gymId}`);
  };

  const handleSaveToggle = async (gymId: string) => {
    try {
      const action = savedGymIds.includes(gymId) ? "unsave" : "save";
      const updatedSavedIds = await savedGymsApi.toggleSaveGym(
        deviceId,
        gymId,
        action,
      );
      setSavedGymIds(updatedSavedIds);
    } catch (error) {
      console.error("Failed to toggle save gym:", error);
      toast.error("저장 설정을 변경하는데 실패했습니다.");
    }
  };

  const handleBack = () => {
    if (location.key !== "default") {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  const handleReviewLike = async (reviewId: string) => {
    if (!selectedGymId) return;

    try {
      const updatedReview = await reviewsApi.likeReview(
        reviewId,
        selectedGymId,
      );
      setReviews((prev) =>
        prev.map((review) => (review.id === reviewId ? updatedReview : review)),
      );
    } catch (error) {
      console.error("Failed to like review:", error);
      toast.error("좋아요 처리에 실패했습니다.");
    }
  };

  const handleReviewComment = (reviewId: string) => {
    console.log("Comment on review:", reviewId);
  };

  const handleNewReview = async (newReviewData: {
    nickname: string;
    country: Country;
    rating: number;
    text: string;
  }) => {
    if (!selectedGymId) return;

    try {
      const newReview = await reviewsApi.createReview(
        selectedGymId,
        newReviewData,
      );
      setReviews((prev) => [newReview, ...prev]);
      toast.success("리뷰가 성공적으로 등록되었습니다!");
    } catch (error) {
      console.error("Failed to create review:", error);
      toast.error("리뷰 작성에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const selectedGym = selectedGymId
    ? gyms.find((gym) => gym.id === selectedGymId)
    : null;
  const gymReviews = selectedGymId
    ? reviews.filter((review) => review.gymId === selectedGymId)
    : [];
  const savedGyms = gyms.filter((gym) => savedGymIds.includes(gym.id));
  const isGymDetail = Boolean(selectedGymId);

  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              gyms={gyms}
              savedGymIds={savedGymIds}
              onGymTap={handleGymTap}
              onSaveToggle={handleSaveToggle}
            />
          }
        />
        <Route path="/map" element={<MapPage />} />
        <Route
          path="/saved"
          element={
            <SavedPage
              savedGyms={savedGyms}
              onGymTap={handleGymTap}
              onSaveToggle={handleSaveToggle}
            />
          }
        />
        <Route path="/profile" element={<ProfilePage />} />
        <Route
          path="/gym/:gymId"
          element={
            selectedGym ? (
              <GymDetailPage
                gym={selectedGym}
                reviews={gymReviews}
                isSaved={savedGymIds.includes(selectedGym.id)}
                loading={loading}
                onBack={handleBack}
                onSaveToggle={handleSaveToggle}
                onReviewLike={handleReviewLike}
                onReviewComment={handleReviewComment}
                onNewReview={handleNewReview}
              />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {!isGymDetail && <Navigation />}

      <Toast />
    </div>
  );
}
