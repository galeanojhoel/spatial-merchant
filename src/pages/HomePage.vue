<script>
import Vue from "vue";
import TheHeader from '../components/layout/TheHeader.vue';
import AppInputFile from '../components/ui/AppInputFile.vue';
import AppAnswer from '../components/ui/AppAnswer.vue';
export default Vue.extend({
  name: "HomePage",
  components: {
    TheHeader,
    AppInputFile,
    AppAnswer,

  },
});
</script>
<template>
  <div>
    <TheHeader>Welcome, Spatial Merchant!</TheHeader>
    <AppInputFile/>
    <AppAnswer question="Is there life in mars?" answer="Yes."/>
    
  </div>
</template>
