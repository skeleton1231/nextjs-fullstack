// utils/MessageBox.tsx
import { FC } from 'react';

interface MessageBoxProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

const MessageBox: FC<MessageBoxProps> = ({ message, type, onClose }) => (
  <div
    className={`alert mt-6 text-white px-6 py-4 rounded relative ${
      type === 'success' ? 'bg-green-500' : 'bg-red-500'
    }`}
    role="alert"
  >
    <span className="block sm:inline">{message}</span>
    <span
      className="absolute top-0 bottom-0 right-0 px-4 py-3"
      onClick={onClose}
    >
      <svg
        className="fill-current h-6 w-6 text-white"
        role="button"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <title>Close</title>
        <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-2.651a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"></path>
      </svg>
    </span>
  </div>
);

export default MessageBox;
