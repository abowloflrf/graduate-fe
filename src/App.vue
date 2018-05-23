<template>
    <div class="layout">
        <Layout>
            <Layout>
                <Breadcrumb class="header-nav">
                    <BreadcrumbItem>大地点</BreadcrumbItem>
                    <BreadcrumbItem>{{currentPlaceDetail.place_brief}}</BreadcrumbItem>
                </Breadcrumb>
                <router-link to="/post">
                    <Button id="pub-btn" type="primary" shape="circle" icon="android-add"></Button>
                </router-link>
                <Content :style="{padding: '24px 0', minHeight: '280px', background: '#fff'}">
                    <Layout>
                        <Sider breakpoint="xs" collapsible :collapsed-width="78" v-model="isCollapsed" :width="160">
                            <Menu active-name="0" theme="light" width="auto" :open-names="['0']" :style="{height:'100%'}" :class="menuitemClasses">
                                <MenuItem name="0" @click.native="changePlace(0)">
                                <Icon type="ios-navigate"></Icon>
                                <span>热门</span>
                                </MenuItem>

                                <MenuItem v-for="(place, index) in places" :key="index" :name="place.id" @click.native="changePlace(place.id)">
                                <Icon type="search"></Icon>
                                <span>{{place.place_brief}}</span>
                                </MenuItem>
                            </Menu>
                        </Sider>
                        <Content :style="{padding: '24px', background: '#fff', overflow: 'visible'}">
                            <!-- <PostForm></PostForm> -->
                            <!-- <PostsShow></PostsShow> -->
                            <transition name="fade" mode="out-in">
                                <router-view></router-view>
                            </transition>
                        </Content>
                    </Layout>
                </Content>
            </Layout>
            <Footer class="layout-footer-center">2018 &copy; USTB</Footer>
        </Layout>
    </div>
</template>

<script>
export default {
    data() {
        return {
            places: [],
            currentPlace: 0,
            currentPosts: [],
            isCollapsed: false
        };
    },
    methods: {
        changePlace: function(id) {
            if (id === 0) {
                this.$router.push("/hot");
            } else {
                this.$router.push("/place/" + id);
            }
            this.fetchPosts(id);
            this.currentPlace = id;
        },
        fetchPosts: function(placeid) {
            var fetchUrl = "/api/place/" + placeid + "/posts";
            if (placeid === 0) {
                fetchUrl = "/api/hot";
            }

            this.$axios.get(fetchUrl).then(response => {
                this.currentPosts = response.data.length;
            });
        }
    },
    computed: {
        menuitemClasses: function() {
            return ["menu-item", this.isCollapsed ? "collapsed-menu" : ""];
        },
        currentPlaceDetail: function() {
            var p = {
                id: 0,
                place_brief: "热门"
            };
            this.places.forEach(element => {
                if (element.id === this.currentPlace) {
                    p = element;
                }
            });
            return p;
        }
    },
    mounted: function() {
        this.$axios.get("/api/places").then(response => {
            this.places = response.data;
        });
        this.fetchPosts(0);
    }
};
</script>

<style scoped>
#pub-btn {
    float: right;
    position: relative;
    top: -20px;
}
.layout {
    position: relative;
    border-radius: 4px;
    overflow: hidden;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 50px;
}
.layout-footer-center {
    text-align: center;
}
.menu-item span {
    display: inline-block;
    overflow: hidden;
    width: 69px;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: bottom;
    transition: width 0.2s ease 0.2s;
}
.menu-item i {
    transform: translateX(0px);
    transition: font-size 0.2s ease, transform 0.2s ease;
    vertical-align: middle;
    font-size: 16px;
}
.collapsed-menu span {
    width: 0px;
    transition: width 0.2s ease;
}
.collapsed-menu i {
    transform: translateX(5px);
    transition: font-size 0.2s ease 0.2s, transform 0.2s ease 0.2s;
    vertical-align: middle;
    font-size: 22px;
}
.header-nav {
    margin: 16px 0;
}

@media (max-width: 768px) {
    .layout {
        padding: 0px;
    }
    .header-nav {
        margin: 16px !important;
    }
}
</style>