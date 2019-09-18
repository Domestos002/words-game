<template lang="pug">
    .modal(:class="{ 'modal--active': showModal }"
        v-show="showModal")
        .modal__dialog
            p.modal__title Вы выиграли! Повторить?
            .modal__buttons
                button.btn.btn--primary.modal__btn(@click="onRepeat") Конечно!
                button.btn.btn--primary.modal__btn(@click="onEnd") Я уже устал
</template>
<style src="./modal.sass" lang="sass"></style>
<script src="./modal.js"></script>
