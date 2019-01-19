<template>
  <li v-for="(item, k) in menu_list" @click="chooseMenu($event,item)" :class="item | menuItemClass" :key="item.name+k" >{{item.name}}</li>

</template>

<script>
    export default {
        name: "M_DropDownItem"
    }
</script>

<style scoped>

</style>
