import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';
import { FC, useEffect } from 'react';
import { ordersUser } from '../../services/slices/order/actions';
import {
  getOrdersUser,
  getOrdersUserLoadingStatus
} from '../../services/slices/order/slice';
import { useDispatch, useSelector } from '../../services/store';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector(getOrdersUser);
  const loading = useSelector(getOrdersUserLoadingStatus);

 useEffect(() => {
    dispatch(ordersUser()); //опция получения заказов
  }, []);

  if (!loading) {
    return <ProfileOrdersUI orders={orders} />;
  }
};
