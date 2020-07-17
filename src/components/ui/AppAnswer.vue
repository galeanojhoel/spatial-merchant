<script>
import Vue from 'vue';
export default Vue.extend({
  name: 'AppAnswer',

  props: {
    title: String,
    answer: String,

    question: {
      type: String,
      required: true
    }
  },

  render(h) {
    const FragmentQuestion = h('h3', this.question);
    const FragmentAnswer = h('h4', this.answer);

    return h('div', [FragmentQuestion, FragmentAnswer]);
  }
});
</script>