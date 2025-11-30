import Header from './general_components/Header';
import { Routes,Route } from 'react-router';
import HomePage from './pages/homePage/HomePage';
import { Flex } from '@mantine/core';
import DocViewPage from './pages/docViewPage/DocViewPage';
import { getUserInfo } from '../services/accountServices';
import { useEffect,useContext } from 'react';
import { AppContext } from '../contexts/ApplicationContext';

function App() {
  const {setUserInfo} = useContext(AppContext);
  const checkIfLoggedIn = async () => {
    const userInfo = await getUserInfo();
    if(userInfo) setUserInfo(userInfo);
  }
  useEffect(()=>{checkIfLoggedIn()},[]);
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
