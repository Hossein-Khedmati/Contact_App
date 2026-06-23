import { ContactProvider } from '@context/ContactContext.jsx';
import ContactPage from './components/ContactPage';

function App() {
  return (
    <ContactProvider>
      <ContactPage />
    </ContactProvider>
  );
}

export default App;
