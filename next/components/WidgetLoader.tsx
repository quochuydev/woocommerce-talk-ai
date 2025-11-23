'use client'

import Script from 'next/script'

export default function WidgetLoader() {
  return (
    <Script
      src="https://quochuydev.github.io/talk-ai-widget/widget.js"
      strategy="lazyOnload"
      onLoad={() => {
        // @ts-ignore - TalkAIWidget is loaded from external script
        if (typeof window !== 'undefined' && window.TalkAIWidget) {
          // @ts-ignore
          window.TalkAIWidget.init({
            position: 'bottom-right',
            theme: 'light',
          })
        }
      }}
    />
  )
}
