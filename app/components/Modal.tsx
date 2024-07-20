import * as Dialog from '@radix-ui/react-dialog';
import React from 'react';
import { X } from 'lucide-react';

interface ModalProps {
    isOpen: boolean;
    onChange: (open: boolean) => void;
    title: string;
    description: string;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
    isOpen,
    onChange,
    title,
    description,
    children
}) => {
    return (
        <Dialog.Root open={isOpen} onOpenChange={onChange}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 z-[9999] bg-black bg-opacity-70 backdrop-blur-sm transition-all duration-300" />
                <Dialog.Content className="fixed inset-0 z-[10000] overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
                        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                            <div className="bg-gray-900 px-4 pb-4 pt-5 sm:p-6">
                                <div className="absolute top-0 right-0 pt-4 pr-4">
                                    <Dialog.Close asChild>
                                        <button
                                            className="rounded-md bg-transparent text-gray-400 hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                            aria-label="Close"
                                        >
                                            <X className="h-6 w-6" />
                                        </button>
                                    </Dialog.Close>
                                </div>
                                <Dialog.Title className="text-xl font-semibold leading-6 text-white mb-2">
                                    {title}
                                </Dialog.Title>
                                <Dialog.Description className="text-sm text-gray-300 mb-4">
                                    {description}
                                </Dialog.Description>
                                {children}
                            </div>
                        </div>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}

export default Modal;