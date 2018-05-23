<template>
    <TimelineItem>
        <p class="time">5-11 12:28</p>
        <Card shadow @click.native="viewDetail()">
            <p slot="title">{{post.place_detail}}</p>
            <p>{{post.content}}</p>
        </Card>
    </TimelineItem>
</template>
<script>
export default {
    props: ["post"],
    methods: {
        viewDetail: function() {
            const id = this.postid;
            this.$router.push({ name: "post", params: { id } });
        }
    },
    computed:{
        postid:function(){
            return this.post.id;
        }
    }
};
</script>
