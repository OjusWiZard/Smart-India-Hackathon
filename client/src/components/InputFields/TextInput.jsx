import React from "react";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";

const TextInput = ({ label = "", placeholder = "", menuItems = [] }) => {
  return (
    <div>
      <label class="block">
        <span class="block text-base font-regular text-primary-grey">
          {label}
        </span>
        {menuItems.length > 0 ? (
          <div className="flex justify-around items-center">
            <div className="w-[45%]">
              <Menu as="div" className="relative w-full inline-block text-left">
                <div>
                  <Menu.Button className="text-[#828282] border inline-flex justify-center w-full px-4 py-5 text-sm font-normal bg-white rounded-md  hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                    +91
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute border border-primary-light rounded-lg right-0 w-full mt-2 origin-top-right bg-white divide-y divide-gray-100 focus:outline-none">
                    <div className="">
                      {menuItems.map((item) => (
                        <Menu.Item key={item.text}>
                          {({ active }) => (
                            <button
                              className={`${
                                active
                                  ? "bg-primary-extra-light"
                                  : "text-gray-900"
                              } group flex rounded-md items-center w-full px-9 pt-8 pb-6 text-sm`}
                            >
                              {item.text}
                            </button>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>

            <input
              type="text"
              placeholder={placeholder}
              class="mt-2 block w-full font-regular px-5 py-4 bg-white border border-secondary-border rounded-md text-sm shadow-sm placeholder-secondary-placeholder
          focus:outline-none"
            />
          </div>
        ) : (
          <input
            type="text"
            placeholder={placeholder}
            class="mt-2 block w-full font-regular px-5 py-4 bg-white border border-secondary-border rounded-md text-sm shadow-sm placeholder-secondary-placeholder
          focus:outline-none
        "
          />
        )}
      </label>
    </div>
  );
};

export default TextInput;
