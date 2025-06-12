<template>
  <div class="page_view">
    <div id="myChart4" class="chart-view"></div>
  </div>
</template>

<script>

export default {
  name: 'echart',
  props: {
    legend_data: [],
    x_data: [],
    series_data: [],
  },
  data () {
    return {}
  },
  mounted(){
    //页面加载完成后,才执行
    setTimeout(() => {
      this.showChart4();
    }, 500);
  },
  methods: {
 
    showChart4()
    {
      var myChart4= this.$echarts.init(document.getElementById('myChart4'));
      let option4 = {
                tooltip: {
                    trigger: 'axis',
                },
                toolbox: {
                    feature: {
                        saveAsImage: {show: true}
                    }
                },
                legend: {
                    data: this.legend_data
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: this.x_data,
                },
                yAxis: {
                    type: 'value',
                    axisLabel: {
                        formatter: '{value} %'
                    }
                },
                series: this.series_data
        };
         myChart4.setOption(option4)
    }
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

</style>

