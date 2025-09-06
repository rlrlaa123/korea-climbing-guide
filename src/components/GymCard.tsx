import { Heart, Star, MapPin } from "lucide-react";
import { ClimbingGym } from "../types";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Badge } from "./ui/badge";

interface GymCardProps {
  key?: ClimbingGym["id"];
  gym: ClimbingGym;
  onTap: (gymId: string) => void;
  isSaved?: boolean;
  onSaveToggle?: (gymId: string) => void;
}

export function GymCard({
  gym,
  onTap,
  isSaved = false,
  onSaveToggle,
}: GymCardProps) {
  // const [imageError, setImageError] = useState(false);

  return (
    <div
      className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]"
      onClick={() => onTap(gym.id)}
    >
      <div className="relative h-48">
        <ImageWithFallback
          src={gym.image}
          alt={gym.name}
          className="w-full h-full object-cover"
        />
        {onSaveToggle && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSaveToggle(gym.id);
            }}
            className={`absolute top-3 right-3 p-2 rounded-full shadow-lg transition-colors ${
              isSaved
                ? "bg-red-500 text-white"
                : "bg-white text-gray-600 hover:text-red-500"
            }`}
          >
            <Heart className={`w-4 h-4 ${isSaved ? "fill-current" : ""}`} />
          </button>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-lg text-gray-900 truncate">
            {gym.name}
          </h3>
          <div className="flex items-center gap-1 ml-2">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium text-gray-700">
              {gym.rating}
            </span>
            <span className="text-xs text-gray-500">({gym.reviewCount})</span>
          </div>
        </div>

        <div className="flex items-center gap-1 mb-3 text-gray-600">
          <MapPin className="w-4 h-4" />
          <span className="text-sm truncate">{gym.location.district}</span>
        </div>

        <div className="flex flex-wrap gap-1">
          {gym.tags.slice(0, 3).map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
          {gym.tags.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{gym.tags.length - 3}
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
}
