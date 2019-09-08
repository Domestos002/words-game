<template lang="pug">
    .result
        .result__inner
            p.result__title Статистика попыток
            table.result__table
                thead
                    tr
                        th
                            a.result__link(@click="toggleSort('id')") ID

                        th
                            a.result__link(@click="toggleSort('name')") Name

                        th
                            a.result__link(@click="toggleSort('timeNum')") Time
                tbody
                    tr(v-for='value in data' :key='value.id')
                        td {{ value.id }}
                        td {{ value.word }}
                        td {{ value.time }}
            button.btn.btn--primary.result__btn(@click="back") ещё слово
</template>

<style src="./result.sass" lang="sass"></style>
<script src="./result.js"></script>
