<template>
    <div v-if="post">
        <img :src="post.cover+'?imageView2/1/w/1200/h/900/format/jpg/q/85'" :style="{width:'100%'}">
        <h1>{{post.place_detail}}</h1>
        <p>{{post.content}}</p>
        <p>by {{post.author_name}}
            <i>{{post.author_school}} {{post.author_level}}</i>
        </p>
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
            post: null
        };
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
hr {
    margin: 15px 0;
    border: none;
    border-top: 1px solid #eee;
}
</style>
