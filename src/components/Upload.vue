<template>
    <div>
        <Button :loading="isUploading" type="ghost" class="file-btn" icon="ios-cloud-upload-outline">
            <span v-if="!isUploading">上传图片</span>
            <span v-else>上传中...</span>
            <input type="file" ref="fileInput" v-on:change="changeFile()">
        </Button>
        <span v-if="file">{{file.name}}</span>
        <div v-if="uploadedImgThumb!=''" class="upload-thumb-div">
            <img class="upload-thumb" :src="uploadedImgThumb">
        </div>
    </div>
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
            isUploading: false,
            file: null,
            uploadToken: "",
            uploadPercent: 0,
            uploadedImg: "",
            uploadedImgThumb: ""
        };
    },
    methods: {
        changeFile() {
            this.file = this.$refs.fileInput.files[0];
        },
        doUpload() {
            this.isUploading = true;
            var self = this;
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
                    self.uploadedImgThumb =
                        "http://p96qdgy32.bkt.clouddn.com/" +
                        key +
                        "?imageView2/1/w/100/h/100/format/jpg/q/75|imageslim";
                    self.$emit("upload-img", self.uploadedImg);
                    self.isUploading = false;
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
<style scoped>
.file-btn {
    cursor: pointer;
    display: inline-block;
    overflow: hidden;
}
.file-btn input {
    position: absolute;
    font-size: 20px;
    cursor: pointer;
    left: 0;
    top: 0;
    opacity: 0;
}
.upload-thumb-div {
    margin-top: 10px;
}
.upload-thumb {
    height: 100px;
    width: 100px;
    padding: 2px;
    border: 1px solid #ccc;
}
</style>

