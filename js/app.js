const $newtodo = $('.new-todo');
const $footer = $('footer');
const $todolist = $('.todo-list');
const $mainlabel = $('.main label');
const $toggleall = $('#toggle-all');
const $strong = $('strong');
const $footerbutton = $('footer button');
const $active = $("[href='#/active']");
const $completed = $("[href='#/completed']");
const $all = $("[href='#/']");
const $clearcompleted = $('.clear-completed');

// 宣告陣列儲存待辦事項
let todolist = [];
let i = 1;

// 計算剩餘數目
function countitems() {
  let activeitems = 0;
  for (let i = 0; i < todolist.length; i++) {
    if (todolist[i]._completed === false) {
      activeitems++;
      // 取消 toggle-all 按鈕
      $toggleall.prop('checked', false);
    }
    if (activeitems === 0) {
      // 勾選 toggle-all 按鈕
      $toggleall.prop('checked', true);
    }
  }
  $strong.text(activeitems);
}
//隱藏 clear-completed 按鈕
function hideclearcompleted() {
  let activeitems = 0;
  for (let i = 0; i<todolist.length; i++) {
    if (todolist[i]._completed === true) {
      activeitems++ ;
      if (activeitems === 0){
        $footerbutton.addClass('displaynone');
      }
    }
  }
}
//隱藏 toggle-all 按鈕 & footer
function hidetoggleallfooter() {
  if($todolist.find('li').length === 0) {
    // 取消 toggle-all 按鈕
    $toggleall.prop('checked', false);
    // 隱藏 taggle-all 按鈕
    $('.main label').addClass('displaynone');
    // 隱藏 footer
    $footer.addClass('displaynone');
  }
}
// 刪除陣列中object
function deletethisobject($this) {
  for (let i = 0; i<todolist.length; i++) {
    if (todolist[i]._id == $($this).parents('li').attr('id')) {
      todolist.splice(i,1);
    }
  }
}
// 刪除陣列中compeleted object
function deletecompeletedobject() {
  let n =  todolist.length - 1 ;
  for (let i = n; i >= 0; i--) {
    if (todolist[i]._completed === true) {
      todolist.splice(i,1);
    }
  }
}
// 更換object中_text值
function changethisobjecttext($this,$inputval) {
  for (let i = 0; i<todolist.length; i++) {
    if (todolist[i]._id == $($this).parents('li').attr('id')) {
      todolist[i]._text = $inputval;
    }
  }
}

// 更改 object中_completed 為不確定
function changethisobjectfalse($this) {
  for (let i = 0; i<todolist.length; i++) {
    if (todolist[i]._id == $($this).parents('li').attr('id')) {
      todolist[i]._completed = false;
    }
  }
}
// 更改 object中_completed 全部為不確定
function changeobjectfalse() {
  for(let i=0; i < todolist.length; i++) {
    todolist[i]._completed = false;
  }
}
// 更改 object中_completed 為確定
function changethisobjecttrue($this) {
  for (let i = 0; i<todolist.length; i++) {
    if (todolist[i]._id == $($this).parents('li').attr('id')) {
      todolist[i]._completed = true;
    }
  }
}
// 更改 object中_completed 全部為確定
function changeobjecttrue() {
  for(let i=0; i < todolist.length; i++) {
    todolist[i]._completed = true;
  }
}
//取消勾選 toggle-all 按鈕
function toggleallfalse() {
  if ($('.todo-list').find('.completed').length != $('.todo-list').find('li').length) {
    $('#toggle-all').prop('checked', false)
  }
}
//勾選 toggle-all 按鈕
function togglealltrue() {
  if ($('.todo-list').find('.completed').length === $('.todo-list').find('li').length) {
    $('#toggle-all').prop('checked', true)
  }
}
//隱藏 toggle-all 按鈕
function togglealltrue() {
  if ($('.todo-list').find('li').length === 0) {
    $('.main label').addClass('displaynone');
  }
}

$(function() {
  $newtodo.keypress(e => {
    if (e.which === 13) {
      const value = $newtodo.val()
      // 空值不能輸入
      if (value != '') {
        // 隱藏已經輸入字元
        $newtodo.val('')
        const newChild = $(`
          <li id=${i}>
            <div class="view">
              <input class="toggle" type="checkbox">
              <label>${value}</label>
              <button class="destroy"></button>
            </div>
            <input class="edit" value="${value}">
          </li>`)
        // 新增物件進入陣列
        todolist.push({_text:value, _completed:false,_id:i});
        i++;
        // completed不用新增待辦事項
        if (location.hash != '#/completed') {
          $todolist.append(newChild);
          $mainlabel.removeClass('displaynone');
          $footer.removeClass('displaynone');
        }
        // 計算剩餘數目
        countitems();
        // 刪除項目
        newChild.find('.destroy').on('click', function() {
          // 刪除陣列中object
          let $this = this;
          deletethisobject($this);
          $(this).closest('li').remove();
          // 計算剩餘數目
          countitems();
          //隱藏 clear-completed 按鈕
          hideclearcompleted();
          //隱藏 toggle-all 按鈕 & footer
          hidetoggleallfooter();
        })
        // 編輯項目
        newChild.find('label').on('dblclick', function() {
          let $input = $(this).closest('li').addClass('editing').find('.edit');
          let $this = this;
          $input.focus();
          $input.keyup(e => {
            if (e.which === 13) {
              if($input.val() === ''){
                // 刪除陣列中object
                deletethisobject($this);
                $(this).closest('li').remove();
                // 計算剩餘數目
                countitems();
                //隱藏 clear-completed 按鈕
                hideclearcompleted();
                //隱藏 toggle-all 按鈕 & footer
                hidetoggleallfooter();
              } else {
                let $inputval = $input.val();
                $(this).text($inputval);
                $input.attr('value', $inputval);
                // 更換object中_text值
                changethisobjecttext($this,$inputval);
                $input.blur();
                $(this).closest('li').removeClass('editing');
              }
            }
            if(e.which === 27) {
              // 還原待辦事項
              $input.val($input.attr('value'));
              $input.blur();
              $(this).closest('li').removeClass('editing');
            }
          })
        })
        //點擊編輯區域外
        newChild.find('.edit').blur(function() {
          let $this = this;
          if($(this).val() === '') {
            // 刪除陣列中object
            deletethisobject($this);
            $(this).closest('li').remove();
            // 計算剩餘數目
            countitems();
            //隱藏 clear-completed 按鈕
            hideclearcompleted();
            //隱藏 toggle-all 按鈕 & footer
            hidetoggleallfooter();
          } else {
            let $inputval = $(this).val();
            // 更改代辦事項
            $(this).prev().find('label').text($(this).val());
            $(this).prev().find('label').attr('value',$(this).val());
            $(this).closest('li').removeClass('editing');
            // 更換object中_text值
            changethisobjecttext($this,$inputval);
          }
        })
        // 完成項目
        newChild.find('.toggle').on('click', function() {
          let $this = this;
          if ($(this).closest('li').hasClass('completed')) {
            // 取消完成
            $(this).closest('li').removeClass('completed');
            // 更改 object中_completed 為不確定
            changethisobjectfalse($this);
            //隱藏 clear-completed 按鈕
            hideclearcompleted();
            // 計算剩餘數目
            countitems();
            //取消勾選 toggle-all 按鈕
            toggleallfalse();
          } else {
            // 已完成
            $(this).closest('li').addClass('completed');
            // 更改 object中_completed 為確定
            changethisobjecttrue($this);
            // 出現 clear completed 按鈕
            $footerbutton.removeClass('displaynone');
            // 計算剩餘數目
            countitems();
            //勾選 toggle-all 按鈕
            togglealltrue();
          }
        })
      }
    }
  })
  // 全選項目
  $toggleall.on('click', function() {
    if (location.hash != '#/completed') {
      // 取消全選
      if ($todolist.find('.completed').length === $todolist.find('li').length) {
        // 更改 object中_completed 全部為不確定
        changeobjectfalse();
        $todolist.find('li').removeClass('completed');
        // 取消 toggle-all 選取
        $toggleall.prop('checked', false)
        // 取消已完成
        $todolist.find('input[type="checkbox"]').prop('checked', false)
        // 隱藏清除選取按鈕
        $footerbutton.addClass('displaynone');
        // 計算剩餘數目
        countitems();
      } else {
        // 全選
        $todolist.find('input[type="checkbox"]').prop('checked', true);
        $todolist.find('li').addClass('completed');
        $toggleall.prop('checked', true);
        // 更改 object中_completed 全部為確定
        changeobjecttrue();
        // 出現清除選取按鈕
        $footerbutton.removeClass('displaynone');
        // 計算剩餘數目
        countitems();
        if (location.hash === '#/active') {
          // 刪除待辦事項
          $todolist.find('.completed').remove();
          // 取消 toggle-all 選取
          $toggleall.prop('checked', false);
          // 隱藏 toggle-all 按鈕
          $mainlabel.addClass('displaynone');
          // 計算剩餘數目
          countitems();
        }
      }
    }
    if (location.hash === '#/completed') {
      // 全選
      let completeditems = 0;
      for(let i=0; i < todolist.length; i++) {
        if (todolist[i]._completed === true) {
          completeditems++;
        }
      }
      if (completeditems != todolist.length) {
        $todolist.find('li').remove();
        // 更改 object中_completed 全部為確定
        changeobjecttrue();
        for(let i=0; i < todolist.length; i++) {
          const newChild = $(`
            <li id=${todolist[i]._id}>
              <div class="view">
                <input class="toggle" type="checkbox">
                <label>${todolist[i]._text}</label>
                <button class="destroy"></button>
              </div>
              <input class="edit" value="${todolist[i]._text}">
            </li>`)
          $todolist.append(newChild);
          $footer.removeClass('displaynone');
          $footerbutton.removeClass('displaynone');
          $mainlabel.removeClass('displaynone');
          // 勾選 toggle-all 按鈕
          $toggleall.prop('checked', true);
          // 全選
          $todolist.find('input[type="checkbox"]').prop('checked', true)
          $todolist.find('li').addClass('completed');
          // 計算剩餘數目
          countitems();
          // 刪除項目
          newChild.find('.destroy').on('click', function() {
            // 刪除陣列中object
            let $this = this;
            deletethisobject($this);
            $(this).closest('li').remove();
            // 計算剩餘數目
            countitems();
            //隱藏 clear-completed 按鈕
            hideclearcompleted();
            //隱藏 toggle-all 按鈕 & footer
            hidetoggleallfooter();
          })
          // 編輯項目
          newChild.find('label').on('dblclick', function() {
            let $input = $(this).closest('li').addClass('editing').find('.edit');
            let $this = this;
            $input.focus();
            $input.keyup(e => {
              if (e.which === 13) {
                if($input.val() === ''){
                  // 刪除陣列中object
                  deletethisobject($this);
                  $(this).closest('li').remove();
                  // 計算剩餘數目
                  countitems();
                  //隱藏 clear-completed 按鈕
                  hideclearcompleted();
                  //隱藏 toggle-all 按鈕 & footer
                  hidetoggleallfooter();
                } else {
                  let $inputval = $input.val();
                  $(this).text($inputval);
                  $input.attr('value', $inputval);
                  // 更換object中_text值
                  changethisobjecttext($this,$inputval);
                  $input.blur();
                  $(this).closest('li').removeClass('editing');
                }
              }
              if(e.which === 27) {
                // 還原待辦事項
                $input.val($input.attr('value'));
                $input.blur();
                $(this).closest('li').removeClass('editing');
              }
            })
          })
          //點擊編輯區域外
          newChild.find('.edit').blur(function() {
            let $this = this;
            if($(this).val() === '') {
              // 刪除陣列中object
              deletethisobject($this);
              $(this).closest('li').remove();
              // 計算剩餘數目
              countitems();
              //隱藏 clear-completed 按鈕
              hideclearcompleted();
              //隱藏 toggle-all 按鈕 & footer
              hidetoggleallfooter();
            } else {
              let $inputval = $(this).val();
              // 更改代辦事項
              $(this).prev().find('label').text($(this).val());
              $(this).prev().find('label').attr('value',$(this).val());
              $(this).closest('li').removeClass('editing');
              // 更換object中_text值
              changethisobjecttext($this,$inputval);
            }
          })
          // 完成項目
          newChild.find('.toggle').on('click', function() {
            let $this = this;
            // 取消完成
            $(this).closest('li').removeClass('completed');
            // 更改 object中_completed 為不確定
            changethisobjectfalse($this);
            // 刪除待辦事項
            $(this).closest('li').remove();
            //隱藏 clear-completed 按鈕
            hideclearcompleted();
            // 計算剩餘數目
            countitems();
            //取消勾選 toggle-all 按鈕
            toggleallfalse();
            //隱藏 toggle-all 按鈕
            togglealltrue();
          })
        }
      } else if (completeditems === todolist.length) {
        // 取消全選
        $todolist.find('input[type="checkbox"]').prop('checked', false);
        $todolist.find('li').removeClass('completed');
        $toggleall.prop('checked', false);
        // 更改 object中_completed 全部為不確定
        changeobjectfalse();
        // 隱藏清除選取按鈕
        $footerbutton.addClass('displaynone');
        $todolist.find('li').remove();
        // 隱藏 taggle-all 按鈕
        $mainlabel.addClass('displaynone');
        // 計算剩餘數目
        countitems();
      }
    }
  })
  // 刪除完成項目
  $clearcompleted.on('click', function() {
    // 刪除陣列中compeleted object
    deletecompeletedobject();
    $todolist.find('.completed').remove();
    // 隱藏清除選取按鈕
    $footerbutton.addClass('displaynone');
    if ($todolist.find('li').length === 0) {
      // 取消 toggle-all 選取
      $toggleall.prop('checked', false);
      // 隱藏footer
      $footer.addClass('displaynone');
      // 隱藏 toggle-all 按鈕
      $mainlabel.addClass('displaynone');
      // 隱藏 clear completed 按鈕
      $footerbutton.addClass('displaynone');
      window.location.hash = '#/';
    }
  })
})


// 轉換標籤
window.addEventListener('hashchange', function() {
  if (location.hash === '#/active') {
    $active.addClass('selected')
    $completed.removeClass('selected')
    $all.removeClass('selected')
    $todolist.find('li').remove();
    $toggleall.prop('checked', false);
    $mainlabel.addClass('displaynone');
    $footerbutton.addClass('displaynone');
    for(let i=0; i < todolist.length; i++) {
      if (todolist[i]._completed === true) {
        $footerbutton.removeClass('displaynone');
      }
      else if (todolist[i]._completed === false) {
        const newChild = $(`
          <li id=${todolist[i]._id}>
            <div class="view">
              <input class="toggle" type="checkbox">
              <label>${todolist[i]._text}</label>
              <button class="destroy"></button>
            </div>
            <input class="edit" value="${todolist[i]._text}">
          </li>`)
        $todolist.append(newChild);
        // 顯示 toggle-all 按鈕
        if($todolist.find('li').length != 0) {
          $mainlabel.removeClass('displaynone');
        }
        // 刪除項目
        newChild.find('.destroy').on('click', function() {
          // 刪除陣列中object
          let $this = this;
          deletethisobject($this);
          $(this).closest('li').remove();
          // 計算剩餘數目
          countitems();
          //隱藏 clear-completed 按鈕
          hideclearcompleted();
          //隱藏 toggle-all 按鈕
          togglealltrue();
          // 全部刪除
          if ( todolist.length === 0) {
            window.location.hash = '#/';
            $footer.addClass('displaynone');
          }
        })
        // 編輯項目
        newChild.find('label').on('dblclick', function() {
          let $input = $(this).closest('li').addClass('editing').find('.edit');
          let $this = this;
          $input.focus();
          $input.keyup(e => {
            if (e.which === 13) {
              if($input.val() === ''){
                // 刪除陣列中object
                deletethisobject($this);
                $(this).closest('li').remove();
                // 計算剩餘數目
                countitems();
                //隱藏 clear-completed 按鈕
                hideclearcompleted();
                //隱藏 toggle-all 按鈕
                togglealltrue();
                // 全部刪除
                if ( todolist.length === 0) {
                  window.location.hash = '#/';
                  $footer.addClass('displaynone');
                }
              } else {
                let $inputval = $input.val();
                $(this).text($inputval);
                $input.attr('value', $inputval);
                // 更換object中_text值
                changethisobjecttext($this,$inputval);
                $input.blur();
                $(this).closest('li').removeClass('editing');
              }
            }
            if(e.which === 27) {
              // 還原待辦事項
              $input.val($input.attr('value'));
              $input.blur();
              $(this).closest('li').removeClass('editing');
            }
          })
        })
        //點擊編輯區域外
        newChild.find('.edit').blur(function() {
          let $this = this;
          if($(this).val() === '') {
            // 刪除陣列中object
            deletethisobject($this);
            $(this).closest('li').remove();
            // 計算剩餘數目
            countitems();
            //隱藏 clear-completed 按鈕
            hideclearcompleted();
            //隱藏 toggle-all 按鈕
            togglealltrue();
            // 全部刪除
            if ( todolist.length === 0) {
              window.location.hash = '#/';
              $footer.addClass('displaynone');
            }
          } else {
            let $inputval = $(this).val();
            // 更改代辦事項
            $(this).prev().find('label').text($(this).val());
            $(this).prev().find('label').attr('value',$(this).val());
            $(this).closest('li').removeClass('editing');
            // 更換object中_text值
            changethisobjecttext($this,$inputval);
          }
        })
        // 完成項目
        newChild.find('.toggle').on('click', function() {
          let $this = this;
          // 更改 object中_completed 為確定
          changethisobjecttrue($this);
          // 出現 clear completed 按鈕
          $('footer button').removeClass('displaynone');
          // 刪除待辦事項
          $(this).closest('li').remove();
          // 計算剩餘數目
          countitems();
          //隱藏 toggle-all 按鈕
          togglealltrue();
        })
      }
    }
  }
  // 選擇完成
  if (location.hash === '#/completed') {
    $completed.addClass('selected')
    $active.removeClass('selected')
    $all.removeClass('selected')
    $todolist.find('li').remove();
    $toggleall.prop('checked', false);
    $mainlabel.addClass('displaynone');
    $footerbutton.addClass('displaynone');
    for(let i=0; i < todolist.length; i++) {
      if (todolist[i]._completed === true) {
        const newChild = $(`
          <li id=${todolist[i]._id}>
              <div class="view">
                <input class="toggle" type="checkbox">
                <label>${todolist[i]._text}</label>
                <button class="destroy"></button>
              </div>
            <input class="edit" value="${todolist[i]._text}">
          </li>`)
        $todolist.append(newChild);
        // 顯示 toggle-all 按鈕
        if($todolist.find('li').length != 0) {
          $mainlabel.removeClass('displaynone');
          // 出現 clear completed 按鈕
          $footerbutton.removeClass('displaynone');
        }
        // 全選
        $todolist.find('input[type="checkbox"]').prop('checked', true)
        $todolist.find('li').addClass('completed');
        // 勾選 toggle-all 按鈕
        for(let i=0; i < todolist.length; i++) {
          if (todolist[i]._completed != true) {
            $toggleall.prop('checked', false);
          }
        }
        // 計算剩餘數目
        countitems();
        // 刪除項目
        newChild.find('.destroy').on('click', function() {
          // 刪除陣列中object
          let $this = this;
          deletethisobject($this);
          $(this).closest('li').remove();
          // 計算剩餘數目
          countitems();
          //隱藏 clear-completed 按鈕
          hideclearcompleted();
          //隱藏 toggle-all 按鈕
          togglealltrue();
          if ( todolist.length === 0) {
            window.location.hash = '#/';
            $footer.addClass('displaynone');
          }
        })
        // 編輯項目
        newChild.find('label').on('dblclick', function() {
          let $input = $(this).closest('li').addClass('editing').find('.edit');
          let $this = this;
          $input.focus();
          $input.keyup(e => {
            if (e.which === 13) {
              if($input.val() === ''){
                // 刪除陣列中object
                deletethisobject($this);
                $(this).closest('li').remove();
                // 計算剩餘數目
                countitems();
                //隱藏 clear-completed 按鈕
                hideclearcompleted();
                //隱藏 toggle-all 按鈕
                togglealltrue();
                // 全部刪除
                if ( todolist.length === 0) {
                  window.location.hash = '#/';
                  $footer.addClass('displaynone');
                }
              } else {
                let $inputval = $input.val();
                $(this).text($inputval);
                $input.attr('value', $inputval);
                // 更換object中_text值
                changethisobjecttext($this,$inputval);
                $input.blur();
                $(this).closest('li').removeClass('editing');
              }
            }
            if(e.which === 27) {
              // 還原待辦事項
              $input.val($input.attr('value'));
              $input.blur();
              $(this).closest('li').removeClass('editing');
            }
          })
        })
        //點擊編輯區域外
        newChild.find('.edit').blur(function() {
          let $this = this;
          if($(this).val() === '') {
            // 刪除陣列中object
            deletethisobject($this);
            $(this).closest('li').remove();
            // 計算剩餘數目
            countitems();
            //隱藏 clear-completed 按鈕
            hideclearcompleted();
            //隱藏 toggle-all 按鈕
            togglealltrue();
            // 全部刪除
            if ( todolist.length === 0) {
              window.location.hash = '#/';
              $footer.addClass('displaynone');
            }
          } else {
            let $inputval = $(this).val();
            // 更改代辦事項
            $(this).prev().find('label').text($(this).val());
            $(this).prev().find('label').attr('value',$(this).val());
            $(this).closest('li').removeClass('editing');
            // 更換object中_text值
            changethisobjecttext($this,$inputval);
          }
        })
        // 完成項目
        newChild.find('.toggle').on('click', function() {
          if ($(this).closest('li').hasClass('completed')) {
            let $this = this;
            // 取消完成
            $(this).closest('li').removeClass('completed');
            // 更改 object中_completed 為不確定
            changethisobjectfalse($this);
            // 刪除待辦事項
            $(this).closest('li').remove();
            //隱藏 clear-completed 按鈕
            hideclearcompleted();
            // 計算剩餘數目
            countitems();
            //取消勾選 toggle-all 按鈕
            toggleallfalse();
            //隱藏 toggle-all 按鈕
            togglealltrue();
          }
        })
      }
    }
  }
  // 選擇全部
  if (location.hash === '#/') {
    $all.addClass('selected')
    $active.removeClass('selected')
    $completed.removeClass('selected')
    $todolist.find('li').remove();
    $mainlabel.addClass('displaynone');
    $footerbutton.addClass('displaynone');
    for(let i=0; i < todolist.length; i++) {
      const newChild = $(`
        <li id=${todolist[i]._id}>
          <div class="view">
            <input class="toggle" type="checkbox">
            <label>${todolist[i]._text}</label>
            <button class="destroy"></button>
          </div>
          <input class="edit" value="${todolist[i]._text}">
        </li>`)
      if (todolist[i]._completed === true) {
        newChild.closest('li').addClass('completed');
        newChild.find('input').prop('checked', true);
        $footerbutton.removeClass('displaynone');
      }
      $mainlabel.removeClass('displaynone');
      $todolist.append(newChild);
      //取消勾選 toggle-all 按鈕
      toggleallfalse();
      //勾選 toggle-all 按鈕
      togglealltrue();
      // 計算剩餘數目
      countitems();
      // 刪除項目
      newChild.find('.destroy').on('click', function() {
        // 刪除陣列中object
        let $this = this;
        deletethisobject($this);
        $(this).closest('li').remove();
        // 計算剩餘數目
        countitems();
        //隱藏 clear-completed 按鈕
        hideclearcompleted();
        //隱藏 toggle-all 按鈕 & footer
        hidetoggleallfooter();
      })
      // 編輯項目
      newChild.find('label').on('dblclick', function() {
        let $input = $(this).closest('li').addClass('editing').find('.edit');
        let $this = this;
        $input.focus();
        $input.keyup(e => {
          if (e.which === 13) {
            if($input.val() === ''){
              // 刪除陣列中object
              deletethisobject($this);
              $(this).closest('li').remove();
              // 計算剩餘數目
              countitems();
              //隱藏 clear-completed 按鈕
              hideclearcompleted();
              //隱藏 toggle-all 按鈕 & footer
              hidetoggleallfooter();
            } else {
              let $inputval = $input.val();
              $(this).text($inputval);
              $input.attr('value', $inputval);
              // 更換object中_text值
              changethisobjecttext($this,$inputval);
              $input.blur();
              $(this).closest('li').removeClass('editing');
            }
          }
          if(e.which === 27) {
            // 還原待辦事項
            $input.val($input.attr('value'));
            $input.blur();
            $(this).closest('li').removeClass('editing');
          }
        })
      })
      //點擊編輯區域外
      newChild.find('.edit').blur(function() {
        let $this = this;
        if($(this).val() === '') {
          // 刪除陣列中object
          deletethisobject($this);
          $(this).closest('li').remove();
          // 計算剩餘數目
          countitems();
          //隱藏 clear-completed 按鈕
          hideclearcompleted();
          //隱藏 toggle-all 按鈕 & footer
          hidetoggleallfooter();
        } else {
          let $inputval = $(this).val();
          // 更改代辦事項
          $(this).prev().find('label').text($(this).val());
          $(this).prev().find('label').attr('value',$(this).val());
          $(this).closest('li').removeClass('editing');
          // 更換object中_text值
          changethisobjecttext($this,$inputval);
        }
      })
      // 完成項目
      newChild.find('.toggle').on('click', function() {
        let $this = this;
        if ($(this).closest('li').hasClass('completed')) {
          // 取消完成
          $(this).closest('li').removeClass('completed');
          // 更改 object中_completed 為不確定
          changethisobjectfalse($this);
          //隱藏 clear-completed 按鈕
          hideclearcompleted();
          // 計算剩餘數目
          countitems();
          //取消勾選 toggle-all 按鈕
          toggleallfalse();
        } else {
          // 已完成
          $(this).closest('li').addClass('completed');
          // 更改 object中_completed 為確定
          changethisobjecttrue($this);
          // 出現 clear completed 按鈕
          $footerbutton.removeClass('displaynone');
          // 計算剩餘數目
          countitems();
          //勾選 toggle-all 按鈕
          togglealltrue();
        }
      })
    }
  }
})
