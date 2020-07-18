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

    const FragmentIcon = h(
      'object',
      {
        attrs: { data: 'publish.svg' },
        class: 'AppInputFile__Icon',
      }, null)

    const FragmentLabel = h(
      'label',
      {
        attrs: { for: 'file-input' },
        class: 'AppInputFile__Label'
      },
      [h('div', {class: 'AppInputFile__IconWrapper'}, [FragmentIcon, 'Escolha o arquivo'])]
      );

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

.AppInputFile__Icon {
  display: inline-block;
  color: white;
  width: 3ch;
  margin-right: 5px;
}

.AppInputFile__Label {
  display: inline-block;
  padding: 15px 30px;
  background-color: black; 
  border: 1px solid black;
  border-radius: 30px;

  color: white;
  font-weight: bold;
  
  cursor: pointer;
}

.AppInputFile__IconWrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>