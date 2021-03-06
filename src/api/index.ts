import querystring from "query-string";
import { RequestType } from "../common/requestType";

export interface IResponse<R> {
  data: R | null;
  status: number;
  error?: Error;
  message?: string;
}

export const baseFetch = async <P, R>(
  url: string,
  params: P,
  method: RequestType = RequestType.GET,
  headers: { [key: string]: string } = {},
): Promise<IResponse<R>> => {
  const body =
    method !== RequestType.GET ? { body: JSON.stringify(params) } : {};

  const hasParams = Object.keys(params).length > 0;
  const urlResult =
    method !== RequestType.GET
      ? `/api/${url}`
      : `/api/${url}${hasParams ? "?" : ""}${querystring.stringify(params)}`;

  try {
    const res = await fetch(urlResult, {
      method,
      ...body,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...headers,
      },
    });

    const json = (await res?.json()) || {};
    const status = res.status;

    return { data: json as R, status };
  } catch (error) {
    return {
      data: null,
      status: 500,
      error: error as Error,
      message: error.message,
    };
  }
};
