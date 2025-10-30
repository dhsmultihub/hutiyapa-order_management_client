'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useOrderOperations } from '@/hooks/use-order-operations';
import { Address } from '@/types/order';
import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import { ArrowLeftIcon, PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

interface OrderItem {
  productId: string;
  variantId?: string;
  quantity: number;
  unitPrice: number;
}

export default function CreateOrderPage() {
  const router = useRouter();
  const { createOrder, isProcessing, error } = useOrderOperations();

  // Form state
  const [userId, setUserId] = useState('');
  const [items, setItems] = useState<OrderItem[]>([
    { productId: '', quantity: 1, unitPrice: 0 },
  ]);
  const [shippingAddress, setShippingAddress] = useState<Address>({
    firstName: '',
    lastName: '',
    address1: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    phone: '',
  });
  const [billingAddress, setBillingAddress] = useState<Address>({
    firstName: '',
    lastName: '',
    address1: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    phone: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [notes, setNotes] = useState('');
  const [useSameAddress, setUseSameAddress] = useState(true);

  const addItem = () => {
    setItems([...items, { productId: '', quantity: 1, unitPrice: 0 }]);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, field: keyof OrderItem, value: any) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const orderData = {
      userId,
      items: items.map((item) => ({
        productId: item.productId,
        variantId: item.variantId || undefined,
        quantity: Number(item.quantity),
        unitPrice: Number(item.unitPrice),
      })),
      shippingAddress,
      billingAddress: useSameAddress ? shippingAddress : billingAddress,
      paymentMethod,
      notes: notes || undefined,
    };

    await createOrder(orderData);
  };

  const calculateTotal = () => {
    return items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="mb-6">
        <Link href="/orders">
          <Button variant="ghost" className="mb-4">
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Back to Orders
          </Button>
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Create New Order</h1>
        <p className="text-gray-600 mt-1">Fill in the order details below</p>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Customer Information */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-4">Customer Information</h2>
          <Input
            label="Customer/User ID *"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
            placeholder="Enter customer ID"
          />
        </div>

        {/* Order Items */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Order Items</h2>
            <Button type="button" variant="outline" onClick={addItem}>
              <PlusIcon className="w-4 h-4 mr-2" />
              Add Item
            </Button>
          </div>
          <div className="space-y-4">
            {items.map((item, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="font-medium">Item {index + 1}</h3>
                  {items.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeItem(index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <XMarkIcon className="w-5 h-5" />
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Product ID *"
                    value={item.productId}
                    onChange={(e) => updateItem(index, 'productId', e.target.value)}
                    required
                    placeholder="Enter product ID"
                  />
                  <Input
                    label="Variant ID (Optional)"
                    value={item.variantId || ''}
                    onChange={(e) => updateItem(index, 'variantId', e.target.value)}
                    placeholder="Enter variant ID"
                  />
                  <Input
                    label="Quantity *"
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateItem(index, 'quantity', e.target.value)}
                    required
                  />
                  <Input
                    label="Unit Price *"
                    type="number"
                    min="0"
                    step="0.01"
                    value={item.unitPrice}
                    onChange={(e) => updateItem(index, 'unitPrice', e.target.value)}
                    required
                  />
                </div>
                <div className="mt-2 text-right">
                  <span className="text-sm text-gray-600">
                    Item Total: ${(item.quantity * item.unitPrice).toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200 text-right">
            <span className="text-lg font-semibold">
              Order Total: ${calculateTotal().toFixed(2)}
            </span>
          </div>
        </div>

        {/* Shipping Address */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="First Name *"
              value={shippingAddress.firstName}
              onChange={(e) =>
                setShippingAddress({ ...shippingAddress, firstName: e.target.value })
              }
              required
            />
            <Input
              label="Last Name *"
              value={shippingAddress.lastName}
              onChange={(e) =>
                setShippingAddress({ ...shippingAddress, lastName: e.target.value })
              }
              required
            />
            <div className="col-span-2">
              <Input
                label="Company (Optional)"
                value={shippingAddress.company || ''}
                onChange={(e) =>
                  setShippingAddress({ ...shippingAddress, company: e.target.value })
                }
              />
            </div>
            <div className="col-span-2">
              <Input
                label="Address Line 1 *"
                value={shippingAddress.address1}
                onChange={(e) =>
                  setShippingAddress({ ...shippingAddress, address1: e.target.value })
                }
                required
              />
            </div>
            <div className="col-span-2">
              <Input
                label="Address Line 2 (Optional)"
                value={shippingAddress.address2 || ''}
                onChange={(e) =>
                  setShippingAddress({ ...shippingAddress, address2: e.target.value })
                }
              />
            </div>
            <Input
              label="City *"
              value={shippingAddress.city}
              onChange={(e) =>
                setShippingAddress({ ...shippingAddress, city: e.target.value })
              }
              required
            />
            <Input
              label="State *"
              value={shippingAddress.state}
              onChange={(e) =>
                setShippingAddress({ ...shippingAddress, state: e.target.value })
              }
              required
            />
            <Input
              label="Postal Code *"
              value={shippingAddress.postalCode}
              onChange={(e) =>
                setShippingAddress({ ...shippingAddress, postalCode: e.target.value })
              }
              required
            />
            <Input
              label="Country *"
              value={shippingAddress.country}
              onChange={(e) =>
                setShippingAddress({ ...shippingAddress, country: e.target.value })
              }
              required
            />
            <div className="col-span-2">
              <Input
                label="Phone *"
                type="tel"
                value={shippingAddress.phone}
                onChange={(e) =>
                  setShippingAddress({ ...shippingAddress, phone: e.target.value })
                }
                required
              />
            </div>
          </div>
        </div>

        {/* Billing Address */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Billing Address</h2>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={useSameAddress}
                onChange={(e) => setUseSameAddress(e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm">Same as shipping address</span>
            </label>
          </div>
          {!useSameAddress && (
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="First Name *"
                value={billingAddress.firstName}
                onChange={(e) =>
                  setBillingAddress({ ...billingAddress, firstName: e.target.value })
                }
                required={!useSameAddress}
              />
              <Input
                label="Last Name *"
                value={billingAddress.lastName}
                onChange={(e) =>
                  setBillingAddress({ ...billingAddress, lastName: e.target.value })
                }
                required={!useSameAddress}
              />
              <div className="col-span-2">
                <Input
                  label="Address Line 1 *"
                  value={billingAddress.address1}
                  onChange={(e) =>
                    setBillingAddress({ ...billingAddress, address1: e.target.value })
                  }
                  required={!useSameAddress}
                />
              </div>
              <Input
                label="City *"
                value={billingAddress.city}
                onChange={(e) =>
                  setBillingAddress({ ...billingAddress, city: e.target.value })
                }
                required={!useSameAddress}
              />
              <Input
                label="State *"
                value={billingAddress.state}
                onChange={(e) =>
                  setBillingAddress({ ...billingAddress, state: e.target.value })
                }
                required={!useSameAddress}
              />
              <Input
                label="Postal Code *"
                value={billingAddress.postalCode}
                onChange={(e) =>
                  setBillingAddress({ ...billingAddress, postalCode: e.target.value })
                }
                required={!useSameAddress}
              />
              <Input
                label="Country *"
                value={billingAddress.country}
                onChange={(e) =>
                  setBillingAddress({ ...billingAddress, country: e.target.value })
                }
                required={!useSameAddress}
              />
              <div className="col-span-2">
                <Input
                  label="Phone *"
                  type="tel"
                  value={billingAddress.phone}
                  onChange={(e) =>
                    setBillingAddress({ ...billingAddress, phone: e.target.value })
                  }
                  required={!useSameAddress}
                />
              </div>
            </div>
          )}
        </div>

        {/* Payment & Notes */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-4">Payment & Additional Info</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Payment Method *
              </label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              >
                <option value="credit_card">Credit Card</option>
                <option value="debit_card">Debit Card</option>
                <option value="upi">UPI</option>
                <option value="net_banking">Net Banking</option>
                <option value="wallet">Wallet</option>
                <option value="cash_on_delivery">Cash on Delivery</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Order Notes (Optional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Add any special instructions or notes..."
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={isProcessing}
          >
            Cancel
          </Button>
          <Button type="submit" variant="default" loading={isProcessing}>
            Create Order
          </Button>
        </div>
      </form>
    </div>
  );
}

