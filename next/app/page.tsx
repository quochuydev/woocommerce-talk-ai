import WidgetLoader from '../components/WidgetLoader'

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
                  <path d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 3.04 1.05 4.35L2 22l5.65-1.05C9.96 21.64 11.46 22 13 22h7c1.1 0 2-.9 2-2V12c0-5.52-4.48-10-10-10zm0 18c-1.1 0-2.18-.25-3.15-.74L3 20l.74-5.85C3.25 13.18 3 12.1 3 11c0-4.97 4.03-9 9-9s9 4.03 9 9-4.03 9-9 9z" />
                </svg>
              </div>
              <h1 className="tw-text-xl tw-font-bold tw-text-gray-900">TalkAI</h1>
            </div>
            <div className="tw-flex tw-items-center tw-space-x-4">
              <a href="https://quochuydev.github.io/talk-ai-widget/" target="_blank" rel="noopener noreferrer" className="tw-bg-primary-500 hover:tw-bg-primary-600 tw-text-white tw-px-6 tw-py-2 tw-rounded-lg tw-text-sm tw-font-medium tw-transition-colors">
                Try Live Demo
              </a>
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
            <h1 className="tw-text-3xl tw-font-bold tw-tracking-tight tw-text-gray-900 lg:tw-text-4xl">AI Chat Widget for Your Website</h1>
            <p className="tw-mt-4 tw-text-lg tw-text-gray-600">
              Just like <span className="tw-font-semibold tw-text-primary-600">Tawk.to</span>, but smarter. Add our AI-powered chat widget with one script tag.
            </p>

            <div className="tw-mt-6 tw-flex tw-items-center tw-space-x-4">
              <a
                href="https://quochuydev.github.io/talk-ai-widget/"
                target="_blank"
                rel="noopener noreferrer"
                className="tw-bg-primary-500 hover:tw-bg-primary-600 tw-text-white tw-px-6 tw-py-2 tw-rounded-lg tw-text-sm tw-font-medium tw-transition-colors tw-shadow-lg"
              >
                Try Live Demo
              </a>
              <a href="#integration" className="tw-text-primary-600 hover:tw-text-primary-700 tw-font-medium tw-text-sm">
                See Integration →
              </a>
            </div>
          </div>

          {/* Right Visual */}
          <div className="tw-relative">
            <div className="tw-bg-gray-50 tw-rounded-xl tw-p-4 tw-shadow-lg">
              <div className="tw-bg-white tw-rounded-lg tw-shadow-lg tw-overflow-hidden">
                <div className="tw-flex tw-items-center tw-px-3 tw-py-2 tw-bg-gray-100 tw-border-b">
                  <div className="tw-flex tw-space-x-1">
                    <div className="tw-w-2 tw-h-2 tw-rounded-full tw-bg-red-400"></div>
                    <div className="tw-w-2 tw-h-2 tw-rounded-full tw-bg-yellow-400"></div>
                    <div className="tw-w-2 tw-h-2 tw-rounded-full tw-bg-green-400"></div>
                  </div>
                  <div className="tw-flex-1 tw-text-center">
                    <div className="tw-bg-white tw-rounded tw-px-2 tw-py-1 tw-text-xs tw-text-gray-600 tw-mx-4">yourstore.com</div>
                  </div>
                </div>
                <div className="tw-p-4 tw-bg-gradient-to-br tw-from-blue-50 tw-to-purple-50 tw-h-32 tw-relative">
                  <div className="tw-text-center tw-text-gray-500 tw-mt-8 tw-text-sm">Your Website Content</div>

                  <div className="tw-absolute tw-bottom-2 tw-right-2">
                    <div className="tw-bg-primary-500 hover:tw-bg-primary-600 tw-w-10 tw-h-10 tw-rounded-full tw-flex tw-items-center tw-justify-center tw-shadow-lg tw-cursor-pointer tw-transition-all">
                      <svg className="tw-w-5 tw-h-5 tw-text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 3.04 1.05 4.35L2 22l5.65-1.05C9.96 21.64 11.46 22 13 22h7c1.1 0 2-.9 2-2V12c0-5.52-4.48-10-10-10z" />
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
            <h2 className="tw-text-2xl tw-font-bold tw-tracking-tight tw-text-gray-900">Simple Integration</h2>
            <p className="tw-mt-2 tw-text-gray-600">Add to your website in under 60 seconds</p>
          </div>

          <div className="tw-bg-gray-900 tw-rounded-xl tw-p-4 tw-overflow-x-auto">
            <pre className="tw-text-green-400 tw-text-xs tw-leading-relaxed tw-text-left">
              {`<script src="https://your-domain.com/widget.js"></script>
<script>
    TalkAIWidget.init({
        position: 'bottom-right',
        theme: 'light',
    });
</script>`}
            </pre>
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
                  <path d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 3.04 1.05 4.35L2 22l5.65-1.05C9.96 21.64 11.46 22 13 22h7c1.1 0 2-.9 2-2V12c0-5.52-4.48-10-10-10z" />
                </svg>
              </div>
              <h3 className="tw-m-0 tw-text-lg tw-font-semibold">TalkAI</h3>
            </div>
            <p className="tw-text-sm tw-text-gray-400">Intelligent chat solutions for modern e-commerce</p>
          </div>
        </div>
      </footer>

      {/* Widget Embed - Live Demo on Landing Page */}
      <WidgetLoader />
    </div>
  )
}
