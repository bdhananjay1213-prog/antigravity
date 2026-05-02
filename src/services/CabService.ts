export interface CabOption {
    type: 'RedTaxi Mini' | 'RedTaxi Sedan' | 'RedTaxi SUV'
    eta: string
    price: string
    image: string
    capacity: string
}

export const getAvailableCabs = (): CabOption[] => {
    // Simulate API delay and availability
    return [
        {
            type: 'RedTaxi Mini',
            eta: '4 mins',
            price: '₹350 - ₹400',
            capacity: '4 seats',
            image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400'
        },
        {
            type: 'RedTaxi Sedan',
            eta: '8 mins',
            price: '₹450 - ₹520',
            capacity: '4 seats',
            image: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?w=400'
        },
        {
            type: 'RedTaxi SUV',
            eta: '12 mins',
            price: '₹750 - ₹900',
            capacity: '6 seats',
            image: 'https://images.unsplash.com/photo-1503376763036-066120622c74?w=400'
        }
    ]
}
