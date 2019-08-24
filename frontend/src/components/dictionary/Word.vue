<template>
  <tr :class="wordStateClass">
    <th scope="row">{{ word.name }}</th>
    <td>{{ word.translation }}</td>
    <td>{{ word.partOfSpeech }}</td>
    <td class="actions">
      <img class="change" src="@/assets/pencil.svg" alt="Изменить слово" title="Изменить слово">
      <img class="delete" src="@/assets/trashcan.svg" alt="Удалить слово" title="Удалить слово">
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
.actions {
  padding: 5.5px 0;
}
.change {
  margin-right: 3px;
}
tr:hover .change,
tr:hover .delete {
  opacity: 1;
}
.change,
.delete {
  box-sizing: content-box;
  width: 26px;
  height: 26px;
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
</style>
