import React, { ReactNode } from 'react';

interface PlayerModalProps {
  show: boolean;
  onClose: () => void;
  children: ReactNode;
}

const PlayerModal: React.FC<PlayerModalProps> = ({ show, onClose, children }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="fixed inset-0 bg-glass flex flex-col justify-center items-center p-4">
        <button onClick={onClose} className="absolute top-4 right-4 text-white text-4xl font-bold">&times;</button>
        <div className="w-full max-w-4xl">
          {children}
        </div>
      </div>
    </div>
  );
};

export default PlayerModal;
