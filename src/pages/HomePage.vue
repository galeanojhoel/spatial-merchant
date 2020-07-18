<script>
import Vue from 'vue';
import TheHeader from '../components/layout/TheHeader.vue';
import AppInputFile from '../components/ui/AppInputFile.vue';
import AppAsked from '../components/ui/AppAsked.vue';

import { resolveNumber } from '../utils/roman-math.util';

function romanNumeralsToAlias(numerals, aliases) {
  return numerals.map(numeral => {
    const aliasesNumerals = Object.values(aliases);
    const aliasesNames = Object.keys(aliases);
    const i = aliasesNumerals.indexOf(numeral);

    return aliasesNames[i];
  });
}

function findResult(question, prices, aliases) {
  const qtyAsAlias = romanNumeralsToAlias(question.qty, aliases).join(' ');
  const resolvedQty = resolveNumber(question.qty);

  if (resolvedQty >= 0) {
    if (question.type === 'price') {
      if (prices[question.material] !== undefined) {
        const material = prices[question.material];
        const unitValue = material.cost / resolveNumber(material.base);

        const credits = resolvedQty * unitValue;

        return `${qtyAsAlias} vale ${credits} créditos`;
      } else {
        return 'O material solicitado é invalido!';
      }
    } else if (question.type === 'qty') {
      return `${qtyAsAlias} vale ${resolvedQty}`;
    }
  } else {
    return 'Não sei o que fazer com isso...';
  }
}

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
    // TODO handle error messages better
    resolveFile(fileData) {
      // [{ aliases, prices, questions, questionsText }]

      const answers = fileData.questions.reduce((acc, question) => {

        const result = findResult(question, fileData.prices, fileData.aliases);

        acc.push(result);
        return acc;
      }, []);

      this.askedList = fileData.questionsText.map((question, i) => {
        return { question, answer: answers[i] };
      });
    }
  }
});
</script>
<template>
  <main>
    <TheHeader>Welcome, Spatial Merchant!</TheHeader>
    <AppInputFile @fileInput="resolveFile" />
    <section class="AppContainer">
      <AppAsked
        v-for="(asked, i) in askedList"
        :question="asked.question"
        :answer="`${asked.answer}`"
        :key="i"
      />
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