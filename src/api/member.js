import { get, post } from '@/api/base'

// 获取会员列表
export const getMemberList = (data) => get('admin/member/getAdminMemberInfo', data)
// 获取会员类型
export const getPackageTypeInfo = (data) => get('admin/package/getPackageTypeInfo', data)
// 获取会员包
export const getAdminPackageInfo = (data) => get('admin/package/getAdminPackageInfo', data)
// 更改会员状态
export const changeMemberStatus = (data) => post('admin/package/changeMemberStatus', data)
// 更改到期时间
export const changeMemberEndTime = (data) => post('admin/member/changeMemberEndTime', data)
// 获取会员申请列表
export const getAdminMemberLogInfo = (data) => post('admin/member/getAdminMemberLogInfo', data)
// 更改会员申请状态
export const changeAdminMemberLogStatus = (data) => post('admin/package/changeAdminMemberLogStatus', data)
// 添加/修改会员包
export const savePackageInfo = (data) => post('admin/package/savePackageInfo', data)
// 修改会员包状态
export const changePackageStatus = (data) => post('admin/package/changePackageStatus', data)
