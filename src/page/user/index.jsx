import React, { Component } from 'react'
import User from 'service/user-service.jsx'
import Mutil from 'util/mm.jsx'

import Pagination from 'util/pagination/index.jsx';
import PageTitle from 'component/page-title/index.jsx'

const _mm = new Mutil()
const _user = new User()

class Error extends Component {
    constructor(props) {
        super(props)

        this.state = {
            list:[],
            pageNum:1,
            firstLoading:true
        }
    }
    componentDidMount(){
        this.loaderList()
    }
    loaderList(){
        _user.getUserList(this.state.pageNum).then(res=>{
            this.setState(res,()=>{
                this.setState({
                    firstLoading:false
                })
            })
        },errMsg=>{
            this.setState({
                list:[]
            })
            _mm.errorTips(errMsg)
        })
    }
    // 页数发生变化的时候
    pageNumChange(pageNum){
        this.setState({
            pageNum:pageNum
        },()=>{
            this.loaderList()
        })
    }
    render() {
        let listBody=this.state.list.map((user,index)=>{
            return (
                <tr key={index}>
                    <td>{user.id}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{new Date(user.createTime).toLocaleString()}</td>
                </tr>
            )
        });
        let listError =(
            <tr>
                <td colSpan="5" className="text-center">{this.state.firstLoading?"正在加载数据...":"没有找到相应结果"}</td>
            </tr>
        )
        let tableBody = this.state.list.length>0? listBody:listError
        return (
            <div id="page-wrapper">
                <PageTitle title='用户列表'>
                    <div className="row">
                        <div className="col-md-12">
                            <table className="table table-striped table-bordered">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>用户名</th>
                                        <th>邮箱</th>
                                        <th>电话</th>
                                        <th>注册时间</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        tableBody
                                    }
                                    
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <Pagination current={this.state.pageNum} 
                                total={this.state.total} 
                                onChange={(pageNum)=>this.pageNumChange(pageNum)}/>
                </PageTitle>
            </div>
        )
    }
}

export default Error