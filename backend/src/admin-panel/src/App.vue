<template>
  <nav class="navbar navbar-exapnd-lg navbar-light bg-light mb-5 px-5">
    <a class="navbar-brand" href="#">Admin Panel</a>

    <ul class="navbar-nav mr-auto d-flex flex-row gap-5">
      <router-link
        to="/"
        v-slot="{ href, navigate, isActive }"
        custom
      >
        <li
          :class="[
            'nav-item',
            isActive && 'active font-bold',
          ]"
        >
          <a :href="href" @click="navigate" class="nav-link">Home</a>
        </li>
      </router-link>
      <router-link
        to="/items"
        v-slot="{ href, navigate, isActive }"
        custom
      >
        <li
          :class="[
            'nav-item',
            isActive && 'active font-bold',
          ]"
        >
          <a :href="href" @click="navigate" class="nav-link">Items</a>
        </li>
      </router-link>
    </ul>
  </nav>
  <router-view />
</template>

<script>
export default {
  name: "App",
  components: {},
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
