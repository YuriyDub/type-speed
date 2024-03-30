import { Header } from "./components/Header/Header";
import { Button } from "./components/UIKit/Button/Button";

function App() {
  return (
    <>
      <Header />
      <Button text="outlined button" variant="outlined" size="small" />
      <Button text="outlined button" variant="outlined" />
      <Button text="outlined button" variant="outlined" size="large" />
      <Button text="outlined button" variant="outlined" shape="squared" />
      <Button text="outlined button" variant="outlined" disabled />
      <Button text="outlined button" size="small" />
      <Button text="outlined button" />
      <Button text="outlined button" size="large" />
      <Button text="outlined button" disabled />
    </>
  );
}

export default App;
