import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useSelector } from '../../services/store';
import { getOrdersAll, getUserState } from '../../services/slices/userSlice';
import { getFeeds } from '../../services/slices/feedSlice';
import { Preloader } from '@ui';
import { useDispatch } from './../../services/store';

export const ProfileOrders: FC = () => {
  const { userOrders, request } = useSelector(getUserState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrdersAll());
    dispatch(getFeeds());
  }, []);

  if (request === true) {
    return <Preloader />;
  }

  return <ProfileOrdersUI orders={userOrders} />;
};
