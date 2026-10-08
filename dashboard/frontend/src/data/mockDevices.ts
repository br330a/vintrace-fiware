import type { Device } from '../types/device'

export const mockDevices: Device[] = [
  {
    id: 'vintrace001',
    name: 'Adega Principal',
    location: 'Vinheria Agnello',
    online: true,
    temperature: 16.8,
    humidity: 68,
    luminosity: 12,
  },
  {
    id: 'vintrace002',
    name: 'Adega Reserva',
    location: 'Estoque',
    online: false,
    temperature: 19.6,
    humidity: 84,
    luminosity: 7,
  },
]