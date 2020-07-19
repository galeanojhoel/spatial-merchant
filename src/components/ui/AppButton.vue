<script>
import Vue from 'vue';
export default Vue.extend({
  name: 'AppButton',

  render(h) {
    return h(
      'button',
      {
        class: 'AppButton',
        on: {
          click: () => this.$emit('click')
        }
      },
      this.$slots.default
    );
  }
});
</script>

<style scoped>
.AppButton {
  display: inline-block;
  padding: 15px 30px;
  background-color: black;
  border-radius: 30px;
  border: none;

  color: white;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
}

.AppButton:hover {
  box-shadow: 0 0 15px inset white;
}
</style>