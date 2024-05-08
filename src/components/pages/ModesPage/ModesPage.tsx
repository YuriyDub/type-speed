import lettersRainModeImage from "../../../assets/images/Default_typewriter_in_the_rain_1.jpg";
import simpleModeImage from "../../../assets/images/Default_typing_machine_0.jpg";
import { ModeCard } from "./ModeCard";
import { Container } from "../../UIKit/Container";
import { Link } from "react-router-dom";

import styles from "./ModesPage.module.scss";

export const ModesPage = () => {
  return (
    <div className={styles.page}>
      <Container>
        <div className={styles.contentWrapper}>
          <h2 className={styles.modesTitle}>Режими тренувань:</h2>
          <div className={styles.modes}>
            <Link to="simple">
              <ModeCard
                title="Simple mode"
                description="lorem ipsim lorem hf sud kdls diods dkldpw gatior lorem ipsim 
							lorem hf sud kdls diods dkldpw gatior lorem ipsim lorem hf sud kdls diods dkldpw gatior l
							orem ipsim lorem hf sud kdls diods dkldpw gatior"
                imageUrl={simpleModeImage}
              />
            </Link>
            <ModeCard
              title="Rain of letters"
              description="lorem ipsim lorem hf sud kdls diods dkldpw gatior lorem ipsim 
							lorem hf sud kdls diods dkldpw gatior lorem ipsim lorem hf sud kdls diods dkldpw gatior l
							orem ipsim lorem hf sud kdls diods dkldpw gatior"
              imageUrl={lettersRainModeImage}
            />
          </div>
        </div>
      </Container>
    </div>
  );
};
