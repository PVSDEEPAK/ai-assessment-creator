"use client";

import { Bell, Menu } from "lucide-react";

import { useState } from "react";

export default function Navbar() {

  const [showMenu, setShowMenu] =
    useState(false);

  const [showNotifications, setShowNotifications] =
    useState(false);

  return (
    <div className="bg-white rounded-2xl px-6 py-4 flex items-center justify-between shadow-sm">

      <h2 className="text-lg font-semibold">
        Assignments
      </h2>

      <div className="flex items-center gap-5 relative">

        {/* Notification Icon */}

        <div className="relative">

          <button
            onClick={() =>
              setShowNotifications(
                !showNotifications
              )
            }
            className="hover:bg-gray-100 p-2 rounded-full transition"
          >
            <Bell className="w-5 h-5 text-gray-600" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-3 w-72 bg-white border rounded-2xl shadow-lg p-4 z-50">

              <h3 className="font-semibold text-lg">
                Notifications
              </h3>

              <div className="mt-4 space-y-3">

                <div className="bg-gray-50 p-3 rounded-xl">
                  <p className="text-sm font-medium">
                    Assignment generated successfully
                  </p>

                  <p className="text-xs text-gray-500 mt-1">
                    AI paper creation completed
                  </p>
                </div>

                <div className="bg-gray-50 p-3 rounded-xl">
                  <p className="text-sm font-medium">
                    PDF downloaded
                  </p>

                  <p className="text-xs text-gray-500 mt-1">
                    Assignment exported successfully
                  </p>
                </div>

              </div>
            </div>
          )}
        </div>

        {/* Profile */}

        <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-semibold">
          D
        </div>

        {/* Menu */}

        <div className="relative">

          <button
            onClick={() =>
              setShowMenu(!showMenu)
            }
            className="hover:bg-gray-100 p-2 rounded-full transition"
          >
            <Menu className="w-5 h-5 text-gray-600" />
          </button>

          {showMenu && (
            <div className="absolute right-0 mt-3 w-56 bg-white border rounded-2xl shadow-lg p-2 z-50">

              <button className="w-full text-left px-4 py-3 hover:bg-gray-100 rounded-xl transition">
                Profile
              </button>

              <button className="w-full text-left px-4 py-3 hover:bg-gray-100 rounded-xl transition">
                Settings
              </button>

              <button className="w-full text-left px-4 py-3 hover:bg-gray-100 rounded-xl transition text-red-500">
                Logout
              </button>

            </div>
          )}
        </div>

      </div>
    </div>
  );
}