import React from "react";

interface Props {
  locked: boolean;
  onUnlock: () => void;
  onPasswordFallback: () => void;
}

export default function LockOverlay({ locked, onUnlock, onPasswordFallback }: Props) {
  if (!locked) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex flex-col items-center justify-center text-white">
      <h1 className="text-2xl font-bold mb-4">🔒 Locked</h1>
      <button
        onClick={onUnlock}
        className="bg-blue-600 text-black px-4 py-2 rounded mb-2 hover:bg-blue-700"
      >
        Unlock
      </button>
      <button onClick={onPasswordFallback} className="underline text-sm text-gray-800">
        Use Password
      </button>
    </div>
  );
}
