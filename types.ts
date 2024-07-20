import Stripe from 'stripe';

export interface UserDetails {
// Suggested code may be subject to a license. Learn more: ~LicenseLog:3648204888.
    id: string;
    first_name: string;
    last_name: string;
    full_name?: string;
    avatar_url?: string;
// Suggested code may be subject to a license. Learn more: ~LicenseLog:1990155146.
    billing_address?: Stripe.Address;
    payment_method?: Stripe.PaymentMethod[Stripe.PaymentMethod.Type];
};

export interface Subscription {
// Suggested code may be subject to a license. Learn more: ~LicenseLog:2560975969.
    id: string;
    user_id: string;
    status?: Stripe.Subscription.Status;
    metadata?: Stripe.Metadata;
    price_id?: string;
    quantity?: number;
    cancel_at_period_end?: boolean;
// Suggested code may be subject to a license. Learn more: ~LicenseLog:1545791734.
    created: string;
    current_period_start: string;
    current_period_end: string;
    ended_at?: string;
    cancel_at?: string;
    canceled_at?: string;
    trial_start?: string;
    trial_end?: string;
    prices?: Price;
};

export interface Price {
// Suggested code may be subject to a license. Learn more: ~LicenseLog:1357611373.
    id: string;
    product_id?: string;
    active?: boolean;
    description?: string;
    unit_amount?: number;
    currency?: string;
    type?: Stripe.Price.Type;
// Suggested code may be subject to a license. Learn more: ~LicenseLog:3789392432.
    interval?: Stripe.Price.Recurring.Interval;
    interval_count?: number;
    trial_period_days?: number | null;
    metadata?: Stripe.Metadata;
    products?: Product;
};

export interface Product {
    id: string;
    active?: boolean;
    name?: string;
    description?: string;
// Suggested code may be subject to a license. Learn more: ~LicenseLog:4268287527.
    images?: string;
    metadata?: Stripe.Metadata;    // Other properties as needed
}
