"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/lib/useAuth";
import { formatDate } from "@/utils/formateDate";

interface Notification {
  id: string;
  message: string;
  createdAt: Date;
  isRead: boolean;
}

export function NotificationDropdown() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false); // Nuevo estado para el menú
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const { user } = useAuth();

  useEffect(() => {
    if (user?.id) {
      fetchNotifications();
    }
  }, [user]);

  const fetchNotifications = async () => {
    try {
      const response = await fetch(`${apiUrl}/notifications/user/${user?.id}`);
      if (response.ok) {
        const data = await response.json();
        setNotifications(data);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const markNotificationsAsRead = async () => {
    try {
      const response = await fetch(`${apiUrl}/notifications/user/${user?.id}/read-all`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });     
      if (response.ok) {
        setNotifications((prev) =>
          prev.map((notification) => ({ ...notification, isRead: true }))
        );
      }
    } catch (error) {
      console.error("Error marking notifications as read:", error);
    }
  };
  useEffect(() => {
    isOpen && markNotificationsAsRead();
  }, [isOpen]);

  return (
     <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild >
        <Button
          variant="ghost"
          className="relative inline-flex items-center text-sm font-medium text-center text-gray-500 hover:text-gray-900 focus:outline-none dark:hover:text-white dark:text-gray-400"
        >
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 14 20"
          >
            <path d="M12.133 10.632v-1.8A5.406 5.406 0 0 0 7.979 3.57.946.946 0 0 0 8 3.464V1.1a1 1 0 0 0-2 0v2.364a.946.946 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C1.867 13.018 0 13.614 0 14.807 0 15.4 0 16 .538 16h12.924C14 16 14 15.4 14 14.807c0-1.193-1.867-1.789-1.867-4.175ZM3.823 17a3.453 3.453 0 0 0 6.354 0H3.823Z" />
          </svg>
          {notifications.some((n) => !n.isRead) && (
            <div className="absolute block w-3 h-3 bg-red-500 border-2 border-white rounded-full top-1 start-3.5 dark:border-gray-900"></div>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="z-50 w-full max-w-sm bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-800 dark:divide-gray-700">
        <div className="block px-4 py-2 font-medium text-center text-gray-700 rounded-t-lg bg-gray-50 dark:bg-gray-800 dark:text-white">
          Notificaciones
        </div>
        <div className="divide-y divide-gray-100 dark:divide-gray-700">
          {notifications.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              No hay notificaciones
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700`}
              >
                <div className="w-full">
                  <div className="text-gray-500 text-sm mb-1.5 dark:text-gray-400">
                    {notification.message}
                  </div>
                  <div className="text-xs text-blue-600 dark:text-blue-500">
                    {formatDate(notification.createdAt)}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>     
  );
}


