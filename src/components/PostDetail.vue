<template>
    <div v-if="post">
        <img :src="post.cover" :style="{width:'100%'}">
        <i>Post: {{ post.id }}</i>
        <h1>{{post.place_detail}}</h1>
        <p>{{post.content}}</p>
        <p>by {{post.author_name}}
            <i>{{post.author_school}} {{post.author_level}}</i>
        </p>
        <hr>
        <CommentForm></CommentForm>
    </div>
</template>
<script>
import CommentForm from "./CommentForm.vue";
export default {
    components:{
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

</style>
