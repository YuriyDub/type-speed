import { ChangeEvent, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store";
import { StandartPlayGround } from "./RainPlayground/RainPlayground";
import {
  setSentence,
  startTyping,
  setTypedSentence,
  restart,
} from "../../../store/slices/simpleModeSlice";
import { Container } from "../../UIKit/Container";
import styles from "./RainMode.module.scss";

export const SimpleModePage = () => {
  const state = useAppSelector((state) => state.simpleMode);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setSentence("Lorem ipsum dolor sit amet."));
  });

  console.log(state.stats);

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
          <StandartPlayGround
            sentence={state.sentence}
            onChange={handleInputChange}
            value={state.typedSentence}
            breakPoints={state.breakPoints}
            stats={state.stats}
            gameState={state.state}
            onStart={handleTypeStart}
            onRestart={handleTypeRestart}
          />
        </div>
      </Container>
    </div>
  );
};
