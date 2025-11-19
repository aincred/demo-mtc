"use client";

import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] text-white pt-12 pb-6 border-t-4 border-yellow-500 shadow-2xl">
      <div className="container mx-auto px-6 grid md:grid-cols-3 gap-8">
        {/* ===== Left: Contact Info ===== */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-yellow-400 mb-6 relative">
            National Health Mission
            <span className="absolute bottom-0 left-0 w-16 h-1 bg-yellow-500 mt-2"></span>
          </h2>
          <div className="space-y-3 text-gray-300">
            <div className="flex items-start space-x-3">
              <svg className="w-5 h-5 text-yellow-500 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <div>
                <p>GVI Campus</p>
                <p>Namkum Ranchi</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <svg className="w-5 h-5 text-yellow-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              <p>0651 - 2261000</p>
            </div>
            <div className="flex items-center space-x-3">
              <svg className="w-5 h-5 text-yellow-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              <p>0651 - 226856</p>
            </div>
            <div className="flex items-center space-x-3">
              <svg className="w-5 h-5 text-yellow-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              <p>chjharkhand[at]gmail[dot]com</p>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex space-x-3 mt-6">
            <a
              href="#"
              className="bg-gray-800 hover:bg-yellow-500 transition-all duration-300 p-3 rounded-full transform hover:scale-110"
              aria-label="Twitter"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M24 4.56c-.89.39-1.83.65-2.83.77a4.92 4.92 0 0 0 2.16-2.71 9.83 9.83 0 0 1-3.12 1.19 4.92 4.92 0 0 0-8.38 4.49A13.93 13.93 0 0 1 1.67 3.15a4.92 4.92 0 0 0 1.52 6.56A4.9 4.9 0 0 1 .96 9v.06a4.93 4.93 0 0 0 3.94 4.83 4.92 4.92 0 0 1-2.21.08 4.93 4.93 0 0 0 4.59 3.41A9.87 9.87 0 0 1 0 19.54 13.9 13.9 0 0 0 7.55 21.5c9.05 0 14-7.5 14-14v-.64A9.94 9.94 0 0 0 24 4.56z" />
              </svg>
            </a>
            <a
              href="#"
              className="bg-gray-800 hover:bg-yellow-500 transition-all duration-300 p-3 rounded-full transform hover:scale-110"
              aria-label="Facebook"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M24 12.073C24 5.373 18.627 0 12 0S0 5.373 0 12.073c0 5.989 4.388 10.954 10.125 11.854v-8.385H7.08v-3.47h3.045V9.43c0-3.007 1.79-4.67 4.533-4.67 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.492 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.613 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            <a
              href="#"
              className="bg-gray-800 hover:bg-yellow-500 transition-all duration-300 p-3 rounded-full transform hover:scale-110"
              aria-label="YouTube"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M10 15l5.19-3L10 9v6zm11-3a10 10 0 1 0-20 0 10 10 0 0 0 20 0z" />
              </svg>
            </a>
          </div>
        </div>

        {/* ===== Center: Google Map ===== */}
        <div className="rounded-lg overflow-hidden shadow-lg">
          <h2 className="text-xl font-bold text-yellow-400 mb-4">Find Us</h2>
          <div className="relative h-64 md:h-full min-h-[200px]">
  <iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3682.7646367694975!2d85.35098097503145!3d23.34684278494125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f4e23bcb44e265%3A0x9c7f991c20a07efb!2sJharkhand%20Rural%20Health%20Mission%20Society%20(JRHMS)!5e0!3m2!1sen!2sin!4v1730810000000!5m2!1sen!2sin"
    width="100%"
    height="100%"
    className="absolute inset-0 rounded-lg border-2 border-gray-700"
    loading="lazy"
    allowFullScreen
    referrerPolicy="no-referrer-when-downgrade"
    title="Jharkhand Rural Health Mission Society Location"
  ></iframe>
</div>

        </div>

        {/* ===== Right: Quick Links ===== */}
        <div>
          <h2 className="text-xl font-bold text-yellow-400 mb-6 relative">
            Quick Links
            <span className="absolute bottom-0 left-0 w-16 h-1 bg-yellow-500 mt-2"></span>
          </h2>
          <ul className="space-y-3">
            {[
              { name: "Home", href: "#" },
              { name: "About", href: "#" },
              { name: "Message from Mission Director", href: "#" },
              { name: "Resources", href: "#" },
              { name: "State Center of Excellence", href: "#" },
              { name: "Gallery", href: "#" },
              { name: "Contact Us", href: "#" }
            ].map((item, index) => (
              <li key={index} className="group">
                <Link 
                  href={item.href} 
                  className="flex items-center text-gray-300 hover:text-yellow-400 transition-all duration-300 group-hover:translate-x-2"
                >
                  <svg className="w-4 h-4 mr-2 text-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ===== Bottom Bar ===== */}
      <div className="bg-[#111] mt-10 py-6 border-t border-gray-800">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <p className="text-gray-400">
              Powered by{" "}
              <span className="text-white font-semibold hover:text-yellow-400 transition-colors duration-300 cursor-pointer">Dhanush</span>
            </p>
          </div>
          <div className="flex items-center space-x-6">
            <div className="text-gray-300 flex items-center">
              <svg className="w-5 h-5 mr-2 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
              </svg>
              Total Visits:{" "}
              <span className="font-bold text-white bg-gray-800 px-3 py-1 rounded ml-2 border border-gray-700">
                427,272
              </span>
            </div>
            <div className="text-gray-400 text-sm">
              © {new Date().getFullYear()} National Health Mission. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}