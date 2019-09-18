<template lang="pug">
    .masonry(v-if="visible")
        .masonry__inner
            p.masonry__title Расставьте буквы в верном порядке
            .masonry__word(v-for="word in shuffledLetters" :key="word.id")
                .masonry__list
                    .masonry__item(v-for="item in word.data" :key="item.id"
                        v-dragging="{ item: item, list: word.data, group: word.id}") {{item.letter}}
</template>

<style src="./masonry.sass" lang="sass"></style>
<script src="./masonry.js"></script>
