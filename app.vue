<template>
  <NuxtPage />
</template>

<style>
html,
body {
  margin: 0 !important;
  padding: 0 !important;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

body {
  background-color: white;
  @media (min-width: 768px) {
    background-color: red;
  }
}

main {
  @media (min-width: 768px) {
    background-color: red;
  }
}
</style>