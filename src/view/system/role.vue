<template>
  <div>

    <Table :data="tableData" :columns="tableColumns" ref="table" border highlight-row>

      <template slot-scope="{ row, index }" slot="head_img">
        <Avatar v-if="row.head_img != ''" shape="square" :src="$config.oss + row.head_img" size="large"/>
        <Avatar v-if="row.head_img == ''" shape="square" size="large"/>
      </template>

      <template slot-scope="{ row, index }" slot="valid_year">
        <span v-if="row.package_info_year == 0">永久</span>
        <span v-if="row.package_info_year > 0">{{row.package_info_year}}年</span>
      </template>

      <template slot-scope="{ row, index }" slot="status">
        <span v-if="row.status == 0">未确认</span>
        <span v-if="row.status == 1">已通过</span>
        <span v-if="row.status == 2">未通过</span>
      </template>

      <template slot-scope="{ row, index }" slot="action">
        <div v-if="row.status == 0">
          <Button type="success" size="small" @click="pass(row,index)">通过</Button>
          <Poptip
            confirm
            title="确认拒绝?"
            @on-ok="changeStatus(index, 2)"
            transfer
            ok-text="确认"
            cancel-text="取消">
            <Button type="error" size="small">拒绝</Button>
          </Poptip>
        </div>
        <div v-if="row.status == 1">
          <Button size="small" disabled>已通过</Button>
        </div>
        <div v-if="row.status == 2">
          <Button size="small" style="color: red;" disabled>未通过</Button>
        </div>
      </template>

    </Table>

    <div class="page-div">
      <Page :total="search.total" :current="search.pageNum" @on-change="changePage"></Page>
    </div>

    <Modal
      v-model="showAddModal"
      title="确认通过">
      <Form ref="addForm" :model="addForm" :label-width="80">

        <FormItem label="会员类型" prop="package_type_info_id">
          <Select v-model="addForm.package_type_info_id" placeholder="请选择会员类型">
            <Option v-for="item in selectType" :value="item.id" :key="item.id">{{ item.name }}</Option>
          </Select>
        </FormItem>
        <FormItem label="有效期" prop="year">
          <Select v-model="addForm.package_info_year" placeholder="请选择有效期">
            <Option value="1">1年</Option>
            <Option value="2">2年</Option>
            <Option value="4">4年</Option>
          </Select>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" size="large" @click="showAddModal=false">取消</Button>
        <Button type="primary" size="large" @click="doPass">确定</Button>
      </div>
    </Modal>

  </div>
</template>
<script>
  import { getAdminMemberLogInfo, changeAdminMemberLogStatus, getPackageTypeInfo, passMember } from '@/api/member'

  export default {
    data () {
      return {
        showAddModal: false,
        curIndex: 0,
        addForm: {
          id: 0,
          package_type_info_id: '',
          package_info_year: '',
          status: 1
        },
        tableData: [],
        searchStatus: [
          { value: -1, label: '全部' },
          { value: 0, label: '未确认' },
          { value: 1, label: '已通过' },
          { value: 2, label: '未通过' }
        ],
        searchType: [],
        tableColumns: [
          { title: '名称', key: 'name' },
          { title: '状态', slot: 'status' },
          { title: '操作', slot: 'action' }
        ],
        search: {
          name: '',
          phone: '',
          typeId: -1,
          status: -1,
          pageNum: 1,
          pageSize: 10,
          total: 0
        },
        selectType: []
      }
    },
    mounted () {
      this.getList()
      this.getPackageType()
    },
    methods: {
      getList () {
        var params = this.search
        getAdminMemberLogInfo(params).then(res => {
          if (res.code == 1) {
            this.search.total = res.data.count
            if (res.data.res == null) {
              this.tableData = []
            } else {
              this.tableData = res.data.res
            }
          }
        })
      },
      getPackageType () {
        getPackageTypeInfo({}).then(res => {
          if (res.code == 1) {
            var data = res.data
            this.selectType = data

            var all = [{ 'id': -1, 'name': '全部' }]
            this.searchType = all.concat(data)
          }
        })
      },

      changePage (page) {
        this.search.pageNum = page
        this.tableData = this.getList()
      },
      handleSearch () {
        this.getList()
      },
      changeStatus (index, status) {
        var id = parseInt(this.tableData[index].id)
        changeAdminMemberLogStatus({ 'id': id, 'status': status }).then(res => {
          if (res.code == 1) {
            this.tableData[index].status = status
          } else {
            this.$Notice.warning({
              title: res.msg
            })
          }
        })
      },
      pass (row, index) {
        this.showAddModal = true
        this.addForm.id = row.id
        this.addForm.package_type_info_id = row.package_type_info_id
        this.addForm.package_info_year = row.package_info_year
        this.curIndex = index
      },
      doPass () {
        this.showAddModal = false
        var params = {}
        params['id'] = parseInt(this.addForm.id)
        params['package_type_info_id'] = parseInt(this.addForm.package_type_info_id)
        params['package_info_year'] = parseInt(this.addForm.package_info_year)
        params['status'] = parseInt(this.addForm.status)
        changeAdminMemberLogStatus(params).then(res => {
          if (res.code == 1) {
            this.tableData[this.curIndex].status = this.addForm.status
            this.tableData[this.curIndex].package_info_year = this.addForm.package_info_year
            this.tableData[this.curIndex].package_info_amount = res.data
            for (var i = 0; i < this.selectType.length; i++) {
              if (this.selectType[i].id == this.addForm.package_type_info_id) {
                this.tableData[this.curIndex].package_type_name = this.selectType[i].name
              }
            }
          } else {
            this.$Notice.warning({
              title: res.msg
            })
          }
        })
      }
    }
  }
</script>

<style>

</style>
