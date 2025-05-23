import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Provider } from 'react-redux';
import './App.css';
import store from './app/redux/store/store';

import PrivateRoutes from './Utils/PrivateRoutes';

import Home from './Pages/HomePage/Home';
import Clients from './Pages/ClientsPage/Clients';
import Assets from './Pages/AssetsPage/Assets';
import Sensor from './Pages/SensorPage/Sensor';
import Daignosis from './Pages/DiagnosisPage/Diagnosis';
import SignIn from './Pages/SignIn/SignIn';
import SignUp from './Pages/SignUp/SignUp';
import Report from './Components/Diagnosis/Report/Report';

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route path='/home' element={<Home />} />
              <Route path='/clients' element={<Clients />} />
              <Route path='/client/:workshopCode/assets' element={<Assets />} />
              <Route
                path='/client/:workshopCode/asset/:assetId/:sensorId/:sensorType'
                element={<Sensor />}
              />
              <Route
                path='/client/:workshopCode/asset/:assetId/:sensorId/:sensorType/diagnosis'
                element={<Daignosis />}
              />
              <Route
                path='/client/:workshopCode/asset/:assetId/:sensorId/:sensorType/diagnosis/report'
                element={<Report />}
              />
            </Route>
            <Route exact path='/' element={<SignIn />} />
            <Route exact path='/sign-in' element={<SignIn />} />
            <Route exact path='/sign-up' element={<SignUp />} />
          </Routes>
        </BrowserRouter>
      </Provider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
