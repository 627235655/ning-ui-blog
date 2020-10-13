function ListNode(val, next) {
	this.val = val;
	this.next = next;
}

// 真题描述：将两个有序链表合并为一个新的有序链表并返回。新链表是通过拼接给定的两个链表的所有结点组成的。

// 示例： 输入：1->2->4, 1->3->4 输出：1->1->2->3->4->4

function mergeTwoLists(l1, l2) {
	// 构造一个起始节点
	let head = new ListNode();
	// 构造一个指针
	let cur = head;
	// 当 l1、l2 都有值时循环，l1 && l2 === true
	while (l1 && l2) {
		// 若 l1 值大于 l2 的值
		if (l1.val <= l2.val) {
			// 串起 l1
			cur.next = l1;
			// l1 指针向前走一步
			l1 = l1.next;
		} else {
			// 串起 l2
			cur.next = l2;
			// l2 指针向前走一步
			l2 = l2.next;
		}
		// 每循环一次 指针前行一步
		cur = cur.next;
	}
	// 因为 l1\l2 本来是有序的 当一个为空时 直接将另一个串在后面即可
	cur.next = l1 !== null ? l1 : l2;
	// 返回起始节点
	return head.next;
}
