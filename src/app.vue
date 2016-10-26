<template>
<div id="app">
    <img src="./assets/logo.png">
    <ul class="nav">
        <li class="nav__item" :class="route.path === router.currentRoute.path ? 'active' : ''" v-for="route in router.options.routes">
            <router-link class="nav__link" :to="route.path">{{ route.title }}</router-link>
        </li>
    </ul>
    <router-view></router-view>
</div>
</template>

<script>
export default {
    name: 'app',
    data() {
        return {
            router: this.$router
        }
    }
}
</script>

<style lang="less" scoped>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}

.nav {
    list-style: none;
    padding: 0;
    display: flex;
    justify-content: center;
    font-size: 1.2em;

    &__item {
        padding: 0.5em;
        color: #147;

        &:hover {
            color: #49F;
        }

        &.active {
            background-color: #efefef;
        }
    }

    &__link {
        text-decoration: none;
        padding: 0.5em;
        color: inherit;
    }
}
</style>
