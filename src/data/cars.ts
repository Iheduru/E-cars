// src/data/cars.ts
import { CarData } from '../components/car/CarCard';

export const mockInventory: Record<string, CarData[]> = {
  '1': [ // Auto Elite Motors inventory (BMW, Mercedes, Audi)
    {
      id: '101',
      title: '2023 BMW 530i xDrive',
      price: 58900,
      year: 2023,
      mileage: 5000,
      fuelType: 'Gasoline',
      location: 'New York, NY',
      imageUrl: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg',
      features: ['Leather Seats', 'Navigation', 'Heated Seats', 'Apple CarPlay', 'Parking Assistant'],
      dealerId: '1',
      isFeatured: true,
      rating: 4.8
    },
    {
      id: '102',
      title: '2022 Mercedes-Benz E 350',
      price: 62900,
      year: 2022,
      mileage: 12000,
      fuelType: 'Hybrid',
      location: 'New York, NY',
      imageUrl: 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg',
      features: ['Panoramic Roof', 'Premium Sound', 'Driver Assistance', 'Ambient Lighting'],
      dealerId: '1',
      isFeatured: true,
      rating: 4.7
    },
    {
      id: '103',
      title: '2021 Audi A6 Premium Plus',
      price: 48900,
      year: 2021,
      mileage: 18000,
      fuelType: 'Gasoline',
      location: 'New York, NY',
      imageUrl: 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg',
      features: ['Virtual Cockpit', 'B&O Sound System', 'Quattro AWD', 'Heated Steering Wheel'],
      dealerId: '1',
      rating: 4.6
    },
    {
      id: '104',
      title: '2023 BMW X7 M50i',
      price: 102500,
      year: 2023,
      mileage: 3500,
      fuelType: 'Gasoline',
      location: 'New York, NY',
      imageUrl: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg',
      features: ['Third Row Seating', 'Luxury Seating Package', 'Executive Package', 'Night Vision'],
      dealerId: '1',
      isFeatured: true,
      rating: 4.9
    },
    {
      id: '105',
      title: '2020 Mercedes-AMG GT 53',
      price: 87900,
      year: 2020,
      mileage: 22000,
      fuelType: 'Hybrid',
      location: 'New York, NY',
      imageUrl: 'https://images.pexels.com/photos/2676447/pexels-photo-2676447.jpeg',
      features: ['AMG Performance', 'Carbon Fiber Trim', 'Air Suspension', 'Track Package'],
      dealerId: '1',
      rating: 4.8
    }
  ],
  '2': [ // Sunrise Auto Group inventory (Toyota, Honda, Subaru)
    {
      id: '201',
      title: '2023 Toyota Camry XSE',
      price: 32500,
      year: 2023,
      mileage: 8000,
      fuelType: 'Hybrid',
      location: 'Los Angeles, CA',
      imageUrl: 'https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg',
      features: ['JBL Audio', 'Heated Seats', 'Wireless Charging', 'Toyota Safety Sense'],
      dealerId: '2',
      isFeatured: true,
      rating: 4.5
    },
    {
      id: '202',
      title: '2022 Honda Accord Touring',
      price: 34900,
      year: 2022,
      mileage: 15000,
      fuelType: 'Gasoline',
      location: 'Los Angeles, CA',
      imageUrl: 'https://images.pexels.com/photos/6479566/pexels-photo-6479566.jpeg',
      features: ['Leather Interior', 'Heated/Cooled Seats', 'Honda Sensing', '12-speaker Audio'],
      dealerId: '2',
      rating: 4.4
    },
    {
      id: '203',
      title: '2021 Subaru Outback Limited',
      price: 31900,
      year: 2021,
      mileage: 24000,
      fuelType: 'Gasoline',
      location: 'Los Angeles, CA',
      imageUrl: 'https://images.pexels.com/photos/9592962/pexels-photo-9592962.jpeg',
      features: ['EyeSight Safety', 'All-Weather Package', 'Harman Kardon Audio', 'X-Mode'],
      dealerId: '2',
      isFeatured: true,
      rating: 4.6
    },
    {
      id: '204',
      title: '2023 Toyota RAV4 Prime',
      price: 42900,
      year: 2023,
      mileage: 5000,
      fuelType: 'Plug-in Hybrid',
      location: 'Los Angeles, CA',
      imageUrl: 'https://images.pexels.com/photos/6264412/pexels-photo-6264412.jpeg',
      features: ['EV Mode', 'Premium Package', 'Panoramic Moonroof', 'Digital Rearview Mirror'],
      dealerId: '2',
      rating: 4.7
    }
  ],
  '3': [ // Prestige Auto Sales inventory (Porsche, Jaguar, Land Rover)
    {
      id: '301',
      title: '2022 Porsche 911 Carrera S',
      price: 125900,
      year: 2022,
      mileage: 8000,
      fuelType: 'Gasoline',
      location: 'Chicago, IL',
      imageUrl: 'https://images.pexels.com/photos/2127733/pexels-photo-2127733.jpeg',
      features: ['Sport Chrono', 'Bose Audio', 'PDK Transmission', 'Sports Exhaust'],
      dealerId: '3',
      isFeatured: true,
      rating: 4.9
    },
    {
      id: '302',
      title: '2021 Jaguar F-Type R',
      price: 78900,
      year: 2021,
      mileage: 12000,
      fuelType: 'Gasoline',
      location: 'Chicago, IL',
      imageUrl: 'https://images.pexels.com/photos/112452/pexels-photo-112452.jpeg',
      features: ['Supercharged V8', 'Meridian Audio', 'Performance Seats', 'Dynamic Mode'],
      dealerId: '3',
      rating: 4.7
    },
    {
      id: '303',
      title: '2023 Land Rover Defender 110',
      price: 68900,
      year: 2023,
      mileage: 5000,
      fuelType: 'Gasoline',
      location: 'Chicago, IL',
      imageUrl: 'https://images.pexels.com/photos/544542/pexels-photo-544542.jpeg',
      features: ['Off-Road Package', 'Cold Climate Pack', 'Terrain Response', 'ClearSight Ground View'],
      dealerId: '3',
      isFeatured: true,
      rating: 4.8
    }
  ],
  '4': [ // Family Auto Mart inventory (Ford, Chevrolet, Dodge)
    {
      id: '401',
      title: '2023 Ford F-150 Lariat',
      price: 58900,
      year: 2023,
      mileage: 7000,
      fuelType: 'Gasoline',
      location: 'Houston, TX',
      imageUrl: 'https://images.pexels.com/photos/1073031/pexels-photo-1073031.jpeg',
      features: ['Twin-Turbo V6', 'Ford Co-Pilot360', 'B&O Sound System', 'Work Surface'],
      dealerId: '4',
      isFeatured: true,
      rating: 4.5
    },
    {
      id: '402',
      title: '2022 Chevrolet Silverado 1500 LTZ',
      price: 52900,
      year: 2022,
      mileage: 18000,
      fuelType: 'Diesel',
      location: 'Houston, TX',
      imageUrl: 'https://images.pexels.com/photos/2526128/pexels-photo-2526128.jpeg',
      features: ['Duramax Diesel', 'Premium Package', 'Multi-Flex Tailgate', 'Safety Package'],
      dealerId: '4',
      rating: 4.4
    },
    {
      id: '403',
      title: '2021 Dodge Charger R/T',
      price: 38900,
      year: 2021,
      mileage: 22000,
      fuelType: 'Gasoline',
      location: 'Houston, TX',
      imageUrl: 'https://images.pexels.com/photos/337909/pexels-photo-337909.jpeg',
      features: ['Hemi V8', 'Performance Pages', 'Alpine Audio', 'Sport Mode'],
      dealerId: '4',
      isFeatured: true,
      rating: 4.6
    },
    {
      id: '404',
      title: '2023 Ford Mustang GT',
      price: 45900,
      year: 2023,
      mileage: 3000,
      fuelType: 'Gasoline',
      location: 'Houston, TX',
      imageUrl: 'https://images.pexels.com/photos/733745/pexels-photo-733745.jpeg',
      features: ['5.0L V8', 'Active Valve Exhaust', 'Digital Dash', 'MagneRide Suspension'],
      dealerId: '4',
      rating: 4.7
    }
  ],
  '5': [ // Coastal Auto Gallery inventory (Tesla, Lexus, Volvo)
    {
      id: '501',
      title: '2023 Tesla Model S Plaid',
      price: 114900,
      year: 2023,
      mileage: 5000,
      fuelType: 'Electric',
      location: 'Miami, FL',
      imageUrl: 'https://images.pexels.com/photos/12318482/pexels-photo-12318482.jpeg',
      features: ['1020 HP', '390mi Range', '21" Wheels', 'Yoke Steering'],
      dealerId: '5',
      isFeatured: true,
      rating: 4.9
    },
    {
      id: '502',
      title: '2022 Lexus LS 500',
      price: 78900,
      year: 2022,
      mileage: 12000,
      fuelType: 'Hybrid',
      location: 'Miami, FL',
      imageUrl: 'https://images.pexels.com/photos/4072248/pexels-photo-4072248.jpeg',
      features: ['Mark Levinson Audio', 'Executive Package', 'Rear Seat Comfort', '24-way Seats'],
      dealerId: '5',
      rating: 4.8
    },
    {
      id: '503',
      title: '2023 Volvo XC90 Recharge',
      price: 72900,
      year: 2023,
      mileage: 4000,
      fuelType: 'Plug-in Hybrid',
      location: 'Miami, FL',
      imageUrl: 'https://images.pexels.com/photos/6479568/pexels-photo-6479568.jpeg',
      features: ['Bowers & Wilkins Audio', 'Lounge Pack', 'Air Suspension', 'Pilot Assist'],
      dealerId: '5',
      isFeatured: true,
      rating: 4.7
    }
  ],
  '6': [ // Metro Auto Center inventory (Hyundai, Kia, Mazda)
    {
      id: '601',
      title: '2023 Hyundai Palisade Calligraphy',
      price: 48900,
      year: 2023,
      mileage: 6000,
      fuelType: 'Gasoline',
      location: 'Seattle, WA',
      imageUrl: 'https://images.pexels.com/photos/6479564/pexels-photo-6479564.jpeg',
      features: ['Premium Leather', '12.3" Display', 'Harman Kardon Audio', 'Heads-up Display'],
      dealerId: '6',
      isFeatured: true,
      rating: 4.6
    },
    {
      id: '602',
      title: '2022 Kia Telluride SX',
      price: 45900,
      year: 2022,
      mileage: 15000,
      fuelType: 'Gasoline',
      location: 'Seattle, WA',
      imageUrl: 'https://images.pexels.com/photos/6479565/pexels-photo-6479565.jpeg',
      features: ['Nappa Leather', '10.25" Display', 'Surround View Monitor', 'Smart Cruise'],
      dealerId: '6',
      rating: 4.5
    },
    {
      id: '603',
      title: '2023 Mazda CX-90 Turbo S',
      price: 51900,
      year: 2023,
      mileage: 3000,
      fuelType: 'Plug-in Hybrid',
      location: 'Seattle, WA',
      imageUrl: 'https://images.pexels.com/photos/6479567/pexels-photo-6479567.jpeg',
      features: ['Inline-6 Turbo', 'Premium Package', '12-speaker Bose', 'i-Activ AWD'],
      dealerId: '6',
      isFeatured: true,
      rating: 4.7
    },
    {
      id: '604',
      title: '2023 Hyundai Ioniq 5 Limited',
      price: 54900,
      year: 2023,
      mileage: 4000,
      fuelType: 'Electric',
      location: 'Seattle, WA',
      imageUrl: 'https://images.pexels.com/photos/12318483/pexels-photo-12318483.jpeg',
      features: ['303mi Range', 'Ultra Fast Charging', 'AR HUD', 'V2L Capability'],
      dealerId: '6',
      rating: 4.8
    }
  ]
};

// Optional: Create a function to get all featured cars across dealers
export const getFeaturedCars = (): CarData[] => {
  return Object.values(mockInventory)
    .flat()
    .filter(car => car.isFeatured);
};