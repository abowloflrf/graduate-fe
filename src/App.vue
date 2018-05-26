<template>
    <div class="bg" :style="{backgroundImage:'url('+backgoundImg+')'}">
        <div class="layout">
            <Layout>
                <Layout>
                    <Breadcrumb class="header-nav">
                        <BreadcrumbItem>地点</BreadcrumbItem>
                        <BreadcrumbItem>{{currentPlaceDetail.place_brief}}</BreadcrumbItem>
                    </Breadcrumb>
                    <div class="content-header">
                        <img src="./assets/hat.png" alt="">
                        <span>毕业季，留下你最珍贵的回忆...</span>
                    </div>
                    <router-link to="/post">
                        <Button id="pub-btn" type="primary" shape="circle" icon="android-add"></Button>
                    </router-link>
                    <Content :style="{padding: '0', minHeight: '800px'}">
                        <Layout>
                            <Sider breakpoint="xs" collapsible :collapsed-width="78" v-model="isCollapsed" :width="160">
                                <Menu :active-name="currentPlace" theme="light" width="auto" :open-names="['0']" :style="{height:'100%'}" :class="menuitemClasses">
                                    <MenuItem name="0" @click.native="changePlace(0)">
                                    <!-- <img class="menu-icon" src="./assets/7-icon.png"> -->
                                    <!-- <Icon type="ios-navigate"></Icon> -->
                                    <span style="font-weight:800;font-size:18px;">热门</span>
                                    </MenuItem>

                                    <MenuItem name="1" @click.native="changePlace(1)">
                                    <img class="menu-icon" src="./assets/1-icon.png">
                                    <span>宿舍楼</span>
                                    </MenuItem>
                                    <MenuItem name="2" @click.native="changePlace(2)">
                                    <img class="menu-icon" src="./assets/2-icon.png">
                                    <span>运动场</span>
                                    </MenuItem>
                                    <MenuItem name="3" @click.native="changePlace(3)">
                                    <img class="menu-icon" src="./assets/3-icon.png">
                                    <span>教学区</span>
                                    </MenuItem>
                                    <MenuItem name="4" @click.native="changePlace(4)">
                                    <img class="menu-icon" src="./assets/4-icon.png">
                                    <span>图书馆</span>
                                    </MenuItem>
                                    <MenuItem name="5" @click.native="changePlace(5)">
                                    <img class="menu-icon" src="./assets/5-icon.png">
                                    <span>食堂</span>
                                    </MenuItem>
                                    <MenuItem name="6" @click.native="changePlace(6)">
                                    <img class="menu-icon" src="./assets/6-icon.png">
                                    <span>花园</span>
                                    </MenuItem>
                                    <MenuItem name="7" @click.native="changePlace(7)">
                                    <img class="menu-icon" src="./assets/7-icon.png">
                                    <span>其他</span>
                                    </MenuItem>

                                </Menu>
                            </Sider>
                            <Content :style="{overflow: 'visible'}">
                                <transition name="fade" mode="out-in">
                                    <router-view :place="currentPlaceDetail"></router-view>
                                </transition>
                            </Content>
                        </Layout>
                    </Content>
                </Layout>
                <Footer class="layout-footer-center">2018 &copy; USTB</Footer>
            </Layout>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            places: [],
            currentPosts: [],
            isCollapsed: false
        };
    },
    methods: {
        changePlace: function(id) {
            if (id == 0) {
                this.$router.push("/hot");
            } else {
                this.$router.push("/place/" + id);
            }
            this.fetchPosts(id);
        },
        fetchPosts: function(placeid) {
            var fetchUrl = "/api/place/" + placeid + "/posts";
            if (placeid == 0) {
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
        currentPlace: function() {
            if (this.$route.path === "/hot") return "0";
            return this.$route.params.pid + "";
        },
        currentPlaceDetail: function() {
            var p = {
                id: 0,
                place_brief: "热门",
                place_description:
                    "最热的十条记录，每小时根据点赞与评论数计算权重实时更新"
            };
            this.places.forEach(element => {
                if (element.id == this.currentPlace) {
                    p = element;
                }
            });
            return p;
        },
        backgoundImg: function() {
            switch (this.currentPlace) {
                case "0":
                    return "/images/home-logo.png";
                    break;
                case "1":
                    return "/images/domitory-logo.png";
                    break;
                case "2":
                    return "/images/ball-logo.png";
                    break;
                case "3":
                    return "/images/classroom-logo.png";
                    break;
                case "4":
                    return "/images/home-logo.png";
                    break;
                case "5":
                    return "/images/home-logo.png";
                    break;
                case "6":
                    return "/images/home-logo.png";
                    break;
                case "7":
                    return "/images/home-logo.png";
                    break;
                case "8":
                    return "/images/home-logo.png";
                    break;
                default:
                    return "/images/home-logo.png";
                    break;
            }
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

<style>
.bg {
    background-color: rgba(153, 221, 204, 0.1) !important;
    background-position: 5% 90%;
    background-repeat: no-repeat;
    background-size: 30%;
    background-attachment: fixed;
}
#pub-btn {
    width: 50px;
    height: 50px;
    background-color: #00818a;
    border-color: #00818a;
    float: right;
    position: relative;
    top: -20px;
}
.ivu-layout-content{
    padding: 24px;
}
.content-header {
    padding: 10px;
}
.content-header img {
    width: 80px;
    margin-right: 10px;
}
.content-header span {
    color: #00818a;
    font-weight: 800;
    font-size: 28px;
}
.menu-icon {
    width: 15px;
    height: 15px;
    margin-right: 5px;
    vertical-align: sub;
}
.layout {
    position: relative;
    border-radius: 4px;
    overflow: hidden;
    max-width: 1000px;
    margin: 0 auto;
    padding: 0 50px;
}
.layout-footer-center {
    height: 200px;
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
    .bg {
        background-size: 60%;
        background-position: 10% 80%;
    }
    #pub-btn {
        right: 15px;
    }
    .layout {
        padding: 0px;
    }
    .header-nav {
        margin: 16px !important;
    }
    .content-header img {
        width: 50px;
    }
    .content-header span {
        display: block;
        font-size: 18px;
    }
    .ivu-layout-content {
        padding: 20px 10px;
    }
}
</style>