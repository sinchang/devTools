<template>
  <div class="container">
    <el-alert
      class="page-title"
      :closable="false"
      title="DevTools: IP 查询"
      type="info">
    </el-alert>
    <el-input
      v-model="ip"
      placeholder="Enter IP"
      size="small"
      @blur="getIpInfo"
      class="input"></el-input>
    <p class="result">{{data.country}} {{data.region}} {{data.city}}</p>
    <p class="result">{{data.organization}}</p>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Ip',
  data() {
    return {
      data: {},
      ip: ''
    }
  },
  created() {
    this.getIpInfo()
  },
  methods: {
    getIpInfo() {
      axios(`https://api.ip.sb/geoip/${this.ip}`)
        .then(data => {
          this.ip = data.data.ip
          this.data = data.data
        })
        .catch(error => {
          this.$message({
            message: error.response.data.message || error.message,
            type: 'error'
          })
        })
    }
  }
}
</script>

<style lang="less" scoped>
.input {
  display: block;
  margin: 0 auto 60px auto;
  width: 200px;
}

.result {
  margin: 30px auto;
  text-align: center;
  font-size: 30px;
}
</style>