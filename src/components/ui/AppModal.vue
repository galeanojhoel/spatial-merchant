<script>
import Vue from 'vue';
import AppButton from './AppButton.vue';

export default Vue.extend({
  name: 'AppModal',

  components: {
    AppButton
  },

  props: {
    data: {
      type: String,
      required: true
    }
  },

  render(h) {
    const FragmentParagraph = h('p', {class: 'AppModal__Paragraph'}, this.data);
    const FragmentCloseButton = h(
      AppButton,
      { on: { click: () => this.$emit('close') } },
      'fechar janela'
    );

    return h(
      'aside',
      { class: 'AppModalBackground' },
      [h('div', { class: 'AppModal' }, [FragmentParagraph, FragmentCloseButton])]
    );
  }
});
</script>

<style scoped>

.AppModalBackground {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100vw;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
  

  background-color: rgba(0, 0, 0, 0.3);
}

.AppModal {
  background: white;
  border-radius: 30px;
  padding: 30px;
  width: 300px;
}

.AppModal__Paragraph {
  text-align: left;
  margin-bottom: 30px;
  white-space: pre-line;
}


/* .AppModal__Close {

} */
</style>