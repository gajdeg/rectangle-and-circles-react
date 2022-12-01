export const Rectangle = ({ className, width, height, x, y, style }) => {
  return (
    <div
      className={className}
      style={{
        ...style,
        width: `${width}px`,
        height: `${height}px`,
        transform: `translate(${x}px,${y}px)`,
      }}
    ></div>
  );
};
