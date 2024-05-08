import { Container } from "../../UIKit/Container";
import styles from "./HomePage.module.scss";

export const HomePage = () => {
  return (
    <div className={styles.page}>
      <Container>
        <div className={styles.contentWrapper}>
          <div className={styles.hero}>
            <div className={styles.container}>
              <img
                className={styles.banner}
                src="https://content.invisioncic.com/p313717/monthly_2018_08/pbt-white.png.31e27964a6fa727ad1b566efec760788.png"
                alt="Writer"
              />
              <div>
                <h2 className={styles.title}>Ласкаво просимо до Type-Speed!</h2>
                <ul className={styles.detailsList}>
                  <li>
                    Тут ви знайдете ідеальну платформу для покращення навичок
                    швидкого друку. Ми віддані допомагати вам стати експертом у
                    використанні клавіатури, незалежно від вашого поточного
                    рівня навичок.
                  </li>
                  <li>
                    З нашим набором інноваційних вправ, ігор та інструментів ви
                    зможете підвищити свою швидкість набору тексту, покращити
                    точність і стати справжнім професіоналом.
                  </li>
                  <li>
                    Приєднуйтесь до нас сьогодні та розблокуйте свій потенціал.
                    Перевершіть себе з Type-Speed!
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
