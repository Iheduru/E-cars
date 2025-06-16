// src/data/dealers.ts
export interface Dealer {
  id: string;
  name: string;
  location: string;
  address: string;
  phone: string;
  brands: string[];
  rating: number;
  imageUrl: string;
  type: 'new' | 'used' | 'certified' | 'all';
}

export const featuredDealers: Dealer[] = [
  {
    id: '1',
    name: 'Auto Elite Motors',
    location: 'New York, NY',
    address: '123 Luxury Ave, New York, NY 10001',
    phone: '(212) 555-1234',
    brands: ['BMW', 'Mercedes', 'Audi'],
    rating: 4.8,
    imageUrl: 'https://images.pexels.com/photos/4482900/pexels-photo-4482900.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    type: 'new',
  },
  {
    id: '2',
    name: 'Sunrise Auto Group',
    location: 'Los Angeles, CA',
    address: '456 Sunshine Blvd, Los Angeles, CA 90001',
    phone: '(213) 555-5678',
    brands: ['Toyota', 'Honda', 'Subaru'],
    rating: 4.6,
    imageUrl: 'https://images.pexels.com/photos/4482903/pexels-photo-4482903.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    type: 'used',
  },
  {
    id: '3',
    name: 'Prestige Auto Sales',
    location: 'Chicago, IL',
    address: '789 Premium St, Chicago, IL 60601',
    phone: '(312) 555-9012',
    brands: ['Porsche', 'Jaguar', 'Land Rover'],
    rating: 4.9,
    imageUrl: 'https://images.pexels.com/photos/4482905/pexels-photo-4482905.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    type: 'certified',
  },
  {
    id: '4',
    name: 'Family Auto Mart',
    location: 'Houston, TX',
    address: '101 Main Street, Houston, TX 77001',
    phone: '(713) 555-3456',
    brands: ['Ford', 'Chevrolet', 'Dodge'],
    rating: 4.5,
    imageUrl: 'https://images.pexels.com/photos/4482906/pexels-photo-4482906.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    type: 'all',
  },
  {
    id: '5',
    name: 'Coastal Auto Gallery',
    location: 'Miami, FL',
    address: '202 Ocean Drive, Miami, FL 33101',
    phone: '(305) 555-7890',
    brands: ['Tesla', 'Lexus', 'Volvo'],
    rating: 4.7,
    imageUrl: 'https://images.pexels.com/photos/4482907/pexels-photo-4482907.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    type: 'new',
  },
  {
    id: '6',
    name: 'Metro Auto Center',
    location: 'Seattle, WA',
    address: '303 Rainier Ave, Seattle, WA 98101',
    phone: '(206) 555-2345',
    brands: ['Hyundai', 'Kia', 'Mazda'],
    rating: 4.4,
    imageUrl: 'https://images.pexels.com/photos/4482908/pexels-photo-4482908.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    type: 'used',
  },
];