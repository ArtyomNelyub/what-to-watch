import request, { AxiosResponse } from 'axios';
import { ErrorType } from '../types/error-type';
import { StatusCodes } from 'http-status-codes';
import { store } from '../store';
import { addErrorMessage } from '../store/action';
import { clearErrorAction } from '../store/api-actions';

export const errorHandle = (error: ErrorType): void => {
  if (!request.isAxiosError(error)) {
    throw error;
  }

  const errorHandlerList = [
    StatusCodes.BAD_REQUEST,
    StatusCodes.UNAUTHORIZED,
    StatusCodes.NOT_FOUND,
  ];

  const handleError = (message: string) => {
    store.dispatch(addErrorMessage(message));
    store.dispatch(clearErrorAction());
  };

  const response = error.response as AxiosResponse<any> | undefined;

  if (response && errorHandlerList.includes(response.status)) {
    handleError(response.data.error);
  }
};
