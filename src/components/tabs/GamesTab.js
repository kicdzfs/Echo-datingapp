"use client";

import React, { useState } from 'react';
import { Gamepad2, Zap, Activity } from 'lucide-react';
import { GAMES_LIST } from '../../data/mockData';
import { TicTacToe, Stars } from '../SubComponents';

const GamesTab = () => {
  const [gameActive, setGameActive] = useState(false);

  return (
    <div className="pb-20 h-full flex flex-col bg-gradient-to-b from-[#D7D0FF]/30 to-[#F3F0FF]">
      <div className="px-6 pt-4 pb-8 text-center">
        <h2 className="text-2xl font-bold text-[#151921] mb-2">
          Games Paradise
        </h2>
        <div className="flex justify-center gap-4 opacity-50">
          <Gamepad2 className="w-6 h-6 text-[#5F48E6]" />
          <Zap className="w-6 h-6 text-[#0BAB7C]" />
          <Activity className="w-6 h-6 text-[#5F48E6]" />
        </div>
      </div>
      <div className="px-4 -mt-6">
        <div className="bg-white rounded-3xl p-5 shadow-md mb-6 border border-white/50">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-bold text-sm text-[#151921]">
              2-PLAYER ARENA
            </h3>
            <span className="bg-[#C7F4C2] text-[#0BAB7C] text-[10px] font-bold px-2 py-0.5 rounded">
              SPACE
            </span>
          </div>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-[#D7D0FF] rounded-2xl flex items-center justify-center text-3xl">
              👾
            </div>
            <div>
              <h4 className="font-bold text-lg">Tic Tac Toe</h4>
              <p className="text-xs text-gray-500 flex items-center gap-1">
                <Activity className="w-3 h-3" /> Challenge your friend!
              </p>
            </div>
            {gameActive ? (
              <button
                onClick={() => setGameActive(false)}
                className="text-xs text-red-500 underline"
              >
                Quit
              </button>
            ) : (
              <div className="ml-auto w-10 h-10 rounded-full border-2 border-[#0BAB7C] p-0.5">
                <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                  <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Player"
                    alt="P"
                  />
                </div>
              </div>
            )}
          </div>
          {gameActive ? (
            <TicTacToe />
          ) : (
            <button
              onClick={() => setGameActive(true)}
              className="w-full bg-[#151921] text-white py-3 rounded-xl text-sm font-bold shadow-lg active:scale-95 transition-transform"
            >
              Start Match
            </button>
          )}
        </div>
        <div className="space-y-4">
          {GAMES_LIST.map((game) => (
            <div
              key={game.id}
              className="bg-white p-4 rounded-2xl shadow-sm flex gap-4"
            >
              <div className="w-20 h-20 bg-blue-50 rounded-xl flex items-center justify-center text-4xl">
                {game.icon}
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <h4 className="font-bold text-[#151921]">
                    {game.name}
                  </h4>
                </div>
                <p className="text-xs text-gray-500 mt-1 mb-2 leading-tight">
                  {game.desc}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-gray-400">
                    Difficulty:
                  </span>
                  <Stars count={game.difficulty} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GamesTab;
