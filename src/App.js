import './App.css';
import Browser from './Browser';

function App(props) {
  const {embeddedAppSDK} = props;

  return (
    <div className="App">
      <Browser embeddedAppSDK={embeddedAppSDK} />
    </div>
  );
}

export default App;
