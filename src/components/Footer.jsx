import React from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";

function Footer() {
  return (
    <section className="relative overflow-hidden py-10 bg-[#00afb9] border-t border-t-black">
      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div className="-m-6 flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 flex justify-center items-center">
            <div className="w-full p-6">
              <div className="flex h-full flex-col justify-between">
                <div className="mb-4 inline-flex items-center">
                  <Logo width="150px" />
                </div>
                <div>
                  <p className="text-sm text-gray-900 w-full">
                    &copy; Copyright 2024. All Rights Reserved by Aryan.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between w-full">
            <div className="w-full p-6 md:w-1/2 lg:w-2/12">
              <div className="h-full">
                <h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-gray-900">
                  Company
                </h3>
                <ul>
                  <li className="mb-4">
                    <Link
                      className="text-sm md:text-base font-medium text-gray-700 hover:text-gray-600"
                      to="/"
                    >
                      Features
                    </Link>
                  </li>
                  <li className="mb-4">
                    <Link
                      className="text-sm md:text-base font-medium text-gray-700 hover:text-gray-600"
                      to="/"
                    >
                      Pricing
                    </Link>
                  </li>
                  {/* <li className="mb-4">
                    <Link
                      className="text-sm md:text-base font-medium text-gray-700 hover:text-gray-600"
                      to="/"
                    >
                      Affiliate Program
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-sm md:text-base font-medium text-gray-700 hover:text-gray-600"
                      to="/"
                    >
                      Press Kit
                    </Link>
                  </li> */}
                </ul>
              </div>
            </div>
            <div className="w-full p-6 md:w-1/2 lg:w-2/12">
              <div className="h-full">
                <h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-gray-900">
                  Support
                </h3>
                <ul>
                  {/* <li className="mb-4">
                    <Link
                      className="text-sm md:text-base font-medium text-gray-700 hover:text-gray-600"
                      to="/"
                    >
                      Account
                    </Link>
                  </li>
                  <li className="mb-4">
                    <Link
                      className="text-sm md:text-base font-medium text-gray-700 hover:text-gray-600"
                      to="/"
                    >
                      Help
                    </Link>
                  </li> */}
                  <li className="mb-4">
                    <Link
                      className="text-sm md:text-base font-medium text-gray-700 hover:text-gray-600"
                      to="/"
                    >
                      Contact Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-sm md:text-base font-medium text-gray-700 hover:text-gray-600"
                      to="/"
                    >
                      Customer Support
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="w-full p-6 md:w-1/2 lg:w-3/12">
              <div className="h-full">
                <h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-gray-900">
                  Legals
                </h3>
                <ul>
                  <li className="mb-4">
                    <Link
                      className="text-sm md:text-base font-medium text-gray-700 hover:text-gray-600"
                      to="/"
                    >
                      Terms &amp; Conditions
                    </Link>
                  </li>
                  <li className="mb-4">
                    <Link
                      className="text-sm md:text-base font-medium text-gray-700 hover:text-gray-600"
                      to="/"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                  {/* <li>
                    <Link
                      className="text-sm md:text-base font-medium text-gray-700 hover:text-gray-600"
                      to="/"
                    >
                      Licensing
                    </Link>
                  </li> */}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Footer;
