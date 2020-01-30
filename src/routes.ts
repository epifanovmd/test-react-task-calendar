import * as React from "react";
import { RouteComponentProps } from "react-router";
import loadable from "@loadable/component";

const Quarter = loadable(() => import("./modules/quarter/Quarter"));

export interface IRoute {
  path: string;
  component:
    | React.ComponentType<RouteComponentProps<any>>
    | React.ComponentType<any>;
  exact: boolean;
}

export const routes: IRoute[] = [
  {
    path: "/",
    component: Quarter,
    exact: true,
  },
];
