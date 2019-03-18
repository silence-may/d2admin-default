<template>
  <d2-container :filename="filename" class="page">
  </d2-container>
</template>

<script>
export default {
  data () {
    return {
      filename: __filename
    }
  }
}
</script>