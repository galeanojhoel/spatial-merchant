<script>
import Vue from 'vue';
import { parseFile } from '../../utils/file.util';

export default Vue.extend({
  name: 'AppInputFile',

  methods: {
    handleChange(ev) {
      debugger
      // parseFile()
    }
  },

  render(h) {
    return h(
      'input',
      {
        attrs: {
          type: 'file',
          multiple: false,
        },

        on: {
          change: this.handleChange
        }
      },
      null
    )
  }
});
</script>