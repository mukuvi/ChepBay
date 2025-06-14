// Mock data for the application
export const mockProducts = [
  {
    id: '1',
    title: 'MacBook Pro 13" 2020',
    description: 'Excellent condition MacBook Pro with M1 chip. Perfect for students. Includes charger and original box.',
    price: 85000,
    condition: 'like_new',
    category: 'electronics',
    images: ['https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg'],
    location: 'University of Lagos',
    created_at: '2025-01-15T10:00:00Z',
    is_available: true,
    seller_id: 'user1',
    profiles: {
      full_name: 'John Doe',
      avatar_url: null
    }
  },
  {
    id: '2',
    title: 'Engineering Mathematics Textbook',
    description: 'Complete set of engineering mathematics books. All in good condition with minimal highlighting.',
    price: 12000,
    condition: 'good',
    category: 'books',
    images: ['https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg'],
    location: 'University of Ibadan',
    created_at: '2025-01-14T15:30:00Z',
    is_available: true,
    seller_id: 'user2',
    profiles: {
      full_name: 'Jane Smith',
      avatar_url: null
    }
  },
  {
    id: '3',
    title: 'iPhone 12 Pro',
    description: 'Barely used iPhone 12 Pro in excellent condition. No scratches, comes with case and screen protector.',
    price: 45000,
    condition: 'like_new',
    category: 'electronics',
    images: ['https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg'],
    location: 'Covenant University',
    created_at: '2025-01-13T09:15:00Z',
    is_available: true,
    seller_id: 'user3',
    profiles: {
      full_name: 'Mike Johnson',
      avatar_url: null
    }
  },
  {
    id: '4',
    title: 'Study Desk and Chair Set',
    description: 'Comfortable study desk with matching chair. Perfect for dorm room or apartment.',
    price: 25000,
    condition: 'good',
    category: 'furniture',
    images: ['https://images.pexels.com/photos/667838/pexels-photo-667838.jpeg'],
    location: 'University of Nigeria',
    created_at: '2025-01-12T14:20:00Z',
    is_available: true,
    seller_id: 'user4',
    profiles: {
      full_name: 'Sarah Wilson',
      avatar_url: null
    }
  },
  {
    id: '5',
    title: 'Nike Air Force 1 Sneakers',
    description: 'Classic white Nike Air Force 1 sneakers. Size 42. Worn only a few times.',
    price: 8000,
    condition: 'like_new',
    category: 'fashion',
    images: ['https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg'],
    location: 'Lagos State University',
    created_at: '2025-01-11T11:45:00Z',
    is_available: true,
    seller_id: 'user5',
    profiles: {
      full_name: 'David Brown',
      avatar_url: null
    }
  },
  {
    id: '6',
    title: 'Samsung Galaxy Tab S7',
    description: 'Perfect tablet for note-taking and digital art. Comes with S Pen and keyboard cover.',
    price: 35000,
    condition: 'good',
    category: 'electronics',
    images: ['https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg'],
    location: 'Obafemi Awolowo University',
    created_at: '2025-01-10T16:30:00Z',
    is_available: true,
    seller_id: 'user6',
    profiles: {
      full_name: 'Lisa Garcia',
      avatar_url: null
    }
  },
  {
    id: '7',
    title: 'Calculus and Analytical Geometry',
    description: 'Essential mathematics textbook for engineering and science students. Good condition.',
    price: 5000,
    condition: 'fair',
    category: 'books',
    images: ['https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg'],
    location: 'University of Benin',
    created_at: '2025-01-09T13:10:00Z',
    is_available: true,
    seller_id: 'user7',
    profiles: {
      full_name: 'Chris Lee',
      avatar_url: null
    }
  },
  {
    id: '8',
    title: 'Vintage Denim Jacket',
    description: 'Stylish vintage denim jacket. Perfect for casual wear. Size M.',
    price: 6500,
    condition: 'good',
    category: 'fashion',
    images: ['https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg'],
    location: 'University of Port Harcourt',
    created_at: '2025-01-08T12:00:00Z',
    is_available: true,
    seller_id: 'user8',
    profiles: {
      full_name: 'Emma Davis',
      avatar_url: null
    }
  }
]

export const mockUser = {
  id: 'current-user',
  email: 'student@university.edu',
  full_name: 'Current User',
  phone_number: '+234 123 456 7890',
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
  }
]