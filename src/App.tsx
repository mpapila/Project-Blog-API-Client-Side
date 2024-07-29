import { Container } from '@mui/material'
import Navbar from './components/Navbar'
import Router from './components/Router'
import './App.css'
import Footer from './components/Footer'


function App() {

  return (
    <div style={{ backgroundColor: '#111827', minHeight: '100vh' }}>
      <Container >
        <Navbar />
        <Router />
        <Footer />
      </Container>
    </div>
  )
}

export default App
