<template>
	<div class="pager">
		<el-row>
			<el-col>
				<div class="pager">
					<el-pagination
						layout="total,sizes,prev,pager,next,jumper"
						:total="total"
						:page-sizes="[1,5,10,20,50]"
						:page-size="count"
						:current-page.sync="current"
						:queryForm="queryForm"
						@current-change="jump"
						@size-change="changeSize"
					></el-pagination>
				</div>
			</el-col>
		</el-row>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				count:20,
				current:1
			}
		},
		props:{
			total:Number,
			url:String,
			queryForm:Object
		},
		watch:{
			'queryForm.pageNo'(){
				this.current = this.queryForm['pageNo'];
			}
		},
		methods:{
			jump:function(val){
				var params = {pageNo:val,pageSize:this.count};
				if(this.queryForm){
					this.queryForm['pageNo'] = val;
					this.queryForm['pageSize'] = this.count;
					params = this.queryForm;
				}
				this.$axios({
					methods:'get',
					url:this.url,
					params:params
				}).then((res)=>{
					this.$emit("getPagerData",res);
				}).catch((err)=>{
					
				})
			},
			changeSize:function(size){
				this.count=size;
				var params={pageNo:1,pageSize:size};
				if(this.queryForm){
					this.queryForm['pageNo'] = 0;
					this.queryForm['pageSize'] = size;
					params = this.queryForm;
				}
				this.$axios({
					methods:'get',
					url:this.url,
					params:params
				}).then((res)=>{
					this.current = 1;
					this.$emit("getPagerData",res);
				}).catch((err)=>{
				})
			}
		}
	}
</script>
<style>
	.pager{
		margin-top:20px;
		display: flex;
		justify-content: flex-end;
	}
</style>