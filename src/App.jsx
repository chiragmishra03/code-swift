import "./App.scss";
import Canvas from "./components/Canvas";
import Coder from "./components/Coder";
function App() {
  return (
    <>
      <h1 id="main-heading">CODE SWIFT</h1>
      <div className="dev-name">
        <p>Developed by</p>
        <a href="https://www.linkedin.com/in/chirag-mishra-03a00a168/">
          Chirag Mishra
        </a>{" "}
      </div>
      <section id="main">
        <h1>Coding Area</h1>
        <Coder />
        <h1>Dry Run/Practice Area</h1>
        <Canvas />
      </section>
    </>
  );
}

export default App;
