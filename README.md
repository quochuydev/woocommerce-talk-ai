# TalkAI - AI Chat Widget

Main color: #FF3988

## 🚀 Quick Start

TalkAI is an embeddable AI chat widget similar to Tawk.to, designed specifically for e-commerce websites with WooCommerce integration.

## 📦 Installation

### WordPress/WooCommerce Integration

#### Method 1: Direct Script (Recommended)

Add this code to your WordPress theme's `functions.php` file or use a plugin like "Insert Headers and Footers":

```php
// Add to functions.php
function add_talkai_widget() {
    ?>
    <script src="https://your-domain.github.io/woocommerce-talk-ai/widget.js"></script>
    <script>
        TalkAI.init({
            apiKey: 'your-api-key-here',
            position: 'bottom-right', // bottom-right, bottom-left, top-right, top-left
            theme: 'pink',
            primaryColor: '#FF3988'
        });
    </script>
    <?php
}
add_action('wp_footer', 'add_talkai_widget');
```

#### Method 2: Plugin Installation

1. Upload the `widget.js` file to your WordPress media library
2. Add the following code via **Appearance > Theme Editor** or a custom HTML widget:

```html
<!-- Add before closing </body> tag -->
<script src="/wp-content/uploads/widget.js"></script>
<script>
TalkAI.init({
    apiKey: 'your-api-key-here'
});
</script>
```

#### Method 3: Using Header/Footer Plugin

1. Install "Insert Headers and Footers" plugin
2. Go to **Settings > Insert Headers and Footers**  
3. Add this code to the **Footer** section:

```html
<script src="https://your-domain.github.io/woocommerce-talk-ai/widget.js"></script>
<script>
TalkAI.init({
    apiKey: 'your-api-key-here',
    position: 'bottom-right',
    primaryColor: '#FF3988'
});
</script>
```

## ⚙️ Configuration Options

```javascript
TalkAI.init({
    apiKey: 'your-api-key-here',     // Required: Your TalkAI API key
    position: 'bottom-right',         // Optional: Widget position
    theme: 'pink',                    // Optional: Color theme
    primaryColor: '#FF3988',          // Optional: Custom primary color
    widgetId: 'custom-id'            // Optional: Custom widget ID
});
```

### Position Options
- `bottom-right` (default)
- `bottom-left`
- `top-right` 
- `top-left`

## 🎨 Customization

The widget automatically adapts to your website's style and is fully responsive. You can customize:

- **Colors**: Change `primaryColor` to match your brand
- **Position**: Choose where the widget appears
- **Theme**: Built-in themes available

## 🔧 Features

- ✅ **One-line installation**
- ✅ **Mobile responsive design**
- ✅ **WooCommerce integration ready**
- ✅ **Customizable appearance**
- ✅ **AI-powered responses**
- ✅ **Real-time messaging**
- ✅ **No jQuery dependency**

## 📱 Mobile Support

The widget is fully responsive and optimized for mobile devices with touch-friendly controls.

## 🛠️ Development

To run the development server:

```bash
npm install
npm run dev
```

To build for production:

```bash
npm run build
```

## 📞 Support

For technical support or questions about integration, please visit our demo at [your-domain.github.io/woocommerce-talk-ai](https://your-domain.github.io/woocommerce-talk-ai)