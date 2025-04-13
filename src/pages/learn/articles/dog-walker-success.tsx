import React from 'react';
import { 
  Pets as PetsIcon,
  TrendingUp as TrendingUpIcon,
  Group as GroupIcon,
  Star as StarIcon,
} from '@mui/icons-material';
import ServiceArticle from '../../../components/articles/ServiceArticle';

const DogWalkerSuccess = () => {
  const articleData = {
    title: "From Side Gig to Full-Time Hustle: How a Dog Walker Booked 50+ Clients on MarketHustle",
    summary: "A passionate dog lover turned her part-time dog walking service into a thriving business with over 50 regular clients. Learn how she used MarketHustle to build a reliable client base and create a sustainable income stream.",
    tags: [
      { icon: <PetsIcon />, label: "Pet Services" },
      { icon: <TrendingUpIcon />, label: "Growing Demand" },
      { icon: <GroupIcon />, label: "Recurring Clients" },
      { icon: <StarIcon />, label: "Premium Service" },
    ],
    businessMetrics: {
      monthlyRevenue: "$6,000+",
      startupCost: "$500 - $1,000",
      profitMargin: "75%",
      timeToProfit: "1-2 months",
    },
    quickFacts: [
      { label: "Founded", value: "2023" },
      { label: "Regular Clients", value: "50+" },
      { label: "Service Area", value: "5 mile radius" },
      { label: "Client Retention", value: "92%" },
    ],
    monthlyBreakdown: {
      revenue: "$6,000",
      expenses: {
        total: "$1,500",
        breakdown: {
          "Transportation": "$400",
          "Insurance": "$200",
          "Marketing": "$150",
          "Pet Supplies": "$250",
          "Software & Apps": "$100",
          "Emergency Fund": "$400",
        },
      },
      netProfit: "$4,500",
    },
    content: {
      backstory: [
        "Sarah Thompson had always been passionate about dogs, but she never imagined her love for pets would turn into a thriving business. Working a 9-5 office job, she started dog walking on evenings and weekends to earn extra income and spend more time with animals.",
        "\"I was frustrated with the inconsistent gig work apps, where you never knew if you'd get walks or build relationships with the dogs,\" Sarah recalls. \"I wanted to create a more personal, reliable service where both the pets and their owners would truly know and trust their walker.\"",
      ],
      launch: [
        "With minimal startup costs, Sarah began by investing in essential supplies: leashes, treat pouches, poop bags, and a basic pet first aid kit. She also obtained pet care insurance and created a professional profile on MarketHustle.",
        "\"The hardest part wasn't the setup—it was standing out in a crowded market,\" she explains. \"I decided to focus on premium service: longer walks, consistent scheduling, and detailed report cards after each visit. MarketHustle's platform made it easy to showcase these differentiators.\"",
      ],
      businessModel: [
        "Sarah's business model focused on building long-term relationships with clients through subscription packages. She offered three tiers of service:",
        "• Basic Package ($20/30-min walk): Perfect for quick potty breaks and light exercise\n• Premium Package ($35/60-min walk): Extended walks with training reinforcement\n• VIP Package ($50/90-min): Long walks, basic training, and pet sitting services",
        "\"The key was creating packages that provided value while being sustainable for me,\" Sarah notes. \"By focusing on a specific neighborhood and scheduling walks efficiently, I could maximize my earning potential while providing excellent service.\"",
      ],
      scaling: [
        "Within six months, Sarah had built enough recurring clients to match her corporate salary. She took the leap to full-time dog walking and expanded her service area strategically.",
        "\"MarketHustle's platform was crucial for growth,\" she says. \"The review system helped build trust, and the scheduling features made it easy to manage multiple clients. I also used the platform's analytics to identify peak demand times and adjust my availability accordingly.\"",
        "Today, Sarah has a waitlist for new clients and is considering hiring her first employee. She's also exploring additional services like pet sitting and dog training to increase her revenue streams.",
      ],
    },
  };

  return <ServiceArticle {...articleData} />;
};

export default DogWalkerSuccess; 