import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log("Cooking up the menu... 🍳");

  await prisma.product.createMany({
    data: [
      {
        title: 'Chicken Biryani',
        desc: 'Signature aromatic basmati, tender chicken, slow-cooked in dum.',
        price: 160,
        category: 'BIRYANI',
        featured: true,
        image: '/images/menu/chicken-biryani-1.png',
        isAvailable: true,
      },
      {
        title: 'Dragon Chicken',
        desc: 'Signature spicy chicken, cashew, tossed with dry red chilli.',
        price: 180,
        category: 'CHICKEN',
        featured: true,
        image: '/images/menu/dragon-chicken-1.png',
        isAvailable: true,
      },
      {
        title: 'Chicken Lollipop',
        desc: 'Crispy fried wings tossed in our house-special schezwan sauce.',
        price: 140,
        category: 'STARTERS',
        featured: false,
        image: '/images/menu/chicken-lollipop-1.png',
        isAvailable: true,
      },
      {
        title: 'Crispy Chicken',
        desc: 'Shredded chicken, crispy fried, coated in sweet & spicy glaze.',
        price: 150,
        category: 'STARTERS',
        featured: false,
        image: '/images/menu/crispy-chicken.png',
        isAvailable: true,
      },
      {
        title: 'Chilli Paneer',
        desc: 'Crisp paneer cubes tossed in classic Indo-Chinese soy and chilli glaze.',
        price: 130,
        category: 'VEG',
        featured: false,
        image: '/images/menu/chilli-paneer-1.png',
        isAvailable: true,
      },
      {
        title: 'Veg Fried Rice',
        desc: 'Wok-tossed long grain rice with fresh vegetables and aromatic soy.',
        price: 110,
        category: 'VEG',
        featured: false,
        image: '/images/menu/veg-fried-rice-1.png',
        isAvailable: true,
      }
    ],
  });

  console.log("Menu successfully pushed to Neon! 🚀");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });