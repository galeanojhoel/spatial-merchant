<script>
import Vue from 'vue';
import TheHeader from '../components/layout/TheHeader.vue';
import AppInputFile from '../components/ui/AppInputFile.vue';
import AppAsked from '../components/ui/AppAsked.vue';
import AppButton from '../components/ui/AppButton.vue';
import AppModal from '../components/ui/AppModal.vue';

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
    AppAsked,
    AppButton,
    AppModal
  },

  data() {
    return {
      askedList: [], // [{ question, answer }],
      modalData: null
    };
  },

  methods: {
    // TODO handle error messages better
    resolveFile(fileData) {
      // [{ aliases, prices, questions, questionsText }]
      try {

        const answers = fileData.questions.reduce((acc, question) => {
          const result = findResult(question, fileData.prices, fileData.aliases);
  
          acc.push(result);
          return acc;
        }, []);
  
        this.askedList = fileData.questionsText.map((question, i) => {
          return { question, answer: answers[i] };
        });
      } catch (error) {
        alert('Não foi possível inferir sobre o arquivo.')
      }
    },

    writeOutputText() {
      if (!this.askedList || this.askedList.length === 0) {
        window.alert('Por favor, escolha um arquivo antes de gerar o arquivo.');
      } else {
        const answers = this.askedList.map(asked => asked.answer);
        this.modalData = answers.join('\n');
      }
    },

    closeModal() {
      this.modalData = null;
    }
  }
});
</script>
<template>
  <div>
    <TheHeader>Bem-vindo, vendedor interespacial!</TheHeader>
    <div class="--in-row">
      <AppInputFile @fileInput="resolveFile" />
      <AppButton
        @click="writeOutputText"
        style="margin-left: 15px; background-color: #90ee90;"
      >Gerar output text</AppButton>
    </div>
    <section class="AppContainer">
      <AppAsked
        v-for="(asked, i) in askedList"
        :question="asked.question"
        :answer="`${asked.answer}`"
        :key="i"
      />
    </section>

    <AppModal v-if="!!modalData" @close="closeModal" :data="modalData" />
  </div>
</template>

<style scoped>
.AppContainer {
  width: 90vw;
  margin: 30px auto;

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  grid-gap: 15px;
}

.--in-row {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
</style>