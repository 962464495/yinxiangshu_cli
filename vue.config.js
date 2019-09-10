const path = require('path')

const resolve = dir => {
  return path.join(__dirname, dir)
}

// 项目部署基础
// 默认情况下，我们假设你的应用将被部署在域的根目录下,
// 例如：https://www.my-app.com/
// 默认：'/'
// 如果您的应用程序部署在子路径中，则需要在这指定子路径
// 例如：https://www.foobar.com/my-app/
// 需要将它改为'/my-app/'
// iview-admin线上演示打包路径： https://file.iviewui.com/admin-dist/
const BASE_URL = process.env.NODE_ENV === 'production'
  ? '/'
  : '/'

module.exports = {
  baseUrl: BASE_URL,
  // 如果你不需要使用eslint，把lintOnSave设为false即可
  lintOnSave: false,
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))     // src目录的映射关系
      .set('_c', resolve('src/components')) // components目录的映射关系
      .set('_lib', resolve('src/libs')) // lib目录的映射关系
      .set('_api', resolve('src/api/member.js'))  //api映射关系
      .set('_tip', resolve('src/libs/view.js'))  //api映射关系
  },
  // 打包时不生成.map文件
  productionSourceMap: false,
  // 这里写你调用接口的基础路径，来解决跨域，如果设置了代理，那你本地开发环境的axios的baseUrl要写为 '' ，即空字符串
  devServer: {
    open: true,
    disableHostCheck: false,
    //处理跨域请求
    proxy: {
      '/api': {
        target: 'http://localhost:8001',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        },
      },
    }
  },
  //  开发环境模拟数据
  configureWebpack: {
    devServer: {
      before (app) {
        app.get('/admin/member/getAdminMemberInfo', function (req, res) {
          res.json({
            'code': 1,
            'data': {
              'count': 2,
              'res': [
                {
                  'address': '回龙观',
                  'company': '印象树',
                  'create_time': '2019-08-08 16:48:14',
                  'email': '666666@qq.com',
                  'end_flag': '0', //如果为0 代表永久有效
                  'end_time': null,
                  'head_img': '',
                  'id': '4',
                  'name': '杨成宝',
                  'package_info_amount': '10000.00',
                  'package_info_id': '1',
                  'package_info_year': '0',
                  'package_type_info_id': '1',
                  'package_type_name': '个人会员',
                  'phone': '18911932353',
                  'profess': '程序员',
                  'status': '1',
                  'user_info_id': '12'
                },
                {
                  'address': '北京市海淀区上庄',
                  'company': '印象树',
                  'create_time': '2019-08-09 14:29:18',
                  'email': '962464495@qq.com',
                  'end_flag': '0',
                  'end_time': null,
                  'head_img': '/images/156532164483676.png',
                  'id': '5',
                  'name': '曹强',
                  'package_info_amount': '0.00',
                  'package_info_id': '0',
                  'package_info_year': '0',
                  'package_type_info_id': '1',
                  'package_type_name': '个人会员',
                  'phone': '13552813211',
                  'profess': '程序',
                  'status': '1',
                  'user_info_id': '13'
                }
              ]
            },
            'msg': ''
          })
        })
        app.get('/adminMenu', function (req, res) {
          res.json({
            'code': 1,
            'data': [
              {
                title: '系统管理',
                name: '/system',
                id: 1,
                expand: true,
                menuType: 1,
                sort: 1,
                parent: 0,
                children: [
                  {
                    title: '管理员管理',
                    name: '/system/manager',
                    id: 2,
                    expand: true,
                    menuType: 2,
                    sort: 1,
                    parent: 1,
                    children: [
                      {
                        title: '添加菜单',
                        name: '',
                        id: 3,
                        menuType: 3,
                        sort: 1,
                        expand: true,
                        parent: 2,
                        children: []
                      },
                    ]
                  },
                  {
                    title: '角色管理',
                    name: '/system/role',
                    id: 4,
                    expand: true,
                    menuType: 2,
                    sort: 2,
                    parent: 1,
                    children: [
                      {
                        title: '添加角色',
                        name: '',
                        id: 5,
                        expand: true,
                        menuType: 3,
                        sort: 1,
                        parent: 4,
                        children: []
                      },
                    ]
                  }
                ]
              }
            ],
            'msg': ''
          })
        })
        app.get('/admin/package/getPackageTypeInfo', function (req, res) {
          res.json({
            'code': 1,
            'data': [
              {
                'id': '1',
                'name': '个人会员',
                'sort': '0',
                'status': '0'
              },
              {
                'id': '2',
                'name': '理事',
                'sort': '1',
                'status': '0'
              },
              {
                'id': '3',
                'name': '常务理事',
                'sort': '2',
                'status': '0'
              },
              {
                'id': '4',
                'name': '副理事长',
                'sort': '3',
                'status': '0'
              },
              {
                'id': '5',
                'name': '理事长',
                'sort': '4',
                'status': '0'
              }
            ],
            'msg': ''
          })
        })
        app.post('/admin/member/getAdminMemberLogInfo', function (req, res) {
          res.json({
            'code': 1,
            'data': {
              'count': 6,
              'res': [
                {
                  'address': '回龙观',
                  'company': '印象树',
                  'create_time': '2019-08-09 14:04:23',
                  'email': '666666@qq.com',
                  'id': '1',
                  'name': '杨成宝',
                  'package_info_amount': '10000.00',
                  'package_info_id': '1',
                  'package_info_year': '3',
                  'package_type_info_id': '1',
                  'package_type_name': '',
                  'phone': '18911932353',
                  'profess': '程序员',
                  'status': '1',
                  'user_info_id': '12'
                },
                {
                  'address': '回龙观',
                  'company': '印象树',
                  'create_time': '2019-08-09 14:04:47',
                  'email': '666666@qq.com',
                  'id': '2',
                  'name': '杨成宝',
                  'package_info_amount': '10000.00',
                  'package_info_id': '1',
                  'package_info_year': '0',
                  'package_type_info_id': '1',
                  'package_type_name': '',
                  'phone': '18911932353',
                  'profess': '程序员',
                  'status': '1',
                  'user_info_id': '12'
                },
                {
                  'address': '回龙观',
                  'company': '印象树',
                  'create_time': '2019-08-09 14:06:57',
                  'email': '666666@qq.com',
                  'id': '3',
                  'name': '杨成宝',
                  'package_info_amount': '10000.00',
                  'package_info_id': '1',
                  'package_info_year': '0',
                  'package_type_info_id': '1',
                  'package_type_name': '',
                  'phone': '18911932353',
                  'profess': '程序员',
                  'status': '0',
                  'user_info_id': '12'
                },
                {
                  'address': '回龙观',
                  'company': '印象树',
                  'create_time': '2019-08-09 14:07:09',
                  'email': '666666@qq.com',
                  'id': '4',
                  'name': '杨成宝',
                  'package_info_amount': '1000.00',
                  'package_info_id': '2',
                  'package_info_year': '1',
                  'package_type_info_id': '1',
                  'package_type_name': '',
                  'phone': '18911932353',
                  'profess': '程序员',
                  'status': '0',
                  'user_info_id': '12'
                },
                {
                  'address': '回龙观',
                  'company': '印象树',
                  'create_time': '2019-08-09 14:07:10',
                  'email': '666666@qq.com',
                  'id': '5',
                  'name': '杨成宝',
                  'package_info_amount': '1000.00',
                  'package_info_id': '2',
                  'package_info_year': '1',
                  'package_type_info_id': '1',
                  'package_type_name': '',
                  'phone': '18911932353',
                  'profess': '程序员',
                  'status': '0',
                  'user_info_id': '12'
                },
                {
                  'address': '回龙观',
                  'company': '印象树',
                  'create_time': '2019-08-09 14:13:11',
                  'email': '666666@qq.com',
                  'id': '6',
                  'name': '杨成宝',
                  'package_info_amount': '10000.00',
                  'package_info_id': '1',
                  'package_info_year': '0',
                  'package_type_info_id': '1',
                  'package_type_name': '',
                  'phone': '18911932353',
                  'profess': '程序员',
                  'status': '0',
                  'user_info_id': '12'
                }
              ]
            },
            'msg': ''
          })
        })
      }
    }
  }
}
