/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from "react";
import AdminDashboard from "../pages/admin/AdminDashboard";
import CreateAdmin from "../pages/admin/CreateAdmin";
import CreateFaculty from "../pages/admin/CreateFaculty";
import CreateStudent from "../pages/admin/CreateStudent";
import { NavLink } from "react-router-dom";

type TRoute = {
  path: string;
  element: ReactNode;
};

type TSidebarItem = {
    key: string;
    label: ReactNode;
    children?: TSidebarItem[];
}

const adminPaths2 = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <AdminDashboard></AdminDashboard>,
  },
  {
    name: "User Management",
    children: [
      {
        name: "Create Admin",
        path: "create-admin",
        element: <CreateAdmin></CreateAdmin>,
      },
      {
        name: "Create Faculty",
        path: "create-faculty",
        element: <CreateFaculty></CreateFaculty>,
      },
      {
        name: "Create Student",
        path: "create-student",
        element: <CreateStudent></CreateStudent>,
      },
    ],
  },
];

// admin sidebar
export const adminSideBarItems = adminPaths2.reduce((acc: TSidebarItem[], item) => {
  if (item.path && item.name) {
    acc.push({
      key: item.name,
      label: <NavLink to={`/admin/${item.path}`}>{item.name}</NavLink>,
    });
  }
  if (item.children) {
    acc.push({
      key: item.name,
      label: item.name,
      children: item.children.map((child) => ({
        key: child.name,
        label: <NavLink to={`/admin/${child.path}`}>{child.name}</NavLink>,
      })),
    });
  }
  return acc;
}, []);

// admin routes
export const adminRoutes = adminPaths2.reduce((accumulator: TRoute[], item) => {
  if (item.element && item.path) {
    accumulator.push({
      path: item.path,
      element: item.element,
    });
  } else if (item.children) {
    item.children.forEach((child) =>
      accumulator.push({
        path: child.path,
        element: child.element,
      })
    );
  }
  return accumulator; // Add this return statement
}, []);

// !hard coded routes
// export const adminPaths = [
//   {
//     index: true,
//     element: <AdminDashboard></AdminDashboard>,
//   },
//   {
//     path: "dashboard",
//     element: <AdminDashboard></AdminDashboard>,
//   },
//   {
//     path: "create-admin",
//     element: <CreateAdmin></CreateAdmin>,
//   },
//   {
//     path: "create-faculty",
//     element: <CreateFaculty></CreateFaculty>,
//   },
//   {
//     path: "create-student",
//     element: <CreateStudent></CreateStudent>,
//   },
// ];
