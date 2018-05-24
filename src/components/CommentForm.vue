<template>
    <div style="margin-bottom:15px">
        <Form ref="formInline" inline>
            <FormItem prop="name" :style="{width:'31%'}">
                <Input type="text" v-model="formItem.authorName" placeholder="昵称"></Input>
            </FormItem>
            <FormItem prop="school" :style="{width:'31%'}">
                <Select v-model="formItem.authorSchool" placeholder="学院">
                    <Option value="计通">计通</Option>
                    <Option value="机械">机械</Option>
                    <Option value="文法">文法</Option>
                </Select>
            </FormItem>
            <FormItem prop="level" :style="{width:'31%'}">
                <DatePicker v-model="formItem.authorLevel" type="year" placeholder="2014级"></DatePicker>
            </FormItem>
        </Form>

        <Input v-model="formItem.comment" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="你又有什么感触..."></Input>
        <Button @click="publicComment" style="margin-top:15px">留言</Button>
    </div>
</template>
<script>
export default {
    data() {
        return {
            formItem: {
                postId: this.$route.params.id,
                authorName: "",
                authorSchool: "",
                authorLevel: "2014",
                comment: ""
            }
        };
    },
    methods: {
        publicComment: function() {
            if (!this.isValid) {
                this.$Message.info("请填写完整");
                return;
            }
            this.$axios
                .post(
                    "/api/post/" + this.formItem.postId + "/comment",
                    this.formItem
                )
                .then(response => {
                    if (response.data.status) {
                        this.$Message.success(response.data.msg);
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
                this.formItem.placeId != "" &&
                this.formItem.conmment != "" &&
                this.formItem.authorName != "" &&
                this.formItem.authorSchool != "" &&
                this.formItem.authorLevel != ""
            );
        }
    }
};
</script>
