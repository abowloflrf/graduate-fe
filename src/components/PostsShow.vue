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
                .get("/api/place/" + this.placeId + "/posts")
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

<style>
.place-header {
    margin-bottom: 30px;
}
.place-header h1 {
    font-size: 48px;
    font-weight: 400;
}
.place-header p {
    font-size: 18px;
    font-weight: 400;
}
@media (max-width: 768px) {
    .place-header h1{
        font-size: 28px;
    }
    .place-header p{
        font-size: 14px;
    }
}
</style>
