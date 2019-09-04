<template>
  <div>
    <div style="background: white; padding: 20px;">
      <Row>
        <Col span="12">权限菜单管理</Col>
        <Col span="12"><Button type="success" style="float: right;" @click="addMenu(0)">添加顶级</Button></Col>
      </Row>

    <Tree :data="data" :render="renderContent">
      <template slot-scope="{ data, index }" slot="item">
        asdfjaldjf
      </template>

    </Tree>
    </div>

    <Modal
      v-model="showAddModal"
      :title="addForm.id == 0 ? '添加' : '修改'">
      <Form ref="addForm" :model="addForm" :label-width="80">

        <FormItem label="名称" prop="title">
          <Input v-model="addForm.title" placeholder="请输入名称"></Input>
        </FormItem>
        <FormItem label="标识" prop="name">
          <Input v-model="addForm.title" placeholder="请输入标识"></Input>
        </FormItem>
        <FormItem label="类型" prop="year">
          <Select v-model="addForm.type" placeholder="请选择类型">
            <Option value="0">页面</Option>
            <Option value="1">菜单文价夹</Option>
            <Option value="2">操作</Option>
          </Select>
        </FormItem>
        <FormItem label="排序" prop="sort">
          <Input v-model="addForm.title" placeholder="请输入排序（升序）"></Input>
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
      data: [
        {
          title: '会员管理',
          id: 1,
          expand: true,
          children: [
            {
              title: '会员申请',
              expand: true,
              children: [
                {
                  title: '通过',
                  expand: true
                },
                {
                  title: '拒绝',
                  expand: true
                }
              ]
            },
            {
              title: '会员设置',
              expand: true,
              children: [
                {
                  title: '添加设置',
                  expand: true
                },
                {
                  title: '修改设置',
                  expand: true
                }
              ]
            }
          ]
        }, {
          title: '系统管理',
          expand: true,
          children: [
            {
              title: '管理员管理',
              expand: true,
              children: [
                {
                  title: '添加管理员',
                  expand: true
                },
                {
                  title: '修改管理员',
                  expand: true
                }
              ]
            }
          ]
        }
      ],
      buttonProps: {
        type: 'default',
        size: 'small'
      }
    }
  },
  methods: {
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
              type: 'ios-paper-outline'
            },
            style: {
              marginRight: '8px'
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
              click: () => { this.append(data) }
            }
          }),
          h('Button', {
            props: Object.assign({}, this.buttonProps, {
              icon: 'md-create'
            }),
            on: {
              click: () => { this.remove(root, node, data) }
            }
          })
        ])
      ])
    },
    append (data) {
      console.log(data)
      this.curItem = data
      this.addMenu(data.id || 0)
      // const children = data.children || [];
      // children.push({
      //   title: 'appended node',
      //   expand: true
      // });
      // this.$set(data, 'children', children);
    },
    remove (root, node, data) {
      const parentKey = root.find(el => el === node).parent
      const parent = root.find(el => el.nodeKey === parentKey).node
      const index = parent.children.indexOf(data)
      parent.children.splice(index, 1)
    },
    addMenu (parent) {
      this.showAddModal = true
      this.addForm = {
        id: 0,
        name: '',
        title: '',
        type: '',
        sort: '',
        parent: parent
      }
      if (parent == 0) {
        this.curItem = ''
      }
    },
    addOrUpdate () {
      this.showAddModal = false
      var item = {
        title: '最新添加',
        expand: true
      }
      if (this.curItem == '') {
        var data = this.data
        data.push(item)
        this.data = data
      } else {
        var data = this.curItem
        const children = data.children || []
        children.push({
          title: '最新加入',
          expand: true
        })
        this.$set(data, 'children', children)
      }
    }
  }
}
</script>

<style>
  .ivu-tree ul li{
    border: 1px solid gainsboro;
    padding: 5px 0px 5px 10px;
  }

</style>
