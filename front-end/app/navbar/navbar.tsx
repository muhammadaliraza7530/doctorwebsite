import Image from "next/image";
import Link from "next/link";
import backgroundImage from '../../public/images/navHero/Background.png'
import logoImage from '../../public/images/logo/Logo.png'
import Buttons from "../components/button";

export default function Navbar() {
    return (
        <nav className="absolute top-0 left-0 w-full z-30 bg-transparent">
            <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Image
                        src={backgroundImage}
                        alt="Logo"
                        width={48}
                        height={48}
                        className="rounded-sm object-cover"
                    />
                  <Image
                    src={logoImage}
                    alt="Doctor Logo"
                    className="rounded-sm object-cover lg:w-[98px]"
                  />
                </div>
                <div className="flex gap-4">
                    <Link className="inline-block text-[15px] text-black drop-shadow font-[400] transition duration-200 hover:bg-[linear-gradient(135deg,_#0E82FD_0%,_#06AED4_100%)] hover:text-transparent hover:bg-clip-text" href="#">
                        Home
                    </Link>
                    <Link className="inline-block text-[15px] text-black drop-shadow font-[400] transition duration-200 hover:bg-[linear-gradient(135deg,_#0E82FD_0%,_#06AED4_100%)] hover:text-transparent hover:bg-clip-text" href="/doctors">
                        Doctors
                    </Link>
                    <Link className="inline-block text-[15px] text-black drop-shadow font-[400] transition duration-200 hover:bg-[linear-gradient(135deg,_#0E82FD_0%,_#06AED4_100%)] hover:text-transparent hover:bg-clip-text" href="#">
                        Blogs
                    </Link>
                    <Link className="inline-block text-[15px] text-black drop-shadow font-[400] transition duration-200 hover:bg-[linear-gradient(135deg,_#0E82FD_0%,_#06AED4_100%)] hover:text-transparent hover:bg-clip-text" href="#">
                        My Appointments
                    </Link>
                </div>
                <div className="flex gap-4 items-center">
                    <Link className="text-[15px] text-black drop-shadow font-[400] hover:bg-[linear-gradient(135deg,_#0E82FD_0%,_#06AED4_100%)] hover:text-transparent hover:bg-clip-text" href="#">
                        Contact: +92 123 456 789
                    </Link>
                    <Buttons title="Login / Sign up" href="/auth"/>
                </div>
            </div>
        </nav>
    );
}