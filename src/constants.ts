export const ART_FORMS = [
  {
    id: 'yakshagana',
    title: 'Yakshagana',
    description: 'A traditional theatre form that combines dance, music, dialogue, costume, make-up, and stage techniques with a unique style and form.',
    history: 'Yakshagana origins are traced back to the 11th-16th century AD. It is mainly found in the coastal districts and adjacent areas of Karnataka.',
    imageUrl: 'https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/commons/2/22/Yakshagana_1.jpg&w=1200&q=80',
  },
  {
    id: 'dollu-kunitha',
    title: 'Dollu Kunitha',
    description: 'A major popular drum dance of Karnataka. Accompanied by singing, it provides spectacular variety and complexity of skills.',
    history: 'A powerful drum dance of the Kuruba community, performed to honor Lord Beereshwara. It is a symbol of strength and energy.',
    imageUrl: 'https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/commons/4/4c/Dollu_Kunitha_performer.jpg&w=1200&q=80',
  },
  {
    id: 'bharatanatyam',
    title: 'Bharatanatyam',
    description: 'A major form of Indian classical dance that originated from Tamil Nadu, but flourished and is widely practiced in Karnataka with its unique Mysore style.',
    history: 'The Mysore state contributed significantly to the growth of this art form, with the Wodeyar kings being great patrons of dance and music.',
    imageUrl: 'https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/commons/d/db/Bharatanatyam_performer.jpg&w=1200&q=80',
  },
  {
    id: 'kamsale',
    title: 'Kamsale',
    description: 'A unique folk art form performed by the devotees of God Mahadeshwara. It is named after the "Kamsale" - a brass musical instrument.',
    history: 'It is a vigorous dance-cum-music practice performed by the "Devara Guddas" (devotees of Lord Mahadeshwara) of the Mysore and Chamarajanagar regions.',
    imageUrl: 'https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/commons/c/c5/Kamsale_performers.jpg&w=1200&q=80',
  },
  {
    id: 'somana-kunitha',
    title: 'Somana Kunitha',
    description: 'A ritualistic dance mainly prevalent in the southern districts of Karnataka, involving giant masks.',
    history: 'Performed during the village deity (Grama Devathe) festivals, it is meant to ward off evil and protect the village.',
    imageUrl: 'https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/commons/6/6b/Somana_kunitha.jpg&w=1200&q=80',
  },
  {
    id: 'kinnala-toys',
    title: 'Kinnala Toys',
    description: 'Exquisite wooden toys from Kinhal, known for their intricate designs and vibrant colors.',
    history: 'The craft dates back to the Vijayanagara Empire. The artisans are known as Chitragars.',
    imageUrl: 'https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/commons/1/1d/Kinnal_Toy_1.jpg&w=1200&q=80',
  },
  {
    id: 'bidriware',
    title: 'Bidriware',
    description: 'A unique metal handicraft from Bidar, involving a blackened alloy of zinc and copper inlaid with pure silver.',
    history: 'Developed in the 14th century during the rule of the Bahmani Sultans.',
    imageUrl: 'https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/commons/a/ab/Bidar_-_Art_on_Metal_-_Bidriware.jpg&w=1200&q=80',
  },
  {
    id: 'veeragase',
    title: 'Veeragase',
    description: 'Veeragase is a traditional ritual dance associated with the worship of Lord Shiva, especially in his fierce form as Veerabhadra.',
    history: 'Veeragase is a traditional Karnataka folk dance that originated from the mythological story of Veerabhadra, created by Shiva to destroy King Daksha’s yajna..',
    imageUrl: 'https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/commons/9/91/Veeragase_performer.jpg&w=1200&q=80',
  }
];

export const EVENTS = [
  {
    id: '1',
    title: 'Grand Yakshagana Night',
    date: '2026-05-15',
    location: 'Mangalore Town Hall',
    description: 'Experience the epic tale of Ramayana portrayed through the powerful movements of Yakshagana.',
    status: 'upcoming'
  },
  {
    id: '2',
    title: 'Dollu Kunitha Performance',
    date: '2026-05-20',
    location: 'Cubbon Park, Bangalore',
    description: 'A robust and high-energy drum dance of the Kuruba community.',
    status: 'upcoming'
  },
  {
    id: 'past-1',
    title: 'Mysuru Dasara Cultural Fest',
    date: '2025-10-12',
    location: 'Mysuru Palace',
    description: 'A grand celebration featuring various folk arts of Karnataka including Kamsale and Veeragase.',
    status: 'past'
  },
  {
    id: 'past-2',
    title: 'Hampi Utsav 2025',
    date: '2025-11-05',
    location: 'Hampi Ruins',
    description: 'A three-day cultural extravaganza celebrating the glory of the Vijayanagara Empire.',
    status: 'past'
  }
];

export const ARTISANS = [
  {
    id: '1',
    name: 'Shri Manjunath Chitragar',
    artType: 'Kinnala Toys',
    location: 'Kinhal, Koppal',
    lat: 15.4200,
    lng: 76.1500,
    phone: '+91 9876543210',
  },
  {
    id: '2',
    name: 'Raghuram Bhagwat',
    artType: 'Yakshagana',
    location: 'Udupi',
    lat: 13.3409,
    lng: 74.7421,
    phone: '+91 9876543211',
  },
  {
    id: '3',
    name: 'Mohammed Rauf',
    artType: 'Bidriware',
    location: 'Bidar',
    lat: 17.9120,
    lng: 77.5188,
    phone: '+91 9876543212',
  },
  {
    id: '4',
    name: 'Basappa Goravar',
    artType: 'Dollu Kunitha',
    location: 'Haveri',
    lat: 14.7937,
    lng: 75.4013,
    phone: '+91 9876543213',
  },
  {
    id: '5',
    name: 'Nanjunda Swamy',
    artType: 'Kamsale',
    location: 'Chamarajanagar',
    lat: 11.9213,
    lng: 76.9405,
    phone: '+91 9876543214',
  },
  {
    id: '6',
    name: 'Venkatesh Mysore',
    artType: 'Bharatanatyam',
    location: 'Mysuru',
    lat: 12.2958,
    lng: 76.6394,
    phone: '+91 9876543215',
  },
  {
    id: '7',
    name: 'Shivaprada Hegde',
    artType: 'Yakshagana',
    location: 'Sirsi',
    lat: 14.6195,
    lng: 74.8441,
    phone: '+91 9876543216',
  },
  {
    id: '8',
    name: 'Gundu Rao',
    artType: 'Somana Kunitha',
    location: 'Tumakuru',
    lat: 13.3392,
    lng: 77.1140,
    phone: '+91 9876543217',
  },
  {
    id: '9',
    name: 'Rudrappa Guddada',
    artType: 'Veeragase',
    location: 'Dharwad',
    lat: 15.4589,
    lng: 75.0078,
    phone: '+91 9876543218',
  },
  {
    id: '10',
    name: 'Mallappa Gowda',
    artType: 'Kamsale',
    location: 'Malavalli',
    lat: 12.3872,
    lng: 77.0543,
    phone: '+91 9876543219',
  }
];
