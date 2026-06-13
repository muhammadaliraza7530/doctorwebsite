import Image from "next/image";
import Link from "next/link";
import Buttons from "../components/button";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/doctors", label: "Doctors" },
  { href: "#", label: "Blogs" },
  { href: "/my-appointments", label: "My Appointments" },
];

const navLinkClass =
  "inline-block text-[15px] text-black drop-shadow font-normal transition duration-200 hover:bg-[linear-gradient(135deg,#0E82FD_0%,#06AED4_100%)] hover:text-transparent hover:bg-clip-text";

export default function Navbar() {
    return (
        <nav className="absolute top-0 left-0 w-full z-30 bg-transparent">
            <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Image
                        src="/images/navHero/Background.png"
                        alt="Logo"
                        width={48}
                        height={48}
                        className="rounded-sm object-cover"
                    />
                  <Image
                    src="/images/logo/Logo.png"
                    alt="Doctor Logo"
                    width={98}
                    height={48}
                    className="rounded-sm object-cover lg:w-24.5"
                  />
                </div>
                <div className="flex gap-4">
                    {navLinks.map((link) => (
                        <Link key={link.href} className={navLinkClass} href={link.href}>
                            {link.label}
                        </Link>
                    ))}
                </div>
                <div className="flex gap-4 items-center">
                    <Link className={navLinkClass} href="#">
                        Contact: +92 123 456 789
                    </Link>
                    <Buttons title="Login / Sign up" href="/auth"/>
                </div>
            </div>
        </nav>
    );
}