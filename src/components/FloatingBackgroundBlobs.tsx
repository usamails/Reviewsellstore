import React from 'react';

export const FloatingBackgroundBlobs: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Top Left Blue Gradient Blob */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
      
      {/* Top Right Cyan Blob */}
      <div className="absolute top-20 -right-32 w-96 h-96 bg-cyan-400/15 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }} />
      
      {/* Middle Center Subtle Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-400/10 rounded-full blur-3xl" />
      
      {/* Bottom Right Blue Accent */}
      <div className="absolute -bottom-40 right-10 w-96 h-96 bg-sky-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '9s', animationDelay: '4s' }} />
    </div>
  );
};
