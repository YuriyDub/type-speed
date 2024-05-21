import { ChangeEvent, useContext } from "react";
import { ThemeContext, ThemeType } from "../../ThemeProvider";
import styles from "./ColorPicker.module.scss";

interface ColorPickerProps {
  variable: keyof ThemeType;
  label: string;
}

export const ColorPicker = ({ variable, label }: ColorPickerProps) => {
  const { theme, updateVariable } = useContext(ThemeContext);

  const color = theme?.[variable] ?? "#fff";

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newColor = event.target.value;
    updateVariable(variable, newColor);
  };

  return (
    <div className={styles.colorPicker}>
      <label className={styles.label}>{label}: </label>
      <div className={styles.colorPickerWrap} style={{ background: color }}>
        <input type="color" value={color} onChange={handleChange} />
      </div>
    </div>
  );
};
