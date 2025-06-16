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
    }
  },
  data () {
    return {
      chart2_data: [],
    }
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
  created () {
    this.getData();
  },
  mounted(){
    //页面加载完成后,才执行
    setTimeout(() => {
    this.showChart2();
    }, 500);
  },
  methods: {
    getData() {
      console.log(this.data);
      var title;
      var chose;
      for (var i=0; i<this.data.length; i++) {
        title = this.data[i].title;
        chose = this.data[i].chose;
        if (this.type === 'mark') {
          title = (i+1).toString();
        }
        this.chart2_data.push({
          value: chose,
          name: title
        });
      }
    },
    showChart2()
    {
      // 基于准备好的dom，初始化echarts实例
      let myChart2 = this.$echarts.init(document.getElementById('myChart2'))
      // 绘制图表
      var option2 = {
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            toolbox: {
                feature: {
                    saveAsImage: {show: true}
                }
            },
            series: {
                name: '选择人数',
                type: 'pie',
                radius : '55%',
                // center: ['50%', '50%'],
                data: this.chart2_data,
                label: {
                    formatter: function(params) {
                        var name = params.name;
                        var maxLength = 4;
                        var rowNumber = Math.ceil(name.length / maxLength);
                        var result = '';
                        
                        if (rowNumber > 1) {
                            for (var i = 0; i < rowNumber; i++) {
                                var start = i * maxLength;
                                var end = start + maxLength;
                                result += name.substring(start, end);
                                if (i < rowNumber - 1) {
                                    result += '\n';
                                }
                            }
                            return result;
                        } else {
                            return name;
                        }
                    },
                    rich: {
                        a: {
                            lineHeight: 20
                        }
                    }
                },
                // 增加标签与图形的距离
                labelLine: {
                    length: 15,
                    length2: 10
                }
            }
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

