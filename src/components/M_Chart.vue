<template>
    <div :style="style">
        <div ref="a" style="width:100%;height:100%"></div>
    </div>
</template>

<script>
    import echarts from 'echarts'

    // import 'echarts/map/js/china.js';
    // import 'echarts/map/js/world.js';

    export default {

        name: 'm_chart',
        props: {
            option: {

            },
            w: {
                type: Number,
                default: null,
            },
            h: {
                type: Number,
                default: null,
            }
        },
        created: function () {
        },
        mounted: function () {
            this.drawChart()
        },
        beforeDestroy: function () {
            /*document.documentElement.removeEventListener('mousemove', this.handleMove, true)*/
        },
        data: function () {
            return {
                resize_timer: ''
            }
        },
        methods: {
            drawChart(){

                let chartsarea = this.$refs["a"];

                let mychart = echarts.init(chartsarea);
                let option = this.option

                mychart.setOption(option, true);

                // mychart.resize();
            }
            ,
            resize(){
                let chartsarea = this.$refs["a"];
                let mychart = echarts.init(chartsarea);

                mychart.resize();

                let _this = this
                this.resize_timer = setTimeout(() => {
                    mychart.resize();
                    _this.resize_timer = ''
                }, 1000);

            },

        },
        computed: {
            style() {
                let style = {
                    width: '100%',
                    height: '100%',
                };

                typeof this.h == 'number'
                if (typeof this.w == 'number') {
                    style.width = this.w + 'px'
                }
                if (typeof this.h == 'number') {
                    style.height = this.h + 'px'
                }
                return style;

            }
        },
        updated: function () {
            this.drawChart()
        },
        watch: {
            option(){
                /* handel:function() {   //特别注意，不能用箭头函数，箭头函数，this指向全局

                 if (this.resize_timer === '') {
                    let _this = this
                    this.resize_timer = setTimeout(() => {
                        _this.resize()
                    }, 500);
                 }
                 this.drawChart()

                 },

                 deep: true    //深度监听*/

                if (this.resize_timer === '') {
                    let _this = this
                    this.resize_timer = setTimeout(() => {
                        _this.resize()
                    }, 1000);
                }

                this.drawChart()
            },
            h(){
                if (this.resize_timer === '') {
                    let _this = this
                    this.resize_timer = setTimeout(() => {
                        _this.resize()
                    }, 1500);
                }
            },
             w(){
                 if (this.resize_timer === '') {
                     let _this = this
                     this.resize_timer = setTimeout(() => {
                         _this.resize()
                     }, 1500);
                 }
             },

        }
    }
</script>

<style>

</style>
