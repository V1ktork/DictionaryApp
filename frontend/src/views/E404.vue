<template>
  <main class="d-table">
    <div class="not-found">
      <div class="wrapper col-md-6 col-lg-4 mx-auto">
        <div class="left">
          <h1>404</h1>
          <p>Запрашиваемая&nbsp;страница не&nbsp;найдена</p>
        </div>
        <img src="@/assets/pikachu.png" alt="pikachu-meme">
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  color: #fff;
  text-shadow: 2px 2px 2px #000;
}
h1 {
  font-size: 5rem;
}
p {
  font-size: 22px;
}

@media screen and (max-width: 540px) {
  .wrapper {
    flex-direction: column;
  }
}
</style>
