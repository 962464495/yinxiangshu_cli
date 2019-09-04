<template>
  <div>
    <download-excel
      class   = "btn btn-default"
      :data   = "json_data"
      :fields = "json_fields"
      worksheet = "会员数据"
      name    = "会员数据.xls">
      <Button style="float: right;" type="success">导出</Button>

    </download-excel>

    <Form ref="search" :model="search" inline>
      <FormItem prop="name">
        <Input type="text" v-model="search.name" placeholder="请输入姓名">
          <span slot="prepend">姓名</span>
        </Input>
      </FormItem>
      <FormItem prop="phone">
        <Input type="text" v-model="search.phone" placeholder="请输入电话">
          <span slot="prepend">电话</span>
        </Input>
      </FormItem>
      <FormItem prop="type">
        <Select v-model="search.type">
          <label slot="prefix" class="select-prefix">会员类型</label>
          <Option v-for="item in searchType" :value="item.id" :key="item.id">{{ item.name }}</Option>
        </Select>
      </FormItem>
      <FormItem prop="status">
        <Select v-model="search.status">
          <label slot="prefix" class="select-prefix">状态</label>
          <Option v-for="item in searchStatus" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSearch('search')">搜索</Button>
      </FormItem>
    </Form>

    <Table :data="tableData" :columns="tableColumns" border highlight-row>

      <template slot-scope="{ row, index }" slot="head_img">
        <Avatar v-if="row.head_img != ''" shape="square" :src="$config.oss + row.head_img" size="large" />
        <Avatar v-if="row.head_img == ''" shape="square" size="large" />
      </template>

      <template slot-scope="{ row, index }" slot="status">
        <span v-if="row.status == 1">正常</span>
        <span v-if="row.status == 3">禁用</span>
      </template>

      <template slot-scope="{ row, index }" slot="action">
        <Button type="info" size="small" @click="showChangeMember(row,index)">修改</Button>
        <Button v-if="row.status == 3" type="success" size="small" @click="changeStatus(index, 1)">启用</Button>
        <Button v-if="row.status == 1" type="error" size="small" @click="changeStatus(index, 3)">禁用</Button>
      </template>

    </Table>

    <div class="page-div">
      <Page :total="search.total" :current="search.pageNum" @on-change="changePage"></Page>
    </div>

    <Modal
      v-model="showAddModal"
      title="修改会员信息">
      <Form ref="addForm" :model="addForm" :label-width="80">
        <FormItem label="到期时间" prop="end_time">
          <DatePicker v-model="addForm.end_time" type="date" placeholder="请输入到期时间" style="width: 100%;"></DatePicker>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" size="large" @click="showAddModal=false">取消</Button>
        <Button type="primary" size="large" @click="changeMember">确定</Button>
      </div>
    </Modal>

  </div>
</template>
<script>
import { getMemberList, changeMemberStatus, getPackageTypeInfo, changeMemberEndTime } from '@/api/member'
import Vue from 'vue'
import JsonExcel from 'vue-json-excel'

Vue.component('downloadExcel', JsonExcel)
export default {
  data () {
    return {
      showAddModal: false,
      curIndex: 0,
      addForm: {
        id: 0,
        end_time: ''
      },
      tableData: [],
      searchStatus: [
        { value: -1, label: '全部' },
        { value: 1, label: '正常' },
        { value: 3, label: '禁用' }
      ],
      searchType: [],
      tableColumns: [
        { title: '头像', slot: 'head_img' },
        { title: '姓名', key: 'name' },
        { title: '电话', key: 'phone' },
        { title: '会员类型', key: 'package_type_name' },
        { title: '到期时间', key: 'end_time' },
        { title: '状态', slot: 'status' },
        { title: '工作单位', key: 'company' },
        { title: '职位', key: 'profess' },
        { title: '邮件地址', key: 'email' },
        { title: '通讯地址', key: 'address' },
        { title: '操作', slot: 'action' }
      ],
      search: {
        name: '',
        phone: '',
        type: -1,
        status: -1,
        pageNum: 1,
        pageSize: 10,
        total: 0
      },
      json_fields: {
        '姓名': 'name',
        '电话': 'phone',
        '会员类型': 'package_type_name',
        '到期时间': 'end_time',
        '状态': {
          field: 'status',
          callback: (value) => {
            if (value == 1) {
              return '正常'
            } else {
              return '禁用'
            }
          }
        },
        '工作单位': 'company',
        '职位': 'profess',
        '邮件地址': 'email',
        '通讯地址': 'address'
      },
      json_data: [],
      json_meta: [
        [
          {
            'key': 'charset',
            'value': 'utf-8'
          }
        ]
      ]
    }
  },
  mounted () {
    this.getList()
    this.getPackageType()
  },
  methods: {
    getList () {
      var params = this.search
      getMemberList(params).then(res => {
        if (res.code == 1) {
          this.search.total = res.data.count
          if (res.data.res == null) {
            this.tableData = []
          } else {
            this.tableData = res.data.res
            if (params.pageNum == 1) {
              this.getExcelData()
            }
          }
        }
      })
    },
    getPackageType () {
      getPackageTypeInfo({}).then(res => {
        if (res.code == 1) {
          var data = res.data

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
      changeMemberStatus({ 'id': id, 'status': status }).then(res => {
        if (res.code == 1) {
          this.tableData[index].status = status
        } else {
          this.$Notice.warning({
            title: res.msg
          })
        }
      })
    },
    showChangeMember (row, index) {
      this.showAddModal = true
      this.addForm.id = row.id
      this.addForm.end_time = row.end_time
      this.curIndex = index
    },
    changeMember () {
      if (this.addForm.end_time == '') {
        this.$Notice.warning({
          title: '请选择到期时间！'
        })
        return
      }
      this.showAddModal = false

      var params = {}
      params['id'] = parseInt(this.addForm.id)
      params['end_time'] = this.addForm.end_time

      changeMemberEndTime(params).then(res => {
        if (res.code == 1) {
          this.tableData[this.curIndex].end_time = this.addForm.end_time
        } else {
          this.$Notice.warning({
            title: res.msg
          })
        }
      })
    },
    getExcelData () {
      var params = this.search
      params.pageSize = 99999
      getMemberList(params).then(res => {
        if (res.code == 1) {
          this.json_data = res.data.res
        }
      })
    }

  }
}
</script>

<style>

</style>
