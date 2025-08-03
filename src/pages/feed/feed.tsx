import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { feedsAll } from '../../services/slices/feed/actions';
import { getOrdersFeed } from '../../services/slices/feed/slice';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();

  const orders: TOrder[] = useSelector(getOrdersFeed); //получаем данные заказов

  useEffect(() => {
    //загрузка заказов
    dispatch(feedsAll());
  }, [dispatch]);

  if (!orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={() => dispatch(feedsAll())} />;
};
