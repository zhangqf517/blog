# git 常用命令

ssh-keygen -t rsa -C "邮箱地址"		//生成ssh

git remote -v   		//查看远程仓库信息

git remote rm origin		//删除已有的远程仓库 <"origin"：仓库名字>

git remote add origin git@gitee.com:VIHY/test.git		//关联远程仓库

git add		//将已修改代码加入到工作区   <"add . ": 全部加载>

git commit -m "xxxx"  // 将工作区代码提交到分支 <"xxxx": 提交的版本信息>

git re xxx			//删除目录

git push origin master	// 上传代码到github

git checkout -- xxx.js		// 将某文件回退到上一版本 <"xxx.js": 文件名>