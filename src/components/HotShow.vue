<template>
    <div>
        <div class="place-header">
            <h1>{{place.place_brief}}</h1>
            <p>{{place.place_description}}</p>
        </div>
        <Timeline v-if="currentPosts.length!==0">
            <PostCard v-for="(p,index) in currentPosts" :post="p" :key="index"></PostCard>
        </Timeline>
        <p v-else>这里什么都没有</p>
    </div>
</template>

<script>
import PostCard from "./PostCard.vue";
export default {
    components: {
        PostCard
    },
    props: ["place"],
    data() {
        return {
            currentPosts: []
        };
    },
    methods: {
        fetchPosts: function() {
            this.$axios
                .get("/api/hot")
                .then(response => {
                    this.currentPosts = response.data;
                })
                .catch(function(error) {
                    console.error(error);
                });
        }
    },
    mounted() {
        this.fetchPosts();
    }
};
</script>

<style scoped>
</style>
