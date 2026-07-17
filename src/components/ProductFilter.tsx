"use client";

import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";

export default function ProductFilter() {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <MenuButton className="inline-flex items-center gap-2 rounded-lg px-4 py-2 shadow ring-1 ring-gray-300">
        Filter Options
      </MenuButton>

      <MenuItems
        transition
        className="absolute right-0 top-full mt-2 z-30 w-56 rounded-xl bg-gray-900 p-2 shadow-xl ring-2 ring-white/5"
      >
        <MenuItem>
          <button className="block w-full rounded-md px-3 py-2 text-left data-[focus]:bg-gray-900">
            Price: Low to High
          </button>
        </MenuItem>

        <MenuItem>
          <button className="block w-full rounded-md px-3 py-2 text-left data-[focus]:bg-gray-900">
            Price: High to Low
          </button>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
}