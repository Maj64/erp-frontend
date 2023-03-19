<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  destroyed() {
    localStorage.removeItem('loading')
  }
}
</script>
