<template>
<div id='sum'>
    <div>
        <h1>图表报告</h1>
    </div>
    <div >
        <el-card class="box-card investigation">
          <div slot="header" class="clearfix" style="display:inline">
              <h3 style="display:inline">问题{{nowid}}</h3>
              <div v-if="nowid!==1" style="display:inline">
                <el-button style="float: left; padding: 3px 0" type="text" @click="frontpage">上一页</el-button>
              </div>
              <div v-else style="display:inline">
                <el-button disabled style="float: left; padding: 3px 0" type="text">上一页</el-button>
              </div>
              <div v-if="nowid!==questions.length" style="display:inline">
                <el-button style="float: right; padding: 3px 0" type="text" @click="nextpage">下一页</el-button>
              </div>
              <div v-else style="display:inline">
                <el-button disabled style="float: right; padding: 3px 0" type="text">下一页</el-button>
              </div>
          </div>
          <div id="que">
            <el-col :span="17" class="block-content">
              <div class="block-title">
                  {{ item.id }}. {{ item.title }} <span class="must" v-if="item.must">(必填)</span>
              </div>
              <div v-if="item.type!=='mark'" >
                <div class="block-choice" v-for="ans in item.options" :key="ans.id">
                  <!--                  单选和判断-->
                  <el-radio v-if="item.type==='radio'||item.type==='judge'" value="0">
                    <span>{{ ans.title }} </span>
                    <span v-if="item.is_exam_question&&ans.title==item.right_answer" style="color: #51c215;">（正确答案）</span>
                  </el-radio>
                  <!--                  多选-->
                  <el-checkbox v-if="item.type==='checkbox'" value="0">
                    <span>{{ ans.title }} </span>
                    <span v-if="item.is_exam_question&&comp(ans.title,item.right_answerList)" style="color: #51c215;">（正确答案）</span>
                  </el-checkbox>
                  <!--                  填空-->
                  <el-input
                      v-if="item.type==='text'"
                      type="textarea"
                      placeholder="请输入内容"
                      v-bind="ans.title"
                      style="width:80%">
                  </el-input>
                  <!--               个人信息-->
                  <el-input
                      v-if="item.type==='name' || item.type==='stuId' || item.type==='class' || item.type==='school'"
                      v-bind="ans.title">
                  </el-input>
                </div>
              </div>
              <div v-else class="block-choice">
                <!--                  评分-->
                <el-rate v-if="item.type==='mark'"
                         :max="item.score">
                </el-rate>
              </div>

              <div v-if="item.is_exam_question">
                  <div class="block-point">
                    <div v-if="item.point===''">分值：0</div>
                    <div v-else>分值：{{ item.point }}</div>
                  </div>
                  <div id="correctrate">
                    <span style="color:red;">正确率：{{(item.accuracy*100).toFixed(2)}}%</span>
                  </div>
                  <div class="block-refer" >
                    <div v-if="item.right_answer===''">参考答案：无</div>
                    <div v-else-if="item.type!='checkbox'">参考答案：{{ item.right_answer }}</div>
                    <div v-else>
                      <span>参考答案：</span>
                       <span v-for="(one,index) in item.right_answerList" :key="index">{{one}}; </span>
                    </div>
                  </div>
              </div>
            </el-col>
          </div>

          <el-row :gutter="20" style="clear:both" v-if="item.type!=='text'&&item.type!=='name'&&item.type!=='class'&&item.type!=='stuId'&&item.type!=='school'&&item.type!=='location'">

            <el-col :span="6">
              <h3 style="float:left; margin: 30px 0 60px;">数据统计</h3>
              <div id="staticdata" style="">
                <el-table
                  :data="item.options.slice((currentPage-1)*pageSize,currentPage*pageSize)"
                  border
                  style="width: 100%">
                  <el-table-column
                    prop=title
                    label="评分"
                    v-if="item.type==='mark'"
                    >
                  </el-table-column>
                  <el-table-column
                      prop=title
                      label="选项"
                      v-else
                  >
                  </el-table-column>
                  <el-table-column
                    prop=chose
                    label="选择人数"
                    >
                  </el-table-column>
                </el-table>
                <el-pagination layout="prev, pager, next" 
                  background
                  :current-page="currentPage" 
                  :page-size="pageSize"
                  :total="item.options.length" 
                  @current-change="handleCurrentChange"
                  style="margin: 20px"
                  v-if="item.options.length>5">
                </el-pagination>

                <!-- <div id="correctrate" v-if="item.is_exam_question">
                  <span>正确率：</span>
                  <span style="color:red;">{{(item.accuracy*100).toFixed(2)}}%</span>
                </div> -->
              </div>
              <div class="grid-content bg-purple"></div>
            </el-col>
            <el-col :span="6">
              <div id="staticgram">
                <div>
                  <div style="margin: 20px; float: left; clear:both" >
                    <el-radio-group v-model="radio2" size="medium">
                      <el-radio-button label="饼图" @click.native="pieswi"></el-radio-button>
                      <el-radio-button label="柱状图" @click.native="histoswi"></el-radio-button>
                      <el-radio-button label="折线图" @click.native="lineswi"></el-radio-button>
                    </el-radio-group>
                  </div>
                  <div style="clear:both;">
                      <histogram3 v-if="choose===2" :data="item.options" :type="item.type"></histogram3>
                      <linechart3 v-else-if="choose===3" :data="item.options" :type="item.type"></linechart3>
                      <piechart3 v-else :data="item.options" :type="item.type"></piechart3>
                  </div>
                </div>
              </div>
              <div class="grid-content bg-purple"></div>
            </el-col>

          </el-row>

          <div v-else>
              <el-table
                  :data="item.tableData.slice((currentPage2-1)*pageSize2,currentPage2*pageSize2)"
                  border
                  style="width: 100%">
                  <el-table-column
                  prop="num"
                  label="编号"
                  width="180">
                  </el-table-column>
                  <el-table-column
                  prop="answer"
                  label="文本答案">
                  </el-table-column>
              </el-table>
              <el-pagination layout="sizes, prev, pager, next, jumper" 
                background
                :current-page="currentPage2" 
                :page-size="pageSize2"
                :page-sizes="pageSizes2" 
                :total="item.tableData.length" 
                @size-change="handleSizeChange2" 
                @current-change="handleCurrentChange2"
                style="margin: 20px"
                v-if="!loading">
                </el-pagination>
          </div>


        </el-card>
    </div>
</div>
</template>

<script>
import histogram3 from '../Echart/histogram3.vue'
import linechart3 from '../Echart/linechart3.vue'
import piechart3 from '../Echart/piechart3.vue'
export default{
    components:{
    histogram3,
    linechart3,
    piechart3
    },
    data() {
        return{
        currentPage2: 1,
        pageSize2: 7,
        pageSizes2:[5,7,10],
        currentPage: 1,
        pageSize: 5,
        nowid: 1,
        item:{},
        radio2: '饼图',
        choose: 1,
        tableData:[],
        questions:[]
        }
    },
    created() {
      let loadingIns = this.$loading({fullscreen: true, text: '拼命加载中'});
      const formData = new FormData();
      formData.append("qn_id", this.$route.query.pid);

      this.$axios({
        method: 'post',
        url: '/sm/get/qn/stat_analysis',
        data: formData,
      })
      .then(res => {
        loadingIns.close();
        if (res.data.status_code === 1) {
          this.questions = res.data.questions;
          this.item=this.questions[this.nowid-1];
        } else {
          this.$message.error("请求失败！");
        }
      })
      .catch(err => {
        console.log(err);
      });
    },
    methods:{
      // stateFormat(row, column, cellValue) {
      //     if (!cellValue) return ''
      //     if (cellValue.length > 200) { 
      //       return cellValue.slice(0, 200) + '...'
      //     }
      //     return cellValue
      //   },
      comp(title,list){
        for(let i=0;i<list.length;i++){
          if(title==list[i]) return true;
        }
        return false;
      },
        handleSizeChange2(val) {
          console.log(`每页 ${val} 条`);
          this.currentPage2 = 1;
          this.pageSize2 = val;
        },
        handleCurrentChange2(val) {
          console.log(`当前页: ${val}`);
          this.currentPage2 = val;
        },
        handleCurrentChange(val) {
          console.log(`当前页: ${val}`);
          this.currentPage = val;
        },
        frontpage: function(){
            this.nowid-=1;
            this.item=this.questions[this.nowid-1];
        },
        nextpage: function(){
            this.nowid+=1;
            this.item=this.questions[this.nowid-1];
        },
        pieswi: function(){
            this.choose=1
        },
        histoswi: function(){
            this.choose=2
        },
        lineswi: function(){
            this.choose=3
        }
    }
}
</script>


<style scoped>
    #sum{
        width: 90%;
        /* background-color: cyan; */
    }
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    margin: 20px;
  }

.investigation .must {
  font-weight: normal;
  color: crimson;
}

.investigation .block-title {
  text-align: left;
  /*border: solid 1px black;*/
  font-size: 16px;
  padding: 20px 10px 10px;
  font-weight: bold;
}

.investigation .block-choice {
  text-align: left;
  /*border: solid 1px black;*/
  font-size: 16px;
  padding: 5px 10px 10px;
}

.el-col-17 {
    margin-bottom: 50px;
    width: 95% !important;
    padding-left: 20px;
}

.el-col-6 {
    width: 50%;
    height: 535px;
    padding: 20px 50px !important;
    padding-top: 0 !important;
}

.block-refer {
  text-align: right;
  /*border: solid 1px black;*/
  font-size: 14px;
  padding-top: 8px;
  padding-left: 10px;
  color: #51c215;
}

.block-point {
  text-align: right;
  /*border: solid 1px black;*/
  font-size: 14px;
  padding-top: 8px;
  padding-left: 10px;
  color: #e59824;
}
#correctrate{
  text-align: right;
  font-size: 14px;
  padding-top: 8px;
  padding-left: 10px;
  /* margin: 20px;
  margin-left: 5px;
  text-align: left; */
}
/* #que{
   margin-bottom: 50px;
} */
</style>