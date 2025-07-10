"use client";
import React, { useEffect, useState } from "react";

const NetworkStatus: React.FC = () => {
  const [online, setOnline] = useState(true);
  useEffect(() => {
    const update = () => setOnline(navigator.onLine);
    window.addEventListener("online", update);
    window.addEventListener("offline", update);
    update();
    return () => {
      window.removeEventListener("online", update);
      window.removeEventListener("offline", update);
    };
  }, []);
  if (online) return null;
  return (
    <div
      className="fixed top-4 left-1/2 -translate-x-1/2 z-[300] px-4 py-2 bg-red-600 text-white rounded-full shadow-lg animate-pulse"
      role="status"
      aria-live="polite"
    >
      Hors ligne : vérifiez votre connexion
    </div>
  );
};

export default NetworkStatus; 