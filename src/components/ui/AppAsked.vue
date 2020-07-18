<script>
import Vue from 'vue';
export default Vue.extend({
  name: 'AppAsked',

  props: {
    title: String,
    answer: String,

    question: {
      type: String,
      required: true
    }
  },

  render(h) {
    const FragmentQuestion = h('h3', {class: 'AppAsked__Question'}, this.question);
    const FragmentAnswer = h('p',{class: 'AppAsked__Answer'} ,this.answer);

    return h('div', { class: 'AppAsked' }, [FragmentQuestion, FragmentAnswer]);
  }
});
</script>

<style scoped>
.AppAsked {
  --blue: #D9DFFF;
  padding: 15px;
  background: var(--blue);
  border-radius: 30px;
  box-shadow: 5px 5px 15px var(--blue);
  
  text-align: left;
}

.AppAsked__Question {
  color: #464F80;
}

.AppAsked__Answer {
  color: #8C9DFF;
}

</style>