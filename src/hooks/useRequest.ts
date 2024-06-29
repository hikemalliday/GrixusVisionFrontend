import { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";

export interface IUseRequestHook<T> {
  action: (payload: T) => Promise<T>;
  error: AxiosError | null;
  isLoading: boolean;
  response: AxiosResponse | Record<string, unknown>;
  success: boolean;
}

export function useRequest<T>(requestHandler: CallableFunction, act = false) {
  const [isLoading, setIsLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<AxiosError | null>(null);
  const [response, setResponse] = useState({});
  const [called, setCalled] = useState(false);
  const [shouldAct, _] = useState(act);

  const action = async (payload: T): Promise<T> => {
    let resp;
    try {
      resp = (await requestHandler(payload)) as AxiosResponse;
      setResponse(resp);
      setSuccess(true);
    } catch (error: unknown) {
      setError(error as AxiosError);
      // onError here? Might not be needed.
    }
    setIsLoading(false);
    return resp as T;
  };

  useEffect(() => {
    if (shouldAct && !called) {
      void action(undefined as T).then(() => {
        setCalled(true);
      });
    }
  }, [shouldAct, called]);

  return { action, error, isLoading, response, success };
}
