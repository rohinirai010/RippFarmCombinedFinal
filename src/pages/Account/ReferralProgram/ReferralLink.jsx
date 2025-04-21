import React from 'react';
import { Dialog, Transition } from "@headlessui/react";
import { Gift, ChevronRight } from 'lucide-react';
import 'react-toastify/dist/ReactToastify.css';

const ReferralLink = ({ isOpen, setIsOpen, referralLink = "https://your-referral-link.com" }) => {
  // Copy referral link to clipboard
  const copyReferralLink = () => {
    navigator.clipboard.writeText(referralLink).then(() => {
        showNotification("Referral link copied to clipboard!");
    });
  };

  // Mock function for notification system
  const showNotification = (message) => {
    const notification = document.createElement("div");
    notification.className =
      "fixed top-10 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white py-2 px-2 sm:px-4 rounded-lg shadow-lg z-50";
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.classList.add(
        "opacity-0",
        "transition-opacity",
        "duration-300"
      );
      setTimeout(() => document.body.removeChild(notification), 300);
    }, 2000);
  };

  return (
    <Transition appear show={isOpen} as={React.Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={() => setIsOpen(false)}
      >
        <Transition.Child
          as={React.Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed max-w-xl mx-auto inset-0 bg-black/10 backdrop-blur-xs" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white bg-gradient-to-b from-[#000621] via-[#0a0e2e] to-[#141539] opacity-90 px-3 sm:px-6 py-4 sm:py-6 text-left align-middle shadow-xl transition-all border border-gray-100 dark:border-gray-700">
                <div className="absolute right-4 top-4">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
                  >
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                <div className="w-14 h-14 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Gift className="h-7 w-7 text-indigo-600 dark:text-indigo-400" />
                </div>

                <Dialog.Title
                  as="h3"
                  className="text-xl font-semibold leading-6 text-center text-gray-900 dark:text-white mb-2"
                >
                  Refer a Friend
                </Dialog.Title>

                <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-6">
                  Share your personal referral link and earn rewards for each
                  successful referral!
                </p>

                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Your Personal Referral Link:
                  </p>
                  <div className="flex items-center">
                    <input
                      type="text"
                      value={referralLink}
                      readOnly
                      className="flex-1 px-4 py-2 sm:py-3 text-sm border border-gray-200 rounded-l-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                    <button
                      onClick={copyReferralLink}
                      className="px-4 py-2 sm:py-3 bg-indigo-500 text-white rounded-r-lg hover:bg-indigo-600 focus:ring-2 focus:ring-indigo-300 transition-colors"
                    >
                      Copy
                    </button>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-2">
                    <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mr-3">
                      <span className="text-green-600 dark:text-green-400 font-bold">
                        1
                      </span>
                    </div>
                    Share your referral link with friends
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-2">
                    <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3">
                      <span className="text-blue-600 dark:text-blue-400 font-bold">
                        2
                      </span>
                    </div>
                    They sign up using your link
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center mr-3">
                      <span className="text-purple-600 dark:text-purple-400 font-bold">
                        3
                      </span>
                    </div>
                    You both earn rewards!
                  </div>
                </div>

                <div className="mt-4 flex justify-center">
                  <button
                    type="button"
                    className="flex flex-row items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-400 text-white rounded-2xl font-bold button-glow shadow-lg hover:shadow-xl transform hover:scale-105"
                    onClick={() => setIsOpen(false)}
                  >
                    Start Sharing
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ReferralLink;