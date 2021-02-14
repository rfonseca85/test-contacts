import React from 'react';

function Button({ color, text, onClick }) {
  return (
    <div>
      <button
        onClick={onClick}
        style={{ backgroundColor: color }}
        className="btn"
      >
        {text}
      </button>
    </div>
  );
}

Button.defaultProps = {
  color: 'black',
  text: 'Default Button',
};

export default Button;
