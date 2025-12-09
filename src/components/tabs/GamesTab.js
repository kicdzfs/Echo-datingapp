"use client";

import React, { useMemo, useState } from 'react';
import {
  Activity,
  ArrowLeft,
  BookOpen,
  Droplet,
  Flower2,
  Gamepad2,
  Gift,
  ShoppingBag,
  Sparkles,
  Sprout,
  Zap
} from 'lucide-react';
import {
  DAILY_GARDEN_TASKS,
  GAMES_LIST,
  GARDEN_THEMES,
  REDEEM_REQUIREMENTS
} from '../../data/mockData';
import { TicTacToe } from '../SubComponents';

const pieceIcons = {
  white: { k: '♔', q: '♕', r: '♖', b: '♗', n: '♘', p: '♙' },
  black: { k: '♚', q: '♛', r: '♜', b: '♝', n: '♞', p: '♟︎' }
};

const createPiece = (type, color) => ({ type, color });
const insideBoard = (row, col) => row >= 0 && row < 8 && col >= 0 && col < 8;
const cloneBoard = (board) =>
  board.map((row) => row.map((cell) => (cell ? { ...cell } : null)));

const initialBoard = () => [
  [
    createPiece('r', 'black'),
    createPiece('n', 'black'),
    createPiece('b', 'black'),
    createPiece('q', 'black'),
    createPiece('k', 'black'),
    createPiece('b', 'black'),
    createPiece('n', 'black'),
    createPiece('r', 'black')
  ],
  Array.from({ length: 8 }, () => createPiece('p', 'black')),
  Array(8).fill(null),
  Array(8).fill(null),
  Array(8).fill(null),
  Array(8).fill(null),
  Array.from({ length: 8 }, () => createPiece('p', 'white')),
  [
    createPiece('r', 'white'),
    createPiece('n', 'white'),
    createPiece('b', 'white'),
    createPiece('q', 'white'),
    createPiece('k', 'white'),
    createPiece('b', 'white'),
    createPiece('n', 'white'),
    createPiece('r', 'white')
  ]
];

const coordsMatch = (a, b) => a?.row === b?.row && a?.col === b?.col;

const getDirectionalMoves = (board, from, piece, directions, limit = 8) => {
  const moves = [];
  directions.forEach(([dr, dc]) => {
    let row = from.row + dr;
    let col = from.col + dc;
    let steps = 0;
    while (insideBoard(row, col) && steps < limit) {
      const occupant = board[row][col];
      if (!occupant) {
        moves.push({ row, col });
      } else {
        if (occupant.color !== piece.color) {
          moves.push({ row, col });
        }
        break;
      }
      row += dr;
      col += dc;
      steps += 1;
    }
  });
  return moves;
};

const getKnightMoves = (board, from, piece) => {
  const deltas = [
    [1, 2],
    [2, 1],
    [2, -1],
    [1, -2],
    [-1, -2],
    [-2, -1],
    [-2, 1],
    [-1, 2]
  ];
  return deltas
    .map(([dr, dc]) => ({ row: from.row + dr, col: from.col + dc }))
    .filter((pos) => insideBoard(pos.row, pos.col))
    .filter((pos) => {
      const target = board[pos.row][pos.col];
      return !target || target.color !== piece.color;
    });
};

const getPawnMoves = (board, from, piece, forAttack = false) => {
  const moves = [];
  const dir = piece.color === 'white' ? -1 : 1;
  const nextRow = from.row + dir;
  const startRow = piece.color === 'white' ? 6 : 1;

  if (!forAttack) {
    if (insideBoard(nextRow, from.col) && !board[nextRow][from.col]) {
      moves.push({ row: nextRow, col: from.col });
      const doubleRow = from.row + dir * 2;
      if (from.row === startRow && !board[doubleRow][from.col]) {
        moves.push({ row: doubleRow, col: from.col });
      }
    }
  }

  [-1, 1].forEach((dc) => {
    const col = from.col + dc;
    if (!insideBoard(nextRow, col)) return;
    const target = board[nextRow][col];
    if (forAttack) {
      moves.push({ row: nextRow, col });
    } else if (target && target.color !== piece.color) {
      moves.push({ row: nextRow, col });
    }
  });

  return moves;
};

const getPotentialMoves = (board, from, piece, forAttack = false) => {
  switch (piece.type) {
    case 'p':
      return getPawnMoves(board, from, piece, forAttack);
    case 'r':
      return getDirectionalMoves(
        board,
        from,
        piece,
        [
          [1, 0],
          [-1, 0],
          [0, 1],
          [0, -1]
        ]
      );
    case 'b':
      return getDirectionalMoves(
        board,
        from,
        piece,
        [
          [1, 1],
          [1, -1],
          [-1, 1],
          [-1, -1]
        ]
      );
    case 'q':
      return getDirectionalMoves(
        board,
        from,
        piece,
        [
          [1, 0],
          [-1, 0],
          [0, 1],
          [0, -1],
          [1, 1],
          [1, -1],
          [-1, 1],
          [-1, -1]
        ]
      );
    case 'n':
      return getKnightMoves(board, from, piece);
    case 'k':
      return getDirectionalMoves(
        board,
        from,
        piece,
        [
          [1, 0],
          [-1, 0],
          [0, 1],
          [0, -1],
          [1, 1],
          [1, -1],
          [-1, 1],
          [-1, -1]
        ],
        1
      );
    default:
      return [];
  }
};

const applyMove = (board, from, to) => {
  const updated = cloneBoard(board);
  const movingPiece = updated[from.row][from.col];
  updated[from.row][from.col] = null;
  updated[to.row][to.col] = { ...movingPiece };
  if (
    updated[to.row][to.col].type === 'p' &&
    (to.row === 0 || to.row === 7)
  ) {
    updated[to.row][to.col].type = 'q';
  }
  return updated;
};

const findKing = (board, color) => {
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col];
      if (piece && piece.type === 'k' && piece.color === color) {
        return { row, col };
      }
    }
  }
  return null;
};

const isSquareAttacked = (board, square, attackerColor) => {
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col];
      if (piece && piece.color === attackerColor) {
        const moves = getPotentialMoves(board, { row, col }, piece, true);
        if (moves.some((move) => coordsMatch(move, square))) {
          return true;
        }
      }
    }
  }
  return false;
};

const isKingInCheck = (board, color) => {
  const kingPos = findKing(board, color);
  if (!kingPos) return true;
  const opponent = color === 'white' ? 'black' : 'white';
  return isSquareAttacked(board, kingPos, opponent);
};

const getLegalMoves = (board, from, piece) => {
  const rawMoves = getPotentialMoves(board, from, piece);
  return rawMoves.filter((move) => {
    const afterMove = applyMove(board, from, move);
    return !isKingInCheck(afterMove, piece.color);
  });
};

const hasAnyLegalMove = (board, color) => {
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col];
      if (piece && piece.color === color) {
        if (getLegalMoves(board, { row, col }, piece).length) {
          return true;
        }
      }
    }
  }
  return false;
};

const ChessBoard = () => {
  const [board, setBoard] = useState(initialBoard);
  const [turn, setTurn] = useState('white');
  const [selected, setSelected] = useState(null);
  const [legalMoves, setLegalMoves] = useState([]);
  const [status, setStatus] = useState('White to move');
  const [history, setHistory] = useState([]);

  const squareLabel = (row, col) => `${String.fromCharCode(65 + col)}${8 - row}`;
  const describeColor = (color) => (color === 'white' ? 'White' : 'Black');

  const handleMove = (to) => {
    if (!selected) return;
    const movingPiece = board[selected.row][selected.col];
    const capture = Boolean(board[to.row][to.col]);
    const updatedBoard = applyMove(board, selected, to);
    const opponent = turn === 'white' ? 'black' : 'white';
    const opponentInCheck = isKingInCheck(updatedBoard, opponent);
    const opponentHasMoves = hasAnyLegalMove(updatedBoard, opponent);

    if (!opponentHasMoves && opponentInCheck) {
      setStatus(`${describeColor(turn)} wins by checkmate!`);
    } else if (!opponentHasMoves) {
      setStatus('Stalemate! No legal moves remaining.');
    } else if (opponentInCheck) {
      setStatus(`${describeColor(opponent)} is in check.`);
    } else {
      setStatus(`${describeColor(opponent)} to move`);
    }

    setBoard(updatedBoard);
    setTurn(opponent);
    setSelected(null);
    setLegalMoves([]);
    setHistory((prev) => {
      const log = `${describeColor(turn)[0]}${
        movingPiece.type.toUpperCase()
      } ${squareLabel(selected.row, selected.col)} → ${squareLabel(
        to.row,
        to.col
      )}${capture ? ' ×' : ''}`;
      return [log, ...prev].slice(0, 6);
    });
  };

  const handleSquareClick = (row, col) => {
    if (
      selected &&
      legalMoves.some((move) => move.row === row && move.col === col)
    ) {
      handleMove({ row, col });
      return;
    }

    const piece = board[row][col];
    if (piece && piece.color === turn) {
      setSelected({ row, col });
      setLegalMoves(getLegalMoves(board, { row, col }, piece));
    } else {
      setSelected(null);
      setLegalMoves([]);
    }
  };

  const reset = () => {
    setBoard(initialBoard);
    setTurn('white');
    setSelected(null);
    setLegalMoves([]);
    setStatus('White to move');
    setHistory([]);
  };

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-3xl p-4 shadow border border-white/40">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-widest">
              Live match
            </p>
            <h3 className="text-lg font-bold text-[#151921]">{status}</h3>
          </div>
          <button
            onClick={reset}
            className="text-xs font-semibold text-[#5F48E6] underline"
          >
            Restart
          </button>
        </div>
        <div className="grid grid-cols-8 gap-1">
          {board.map((rowData, row) =>
            rowData.map((piece, col) => {
              const isDark = (row + col) % 2 === 1;
              const isSelected = coordsMatch(selected, { row, col });
              const isMove = legalMoves.some(
                (move) => move.row === row && move.col === col
              );
              return (
                <button
                  key={`${row}-${col}`}
                  onClick={() => handleSquareClick(row, col)}
                  className={`h-12 rounded-md flex items-center justify-center text-2xl font-semibold transition-colors border ${
                    isSelected
                      ? 'border-[#5F48E6] bg-[#D7D0FF]'
                      : isMove
                      ? 'border-[#0BAB7C] bg-[#C7F4C2]'
                      : isDark
                      ? 'bg-[#9979E8]/20 border-transparent'
                      : 'bg-white border-white/60'
                  }`}
                >
                  {piece ? pieceIcons[piece.color][piece.type] : ''}
                </button>
              );
            })
          )}
        </div>
      </div>
      <div className="bg-white rounded-3xl p-4 shadow border border-white/40">
        <h4 className="font-bold text-sm text-[#151921] mb-3">
          Latest moves
        </h4>
        <div className="space-y-2 text-sm text-gray-600">
          {history.length === 0 && <p>No moves recorded yet.</p>}
          {history.map((line, idx) => (
            <p key={idx} className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#F3F0FF] text-[#5F48E6] flex items-center justify-center text-xs font-bold">
                {history.length - idx}
              </span>
              {line}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

const DailyTasksModal = ({ isOpen, onClose }) => {
  const tasks = useMemo(() => DAILY_GARDEN_TASKS.slice(0, 4), []);
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-end sm:items-center sm:justify-center">
      <div className="bg-white rounded-t-3xl sm:rounded-3xl p-6 w-full sm:max-w-md shadow-2xl animate-in slide-in-from-bottom-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-widest">
              Daily missions
            </p>
            <h3 className="text-lg font-bold text-[#151921]">
              Keep your garden blooming
            </h3>
          </div>
          <button onClick={onClose} className="text-gray-400">
            <ArrowLeft className="rotate-180" />
          </button>
        </div>
        <div className="space-y-3">
          {tasks.map((task, i) => (
            <div
              key={task}
              className="flex items-center gap-3 border border-gray-100 rounded-2xl p-3"
            >
              <div className="w-10 h-10 rounded-2xl bg-[#F3F0FF] text-[#5F48E6] flex items-center justify-center font-bold">
                {i + 1}
              </div>
              <div>
                <p className="font-semibold text-sm text-[#151921]">{task}</p>
                <p className="text-xs text-gray-500">Reward: +50 pts</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const RedeemView = ({ onBack }) => (
  <div className="px-4 pt-6 pb-32 space-y-6">
    <button
      onClick={onBack}
      className="flex items-center gap-2 text-sm text-[#5F48E6] font-semibold"
    >
      <ArrowLeft className="w-4 h-4" /> Back to garden
    </button>
    <div className="bg-[#FFF7F8] rounded-3xl border border-[#FFD9E6] shadow p-6 space-y-4">
      <div>
        <p className="text-xs tracking-widest text-[#FF7CBF] uppercase font-semibold">
          Event rewards
        </p>
        <h3 className="text-2xl font-bold text-[#C94882]">
          Plant to win real flowers
        </h3>
        <p className="text-sm text-[#C94882]/70">
          Image for reference only, subject to actual bouquet.
        </p>
      </div>
      <div className="flex justify-center">
        <Flower2 className="w-20 h-20 text-[#F7B733]" />
      </div>
      <div className="bg-white rounded-2xl border border-[#FFE1ED] p-4 space-y-3">
        <div className="text-center text-[#C94882] text-sm font-semibold">
          Current Theme: Blooming Wishes
        </div>
        <div className="grid grid-cols-3 text-center text-xs font-semibold text-[#C94882] border-b border-[#FFE1ED] pb-2">
          <span>Free</span>
          <span>Premium</span>
          <span>Infinity</span>
        </div>
        {REDEEM_REQUIREMENTS.map((row) => (
          <div
            key={row.tier}
            className="grid grid-cols-3 text-center text-sm text-gray-600 py-1 border-b border-[#FFE1ED]/60 last:border-none"
          >
            <span>{row.points} pts</span>
            <span>{row.unique} flowers</span>
            <span>Lv {row.relationship}</span>
          </div>
        ))}
      </div>
      <p className="text-xs text-[#C94882]/80 text-center">
        All membership tiers must meet their criteria to qualify for one real flower.
      </p>
    </div>
  </div>
);

const GardenEntryCard = ({ stats, onEnter }) => (
  <div className="bg-white rounded-3xl shadow p-5 border border-white/60">
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="text-xs text-gray-400 uppercase tracking-widest">
          Partner garden
        </p>
        <h3 className="text-xl font-bold text-[#151921]">Grow together</h3>
        <p className="text-sm text-gray-500">
          Available once you both match and become partners.
        </p>
        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>Relationship Lv</span>
            <span>Lv {stats.relationship.toFixed(1)}</span>
          </div>
          <div className="w-full h-2 rounded-full bg-gray-100 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#5F48E6] via-[#A97DF2] to-[#0BAB7C]"
              style={{ width: `${Math.min(100, stats.relationship * 10)}%` }}
            />
          </div>
          <p className="text-xs text-gray-500">
            {stats.points} pts · {stats.uniqueFlowers} unique flowers planted
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center gap-3">
        <div className="flex -space-x-2">
          <span className="w-12 h-12 rounded-full bg-[#F3F0FF] flex items-center justify-center text-2xl">
            🦊
          </span>
          <span className="w-12 h-12 rounded-full bg-[#C7F4C2] border-2 border-white flex items-center justify-center text-2xl">
            🐨
          </span>
        </div>
        <button
          onClick={onEnter}
          className="px-4 py-2 rounded-full bg-[#151921] text-white text-sm font-semibold shadow"
        >
          Enter garden
        </button>
      </div>
    </div>
  </div>
);

const GameCard = ({ game, onPlay }) => (
  <div className="bg-white rounded-2xl p-4 shadow-sm flex gap-4 border border-white/60">
    <div className="w-16 h-16 rounded-xl bg-[#F3F0FF] text-3xl flex items-center justify-center">
      {game.icon}
    </div>
    <div className="flex-1">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-bold text-[#151921] text-lg">{game.name}</h4>
          <p className="text-sm text-gray-500 mt-1">{game.desc}</p>
        </div>
        <button
          onClick={() => onPlay(game.id)}
          className="text-sm font-semibold text-[#5F48E6] border border-[#E0DAFF] rounded-full px-3 py-1"
        >
          Play
        </button>
      </div>
      <div className="flex items-center gap-2 mt-3">
        <span className="text-[10px] text-gray-400 uppercase tracking-widest">
          Difficulty
        </span>
        <div className="flex text-yellow-400 text-base">
          {[...Array(5)].map((_, i) => (
            <span key={i}>{i < game.difficulty ? '★' : '☆'}</span>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const GardenThemeSelection = ({ onBack, onSelect }) => (
  <div className="px-4 pt-6 pb-32 space-y-6">
    <button
      onClick={onBack}
      className="flex items-center gap-2 text-sm text-[#5F48E6] font-semibold"
    >
      <ArrowLeft className="w-4 h-4" /> Back to games
    </button>
    <div className="bg-white rounded-3xl shadow p-5 border border-white/60">
      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-widest">
            Garden co-op
          </p>
          <h3 className="text-xl font-bold text-[#151921]">
            Please choose your garden theme
          </h3>
        </div>
        <div className="flex -space-x-2">
          <span className="w-10 h-10 rounded-full bg-[#F3F0FF] flex items-center justify-center text-xl">
            🦊
          </span>
          <span className="w-10 h-10 rounded-full bg-[#D7F9F2] flex items-center justify-center text-xl border-2 border-white">
            🐨
          </span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {GARDEN_THEMES.map((theme) => (
          <button
            key={theme.id}
            onClick={() => onSelect(theme)}
            className="rounded-2xl p-4 text-left bg-gradient-to-b from-[#F4F5F9] to-[#D9DBE4] shadow-inner border border-white/70 hover:scale-[1.01] transition"
          >
            <p className="text-[11px] uppercase tracking-[0.2em] text-gray-500">
              {theme.climate}
            </p>
            <h4 className="text-lg font-bold text-[#151921] mt-1">
              {theme.name}
            </h4>
            <p className="text-sm text-gray-600 mt-2">{theme.perks}</p>
          </button>
        ))}
      </div>
    </div>
  </div>
);

const PlotBadge = ({ plot }) => {
  const base = 'rounded-2xl p-3 flex flex-col justify-center items-center border-2 border-[#BC8C57]/30 bg-[#FDF4E0] shadow-inner h-28';
  if (plot.status === 'locked') {
    return (
      <div className={`${base} text-gray-500 text-sm font-semibold`}>Unlock</div>
    );
  }
  if (plot.status === 'growing') {
    return (
      <div className={`${base} text-center gap-1`}>
        <span className="text-2xl">🌱</span>
        <p className="text-sm text-[#151921] font-semibold">{plot.label}</p>
        <p className="text-xs text-gray-500">Growing...</p>
      </div>
    );
  }
  return (
    <div className={`${base} text-center gap-1`}>
      <span className="text-2xl">🌸</span>
      <p className="text-sm text-[#151921] font-semibold">{plot.label}</p>
      <p className="text-xs text-[#0BAB7C] font-semibold">Harvest ready</p>
    </div>
  );
};

const GardenPlayView = ({
  theme,
  stats,
  plots,
  growthLog,
  onBack,
  onRedeem,
  onWater,
  onShop,
  onShowTasks
}) => (
  <div className="px-4 pt-6 pb-32 space-y-6">
    <button
      onClick={onBack}
      className="flex items-center gap-2 text-sm text-[#5F48E6] font-semibold"
    >
      <ArrowLeft className="w-4 h-4" /> Choose another theme
    </button>
    <div className="bg-white rounded-3xl shadow p-5 border border-white/60">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="w-12 h-12 rounded-full bg-[#F3F0FF] flex items-center justify-center text-2xl">
            🦊
          </span>
          <span className="w-12 h-12 rounded-full bg-[#D7F9F2] flex items-center justify-center text-2xl border-2 border-white">
            🐨
          </span>
        </div>
        <div className="flex flex-col items-end">
          <p className="text-xs text-gray-400 uppercase tracking-widest">{theme.climate}</p>
          <h3 className="text-xl font-bold text-[#151921]">{theme.name}</h3>
        </div>
      </div>
      <div className="flex items-center gap-3 mb-4">
        <div className="flex-1">
          <div className="flex justify-between text-xs text-gray-500">
            <span>Relationship</span>
            <span>{(stats.relationship * 10).toFixed(0)}%</span>
          </div>
          <div className="w-full h-3 rounded-full bg-gray-100 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#FF8BB3] via-[#F9C27B] to-[#7ED099]"
              style={{ width: `${Math.min(100, stats.relationship * 10)}%` }}
            />
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onRedeem}
            className="w-12 h-12 rounded-full bg-[#FFF0F4] border border-[#FFD9E6] flex items-center justify-center"
          >
            <Gift className="text-[#C94882]" />
          </button>
          <button
            onClick={onShop}
            className="w-12 h-12 rounded-full bg-[#F3F0FF] border border-white flex items-center justify-center"
          >
            <ShoppingBag className="text-[#5F48E6]" />
          </button>
        </div>
      </div>
      <div className="text-xs text-gray-500 flex justify-between mb-4">
        <span>Points: {stats.points}</span>
        <span>Unique flowers: {stats.uniqueFlowers}</span>
      </div>
      <div
        className="rounded-3xl border-2 border-[#F0CFA0] bg-gradient-to-b from-[#FFF8EC] to-[#FBE9C8] p-5"
      >
        <div className="grid grid-cols-2 gap-4">
          {plots.map((plot) => (
            <PlotBadge key={plot.id} plot={plot} />
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between mt-4 text-sm">
        <button
          onClick={onWater}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#D7F9F2] text-[#0BAB7C] font-semibold"
        >
          <Droplet className="w-4 h-4" /> Water
        </button>
        <button
          onClick={onShowTasks}
          className="flex items-center gap-2 px-6 py-2 rounded-full bg-[#FFECC7] text-[#B46F0A] font-semibold"
        >
          <BookOpen className="w-4 h-4" /> Daily mission
        </button>
        <button
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#F3F0FF] text-[#5F48E6] font-semibold"
        >
          <Sprout className="w-4 h-4" /> Growth log
        </button>
      </div>
    </div>
    <div className="bg-white rounded-3xl shadow p-5 border border-white/60">
      <div className="flex items-center gap-2 mb-3">
        <Sprout className="text-[#5F48E6]" />
        <h4 className="font-bold text-[#151921] text-lg">Recent activity</h4>
      </div>
      <div className="space-y-3">
        {growthLog.map((entry) => (
          <div
            key={entry.id}
            className="p-3 rounded-2xl border border-gray-100 bg-gray-50"
          >
            <p className="text-sm text-[#151921] font-semibold">
              {entry.title}
            </p>
            <p className="text-xs text-gray-500">{entry.time}</p>
            <p className="text-sm text-gray-600 mt-1">{entry.note}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const GamesHub = ({ stats, onEnterGarden, onPlay, onRedeem }) => (
  <div className="px-4 pb-28 space-y-5">
    <div className="px-2 text-center">
      <h2 className="text-2xl font-bold text-[#151921]">
        Games Paradise
      </h2>
    </div>

    <GardenEntryCard stats={stats} onEnter={onEnterGarden} />

    <div className="space-y-4">
      {GAMES_LIST.map((game) => (
        <GameCard key={game.id} game={game} onPlay={onPlay} />
      ))}
    </div>

    <button
      onClick={onRedeem}
      className="w-full bg-[#FFF7F8] border border-[#FFD9E6] rounded-3xl p-5 text-left shadow flex items-center gap-4"
    >
      <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center">
        <Flower2 className="w-10 h-10 text-[#F7B733]" />
      </div>
      <div>
        <p className="text-xs text-[#C94882] uppercase tracking-widest font-semibold">
          Redeem
        </p>
        <h4 className="text-lg font-bold text-[#C94882]">
          Plant to win real flowers
        </h4>
        <p className="text-sm text-[#C94882]/70">
          Collect event points to exchange bouquets.
        </p>
      </div>
    </button>
  </div>
);

const GamesTab = () => {
  const [view, setView] = useState('hub');
  const [previousView, setPreviousView] = useState('hub');
  const [selectedTheme, setSelectedTheme] = useState(GARDEN_THEMES[0]);
  const [gardenStats, setGardenStats] = useState({
    points: 420,
    uniqueFlowers: 4,
    relationship: 6.5
  });
  const [plots, setPlots] = useState([
    { id: 1, status: 'harvest', label: 'Lavender' },
    { id: 2, status: 'growing', label: 'Tulip' },
    { id: 3, status: 'locked', label: '' },
    { id: 4, status: 'locked', label: '' }
  ]);
  const [growthLog, setGrowthLog] = useState([
    {
      id: 1,
      title: 'Planted Lavender Seeds',
      time: 'Today · 09:30',
      note: 'Both partners added lavender seeds to the north bed.'
    },
    {
      id: 2,
      title: 'Shared Water Boost',
      time: 'Yesterday · 21:10',
      note: '20 droplets sent, relationship gained +0.5.'
    },
    {
      id: 3,
      title: 'Unlocked Sunset Grove',
      time: '2 days ago',
      note: 'New tropical ambience unlocked with 400 pts.'
    }
  ]);
  const [showTasks, setShowTasks] = useState(false);

  const goTo = (nextView) => {
    setView(nextView);
  };

  const openRedeem = () => {
    setPreviousView(view === 'redeem' ? previousView : view);
    setView('redeem');
  };

  const handlePlay = (id) => {
    if (id === 'xo') setView('xo');
    if (id === 'chess') setView('chess');
  };

  const handleSelectGarden = (theme) => {
    setSelectedTheme(theme);
    setView('gardenPlay');
  };

  const handleWater = () => {
    setGardenStats((prev) => ({
      ...prev,
      points: prev.points + 25,
      relationship: Math.min(10, parseFloat((prev.relationship + 0.4).toFixed(1)))
    }));
    setPlots((prev) => {
      const updated = [...prev];
      const seedIndex = updated.findIndex((plot) => plot.status === 'growing');
      if (seedIndex >= 0) {
        updated[seedIndex] = { ...updated[seedIndex], status: 'harvest' };
      }
      return updated;
    });
    setGrowthLog((prev) => [
      {
        id: Date.now(),
        title: 'Watered together',
        time: 'Just now',
        note: 'Sprinkled the beds and earned +25 pts.'
      },
      ...prev
    ]);
  };

  const handleSeedShop = () => {
    setGardenStats((prev) => ({
      ...prev,
      uniqueFlowers: prev.uniqueFlowers + 1,
      points: prev.points + 10
    }));
    setPlots((prev) => {
      const updated = [...prev];
      const lockedIndex = updated.findIndex((plot) => plot.status === 'locked');
      if (lockedIndex >= 0) {
        updated[lockedIndex] = {
          id: updated[lockedIndex].id,
          status: 'growing',
          label: 'Mystery seed'
        };
      }
      return updated;
    });
    setGrowthLog((prev) => [
      {
        id: Date.now(),
        title: 'New seed unlocked',
        time: 'Just now',
        note: 'Purchased a mystery bloom from the seed shop.'
      },
      ...prev
    ]);
  };

  const renderView = () => {
    switch (view) {
      case 'hub':
        return (
          <GamesHub
            stats={gardenStats}
            onEnterGarden={() => goTo('gardenSelect')}
            onPlay={handlePlay}
            onRedeem={openRedeem}
          />
        );
      case 'gardenSelect':
        return (
          <GardenThemeSelection
            onBack={() => goTo('hub')}
            onSelect={handleSelectGarden}
          />
        );
      case 'gardenPlay':
        return (
          <GardenPlayView
            theme={selectedTheme}
            stats={gardenStats}
            plots={plots}
            growthLog={growthLog}
            onBack={() => goTo('gardenSelect')}
            onRedeem={openRedeem}
            onWater={handleWater}
            onShop={handleSeedShop}
            onShowTasks={() => setShowTasks(true)}
          />
        );
      case 'xo':
        return (
          <div className="px-4 pt-6 pb-32 space-y-6">
            <button
              onClick={() => goTo('hub')}
              className="flex items-center gap-2 text-sm text-[#5F48E6] font-semibold"
            >
              <ArrowLeft className="w-4 h-4" /> Back to games
            </button>
            <div className="bg-white rounded-3xl shadow p-5 border border-white/60">
              <div className="flex items-center gap-3 mb-4">
                <Sparkles className="text-[#5F48E6]" />
                <h3 className="text-xl font-bold text-[#151921]">
                  XO Blitz Arena
                </h3>
              </div>
              <TicTacToe />
            </div>
          </div>
        );
      case 'chess':
        return (
          <div className="px-4 pt-6 pb-32 space-y-6">
            <button
              onClick={() => goTo('hub')}
              className="flex items-center gap-2 text-sm text-[#5F48E6] font-semibold"
            >
              <ArrowLeft className="w-4 h-4" /> Back to games
            </button>
            <ChessBoard />
          </div>
        );
      case 'redeem':
        return <RedeemView onBack={() => setView(previousView)} />;
      default:
        return null;
    }
  };

  // All views share same shell: top app bar + scrollable content
  return (
    <div className="min-h-full flex flex-col pb-24 bg-white">
      {/* Top App Bar */}
      <div className="sticky top-0 z-20 bg-white border-b border-gray-100">
        <div className="h-12 flex items-center justify-between px-4">
          <span className="w-6" />
          <h1 className="text-lg font-semibold text-[#151921]">
            Games Paradise
          </h1>
          <Gamepad2 className="w-5 h-5 text-[#5F48E6]" />
        </div>
      </div>

      {/* Content area */}
      <div className="flex-1 overflow-y-auto bg-white">
        {renderView()}
      </div>

      <DailyTasksModal
        isOpen={showTasks}
        onClose={() => setShowTasks(false)}
      />
    </div>
  );
};

export default GamesTab;
