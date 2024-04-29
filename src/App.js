import "./App.css";
import GoalsList from "./Components/goalsList";
import ListManipulation from "./Components/Patterns/RenderProp";
import UseCallback from "./Hooks/useCallback";
import JobPoster from "./JobBoard/JobPoster";
import TabData from "./TabData/TabData";
function App() {
  return (
    <div className='App'>
      <ListManipulation render={(props) => <GoalsList {...props} />} />
      <UseCallback />
      {/* <JobPoster /> */}
      <TabData />
    </div>
  );
}

export default App;
