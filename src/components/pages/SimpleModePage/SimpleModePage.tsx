import { ChangeEvent, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store";
import { SimplePlayGround } from "./SimplePlayground";
import {
  setSentence,
  startTyping,
  setTypedSentence,
  restart,
} from "../../../store/slices/simpleModeSlice";
import { Container } from "../../UIKit/Container";
import styles from "./SimpleMode.module.scss";

export const SimpleModePage = () => {
  const simpleModeState = useAppSelector((state) => state.simpleMode);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setSentence("Lorem ipsum dolor sit amet."));
    return handleTypeRestart;
  }, []);

  const handleTypeStart = () => {
    dispatch(startTyping(new Date().getTime()));
  };

  const handleTypeRestart = () => {
    dispatch(restart());
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setTypedSentence(e.target.value));
  };

  return (
    <div className={styles.page}>
      <Container>
        <div className={styles.contentWrapper}>
          <SimplePlayGround
            sentence={simpleModeState.sentence}
            onChange={handleInputChange}
            value={simpleModeState.typedSentence}
            breakPoints={simpleModeState.breakPoints}
            stats={simpleModeState.stats}
            gameState={simpleModeState.state}
            onStart={handleTypeStart}
            onRestart={handleTypeRestart}
          />
        </div>
      </Container>
    </div>
  );
};
