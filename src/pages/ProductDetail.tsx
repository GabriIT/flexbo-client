
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';

// Mock product data
const productData = {
  'packaging-boxes': {
    title: 'Custom Packaging Boxes',
    description: 'Our custom packaging boxes are designed to protect your products while enhancing your brand identity. Available in various sizes, materials, and finishes.',
    features: [
      'Custom sizes and shapes',
      'Full-color printing options',
      'Various finishing options (matte, glossy, spot UV)',
      'Durable construction for product protection',
      'Eco-friendly material options available'
    ],
    image: 'https://images.unsplash.com/photo-1607928924720-0487abffb868?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1605640840605-14ac1855827b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1633520409170-3c6c5579a28a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
    ]
  },
  'pouches': {
    title: 'Flexible Pouches',
    description: 'Stand-up pouches and flexible packaging solutions for food, beverages, and non-food products. Our pouches provide excellent barrier protection and eye-catching shelf appeal.',
    features: [
      'Stand-up, flat, and shaped pouch options',
      'High barrier materials for product freshness',
      'Resealable options (zipper, slider)',
      'Custom printing with vibrant colors',
      'Food-safe materials'
    ],
    image: 'https://images.unsplash.com/photo-1616594716710-7f38c743ce4d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1629324482344-af56aa069b9c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1607804375955-ac24f6e1ffe9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
    ]
  },
  'labels': {
    title: 'Labels & Stickers',
    description: 'High-quality labels and stickers for product identification, branding, and information. Available in various materials, shapes, and adhesive options.',
    features: [
      'Custom shapes and sizes',
      'Waterproof and weather-resistant options',
      'Permanent and removable adhesives',
      'Matte, glossy, and specialty finishes',
      'Consecutive numbering and barcoding'
    ],
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1592811773343-9c6452aae8ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1565452344518-47faea74f585?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1620711973925-1ac998d27148?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
    ]
  },
  'bags': {
    title: 'Paper Bags',
    description: 'Eco-friendly paper bag solutions for retail, promotional, and gift packaging. Available in various sizes, paper weights, and handle options.',
    features: [
      'Customizable sizes and designs',
      'Multiple handle options (rope, flat, twisted)',
      'Kraft, white, and colored paper options',
      'Full-color printing and hot stamping',
      'Recyclable and biodegradable materials'
    ],
    image: 'https://images.unsplash.com/photo-1541099573105-d65712d92e01?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1572584642822-6f8de0243c93?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1611612222023-5388a7acbbf8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1594059867066-d14d43f15c43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
    ]
  },
};

const ProductDetail = () => {
  const { productId } = useParams();
  
  // If no productId or product not found, show default message
  const product = productId && productData[productId as keyof typeof productData]
    ? productData[productId as keyof typeof productData]
    : {
        title: 'Product Not Found',
        description: 'The requested product could not be found.',
        features: [],
        image: 'https://images.unsplash.com/photo-1607928924720-0487abffb868',
        gallery: []
      };

  return (
    <Layout>
      {/* Breadcrumb Navigation */}
      <div className="bg-gray-50 py-4 border-b">
        <div className="container">
          <nav className="flex">
            <Link to="/" className="text-sm text-gray-600 hover:text-flexbo-primary">Home</Link>
            <span className="mx-2 text-gray-500">/</span>
            <Link to="/products" className="text-sm text-gray-600 hover:text-flexbo-primary">Products</Link>
            <span className="mx-2 text-gray-500">/</span>
            <span className="text-sm text-flexbo-primary">{product.title}</span>
          </nav>
        </div>
      </div>

      {/* Product Hero Section */}
      <section className="py-12">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src={product.image}
                alt={product.title}
                className="rounded-lg shadow-lg w-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-flexbo-dark mb-4">{product.title}</h1>
              <p className="text-lg text-gray-700 mb-8">{product.description}</p>
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-3">Key Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-6 w-6 text-flexbo-primary mr-2 flex-shrink-0" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-flexbo-primary hover:bg-flexbo-primary/90">
                  <Link to="/contact">Request a Quote</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <a href="tel:+15551234567">Call for Details</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Gallery */}
      {product.gallery.length > 0 && (
        <section className="py-12 bg-gray-50">
          <div className="container">
            <h2 className="text-2xl font-bold text-flexbo-dark mb-8 text-center">Product Gallery</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {product.gallery.map((image, index) => (
                <div key={index} className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow">
                  <img
                    src={image}
                    alt={`${product.title} - Gallery Image ${index + 1}`}
                    className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Products Section */}
      <section className="py-12">
        <div className="container">
          <h2 className="text-2xl font-bold text-flexbo-dark mb-8 text-center">Related Products</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(productData)
              .filter(([key]) => key !== productId)
              .slice(0, 3)
              .map(([key, relatedProduct]) => (
                <div key={key} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                  <img
                    src={relatedProduct.image}
                    alt={relatedProduct.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">{relatedProduct.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{relatedProduct.description}</p>
                    <Button asChild variant="outline" className="w-full">
                      <Link to={`/products/${key}`}>Learn More</Link>
                    </Button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-flexbo-secondary">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-flexbo-dark">Ready to Get Started?</h2>
            <p className="text-gray-700 mb-8">
              Contact our team today to discuss your specific packaging needs and get a customized solution for your business.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="bg-flexbo-primary hover:bg-flexbo-primary/90">
                <Link to="/contact">Request a Quote</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/products">View All Products</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProductDetail;
