<script>
import Vue from 'vue'
export default Vue.extend({
  name: 'TheHeader',
  
  render(h) {
    return h(
      'header',
      {
        class: 'Header'
      },
      [h(
        'h1',
        {
          class: 'HeaderTitle',
        },
        this.$slots.default
      )]
    )
  }
})
</script>