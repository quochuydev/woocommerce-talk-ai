import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="chat-widget-root chat-min-h-screen chat-bg-white">
      {/* Navigation */}
      <nav className="chat-bg-white chat-shadow-sm chat-border-b chat-border-gray-100">
        <div className="chat-max-w-7xl chat-mx-auto chat-px-4 chat-sm:px-6 chat-lg:px-8">
          <div className="chat-flex chat-justify-between chat-h-16">
            <div className="chat-flex chat-items-center chat-space-x-3">
              <div className="chat-w-8 chat-h-8 chat-bg-primary-500 chat-rounded-lg chat-flex chat-items-center chat-justify-center">
                <svg className="chat-w-5 chat-h-5 chat-text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 3.04 1.05 4.35L2 22l5.65-1.05C9.96 21.64 11.46 22 13 22h7c1.1 0 2-.9 2-2V12c0-5.52-4.48-10-10-10zm0 18c-1.1 0-2.18-.25-3.15-.74L3 20l.74-5.85C3.25 13.18 3 12.1 3 11c0-4.97 4.03-9 9-9s9 4.03 9 9-4.03 9-9 9z"/>
                </svg>
              </div>
              <h1 className="chat-text-xl chat-font-bold chat-text-gray-900">
                TalkAI
              </h1>
            </div>
            <div className="chat-flex chat-items-center chat-space-x-4">
              <Link 
                to="/chat" 
                className="chat-bg-primary-500 hover:chat-bg-primary-600 chat-text-white chat-px-6 chat-py-2 chat-rounded-lg chat-text-sm chat-font-medium chat-transition-colors"
              >
                Try Live Demo
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="chat-max-w-7xl chat-mx-auto chat-px-4 chat-sm:px-6 chat-lg:px-8 chat-py-12">
        <div className="chat-grid chat-lg:grid-cols-2 chat-gap-8 chat-items-center">
          {/* Left Content */}
          <div>
            <div className="chat-inline-flex chat-items-center chat-px-3 chat-py-1 chat-rounded-full chat-bg-primary-50 chat-text-primary-600 chat-text-sm chat-font-medium chat-mb-4">
              <span className="chat-mr-2">🚀</span>
              WooCommerce Ready
            </div>
            <h1 className="chat-text-3xl chat-font-bold chat-tracking-tight chat-text-gray-900 chat-lg:text-4xl">
              AI Chat Widget for Your Website
            </h1>
            <p className="chat-mt-4 chat-text-lg chat-text-gray-600">
              Just like <span className="chat-font-semibold chat-text-primary-600">Tawk.to</span>, but smarter. 
              Add our AI-powered chat widget with one script tag.
            </p>
            
            {/* Key Features */}
            <div className="chat-mt-6 chat-grid chat-grid-cols-1 chat-gap-2">
              <div className="chat-flex chat-items-center chat-space-x-3">
                <div className="chat-w-5 chat-h-5 chat-bg-green-100 chat-rounded-full chat-flex chat-items-center chat-justify-center">
                  <svg className="chat-w-3 chat-h-3 chat-text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                </div>
                <span className="chat-text-sm chat-text-gray-700">One-line installation • AI responses • WooCommerce integration</span>
              </div>
            </div>

            <div className="chat-mt-6 chat-flex chat-items-center chat-space-x-4">
              <Link 
                to="/chat" 
                className="chat-bg-primary-500 hover:chat-bg-primary-600 chat-text-white chat-px-6 chat-py-2 chat-rounded-lg chat-text-sm chat-font-medium chat-transition-colors chat-shadow-lg"
              >
                Try Live Demo
              </Link>
              <a href="#integration" className="chat-text-primary-600 hover:chat-text-primary-700 chat-font-medium chat-text-sm">
                See Integration →
              </a>
            </div>
          </div>

          {/* Right Visual */}
          <div className="chat-relative">
            <div className="chat-bg-gray-50 chat-rounded-xl chat-p-4 chat-shadow-lg">
              {/* Browser Mock */}
              <div className="chat-bg-white chat-rounded-lg chat-shadow-lg chat-overflow-hidden">
                <div className="chat-flex chat-items-center chat-px-3 chat-py-2 chat-bg-gray-100 chat-border-b">
                  <div className="chat-flex chat-space-x-1">
                    <div className="chat-w-2 chat-h-2 chat-rounded-full chat-bg-red-400"></div>
                    <div className="chat-w-2 chat-h-2 chat-rounded-full chat-bg-yellow-400"></div>
                    <div className="chat-w-2 chat-h-2 chat-rounded-full chat-bg-green-400"></div>
                  </div>
                  <div className="chat-flex-1 chat-text-center">
                    <div className="chat-bg-white chat-rounded chat-px-2 chat-py-1 chat-text-xs chat-text-gray-600 chat-mx-4">
                      yourstore.com
                    </div>
                  </div>
                </div>
                <div className="chat-p-4 chat-bg-gradient-to-br chat-from-blue-50 chat-to-purple-50 chat-h-32 chat-relative">
                  <div className="chat-text-center chat-text-gray-500 chat-mt-8 chat-text-sm">
                    Your Website Content
                  </div>
                  
                  {/* Chat Widget Floating */}
                  <div className="chat-absolute chat-bottom-2 chat-right-2">
                    <div className="chat-bg-primary-500 hover:chat-bg-primary-600 chat-w-10 chat-h-10 chat-rounded-full chat-flex chat-items-center chat-justify-center chat-shadow-lg chat-cursor-pointer chat-transition-all chat-animate-bounce-slow">
                      <svg className="chat-w-5 chat-h-5 chat-text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 3.04 1.05 4.35L2 22l5.65-1.05C9.96 21.64 11.46 22 13 22h7c1.1 0 2-.9 2-2V12c0-5.52-4.48-10-10-10z"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Integration Section */}
      <div id="integration" className="chat-py-16 chat-bg-gray-50">
        <div className="chat-max-w-4xl chat-mx-auto chat-px-4 chat-sm:px-6 chat-lg:px-8">
          <div className="chat-text-center chat-mb-8">
            <h2 className="chat-text-2xl chat-font-bold chat-tracking-tight chat-text-gray-900">
              Simple Integration
            </h2>
            <p className="chat-mt-2 chat-text-gray-600">
              Add to your website in under 60 seconds
            </p>
          </div>

          <div className="chat-bg-gray-900 chat-rounded-xl chat-p-4 chat-overflow-x-auto">
            <div className="chat-flex chat-items-center chat-justify-between chat-mb-3">
              <div className="chat-flex chat-items-center chat-space-x-1">
                <div className="chat-w-2 chat-h-2 chat-rounded-full chat-bg-red-500"></div>
                <div className="chat-w-2 chat-h-2 chat-rounded-full chat-bg-yellow-500"></div>
                <div className="chat-w-2 chat-h-2 chat-rounded-full chat-bg-green-500"></div>
              </div>
              <span className="chat-text-gray-400 chat-text-xs">HTML</span>
            </div>
            <pre className="chat-text-green-400 chat-text-xs chat-leading-relaxed">
{`<!-- Add this script to your website -->
<script src="https://cdn.talkai.com/widget.js"></script>
<script>TalkAI.init({ apiKey: 'your-api-key' });</script>`}
            </pre>
          </div>

          <div className="chat-mt-8 chat-grid chat-grid-cols-3 chat-gap-6">
            <div className="chat-text-center">
              <div className="chat-w-10 chat-h-10 chat-bg-primary-100 chat-rounded-lg chat-flex chat-items-center chat-justify-center chat-mx-auto">
                <svg className="chat-w-5 chat-h-5 chat-text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="chat-mt-3 chat-text-sm chat-font-semibold chat-text-gray-900">1. Copy Script</h3>
              <p className="chat-mt-1 chat-text-xs chat-text-gray-600">Copy script to website</p>
            </div>
            
            <div className="chat-text-center">
              <div className="chat-w-10 chat-h-10 chat-bg-primary-100 chat-rounded-lg chat-flex chat-items-center chat-justify-center chat-mx-auto">
                <svg className="chat-w-5 chat-h-5 chat-text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="chat-mt-3 chat-text-sm chat-font-semibold chat-text-gray-900">2. Configure</h3>
              <p className="chat-mt-1 chat-text-xs chat-text-gray-600">Customize appearance</p>
            </div>
            
            <div className="chat-text-center">
              <div className="chat-w-10 chat-h-10 chat-bg-primary-100 chat-rounded-lg chat-flex chat-items-center chat-justify-center chat-mx-auto">
                <svg className="chat-w-5 chat-h-5 chat-text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="chat-mt-3 chat-text-sm chat-font-semibold chat-text-gray-900">3. Go Live</h3>
              <p className="chat-mt-1 chat-text-xs chat-text-gray-600">Widget ready to use</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features, Pricing & Reviews - All Horizontal */}
      <div className="chat-py-12 chat-bg-white">
        <div className="chat-max-w-7xl chat-mx-auto chat-px-4 chat-sm:px-6 chat-lg:px-8">
          
          {/* Features Row */}
          <div className="chat-mb-12">
            <h2 className="chat-text-xl chat-font-bold chat-text-center chat-text-gray-900 chat-mb-6">
              Features • Pricing • Reviews
            </h2>
            
            <div className="chat-grid chat-grid-cols-3 chat-gap-4 chat-mb-8">
              {/* Feature 1 */}
              <div className="chat-text-center chat-p-3 chat-border chat-border-gray-100 chat-rounded-lg">
                <div className="chat-w-8 chat-h-8 chat-bg-primary-100 chat-rounded-lg chat-flex chat-items-center chat-justify-center chat-mx-auto chat-mb-2">
                  <svg className="chat-w-4 chat-h-4 chat-text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="chat-text-sm chat-font-semibold chat-text-gray-900">Rich Messages</h3>
                <p className="chat-text-xs chat-text-gray-600 chat-mt-1">Text, images, audio, product cards</p>
              </div>

              {/* Feature 2 */}
              <div className="chat-text-center chat-p-3 chat-border chat-border-gray-100 chat-rounded-lg">
                <div className="chat-w-8 chat-h-8 chat-bg-primary-100 chat-rounded-lg chat-flex chat-items-center chat-justify-center chat-mx-auto chat-mb-2">
                  <svg className="chat-w-4 chat-h-4 chat-text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <h3 className="chat-text-sm chat-font-semibold chat-text-gray-900">E-commerce Ready</h3>
                <p className="chat-text-xs chat-text-gray-600 chat-mt-1">WooCommerce integration built-in</p>
              </div>

              {/* Feature 3 */}
              <div className="chat-text-center chat-p-3 chat-border chat-border-gray-100 chat-rounded-lg">
                <div className="chat-w-8 chat-h-8 chat-bg-primary-100 chat-rounded-lg chat-flex chat-items-center chat-justify-center chat-mx-auto chat-mb-2">
                  <svg className="chat-w-4 chat-h-4 chat-text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="chat-text-sm chat-font-semibold chat-text-gray-900">Lightning Fast</h3>
                <p className="chat-text-xs chat-text-gray-600 chat-mt-1">Loads in under 2 seconds</p>
              </div>
            </div>
          </div>

          {/* Pricing Row */}
          <div className="chat-mb-12">
            <div className="chat-grid chat-grid-cols-2 chat-gap-6 chat-max-w-2xl chat-mx-auto">
              {/* Starter Plan */}
              <div className="chat-bg-gray-50 chat-rounded-lg chat-p-4 chat-border chat-border-gray-100">
                <div className="chat-flex chat-justify-between chat-items-center chat-mb-3">
                  <div>
                    <h3 className="chat-text-sm chat-font-semibold chat-text-gray-900">Starter</h3>
                    <p className="chat-text-xs chat-text-gray-600">Small businesses</p>
                  </div>
                  <div className="chat-text-right">
                    <p className="chat-text-lg chat-font-bold chat-text-gray-900">$29</p>
                    <p className="chat-text-xs chat-text-gray-600">/month</p>
                  </div>
                </div>
                <p className="chat-text-xs chat-text-gray-600">1K conversations • Basic customization • Email support</p>
              </div>

              {/* Pro Plan */}
              <div className="chat-bg-primary-50 chat-rounded-lg chat-p-4 chat-border-2 chat-border-primary-200">
                <div className="chat-flex chat-justify-between chat-items-center chat-mb-3">
                  <div>
                    <h3 className="chat-text-sm chat-font-semibold chat-text-gray-900">Pro</h3>
                    <p className="chat-text-xs chat-text-gray-600">Growing businesses</p>
                  </div>
                  <div className="chat-text-right">
                    <p className="chat-text-lg chat-font-bold chat-text-gray-900">$99</p>
                    <p className="chat-text-xs chat-text-gray-600">/month</p>
                  </div>
                </div>
                <p className="chat-text-xs chat-text-gray-600">Unlimited • Advanced customization • Priority support + Analytics</p>
              </div>
            </div>
          </div>

          {/* Reviews Row */}
          <div>
            <div className="chat-grid chat-grid-cols-3 chat-gap-4">
              {/* Review 1 */}
              <div className="chat-bg-gray-50 chat-rounded-lg chat-p-3 chat-text-center">
                <div className="chat-flex chat-justify-center chat-items-center chat-mb-2">
                  <div className="chat-text-yellow-400 chat-text-sm">★★★★★</div>
                  <span className="chat-ml-1 chat-text-xs chat-text-gray-600">4.9</span>
                </div>
                <p className="chat-text-xs chat-text-gray-600 chat-mb-2">"Easy to integrate and customers love it!"</p>
                <p className="chat-text-xs chat-font-semibold chat-text-gray-900">Sarah C., TechStore</p>
              </div>

              {/* Review 2 */}
              <div className="chat-bg-gray-50 chat-rounded-lg chat-p-3 chat-text-center">
                <div className="chat-flex chat-justify-center chat-items-center chat-mb-2">
                  <div className="chat-text-yellow-400 chat-text-sm">★★★★★</div>
                  <span className="chat-ml-1 chat-text-xs chat-text-gray-600">5.0</span>
                </div>
                <p className="chat-text-xs chat-text-gray-600 chat-mb-2">"Increased conversion rate by 25%!"</p>
                <p className="chat-text-xs chat-font-semibold chat-text-gray-900">Mike J., FashionHub</p>
              </div>

              {/* Review 3 */}
              <div className="chat-bg-gray-50 chat-rounded-lg chat-p-3 chat-text-center">
                <div className="chat-flex chat-justify-center chat-items-center chat-mb-2">
                  <div className="chat-text-yellow-400 chat-text-sm">★★★★★</div>
                  <span className="chat-ml-1 chat-text-xs chat-text-gray-600">4.8</span>
                </div>
                <p className="chat-text-xs chat-text-gray-600 chat-mb-2">"Simple setup, powerful features."</p>
                <p className="chat-text-xs chat-font-semibold chat-text-gray-900">Lisa W., GadgetWorld</p>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Footer */}
      <footer className="chat-bg-gray-900 chat-text-white chat-py-8">
        <div className="chat-max-w-7xl chat-mx-auto chat-px-4 chat-sm:px-6 chat-lg:px-8">
          <div className="chat-text-center">
            <div className="chat-flex chat-items-center chat-justify-center chat-space-x-3 chat-mb-2">
              <div className="chat-w-6 chat-h-6 chat-bg-primary-500 chat-rounded-lg chat-flex chat-items-center chat-justify-center">
                <svg className="chat-w-4 chat-h-4 chat-text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 3.04 1.05 4.35L2 22l5.65-1.05C9.96 21.64 11.46 22 13 22h7c1.1 0 2-.9 2-2V12c0-5.52-4.48-10-10-10z"/>
                </svg>
              </div>
              <h3 className="chat-text-lg chat-font-semibold">TalkAI</h3>
            </div>
            <p className="chat-text-sm chat-text-gray-400">
              Intelligent chat solutions for modern e-commerce
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}