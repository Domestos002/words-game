<template lang="pug">
    .masonry
        .masonry__inner
            p.masonry__title Расставьте буквы в верном порядке
            .masonry__list(:list="shuffledLetters")
                .masonry__item(v-for="(item, index) in shuffledLetters" :key="item.id"
                    v-dragging="{ item: item, list: shuffledLetters, group: 'letters'}") {{item.letter}}
</template>

<style src="./masonry.sass" lang="sass"></style>
<script src="./masonry.js"></script>
