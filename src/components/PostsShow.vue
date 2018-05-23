<template>
    <div>
        <Timeline v-if="currentPosts.length!==0" >
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
    data() {
        return {
            currentPosts: []
        };
    },
    methods: {
        fetchPosts: function() {
            this.$axios
                .get(
                    "/api/place/" + this.placeId + "/posts"
                )
                .then(response => {
                    this.currentPosts = response.data;
                });
        }
    },
    computed: {
        placeId: function() {
            return this.$route.params.pid;
        }
    },
    watch: {
        placeId: function() {
            this.fetchPosts();
        }
    },
    mounted: function() {
        this.fetchPosts();
    }
};
</script>

<style scoped>
</style>
