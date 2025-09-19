import { NavLink } from "react-router-dom";
import { Home, Map, Bookmark, User } from "lucide-react";

export function Navigation() {
  const tabs = [
    { id: "home", icon: Home, label: "Home", path: "/", end: true },
    { id: "map", icon: Map, label: "Map", path: "/map", end: false },
    { id: "saved", icon: Bookmark, label: "Saved", path: "/saved", end: false },
    {
      id: "profile",
      icon: User,
      label: "Profile",
      path: "/profile",
      end: false,
    },
  ] as const;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-50">
      <div className="flex justify-around max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <NavLink
              key={tab.id}
              to={tab.path}
              end={tab.end}
              className={({ isActive }) =>
                `flex flex-col items-center p-2 rounded-lg transition-colors ${
                  isActive
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-500 hover:text-gray-700"
                }`
              }
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs mt-1">{tab.label}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
