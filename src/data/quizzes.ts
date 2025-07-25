import type { QuizCategory } from '@/types';

export const quizCategories: QuizCategory[] = [
  {
    title: 'South African History',
    slug: 'sa-history',
    description: 'From ancient civilizations to the dawn of democracy, test your historical knowledge.',
    imageHint: 'ancient map',
    questions: [
      {
        id: 'hist-q1',
        questionText: 'When did Nelson Mandela become the first democratically elected president of South Africa?',
        options: [{ text: '1990' }, { text: '1994' }, { text: '1999' }, { text: '2004' }],
        correctAnswer: '1994',
        explanation: 'Nelson Mandela was inaugurated as president on May 10, 1994, following the country\'s first multiracial democratic election.'
      },
      {
        id: 'hist-q2',
        questionText: 'The historic "Trekboers" were primarily of which European descent?',
        options: [{ text: 'British' }, { text: 'Portuguese' }, { text: 'Dutch' }, { text: 'French' }],
        correctAnswer: 'Dutch',
        explanation: 'The Trekboers were semi-nomadic pastoralists descended from the Dutch-speaking colonists of the Cape Colony.'
      },
      {
        id: 'hist-q3',
        questionText: 'What was the name of the system of institutionalised racial segregation in South Africa?',
        options: [{ text: 'Segregation' }, { text: 'Apartheid' }, { text: 'Divisionism' }, { text: 'Separation' }],
        correctAnswer: 'Apartheid',
        explanation: 'Apartheid was a system of institutionalised racial segregation that existed in South Africa and South West Africa from 1948 until the early 1990s.'
      },
    ],
  },
  {
    title: 'Wildlife & Nature',
    slug: 'wildlife-nature',
    description: 'Explore the diverse flora and fauna of South Africa, from the Big Five to the fynbos.',
    imageHint: 'savanna wildlife',
    questions: [
      {
        id: 'wild-q1',
        questionText: 'Which of these animals is NOT part of the "Big Five"?',
        options: [{ text: 'Lion' }, { text: 'Leopard' }, { text: 'Cheetah' }, { text: 'Rhinoceros' }],
        correctAnswer: 'Cheetah',
        explanation: 'The Big Five game animals are the lion, leopard, black rhinoceros, African bush elephant, and the African buffalo.'
      },
      {
        id: 'wild-q2',
        questionText: 'What is South Africa\'s national flower?',
        options: [{ text: 'Strelitzia' }, { text: 'King Protea' }, { text: 'Bird-of-paradise' }, { text: 'Agapanthus' }],
        correctAnswer: 'King Protea',
        explanation: 'The King Protea (Protea cynaroides) is the national flower of South Africa and a symbol of the country\'s rich biodiversity.'
      },
    ],
  },
  {
    title: 'Famous Landmarks',
    slug: 'landmarks',
    description: 'How well do you know the iconic sites of South Africa? From mountains to monuments.',
    imageHint: 'Table Mountain',
    questions: [
      {
        id: 'land-q1',
        questionText: 'Which famous landmark overlooks the city of Cape Town?',
        options: [{ text: 'Drakensberg' }, { text: 'Table Mountain' }, { text: 'Signal Hill' }, { text: 'Lion\'s Head' }],
        correctAnswer: 'Table Mountain',
        explanation: 'Table Mountain is a flat-topped mountain forming a prominent landmark overlooking the city of Cape Town.'
      },
      {
        id: 'land-q2',
        questionText: 'Robben Island, a UNESCO World Heritage Site, is most famous for being a...',
        options: [{ text: 'Nature reserve' }, { text: 'Holiday resort' }, { text: 'Political prison' }, { text: 'Whaling station' }],
        correctAnswer: 'Political prison',
        explanation: 'Robben Island is best known for being the location where Nelson Mandela and other political prisoners were incarcerated during apartheid.'
      },
    ],
  },
  {
    title: 'Famous South Africans',
    slug: 'famous-south-africans',
    description: 'Test your knowledge on the rainbow nation\'s most influential and celebrated figures.',
    imageHint: 'portrait famous person',
    questions: [
      {
        id: 'fame-q1',
        questionText: 'Which South African entrepreneur is known for founding SpaceX and Tesla?',
        options: [{ text: 'Patrice Motsepe' }, { text: 'Mark Shuttleworth' }, { text: 'Elon Musk' }, { text: 'Koos Bekker' }],
        correctAnswer: 'Elon Musk',
        explanation: 'Elon Musk, though he later became a citizen of Canada and the US, was born and raised in Pretoria, South Africa.'
      },
      {
        id: 'fame-q2',
        questionText: 'Who won a Nobel Peace Prize alongside Nelson Mandela for their work in ending apartheid?',
        options: [{ text: 'Desmond Tutu' }, { text: 'F.W. de Klerk' }, { text: 'Thabo Mbeki' }, { text: 'Cyril Ramaphosa' }],
        correctAnswer: 'F.W. de Klerk',
        explanation: 'F.W. de Klerk, South Africa\'s last apartheid-era president, shared the Nobel Peace Prize with Nelson Mandela in 1993.'
      }
    ]
  },
  {
    title: 'South African Languages & Culture',
    slug: 'languages-culture',
    description: 'From "howzit" to "braai," explore the rich tapestry of languages and cultures.',
    imageHint: 'cultural artifacts',
    questions: [
      {
        id: 'lang-q1',
        questionText: 'How many official languages does South Africa have?',
        options: [{ text: '3' }, { text: '5' }, { text: '9' }, { text: '11' }],
        correctAnswer: '11',
        explanation: 'South Africa is known as the "Rainbow Nation" partly due to its cultural and linguistic diversity, with 11 official languages.'
      },
      {
        id: 'lang-q2',
        questionText: 'What is a "braai" in South Africa?',
        options: [{ text: 'A type of dance' }, { text: 'A social barbecue' }, { text: 'A traditional garment' }, { text: 'A musical instrument' }],
        correctAnswer: 'A social barbecue',
        explanation: 'A braai is a quintessential South African social gathering where food is cooked over an open fire.'
      }
    ]
  },
  {
    title: 'South African Music & Arts',
    slug: 'music-arts',
    description: 'Discover the vibrant rhythms and creative expressions of South Africa.',
    imageHint: 'vibrant art',
    questions: [
      {
        id: 'art-q1',
        questionText: 'Which music genre, characterized by its house beats and melodic vocals, originated in South Africa?',
        options: [{ text: 'Kwaito' }, { text: 'Amapiano' }, { text: 'Gqom' }, { text: 'Reggae' }],
        correctAnswer: 'Amapiano',
        explanation: 'Amapiano is a subgenre of house music that emerged in South Africa in the mid-2010s.'
      },
      {
        id: 'art-q2',
        questionText: 'The musical group Ladysmith Black Mambazo is famous for which style of vocal music?',
        options: [{ text: 'Isicathamiya' }, { text: 'Mbube' }, { text: 'Both A and B' }, { text: 'Gospel' }],
        correctAnswer: 'Both A and B',
        explanation: 'Ladysmith Black Mambazo is globally recognized for their mastery of the Isicathamiya and Mbube vocal styles.'
      }
    ]
  }
];
