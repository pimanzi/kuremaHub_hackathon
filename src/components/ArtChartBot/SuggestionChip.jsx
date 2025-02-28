import React from 'react';
const SuggestionChip = ({ text, onClick }) => {
  return (
    <button 
      className="inline-flex px-3 py-1.5 bg-secondary hover:bg-secondary/80 text-secondary-foreground text-sm rounded-full transition-colors whitespace-nowrap"
      onClick={() => onClick(text)}
    >
      {text}
    </button>
  );
};
export default SuggestionChip;