"use client"
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { useState } from "react";
import Links, { NavLinkItem } from "./NavLinks";
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import PersonSharpIcon from '@mui/icons-material/PersonSharp';
import LocalMallSharpIcon from '@mui/icons-material/LocalMallSharp';
import FavoriteBorderSharpIcon from '@mui/icons-material/FavoriteBorderSharp';
import NotificationsNoneSharpIcon from '@mui/icons-material/NotificationsNoneSharp';
import Link from "next/link";

const baseLinks:NavLinkItem[] = [
    {label: "About", href: "/about"},
    {label: "Blog", href: "/blog"},
    {label: "Faq", href: "/faq"},
    {label: "Products", href: "/products"},
    {label: "Resources", href: "/resources"},
    {label: "Dashboard", href: "/dashboard"}
]

const extraMobileLinks:NavLinkItem[] = [
    {label: "Profile Settings", href: "/settings/profile"},
    {label: "Contact Us", href: "/contact"},
    {label: "Logout", href: "/logout"}
]

export default function Nav(){
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }

    const allMobileLinks = [...baseLinks, ...extraMobileLinks]

    const {removeFromCart, clearNotifications } = useStore();

    const cart = useStore((state) => state.cart);
    const wishlist = useStore((state) => state.wishlist);
    const notifications = useStore((state) => state.notifications);

    // const menuAnimation = {
    //     initial: { opacity: 0, scale: 0.95, y: -10 },
    //     animate: { opacity: 1, scale: 1, y: 0 },
    //     exit: { opacity: 0, scale: 0.95, y: -10 },
    //     transition: { duration: 0.15, ease: 'easeOut' }
    // };

    const dropdownVariants = {
    initial: { opacity: 0, scale: 0.95, y: -10 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.95, y: -10 },
  };
    return (
        <div className="fixed top-0 left-0 right-0 z-50 w-full bg-gray-900 border-b border-slate-700 shadow-md">
          <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-4">
            <div className="text-lg font-semibold">
                <Link href={"/"}>
                    Logo
                </Link>
            </div>
            <div className=" hidden md:flex items-center ml-42">
                
                <div>
                    <Links links={baseLinks} className="flex items-center gap-6" />
                </div>
                
            </div>
            <div className="flex gap-2 items-center justify-between">
                <div className="flex items-center justify-between gap-4 p-1 mb-1">
                    <div className="p-1"><SearchSharpIcon fontSize="small"/></div>
                    <div className="p-1"><PersonSharpIcon fontSize="small"/></div>
                    <Menu as="div" className="relative">
            <MenuButton className="relative p-2 text-white hover:text-blue-600 transition-colors">
            <span>
                <NotificationsNoneSharpIcon fontSize="small"/>
                </span>
            {notifications.length > 0 && (
                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            )}
            </MenuButton>
    
          <MenuItems transition className="absolute right-0 z-50 mt-2 w-64 origin-top-right rounded-xl bg-gray-900 p-2 shadow-xl ring-1 ring-white/5 focus:outline-none">
            <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={dropdownVariants}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="rounded-xl text-white p-2 shadow-xl ring-1 ring-white/5"
          >
            <div className="flex items-center justify-between px-3 py-2 border-b border-gray-100 text-sm">
              <span className="font-bold text-gray-900">Activity Log</span>
              {notifications.length > 0 && (
                <button onClick={clearNotifications} className="text-[10px] text-blue-600 hover:underline">Clear</button>
              )}
            </div>
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-xs text-white">No new alerts.</div>
            ) : (
              <div className="max-h-48 overflow-y-auto p-1 space-y-1">
                {notifications.map((note, idx) => (
                  <div key={idx} className="text-[11px] text-white p-2.5 bg-gray-900 border-b-1 border-white/5 leading-relaxed">
                    {note}
                  </div>
                ))}
              </div>
            )}
            </motion.div>
          </MenuItems>
    
      </Menu>
        <Menu as="div" className="relative">
            <MenuButton className="relative p-2 text-gray-700 hover:text-blue-600 transition-colors">
                <span>
                    <FavoriteBorderSharpIcon fontSize="small"/>
                </span>
                {wishlist.length > 0 && (
                    <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500" />
                )}
            </MenuButton>
    
                <MenuItems transition className="absolute right-0 z-50 mt-2 w-56 origin-top-right rounded-xl bg-gray-900 p-2 shadow-xl ring-1 ring-white/5 focus:outline-none">
                        <motion.div
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            variants={dropdownVariants}
                            transition={{ duration: 0.15, ease: 'easeOut' }}
                            className="rounded-xl bg-gray-900 text-white p-2 shadow-xl ring-1 ring-white/5"
                        >
                        <div className="px-3 py-2 font-bold text-gray-200 border-b border-gray-100 text-sm">Wishlist</div>
                        {wishlist.length === 0 ? (
                        <div className="p-4 text-center text-xs text-white">No saved items.</div>
                        ) : (
                        <div className="p-1 space-y-1">
                            {wishlist.map((item) => (
                            <Link key={item.slug} href={`/products/chair/${item.slug}`} className="block text-xs p-2.5 hover:bg-gray-50 font-medium text-white truncate border-b-1 border-white/5">
                                {item.name}
                            </Link>
                            ))}
                        </div>
                        )}
                        </motion.div>
                </MenuItems>
        
      </Menu>
      <Menu as="div" className="relative">
        <MenuButton className="relative p-2 text-gray-700 hover:text-blue-600 transition-colors">
          <span>
            <LocalMallSharpIcon fontSize="small"/>
            </span>
          {cart.length > 0 && (
            <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white">
              {cart.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          )}
        </MenuButton>
        
          <MenuItems transition className="absolute right-0 z-50 mt-2 w-64 origin-top-right rounded-xl bg-gray-900 p-2 shadow-xl ring-1 ring-black/5 focus:outline-none">
            <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={dropdownVariants}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="rounded-xl bg-gray-900 text-white p-2 shadow-xl ring-1 ring-white/5"
          >
            <div className="px-3 py-2 font-bold text-gray-900 border-b border-gray-100 text-sm">Shopping Cart</div>
            {cart.length === 0 ? (
              <div className="p-4 text-center text-xs text-gray-500">Your cart is empty.</div>
            ) : (
              <div className="max-h-60 overflow-y-auto p-1 space-y-1">
                {cart.map((item) => (
                  <div key={item.slug} className="flex items-center justify-between text-xs p-2 bg-gray-900 rounded-lg ring-1 ring-white/5">
                    <div className="truncate p-2.5">
                      <p className="font-semibold text-white truncate">{item.name}</p>
                      <p className="text-white">{item.price} x {item.quantity}</p>
                    </div>
                    <button onClick={() => removeFromCart(item.slug)} className="text-white p-2 font-bold hover:text-gray-200">✕</button>
                  </div>
                ))}
                <MenuItem>
                  <Link href="/checkout" className="block w-full text-center mt-2 bg-blue-600/50 hover:bg-blue-700 text-white rounded-lg py-2 font-semibold text-xs transition-colors">
                    Proceed to Checkout
                  </Link>
                </MenuItem>
              </div>
            )}
            </motion.div>
          </MenuItems>
       
      </Menu>
                </div>
            <button 
                onClick={toggleMenu}
                className="w-10 h-10 z-50 flex flex-col justify-center items-center relative focus:outline-none"
                aria-label="Toggle Menu">
                <span className={`w-8 h-[2px] bg-gray-200 rounded-full transition-all duration-300 ease-in-out ${
                isOpen ? 'rotate-45 translate-y-[5px]' : '-translate-y-[4px]'
                }`}></span>
                <span className={`w-8 h-[2px] bg-gray-200 rounded-full transition-all duration-300 ease-in-out ${
                isOpen ? '-rotate-45 -translate-y-[5px]' : 'translate-y-[4px]'
                }`}></span>
            </button>
            </div>

        {/* viewport dropdown menu */}
        <div className={`fixed inset-0 bg-gray-600 text-gray-100 flex flex-col items-start justify-start transition-transform duration-500 ease-in-out z-0 container mx-auto ${
            isOpen ? 'translate-y-0' : '-translate-y-full'
        }`}>
            <div className="p-12 space-y-4">
                <div className="text-2xl">logo</div>
            
                <div>
                    <input className="border-2 border-white p-2 focus:outline-none text-white text-lg" placeholder="Search"/>
                </div>
            
                <div>
                    <Links 
                    links={allMobileLinks} 
                    className="flex flex-col gap-2.5 text-2xl font-normal"
                    itemClassName="py-8 hover:bg-gray-50 rounded-md"/>
                </div>
            </div>
        </div>
    </div>
    </div>
    )
}