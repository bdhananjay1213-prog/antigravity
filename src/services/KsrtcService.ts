export interface KsrtcBus {
    type: 'Super Fast' | 'Swift Deluxe' | 'Low Floor AC' | 'Minnal'
    departure: string
    arrival: string
    duration: string
    price: string
    seatsAvailable: number
    platform: string
}

export const getKsrtcSchedules = (): KsrtcBus[] => {
    // Simulate different bus types and timings
    return [
        {
            type: 'Super Fast',
            departure: '06:30 AM',
            arrival: '09:45 AM',
            duration: '3h 15m',
            price: '₹220',
            seatsAvailable: 12,
            platform: 'PF-4'
        },
        {
            type: 'Swift Deluxe',
            departure: '07:15 AM',
            arrival: '10:15 AM',
            duration: '3h 00m',
            price: '₹280',
            seatsAvailable: 8,
            platform: 'PF-2'
        },
        {
            type: 'Low Floor AC',
            departure: '08:00 AM',
            arrival: '11:00 AM',
            duration: '3h 00m',
            price: '₹350',
            seatsAvailable: 24,
            platform: 'PF-1'
        },
        {
            type: 'Minnal',
            departure: '09:30 AM',
            arrival: '12:00 PM',
            duration: '2h 30m',
            price: '₹410',
            seatsAvailable: 5,
            platform: 'PF-5'
        }
    ]
}
