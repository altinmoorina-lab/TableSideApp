import { Product, products as seedProducts } from '@/lib/products';

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
};

export type Favorite = {
  id: string;
  userEmail: string;
  productId: string;
  createdAt: string;
};

export type Review = {
  id: string;
  productId: string;
  author: string;
  rating: number;
  comment: string;
  createdAt: string;
};

const state = globalThis as typeof globalThis & {
  techhubProducts?: Product[];
  techhubFavorites?: Favorite[];
  techhubMessages?: ContactMessage[];
  techhubReviews?: Review[];
};

state.techhubProducts ??= [...seedProducts];
state.techhubFavorites ??= [];
state.techhubMessages ??= [];
state.techhubReviews ??= [
  {
    id: 'rev-1',
    productId: 'prod-1',
    author: 'Demo User',
    rating: 5,
    comment: 'Perfect for university work and travel.',
    createdAt: new Date().toISOString(),
  },
];

export function listProducts() {
  return state.techhubProducts!;
}

export function findProduct(idOrSlug: string) {
  return listProducts().find((product) => product.id === idOrSlug || product.slug === idOrSlug);
}

export function createProduct(input: Omit<Product, 'id' | 'slug'> & { slug?: string }) {
  const id = `prod-${Date.now()}`;
  const slug = input.slug || input.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const product = { ...input, id, slug };
  state.techhubProducts = [product, ...listProducts()];
  return product;
}

export function updateProduct(id: string, input: Partial<Product>) {
  let updated: Product | null = null;
  state.techhubProducts = listProducts().map((product) => {
    if (product.id !== id) return product;
    updated = { ...product, ...input };
    return updated;
  });
  return updated;
}

export function deleteProduct(id: string) {
  const before = listProducts().length;
  state.techhubProducts = listProducts().filter((product) => product.id !== id);
  return state.techhubProducts.length < before;
}

export function listFavorites(userEmail: string) {
  return state.techhubFavorites!.filter((favorite) => favorite.userEmail === userEmail);
}

export function toggleFavorite(userEmail: string, productId: string) {
  const existing = state.techhubFavorites!.find(
    (favorite) => favorite.userEmail === userEmail && favorite.productId === productId,
  );

  if (existing) {
    state.techhubFavorites = state.techhubFavorites!.filter((favorite) => favorite.id !== existing.id);
    return { favorited: false };
  }

  state.techhubFavorites!.push({
    id: `fav-${Date.now()}`,
    userEmail,
    productId,
    createdAt: new Date().toISOString(),
  });
  return { favorited: true };
}

export function createContactMessage(input: Omit<ContactMessage, 'id' | 'createdAt'>) {
  const message = {
    ...input,
    id: `msg-${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  state.techhubMessages = [message, ...state.techhubMessages!];
  return message;
}

export function listReviews(productId?: string) {
  return productId
    ? state.techhubReviews!.filter((review) => review.productId === productId)
    : state.techhubReviews!;
}

export function createReview(input: Omit<Review, 'id' | 'createdAt'>) {
  const review = {
    ...input,
    id: `rev-${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  state.techhubReviews = [review, ...state.techhubReviews!];
  return review;
}

export function updateReview(id: string, input: Partial<Pick<Review, 'author' | 'rating' | 'comment'>>) {
  let updated: Review | null = null;
  state.techhubReviews = state.techhubReviews!.map((review) => {
    if (review.id !== id) return review;
    updated = { ...review, ...input };
    return updated;
  });
  return updated;
}

export function deleteReview(id: string) {
  const before = state.techhubReviews!.length;
  state.techhubReviews = state.techhubReviews!.filter((review) => review.id !== id);
  return state.techhubReviews.length < before;
}

type ProductRecord = Product & { _id?: unknown };

const seedImageBySlug = new Map(seedProducts.map((product) => [product.slug, product.image]));

function normalizeProduct(product: ProductRecord) {
  const slug = product.slug;
  const seedImage = seedImageBySlug.get(slug);
  const image = seedImage || product.image;

  return {
    id: product.id || String(product._id || `prod-${Date.now()}`),
    slug,
    name: product.name,
    brand: product.brand,
    category: product.category,
    price: product.price,
    stock: product.stock,
    rating: product.rating,
    image: image || `/products/${slug}.jpg`,
    featured: product.featured,
    description: product.description,
    specs: product.specs || [],
  };
}

function productIdentityQuery(idOrSlug: string) {
  const clauses: Record<string, string>[] = [{ id: idOrSlug }, { slug: idOrSlug }];
  if (/^[a-f\d]{24}$/i.test(idOrSlug)) {
    clauses.push({ _id: idOrSlug });
  }
  return { $or: clauses };
}

async function connectIfConfigured() {
  if (!process.env.MONGODB_URI) return null;

  const { connectToDatabase } = await import('@/lib/mongodb');
  return connectToDatabase();
}

export async function listProductsData() {
  const db = await connectIfConfigured();
  if (!db) return listProducts();

  const { default: ProductModel } = await import('@/models/Product');
  const count = await ProductModel.countDocuments();
  if (count === 0) {
    await ProductModel.insertMany(seedProducts);
  }

  const products = await ProductModel.find().sort({ createdAt: -1 }).lean();
  return products.map((product) => normalizeProduct(product as unknown as ProductRecord));
}

export async function findProductData(idOrSlug: string) {
  const db = await connectIfConfigured();
  if (!db) return findProduct(idOrSlug);

  const { default: ProductModel } = await import('@/models/Product');
  const product = await ProductModel.findOne(productIdentityQuery(idOrSlug)).lean();
  return product ? normalizeProduct(product as unknown as ProductRecord) : null;
}

export async function createProductData(input: Omit<Product, 'id' | 'slug'> & { slug?: string }) {
  const db = await connectIfConfigured();
  if (!db) return createProduct(input);

  const { default: ProductModel } = await import('@/models/Product');
  const slug = input.slug || input.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const product = await ProductModel.create({ ...input, slug });
  return normalizeProduct(product.toObject() as unknown as ProductRecord);
}

export async function updateProductData(id: string, input: Partial<Product>) {
  const db = await connectIfConfigured();
  if (!db) return updateProduct(id, input);

  const { default: ProductModel } = await import('@/models/Product');
  const product = await ProductModel.findOneAndUpdate(productIdentityQuery(id), input, { new: true }).lean();
  return product ? normalizeProduct(product as unknown as ProductRecord) : null;
}

export async function deleteProductData(id: string) {
  const db = await connectIfConfigured();
  if (!db) return deleteProduct(id);

  const { default: ProductModel } = await import('@/models/Product');
  const result = await ProductModel.deleteOne(productIdentityQuery(id));
  return result.deletedCount > 0;
}

export async function createContactMessageData(input: Omit<ContactMessage, 'id' | 'createdAt'>) {
  const db = await connectIfConfigured();
  if (!db) return createContactMessage(input);

  const { default: ContactMessageModel } = await import('@/models/ContactMessage');
  const message = await ContactMessageModel.create(input);
  return { id: message._id.toString(), name: message.name, email: message.email, message: message.message, createdAt: message.createdAt.toISOString() };
}

export async function listFavoritesData(userEmail: string) {
  const db = await connectIfConfigured();
  if (!db) return listFavorites(userEmail);

  const { default: FavoriteModel } = await import('@/models/Favorite');
  const favorites = await FavoriteModel.find({ userEmail }).lean();
  return favorites.map((favorite) => ({
    id: String(favorite._id),
    userEmail: favorite.userEmail,
    productId: favorite.productId,
    createdAt: favorite.createdAt.toISOString(),
  }));
}

export async function toggleFavoriteData(userEmail: string, productId: string) {
  const db = await connectIfConfigured();
  if (!db) return toggleFavorite(userEmail, productId);

  const { default: FavoriteModel } = await import('@/models/Favorite');
  const existing = await FavoriteModel.findOne({ userEmail, productId });
  if (existing) {
    await existing.deleteOne();
    return { favorited: false };
  }

  await FavoriteModel.create({ userEmail, productId });
  return { favorited: true };
}

export async function listReviewsData(productId?: string) {
  const db = await connectIfConfigured();
  if (!db) return listReviews(productId);

  const { default: ReviewModel } = await import('@/models/Review');
  const reviews = await ReviewModel.find(productId ? { productId } : {}).sort({ createdAt: -1 }).lean();
  return reviews.map((review) => ({
    id: String(review._id),
    productId: review.productId,
    author: review.author,
    rating: review.rating,
    comment: review.comment,
    createdAt: review.createdAt.toISOString(),
  }));
}

export async function createReviewData(input: Omit<Review, 'id' | 'createdAt'>) {
  const db = await connectIfConfigured();
  if (!db) return createReview(input);

  const { default: ReviewModel } = await import('@/models/Review');
  const review = await ReviewModel.create(input);
  return {
    id: review._id.toString(),
    productId: review.productId,
    author: review.author,
    rating: review.rating,
    comment: review.comment,
    createdAt: review.createdAt.toISOString(),
  };
}

export async function updateReviewData(id: string, input: Partial<Pick<Review, 'author' | 'rating' | 'comment'>>) {
  const db = await connectIfConfigured();
  if (!db) return updateReview(id, input);

  const { default: ReviewModel } = await import('@/models/Review');
  const query = /^[a-f\d]{24}$/i.test(id) ? { _id: id } : { id };
  const review = (await ReviewModel.findOneAndUpdate(query, input, { new: true }).lean()) as
    | {
        _id: unknown;
        productId: string;
        author: string;
        rating: number;
        comment: string;
        createdAt: Date;
      }
    | null;

  return review
    ? {
        id: String(review._id),
        productId: review.productId,
        author: review.author,
        rating: review.rating,
        comment: review.comment,
        createdAt: review.createdAt.toISOString(),
      }
    : null;
}

export async function deleteReviewData(id: string) {
  const db = await connectIfConfigured();
  if (!db) return deleteReview(id);

  const { default: ReviewModel } = await import('@/models/Review');
  const query = /^[a-f\d]{24}$/i.test(id) ? { _id: id } : { id };
  const result = await ReviewModel.deleteOne(query);
  return result.deletedCount > 0;
}

export async function createUserData(input: { name: string; email: string; passwordHash: string }) {
  const db = await connectIfConfigured();
  if (!db) {
    return { id: `user-${Date.now()}`, ...input, role: 'user' };
  }

  const { default: UserModel } = await import('@/models/User');
  const user = await UserModel.create({ ...input, role: 'user' });
  return { id: user._id.toString(), name: user.name, email: user.email, role: user.role };
}
