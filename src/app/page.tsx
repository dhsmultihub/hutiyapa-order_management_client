import Link from 'next/link';
import {
    ShoppingBagIcon,
    CreditCardIcon,
    TruckIcon,
    ChartBarIcon
} from '@heroicons/react/24/outline';

export default function HomePage() {
    return (
        <div className="container mx-auto px-4 py-12">
            {/* Hero Section */}
            <div className="text-center mb-16">
                <h1 className="text-5xl font-bold text-gray-900 mb-4">
                    Order Management System
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Enterprise-grade order management with real-time tracking,
                    payment processing, and comprehensive fulfillment management
                </p>
            </div>

            {/* Feature Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                <FeatureCard
                    icon={<ShoppingBagIcon className="w-12 h-12 text-blue-600" />}
                    title="Order Management"
                    description="Complete order lifecycle management with real-time status tracking"
                    link="/orders"
                />
                <FeatureCard
                    icon={<CreditCardIcon className="w-12 h-12 text-green-600" />}
                    title="Payment Processing"
                    description="Secure payment processing with multiple gateway support"
                    link="/orders"
                />
                <FeatureCard
                    icon={<TruckIcon className="w-12 h-12 text-purple-600" />}
                    title="Shipment Tracking"
                    description="Real-time shipment tracking with carrier integration"
                    link="/orders"
                />
                <FeatureCard
                    icon={<ChartBarIcon className="w-12 h-12 text-orange-600" />}
                    title="Analytics"
                    description="Comprehensive order analytics and business insights"
                    link="/orders"
                />
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-lg shadow-md p-8 mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                    Quick Overview
                </h2>
                <div className="grid md:grid-cols-4 gap-8">
                    <StatCard label="Total Orders" value="0" color="blue" />
                    <StatCard label="Active Orders" value="0" color="green" />
                    <StatCard label="Pending Payments" value="0" color="yellow" />
                    <StatCard label="In Transit" value="0" color="purple" />
                </div>
            </div>

            {/* CTA Section */}
            <div className="text-center">
                <Link
                    href="/orders"
                    className="inline-flex items-center px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                >
                    View All Orders
                    <ShoppingBagIcon className="w-6 h-6 ml-2" />
                </Link>
            </div>
        </div>
    );
}

function FeatureCard({
    icon,
    title,
    description,
    link
}: {
    icon: React.ReactNode;
    title: string;
    description: string;
    link: string;
}) {
    return (
        <Link href={link}>
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow cursor-pointer">
                <div className="flex justify-center mb-4">{icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">
                    {title}
                </h3>
                <p className="text-gray-600 text-center">{description}</p>
            </div>
        </Link>
    );
}

function StatCard({
    label,
    value,
    color
}: {
    label: string;
    value: string;
    color: 'blue' | 'green' | 'yellow' | 'purple';
}) {
    const colorClasses = {
        blue: 'text-blue-600',
        green: 'text-green-600',
        yellow: 'text-yellow-600',
        purple: 'text-purple-600',
    };

    return (
        <div className="text-center">
            <p className={`text-4xl font-bold ${colorClasses[color]} mb-2`}>
                {value}
            </p>
            <p className="text-gray-600">{label}</p>
        </div>
    );
}

