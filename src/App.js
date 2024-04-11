import "./App.css";
// import DragResize from "./DragResize";
import DraggableArea from "./DraggableComponent";
// import DraggableResizable from "./DraggableResizable";
import "./index.scss";

function App() {
  return (
    <div className="App">
      {/* <DraggableResizable /> */}
      <DraggableArea />
      {/* <DragResize /> */}
    </div>
  );
}

export default App;
