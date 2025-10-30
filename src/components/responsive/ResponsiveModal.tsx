'use client';

import { Fragment, ReactNode } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useResponsive } from '@/hooks/use-responsive';

interface ResponsiveModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
    footer?: ReactNode;
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
    mobileFullScreen?: boolean;
}

export default function ResponsiveModal({
    isOpen,
    onClose,
    title,
    children,
    footer,
    size = 'md',
    mobileFullScreen = true,
}: ResponsiveModalProps) {
    const { isMobile } = useResponsive();

    const sizeClasses = {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl',
        full: 'max-w-full',
    };

    const modalClass = isMobile && mobileFullScreen
        ? 'fixed inset-0 w-full h-full rounded-none'
        : `relative w-full ${sizeClasses[size]} mx-auto rounded-lg`;

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                {/* Backdrop */}
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                {/* Modal Container */}
                <div className="fixed inset-0 overflow-y-auto">
                    <div className={`${isMobile && mobileFullScreen ? '' : 'flex min-h-full items-center justify-center p-4'}`}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom={isMobile ? 'translate-y-full' : 'opacity-0 scale-95'}
                            enterTo={isMobile ? 'translate-y-0' : 'opacity-100 scale-100'}
                            leave="ease-in duration-200"
                            leaveFrom={isMobile ? 'translate-y-0' : 'opacity-100 scale-100'}
                            leaveTo={isMobile ? 'translate-y-full' : 'opacity-0 scale-95'}
                        >
                            <Dialog.Panel className={`${modalClass} bg-white shadow-xl transform transition-all flex flex-col`}>
                                {/* Header */}
                                <div className="flex items-center justify-between p-4 border-b border-gray-200 flex-shrink-0">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-semibold text-gray-900"
                                    >
                                        {title}
                                    </Dialog.Title>
                                    <button
                                        type="button"
                                        className="text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg p-1"
                                        onClick={onClose}
                                    >
                                        <XMarkIcon className="h-6 w-6" />
                                    </button>
                                </div>

                                {/* Content */}
                                <div className="flex-1 overflow-y-auto p-4">
                                    {children}
                                </div>

                                {/* Footer */}
                                {footer && (
                                    <div className="border-t border-gray-200 p-4 flex-shrink-0">
                                        {footer}
                                    </div>
                                )}
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}

