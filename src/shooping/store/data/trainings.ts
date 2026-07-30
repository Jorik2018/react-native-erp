import laptopsImage from '../../assets/trainings/laptops.jpg';
import mobilesImage from '../../assets/trainings/mobiles.png';
import accessoriesImage from '../../assets/trainings/accessories.png';
import clothingsImage from '../../assets/trainings/clothings.jpg';
import booksImage from '../../assets/trainings/books.jpg';

export const CategoryType = {
  ELECTRONICS: 'Electronics',
  MENSWEAR: 'Clothings',
  BOOK: 'Books',
} as const;

export type CategoryTypeValue =
  (typeof CategoryType)[keyof typeof CategoryType];

export const CategoryCode = {
  LAPTOPS: 'LAPTOPS',
  MOBILES: 'MOBILES',
  ACCESSORIES: 'ACCESSORIES',
  CLOTHINGS: 'CLOTHINGS',
  BOOKS: 'BOOKS',
} as const;

export type CategoryCodeValue =
  (typeof CategoryCode)[keyof typeof CategoryCode];

export class Category {
  title: string;
  level: CategoryTypeValue;
  category: CategoryCodeValue;
  image: string;

  constructor(
    title: string,
    level: CategoryTypeValue,
    category: CategoryCodeValue,
    image: string,
  ) {
    this.title = title;
    this.level = level;
    this.category = category;
    this.image = image;
  }

  get formattedLevel(): string {
    return this.level;
  }

  get categoryName(): string {
    return this.category;
  }

  static laptops(): Category {
    return new Category(
      'Laptops',
      CategoryType.ELECTRONICS,
      CategoryCode.LAPTOPS,
      laptopsImage,
    );
  }

  static mobiles(): Category {
    return new Category(
      'Brand Mobiles',
      CategoryType.ELECTRONICS,
      CategoryCode.MOBILES,
      /**src/shooping/store/data/trainings.ts:76:7 - error TS2345: Argument of type 'ImageSourcePropType' is not assignable to parameter of type 'string'.
  Type 'number' is not assignable to type 'string'.

76       accessoriesImage, */
      mobilesImage.toLocaleString(),
    );
  }

  static accessories(): Category {
    return new Category(
      'Accessories',
      CategoryType.ELECTRONICS,
      CategoryCode.ACCESSORIES,
      accessoriesImage.toLocaleString(),
    );
  }

  static mensWear(): Category {
    return new Category(
      "Men's Wear",
      CategoryType.MENSWEAR,
      CategoryCode.CLOTHINGS,
      clothingsImage,
    );
  }

  static books(): Category {
    return new Category(
      'Best Reads',
      CategoryType.BOOK,
      CategoryCode.BOOKS,
      booksImage,
    );
  }
}