export interface Train {
    name: string
    number: string
    departure: string
    arrival: string
    duration: string
    status: 'On Time' | 'Late' | 'Rescheduled'
    delay?: string
    platform: string
}

export const getTrainSchedules = (_origin: string, _destination: string): Train[] => {
    // In a real app, we would use origin/destination to fetch specific trains.
    // For simulation, we return a list of popular Kerala trains.
    return [
        {
            name: 'Vande Bharat Express',
            number: '20634',
            departure: '06:00 AM',
            arrival: '09:05 AM',
            duration: '3h 05m',
            status: 'On Time',
            platform: 'PF-1'
        },
        {
            name: 'Jan Shatabdi Express',
            number: '12075',
            departure: '09:45 AM',
            arrival: '01:20 PM',
            duration: '3h 35m',
            status: 'On Time',
            platform: 'PF-2'
        },
        {
            name: 'Parasuram Express',
            number: '16649',
            departure: '10:30 AM',
            arrival: '02:45 PM',
            duration: '4h 15m',
            status: 'Late',
            delay: '15 mins',
            platform: 'PF-3'
        },
        {
            name: 'Venad Express',
            number: '16301',
            departure: '07:15 AM',
            arrival: '11:45 AM',
            duration: '4h 30m',
            status: 'On Time',
            platform: 'PF-4'
        },
        {
            name: 'Netravati Express',
            number: '16346',
            departure: '02:00 PM',
            arrival: '06:10 PM',
            duration: '4h 10m',
            status: 'Late',
            delay: '45 mins',
            platform: 'PF-2'
        }
    ]
}
