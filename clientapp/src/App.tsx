import Header from './general_components/Header';
import { Routes,Route } from 'react-router';
import HomePage from './pages/homePage/HomePage';
import { Flex } from '@mantine/core';
import DocViewPage from './pages/docViewPage/DocViewPage';

function App() {
  return (
    <Flex direction={"column"}>
     <Header/>
     <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path="/doc/:docid" element={<DocViewPage/>}/>
     </Routes>
    </Flex>
  )
}

export default App
