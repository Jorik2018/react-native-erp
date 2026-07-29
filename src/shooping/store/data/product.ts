import productImage from '../../assets/products/image-product-1.png';
import profileImage from '../../assets/image-profile.jpg';

export class ProductDetail {
  title: string;
  subtitle: string;
  description: string;
  price: string;
  image: string;
  size: string;
  colors: ProductColor[];
  comments: Comment[];

  constructor(
    title: string,
    subtitle: string,
    description: string,
    price: string,
    image: string,
    size: string,
    colors: ProductColor[],
    comments: Comment[],
  ) {
    this.title = title;
    this.subtitle = subtitle;
    this.description = description;
    this.price = price;
    this.image = image;
    this.size = size;
    this.colors = colors;
    this.comments = comments;
  }

  static pinkChair(): ProductDetail {
    return new ProductDetail(
      'Pink Chair',
      'Furniture',
      'The Vitra Plastic Side Chairs are undoubtedly an absolute classic when it comes to the living area. The unusual mix of a plastic seat shell and wooden frame has since become a source of inspiration for many designers.',
      '$150',
      productImage,
      'H:80cm W:50cm D:40cm',
      [
        ProductColor.blue(),
        ProductColor.pink(),
        ProductColor.orange(),
      ],
      [Comment.byHubertFranck()],
    );
  }
}

export class ProductColor {
  value: string;
  description: string;

  constructor(
    value: string,
    description: string,
  ) {
    this.value = value;
    this.description = description;
  }

  static blue(): ProductColor {
    return new ProductColor(
      '#3366FF',
      'Blue',
    );
  }

  static pink(): ProductColor {
    return new ProductColor(
      '#FF708D',
      'Pink',
    );
  }

  static orange(): ProductColor {
    return new ProductColor(
      '#FFC94D',
      'Orange',
    );
  }
}

export class Profile {
  firstName: string;
  lastName: string;
  photo: string;

  constructor(
    firstName: string,
    lastName: string,
    photo: string,
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.photo = photo;
  }

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  static markVolter(): Profile {
    return new Profile(
      'Mark',
      'Volter',
      profileImage,
    );
  }

  static hubertFranck(): Profile {
    return new Profile(
      'Hubert',
      'Franck',
      profileImage,
    );
  }
}

export class Comment {
  text: string;
  date: string;
  author: Profile;
  comments: Comment[];

  constructor(
    text: string,
    date: string,
    author: Profile,
    comments: Comment[],
  ) {
    this.text = text;
    this.date = date;
    this.author = author;
    this.comments = comments;
  }

  static byHubertFranck(): Comment {
    return new Comment(
      'The chair has a good quality!',
      'Today 11:10 am',
      Profile.hubertFranck(),
      [Comment.byMarkVolter()],
    );
  }

  static byMarkVolter(): Comment {
    return new Comment(
      'Yes! I agree with you',
      'Today 11:10 am',
      Profile.markVolter(),
      [],
    );
  }
}