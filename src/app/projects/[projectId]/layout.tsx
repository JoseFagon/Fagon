'use client';

import { useRouter } from 'next/navigation';
import { MoreVerticalIcon } from 'lucide-react';
import { AdminDropdownMenu } from '@/components/dropdownMenus/AdminDropdownMenu';
import { Header } from '@/components/layout/Header';

export default function ProjectLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();

    const handleBack = () => {
        router.back();
    };

    return (
        <div className="w-full">
            <Header
                type="backMenu"
                onBack={handleBack}
                dropdownMenu={
                    <AdminDropdownMenu
                        trigger={
                            <button
                                className="hover:bg-gray-500/10 p-2 rounded-full transition-all duration-200"
                                aria-label="Menu de opções"
                            >
                                <MoreVerticalIcon className="w-6 h-6" />
                            </button>
                        }
                        projectId={'123'}
                    />
                }
            />
            {children}
        </div>
    );
}
