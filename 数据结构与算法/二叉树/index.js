function TreeNode(val, left = null, right = null) {
	this.val = val;
	this.left = left;
	this.right = right;
}

const D = new TreeNode('D');
const E = new TreeNode('E');
const F = new TreeNode('F');
const G = new TreeNode('G');
const B = new TreeNode('B', D, E);
const C = new TreeNode('C', G, F);
const A = new TreeNode('A', B, C);

// 递归
// 1、递归式
// 2、递归边界

// 二叉树的遍历

// 先序遍历 根节点->左子树->右子树
function xxbl(root) {
	if (!root) return;
	console.log('现在遍历的节点是：', root.val);
	xxbl(root.left);
	xxbl(root.right);
}

// 中序遍历 左子树->根节点->右子树
function zxbl(root) {
	if (!root) return;
	zxbl(root.left);
	console.log('现在遍历的节点是：', root.val);
	zxbl(root.right);
}

// 后序遍历 左子树->右子树->根节点
function hxbl(root) {
	if (!root) return;
	hxbl(root.left);
	hxbl(root.right);
	console.log('现在遍历的节点是：', root.val);
}
