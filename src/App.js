import "./App.css";
import GoalsList from "./Components/goalsList";
import ListManipulation from "./Components/Patterns/RenderProp";
import UseCallback from "./Hooks/useCallback";
function App() {
  return (
    <div className='App'>
      <ListManipulation render={(props) => <GoalsList {...props} />} />
      <UseCallback />
    </div>
  );
}

export default App;
