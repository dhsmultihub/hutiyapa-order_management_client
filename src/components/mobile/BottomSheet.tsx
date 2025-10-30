'use client';

import { Fragment, ReactNode, useRef, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface BottomSheetProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: ReactNode;
    height?: 'auto' | 'half' | 'full';
}

export default function BottomSheet({
    isOpen,
    onClose,
    title,
    children,
    height = 'auto',
}: BottomSheetProps) {
    const initialY = useRef(0);
    const currentY = useRef(0);
    const isDragging = useRef(false);

    const heightClasses = {
        auto: 'max-h-[90vh]',
        half: 'h-[50vh]',
        full: 'h-[90vh]',
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        isDragging.current = true;
        initialY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!isDragging.current) return;
        currentY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = () => {
        if (!isDragging.current) return;

        const deltaY = currentY.current - initialY.current;

        // If dragged down more than 100px, close the sheet
        if (deltaY > 100) {
            onClose();
        }

        isDragging.current = false;
        initialY.current = 0;
        currentY.current = 0;
    };

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
                    <div className="fixed inset-0 bg-black bg-opacity-25" onClick={onClose} />
                </Transition.Child>

                {/* Bottom Sheet */}
                <div className="fixed inset-0 pointer-events-none flex items-end">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="translate-y-full"
                        enterTo="translate-y-0"
                        leave="ease-in duration-200"
                        leaveFrom="translate-y-0"
                        leaveTo="translate-y-full"
                    >
                        <Dialog.Panel
                            className={`w-full bg-white rounded-t-2xl shadow-xl pointer-events-auto ${heightClasses[height]} flex flex-col`}
                            onTouchStart={handleTouchStart}
                            onTouchMove={handleTouchMove}
                            onTouchEnd={handleTouchEnd}
                        >
                            {/* Drag Handle */}
                            <div className="flex justify-center pt-3 pb-2 flex-shrink-0">
                                <div className="w-12 h-1 bg-gray-300 rounded-full" />
                            </div>

                            {/* Header */}
                            {title && (
                                <div className="flex items-center justify-between px-4 pb-3 border-b border-gray-200 flex-shrink-0">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-semibold text-gray-900"
                                    >
                                        {title}
                                    </Dialog.Title>
                                    <button
                                        type="button"
                                        className="text-gray-400 hover:text-gray-500 focus:outline-none"
                                        onClick={onClose}
                                    >
                                        <XMarkIcon className="h-6 w-6" />
                                    </button>
                                </div>
                            )}

                            {/* Content */}
                            <div className="flex-1 overflow-y-auto p-4">
                                {children}
                            </div>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    );
}

