let util = {};

util.convertToTrees = function(array, idFieldName, parentIdFieldName, childrenFieldName){
  console.log("인식");
    var cloned = array.slice();
    
  
    for(var i=cloned.length-1; i>-1; i--){
      var parentId = cloned[i][parentIdFieldName];//배열을 작성순으로 뒤에서부터 읽어옴. 그 중에서도 부모 id를 가진 값을 찾음. 즉 대댓글
      
  
      if(parentId){//부모 아이디가 있으면
        var filtered = array.filter(function(elem){//모든 array를 돌아봄
          return elem[idFieldName].toString() == parentId.toString();//모든 댓글 배열들을 돌면서 부모아이디와 자기의 아이디가 같은 댓글을 찾음
        });//결국 리턴값은 부모 아이디의 주인 댓글!
  
        if(filtered.length){
          var parent = filtered[0];//찾은 그 값을 변수로 저장
          console.log("parent :"+ parent);
  
          if(parent[childrenFieldName]){//부모 댓글에 자식 댓글이 이미 있으면
            console.log("parent[childrenFieldName]"+ parent[childrenFieldName]);
            parent[childrenFieldName].unshift(cloned[i]);//이미 있는 자식 댓글들(가상 자식배열) 가장 앞으로 넣어줌. 이미 정렬 완료되서 받았으니!
            console.log("parent[childrenFieldName]"+ parent[childrenFieldName]);
          }
          else {//없으면 대댓글 찾은 값이 부모 댓글의 차일드 부분(가상으로 생성)에 들어감.
            parent[childrenFieldName] = [cloned[i]];
          }
          console.log("cloned[i]"+ cloned[i]);
  
        }
        cloned.splice(i,1);//댓글 배열 중 차일드 부분으로 들어간 배열 삭제
      }
    }
  
    return cloned;
  }
  
  module.exports = util;
  