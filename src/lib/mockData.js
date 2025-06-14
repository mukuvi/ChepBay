// Mock data for the application
export const generateMockProducts = () => {
  const categories = ['electronics', 'books', 'fashion', 'furniture', 'sports', 'vehicles']
  const conditions = ['new', 'like_new', 'good', 'fair', 'poor']
  const locations = [
    'University of Nairobi',
    'Kenyatta University',
    'Moi University',
    'Egerton University',
    'Jomo Kenyatta University',
    'Maseno University',
    'Strathmore University',
    'United States International University',
    'Daystar University',
    'Mount Kenya University'
  ]

  const productTitles = {
    electronics: [
      'MacBook Pro 13"', 'iPhone 14 Pro', 'Samsung Galaxy S23', 'iPad Air', 'Dell XPS 13',
      'HP Pavilion Laptop', 'Sony WH-1000XM4 Headphones', 'Apple Watch Series 8',
      'Samsung Galaxy Tab', 'Lenovo ThinkPad', 'Gaming Mouse', 'Mechanical Keyboard',
      'Portable Speaker', 'Wireless Earbuds', 'External Hard Drive', 'USB-C Hub',
      'Monitor 24"', 'Webcam HD', 'Power Bank', 'Phone Case'
    ],
    books: [
      'Engineering Mathematics', 'Calculus Textbook', 'Physics for Scientists',
      'Chemistry Principles', 'Biology Campbell', 'Economics Principles',
      'Accounting Fundamentals', 'Computer Science Algorithms', 'Statistics Guide',
      'Linear Algebra', 'Organic Chemistry', 'Microeconomics', 'Business Law',
      'Marketing Management', 'Financial Accounting', 'Data Structures',
      'Operating Systems', 'Database Systems', 'Software Engineering', 'Discrete Mathematics'
    ],
    fashion: [
      'Nike Air Force 1', 'Adidas Ultraboost', 'Denim Jacket', 'Leather Boots',
      'Casual T-Shirt', 'Formal Shirt', 'Jeans', 'Hoodie', 'Sneakers',
      'Dress Shoes', 'Backpack', 'Watch', 'Sunglasses', 'Belt',
      'Winter Coat', 'Summer Dress', 'Polo Shirt', 'Cargo Pants', 'Blazer', 'Scarf'
    ],
    furniture: [
      'Study Desk', 'Office Chair', 'Bookshelf', 'Bed Frame', 'Mattress',
      'Wardrobe', 'Dining Table', 'Sofa', 'Coffee Table', 'Desk Lamp',
      'Floor Lamp', 'Storage Box', 'Mirror', 'Curtains', 'Rug',
      'Side Table', 'Drawer Unit', 'Coat Rack', 'Shoe Rack', 'Plant Stand'
    ],
    sports: [
      'Football', 'Basketball', 'Tennis Racket', 'Gym Weights', 'Yoga Mat',
      'Running Shoes', 'Bicycle', 'Skateboard', 'Swimming Goggles', 'Gym Bag',
      'Protein Shaker', 'Resistance Bands', 'Dumbbells', 'Exercise Ball', 'Jump Rope',
      'Boxing Gloves', 'Badminton Racket', 'Table Tennis Paddle', 'Golf Clubs', 'Helmet'
    ],
    vehicles: [
      'Honda Civic', 'Toyota Corolla', 'Nissan Sentra', 'Mazda 3', 'Hyundai Elantra',
      'Motorcycle Honda', 'Bicycle Mountain', 'Scooter Electric', 'Car Toyota',
      'Motorbike Yamaha', 'Bicycle Road', 'ATV Quad', 'Truck Pickup', 'Van Toyota',
      'SUV Nissan', 'Sedan Honda', 'Hatchback Mazda', 'Coupe BMW', 'Convertible Audi', 'Wagon Subaru'
    ]
  }

  const products = []
  
  for (let i = 1; i <= 150; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)]
    const titles = productTitles[category]
    const title = titles[Math.floor(Math.random() * titles.length)]
    const condition = conditions[Math.floor(Math.random() * conditions.length)]
    const location = locations[Math.floor(Math.random() * locations.length)]
    
    const basePrice = category === 'electronics' ? 50000 : 
                     category === 'vehicles' ? 200000 :
                     category === 'furniture' ? 30000 :
                     category === 'books' ? 5000 :
                     category === 'fashion' ? 8000 : 15000
    
    const price = Math.floor(basePrice * (0.5 + Math.random() * 1.5))
    
    const images = [
      'https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg',
      'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg',
      'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg',
      'https://images.pexels.com/photos/667838/pexels-photo-667838.jpeg',
      'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg'
    ]
    
    products.push({
      id: i.toString(),
      title: `${title} ${condition === 'new' ? '(Brand New)' : ''}`,
      description: `High quality ${title.toLowerCase()} in ${condition.replace('_', ' ')} condition. Perfect for students. ${category === 'electronics' ? 'Includes charger and accessories.' : category === 'books' ? 'All pages intact, minimal highlighting.' : 'Well maintained and clean.'}`,
      price,
      condition,
      category,
      images: [images[Math.floor(Math.random() * images.length)]],
      location,
      created_at: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      is_available: true,
      seller_id: `user${Math.floor(Math.random() * 20) + 1}`,
      profiles: {
        full_name: `Student ${Math.floor(Math.random() * 100) + 1}`,
        avatar_url: null
      }
    })
  }
  
  return products.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
}

export const mockProducts = generateMockProducts()

export const mockUser = {
  id: 'current-user',
  email: 'student@university.ac.ke',
  full_name: 'Current User',
  phone_number: '+254 712 345 678',
  avatar_url: null,
  is_admin: false
}

export const mockConversations = [
  {
    id: 'conv1',
    product_id: '1',
    buyer_id: 'current-user',
    seller_id: 'user1',
    created_at: '2025-01-15T10:30:00Z',
    updated_at: '2025-01-15T11:00:00Z',
    buyer: mockUser,
    seller: {
      full_name: 'John Doe',
      avatar_url: null
    },
    product: {
      title: 'MacBook Pro 13" 2020',
      images: ['https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg']
    }
  },
  {
    id: 'conv2',
    product_id: '3',
    buyer_id: 'current-user',
    seller_id: 'user3',
    created_at: '2025-01-14T15:20:00Z',
    updated_at: '2025-01-14T16:30:00Z',
    buyer: mockUser,
    seller: {
      full_name: 'Mike Johnson',
      avatar_url: null
    },
    product: {
      title: 'iPhone 12 Pro',
      images: ['https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg']
    }
  }
]

export const mockMessages = [
  {
    id: 'msg1',
    conversation_id: 'conv1',
    sender_id: 'current-user',
    content: 'Hi, is this MacBook still available?',
    created_at: '2025-01-15T10:30:00Z',
    sender: mockUser
  },
  {
    id: 'msg2',
    conversation_id: 'conv1',
    sender_id: 'user1',
    content: 'Yes, it is! Are you interested?',
    created_at: '2025-01-15T11:00:00Z',
    sender: {
      full_name: 'John Doe',
      avatar_url: null
    }
  },
  {
    id: 'msg3',
    conversation_id: 'conv1',
    sender_id: 'current-user',
    content: 'Can we meet tomorrow at the campus?',
    created_at: '2025-01-15T11:15:00Z',
    sender: mockUser
  },
  {
    id: 'msg4',
    conversation_id: 'conv2',
    sender_id: 'current-user',
    content: 'What\'s the condition of the iPhone?',
    created_at: '2025-01-14T15:20:00Z',
    sender: mockUser
  },
  {
    id: 'msg5',
    conversation_id: 'conv2',
    sender_id: 'user3',
    content: 'It\'s in excellent condition, barely used!',
    created_at: '2025-01-14T16:30:00Z',
    sender: {
      full_name: 'Mike Johnson',
      avatar_url: null
    }
  }
]