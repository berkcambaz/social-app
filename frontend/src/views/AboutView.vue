<script setup lang="ts">
</script>

<template>
  <div class="about">
    <div class="title">Chernolink</div>
    <div class="text">
      we value your privacy<br />
      we do not track you<br />
      no saved locations<br />
      no tracking cookies<br />
    </div>
    <div class="text">
      freedom of speech<br />
      no cancels<br />
      no bans<br />
      no suspensions<br />
    </div>
    <div class="text">
      you decide what to see<br />
      no promotions<br />
      no recommendations<br />
      no shady algorithms<br />
    </div>
    <div class="text">
      the all experience is yours<br />
      and<br />
      only<br />
      yours<br />
    </div>
    <p id="copyright">&copy; 2022 Chernolink</p>
  </div>
</template>

<style lang="scss" scoped>
.about {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  &>* {
    margin: 1rem 0;
  }
}

.title {
  font-size: $font-big;
  margin-top: 2rem;
}

.text {
  font-size: $font-medium-big;
  text-align: center;
}
</style>
  