<template>
  <div id="app">
    <el-container>
      <!-- <el-header style="background: white">
        <LayoutHeader  @publish="publishProcess" @preview="preview"></LayoutHeader>
      </el-header> -->
      <!-- <div class="layout-body"> -->
        <ProcessTree />
      <!-- </div> -->
    </el-container>
  </div>
</template>

<script>
import ProcessTree from './views/index.vue'
// import LayoutHeader from './components/header/LayoutHeader.vue'

export default {
  name: 'App',
  components: {
    ProcessTree,
    // LayoutHeader
  },
  data(){
    return{
      isNew: true,
      validStep: 0,
      timer: null,
      activeSelect: '',
      validVisible: false,
      validResult: {},
    }
  },
  computed: {
    setup() {
      return this.$store.state.design
    },
    // errTitle(){
    //   if (this.validResult.finished && !this.validResult.success){
    //     return this.validResult.title + ` (${this.validResult.errs.length}项错误) 😥`
    //   }
    //   return this.validResult.title
    // },
    // validIcon() {
    //   if (!this.validResult.finished) {
    //     return 'el-icon-loading'
    //   } else if (this.validResult.success) {
    //     return 'success'
    //   } else {
    //     return 'warning'
    //   }
    // }
  },
  created() {
    this.loadInitFrom()
    document.getElementById(window.workflow.id).getData = () =>{
      this.doPublish()
    }
  },
  beforeDestroy() {
    this.stopTimer()
  },
  methods: {
    loadInitFrom() {
      this.$store.commit('loadForm', {
        formId: null,
        formName: "未命名表单",
        logo: {
          icon: "el-icon-eleme",
          background: "#1e90ff"
        },
        settings: {
          commiter: [],
          admin: [],
          sign: false,
          notify: {
            types: ["APP"],
            title: "消息通知标题"
          }
        },
        groupId: undefined,
        formItems: [],
        process: {
          id: "root",
          parentId: null,
          type: "ROOT",
          name: "发起人",
          desc: "任何人",
          props: {
            assignedUser: [],
            formPerms: []
          },
          children: {}
        },
        remark: "备注说明"
      })
    },
    validateDesign() {
      this.doAfter()
      // this.validVisible = true
      // this.validStep = 0
      // this.showValiding()
      // this.stopTimer()
      // this.timer = setInterval(() => {
      //   this.validResult.errs = this.$refs[this.validComponents[this.validStep]].validate()
      //   if (Array.isArray(this.validResult.errs) && this.validResult.errs.length === 0) {
      //     this.validStep++;
      //     if (this.validStep >= this.validOptions.length) {
      //       this.stopTimer()
      //       this.showValidFinish(true)
      //     }
      //   } else {
      //     this.stopTimer()
      //     this.validOptions[this.validStep].status = 'error'
      //     this.showValidFinish(false, this.getDefaultValidErr())
      //   }
      // }, 300)
    },
    // getDefaultValidErr() {
    //   switch (this.validStep) {
    //     case 0:
    //       return '请检查基础设置项';
    //     case 1:
    //       return '请检查审批表单相关设置'
    //     case 2:
    //       return '请检查审批流程，查看对应标注节点错误信息'
    //     case 3:
    //       return '请检查扩展设置'
    //     default:
    //       return '未知错误'
    //   }
    // },
    // showValidFinish(success, err) {
    //   this.validResult.success = success
    //   this.validResult.finished = true
    //   this.validResult.title = success ? '校验完成 😀' : '校验失败 '
    //   this.validResult.desc = success ? '设置项校验成功，是否提交？' : err
    //   this.validResult.action = success ? '提 交' : '去修改'
    // },
    // showValiding() {
    //   this.validResult = {
    //     errs: [],
    //     finished: false,
    //     success: false,
    //     title: '检查中...',
    //     action: '处理',
    //     desc: '正在检查设置项'
    //   }
    //   this.validStep = 0
    //   this.validOptions.forEach(op => {
    //     op.status = ''
    //     op.icon = ''
    //     op.description = ''
    //   })
    // },
    doAfter() {
      // if (this.validResult.success) {
        this.doPublish()
      // } else {
      //   this.activeSelect = this.validComponents[this.validStep]
      //   this.validVisible = false
      // }
    },
    stopTimer() {
      if (this.timer) {
        clearInterval(this.timer)
      }
    },
    preview() {
      this.validateDesign()
    },
    publishProcess() {
      this.validateDesign()
    },
    doPublish() {
      // this.$confirm('如果您只想预览请选择预览，确认发布后流程立即生效，是否继续?', '提示', {
      //   confirmButtonText: '发布',
      //   cancelButtonText: '取消',
      //   type: 'warning'
      // }).then(() => {
      //   console.log(this.setup)
        let template = {
          formId: this.setup.formId,
          formName: this.setup.formName,
          logo: JSON.stringify(this.setup.logo),
          settings: JSON.stringify(this.setup.settings),
          groupId: this.setup.groupId,
          formItems: JSON.stringify(this.setup.formItems),
          process: JSON.stringify(this.setup.process),
          remark: this.setup.remark
        }
        // console.log(this.setup.process)
       return template

        // if (this.isNew || !this.$isNotEmpty(this.setup.formId)) {
          // createForm(template).then(rsp => {
          //   this.$message.success("创建表单成功")
          //   this.$router.push("/formsPanel")
          // }).catch(err => {
          //   this.$message.error(err)
          // })
        // } else {
          // updateFormDetail(template).then(rsp => {
          //   this.$message.success("更新表单成功")
          //   this.$router.push("/formsPanel")
          // }).catch(err => {
          //   this.$message.error(err)
          // })
        // }
      // })
    }
  }
}
</script>

<style lang="less">
	@import "@/assets/global";
	:focus {
		outline: -webkit-focus-ring-color auto 0px;
	}
	body {
		margin: 0;
		min-width: 500px;
		background-color: #f5f6f6;
	}
	body,html {
    margin:0; 
    height: 100%;
    overflow: hidden;
  }
	ul {
		padding: 0;
		margin: 0;

		li {
			list-style-type: none;
		}
	}

//   .layout-body {
//   min-width: 980px;
//   height: calc(100vh - 60px);
//   overflow-y: scroll;
// }
</style>

