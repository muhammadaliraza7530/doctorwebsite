import Link from "next/link";

interface ButtonProps {
    title: string;
    href?: string;
}

export default function Bottons({title, href = "#"}: ButtonProps) {
    return (
        <div>
            <Link 
                href={href}
                className="px-6 py-2 text-white rounded-full transition hover:opacity-90 font-medium text-sm"
                style={{background: 'linear-gradient(135deg, #0E82FD 0%, #06AED4 100%)'}}
            >
                {title}
            </Link>
            </div>
    )
}