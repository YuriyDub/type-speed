import lettersRainModeImage from "../../../assets/images/Default_typing_machine_in_rain_0.jpg";
import simpleModeImage from "../../../assets/images/Default_typing_machine_1.jpg";
import { ModCard } from "./ModeCard";
import { Container } from "../../UIKit/Container";
import { useNavigate } from "react-router-dom";
import styles from "./ModsPage.module.scss";

export const ModsPage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <Container>
        <div className={styles.contentWrapper}>
          <h2 className={styles.modesTitle}>Режими тренувань:</h2>
          <div className={styles.modes}>
            <ModCard
              onClick={() => navigate("simple")}
              title="Simple mode"
              description="У цьому режимі ваша мета – набирати випадковий текст якнайшвидше та якомога точніше. Вам буде надано різноманітні фрагменти тексту, що включають слова, фрази, цифри та спеціальні символи, щоб ви могли тренувати навички друку в умовах реального життя."
              imageUrl={simpleModeImage}
            />
            <ModCard
              onClick={() => navigate("rain")}
              title="Rain of letters"
              description="У цьому режимі ваша мета – якнайшвидше зупинити потік літер, які падають з верхньої частини екрану. Це весела та захоплююча гра, що допомагає покращити швидкість реакції та навички друку."
              imageUrl={lettersRainModeImage}
            />
          </div>
        </div>
      </Container>
    </div>
  );
};
