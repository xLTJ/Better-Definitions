import './App.css';
import components from "./Modules/components";

function App() {
  return (
    <div className="App">
        {MainHeader()}
        {MainContent()}
    </div>
  );
}

function MainHeader(){
    return (
        <header className="header">
            <h1 id={"header-text"}>
                Better Definitions
            </h1>
        </header>
    )
}

function MainContent() {
    return (
        <main id={"main-content"}>
            {components.SearchDefinition('definition')}
        </main>
    )
}

export default App;
