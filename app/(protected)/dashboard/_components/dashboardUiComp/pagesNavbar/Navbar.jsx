import Link from "next/link";

const Navbar = () => {
  const navLinks = [
    { title: "Home", url: "#", isActive: true },
    { title: "Projects", url: "#", isActive: false },
    { title: "Compaigns", url: "#", isActive: false },
    { title: "Documents", url: "#", isActive: false },
    { title: "Follower", url: "#", isActive: false },
    { title: "Activity", url: "#", isActive: false },
  ];
  return (
    <nav className=" border-b-2">
      <ul className="flex items-center gap-5  pb-3">
        {navLinks?.map((link, index) => (
          <>
            <li
              className=" font-medium text-sm flex flex-col relative text-gray-40"
              key={index}
            >
              <Link href={link.url}>{link?.title}</Link>
              {link?.isActive && (
                <span className="w-[70px] h-2 border-b-2 border-blue-500 absolute bottom-[-13px]" />
              )}
            </li>
          </>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
