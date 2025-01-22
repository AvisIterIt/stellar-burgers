import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { ingredientSlice } from '../../services/slices/ingredientSlice';
import {
  getOrderState,
  getOrderByNumber
} from '../../services/slices/orderSlice';

export const OrderInfo: FC = () => {
  /** TODO: взять переменные orderData и ingredients из стора */
  const number = Number(useParams().number);
  const ingredients = useSelector(ingredientSlice.selectors.ingredients);
  const { orderByNumberResponse, request } = useSelector(getOrderState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrderByNumber(number));
  }, []);

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderByNumberResponse || !ingredients.length) return null;

    const date = new Date(orderByNumberResponse.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderByNumberResponse.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderByNumberResponse,
      ingredientsInfo,
      date,
      total
    };
  }, [orderByNumberResponse, ingredients]);

  if (!orderInfo || request) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
