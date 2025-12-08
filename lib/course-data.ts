export type LessonType = 'video' | 'text' | 'quiz';

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface Lesson {
  id: string;
  title: string;
  type: LessonType;
  duration: string;
  content?: string;
  videoUrl?: string;
  imageUrl?: string;
  questions?: QuizQuestion[];
}

export interface Module {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  thumbnail: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  totalDuration: string;
  modules: Module[];
}

export const courses: Course[] = [
  {
    id: 'c1',
    slug: 'crypto-foundations',
    title: 'Crypto Foundations',
    description: 'From zero to understanding the blockchain architecture.',
    longDescription: 'This comprehensive course takes you on a journey through the history of money, the technical architecture of distributed ledgers, and the revolutionary potential of smart contracts. Designed for the curious mind, we strip away the hype and focus on the fundamental principles that make cryptocurrency a technological breakthrough.',
    thumbnail: 'https://images.unsplash.com/photo-1642104704074-907c0698cbd9?q=80&w=2832&auto=format&fit=crop',
    level: 'Beginner',
    totalDuration: '4h 30m',
    modules: [
      {
        id: 'm1',
        title: 'Module 1: The History of Money',
        description: 'Understanding why we need Bitcoin requires understanding the flaws of fiat.',
        lessons: [
          {
            id: 'l1-1',
            title: 'Barter to Bitcoin',
            type: 'video',
            duration: '15 min',
            videoUrl: 'https://www.youtube.com/embed/Gc2en3nHxA4' // Valid video ID for history of money
          },
          {
            id: 'l1-2',
            title: 'The Double Spend Problem',
            type: 'text',
            duration: '10 min',
            imageUrl: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?q=80&w=2555&auto=format&fit=crop',
            content: 'In a digital cash system, the double-spending problem arises because digital tokens can be copied perfectly. Unlike physical cash, where handing someone a dollar bill means you no longer have it, a digital file can be sent to Alice and then also sent to Bob.\n\nPrior to Bitcoin, this was solved by a central authority (like a bank or PayPal) keeping a ledger of who owns what. Bitcoin solved it without a trusted third party by using a public ledger (blockchain) secured by Proof of Work.'
          },
          {
            id: 'l1-3',
            title: 'Module 1 Quiz',
            type: 'quiz',
            duration: '5 min',
            questions: [
              {
                id: 'q1',
                question: 'What is the "Double Spend" problem?',
                options: [
                  'Spending more money than you have in your bank account',
                  'The risk that a digital currency can be spent twice because it is just data',
                  'When a transaction fee is paid twice by accident',
                  'Inflation causing money to lose half its value'
                ],
                correctAnswerIndex: 1,
                explanation: 'Digital assets are just files/data. Without a central authority or a blockchain, nothing stops someone from copying the "money" file and sending it to two different people. This is the fundamental problem Bitcoin solved.'
              },
              {
                id: 'q2',
                question: 'How does a traditional bank solve the double spend problem?',
                options: [
                  'By using gold bars to back every transaction',
                  'By trusting all customers to be honest',
                  'By maintaining a central ledger that tracks all balances',
                  'They cannot solve it'
                ],
                correctAnswerIndex: 2,
                explanation: 'Banks act as a trusted third party. They keep a private database (ledger) and ensure that if you send $10, it is deducted from your balance.'
              },
              {
                id: 'q3',
                question: 'Who is the creator of Bitcoin?',
                options: [
                  'Vitalik Buterin',
                  'Elon Musk',
                  'Satoshi Nakamoto',
                  'Charlie Lee'
                ],
                correctAnswerIndex: 2,
                explanation: 'Bitcoin was released in 2008 by an anonymous person or group using the pseudonym Satoshi Nakamoto.'
              }
            ]
          }
        ]
      },
      {
        id: 'm2',
        title: 'Module 2: Distributed Ledgers',
        description: 'How nodes agree on the truth without a leader.',
        lessons: [
          {
            id: 'l2-1',
            title: 'Proof of Work vs Proof of Stake',
            type: 'video',
            duration: '20 min',
            videoUrl: 'https://www.youtube.com/embed/M3EFi_POhps' 
          },
          {
            id: 'l2-2',
            title: 'Public vs Private Keys',
            type: 'text',
            duration: '15 min',
            imageUrl: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?q=80&w=2670&auto=format&fit=crop',
            content: 'Cryptography is the lock and key of the internet. In this lesson we explore asymmetric encryption. Your Public Key is like your mailbox address—anyone can send mail to it. Your Private Key is the key to open that mailbox. Never share your private key.'
          }
        ]
      },
      {
        id: 'm3',
        title: 'Module 3: Smart Contracts',
        description: 'Programmable money and the rise of Ethereum.',
        lessons: [
          {
            id: 'l3-1',
            title: 'Code is Law?',
            type: 'video',
            duration: '25 min',
            videoUrl: 'https://www.youtube.com/embed/pWGLtjG-F5c'
          },
          {
            id: 'l3-2',
            title: 'The DAO Hack',
            type: 'text',
            duration: '12 min',
            content: 'The DAO was a decentralized investor-directed venture capital fund. It had a bug in its smart contract code that allowed a hacker to drain funds. This event split Ethereum into ETH and ETC.'
          }
        ]
      }
    ]
  },
  {
    id: 'c2',
    slug: 'thinking-in-systems',
    title: 'Thinking in Systems',
    description: 'Mental models to navigate a complex world.',
    longDescription: 'Move beyond linear cause-and-effect thinking. This course explores feedback loops, emergence, and how to spot leverage points in complex systems. Essential for understanding everything from ecology to economics.',
    thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672&auto=format&fit=crop',
    level: 'Intermediate',
    totalDuration: '3h 15m',
    modules: [
      {
        id: 'sys-m1',
        title: 'Introduction to Systems',
        description: 'What is a system?',
        lessons: [
          {
            id: 'sys-l1',
            title: 'Stocks and Flows',
            type: 'text',
            duration: '10 min',
            imageUrl: 'https://images.unsplash.com/photo-1506318137071-a8bcbf6755dd?q=80&w=2670&auto=format&fit=crop',
            content: 'A bathtub is the simplest system model. Water comes in (inflow), stays (stock), and leaves (outflow). If inflow > outflow, the stock rises. If outflow > inflow, it falls. This simple model explains debt, population, and CO2 levels.'
          },
          {
            id: 'sys-l2',
            title: 'Feedback Loops',
            type: 'video',
            duration: '15 min',
            videoUrl: 'https://www.youtube.com/embed/6iTeFv6FbeM'
          }
        ]
      }
    ]
  }
];

export function getCourse(slug: string): Course | undefined {
  return courses.find(c => c.slug === slug);
}
