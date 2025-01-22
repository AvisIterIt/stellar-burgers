import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getFeeds, getFeedState } from '../../services/slices/feedSlice';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const { orders, loading } = useSelector(getFeedState);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFeeds());
  }, []);

  if (!orders.length) {
    return <Preloader />;
  }

  <FeedUI orders={orders} handleGetFeeds={() => {}} />;
};
