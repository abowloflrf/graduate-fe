<template>
    <div v-if="post">
        <div class="detail-cover" :style="{backgroundImage:'url('+post.cover+'?imageView2/1/w/1200/h/900/format/jpg/interlace/1/q/85)'}">
            <div class="detail-header">
                <div class="detail-vote" v-bind:class="{ 'vote-icon-red': isVoted||tempRed }">
                    <Icon type="heart" class="vote-icon" @click="vote"></Icon>
                    <span class="vote-count">{{post.votes}}</span>
                </div>
                <div class="detail-info">
                    <h1 class="detail-title">
                        {{post.place_detail}}
                    </h1>
                    <section class="detail-meta">
                        <time>{{time}}</time>
                        <span class="detail-name">{{post.author_name}}</span>
                        <span class="detail-from">{{post.author_school}}</span>
                        <span class="detail-from">{{post.author_level}}</span>
                    </section>
                </div>
            </div>
        </div>
        <p class="post-detail-content">{{post.content}}</p>
        <hr>
        <CommentForm></CommentForm>
        <CommentList></CommentList>
    </div>
</template>
<script>
import CommentList from "./CommentList.vue";
import CommentForm from "./CommentForm.vue";
export default {
    components: {
        CommentList,
        CommentForm
    },
    data() {
        return {
            id: this.$route.params.id,
            post: null,
            tempRed: false
        };
    },
    methods: {
        vote: function() {
            if (this.isVoted) return false;
            this.$axios
                .post("/api/post/" + this.post.id + "/vote", {})
                .then(response => {
                    if (response.data.status === 1) {
                        localStorage.setItem("voted_" + this.post.id, "1");
                        this.tempRed = true;
                        this.post.votes++;
                    }
                });
        }
    },
    computed: {
        isVoted: function() {
            var local = localStorage.getItem("voted_" + this.post.id);
            if (local != null && local === "1") return true;
            else return false;
        },
        time: function() {
            // 对Date的扩展，将 Date 转化为指定格式的String
            // 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
            // 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
            // 例子：
            // (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
            // (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
            Date.prototype.Format = function(fmt) {
                //author: meizz
                var o = {
                    "M+": this.getMonth() + 1, //月份
                    "d+": this.getDate(), //日
                    "h+": this.getHours(), //小时
                    "m+": this.getMinutes(), //分
                    "s+": this.getSeconds(), //秒
                    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
                    S: this.getMilliseconds() //毫秒
                };
                if (/(y+)/.test(fmt))
                    fmt = fmt.replace(
                        RegExp.$1,
                        (this.getFullYear() + "").substr(4 - RegExp.$1.length)
                    );
                for (var k in o)
                    if (new RegExp("(" + k + ")").test(fmt))
                        fmt = fmt.replace(
                            RegExp.$1,
                            RegExp.$1.length == 1
                                ? o[k]
                                : ("00" + o[k]).substr(("" + o[k]).length)
                        );
                return fmt;
            };

            var d = new Date(this.post.created_at).Format("MM-dd hh:mm");
            return d;
        }
    },
    mounted() {
        this.$axios
            .get("/api/post/" + this.id)
            .then(response => {
                this.post = response.data;
            })
            .catch(function(error) {
                console.error(error);
            });
    }
};
</script>
<style scoped>
.detail-cover {
    border-radius: 5px;
    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.15);
    height: 360px;
    background-position: center;
    background-size: cover;
    position: relative;
    background-repeat: no-repeat;
}
.detail-header {
    border-radius: 10px;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    padding: 20px;
    background-image: linear-gradient(
        to bottom,
        transparent 30%,
        rgba(0, 0, 0, 0.4) 100%
    );
}
.detail-vote {
    cursor: pointer;
    position: absolute;
    top: 10px;
    right: 20px;
    font-size: 26px;
    color: rgba(255, 255, 255, 0.8);
    text-shadow: 1px 0 4px rgba(0, 0, 0, 0.2);
}
.vote-icon-red {
    color: #ef7b7b !important;
}
.vote-count {
    font-size: 26px;
    margin-left: 4px;
}
.detail-info {
    position: absolute;
    bottom: 20px;
    left: 20px;
    color: #fff;
    text-shadow: 1px 0 8px rgba(0, 0, 0, 0.7);
}
.detail-name {
    margin-left: 5px;
}
.detail-name::after {
    content: "from";
    margin-left: 4px;
    font-family: serif;
    font-style: italic;
}
.detail-from {
    margin-left: 4px;
    padding: 2px 3px;
    border-radius: 4px;
    border: 1px solid #fff;
}
time {
    color: #eee;
}
.post-detail-content {
    margin-top: 10px;
    font-size: 16px;
}
hr {
    margin: 15px 0;
    border: none;
    border-top: 1px solid #eee;
}
@media (max-width: 768px) {
    .detail-cover {
        height: 200px;
    }
    .detail-info {
        bottom: 20px;
        left: 20px;
    }
}
</style>
