<template>
    <div>
        <div id="myChart1" class="chart-view"></div>
    </div>
</template>

<script>
export default {
  name: 'echart',
  props: {
    data: [],
    type: {
      type: String
    }
  },
  data () {
    return {
      chart1_name:[],
      chart1_data:[],
    }
  },
  created: function () {
    // `this` 指向 vm 实例
    this.getData();

  },
  mounted(){
    //页面加载完成后,才执行
    setTimeout(() => {
    this.showChart1();
    }, 1000);
  },
  watch: {
    data: {
      handler (newV, oldV) {
        console.log(oldV, newV);
        this.chart1_name = [];
        this.chart1_data = [];
        this.data = newV;
        this.getData();
        this.showChart1();
      },
      deep: true,
    },
    type: {
      handler(newV, oldV) {
        console.log(oldV, newV);
        this.type = newV;
      }
    }
  },
  methods: {
    getData() {
      var title;
      var chose;
      for (var i=0; i<this.data.length; i++) {
        title = this.data[i].title;
        chose = this.data[i].chose;
        if (this.type === 'mark') {
          this.chart1_name.push((i+1).toString());
        } else {
          this.chart1_name.push(title);
        }
        this.chart1_data.push(chose);
      }
    },
    showChart1()
    {
        // 基于准备好的dom，初始化echarts实例
        let myChart1 = this.$echarts.init(document.getElementById('myChart1'))
        // 绘制图表
        myChart1.setOption({
            title: { text: this.chart1_title },
            tooltip: {},
            toolbox: {
                feature: {
                    saveAsImage: {show: true}
                }
            },
            xAxis: {
                data: this.chart1_name,
                name: '选项',
                axisLabel: {
                    interval: 0,
                    formatter: function (value) {
                        var ret = "";
                        var maxLength = 4;
                        var rowNumber = Math.ceil(value.length / maxLength);
                        if (rowNumber > 1) {
                            for (var i = 0; i < rowNumber; i++) {
                                var start = i * maxLength;
                                var end = start + maxLength;
                                var temp = value.substring(start, end) + "\n";
                                ret += temp;
                            }
                            return ret;
                        } else {
                            return value;
                        }
                    },
                    rotate: 0, // 如果需要，可以设置标签旋转角度
                    margin: 15 // 增加标签的边距
                }
            },
            yAxis: {
                type: 'value',
                name: '填写人数',
                axisLabel: {
                    formatter: '{value} '
                }
            },
            series: [{
                name: this.chart1_dataName,
                type: 'bar',
                data:this.chart1_data,
            }]
        });
    },
  }
}
</script>

<style scoped>
.page_view
{
  padding:20px 3%;
  text-align: center;
}

.title{
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.chart-view{
  margin: 20px auto;
  width: 400px;
  height: 400px;
}

</style>