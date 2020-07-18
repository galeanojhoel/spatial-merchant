<script>
import Vue from 'vue';
import TheHeader from '../components/layout/TheHeader.vue';
import AppInputFile from '../components/ui/AppInputFile.vue';
import AppAsked from '../components/ui/AppAsked.vue';

import { resolveNumber } from '../utils/roman-math.util';

export default Vue.extend({
  name: 'HomePage',

  components: {
    TheHeader,
    AppInputFile,
    AppAsked
  },

  data() {
    return {
      askedList: [] // [{ question, answer }]
    };
  },

  methods: {
    resolveFile(fileData) {// [{prices, questions}]

      const answers = fileData.questions.reduce((acc, question) => {
        let result;
        const resolvedQty = resolveNumber(question.qty);
        result = resolvedQty;
        
        if (question.type === 'price') {

          if (fileData.prices[question.material] !== undefined) {

            const material = fileData.prices[question.material];
            const resolvedBase = resolveNumber(material.base); 
            const unitValue = material.cost / resolvedBase;
            result *= unitValue;
            
          } else {
            result = 'The given material was invalid.';
          }
        }

        if (typeof result === 'number' && result <= 0) {
          result = 'Don\'t know what to do.'
        }

        acc.push(result)
        return acc;
      }, []);
  
      this.askedList = fileData.questionsText.map((question, i) => {
        return { question, answer: answers[i]}
      })
    }
  }
});
</script>
<template>
  <main>
    <TheHeader>Welcome, Spatial Merchant!</TheHeader>
    <AppInputFile @fileInput="resolveFile" />
    <section class="AppContainer">

      <AppAsked v-for="(asked, i) in askedList" :question="asked.question" :answer="`${asked.answer}`" :key="i"/>
    </section>
  </main>
</template>

<style scoped>
.AppContainer {
  width: 90vw;
  margin: 30px auto;

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  grid-gap: 15px;
  
}
</style>