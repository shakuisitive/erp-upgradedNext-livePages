"use client";
import { Fragment } from 'react';
import Link from "next/link";
import { usePathname } from "next/navigation";
const Navbar = () => {
  const pathname = usePathname();

  const isActive = (href) => href == pathname;
  const navLinks = [
    { title: "Home", url: "/home", isActive: true },
    { title: "Projects", url: "/projects", isActive: false },
    { title: "Compaigns", url: "/compaigns", isActive: false },
    { title: "Documents", url: "documents", isActive: false },
    { title: "Follower", url: "follower", isActive: false },
    { title: "Activity", url: "activity", isActive: false },
  ];
  return (
    <nav className=" sticky">
      <ul className="flex pl-[0px] gap-5 pb-0 border-b-[1px]  border-t-0 items-center">
        {navLinks?.map((link, index) => (
          <Fragment key={index}>
            <li
              className={`font-medium ${
                isActive(`/dashboard${link.url}`)
                  ? "border-b-[0.8px] text-sky-500 border-sky-500"
                  : ""
              } hover:bg-transparent hover:text-sky-500 2xl:text-sm lgdesktop:text-[16px] text-gray-40`}
              key={index}
            >
              <Link href={`/dashboard${link.url}`}>{link.title}</Link>
            </li>
            </Fragment>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
