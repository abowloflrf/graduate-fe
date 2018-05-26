<template>
    <TimelineItem>
        <p class="time">{{time}}</p>
        <Card :padding="10" :style="{backgroundImage:'url('+post.cover+'?imageView2/1/w/300/h/160/format/jpg/interlace/1/q/85)'}" class="card">
            <p class="card-title" @click="viewDetail()">{{post.place_detail}}</p>
            <p class="card-content" @click="viewDetail()">{{post.content}}</p>
            <div class="card-vote">
                <Icon type="heart" class="vote-icon" v-bind:class="{ 'vote-icon-red': isVoted||tempRed }" @click="vote"></Icon>
                <span class="vote-count">{{post.votes}}</span>
            </div>
        </Card>
    </TimelineItem>
</template>
<script>
export default {
    props: ["post"],
    data() {
        return {
            tempRed: false
        };
    },
    methods: {
        viewDetail: function() {
            const id = this.postid;
            this.$router.push({ name: "post", params: { id } });
        },
        vote: function() {
            if (this.isVoted) return false;
            this.$axios
                .post("/api/post/" + this.postid + "/vote", {})
                .then(response => {
                    if (response.data.status === 1) {
                        localStorage.setItem("voted_" + this.postid, "1");
                        this.tempRed = true;
                        this.post.votes++;
                    }
                });
        }
    },
    computed: {
        postid: function() {
            return this.post.id;
        },
        isVoted: function() {
            var local = localStorage.getItem("voted_" + this.postid);
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
    }
};
</script>
<style scoped>
.card {
    background-repeat: no-repeat;
    background-size: contain;
    background-position: 100%;
}
.vote-icon {
    cursor: pointer;
    color: #ccc;
}
.vote-icon-red {
    color: #ef7b7b !important;
}
.vote-count {
    font-size: 12px;
    margin-left: 4px;
    color: #ccc;
}
.card-title {
    cursor: pointer;
    font-size: 22px;
    font-weight: 800;
}
.card-content {
    cursor: pointer;
    text-shadow: 1px 0 2px rgba(255, 255, 255, 0.8);
    height: 21px;
    max-width: 60%;
    overflow: hidden;
}
.card-vote {
    display: block;
}
@media (max-width: 500px) {
    .card {
        background-position: 120%;
    }
}
</style>