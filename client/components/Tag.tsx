import React from "react";

type TagProps = {
  activeId: number;
  title: string;
  index: number;
  onClick: (index: number) => void;
  id: number;
};

function Tag({ activeId, title, index, onClick, id }: TagProps) {
  return (
    <span
      onClick={() => onClick(index)}
      className={activeId === id ? "slide-title active" : "slide-title"}
    >
      {title}
    </span>
  );
}

export default React.memo(Tag);
