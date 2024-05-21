import { useContext } from "react";
import { Container } from "../../UIKit/Container";
import { AuthContext } from "../../AuthProvider";
import styles from "./AccountPage.module.scss";
import { Paper } from "../../UIKit/Paper/Paper";
import { Avatar } from "../../UIKit/Avatar";
import { SimpleModeStats } from "./SimpleModeStats";
import { RainModeStats } from "./RainModeStats";
import { ColorPicker } from "../../UIKit/ColorPicker/ColorPicker";
import { Button } from "../../UIKit/Button/Button";
import { MdUndo } from "react-icons/md";
import { ThemeContext } from "../../ThemeProvider";

export const AccountPage = () => {
  const user = useContext(AuthContext);
  const { resetTheme } = useContext(ThemeContext);

  return (
    <div className={styles.page}>
      <Container>
        <div className={styles.contentWrapper}>
          <Paper className={styles.userData}>
            <Avatar url={user?.photoURL} className={styles.avatar} />
            {user?.displayName ? (
              <div className={styles.characteristic}>
                <h5>Name:</h5>
                <span>{user?.displayName}</span>
              </div>
            ) : null}
            {user?.email ? (
              <div className={styles.characteristic}>
                <h5>Email:</h5>
                <span>{user?.email}</span>
              </div>
            ) : null}
            {user?.phoneNumber ? (
              <div className={styles.characteristic}>
                <h5>Phone number:</h5>
                <span>{user?.phoneNumber}</span>
              </div>
            ) : null}
          </Paper>
          <Paper className={styles.themeSettingsWrap}>
            <h5>Theme Settings</h5>
            <div className={styles.themeSettings}>
              <ColorPicker label="Primary" variable="primary" />
              <ColorPicker label="Secondary" variable="secondary" />
              <ColorPicker label="Background" variable="background" />
              <ColorPicker label="Light-text" variable="light-text" />
              <ColorPicker label="Text" variable="text" />
              <ColorPicker label="Correct" variable="correct" />
              <ColorPicker label="Incorrect" variable="incorrect" />
            </div>
            <Button
              onClick={resetTheme}
              text="to default"
              startIcon={<MdUndo />}
            />
          </Paper>

          <div className={styles.stats}>
            <SimpleModeStats />
            <RainModeStats />
          </div>
        </div>
      </Container>
    </div>
  );
};
