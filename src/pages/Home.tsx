import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="widget-root min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 3.04 1.05 4.35L2 22l5.65-1.05C9.96 21.64 11.46 22 13 22h7c1.1 0 2-.9 2-2V12c0-5.52-4.48-10-10-10zm0 18c-1.1 0-2.18-.25-3.15-.74L3 20l.74-5.85C3.25 13.18 3 12.1 3 11c0-4.97 4.03-9 9-9s9 4.03 9 9-4.03 9-9 9z"/>
                </svg>
              </div>
              <h1 className="text-xl font-bold text-gray-900">
                TalkAI
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link 
                to="/chat" 
                className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Try Live Demo
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <div>
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary-50 text-primary-600 text-sm font-medium mb-4">
              <span className="mr-2">🚀</span>
              WooCommerce Ready
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 lg:text-4xl">
              AI Chat Widget for Your Website
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Just like <span className="font-semibold text-primary-600">Tawk.to</span>, but smarter. 
              Add our AI-powered chat widget with one script tag.
            </p>
            
            {/* Key Features */}
            <div className="mt-6 grid grid-cols-1 gap-2">
              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                </div>
                <span className="text-sm text-gray-700">One-line installation • AI responses • WooCommerce integration</span>
              </div>
            </div>

            <div className="mt-6 flex items-center space-x-4">
              <Link 
                to="/chat" 
                className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors shadow-lg"
              >
                Try Live Demo
              </Link>
              <a href="#integration" className="text-primary-600 hover:text-primary-700 font-medium text-sm">
                See Integration →
              </a>
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative">
            <div className="bg-gray-50 rounded-xl p-4 shadow-lg">
              {/* Browser Mock */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="flex items-center px-3 py-2 bg-gray-100 border-b">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 rounded-full bg-red-400"></div>
                    <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                    <div className="w-2 h-2 rounded-full bg-green-400"></div>
                  </div>
                  <div className="flex-1 text-center">
                    <div className="bg-white rounded px-2 py-1 text-xs text-gray-600 mx-4">
                      yourstore.com
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 h-32 relative">
                  <div className="text-center text-gray-500 mt-8 text-sm">
                    Your Website Content
                  </div>
                  
                  {/* Chat Widget Floating */}
                  <div className="absolute bottom-2 right-2">
                    <div className="bg-primary-500 hover:bg-primary-600 w-10 h-10 rounded-full flex items-center justify-center shadow-lg cursor-pointer transition-all animate-bounce-slow">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
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
      <div id="integration" className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              Simple Integration
            </h2>
            <p className="mt-2 text-gray-600">
              Add to your website in under 60 seconds
            </p>
          </div>

          <div className="bg-gray-900 rounded-xl p-4 overflow-x-auto">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
              </div>
              <span className="text-gray-400 text-xs">HTML</span>
            </div>
            <pre className="text-green-400 text-xs leading-relaxed">
{`<!-- Add this script to your website -->
<script src="https://cdn.talkai.com/widget.js"></script>
<script>TalkAI.init({ apiKey: 'your-api-key' });</script>`}
            </pre>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center mx-auto">
                <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="mt-3 text-sm font-semibold text-gray-900">1. Copy Script</h3>
              <p className="mt-1 text-xs text-gray-600">Copy script to website</p>
            </div>
            
            <div className="text-center">
              <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center mx-auto">
                <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="mt-3 text-sm font-semibold text-gray-900">2. Configure</h3>
              <p className="mt-1 text-xs text-gray-600">Customize appearance</p>
            </div>
            
            <div className="text-center">
              <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center mx-auto">
                <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="mt-3 text-sm font-semibold text-gray-900">3. Go Live</h3>
              <p className="mt-1 text-xs text-gray-600">Widget ready to use</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features, Pricing & Reviews - All Horizontal */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Features Row */}
          <div className="mb-12">
            <h2 className="text-xl font-bold text-center text-gray-900 mb-6">
              Features
            </h2>
            
            <div className="grid grid-cols-3 gap-4 mb-8">
              {/* Feature 1 */}
              <div className="text-center p-3 border border-gray-100 rounded-lg">
                <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <svg className="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="text-sm font-semibold text-gray-900">Rich Messages</h3>
                <p className="text-xs text-gray-600 mt-1">Text, images, audio, product cards</p>
              </div>

              {/* Feature 2 */}
              <div className="text-center p-3 border border-gray-100 rounded-lg">
                <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <svg className="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <h3 className="text-sm font-semibold text-gray-900">E-commerce Ready</h3>
                <p className="text-xs text-gray-600 mt-1">WooCommerce integration built-in</p>
              </div>

              {/* Feature 3 */}
              <div className="text-center p-3 border border-gray-100 rounded-lg">
                <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <svg className="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-sm font-semibold text-gray-900">Lightning Fast</h3>
                <p className="text-xs text-gray-600 mt-1">Loads in under 2 seconds</p>
              </div>
            </div>
          </div>

          {/* Pricing Row */}
          <div className="mb-12">
            <h2 className="text-xl font-bold text-center text-gray-900 mb-6">
              Pricing
            </h2>
            
            <div className="grid grid-cols-2 gap-6 max-w-2xl mx-auto">
              {/* Starter Plan */}
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                <div className="flex justify-between items-center mb-3">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">Starter</h3>
                    <p className="text-xs text-gray-600">Small businesses</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">$29</p>
                    <p className="text-xs text-gray-600">/month</p>
                  </div>
                </div>
                <p className="text-xs text-gray-600">1K conversations • Basic customization • Email support</p>
              </div>

              {/* Pro Plan */}
              <div className="bg-primary-50 rounded-lg p-4 border-2 border-primary-200">
                <div className="flex justify-between items-center mb-3">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">Pro</h3>
                    <p className="text-xs text-gray-600">Growing businesses</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">$99</p>
                    <p className="text-xs text-gray-600">/month</p>
                  </div>
                </div>
                <p className="text-xs text-gray-600">Unlimited • Advanced customization • Priority support + Analytics</p>
              </div>
            </div>
          </div>

          {/* Reviews Row */}
          <div>
            <h2 className="text-xl font-bold text-center text-gray-900 mb-6">
              Reviews
            </h2>
            <div className="grid grid-cols-3 gap-4">
              {/* Review 1 */}
              <div className="bg-gray-50 rounded-lg p-3 text-center">
                <div className="flex justify-center items-center mb-2">
                  <div className="text-yellow-400 text-sm">★★★★★</div>
                  <span className="ml-1 text-xs text-gray-600">4.9</span>
                </div>
                <p className="text-xs text-gray-600 mb-2">"Easy to integrate and customers love it!"</p>
                <p className="text-xs font-semibold text-gray-900">Sarah C., TechStore</p>
              </div>

              {/* Review 2 */}
              <div className="bg-gray-50 rounded-lg p-3 text-center">
                <div className="flex justify-center items-center mb-2">
                  <div className="text-yellow-400 text-sm">★★★★★</div>
                  <span className="ml-1 text-xs text-gray-600">5.0</span>
                </div>
                <p className="text-xs text-gray-600 mb-2">"Increased conversion rate by 25%!"</p>
                <p className="text-xs font-semibold text-gray-900">Mike J., FashionHub</p>
              </div>

              {/* Review 3 */}
              <div className="bg-gray-50 rounded-lg p-3 text-center">
                <div className="flex justify-center items-center mb-2">
                  <div className="text-yellow-400 text-sm">★★★★★</div>
                  <span className="ml-1 text-xs text-gray-600">4.8</span>
                </div>
                <p className="text-xs text-gray-600 mb-2">"Simple setup, powerful features."</p>
                <p className="text-xs font-semibold text-gray-900">Lisa W., GadgetWorld</p>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-2">
              <div className="w-6 h-6 bg-primary-500 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 3.04 1.05 4.35L2 22l5.65-1.05C9.96 21.64 11.46 22 13 22h7c1.1 0 2-.9 2-2V12c0-5.52-4.48-10-10-10z"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold">TalkAI</h3>
            </div>
            <p className="text-sm text-gray-400">
              Intelligent chat solutions for modern e-commerce
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}