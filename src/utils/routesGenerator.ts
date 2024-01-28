import { ReactNode } from "react";

type TRoute = {
  path: string;
  element: ReactNode;
};

type TUserPath = {
  name: string;
  path?: string;
  element?: ReactNode;
  children?: TUserPath[];
};
export const routesGenerator = (items: TUserPath[]) => {
  const routes = items.reduce((accumulator: TRoute[], item) => {
    if (item.element && item.path) {
      accumulator.push({
        path: item.path,
        element: item.element,
      });
    } else if (item.children) {
      item.children.forEach((child) =>
        accumulator.push({
          path: child.path!, // '!' means not null assertion
          element: child.element,
        })
      );
    }
    return accumulator;
  }, []);

  return routes;
};
