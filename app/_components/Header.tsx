// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import {
//   NavigationMenu,
//   NavigationMenuItem,
//   NavigationMenuLink,
//   NavigationMenuList,
// } from "@/components/ui/navigation-menu";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import {
//   Sheet,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet";
// import { Menu, ChevronDown } from "lucide-react";

// export default function Header() {
//   const [open, setOpen] = useState(false);

//   const navLinks = [
//     { label: "Home", href: "/#home" },
//     {
//       label: "About",
//       subMenu: [
//         { label: "About Us", href: "#about" },
//         { label: "Message from Mission Director", href: "#message-director" },
//       ],
//     },
//     { label: "Resources", href: "/Resources/ShowResource" },
//     { label: "Gallery", href: "#gallery" },
//     { label: "Contact Us", href: "#contact-us" },
//   ];

//   const loginRoles = [
//     { label: "ADMINISTRATOR", href: "/administrator" },
//     { label: "STATE USER", href: "/state-user" },
//     { label: "DISTRICT USER", href: "/district-user" },
//     { label: "MTC USER", href: "/mtc-user" },
//   ];

//   return (
//     <header className="w-full bg-white shadow-md">
//       {/* ====== TOP SECTION ====== */}
//       <div className="flex flex-wrap items-center justify-between px-4 py-3 border-b border-gray-200">
//         <div className="flex items-center">
//           <Image
//             src="/logo-jharkhand-govt.png"
//             alt="Government Emblem"
//             width={70}
//             height={70}
//             className="mr-2"
//           />
//         </div>

//         <div className="flex flex-col items-center text-center flex-1 mx-4">
//           <Image
//             src="/logo-mtc.png"
//             alt="MTC Logo"
//             width={300}
//             height={60}
//             className="mb-1 max-w-full h-auto"
//           />
//         </div>

//         <div className="hidden md:flex items-center space-x-3">
//           <Image src="/logo-Nhm1.png" alt="NHM" width={60} height={60} />
//           <Image src="/logo_7.png" alt="Poshan Abhiyaan" width={90} height={70} />
//           <Image src="/logo-unicef.png" alt="UNICEF" width={100} height={60} />
          
//           {/* Accessibility Options */}
//           <div className="flex flex-col text-xs bg-[#0b5a56] text-white rounded overflow-hidden shadow-md">
//             <button className="hover:bg-[#084d49] px-2 py-1 font-bold transition-colors">A++</button>
//             <button className="hover:bg-[#084d49] px-2 py-1 font-bold transition-colors">A</button>
//             <button className="hover:bg-[#084d49] px-2 py-1 font-bold transition-colors">A−</button>
//           </div>
//         </div>

//         {/* ===== MOBILE MENU ===== */}
//         <div className="flex md:hidden items-center">
//           <Sheet open={open} onOpenChange={setOpen}>
//             <SheetTrigger asChild>
//               <Button variant="ghost" size="icon" className="text-[#00796B]">
//                 <Menu className="h-6 w-6" />
//               </Button>
//             </SheetTrigger>
//             <SheetContent side="right" className="w-64 bg-white">
//               <SheetHeader>
//                 <SheetTitle className="text-lg font-semibold text-[#00796B]">
//                   Menu
//                 </SheetTitle>
//               </SheetHeader>

//               <div className="mt-6 flex flex-col space-y-3">
//                 {navLinks.map((item) =>
//                   item.subMenu ? (
//                     <div key={item.label}>
//                       <p className="text-[#004D40] font-semibold mb-2">{item.label}</p>
//                       <div className="ml-3 space-y-2">
//                         {item.subMenu.map((sub) => (
//                           <Link key={sub.label} href={sub.href}>
//                             <Button
//                               variant="ghost"
//                               className="w-full justify-start text-sm text-[#004D40] hover:bg-[#E0F2F1] hover:text-[#00796B]"
//                             >
//                               {sub.label}
//                             </Button>
//                           </Link>
//                         ))}
//                       </div>
//                     </div>
//                   ) : (
//                     <Link key={item.label} href={item.href}>
//                       <Button
//                         variant="ghost"
//                         className="w-full justify-start text-[#004D40] hover:bg-[#E0F2F1] hover:text-[#00796B]"
//                       >
//                         {item.label}
//                       </Button>
//                     </Link>
//                   )
//                 )}

//                 <div className="border-t pt-3 mt-3">
//                   <p className="text-sm font-medium text-gray-700 mb-2">
//                     Login As:
//                   </p>
//                   {loginRoles.map((role) => (
//                     <Link key={role.label} href={role.href}>
//                       <Button
//                         variant="outline"
//                         className="w-full justify-start text-[#004D40] border-[#00796B] hover:bg-[#E0F2F1] hover:text-[#00796B] mb-2"
//                       >
//                         {role.label}
//                       </Button>
//                     </Link>
//                   ))}
//                 </div>
//               </div>
//             </SheetContent>
//           </Sheet>
//         </div>
//       </div>

//       {/* ===== NAVIGATION BAR (Desktop Only) ===== */}
//       <div className="hidden md:flex items-center justify-between bg-[#00796B] text-white px-6 py-2">
//         <NavigationMenu>
//           <NavigationMenuList className="flex space-x-1">
//             {navLinks.map((item) =>
//               item.subMenu ? (
//                 <NavigationMenuItem key={item.label}>
//                   <DropdownMenu>
//                     <DropdownMenuTrigger asChild>
//                       <Button
//                         variant="ghost"
//                         className="text-white hover:bg-[#00695C] px-4 py-2 rounded-md text-sm font-medium flex items-center gap-1 transition-colors"
//                       >
//                         {item.label}
//                         <ChevronDown className="h-4 w-4" />
//                       </Button>
//                     </DropdownMenuTrigger>
//                     <DropdownMenuContent className="bg-[#004D40] text-white font-semibold border-none shadow-lg">
//                       {item.subMenu.map((sub) => (
//                         <Link key={sub.label} href={sub.href} legacyBehavior passHref>
//                           <DropdownMenuItem className="hover:bg-[#00695C] cursor-pointer transition-colors">
//                             {sub.label}
//                           </DropdownMenuItem>
//                         </Link>
//                       ))}
//                     </DropdownMenuContent>
//                   </DropdownMenu>
//                 </NavigationMenuItem>
//               ) : (
//                 <NavigationMenuItem key={item.label}>
//                   <Link href={item.href} legacyBehavior passHref>
//                     <NavigationMenuLink className="hover:bg-[#00695C] px-4 py-2 rounded-md text-sm font-medium flex items-center transition-colors">
//                       {item.label}
//                     </NavigationMenuLink>
//                   </Link>
//                 </NavigationMenuItem>
//               )
//             )}
//           </NavigationMenuList>
//         </NavigationMenu>

//         {/* Login Dropdown */}
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button className="bg-[#FDD835] text-[#004D40] font-semibold hover:bg-[#FBC02D] transition-colors shadow-sm">
//               LOGIN
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent className="bg-[#004D40] text-white font-semibold border-none shadow-lg">
//             {loginRoles.map((role) => (
//               <Link key={role.label} href={role.href} legacyBehavior passHref>
//                 <DropdownMenuItem className="hover:bg-[#00695C] cursor-pointer transition-colors">
//                   {role.label}
//                 </DropdownMenuItem>
//               </Link>
//             ))}
//           </DropdownMenuContent>
//         </DropdownMenu>
//       </div>
//     </header>
//   );
// }

"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, ChevronDown } from "lucide-react";

export default function Header() {
  const [open, setOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "/#home" },
    {
      label: "About",
      subMenu: [
        { label: "About Us", href: "#about" },
        { label: "Message from Mission Director", href: "#message-director" },
      ],
    },
    { label: "Resources", href: "/Resources/ShowResource" },
    { label: "Gallery", href: "#gallery" },
    { label: "Contact Us", href: "#contact-us" },
  ];

  const loginRoles = [
    { label: "ADMINISTRATOR", href: "/administrator" },
    { label: "STATE USER", href: "/state-user" },
    { label: "DISTRICT USER", href: "/district-user" },
    { label: "MTC USER", href: "/mtc-user" },
  ];

  return (
    <header className="w-full bg-white shadow-md">
      {/* ====== TOP SECTION ====== */}
      <div className="flex flex-wrap items-center justify-between px-4 py-3 border-b border-gray-200">
        <div className="flex items-center">
          <Image
            src="/logo-jharkhand-govt.png"
            alt="Government Emblem"
            width={70}
            height={70}
            className="mr-2"
          />
        </div>

        <div className="flex flex-col items-center text-center flex-1 mx-4">
          <Image
            src="/logo-mtc.png"
            alt="MTC Logo"
            width={300}
            height={60}
            className="mb-1 max-w-full h-auto"
          />
        </div>

        <div className="hidden md:flex items-center space-x-3">
          <Image src="/logo-Nhm1.png" alt="NHM" width={60} height={60} />
          <Image src="/logo_7.png" alt="Poshan Abhiyaan" width={90} height={70} />
          <Image src="/logo-unicef.png" alt="UNICEF" width={100} height={60} />

          {/* Accessibility Options */}
          <div className="flex flex-col text-xs bg-[#0b5a56] text-white rounded overflow-hidden shadow-md">
            <button className="hover:bg-[#084d49] px-2 py-1 font-bold transition-colors">
              A++
            </button>
            <button className="hover:bg-[#084d49] px-2 py-1 font-bold transition-colors">
              A
            </button>
            <button className="hover:bg-[#084d49] px-2 py-1 font-bold transition-colors">
              A−
            </button>
          </div>
        </div>

        {/* ===== MOBILE MENU ===== */}
        <div className="flex md:hidden items-center">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-[#00796B]">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64 bg-white">
              <SheetHeader>
                <SheetTitle className="text-lg font-semibold text-[#00796B]">
                  Menu
                </SheetTitle>
              </SheetHeader>

              <div className="mt-6 flex flex-col space-y-3">
                {navLinks.map((item) =>
                  item.subMenu ? (
                    <div key={item.label}>
                      <p className="text-[#004D40] font-semibold mb-2">
                        {item.label}
                      </p>
                      <div className="ml-3 space-y-2">
                        {item.subMenu.map((sub) => (
                          <Link key={sub.label} href={sub.href}>
                            <Button
                              variant="ghost"
                              className="w-full justify-start text-sm text-[#004D40] hover:bg-[#E0F2F1] hover:text-[#00796B]"
                            >
                              {sub.label}
                            </Button>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link key={item.label} href={item.href}>
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-[#004D40] hover:bg-[#E0F2F1] hover:text-[#00796B]"
                      >
                        {item.label}
                      </Button>
                    </Link>
                  )
                )}

                <div className="border-t pt-3 mt-3">
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    Login As:
                  </p>
                  {loginRoles.map((role) => (
                    <Link key={role.label} href={role.href}>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-[#004D40] border-[#00796B] hover:bg-[#E0F2F1] hover:text-[#00796B] mb-2"
                      >
                        {role.label}
                      </Button>
                    </Link>
                  ))}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* ===== NAVIGATION BAR (Desktop Only) ===== */}
      <div className="hidden md:flex items-center justify-between bg-[#00796B] text-white px-6 py-2">
        <NavigationMenu>
          <NavigationMenuList className="flex space-x-1">
            {navLinks.map((item) =>
              item.subMenu ? (
                <NavigationMenuItem key={item.label}>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="text-white hover:bg-[#00695C] px-4 py-2 rounded-md text-sm font-medium flex items-center gap-1 transition-colors"
                      >
                        {item.label}
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-[#004D40] text-white font-semibold border-none shadow-lg">
                      {item.subMenu.map((sub) => (
                        <DropdownMenuItem key={sub.label} asChild>
                          <Link
                            href={sub.href}
                            className="hover:bg-[#00695C] cursor-pointer transition-colors block px-2 py-1"
                          >
                            {sub.label}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </NavigationMenuItem>
              ) : (
                <NavigationMenuItem key={item.label}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={item.href}
                      className="hover:bg-[#00695C] px-4 py-2 rounded-md text-sm font-medium flex items-center transition-colors"
                    >
                      {item.label}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              )
            )}
          </NavigationMenuList>
        </NavigationMenu>

        {/* ===== LOGIN DROPDOWN ===== */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="bg-[#FDD835] text-[#004D40] font-semibold hover:bg-[#FBC02D] transition-colors shadow-sm">
              LOGIN
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-[#004D40] text-white font-semibold border-none shadow-lg">
            {loginRoles.map((role) => (
              <DropdownMenuItem key={role.label} asChild>
                <Link
                  href={role.href}
                  className="hover:bg-[#00695C] cursor-pointer transition-colors block px-2 py-1"
                >
                  {role.label}
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
