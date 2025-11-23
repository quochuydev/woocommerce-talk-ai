# TalkAI Widget

An embeddable AI chat widget for e-commerce websites, similar to Tawk.to or Intercom.

## Quick Start

Add this to your website:

```html
<script src="https://quochuydev.github.io/talk-ai-widget/widget.js"></script>
<script>
  window.TalkAIWidget.init({
    position: 'bottom-right', // bottom-left, top-right, top-left
    theme: 'light', // light, dark
    containerId: 'custom-id', // optional custom container
  })
</script>
```

## WordPress/WooCommerce

Add to your theme's `functions.php`:

```php
function add_talkai_widget() {
    ?>
    <script src="https://quochuydev.github.io/talk-ai-widget/widget.js"></script>
    <script>
        TalkAIWidget.init({
          position: 'bottom-right',
          theme: 'light'
        });
    </script>
    <?php
}
add_action('wp_footer', 'add_talkai_widget');
```
