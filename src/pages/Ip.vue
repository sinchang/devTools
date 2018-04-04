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
import Http from '../common/api'
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
      Http({ url: `https://api.ip.sb/geoip/${this.ip}` })
        .then(data => {
          this.ip = data.ip
          this.data = data
        })
        .catch(error => {
          this.$message({
            message: error.data.message || error,
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