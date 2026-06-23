import { ContactProvider } from "./context";
import ContactPage from './components/ContactPage';

function App() {
  return (
    <ContactProvider>
      <ContactPage />
    </ContactProvider>
  );
}

export default App;
