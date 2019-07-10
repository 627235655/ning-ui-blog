import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './CommentApp.scss';
import util from 'assets/js/utils';
import notify from 'assets/ning-ui/js/notify.js'

declare global {
   interface Window { user_name: string }
}

interface CommentAppProps{
	articleId: number;
	articleName: string;
}

interface CommentAppState{
	show_comment_input: boolean;
	comments: Array<any>;
	commentTotalCount: number;
}

class CommentApp extends React.Component<CommentAppProps, CommentAppState> {
	constructor(props: any) {
		super(props)
		this.state = {
			show_comment_input: true,
			comments: [],
			commentTotalCount: 0,
		}
	}

	componentDidMount() {
		this.getCommentList();
	}

	getCommentList = () => {
		let self = this,
			url = '/api/getCommentList',
			data = {
				filter: {
					articleId: this.props.articleId,
				}
			},
			cb = (res: any) => {
				self.setState({
            		comments: res.data.list,
            		commentTotalCount: res.data.totalCount,
            		show_comment_input: true,
            	})
			}

		util.axiosFn({
			url,
			data,
			method: 'get',
			cb
		})
	}

	handleShowCommentInput = (comment: any) => {
		this.setState({
			show_comment_input: comment._id === this.state.show_comment_input ? true : comment._id,
		});
	}

	setLikeCount = (comment_id: number) => {
		let self = this,
			url: '/api/setCommentLikeCount',
			data = {
				_id: comment_id,
			},
			cb = (res: any) => {
				notify.success(res.message)
            	self.getCommentList();
			}
		util.axiosFn({
			url,
			data,
			method: 'post',
			cb
		})
	}

	render() {
		return(
				<div className="comment-app">
					{this.state.show_comment_input === true &&
						<CommentInput
							articleName={this.props.articleName}
							articleId={this.props.articleId}
							parentId={this.props.articleId}
							getCommentList={this.getCommentList}
						/>
					}
					{
						this.state.commentTotalCount > 0 &&
						<h4 className="tc"><span className="">{ this.state.commentTotalCount + ' 条评论'}</span></h4>
					}
					<CommentList
						articleName={this.props.articleName}
						articleId={this.props.articleId}
						comments={this.state.comments}
						show_comment_input={this.state.show_comment_input}
	      				handleShowCommentInput={this.handleShowCommentInput}
						getCommentList={this.getCommentList}
						setLikeCount={this.setLikeCount}
					/>
				</div>
			)
	}
}

interface CommentInputProps{
	articleName: string;
	articleId: number;
	parentId: number;
	comment?: any;
	getCommentList: () => void;
}

interface CommentInputState{
	articleName: string;
  	articleId: number;
  	parentId: number;
  	userName: string;
  	toUserName: string;
  	email: string;
  	website: string;
  	content: string;
  	likeCount: number;
  	subCommentList: Array<any>;
  	createDate: Date;
  	isAuthor: boolean,
}

class CommentInput extends React.Component<CommentInputProps, CommentInputState> {
	constructor(props: any) {
		super(props)
		this.state = {
			articleName: '',
	      	articleId: 0,
	      	parentId: 0,
	      	userName: window.user_name ? 'n顾盼神飞' : '',
	      	toUserName: '',
	      	email: window.user_name ? '627235655@qq.com' : '',
	      	website: window.user_name ? 'http://www.ningzongyuan.com' : '',
	      	content: '',
	      	likeCount: 0,
	      	subCommentList: [],
	      	createDate: new Date(),
	      	isAuthor: window.user_name ? true : false,
	    }
	}

	setUserName = (e: any) => {
		this.setState({
			userName: e.target.value,
		});
	}

	setEmail = (e: any) => {
		this.setState({
			email: e.target.value,
		});
	}

	setWebsite = (e: any) => {
		this.setState({
			website: e.target.value,
		});
	}

	setContent = (e: any) => {
		this.setState({
			content: e.target.value,
		});
	}

	addComment = () => {
		let self = this;
		let data = Object.assign(self.state);
		if (!data.isAuthor && data.userName == '') {
			notify.warning('请输入用户名~')
			return;
		}
		if (!data.isAuthor && data.email == '') {
			notify.warning('请输入邮箱~')
			return;
		}
		if (!data.isAuthor && !util.checkEmail(data.email)) {
			notify.warning('请输入正确的邮箱~')
			return;
		}
		if (data.content == '') {
			notify.warning('请输入评论内容~')
			return;
		}
		data.articleName = self.props.articleName;
		data.articleId = self.props.articleId;
		data.parentId = self.props.parentId;
		data.toUserName = self.props.comment && self.props.comment.userName;
		let url = '/api/addComment',
			cb = (res: any) => {
				notify.success(res.message)
                self.setState({
                	articleName: '',
			      	articleId: 0,
			      	parentId: 0,
			      	userName: '',
			      	toUserName: '',
			      	email: '',
			      	website: '',
			      	content: '',
			      	likeCount: 0,
			      	subCommentList: [],
			      	createDate: new Date(),
                }, () => {
                	self.props.getCommentList();
                });
			}
		util.axiosFn({
			url,
			data,
			method: 'post',
			cb
		})
	}

	render() {
		return(
				<div>
				<h4 className="tc" id="comment_app"><span className="ning-prompt-trigger" data-prompt="{content: '留下你宝贵的评论吧', theme: 'blue'}">坐而论道，山高水长</span></h4>
				<div className="comment-input ning-row">
			        <div className='ning-form-item col-4'>
			          	<label>用户名：</label>
		            	<input
		            		className="flex-1"
		            		placeholder="必填"
		            		value={this.state.userName}
		            		maxLength={20}
		            		onChange={(event) => this.setUserName(event)}
	            		/>
			        </div>
			        <div className='ning-form-item col-4'>
			          	<label>邮箱：</label>
		            	<input
		            		className="flex-1"
		            		placeholder="必填，不公开"
		            		type="email"
		            		value={this.state.email}
		            		maxLength={50}
		            		onChange={(event) => this.setEmail(event)}
	            		/>
			        </div>
			        <div className='ning-form-item col-8'>
			          	<label>网站：</label>
		            	<input
		            		className="flex-1"
		            		placeholder="我信任你，不会填写广告链接"
		            		value={this.state.website}
		            		maxLength={50}
		            		onChange={(event) => this.setWebsite(event)}
	            		/>
			        </div>
			        <div className='ning-form-item col-12'>
			          	<label>评论内容：</label>
			            <textarea
			            	placeholder="必填"
			            	value={this.state.content}
			            	maxLength={500}
			            	onChange={(event) => this.setContent(event)}
		            	/>
			        </div>
			        <div className='ning-form-item col-12'>
			          	<label></label>
		          		<button
		          			className="ning-btn"
		          			onClick={() => this.addComment()}
	          			>发布评论</button>
			        </div>
		      	</div>
		      	</div>
			)
	}
}

interface CommentListProps{
	articleName: string;
	articleId: number;
	comments: Array<any>;
	show_comment_input: boolean;
	handleShowCommentInput: (comment: any) => void;
	getCommentList: () => void;
	setLikeCount: (comment_id: number) => void;
}


class CommentList extends React.Component<CommentListProps> {
	render() {
	    return (
	      		<div className="m-b-lg">
		      		{this.props.comments.map((comment: any, i: number) =>
		      			<Comment
		      				key={i}
		      				comment={comment}
		      				parentId={comment._id}
		      				articleName={this.props.articleName}
		      				articleId={this.props.articleId}
		      				show_comment_input={this.props.show_comment_input}
		      				handleShowCommentInput={this.props.handleShowCommentInput}
							getCommentList={this.props.getCommentList}
							setLikeCount={this.props.setLikeCount}
	  					/>
					)}
      				{this.props.comments.length === 0 && <hr className="m-t-lg m-b-lg" data-text="暂时还没有评论哟，抢占一楼吧~" />}
	      		</div>
    	)
	}
}

interface CommentProps{
	comment: any;
	show_comment_input: boolean;
	articleName: string;
	articleId: number;
	parentId: number;
	getCommentList: () => void;
	handleShowCommentInput: (comment: any) => void;
	setLikeCount: (comment_id: number) => void;
}

class Comment extends React.Component<CommentProps> {
	render () {
		let comment = this.props.comment;
	    return (
	      <div className='comment'>
	      		<div>
	      			<span className="_xs _gray">
	      				{
	      					comment.website ? <a className={comment.isAuthor ? "_sm _bold blue" : '_sm _bold'} href={comment.website} target="_blank">{comment.userName}</a> : <span className="_sm _bold">{comment.userName}</span>
	      				}
	      				{
	      					comment.toUserName ? ' 回复 ' + comment.toUserName + '：' : ' 说道：'
	      				}
	      				</span>
	        			<span className="">{comment.content}</span>
	      		</div>
	      		<div className="flex-row-box m-t-sm _xs _gray">
      				<span>{util.getPassedTime(comment.createDate)}</span>
      				<span className="flex-center-box">
      					<i className="ning-icon icon-heart m-r-sm" onClick={() => this.props.setLikeCount(comment._id)}></i>
      					{comment.likeCount > 0 && `(${comment.likeCount})`}
      					<span className="m-l-md m-r-md">|</span>
      					<i className="ning-icon icon-comment" onClick={() => this.props.handleShowCommentInput(comment)}></i>
      				</span>
      			</div>
	        	{this.props.show_comment_input === comment._id &&
					<CommentInput
						articleName={this.props.articleName}
						articleId={this.props.articleId}
						parentId={this.props.parentId}
						comment={comment}
						getCommentList={this.props.getCommentList}
					/>
				}
					{
		        		(comment.subCommentList && comment.subCommentList.length > 0) &&
						<div className="sub-comment-list">
			        		{ comment.subCommentList.map((v: any, i: number) =>
			        			<Comment
			        				key={i}
			        				comment={v}
			        				articleName={this.props.articleName}
			        				articleId={this.props.articleId}
									parentId={comment._id}
			      					show_comment_input={this.props.show_comment_input}
			      					handleShowCommentInput={this.props.handleShowCommentInput}
									getCommentList={this.props.getCommentList}
									setLikeCount={this.props.setLikeCount}
		        				/>)
			        		}
						</div>
		        	}
	      </div>
	    )
	  }
}

export default CommentApp;
