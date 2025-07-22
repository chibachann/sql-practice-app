import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ApiTest from './components/ApiTest'
import AllDataViewer from './components/AllDataViewer/AllDataViewer'

function App() {
  return (
    <>
      <a href="https://vite.dev" target="_blank">
        <img src={viteLogo} className="logo" alt="Vite logo" />
      </a>
      <a href="https://react.dev" target="_blank">
        <img src={reactLogo} className="logo react" alt="React logo" />
      </a>
      <div>
        <ApiTest />
        <AllDataViewer />
      </div>
        

    </>
  )
}

export default App
