"use client";

import React from "react";
import { Home, Gamepad2, MessageCircle, User, Plus } from "lucide-react";

const BottomTabBar = ({ activeTab, onChangeTab, onOpenPost, disabled = false }) => {
  const baseTabClass = "flex flex-col items-center gap-1 ";

  const activeColor = "tab-active text-violet-600";
  const inactiveColor = "tab-inactive text-gray-400";

  return (
    <div
      className={`bottom-nav fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md safe-bottom border-t border-gray-100 ${
        disabled ? "pointer-events-none opacity-60" : ""
      }`}
    >
      <div className="h-16 px-6 flex items-center justify-between relative">
        <div className="grid grid-cols-5 gap-6 w-full max-w-md mx-auto items-center">
          {/* Plaza */}
          <button
            onClick={() => onChangeTab("plaza")}
            className={
              baseTabClass +
              (activeTab === "plaza" ? activeColor : inactiveColor)
            }
          >
            <Home
              className={
                "w-6 h-6 " + (activeTab === "plaza" ? "fill-current" : "")
              }
            />
            <span className="text-[10px] font-bold">PLAZA</span>
          </button>

          {/* Games */}
          <button
            onClick={() => onChangeTab("pets")}
            className={
              baseTabClass +
              (activeTab === "pets" ? activeColor : inactiveColor)
            }
          >
            <Gamepad2
              className={
                "w-6 h-6 " + (activeTab === "pets" ? "fill-current" : "")
              }
            />
            <span className="text-[10px] font-bold">GAMES</span>
          </button>

        {/* Center Post button */}
        <div className="relative w-full h-full flex justify-center">
          <button
            onClick={onOpenPost}
            className="fab-post absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-violet-600 rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform border-4 border-white"
          >
            <Plus className="w-7 h-7 text-white" />
          </button>
        </div>

          {/* Chat */}
          <button
            onClick={() => onChangeTab("chat")}
            className={
              baseTabClass +
              (activeTab === "chat" ? activeColor : inactiveColor)
            }
          >
            <MessageCircle
              className={
                "w-6 h-6 " + (activeTab === "chat" ? "fill-current" : "")
              }
            />
            <span className="text-[10px] font-bold">CHAT</span>
          </button>

          {/* Me */}
          <button
            onClick={() => onChangeTab("me")}
            className={
              baseTabClass +
              (activeTab === "me" ? activeColor : inactiveColor)
            }
          >
            <User
              className={
                "w-6 h-6 " + (activeTab === "me" ? "fill-current" : "")
              }
            />
            <span className="text-[10px] font-bold">ME</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BottomTabBar;
