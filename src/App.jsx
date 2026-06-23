import { ContactProvider } from "./context/index.js";
import ContactPage from './components/ContactPage';

function App() {
  return (
    <ContactProvider>
      <ContactPage />
    </ContactProvider>
  );
}

export default App;
