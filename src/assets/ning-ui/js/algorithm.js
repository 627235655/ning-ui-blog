class Algorithm {
  /*
	二分法
	params: 有序列表, 检索值
	return: index
 */
  dichotomy = (arr, val) => {
    let start = 0,
      end = arr.length - 1,
      halfVal = null;
    while (start <= end) {
      let mid = Math.ceil((end + start) / 2);
      halfVal = arr[mid];
      if (val === halfVal) return mid;
      if (halfVal > val) {
        end = mid - 1;
      } else {
        start = mid + 1;
      }
    }
    return -1;
  };
}

export default Algorithm;
