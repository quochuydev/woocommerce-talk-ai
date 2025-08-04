import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="chat-widget-root chat-min-h-screen chat-bg-gray-50">
      {/* Navigation */}
      <nav className="chat-bg-white chat-shadow-sm chat-border-b chat-border-gray-200">
        <div className="chat-max-w-7xl chat-mx-auto chat-px-4 chat-sm:px-6 chat-lg:px-8">
          <div className="chat-flex chat-justify-between chat-h-16">
            <div className="chat-flex chat-items-center">
              <h1 className="chat-text-xl chat-font-bold chat-text-gray-900">
                WooCommerce Talk AI
              </h1>
            </div>
            <div className="chat-flex chat-items-center chat-space-x-4">
              <Link 
                to="/chat" 
                className="chat-button-primary"
              >
                Try Chat Demo
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="chat-max-w-7xl chat-mx-auto chat-px-4 chat-sm:px-6 chat-lg:px-8 chat-py-24">
        <div className="chat-text-center">
          <h1 className="chat-text-4xl chat-font-bold chat-tracking-tight chat-text-gray-900 chat-sm:text-6xl">
            Embeddable AI Chat Widget
          </h1>
          <p className="chat-mt-6 chat-text-lg chat-leading-8 chat-text-gray-600 chat-max-w-2xl chat-mx-auto">
            Add intelligent conversation capabilities to your WooCommerce store with our easy-to-embed chat widget. 
            Support customers, showcase products, and boost sales with AI-powered assistance.
          </p>
          <div className="chat-mt-10 chat-flex chat-items-center chat-justify-center chat-gap-x-6">
            <Link to="/chat" className="chat-button-primary chat-px-8 chat-py-3 chat-text-base">
              Live Demo
            </Link>
            <a href="#features" className="chat-text-sm chat-font-semibold chat-leading-6 chat-text-gray-900">
              Learn more <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="chat-py-24 chat-bg-white">
        <div className="chat-max-w-7xl chat-mx-auto chat-px-4 chat-sm:px-6 chat-lg:px-8">
          <div className="chat-text-center">
            <h2 className="chat-text-3xl chat-font-bold chat-tracking-tight chat-text-gray-900">
              Everything you need for customer engagement
            </h2>
            <p className="chat-mt-4 chat-text-lg chat-text-gray-600">
              Our chat widget integrates seamlessly with any website, providing rich conversation capabilities.
            </p>
          </div>
          
          <div className="chat-mt-20 chat-grid chat-grid-cols-1 chat-gap-8 chat-sm:grid-cols-2 chat-lg:grid-cols-3">
            {/* Feature 1 */}
            <div className="chat-relative chat-p-6">
              <div className="chat-flex chat-h-12 chat-w-12 chat-items-center chat-justify-center chat-rounded-lg chat-bg-primary-500">
                <span className="chat-text-white chat-font-bold">💬</span>
              </div>
              <h3 className="chat-mt-4 chat-text-lg chat-font-semibold chat-text-gray-900">Multi-format Messages</h3>
              <p className="chat-mt-2 chat-text-sm chat-text-gray-600">
                Support for text, images, audio, and product suggestion cards in conversations.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="chat-relative chat-p-6">
              <div className="chat-flex chat-h-12 chat-w-12 chat-items-center chat-justify-center chat-rounded-lg chat-bg-primary-500">
                <span className="chat-text-white chat-font-bold">🛒</span>
              </div>
              <h3 className="chat-mt-4 chat-text-lg chat-font-semibold chat-text-gray-900">WooCommerce Integration</h3>
              <p className="chat-mt-2 chat-text-sm chat-text-gray-600">
                Seamlessly integrate with WooCommerce to showcase products and handle customer inquiries.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="chat-relative chat-p-6">
              <div className="chat-flex chat-h-12 chat-w-12 chat-items-center chat-justify-center chat-rounded-lg chat-bg-primary-500">
                <span className="chat-text-white chat-font-bold">⚡</span>
              </div>
              <h3 className="chat-mt-4 chat-text-lg chat-font-semibold chat-text-gray-900">Easy Integration</h3>
              <p className="chat-mt-2 chat-text-sm chat-text-gray-600">
                Just add one script tag to embed the widget on any website - no complex setup required.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="chat-py-24 chat-bg-gray-50">
        <div className="chat-max-w-7xl chat-mx-auto chat-px-4 chat-sm:px-6 chat-lg:px-8">
          <div className="chat-text-center">
            <h2 className="chat-text-3xl chat-font-bold chat-tracking-tight chat-text-gray-900">
              Simple, transparent pricing
            </h2>
            <p className="chat-mt-4 chat-text-lg chat-text-gray-600">
              Choose the plan that's right for your business.
            </p>
          </div>
          
          <div className="chat-mt-16 chat-grid chat-grid-cols-1 chat-gap-8 chat-lg:grid-cols-2 chat-max-w-4xl chat-mx-auto">
            {/* Starter Plan */}
            <div className="chat-bg-white chat-rounded-lg chat-shadow-md chat-p-8">
              <h3 className="chat-text-xl chat-font-semibold chat-text-gray-900">Starter</h3>
              <p className="chat-mt-2 chat-text-3xl chat-font-bold chat-text-gray-900">
                $29<span className="chat-text-lg chat-font-normal chat-text-gray-600">/month</span>
              </p>
              <p className="chat-mt-2 chat-text-gray-600">Perfect for small businesses</p>
              <ul className="chat-mt-6 chat-space-y-3">
                <li className="chat-flex chat-items-center">
                  <span className="chat-text-green-500 chat-mr-2">✓</span>
                  Up to 1,000 conversations/month
                </li>
                <li className="chat-flex chat-items-center">
                  <span className="chat-text-green-500 chat-mr-2">✓</span>
                  Basic customization
                </li>
                <li className="chat-flex chat-items-center">
                  <span className="chat-text-green-500 chat-mr-2">✓</span>
                  Email support
                </li>
              </ul>
            </div>

            {/* Pro Plan */}
            <div className="chat-bg-white chat-rounded-lg chat-shadow-md chat-p-8 chat-border-2 chat-border-primary-500">
              <h3 className="chat-text-xl chat-font-semibold chat-text-gray-900">Pro</h3>
              <p className="chat-mt-2 chat-text-3xl chat-font-bold chat-text-gray-900">
                $99<span className="chat-text-lg chat-font-normal chat-text-gray-600">/month</span>
              </p>
              <p className="chat-mt-2 chat-text-gray-600">For growing businesses</p>
              <ul className="chat-mt-6 chat-space-y-3">
                <li className="chat-flex chat-items-center">
                  <span className="chat-text-green-500 chat-mr-2">✓</span>
                  Unlimited conversations
                </li>
                <li className="chat-flex chat-items-center">
                  <span className="chat-text-green-500 chat-mr-2">✓</span>
                  Advanced customization
                </li>
                <li className="chat-flex chat-items-center">
                  <span className="chat-text-green-500 chat-mr-2">✓</span>
                  Priority support
                </li>
                <li className="chat-flex chat-items-center">
                  <span className="chat-text-green-500 chat-mr-2">✓</span>
                  Analytics & insights
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="chat-py-24 chat-bg-white">
        <div className="chat-max-w-7xl chat-mx-auto chat-px-4 chat-sm:px-6 chat-lg:px-8">
          <div className="chat-text-center">
            <h2 className="chat-text-3xl chat-font-bold chat-tracking-tight chat-text-gray-900">
              What our customers say
            </h2>
          </div>
          
          <div className="chat-mt-16 chat-grid chat-grid-cols-1 chat-gap-8 chat-lg:grid-cols-3">
            {/* Review 1 */}
            <div className="chat-bg-gray-50 chat-rounded-lg chat-p-6">
              <div className="chat-flex chat-items-center chat-mb-4">
                <div className="chat-flex chat-text-yellow-400">
                  ★★★★★
                </div>
              </div>
              <p className="chat-text-gray-600 chat-mb-4">
                "The chat widget transformed our customer support. Easy to integrate and our customers love it!"
              </p>
              <p className="chat-text-sm chat-font-semibold chat-text-gray-900">
                Sarah Chen, TechStore
              </p>
            </div>

            {/* Review 2 */}
            <div className="chat-bg-gray-50 chat-rounded-lg chat-p-6">
              <div className="chat-flex chat-items-center chat-mb-4">
                <div className="chat-flex chat-text-yellow-400">
                  ★★★★★
                </div>
              </div>
              <p className="chat-text-gray-600 chat-mb-4">
                "Increased our conversion rate by 25%. The product suggestions feature is amazing!"
              </p>
              <p className="chat-text-sm chat-font-semibold chat-text-gray-900">
                Mike Johnson, FashionHub
              </p>
            </div>

            {/* Review 3 */}
            <div className="chat-bg-gray-50 chat-rounded-lg chat-p-6">
              <div className="chat-flex chat-items-center chat-mb-4">
                <div className="chat-flex chat-text-yellow-400">
                  ★★★★★
                </div>
              </div>
              <p className="chat-text-gray-600 chat-mb-4">
                "Simple setup, powerful features. Our customers get instant help 24/7."
              </p>
              <p className="chat-text-sm chat-font-semibold chat-text-gray-900">
                Lisa Wang, GadgetWorld
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="chat-bg-gray-900 chat-text-white chat-py-12">
        <div className="chat-max-w-7xl chat-mx-auto chat-px-4 chat-sm:px-6 chat-lg:px-8">
          <div className="chat-text-center">
            <h3 className="chat-text-lg chat-font-semibold">WooCommerce Talk AI</h3>
            <p className="chat-mt-2 chat-text-gray-400">
              Intelligent chat solutions for modern e-commerce
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}