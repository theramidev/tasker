export const theme = (opacity = 1) => {
  const primary = `rgba(42, 94, 215, ${opacity})`;
  const secondary = `rgba(25, 161, 255, ${opacity})`;
  const tertiary = `rgba(95, 77, 255, ${opacity})`
  const text = `rgba(66, 66, 66, ${opacity})`;
  const info = `rgba(43, 166, 255, ${opacity})`;
  const danger = `rgba(205, 92, 92, ${opacity})`;
  const success = `rgba(106, 186, 31, ${opacity})`;
  const dark = `rgba(20, 20, 20, ${opacity})`;
  const light = `rgba(255, 255, 255, ${opacity})`;

  return {
    primary,
    secondary,
    tertiary,
    text,
    info,
    danger,
    success,
    dark,
    light,
  };
};
