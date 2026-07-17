import Link from "next/link";

import { usePathname } from "next/navigation";

export type NavLinkItem = {
    label: string;
    href: string;
}

interface NavLinksProps {
    links: NavLinkItem[];
    className?:string;
    itemClassName?:string;
    onLinkClick?: () => void;
}

export default function Links({links, className="flex items-center gap-6", itemClassName="", onLinkClick}:NavLinksProps){
    const pathname = usePathname()
    return (
        <ul className={className}>
            {links.map((link) => {
                const isActive = pathname === link.href;
                return (
                <li key={link.href}>
                    <Link 
                    href={link.href}
                    onClick={onLinkClick}
                    className={`text-md font-normal transition-colors ${
                        isActive ? 'text-gray-500 font-semibold' : 
                        'text-gray-200 hover:text-gray-400'
                    } ${itemClassName}`}>
                        {link.label}
                    </Link>
                </li>
                )
            })}
        </ul>
    )
}