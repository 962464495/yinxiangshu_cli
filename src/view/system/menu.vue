<template>
  <div>
    <div style="background: white; padding: 20px;">
      <div class="topBar flex_row_space_between">
        <div class="leftTitle">
          权限菜单管理
        </div>
        <div class="rightButton">
          <Button type="success" style="float: right;" @click="addMenu(0)">添加顶级</Button>
        </div>
      </div>
      <Tree :data="data" :render="renderContent" class="role-menu-tree">
        <template slot-scope="{ data, index }" slot="item"></template>
      </Tree>
    </div>

    <Modal v-model="showAddModal" :title="addForm.id == 0 ? '添加' : '修改'">
      <Form ref="addForm" :model="addForm" :label-width="80">
        <FormItem label="名称" prop="title">
          <Input v-model="addForm.title" placeholder="请输入名称"></Input>
        </FormItem>
        <FormItem label="标识" prop="name">
          <Input v-model="addForm.name" placeholder="请输入标识"></Input>
        </FormItem>
        <FormItem label="类型" prop="type">
          <Select v-model="addForm.type" placeholder="请选择类型">
            <Option value="1">菜单</Option>
            <Option value="2">页面</Option>
            <Option value="3">操作</Option>
          </Select>
        </FormItem>
        <FormItem label="排序" prop="sort">
          <Input v-model="addForm.sort" placeholder="请输入排序（升序）"></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" size="large" @click="showAddModal=false">取消</Button>
        <Button type="primary" size="large" @click="addOrUpdate">确定</Button>
      </div>
    </Modal>

  </div>
</template>
<script>
  import { GetRoleMenuList } from '_api'
  import view from '_tip'

  export default {
    data () {
      return {
        showAddModal: false,
        addForm: {
          id: 0,
          name: '',
          title: '',
          type: '',
          sort: '',
          parent: 0
        },
        curItem: '',
        data: [],
        buttonProps: {
          type: 'default',
          size: 'small'
        }
      }
    },
    created () {
      this.GetMenuList()
    },
    methods: {
      async GetMenuList () {
        view.showLoding()
        const res = await GetRoleMenuList()
        view.hideLoding()
        if (res.code != 1) {
          view.tip('获取数据出错', 'error')
        } else {
          this.data = res.data
        }
      },
      renderContent (h, { root, node, data }) {
        return h('span', {
          style: {
            display: 'inline-block',
            width: '100%'
          }
        }, [
          h('span', [
            h('Icon', {
              props: {
                custom: data.menuType == 1 ? 'iconfont icon-caidan' : data.menuType == 2 ? 'iconfont icon-yemian' : 'iconfont icon-caozuo',
              },
              style: {
                marginRight: '8px',
                fontSize: data.menuType == 3 ? '20px !important' : '16px'
              }
            }),
            h('span', data.title)
          ]),
          h('span', {
            style: {
              display: 'inline-block',
              float: 'right',
              marginRight: '32px'
            }
          }, [
            h('Button', {
              props: Object.assign({}, this.buttonProps, {
                icon: 'md-add'
              }),
              style: {
                marginRight: '8px'
              },
              on: {
                click: () => {
                  this.append(data)
                }
              }
            }),
            h('Button', {
              props: Object.assign({}, this.buttonProps, {
                icon: 'md-create'
              }),
              style: {
                marginRight: '8px'
              },
              on: {
                click: () => {
                  this.updateItem(data)
                }
              }
            }),
            h('Button', {
              props: Object.assign({}, this.buttonProps, {
                icon: 'md-trash'
              }),
              on: {
                click: () => {
                  this.remove(root, node, data)
                }
              }
            })
          ])
        ])
      },
      append (data) {
        console.log(data)
        this.curItem = data
        this.addMenu(data.id || 0)
      },
      remove (root, node, data) {
        view.tip('删除')
        this.GetMenuList()
      },
      updateItem (data) {
        this.addForm = {
          id: data.id,
          name: data.name,
          title: data.title,
          type: data.menuType.toString(),
          sort: data.sort,
          parent: data.parent
        }
        this.showAddModal = true
      },
      addMenu (parent) {
        this.addForm = {
          id: 0,
          name: '',
          title: '',
          type: '',
          sort: '',
          parent: parent
        }
        this.showAddModal = true
      },
      addOrUpdate () {
        if (this.addForm.id == 0) {
          view.tip('添加')
        } else {
          view.tip('修改')
        }
        this.showAddModal = false
        this.GetMenuList()
      }
    }
  }
</script>

<style scoped lang="less">

</style>
