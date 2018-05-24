<template>
    <div>
        <div v-if="postCount>0">
            <Card dis-hover v-for="(c,index) in comments" :key="index" :style="{marginBottom:'10px'}">
                <p slot="title">{{c.author_name}}</p>
                <p>{{c.comment}}</p>
            </Card>
        </div>
        <i v-else>还没有评论</i>
    </div>
</template>
<script>
export default {
    data() {
        return {
            postId: this.$route.params.id,
            comments: []
        };
    },
    computed: {
        postCount: function() {
            return this.comments.length;
        }
    },
    mounted() {
        this.$axios
            .get("/api/post/" + this.postId + "/comments")
            .then(response => {
                this.comments = response.data;
            });
    }
};
</script>
