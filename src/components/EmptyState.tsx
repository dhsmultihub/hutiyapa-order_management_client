import Link from 'next/link';
import { InboxIcon } from '@heroicons/react/24/outline';

interface EmptyStateProps {
    title: string;
    description: string;
    actionLabel?: string;
    actionHref?: string;
}

export default function EmptyState({
    title,
    description,
    actionLabel,
    actionHref
}: EmptyStateProps) {
    return (
        <div className="text-center py-12">
            <InboxIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">{title}</h3>
            <p className="mt-1 text-sm text-gray-500">{description}</p>
            {actionLabel && actionHref && (
                <div className="mt-6">
                    <Link
                        href={actionHref}
                        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        {actionLabel}
                    </Link>
                </div>
            )}
        </div>
    );
}

