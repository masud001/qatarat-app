import React, { useState, useEffect, useRef } from "react";

interface NotificationButtonProps {
  notifications: string[];
  className?: string;
  isDropdownDisabled?: boolean; // Prop to disable the dropdown
}

const NotificationButton: React.FC<NotificationButtonProps> = ({
  notifications,
  className = "",
  isDropdownDisabled = false,
}) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const hasNotifications = notifications.length > 0;

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!isDropdownOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Notification Button */}
      <NotificationButtonIcon
        hasNotifications={hasNotifications}
        isDropdownDisabled={isDropdownDisabled}
        onClick={() => {
          if (!isDropdownDisabled) {
            setDropdownOpen(!isDropdownOpen);
          }
        }}
      />

      {/* Dropdown */}
      {isDropdownOpen && !isDropdownDisabled && (
        <NotificationDropdown notifications={notifications} hasNotifications={hasNotifications} />
      )}
    </div>
  );
};

const NotificationButtonIcon: React.FC<{
  hasNotifications: boolean;
  isDropdownDisabled: boolean;
  onClick: () => void;
}> = ({ hasNotifications, isDropdownDisabled, onClick }) => (
  <button
    aria-label="Toggle notifications dropdown"
    className={`bg-(--theme-background-color) p-2.5 rounded-full relative cursor-pointer ${
      isDropdownDisabled ? " " : " "
    }`}
    onClick={onClick}
    disabled={isDropdownDisabled}
  >
    <img
      className="w-5 h-5"
      src="/images/notification-icons.svg"
      alt="Notification icon"
    />
    {hasNotifications && (
      <span
        className="absolute top-2 w-2.5 h-2.5 bg-[#c92c2c] rounded-full inline-block border-2 border-white"
        aria-label="Unread notifications"
      ></span>
    )}
  </button>
);

const NotificationDropdown: React.FC<{
  notifications: string[];
  hasNotifications: boolean;
}> = ({ notifications, hasNotifications }) => (
  <div
    role="menu"
    aria-label="Notifications dropdown"
    className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded border border-(--theme-border-color)"
  >
    <div className="p-4">
      {hasNotifications ? (
        notifications.map((notification, index) => (
          <NotificationItem key={index} notification={notification} />
        ))
      ) : (
        <p className="text-sm text-gray-500" role="menuitem">
          No notifications
        </p>
      )}
    </div>
  </div>
);

const NotificationItem: React.FC<{ notification: string }> = ({ notification }) => (
  <div
    className="p-2 hover:bg-gray-100 border-b border-(--theme-border-color) last:border-none text-sm text-(--text-color)"
    role="menuitem"
  >
    {notification}
  </div>
);

export default NotificationButton;