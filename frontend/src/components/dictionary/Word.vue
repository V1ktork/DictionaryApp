<template>
  <tr :class="wordStateClass">
    <router-link
      :to="{name: 'word', params: {partOfSpeech: word.partOfSpeech, word: word.name}}"
      tag="th"
    >
      <a class="link">{{ word.name }}</a>
    </router-link>
    <td class="translation">{{ word.translation }}</td>
    <router-link :to="{name: 'partOfSpeech', params: {partOfSpeech: word.partOfSpeech}}" tag="td">
      <a class="link part-of-speech">{{ word.partOfSpeech }}</a>
    </router-link>
    <td class="actions">
      <img
        @click="$emit('change-word')"
        class="change"
        src="@/assets/pencil.svg"
        alt="Изменить слово"
        title="Изменить слово"
      >
      <img
        @click="$emit('delete-word')"
        class="delete"
        src="@/assets/trashcan.svg"
        alt="Удалить слово"
        title="Удалить слово"
      >
    </td>
  </tr>
</template>

<script>
export default {
  props: ["word"],
  computed: {
    wordStateClass() {
      return this.word.state === "struggle"
        ? "table-warning"
        : this.word.state === "learned"
        ? "table-info"
        : "";
    }
  }
};
</script>

<style lang="scss" scoped>
.link {
  display: block;
  color: inherit;
  text-decoration: underline;

  &:hover {
    color: #0056b3;
  }
}
.part-of-speech {
  font-size: 16px;
  letter-spacing: 0.5px;
  color: #005dc0;
}
.actions {
  padding: 7.5px 0;
  min-width: 77px;
}
.change {
  margin-right: 3px;
}
th,
.translation {
  width: 30%;
}
tr:hover .change,
tr:hover .delete {
  opacity: 1;
}
.change,
.delete {
  box-sizing: content-box;
  width: 27px;
  height: 27px;
  cursor: pointer;
  padding: 5px;
  border-radius: 5px;
  opacity: 0;

  &:hover {
    background-color: #e9e9e9;
  }
  &:active {
    background-color: #e4e4e4;
  }
}
@media screen and (max-width: 991px) {
  .change,
  .delete {
    opacity: 1;
  }
}
</style>
