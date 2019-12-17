<template>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="学科编号">
            <el-input class="number" v-model="formInline.user"></el-input>
        </el-form-item>
        <el-form-item label="学科名称">
            <el-input class="name" v-model="formInline.user"></el-input>
        </el-form-item>
        <el-form-item label="创建者">
            <el-input class="establish" v-model="formInline.user"></el-input>
        </el-form-item>
        <el-form-item label="状态">
            <el-select class="status" v-model="formInline.region" placeholder="请选择状态">
                <el-option label="西兰花炒蛋" value="shanghai"></el-option>
                <el-option label="榴莲排骨汤" value="beijing"></el-option>
                <el-option label="鸡蛋炒肉" value="beijing"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item>
            <el-button class="search" type="primary" @click="onSubmit">搜索</el-button>
        </el-form-item>
        <el-form-item>
            <el-button class="clear" @click="onSubmit">清除</el-button>
        </el-form-item>
        <el-form-item>
            <el-button class="add" type="primary" @click="onSubmit">
                <i>+</i>
                新增学科
            </el-button>
        </el-form-item>
    </el-form>
</template>

<script>
export default {
    
}
</script>

<style>
.number,.establish {
        width: 100px;
    }

.name,.status {
        width: 149px;
    }

.search, .clear {
        width: 70px;
    }

.add {
    width: 117px;
}

.add i {
    width: 14px;
    height: 14px;
    font-weight: bold;
}
</style>