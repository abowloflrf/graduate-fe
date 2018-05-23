<template>
    <input type="file" ref="fileInput" v-on:change="changeFile()">
    <!-- <Upload :before-upload="handleUpload" :format="['jpg','jpeg','png']">
        <Button type="ghost" icon="ios-cloud-upload-outline">Upload files</Button>
    </Upload> -->
</template>
<script>
import * as qiniu from "qiniu-js";
import SHA1 from "crypto-js/sha1";

export default {
    data() {
        return {
            file: null,
            uploadToken: "",
            uploadPercent: 0,
            uploadedImg: ""
        };
    },
    methods: {
        changeFile(files) {
            this.file = this.$refs.fileInput.files[0];
        },
        doUpload() {
            var self=this;
            //文件，要储存的key名，上传凭证，额外参数（源文件名，自定义变量，null），设置
            var key = SHA1(Date.now() + this.file.name);
            var putExtra = {
                fname: this.file.name,
                params: {},
                mimeType: null
            };
            var config = {};
            var observable = qiniu.upload(
                this.file,
                key,
                this.uploadToken,
                putExtra,
                config
            );
            var subscription = observable.subscribe({
                next(res) {
                    this.uploadPercent = res.total.percent;
                },
                error(err) {
                    console.error(err.message);
                },
                complete(res) {
                    self.$Message.success("图片上传成功");
                    self.uploadedImg =
                        "http://p96qdgy32.bkt.clouddn.com/" + key;
                    self.$emit('upload-img', self.uploadedImg);
                }
            });
        }
    },
    watch: {
        file: function() {
            if (this.file != null) {
                this.doUpload();
            }
        }
    },
    mounted() {
        this.$axios.get("/api/token").then(res => {
            this.uploadToken = res.data.token;
        });
    }
};
</script>
