<template>
    <div>
        <Form ref="formInline" inline>
            <FormItem prop="name">
                <Input type="text" v-model="formItem.user" placeholder="昵称"></Input>
            </FormItem>
            <FormItem prop="school">
                <Select v-model="formItem.school">
                    <Option value="beijing">New York</Option>
                    <Option value="shanghai">London</Option>
                    <Option value="shenzhen">Sydney</Option>
                </Select>
            </FormItem>
            <FormItem prop="level">
                <DatePicker v-model="formItem.level" type="year" placeholder="2014级"></DatePicker>
            </FormItem>
        </Form>
        <Input v-model="formItem.textarea" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
    </div>
</template>
<script>
export default {
    data() {
        return {
            formItem: {
                name: "",
                school: "",
                level: ""
            }
        };
    },
    methods: {}
};
</script>
