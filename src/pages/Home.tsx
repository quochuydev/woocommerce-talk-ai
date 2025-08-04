import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="widget-root tw-min-h-screen tw-bg-white">
      {/* Navigation */}
      <nav className="tw-bg-white tw-shadow-sm tw-border-b tw-border-gray-100">
        <div className="tw-max-w-7xl tw-mx-auto tw-px-4 sm:tw-px-6 lg:tw-px-8">
          <div className="tw-flex tw-justify-between tw-h-16">
            <div className="tw-flex tw-items-center tw-space-x-3">
              <div className="tw-w-8 tw-h-8 tw-bg-primary-500 tw-rounded-lg tw-flex tw-items-center tw-justify-center">
                <svg className="tw-w-5 tw-h-5 tw-text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 3.04 1.05 4.35L2 22l5.65-1.05C9.96 21.64 11.46 22 13 22h7c1.1 0 2-.9 2-2V12c0-5.52-4.48-10-10-10zm0 18c-1.1 0-2.18-.25-3.15-.74L3 20l.74-5.85C3.25 13.18 3 12.1 3 11c0-4.97 4.03-9 9-9s9 4.03 9 9-4.03 9-9 9z"/>
                </svg>
              </div>
              <h1 className="tw-text-xl tw-font-bold tw-text-gray-900">
                TalkAI
              </h1>
            </div>
            <div className="tw-flex tw-items-center tw-space-x-4">
              <Link 
                to="/chat" 
                className="tw-bg-primary-500 hover:tw-bg-primary-600 tw-text-white tw-px-6 tw-py-2 tw-rounded-lg tw-text-sm tw-font-medium tw-transition-colors"
              >
                Try Live Demo
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="tw-max-w-7xl tw-mx-auto tw-px-4 sm:tw-px-6 lg:tw-px-8 tw-py-12">
        <div className="tw-grid lg:tw-grid-cols-2 tw-gap-8 tw-items-center">
          {/* Left Content */}
          <div>
            <div className="tw-inline-flex tw-items-center tw-px-3 tw-py-1 tw-rounded-full tw-bg-primary-50 tw-text-primary-600 tw-text-sm tw-font-medium tw-mb-4">
              <span className="tw-mr-2">🚀</span>
              WooCommerce Ready
            </div>
            <h1 className="tw-text-3xl tw-font-bold tw-tracking-tight tw-text-gray-900 lg:tw-text-4xl">
              AI Chat Widget for Your Website
            </h1>
            <p className="tw-mt-4 tw-text-lg tw-text-gray-600">
              Just like <span className="tw-font-semibold tw-text-primary-600">Tawk.to</span>, but smarter. 
              Add our AI-powered chat widget with one script tag.
            </p>
            
            {/* Key Features */}
            <div className="tw-mt-6 tw-grid tw-grid-cols-1 tw-gap-2">
              <div className="tw-flex tw-items-center tw-space-x-3">
                <div className="tw-w-5 tw-h-5 tw-bg-green-100 tw-rounded-full tw-flex tw-items-center tw-justify-center">
                  <svg className="tw-w-3 tw-h-3 tw-text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                </div>
                <span className="tw-text-sm tw-text-gray-700">One-line installation • AI responses • WooCommerce integration</span>
              </div>
            </div>

            <div className="tw-mt-6 tw-flex tw-items-center tw-space-x-4">
              <Link 
                to="/chat" 
                className="tw-bg-primary-500 hover:tw-bg-primary-600 tw-text-white tw-px-6 tw-py-2 tw-rounded-lg tw-text-sm tw-font-medium tw-transition-colors tw-shadow-lg"
              >
                Try Live Demo
              </Link>
              <a href="#integration" className="tw-text-primary-600 hover:tw-text-primary-700 tw-font-medium tw-text-sm">
                See Integration →
              </a>
            </div>
          </div>

          {/* Right Visual */}
          <div className="tw-relative">
            <div className="tw-bg-gray-50 tw-rounded-xl tw-p-4 tw-shadow-lg">
              {/* Browser Mock */}
              <div className="tw-bg-white tw-rounded-lg tw-shadow-lg tw-overflow-hidden">
                <div className="tw-flex tw-items-center tw-px-3 tw-py-2 tw-bg-gray-100 tw-border-b">
                  <div className="tw-flex tw-space-x-1">
                    <div className="tw-w-2 tw-h-2 tw-rounded-full tw-bg-red-400"></div>
                    <div className="tw-w-2 tw-h-2 tw-rounded-full tw-bg-yellow-400"></div>
                    <div className="tw-w-2 tw-h-2 tw-rounded-full tw-bg-green-400"></div>
                  </div>
                  <div className="tw-flex-1 tw-text-center">
                    <div className="tw-bg-white tw-rounded tw-px-2 tw-py-1 tw-text-xs tw-text-gray-600 tw-mx-4">
                      yourstore.com
                    </div>
                  </div>
                </div>
                <div className="tw-p-4 tw-bg-gradient-to-br tw-from-blue-50 tw-to-purple-50 tw-h-32 tw-relative">
                  <div className="tw-text-center tw-text-gray-500 tw-mt-8 tw-text-sm">
                    Your Website Content
                  </div>
                  
                  {/* Chat Widget Floating */}
                  <div className="tw-absolute tw-bottom-2 tw-right-2">
                    <div id="talkai-widget-icon" className="tw-bg-primary-500 hover:tw-bg-primary-600 tw-w-10 tw-h-10 tw-rounded-full tw-flex tw-items-center tw-justify-center tw-shadow-lg tw-cursor-pointer tw-transition-all tw-animate-bounce-slow">
                      <svg className="tw-w-5 tw-h-5 tw-text-white" fill="currentColor" viewBox="0 0 24 24">
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
      <div id="integration" className="tw-py-16 tw-bg-gray-50">
        <div className="tw-max-w-4xl tw-mx-auto tw-px-4 sm:tw-px-6 lg:tw-px-8">
          <div className="tw-text-center tw-mb-8">
            <h2 className="tw-text-2xl tw-font-bold tw-tracking-tight tw-text-gray-900">
              Simple Integration
            </h2>
            <p className="tw-mt-2 tw-text-gray-600">
              Add to your website in under 60 seconds
            </p>
          </div>

          <div className="tw-bg-gray-900 tw-rounded-xl tw-p-4 tw-overflow-x-auto">
            <div className="tw-flex tw-items-center tw-justify-between tw-mb-3">
              <div className="tw-flex tw-items-center tw-space-x-1">
                <div className="tw-w-2 tw-h-2 tw-rounded-full tw-bg-red-500"></div>
                <div className="tw-w-2 tw-h-2 tw-rounded-full tw-bg-yellow-500"></div>
                <div className="tw-w-2 tw-h-2 tw-rounded-full tw-bg-green-500"></div>
              </div>
              <span className="tw-text-gray-400 tw-text-xs">HTML</span>
            </div>
            <pre className="tw-text-green-400 tw-text-xs tw-leading-relaxed tw-text-left">
{`<script src="https://quochuydev.github.io/woocommerce-talk-ai/widget.js"></script>
<script>
    TalkAIWidget.init({
        apiKey: 'your-api-key-here',
        position: 'bottom-right', // bottom-right, bottom-left, top-right, top-left
        theme: 'light',
        primaryColor: '#FF3988'
    });
</script>`}
            </pre>
          </div>

          <div className="tw-mt-8 tw-grid tw-grid-cols-3 tw-gap-6">
            <div className="tw-text-center">
              <div className="tw-w-10 tw-h-10 tw-bg-primary-100 tw-rounded-lg tw-flex tw-items-center tw-justify-center tw-mx-auto">
                <svg className="tw-w-5 tw-h-5 tw-text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="tw-mt-3 tw-text-sm tw-font-semibold tw-text-gray-900">1. Copy Script</h3>
              <p className="tw-mt-1 tw-text-xs tw-text-gray-600">Copy script to website</p>
            </div>
            
            <div className="tw-text-center">
              <div className="tw-w-10 tw-h-10 tw-bg-primary-100 tw-rounded-lg tw-flex tw-items-center tw-justify-center tw-mx-auto">
                <svg className="tw-w-5 tw-h-5 tw-text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="tw-mt-3 tw-text-sm tw-font-semibold tw-text-gray-900">2. Configure</h3>
              <p className="tw-mt-1 tw-text-xs tw-text-gray-600">Customize appearance</p>
            </div>
            
            <div className="tw-text-center">
              <div className="tw-w-10 tw-h-10 tw-bg-primary-100 tw-rounded-lg tw-flex tw-items-center tw-justify-center tw-mx-auto">
                <svg className="tw-w-5 tw-h-5 tw-text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="tw-mt-3 tw-text-sm tw-font-semibold tw-text-gray-900">3. Go Live</h3>
              <p className="tw-mt-1 tw-text-xs tw-text-gray-600">Widget ready to use</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features, Pricing & Reviews - All Horizontal */}
      <div className="tw-py-12 tw-bg-white">
        <div className="tw-max-w-7xl tw-mx-auto tw-px-4 sm:tw-px-6 lg:tw-px-8">
          
          {/* Features Row */}
          <div className="tw-mb-12">
            <h2 className="tw-text-xl tw-font-bold tw-text-center tw-text-gray-900 tw-mb-6">
              Features
            </h2>
            
            <div className="tw-grid tw-grid-cols-3 tw-gap-4 tw-mb-8">
              {/* Feature 1 */}
              <div className="tw-text-center tw-p-3 tw-border tw-border-gray-100 tw-rounded-lg">
                <div className="tw-w-8 tw-h-8 tw-bg-primary-100 tw-rounded-lg tw-flex tw-items-center tw-justify-center tw-mx-auto tw-mb-2">
                  <svg className="tw-w-4 tw-h-4 tw-text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="tw-text-sm tw-font-semibold tw-text-gray-900">Rich Messages</h3>
                <p className="tw-text-xs tw-text-gray-600 tw-mt-1">Text, images, audio, product cards</p>
              </div>

              {/* Feature 2 */}
              <div className="tw-text-center tw-p-3 tw-border tw-border-gray-100 tw-rounded-lg">
                <div className="tw-w-8 tw-h-8 tw-bg-primary-100 tw-rounded-lg tw-flex tw-items-center tw-justify-center tw-mx-auto tw-mb-2">
                  <svg className="tw-w-4 tw-h-4 tw-text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <h3 className="tw-text-sm tw-font-semibold tw-text-gray-900">E-commerce Ready</h3>
                <p className="tw-text-xs tw-text-gray-600 tw-mt-1">WooCommerce integration built-in</p>
              </div>

              {/* Feature 3 */}
              <div className="tw-text-center tw-p-3 tw-border tw-border-gray-100 tw-rounded-lg">
                <div className="tw-w-8 tw-h-8 tw-bg-primary-100 tw-rounded-lg tw-flex tw-items-center tw-justify-center tw-mx-auto tw-mb-2">
                  <svg className="tw-w-4 tw-h-4 tw-text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="tw-text-sm tw-font-semibold tw-text-gray-900">Lightning Fast</h3>
                <p className="tw-text-xs tw-text-gray-600 tw-mt-1">Loads in under 2 seconds</p>
              </div>
            </div>
          </div>

          {/* Pricing Row */}
          <div className="tw-mb-12">
            <h2 className="tw-text-xl tw-font-bold tw-text-center tw-text-gray-900 tw-mb-6">
              Pricing
            </h2>
            
            <div className="tw-grid tw-grid-cols-2 tw-gap-6 tw-max-w-2xl tw-mx-auto">
              {/* Starter Plan */}
              <div className="tw-bg-gray-50 tw-rounded-lg tw-p-4 tw-border tw-border-gray-100">
                <div className="tw-flex tw-justify-between tw-items-center tw-mb-3">
                  <div>
                    <h3 className="tw-text-sm tw-font-semibold tw-text-gray-900">Starter</h3>
                    <p className="tw-text-xs tw-text-gray-600">Small businesses</p>
                  </div>
                  <div className="tw-text-right">
                    <p className="tw-text-lg tw-font-bold tw-text-gray-900">$29</p>
                    <p className="tw-text-xs tw-text-gray-600">/month</p>
                  </div>
                </div>
                <p className="tw-text-xs tw-text-gray-600">1K conversations • Basic customization • Email support</p>
              </div>

              {/* Pro Plan */}
              <div className="tw-bg-primary-50 tw-rounded-lg tw-p-4 tw-border-2 tw-border-primary-200">
                <div className="tw-flex tw-justify-between tw-items-center tw-mb-3">
                  <div>
                    <h3 className="tw-text-sm tw-font-semibold tw-text-gray-900">Pro</h3>
                    <p className="tw-text-xs tw-text-gray-600">Growing businesses</p>
                  </div>
                  <div className="tw-text-right">
                    <p className="tw-text-lg tw-font-bold tw-text-gray-900">$99</p>
                    <p className="tw-text-xs tw-text-gray-600">/month</p>
                  </div>
                </div>
                <p className="tw-text-xs tw-text-gray-600">Unlimited • Advanced customization • Priority support + Analytics</p>
              </div>
            </div>
          </div>

          {/* Reviews Row */}
          <div>
            <h2 className="tw-text-xl tw-font-bold tw-text-center tw-text-gray-900 tw-mb-6">
              Reviews
            </h2>
            <div className="tw-grid tw-grid-cols-3 tw-gap-4">
              {/* Review 1 */}
              <div className="tw-bg-gray-50 tw-rounded-lg tw-p-3 tw-text-center">
                <div className="tw-flex tw-justify-center tw-items-center tw-mb-2">
                  <div className="tw-text-yellow-400 tw-text-sm">★★★★★</div>
                  <span className="tw-ml-1 tw-text-xs tw-text-gray-600">4.9</span>
                </div>
                <p className="tw-text-xs tw-text-gray-600 tw-mb-2">"Easy to integrate and customers love it!"</p>
                <p className="tw-text-xs tw-font-semibold tw-text-gray-900">Sarah C., TechStore</p>
              </div>

              {/* Review 2 */}
              <div className="tw-bg-gray-50 tw-rounded-lg tw-p-3 tw-text-center">
                <div className="tw-flex tw-justify-center tw-items-center tw-mb-2">
                  <div className="tw-text-yellow-400 tw-text-sm">★★★★★</div>
                  <span className="tw-ml-1 tw-text-xs tw-text-gray-600">5.0</span>
                </div>
                <p className="tw-text-xs tw-text-gray-600 tw-mb-2">"Increased conversion rate by 25%!"</p>
                <p className="tw-text-xs tw-font-semibold tw-text-gray-900">Mike J., FashionHub</p>
              </div>

              {/* Review 3 */}
              <div className="tw-bg-gray-50 tw-rounded-lg tw-p-3 tw-text-center">
                <div className="tw-flex tw-justify-center tw-items-center tw-mb-2">
                  <div className="tw-text-yellow-400 tw-text-sm">★★★★★</div>
                  <span className="tw-ml-1 tw-text-xs tw-text-gray-600">4.8</span>
                </div>
                <p className="tw-text-xs tw-text-gray-600 tw-mb-2">"Simple setup, powerful features."</p>
                <p className="tw-text-xs tw-font-semibold tw-text-gray-900">Lisa W., GadgetWorld</p>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Footer */}
      <footer className="tw-bg-gray-900 tw-text-white tw-py-8">
        <div className="tw-max-w-7xl tw-mx-auto tw-px-4 sm:tw-px-6 lg:tw-px-8">
          <div className="tw-text-center">
            <div className="tw-flex tw-items-center tw-justify-center tw-space-x-3 tw-mb-2">
              <div className="tw-w-6 tw-h-6 tw-bg-primary-500 tw-rounded-lg tw-flex tw-items-center tw-justify-center">
                <svg className="tw-w-4 tw-h-4 tw-text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 3.04 1.05 4.35L2 22l5.65-1.05C9.96 21.64 11.46 22 13 22h7c1.1 0 2-.9 2-2V12c0-5.52-4.48-10-10-10z"/>
                </svg>
              </div>
              <h3 className="tw-m-0 tw-text-lg tw-font-semibold">TalkAI</h3>
            </div>
            <p className="tw-text-sm tw-text-gray-400">
              Intelligent chat solutions for modern e-commerce
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}