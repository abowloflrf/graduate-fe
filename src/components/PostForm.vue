<template>
    <Form :model="formItem" :label-width="80">
        <FormItem>
            <Upload v-on:upload-img="formItem.cover=$event"></Upload>
        </FormItem>
        <FormItem label="位置">
            <Input v-model="formItem.placeDetail" placeholder="这具体是哪里呢"></Input>
        </FormItem>
        <FormItem label="内容">
            <Input v-model="formItem.content" type="textarea" :autosize="{minRows:5}" placeholder="说说这个地方有什么奇妙的回忆"></Input>
        </FormItem>
        <FormItem label="区域">
            <Select v-model="formItem.placeId">
                <Option value="1">宿舍楼</Option>
                <Option value="2">运动场</Option>
                <Option value="3">教学区</Option>
                <Option value="4">图书馆</Option>
                <Option value="5">食堂</Option>
                <Option value="6">花园</Option>
                <Option value="7">其他</Option>
            </Select>
        </FormItem>
        <FormItem label="昵称">
            <Input v-model="formItem.authorName" placeholder="随便起个昵称吧"></Input>
        </FormItem>
        <FormItem label="学院">
            <Select v-model="formItem.authorSchool">
                <Option value="计通">计通</Option>
                <Option value="材料">材料</Option>
                <Option value="机械">机械</Option>
                <Option value="数理">数理</Option>
                <Option value="文法">文法</Option>
                <Option value="自动化">自动化</Option>
                <Option value="高工">高工</Option>
                <Option value="外院">外院</Option>
                <Option value="化生">化生</Option>
                <Option value="能环">能环</Option>
                <Option value="经管">经管</Option>
                <Option value="冶金">冶金</Option>
                <Option value="土资">土资</Option>
                <Option value="马克思">马克思</Option>
            </Select>
        </FormItem>
        <FormItem label="年级">
            <DatePicker v-model="formItem.authorLevel" type="year" placeholder="2014 级" style="width: 200px"></DatePicker>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="submitPost()">提交</Button>
            <Button type="ghost" style="margin-left: 8px" @click="$router.go(-1)">返回</Button>
        </FormItem>
    </Form>
</template>
<script>
import Upload from "./Upload.vue";
export default {
    components: {
        Upload
    },
    data() {
        return {
            formItem: {
                covor: "",
                placeDetail: "",
                content: "",
                authorName: "",
                authorSchool: "",
                authorLevel: "",
                placeId: ""
            }
        };
    },
    methods: {
        submitPost: function() {
            if (!this.isValid) {
                this.$Message.info("请填写完整");
                return;
            }
            this.$axios
                .post("/api/post", this.formItem)
                .then(response => {
                    if (response.data.status) {
                        this.$Message.success(response.data.msg);
                        const pid = this.formItem.placeId;
                        this.$router.push({ name: "place", params: { pid } });
                        return;
                    }
                })
                .catch(function(error) {
                    console.error(error);
                });
        }
    },
    computed: {
        isValid: function() {
            return (
                this.formItem.cover != "" &&
                this.formItem.placeId != "" &&
                this.formItem.placeDetail != "" &&
                this.formItem.content != "" &&
                this.formItem.authorName != "" &&
                this.formItem.authorSchool != "" &&
                this.formItem.authorLevel != ""
            );
        }
    }
};
</script>
