<template>
  <div class="page_view">

    <div id="myChart2" class="chart-view"></div>

  </div>
</template>

<script>
export default {
  name: 'echart',
  props: {
    data: [],
    type: {
      type: String
    },
    legend_data: [],
    indecatior_data: [],
    series_data: [],
  },
  data () {
    return {}
  },
  watch: {
    data: {
      handler (newV, oldV) {
        console.log(oldV, newV);
        this.chart2_data = [];
        this.data = newV;
        this.getData();
        this.showChart2();
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
  mounted(){
    //页面加载完成后,才执行
    setTimeout(() => {
    this.showChart2();
    }, 500);
  },
  methods: {
    showChart2()
    {

      // 基于准备好的dom，初始化echarts实例
      let myChart2 = this.$echarts.init(document.getElementById('myChart2'))
      // 绘制图表
      var option2 = {
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        toolbox: {
                feature: {
                    saveAsImage: {show: true}
                }
            },
        legend: {
            data: this.legend_data,
        },
        radar: {
            // shape: 'circle',
            indicator: this.indecatior_data
        },
        series: [{
            type: 'radar',
            data: this.series_data,
            emphasis: {       
                label: {
                  show: true,
                  color: '#fff',
                  fontSize: 12,
                  formatter: '{c}%',       // 鼠标悬浮时展示数据加上单位
                  backgroundColor: '#0D1B42',
                  borderRadius: 5,
                  padding: 3,
                  shadowBlur: 3
                }
              }
        }]
      };

      myChart2.setOption(option2)
    },
  }
}
</script>

<style>

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

#myChart2{
    margin-top: 0;
    padding-top: 0;
}
</style>

