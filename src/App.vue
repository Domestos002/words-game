<template lang="pug">
  #app.site-wrapper
    masonry(
        :word="word"
        :visible="!endFlag"
        @isRight="isRight")

    result(:visible="endFlag"  @back="back")

    modal(:showModal="showModal" @repeat="repeat" @end="end" @closeModal="toggleModal")

    .preloader(v-if="pending")
        .preloader__img
</template>

<style lang="sass" src="./components/base.sass"></style>
<script src="./App.js"></script>
