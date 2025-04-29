import React from "react";
import styles from "index.module.scss";

interface Props {
  className?: string;
}

export const Footer: React.FC<Props> = ({ className }) => {
  return (
    <footer className={className}>
      <div></div>
    </footer>
  );
};
