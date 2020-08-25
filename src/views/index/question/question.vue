<template>
  <div class="question-container">
    <!-- 头部卡片 -->
    <el-card class="head-card">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="学科">
          <el-select v-model="formInline.subject" placeholder="请选择学科">
            <el-option v-for="item in subjectList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="阶段">
          <el-select v-model="formInline.step" placeholder="请选择阶段">
            <el-option label="初级" :value="1"></el-option>
            <el-option label="中级" :value="2"></el-option>
            <el-option label="高级" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业">
          <el-select v-model="formInline.enterprise" placeholder="请选择企业">
            <el-option v-for="item in enterpriseList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="题型">
          <el-select v-model="formInline.type" placeholder="请选择题型">
            <el-option label="单选" :value="1"></el-option>
            <el-option label="多选" :value="2"></el-option>
            <el-option label="简答" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <br />
        <el-form-item label="难度">
          <el-select v-model="formInline.difficulty" placeholder="请选择难度">
            <el-option label="简单" :value="1"></el-option>
            <el-option label="一般" :value="2"></el-option>
            <el-option label="困难" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="作者">
          <el-input v-model="formInline.username"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="formInline.status" placeholder="请选择状态">
            <el-option label="禁用" value="0"></el-option>
            <el-option label="启用" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker v-model="formInline.create_date" placeholder=""></el-date-picker>
        </el-form-item>
        <br />
        <el-form-item label="标题" class="title-input">
          <el-input v-model="formInline.title"></el-input>
        </el-form-item>
        <el-form-item class="btn-form-item">
          <el-button type="primary" @click="getData">搜索</el-button>
          <el-button @click="clear">清除</el-button>
          <el-button @click="addFormVisible = true" type="primary" icon="el-icon-plus">新增学科</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 身体卡片 -->
    <el-card class="body-card">
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column type="index" label="序号"> </el-table-column>
        <el-table-column prop="title" label="题目">
          <template slot-scope="scope">
            <span v-html="scope.row.title"></span>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="学科·阶段">
          <template slot-scope="scope">
            {{ scope.row.subject_name }}
            {{ { 1: "初级", 2: "中级", 3: "高级" }[scope.row.step] }}
          </template>
        </el-table-column>
        <el-table-column prop="type" label="题型">
          <template slot-scope="scope">
            {{ { 1: "单选", 2: "多选", 3: "简答" }[scope.row.type] }}
            <!-- {{ scope.row.type | fomatType }} -->
          </template>
        </el-table-column>
        <el-table-column prop="enterprise_name" label="企业"> </el-table-column>
        <el-table-column prop="username" label="创建者"> </el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status === 1">启用</span>
            <span class="red" v-else>禁用</span>
          </template>
        </el-table-column>
        <el-table-column prop="reads" label="访问量"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="showEdit(scope.row)">编辑</el-button>
            <el-button type="text" @click="changeStatus(scope.row)">{{
              scope.row.status === 1 ? "禁用" : "启用"
            }}</el-button>
            <el-button type="text" v-power="['学生', '老师']" @click="removeItem(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="pageSizes"
        :page-size="limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
    <!-- 新增框 -->
    <addDialog></addDialog>
    <!-- 编辑框框 -->
    <editDialog ref="editDialog"></editDialog>
  </div>
</template>

<script>
// 企业列表 接口
import { enterpriseList } from "../../../api/enterprise.js";
// 学科列表 接口
import { subjectList } from "../../../api/subject.js";
// 题库列表接口
import { questionList, questionStatus, questionRemove } from "../../../api/question.js";
// 导入新增框
import addDialog from "./components/addDialog.vue";
// 导入编辑框
import editDialog from "./components/editDialog.vue";
export default {
  name: "question",
  // 注册组件
  components: {
    addDialog,
    editDialog
  },
  filters: {
    fomatType(type) {
      let typeStr = "";
      switch (type) {
        case 1:
          typeStr = "单选";
          break;
        case 2:
          typeStr = "多选";
          break;
        case 3:
          typeStr = "简答";
          break;
      }
      return typeStr;
    }
  },
  data() {
    return {
      // 筛选的数据
      formInline: {},
      // table绑定的数据
      tableData: [],
      // 定义企业数据
      enterpriseList: [],
      // 定义学科数据
      subjectList: [],
      // 是否显示新增框
      addFormVisible: false,
      // 是否显示 编辑框
      editFormVisible: false,
      // 分页相关的数据
      // 页码
      page: 1,
      // 页容量
      limit: 2,
      // 容量数组
      pageSizes: [2, 4, 6, 8],
      // 总条数
      total: 0
    };
  },
  created() {
    // 获取企业数据
    enterpriseList().then(res => {
      // window.console.log(res.data.items)
      this.enterpriseList = res.data.items;
    });
    // 获取 学科数据
    subjectList().then(res => {
      this.subjectList = res.data.items;
    });

    // 调用 数据获取接口
    this.getData();
  },
  methods: {
    clear() {
      this.formInline = {};
      // 重新获取数据
      this.getData();
    },
    getData() {
      // 调用接口 传递 筛选数据即可
      questionList({
        page: this.page,
        limit: this.limit,
        ...this.formInline
      }).then(res => {
        // window.console.log(res)
        // 赋值给 tableData
        this.tableData = res.data.items;
        // 总条数
        this.total = res.data.pagination.total;
      });
    },
    // 页容量改变
    handleSizeChange(limit) {
      this.limit = limit;
      // 重新获取数据
      this.getData();
    },
    // 页码改变
    handleCurrentChange(page) {
      this.page = page;
      // 重新获取数据
      this.getData();
    },
    // 修改状态
    changeStatus(item) {
      questionStatus({ id: item.id }).then(res => {
        if (res.code === 200) {
          this.$message.success("状态修改成功");
          this.getData();
        }
      });
    },
    // 删除数据
    removeItem(item) {
      this.$confirm("你真的要把他删掉吗？o(╥﹏╥)o", "友情提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          questionRemove({
            id: item.id
          }).then(res => {
            if (res.code === 200) {
              this.$message.success("删除成功");
              if (this.tableData.length == 1) {
                // 一会刷新就没有数据了
                // 修改页码
                this.page--;
                // 三元表达式
                // 如果 this.page 小于1 那么就变为1 否则 是什么就是什么
                // this.page = this.page<1?1:this.page
                if (this.page < 1) {
                  this.page = 1;
                }
              }
              this.getData();
            }
          });
        })
        .catch(() => {});
    },
    // 进入编辑状态
    showEdit(item) {
      // 修改标记的布尔值 让他弹出来
      this.editFormVisible = true;
      // 深拷贝 并赋值
      this.$refs.editDialog.editForm = JSON.parse(JSON.stringify(item));
      // 处理 城市信息
      this.$refs.editDialog.editForm.city = this.$refs.editDialog.editForm.city.split(',');
    }
  }
};
</script>
<style lang="less">
// css作用域
.question-container {
  .head-card {
    // 设置按钮的容器尺寸
    .el-form-item__content {
      width: 149px;
    }
    .short-input .el-form-item__content {
      width: 100px;
    }
    .btn-form-item .el-form-item__content {
      width: 100%;
    }
  }

  // 分页
  .el-pagination {
    text-align: center;
    margin-top: 30px;
  }
  .body-card {
    margin-top: 19px;
  }

  // 高亮的span
  span.red {
    color: #ff4b4b;
  }
  .head-card .el-form-item {
    .el-form-item__label {
      padding-left: 30px;
      padding-right: 30px;
    }
  }
  // 标题
  .title-input .el-form-item__content {
    width: 388px;
  }

  // .el-form--inline  .el-form-item:not(.title-input)
  //   选择器1         后代的 选择器2 但是没有.title-input这个类名
  .el-form--inline .el-form-item:not(.title-input) {
    margin-right: 0;
  }
}
</style>
