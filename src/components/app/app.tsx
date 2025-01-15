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
import { ProtectedRoute } from '../ProtectedRoute';
import { Modal } from './../modal/modal';
import { IngredientDetails } from './../ingredient-details/ingredient-details';
import { AppHeader } from '../app-header';
import { OrderInfo } from '../order-info';

const App = () => (
  <div className={styles.app}>
    <AppHeader />
    <Routes>
      <Route path='/' element={<ConstructorPage />} />
      <Route path='/feed' element={<Feed />} />
      <Route
        path='/login'
        element={
          <ProtectedRoute>
            <Login />
          </ProtectedRoute>
        }
      />
      <Route
        path='/register'
        element={
          <ProtectedRoute>
            <Register />
          </ProtectedRoute>
        }
      />
      <Route
        path='/forgot-password'
        element={
          <ProtectedRoute>
            <ForgotPassword />
          </ProtectedRoute>
        }
      />
      <Route
        path='/reset-password'
        element={
          <ProtectedRoute>
            <ResetPassword />
          </ProtectedRoute>
        }
      />
      <Route
        path='/profile'
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path='/profile/orders'
        element={
          <ProtectedRoute>
            <ProfileOrders />
          </ProtectedRoute>
        }
      />

      <Route
        path='/feed/:number'
        element={
          <Modal
            title='Выберите булку'
            onClose={() => {
              history.back();
            }}
          >
            <OrderInfo />
          </Modal>
        }
      />
      <Route
        path='/ingredients/:id'
        element={
          <Modal
            title='Выберите начинку'
            onClose={() => {
              history.back();
            }}
          >
            <IngredientDetails />
          </Modal>
        }
      />
      <Route
        path='/profile/orders/:number'
        element={
          <ProtectedRoute>
            <Modal
              title='Выберите булку'
              onClose={() => {
                history.back();
              }}
            >
              <OrderInfo />
            </Modal>
          </ProtectedRoute>
        }
      />

      <Route path='*' element={<NotFound404 />} />
    </Routes>
  </div>
);

export default App;
