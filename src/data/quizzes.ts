import type { QuizCategory } from '@/types';

export const quizCategories: QuizCategory[] = [
  {
    title: 'South African History',
    slug: 'sa-history',
    description: 'From ancient civilizations to the dawn of democracy, test your historical knowledge.',
    imageHint: 'historical document',
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
    imageHint: 'lion safari',
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
    imageHint: 'cape town',
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
];
