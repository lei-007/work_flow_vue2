<template>
  <div id="workFlow">
    <el-container>
      <ProcessTree />
    </el-container>
  </div>
</template>

<script>
import ProcessTree from './views/index.vue'

export default {
  name: 'workFlow',
  components: {
    ProcessTree,
  },
  data() {
    return {
      isNew: true,
      validStep: 0,
      activeSelect: '',
      validVisible: false,
      validResult: {},
    }
  },
  computed: {
    setup() {
      return this.$store.state.design
    },
  },
  created() {
    this.loadInitFrom()
    // 暴露时间获取数据
    window.workflow.getData = () => {
      return this.doPublish()
    }
  },
  methods: {
    // 初始化
    loadInitFrom() {
       let formItems = []
       let process = {
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
        }
      if(window.workflow.initData){
        formItems = window.workflow.initData.formItems
        process = window.workflow.initData.process
      }

      this.$store.commit('loadForm', {
        // formId: null,
        // formName: "未命名表单",
        // logo: {
        //   icon: "el-icon-eleme",
        //   background: "#1e90ff"
        // },
        // settings: {
        //   commiter: [],
        //   admin: [],
        //   sign: false,
        //   notify: {
        //     types: ["APP"],
        //     title: "消息通知标题"
        //   }
        // },
        // groupId: undefined,
        formItems: formItems,
        process: process
        // remark: "备注说明"
      })
    },

    // 获取流程数据
    doPublish() {
      let template = {
        // formId: this.setup.formId,
        // formName: this.setup.formName,
        // logo: JSON.stringify(this.setup.logo),
        // settings: JSON.stringify(this.setup.settings),
        // groupId: this.setup.groupId,
        formItems: JSON.stringify(this.setup.formItems),
        process: JSON.stringify(this.setup.process),
        // remark: this.setup.remark
      }
      return template
    }
  }
}
</script>

<style lang="less">
@import "@/assets/global";

:focus {
  outline: -webkit-focus-ring-color auto 0px;
}

#workFlow {
  margin: 0;
  min-width: 500px;
  background-color: #f5f6f6;
  min-height: 100%;
}

body,
html {
  margin: 0;
  height: 100%;
  // overflow: hidden;
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
// }</style>

