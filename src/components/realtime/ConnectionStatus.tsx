'use client';

import { useWebSocket } from '@/hooks/use-websocket';
import { SignalIcon, SignalSlashIcon } from '@heroicons/react/24/outline';

interface ConnectionStatusProps {
    showLabel?: boolean;
    className?: string;
}

export default function ConnectionStatus({
    showLabel = true,
    className = ''
}: ConnectionStatusProps) {
    const { isConnected } = useWebSocket();

    return (
        <div className={`flex items-center ${className}`}>
            {isConnected ? (
                <>
                    <span className="relative flex h-3 w-3 mr-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                    {showLabel && (
                        <span className="text-sm text-green-600 font-medium">Live</span>
                    )}
                </>
            ) : (
                <>
                    <SignalSlashIcon className="w-4 h-4 text-gray-400 mr-2" />
                    {showLabel && (
                        <span className="text-sm text-gray-500">Offline</span>
                    )}
                </>
            )}
        </div>
    );
}

