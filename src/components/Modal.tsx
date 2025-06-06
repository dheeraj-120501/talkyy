interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-md"
        onClick={onClose}
      />
      <div className="z-10 bg-white dark:bg-gray-800 p-6 pt-3 rounded-lg shadow-xl max-w-lg w-full mx-4">
        <div className="flex flex-col items-end mb-3 -mr-2">
          <button
            onClick={onClose}
            className="text-gray-500 text-lg hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};
