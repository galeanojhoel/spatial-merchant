<script>
import Vue from 'vue';
import { parseFile } from '../../utils/file.util';

export default Vue.extend({
  name: 'AppInputFile',

  methods: {
    handleChange(ev) {
      const fileList = ev.target.files;
      parseFile(fileList.item(0)).then(fileData =>
        this.$emit('fileInput', fileData)
      );
    }
  },

  render(h) {
    const FragmentButton = h(
      'input',
      {
        class: 'AppInputFile__Button',

        attrs: {
          type: 'file',
          multiple: false,
          id: 'file-input'
        },

        on: {
          change: this.handleChange
        }
      },
      null
    );

    const FragmentLabel = h(
      'label',
      {
        attrs: { for: 'file-input' },
        class: 'AppInputFile__Label'
      },
      'Escolha o arquivo');

    return h('div', [FragmentButton, FragmentLabel]);
  }
});
</script>

<style scoped>
/* .AppInputFile {
} */

.AppInputFile__Button {
  display: none;
}

.AppInputFile__Label {
  padding: 15px;
  cursor: pointer;
  border: 1px solid black;
}
</style>