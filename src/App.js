import "./App.css";
import NewDropdown from "./Components/dropdown";
import GoalsList from "./Components/goalsList";
import ListManipulation from "./Components/Patterns/RenderProp";
import UseCallback from "./Hooks/useCallback";
import JobPoster from "./JobBoard/JobPoster";
import ProductsPage from "./ProductsPage/Products";
import TabData from "./TabData/TabData";
function App() {
  return (
    <div className='App'>
      {/* <ListManipulation render={(props) => <GoalsList {...props} />} />
      <UseCallback />
      <JobPoster />
      <TabData /> */}
      {/* As HOC is used  showdropDown, onToggle, onSelect are handled by HOC and items is being passed by the parent.. */}
      {/* <NewDropdown items={["option1", "option2", "option3"]} /> */}
      <ProductsPage />
    </div>
  );
}

export default App;
