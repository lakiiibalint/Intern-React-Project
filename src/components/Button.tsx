
import React from "react";

interface ButtonProps {
  onClick: () => void;
  className?: string;
  children: React.ReactNode;
  disabled?: boolean;
}

export default function Button({ onClick, className = "", children , disabled = false}: ButtonProps) {
  return (
    <button onClick={onClick} className={`btn ${className}`} disabled={disabled}>
      {children}
    </button>
  );
}

