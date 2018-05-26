<template>
    <div>
        <div v-if="postCount>0">
            <Card dis-hover v-for="(c,index) in comments" :key="index" :style="{marginBottom:'10px'}">
                <p slot="title">{{c.author_name}}
                    <span class="comment-from">{{c.author_school}} {{c.author_level}}</span>
                    <time>{{c.created_at}}</time>
                </p>
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
    methods: {
        fetchComments: function() {
            this.$axios
                .get("/api/post/" + this.postId + "/comments")
                .then(response => {
                    this.comments = response.data;
                });
        }
    },
    computed: {
        postCount: function() {
            return this.comments.length;
        }
    },
    mounted() {
        this.fetchComments();
    }
};
</script>
<style scoped>
.comment-from {
    color: #00818a;
    font-weight: 600;
    margin-left: 4px;
    padding: 0px 3px;
    border-radius: 4px;
    border: 1px solid #00818a;
}
time {
    color: #aaa;
    font-size: 12px;
    float: right;
    font-weight: 400;
}
</style>

