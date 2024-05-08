import { useContext } from "react";
import { Container } from "../../UIKit/Container";
import { AuthContext } from "../../AuthProvider";
import styles from "./AccountPage.module.scss";
import { Paper } from "../../UIKit/Paper/Paper";
import { Avatar } from "../../UIKit/Avatar";

export const AccountPage = () => {
  const user = useContext(AuthContext);

  console.log(user);

  return (
    <div className={styles.page}>
      <Container>
        <div className={styles.contentWrapper}>
          <Paper className={styles.userData}>
            {user?.photoURL ? (
              <Avatar url={user?.photoURL} className={styles.avatar} />
            ) : null}
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
        </div>
      </Container>
    </div>
  );
};
