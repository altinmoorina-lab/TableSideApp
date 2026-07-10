import { Button } from '@/components/button';
import { authOptions } from '@/lib/auth';
import { Product, ProductCategory } from '@/lib/products';
import { listProductsData, listReviewsData, Review } from '@/lib/store';
import type { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import { useState } from 'react';
import { useRouter } from 'next/router';

type AdminProps = {
  initialProducts: Product[];
  initialReviews: Review[];
};

const emptyProduct = {
  name: '',
  brand: '',
  category: 'Accessories' as ProductCategory,
  price: 0,
  stock: 0,
  rating: 4.5,
  image: '',
  featured: false,
  description: '',
  specs: '',
};

const emptyReview = {
  id: '',
  author: '',
  rating: 5,
  comment: '',
};

export default function Admin({ initialProducts, initialReviews }: AdminProps) {
  const router = useRouter();
  const [products, setProducts] = useState(initialProducts);
  const [reviews, setReviews] = useState(initialReviews);
  const [editing, setEditing] = useState<Product | null>(null);
  const [editingReviewId, setEditingReviewId] = useState('');
  const [form, setForm] = useState(emptyProduct);
  const [reviewForm, setReviewForm] = useState(emptyReview);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  function newProduct() {
    setEditing(null);
    setForm(emptyProduct);
    setShowForm(true);
    setMessage('');
    setError('');
  }

  const productNameById = new Map(products.map((product) => [product.id, product.name]));

  function editProduct(product: Product) {
    setEditing(product);
    setForm({ ...product, specs: product.specs.join(', ') });
    setShowForm(true);
    setMessage('');
    setError('');
  }

  function closeForm() {
    setEditing(null);
    setForm(emptyProduct);
    setShowForm(false);
    setError('');
  }

  function editReview(review: Review) {
    setEditingReviewId(review.id);
    setReviewForm({
      id: review.id,
      author: review.author,
      rating: review.rating,
      comment: review.comment,
    });
    setMessage('');
    setError('');
  }

  function closeReviewForm() {
    setEditingReviewId('');
    setReviewForm(emptyReview);
    setError('');
  }

  async function saveProduct(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');

    const payload = {
      ...form,
      image: form.image.trim(),
      specs: form.specs.split(',').map((item) => item.trim()).filter(Boolean),
    };
    const response = await fetch(editing ? `/api/products/${editing.id}` : '/api/products', {
      method: editing ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await response.json();

    if (!response.ok) {
      setError(data.message || 'Could not save product. Please check the fields and try again.');
      return;
    }

    if (editing) {
      setProducts((current) => current.map((product) => (product.id === editing.id ? data.product : product)));
      setMessage(`${data.product.name} updated successfully.`);
    } else {
      setProducts((current) => [data.product, ...current]);
      setMessage(`${data.product.name} created successfully.`);
    }

    closeForm();
    router.replace(router.asPath);
  }

  async function removeProduct(productId: string) {
    const response = await fetch(`/api/products/${productId}`, { method: 'DELETE' });
    if (response.ok) {
      setProducts((current) => current.filter((product) => product.id !== productId));
      setMessage('Product deleted.');
      router.replace(router.asPath);
    }
  }

  async function saveReview(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');

    const response = await fetch(`/api/reviews/${editingReviewId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        author: reviewForm.author.trim(),
        rating: reviewForm.rating,
        comment: reviewForm.comment.trim(),
      }),
    });
    const data = await response.json();

    if (!response.ok) {
      setError(data.message || 'Could not update review.');
      return;
    }

    setReviews((current) => current.map((review) => (review.id === editingReviewId ? data.review : review)));
    setMessage('Review updated successfully.');
    closeReviewForm();
  }

  async function removeReview(reviewId: string) {
    const response = await fetch(`/api/reviews/${reviewId}`, { method: 'DELETE' });
    if (response.ok) {
      setReviews((current) => current.filter((review) => review.id !== reviewId));
      setMessage('Review deleted successfully.');
      closeReviewForm();
    }
  }

  return (
    <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12">
      <div className="flex flex-wrap items-end justify-between gap-4 rounded-lg bg-slate-950 p-8 text-white shadow-soft">
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-emerald-300">Admin Panel</p>
          <h1 className="mt-2 text-4xl font-black">Manage product catalog</h1>
          <p className="mt-3 max-w-2xl text-slate-300">Create, update, and delete product records from one protected admin workspace.</p>
        </div>
        <Button onClick={newProduct}>New product</Button>
      </div>
      {message && <p className="rounded-lg bg-emerald-50 p-3 text-sm font-semibold text-emerald-700">{message}</p>}
      {error && <p className="rounded-lg bg-rose-50 p-3 text-sm font-semibold text-rose-700">{error}</p>}
      {showForm ? (
        <form className="grid gap-4 rounded-lg border border-blue-100 bg-white p-6 shadow-soft md:grid-cols-2" onSubmit={saveProduct}>
          <div className="md:col-span-2">
            <p className="text-sm font-bold uppercase tracking-wide text-tech">{editing ? 'Edit Product' : 'Create Product'}</p>
            <h2 className="mt-1 text-2xl font-black text-ink">{editing ? editing.name : 'New catalog item'}</h2>
          </div>
          <label className="grid gap-2 text-sm font-bold text-slate-700">
            Product name
            <input
              className="rounded-lg border border-slate-300 px-3 py-2 font-normal"
              value={form.name}
              onChange={(event) => setForm({ ...form, name: event.target.value })}
              required
            />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-700">
            Brand
            <input
              className="rounded-lg border border-slate-300 px-3 py-2 font-normal"
              value={form.brand}
              onChange={(event) => setForm({ ...form, brand: event.target.value })}
              required
            />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-700">
            Category
            <select
              className="rounded-lg border border-slate-300 px-3 py-2 font-normal"
              value={form.category}
              onChange={(event) => setForm({ ...form, category: event.target.value as ProductCategory })}>
              {['Laptops', 'Accessories', 'Displays', 'Audio', 'Gaming', 'Storage'].map((category) => (
                <option key={category}>{category}</option>
              ))}
            </select>
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-700">
            Price
            <input
              type="number"
              className="rounded-lg border border-slate-300 px-3 py-2 font-normal"
              value={form.price}
              onChange={(event) => setForm({ ...form, price: Number(event.target.value) })}
              required
            />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-700">
            Stock
            <input
              type="number"
              className="rounded-lg border border-slate-300 px-3 py-2 font-normal"
              value={form.stock}
              onChange={(event) => setForm({ ...form, stock: Number(event.target.value) })}
              required
            />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-700">
            Image URL
            <input
              className="rounded-lg border border-slate-300 px-3 py-2 font-normal"
              value={form.image}
              onChange={(event) => setForm({ ...form, image: event.target.value })}
            />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-700 md:col-span-2">
            Description
            <textarea
              className="min-h-24 rounded-lg border border-slate-300 px-3 py-2 font-normal"
              value={form.description}
              onChange={(event) => setForm({ ...form, description: event.target.value })}
              required
            />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-700 md:col-span-2">
            Specs
            <input
              className="rounded-lg border border-slate-300 px-3 py-2 font-normal"
              placeholder="Separate specs with commas"
              value={form.specs}
              onChange={(event) => setForm({ ...form, specs: event.target.value })}
            />
          </label>
          <label className="flex items-center gap-2 text-sm font-bold text-slate-700">
            <input type="checkbox" checked={form.featured} onChange={(event) => setForm({ ...form, featured: event.target.checked })} />
            Featured
          </label>
          <div className="flex flex-wrap justify-end gap-3 md:col-span-2">
            <Button type="button" variant="secondary" onClick={closeForm}>
              Cancel
            </Button>
            <Button>{editing ? 'Update product' : 'Create product'}</Button>
          </div>
        </form>
      ) : (
        <div className="rounded-lg border border-dashed border-slate-300 bg-white p-6 text-sm text-slate-600">
          Click <strong>New product</strong> to create an item, or <strong>Edit</strong> in the table to update an existing product.
        </div>
      )}
      <div className="overflow-hidden rounded-lg bg-white shadow-sm">
        <div className="border-b border-slate-100 p-5">
          <p className="text-sm font-bold uppercase tracking-wide text-tech">Product CRUD</p>
          <h2 className="text-2xl font-black text-ink">Products</h2>
        </div>
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="bg-slate-100 text-slate-600">
            <tr>
              <th className="p-3">Product</th>
              <th className="p-3">Category</th>
              <th className="p-3">Price</th>
              <th className="p-3">Stock</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-t border-slate-100">
                <td className="p-3 font-semibold">{product.name}</td>
                <td className="p-3">{product.category}</td>
                <td className="p-3">${product.price}</td>
                <td className="p-3">{product.stock}</td>
                <td className="flex gap-2 p-3">
                  <Button variant="secondary" onClick={() => editProduct(product)}>
                    Edit
                  </Button>
                  <Button variant="danger" onClick={() => removeProduct(product.id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <section className="grid gap-4 rounded-lg bg-white p-6 shadow-sm">
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-tech">Review CRUD</p>
          <h2 className="text-2xl font-black text-ink">Product reviews</h2>
          <p className="mt-2 text-sm text-slate-600">
            Reviews are created on product detail pages. Admins can read, update, and delete them here.
          </p>
        </div>
        {editingReviewId && (
          <form className="grid gap-4 rounded-lg border border-blue-100 bg-slate-50 p-4 md:grid-cols-2" onSubmit={saveReview}>
            <label className="grid gap-2 text-sm font-bold text-slate-700">
              Author
              <input
                className="rounded-lg border border-slate-300 px-3 py-2 font-normal"
                value={reviewForm.author}
                onChange={(event) => setReviewForm({ ...reviewForm, author: event.target.value })}
                required
              />
            </label>
            <label className="grid gap-2 text-sm font-bold text-slate-700">
              Rating
              <select
                className="rounded-lg border border-slate-300 px-3 py-2 font-normal"
                value={reviewForm.rating}
                onChange={(event) => setReviewForm({ ...reviewForm, rating: Number(event.target.value) })}>
                {[5, 4, 3, 2, 1].map((rating) => (
                  <option key={rating} value={rating}>
                    {rating}
                  </option>
                ))}
              </select>
            </label>
            <label className="grid gap-2 text-sm font-bold text-slate-700 md:col-span-2">
              Comment
              <textarea
                className="min-h-24 rounded-lg border border-slate-300 px-3 py-2 font-normal"
                value={reviewForm.comment}
                onChange={(event) => setReviewForm({ ...reviewForm, comment: event.target.value })}
                required
              />
            </label>
            <div className="flex justify-end gap-3 md:col-span-2">
              <Button type="button" variant="secondary" onClick={closeReviewForm}>
                Cancel
              </Button>
              <Button>Update review</Button>
            </div>
          </form>
        )}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-slate-100 text-slate-600">
              <tr>
                <th className="p-3">Product</th>
                <th className="p-3">Author</th>
                <th className="p-3">Rating</th>
                <th className="p-3">Comment</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reviews.length === 0 && (
                <tr>
                  <td className="p-3 text-slate-500" colSpan={5}>
                    No reviews yet.
                  </td>
                </tr>
              )}
              {reviews.map((review) => (
                <tr key={review.id} className="border-t border-slate-100">
                  <td className="p-3 font-semibold">{productNameById.get(review.productId) || review.productId}</td>
                  <td className="p-3">{review.author}</td>
                  <td className="p-3">{review.rating}/5</td>
                  <td className="max-w-md p-3">{review.comment}</td>
                  <td className="flex gap-2 p-3">
                    <Button variant="secondary" onClick={() => editReview(review)}>
                      Edit
                    </Button>
                    <Button variant="danger" onClick={() => removeReview(review.id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </section>
  );
}

export const getServerSideProps: GetServerSideProps<AdminProps> = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session || session.user.role !== 'admin') {
    return { redirect: { destination: '/login', permanent: false } };
  }

  return {
    props: {
      initialProducts: await listProductsData(),
      initialReviews: await listReviewsData(),
    },
  };
};
