import { ConstructorPage } from '@pages';
import '../../index.css';
import styles from './app.module.css';
import { Routes, Route, useLocation } from 'react-router';
import { Feed } from './../../pages/feed/feed';
import { Login } from './../../pages/login/login';
import { Register } from './../../pages/register/register';
import { ForgotPassword } from './../../pages/forgot-password/forgot-password';
import { ResetPassword } from './../../pages/reset-password/reset-password';
import { Profile } from './../../pages/profile/profile';
import { ProfileOrders } from './../../pages/profile-orders/profile-orders';
import { NotFound404 } from './../../pages/not-fount-404/not-fount-404';
import { ProtectedRoute } from '../protected-route';
import { Modal } from './../modal/modal';
import { IngredientDetails } from './../ingredient-details/ingredient-details';
import { AppHeader } from '../app-header';
import { OrderInfo } from '../order-info';
import { useEffect } from 'react';
import { useDispatch } from '../../services/store';
import { getUser } from '../../services/slices/userSlice/userSlice';
import { getIngredients } from '../../services/slices/ingredientSlice/ingredientSlice';

const App = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const background = location.state?.background;

  useEffect(() => {
    dispatch(getUser());
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={background || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/feed/:number' element={<OrderInfo />} />
        <Route element={<ProtectedRoute onlyUnAuth />}>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/reset-password' element={<ResetPassword />} />
        </Route>
        <Route element={<ProtectedRoute onlyUnAuth={false} />}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/profile/orders' element={<ProfileOrders />} />
          <Route path='/profile/orders/:number' element={<OrderInfo />} />
        </Route>
        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {background && (
        <Routes>
          <Route
            path='/ingredients/:id'
            element={
              <Modal
                title={'Детали ингредиента'}
                onClose={() => {
                  history.back();
                }}
              >
                <IngredientDetails />
              </Modal>
            }
          />

          <Route
            path='/feed/:number'
            element={
              <Modal
                title={`#${location.pathname.match(/\d+/)}`}
                onClose={() => {
                  history.back();
                }}
              >
                <OrderInfo />
              </Modal>
            }
          />
          <Route element={<ProtectedRoute onlyUnAuth={false} />}>
            <Route
              path='/profile/orders/:number'
              element={
                <Modal
                  title={`#${location.pathname.match(/\d+/)}`}
                  onClose={() => {
                    history.back();
                  }}
                >
                  <OrderInfo />
                </Modal>
              }
            />
          </Route>
        </Routes>
      )}
    </div>
  );
};

export default App;
