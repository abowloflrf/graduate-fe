<template>
    <TimelineItem>
        <p class="time">5-11 12:28</p>
        <Card shadow>
            <p slot="title" @click.native="viewDetail()">{{post.place_detail}}</p>
            <p>{{post.content}}</p>
            <Icon type="heart" class="vote-icon" v-bind:class="{ 'vote-icon-red': isVoted||tempRed }" @click="vote"></Icon>
            <span class="vote-count">{{post.votes}}</span>
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
        }
    }
};
</script>
<style scoped>
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
</style>

