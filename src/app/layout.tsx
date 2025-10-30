import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Providers } from './providers';
import OrderNotifications from '@/components/realtime/OrderNotifications';
import MobileNavigation from '@/components/mobile/MobileNavigation';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Order Management System',
    description: 'Enterprise-grade order management microservice with real-time tracking, payment processing, and fulfillment management',
    keywords: ['order management', 'e-commerce', 'fulfillment', 'payment processing'],
    authors: [{ name: 'Order Management Team' }],
};

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    themeColor: '#3b82f6',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Providers>
                    <div className="flex flex-col min-h-screen pb-16 md:pb-0">
                        <Header />
                        <main className="flex-1 bg-gray-50">
                            {children}
                        </main>
                        <Footer />
                        <MobileNavigation />
                    </div>
                    <OrderNotifications />
                </Providers>
            </body>
        </html>
    );
}
