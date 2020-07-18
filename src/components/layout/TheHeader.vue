<script>
import Vue from 'vue'
export default Vue.extend({
  name: 'TheHeader',
  
  render(h) {
    return h(
      'header',
      {
        class: 'TheHeader'
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

<style scoped>
.TheHeader {
  margin-bottom: 3rem;
}
</style>