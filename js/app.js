const $newtodo = $('.new-todo')
const $footer = $('footer')
let todolist = [];
let i = 1;
// 增加代辦事項
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
        $footer.removeClass('displaynone');
        // 新增物件進入陣列
        todolist.push({_text:value, _completed:false,_id:i});
        i++;
        if (location.hash != '#/completed') {
          $('.todo-list').append(newChild);
          $('.main label').removeClass('displaynone');
        }
        // 計算剩餘數目
        let activeitems = 0;
        for (let i = 0; i < todolist.length; i++) {
          if (todolist[i]._completed === false) {
            activeitems++;
            // 取消 toggle-all 按鈕
            $('#toggle-all').prop('checked', false);
          }
          $('strong').text(activeitems);
        }
        // 刪除項目
        newChild.find('.destroy').on('click', function(e) {
          // 刪除陣列中object
          for (let i = 0; i<todolist.length; i++) {
            if (todolist[i]._id == $(this).parents('li').attr('id')) {
              todolist.splice(i,1);
            }
          }
          $(this).closest('li').remove();
          // 計算剩餘數目
          let activeitems = 0;
          for (let i = 0; i < todolist.length; i++) {
            if (todolist[i]._completed === false) {
              activeitems++;
            }
            $('strong').text(activeitems);
          }
          // 隱藏清除選取按鈕
          if ($('.todo-list').find('.completed').length === 0) {
            $('footer button').addClass('displaynone');
          }
            if($('.todo-list').find('li').length === 0) {
              // 取消 toggle-all 按鈕
              $('#toggle-all').prop('checked', false);
              // 隱藏 footer
              $('footer').addClass('displaynone');
              // 隱藏 taggle-all 按鈕
              $('.main label').addClass('displaynone');
            }
          })
          // 編輯項目
          newChild.find('label').on('dblclick', function() {
            var $input = $(this).closest('li').addClass('editing').find('.edit');
            $input.focus();
            $input.keyup(e => {
              if (e.which === 13) {
                $(this).text($input.val());
                $input.attr('value', $input.val());
                if($input.val() === ''){
                  // 刪除陣列中object
                  for (let i = 0; i<todolist.length; i++) {
                    if (todolist[i]._id == $(this).parents('li').attr('id')) {
                      todolist.splice(i,1);
                    }
                  }
                  $(this).closest('li').remove();
                  // 計算剩餘數目
                  let activeitems = 0;
                  for (let i = 0; i < todolist.length; i++) {
                    if (todolist[i]._completed === false) {
                      activeitems++;
                    }
                    $('strong').text(activeitems);
                  }
                  // 隱藏清除選取按鈕
                  if ($('.todo-list').find('.completed').length === 0) {
                    $('footer button').addClass('displaynone');
                  }
                  // taggle-all 按鈕取消
                  if ($('.todo-list').find('li').length === 0) {
                    // 取消 toggle-all 按鈕
                    $('#toggle-all').prop('checked', false);
                    // 隱藏 footer
                    $('footer').addClass('displaynone');
                    // 隱藏 taggle-all 按鈕
                    $('.main label').addClass('displaynone');
                  }
                }
                $input.blur();
                $(this).closest('li').removeClass('editing');
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
            // 更改代辦事項
            $(this).prev().find('label').text($(this).val());
            $(this).prev().find('label').attr('value',$(this).val());
            $(this).closest('li').removeClass('editing');
            if($(this).val() === '') {
              // 刪除陣列中object
              for (let i = 0; i<todolist.length; i++) {
                if (todolist[i]._id == $(this).parents('li').attr('id')) {
                  todolist.splice(i,1);
                }
              }
              // 刪除待辦事項
              $(this).closest('li').remove();
              // 計算剩餘數目
              let activeitems = 0;
              for (let i = 0; i < todolist.length; i++) {
                if (todolist[i]._completed === false) {
                  activeitems++;
                }
                $('strong').text(activeitems);
              }
              // 隱藏清除選取按鈕
              if($('.todo-list').find('.completed').length === 0) {
                $('footer button').addClass('displaynone');
              }
              if($('.todo-list').find('li').length === 0) {
                // 取消 taggle-all 按鈕
                $('#toggle-all').prop('checked', false);
                // 隱藏 footer
                $('footer').addClass('displaynone');
                // 隱藏 taggle-all 按鈕
                $('.main label').addClass('displaynone');
              }
            }
          })
          // 完成項目
          newChild.find('.toggle').on('click', function(e) {
            if ($(this).closest('li').hasClass('completed')) {
              // 取消完成
              $(this).closest('li').removeClass('completed');
              // 更改 object中_completed 為不確定
              for (let i = 0; i<todolist.length; i++) {
                if (todolist[i]._id == $(this).parents('li').attr('id')) {
                  todolist[i]._completed = false;
                }
              }
              // 隱藏 clear completed 按鈕
              if ($('.todo-list').find('.completed').length === 0) {
                $('footer button').addClass('displaynone');
              }
              // 計算剩餘數目
              let activeitems = 0;
              for (let i = 0; i < todolist.length; i++) {
                if (todolist[i]._completed === false) {
                  activeitems++;
                }
                $('strong').text(activeitems);
              }
              //取消 toggle-all
              if ($('.todo-list').find('.completed').length != $('.todo-list').find('li').length) {
                $('#toggle-all').prop('checked', false)
              }
            } else {
              // 已完成
              $(this).closest('li').addClass('completed');
              // 更改 object中_completed 為確定
              for (let i = 0; i<todolist.length; i++) {
                if (todolist[i]._id == $(this).parents('li').attr('id')) {
                  todolist[i]._completed = true;
                }
              }
              // 出現 clear completed 按鈕
              $('footer button').removeClass('displaynone');
              // 計算剩餘數目
              let activeitems = 0;
              for (let i = 0; i < todolist.length; i++) {
                if (todolist[i]._completed === false) {
                  activeitems++;
                }
                $('strong').text(activeitems);
              }
              //勾選 toggle-all 按鈕
              if ($('.todo-list').find('.completed').length === $('.todo-list').find('li').length) {
                $('#toggle-all').prop('checked', true)
              }
            }
          })
        }
      }
    })
    // 全選項目
    $('#toggle-all').on('click', function() {
      if (location.hash != '#/completed') {
        // 取消全選
        if ($('.todo-list').find('.completed').length === $('.todo-list').find('li').length) {
          // 更改object中_completed為不確定
          for(let i=0; i < todolist.length; i++) {
            todolist[i]._completed = false;
          }
          $('.todo-list').find('li').removeClass('completed');
          // 取消 toggle-all 選取
          $('#toggle-all').prop('checked', false)
          // 取消已完成
          $('.todo-list').find('input[type="checkbox"]').prop('checked', false)
          // 隱藏清除選取按鈕
          $('footer button').addClass('displaynone');
          // 計算剩餘數目
          let activeitems = 0;
          for (let i = 0; i < todolist.length; i++) {
            if (todolist[i]._completed === false) {
              activeitems++;
            }
            $('strong').text(activeitems);
          }
        } else {
          // 全選
          $('.todo-list').find('input[type="checkbox"]').prop('checked', true)
          $('.todo-list').find('li').addClass('completed');
          $('#toggle-all').prop('checked', true);
          // 更改object中_completed為確定
          for(let i=0; i < todolist.length; i++) {
            todolist[i]._completed = true;
          }
          // 出現清除選取按鈕
          $('footer button').removeClass('displaynone');
          // 計算剩餘數目
          let activeitems = 0;
          for (let i = 0; i < todolist.length; i++) {
            if (todolist[i]._completed === false) {
              activeitems++;
            }
            $('strong').text(activeitems);
          }
          if (location.hash === '#/active') {
            // 刪除待辦事項
            $('.todo-list').find('.completed').remove();
            if ($('.todo-list').find('li').length === 0) {
              // 取消 toggle-all 選取
              $('#toggle-all').prop('checked', false);
              // 隱藏 toggle-all 按鈕
              $('.main label').addClass('displaynone');
              // 隱藏 clear completed 按鈕
              $('footer button').addClass('displaynone');
            }
            // 計算剩餘數目
            let activeitems = 0;
            for (let i = 0; i < todolist.length; i++) {
              if (todolist[i]._completed === false) {
                activeitems++;
              }
              $('strong').text(activeitems);
            }
          }
        }
      } if (location.hash === '#/completed') {
        // 全選
        let completeditems = 0;
        for(let i=0; i < todolist.length; i++) {
          if (todolist[i]._completed === true) {
            completeditems++;
          }
        }
        if (completeditems != todolist.length) {
          console.log('yes');
          $('.todo-list').find('li').remove();
          // 取消選取 toggle-all 按鈕
          $('#toggle-all').prop('checked', true);
          for(let i=0; i < todolist.length; i++) {
            todolist[i]._completed = true;
          }
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
                </li>
              `)
              $('.todo-list').append(newChild);
              $('footer').removeClass('displaynone');
              $('.main label').removeClass('displaynone');
              // 全選
              $('.todo-list').find('input[type="checkbox"]').prop('checked', true)
              $('.todo-list').find('li').addClass('completed');
              // 勾選 toggle-all 按鈕
              if ($('.todo-list').find('.completed').length === $('.todo-list').find('li').length) {
                $('#toggle-all').prop('checked', true);
              }
              if ($('.todo-list').find('li').length != 0) {
                // 顯示 toggle-all 按鈕
                $('.main label').removeClass('displaynone');
              }
              // 顯示清除選取按鈕
              if ($('.todo-list').find('.completed').length != 0) {
                $('footer button').removeClass('displaynone');
              }
              // 計算剩餘數目
              let activeitems = 0;
              for (let i = 0; i < todolist.length; i++) {
                if (todolist[i]._completed === false) {
                  activeitems++;
                }
                $('strong').text(activeitems);
              }
              // 刪除項目
              newChild.find('.destroy').on('click', function(e) {
                // 刪除陣列中object
                for (let i = 0; i<todolist.length; i++) {
                  if (todolist[i]._id == $(this).parents('li').attr('id')) {
                    todolist.splice(i,1);
                  }
                }
                $(this).closest('li').remove();
                // 計算剩餘數目
                let activeitems = 0;
                for (let i = 0; i < todolist.length; i++) {
                  if (todolist[i]._completed === false) {
                    activeitems++;
                  }
                  $('strong').text(activeitems);
                }
                // 隱藏清除選取按鈕
                if ($('.todo-list').find('.completed').length === 0) {
                  $('footer button').addClass('displaynone');
                }
                if($('.todo-list').find('li').length === 0) {
                  $('#toggle-all').prop('checked', false);
                  // 隱藏footer
                  $('footer').addClass('displaynone');
                  // 隱藏 toggle-all 按鈕
                  $('.main label').addClass('displaynone');
                }
              })
              // 編輯項目
              newChild.find('label').on('dblclick', function() {
                var $input = $(this).closest('li').addClass('editing').find('.edit');
                $input.focus();
                $input.keyup(e => {
                  if (e.which === 13) {
                    $(this).text($input.val());
                    $input.attr('value', $input.val());
                    if($input.val() === ''){
                      // 刪除陣列中object
                      for (let i = 0; i<todolist.length; i++) {
                        if (todolist[i]._id == $(this).parents('li').attr('id')) {
                          todolist.splice(i,1);
                        }
                      }
                      $(this).closest('li').remove();
                      // 計算剩餘數目
                      let activeitems = 0;
                      for (let i = 0; i < todolist.length; i++) {
                        if (todolist[i]._completed === false) {
                          activeitems++;
                        }
                        $('strong').text(activeitems);
                      }
                      // 隱藏清除選取按鈕
                      if ($('.todo-list').find('.completed').length === 0) {
                        $('footer button').addClass('displaynone');
                      }
                      // taggle-all 按鈕取消
                      if ($('.todo-list').find('li').length === 0) {
                        $('#toggle-all').prop('checked', false);
                        // 隱藏footer
                        $('footer').addClass('displaynone');
                        // 隱藏 toggle-all 按鈕
                        $('.main label').addClass('displaynone');
                      }
                    }
                    $input.blur();
                    $(this).closest('li').removeClass('editing');
                  }
                  if(e.which === 27) {
                    $input.val($input.attr('value'));
                    $input.blur();
                    $(this).closest('li').removeClass('editing');
                  }
                })
              })
              //點擊編輯區域外
              newChild.find('.edit').blur(function() {
                $(this).prev().find('label').text($(this).val());
                $(this).prev().find('label').attr('value',$(this).val());
                $(this).closest('li').removeClass('editing');
                if($(this).val() === '') {
                  // 刪除陣列中object
                  for (let i = 0; i<todolist.length; i++) {
                    if (todolist[i]._id == $(this).parents('li').attr('id')) {
                      todolist.splice(i,1);
                    }
                  }
                  // 刪除待辦事項
                  $(this).closest('li').remove();
                  // 計算剩餘數目
                  let activeitems = 0;
                  for (let i = 0; i < todolist.length; i++) {
                    if (todolist[i]._completed === false) {
                      activeitems++;
                    }
                    $('strong').text(activeitems);
                  }
                  // 隱藏清除選取按鈕
                  if($('.todo-list').find('.completed').length === 0) {
                    $('footer button').addClass('displaynone');
                  }
                  // taggle-all 按鈕取消
                  if($('.todo-list').find('li').length === 0) {
                    $('#toggle-all').prop('checked', false);
                    // 隱藏footer
                    $('footer').addClass('displaynone');
                    // 隱藏 toggle-all 按鈕
                    $('.main label').addClass('displaynone');
                  }
                }
              })
              // 完成項目
              newChild.find('.toggle').on('click', function(e) {
                if ($(this).closest('li').hasClass('completed')) {
                  // 取消完成
                  $(this).closest('li').removeClass('completed');
                  // 更改object中_completed為不確定
                  for (let i = 0; i<todolist.length; i++) {
                    if (todolist[i]._id == $(this).parents('li').attr('id')) {
                      todolist[i]._completed = false;
                    }
                  }
                  // 隱藏清除選取按鈕
                  if ($('.todo-list').find('.completed').length === 0) {
                    $('footer button').addClass('displaynone');
                  }
                  // 計算剩餘數目
                  let activeitems = 0;
                  for (let i = 0; i < todolist.length; i++) {
                    if (todolist[i]._completed === false) {
                      activeitems++;
                    }
                    $('strong').text(activeitems);
                  }
                  // 取消全選
                  if ($('.todo-list').find('.completed').length != $('.todo-list').find('li').length) {
                    $('#toggle-all').prop('checked', false)
                  }
                  // 刪除待辦事項
                  $(this).closest('li').remove();
                  // 隱藏全選按鈕
                  if ($('.todo-list').find('li').length === 0) {
                    $('.main label').addClass('displaynone');
                  }
                } else {
                  // 已完成
                  $(this).closest('li').addClass('completed');
                  // 更改object中_completed為確定
                  for (let i = 0; i<todolist.length; i++) {
                    if (todolist[i]._id == $(this).parents('li').attr('id')) {
                      todolist[i]._completed = true;
                    }
                  }
                  // 出現清除選取按鈕
                  $('footer button').removeClass('displaynone');
                  // 計算剩餘數目
                  let activeitems = 0;
                  for (let i = 0; i < todolist.length; i++) {
                    if (todolist[i]._completed === false) {
                      activeitems++;
                    }
                    $('strong').text(activeitems);
                  }
                  //全選
                  if ($('.todo-list').find('.completed').length === $('.todo-list').find('li').length) {
                    $('#toggle-all').prop('checked', true)
                  }
                }
              })
            }
          }
        } else if (completeditems === todolist.length) {
          console.log('no');
          // 取消全選
          $('.todo-list').find('input[type="checkbox"]').prop('checked', false)
          $('.todo-list').find('li').removeClass('completed');
          $('#toggle-all').prop('checked', false);
          // 更改object中_completed為不確定
          for(let i=0; i < todolist.length; i++) {
            todolist[i]._completed = false;
          }
          // 隱藏清除選取按鈕
          $('footer button').addClass('displaynone');
          // 計算剩餘數目
          let activeitems = 0;
          for (let i = 0; i < todolist.length; i++) {
            if (todolist[i]._completed === false) {
              activeitems++;
            }
            $('strong').text(activeitems);
          }
          $('.todo-list').find('li').remove();
          // 隱藏 taggle-all 按鈕
          $('.main label').addClass('displaynone');
        }
      }
    })

    // 刪除完成項目
    $('.clear-completed').on('click', function() {
      //刪除陣列中object
      let n =  todolist.length - 1 ;
      for (let i = n; i >= 0; i--) {
        if (todolist[i]._completed === true) {
          todolist.splice(i,1);
        }
      }
      $('.todo-list').find('.completed').remove();
      if ($('.todo-list').find('li').length === 0) {
        // 取消 toggle-all 選取
        $('#toggle-all').prop('checked', false);
        // 隱藏footer
        $('footer').addClass('displaynone');
        // 隱藏 toggle-all 按鈕
        $('.main label').addClass('displaynone');
        // 隱藏 clear completed 按鈕
        $('footer button').addClass('displaynone');
      }
    })
  })


// 轉換標籤
window.addEventListener('hashchange', function() {
  if (location.hash === '#/active') {
    $("[href='#/active']").addClass('selected')
    $("[href='#/completed']").removeClass('selected')
    $("[href='#/']").removeClass('selected')
    $('.todo-list').find('li').remove();
    $('#toggle-all').prop('checked', false);
    $('.main label').addClass('displaynone');
    // 隱藏清除選取按鈕
    $('footer button').addClass('displaynone');
      for(let i=0; i < todolist.length; i++) {
        if (todolist[i]._completed === false) {
          const newChild = $(`
            <li id=${todolist[i]._id}>
                <div class="view">
                  <input class="toggle" type="checkbox">
                  <label>${todolist[i]._text}</label>
                  <button class="destroy"></button>
                </div>
              <input class="edit" value="${todolist[i]._text}">
            </li>
            `)
          $('.todo-list').append(newChild);
          $('footer').removeClass('displaynone');
          // $('.main label').removeClass('displaynone');
          if($('.todo-list').find('li').length != 0) {
            // 顯示 toggle-all 按鈕
            $('.main label').removeClass('displaynone');
          }
          // 刪除項目
          newChild.find('.destroy').on('click', function(e) {
            // 刪除陣列中object
            for (let i = 0; i<todolist.length; i++) {
              if (todolist[i]._id == $(this).parents('li').attr('id')) {
                todolist.splice(i,1);
              }
            }
            $(this).closest('li').remove();
            // 計算剩餘數目
            let activeitems = 0;
            for (let i = 0; i < todolist.length; i++) {
              if (todolist[i]._completed === false) {
                activeitems++;
              }
              $('strong').text(activeitems);
            }
            // 隱藏清除選取按鈕
            if ($('.todo-list').find('.completed').length === 0) {
              $('footer button').addClass('displaynone');
            }
            if($('.todo-list').find('li').length === 0) {
              $('#toggle-all').prop('checked', false);
              // 隱藏footer
              $('footer').addClass('displaynone');
              // 隱藏 toggle-all 按鈕
              $('.main label').addClass('displaynone');
            }
          })
          // 編輯項目
          newChild.find('label').on('dblclick', function() {
            var $input = $(this).closest('li').addClass('editing').find('.edit');
            $input.focus();
            $input.keyup(e => {
              if (e.which === 13) {
                $(this).text($input.val());
                $input.attr('value', $input.val());
                if($input.val() === ''){
                  // 刪除陣列中object
                  for (let i = 0; i<todolist.length; i++) {
                    if (todolist[i]._id == $(this).parents('li').attr('id')) {
                      todolist.splice(i,1);
                    }
                  }
                  $(this).closest('li').remove();
                  // 計算剩餘數目
                  let activeitems = 0;
                  for (let i = 0; i < todolist.length; i++) {
                    if (todolist[i]._completed === false) {
                      activeitems++;
                    }
                    $('strong').text(activeitems);
                  }
                  // 隱藏清除選取按鈕
                  if ($('.todo-list').find('.completed').length === 0) {
                    $('footer button').addClass('displaynone');
                  }
                  // taggle-all 按鈕取消
                  if ($('.todo-list').find('li').length === 0) {
                    $('#toggle-all').prop('checked', false);
                    // 隱藏footer
                    $('footer').addClass('displaynone');
                    // 隱藏 toggle-all 按鈕
                    $('.main label').addClass('displaynone');
                  }
                }
                $input.blur();
                $(this).closest('li').removeClass('editing');
              }
              if(e.which === 27) {
                $input.val($input.attr('value'));
                $input.blur();
                $(this).closest('li').removeClass('editing');
              }
            })
          })
          //點擊編輯區域外
          newChild.find('.edit').blur(function() {
            $(this).prev().find('label').text($(this).val());
            $(this).prev().find('label').attr('value',$(this).val());
            $(this).closest('li').removeClass('editing');
            if($(this).val() === '') {
              // 刪除陣列中object
              for (let i = 0; i<todolist.length; i++) {
                if (todolist[i]._id == $(this).parents('li').attr('id')) {
                  todolist.splice(i,1);
                }
              }
              // 刪除待辦事項
              $(this).closest('li').remove();
              // 計算剩餘數目
              let activeitems = 0;
              for (let i = 0; i < todolist.length; i++) {
                if (todolist[i]._completed === false) {
                  activeitems++;
                }
                $('strong').text(activeitems);
              }
              // 隱藏清除選取按鈕
              if($('.todo-list').find('.completed').length === 0) {
                $('footer button').addClass('displaynone');
              }
              // taggle-all 按鈕取消
              if($('.todo-list').find('li').length === 0) {
                $('#toggle-all').prop('checked', false);
                // 隱藏footer
                $('footer').addClass('displaynone');
                // 隱藏 toggle-all 按鈕
                $('.main label').addClass('displaynone');
              }
            }
          })
          // 完成項目
          newChild.find('.toggle').on('click', function(e) {
            if ($(this).closest('li').hasClass('completed')) {
              // 取消完成
              $(this).closest('li').removeClass('completed');
              // 更改object中_completed為不確定
              for (let i = 0; i<todolist.length; i++) {
                if (todolist[i]._id == $(this).parents('li').attr('id')) {
                  todolist[i]._completed = false;
                }
              }
              // 隱藏清除選取按鈕
              if ($('.todo-list').find('.completed').length === 0) {
                $('footer button').addClass('displaynone');
              }
              // 計算剩餘數目
              $('strong').text($('.todo-list').find('li').length - $('.todo-list').find('.completed').length);
              //取消全選
              if ($('.todo-list').find('.completed').length != $('.todo-list').find('li').length) {
                $('#toggle-all').prop('checked', false)
              }
            } else {
              // 更改object中_completed為確定
              for (let i = 0; i<todolist.length; i++) {
                if (todolist[i]._id == $(this).parents('li').attr('id')) {
                  todolist[i]._completed = true;
                }
              }
              // 刪除待辦事項
              $(this).closest('li').remove();
              // 計算剩餘數目
              let activeitems = 0;
              for (let i = 0; i < todolist.length; i++) {
                if (todolist[i]._completed === false) {
                  activeitems++;
                }
                $('strong').text(activeitems);
              }
              // 隱藏全選按鈕
              if ($('.todo-list').find('li').length === 0) {
                $('.main label').addClass('displaynone');
              }
            }
          })
          // 移除全選
          for(let i=0; i < todolist.length; i++) {
            if (todolist[i]._completed != true) {
              $('#toggle-all').prop('checked', false)
            }
          }
          // 計算剩餘數目
          let activeitems = 0;
          for (let i = 0; i < todolist.length; i++) {
            if (todolist[i]._completed === false) {
              activeitems++;
            }
            $('strong').text(activeitems);
          }
        }
      }
  } // 選擇完成
  if (location.hash === '#/completed') {
    $("[href='#/completed']").addClass('selected')
    $("[href='#/active']").removeClass('selected')
    $("[href='#/']").removeClass('selected')
    $('.todo-list').find('li').remove();
    // 隱藏 toggle-all 按鈕
    $('.main label').addClass('displaynone');
    $('footer button').addClass('displaynone');
    // 勾選 toggle-all 按鈕
    $('#toggle-all').prop('checked', true);
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
          </li>
          `)
        $('.todo-list').append(newChild);
        $('footer').removeClass('displaynone');
        $('.main label').removeClass('displaynone');
        // 全選
        $('.todo-list').find('input[type="checkbox"]').prop('checked', true)
        $('.todo-list').find('li').addClass('completed');
        // 勾選 toggle-all 按鈕
        for(let i=0; i < todolist.length; i++) {
          if (todolist[i]._completed != true) {
            $('#toggle-all').prop('checked', false);
            break;
          }
        }
        if ($('.todo-list').find('li').length != 0) {
          // 顯示 toggle-all 按鈕
          $('.main label').removeClass('displaynone');
        }
        // 顯示清除選取按鈕
        if ($('.todo-list').find('.completed').length != 0) {
          $('footer button').removeClass('displaynone');
        }
        // 計算剩餘數目
        let activeitems = 0;
        for (let i = 0; i < todolist.length; i++) {
          if (todolist[i]._completed === false) {
            activeitems++;
          }
          $('strong').text(activeitems);
        }
        // 刪除項目
        newChild.find('.destroy').on('click', function(e) {
          // 刪除陣列中object
          for (let i = 0; i<todolist.length; i++) {
            if (todolist[i]._id == $(this).parents('li').attr('id')) {
              todolist.splice(i,1);
            }
          }
          $(this).closest('li').remove();
          // 計算剩餘數目
          let activeitems = 0;
          for (let i = 0; i < todolist.length; i++) {
            if (todolist[i]._completed === false) {
              activeitems++;
            }
            $('strong').text(activeitems);
          }
          // 隱藏清除選取按鈕
          if ($('.todo-list').find('.completed').length === 0) {
            $('footer button').addClass('displaynone');
          }
          if($('.todo-list').find('li').length === 0) {
            $('#toggle-all').prop('checked', false);
            // 隱藏footer
            $('footer').addClass('displaynone');
            // 隱藏 toggle-all 按鈕
            $('.main label').addClass('displaynone');
          }
        })
        // 編輯項目
        newChild.find('label').on('dblclick', function() {
          var $input = $(this).closest('li').addClass('editing').find('.edit');
          $input.focus();
          $input.keyup(e => {
            if (e.which === 13) {
              $(this).text($input.val());
              $input.attr('value', $input.val());
              if($input.val() === ''){
                // 刪除陣列中object
                for (let i = 0; i<todolist.length; i++) {
                  if (todolist[i]._id == $(this).parents('li').attr('id')) {
                    todolist.splice(i,1);
                  }
                }
                $(this).closest('li').remove();
                // 計算剩餘數目
                let activeitems = 0;
                for (let i = 0; i < todolist.length; i++) {
                  if (todolist[i]._completed === false) {
                    activeitems++;
                  }
                  $('strong').text(activeitems);
                }
                // 隱藏清除選取按鈕
                if ($('.todo-list').find('.completed').length === 0) {
                  $('footer button').addClass('displaynone');
                }
                // taggle-all 按鈕取消
                if ($('.todo-list').find('li').length === 0) {
                  $('#toggle-all').prop('checked', false);
                  // 隱藏footer
                  $('footer').addClass('displaynone');
                  // 隱藏 toggle-all 按鈕
                  $('.main label').addClass('displaynone');
                }
              }
              $input.blur();
              $(this).closest('li').removeClass('editing');
            }
            if(e.which === 27) {
              $input.val($input.attr('value'));
              $input.blur();
              $(this).closest('li').removeClass('editing');
            }
          })
        })
        //點擊編輯區域外
        newChild.find('.edit').blur(function() {
          $(this).prev().find('label').text($(this).val());
          $(this).prev().find('label').attr('value',$(this).val());
          $(this).closest('li').removeClass('editing');
          if($(this).val() === '') {
            // 刪除陣列中object
            for (let i = 0; i<todolist.length; i++) {
              if (todolist[i]._id == $(this).parents('li').attr('id')) {
                todolist.splice(i,1);
              }
            }
            // 刪除待辦事項
            $(this).closest('li').remove();
            // 計算剩餘數目
            let activeitems = 0;
            for (let i = 0; i < todolist.length; i++) {
              if (todolist[i]._completed === false) {
                activeitems++;
              }
              $('strong').text(activeitems);
            }
            // 隱藏清除選取按鈕
            if($('.todo-list').find('.completed').length === 0) {
              $('footer button').addClass('displaynone');
            }
            // taggle-all 按鈕取消
            if($('.todo-list').find('li').length === 0) {
              $('#toggle-all').prop('checked', false);
              // 隱藏footer
              $('footer').addClass('displaynone');
              // 隱藏 toggle-all 按鈕
              $('.main label').addClass('displaynone');
            }
          }
        })
        // 完成項目
        newChild.find('.toggle').on('click', function(e) {
          if ($(this).closest('li').hasClass('completed')) {
            // 取消完成
            $(this).closest('li').removeClass('completed');
              // 更改object中_completed為不確定
              for (let i = 0; i<todolist.length; i++) {
                if (todolist[i]._id == $(this).parents('li').attr('id')) {
                  todolist[i]._completed = false;
                }
              }
            // 隱藏清除選取按鈕
            if ($('.todo-list').find('.completed').length === 0) {
              $('footer button').addClass('displaynone');
            }
            // 計算剩餘數目
            let activeitems = 0;
            for (let i = 0; i < todolist.length; i++) {
              if (todolist[i]._completed === false) {
                activeitems++;
              }
              $('strong').text(activeitems);
            }
            // 取消全選
            if ($('.todo-list').find('.completed').length != $('.todo-list').find('li').length) {
              $('#toggle-all').prop('checked', false)
            }
            // 刪除待辦事項
            $(this).closest('li').remove();
            // 隱藏全選按鈕
            if ($('.todo-list').find('li').length === 0) {
              $('.main label').addClass('displaynone');
            }
          } else {
            // 已完成
            $(this).closest('li').addClass('completed');
            // 更改object中_completed為確定
            for (let i = 0; i<todolist.length; i++) {
              if (todolist[i]._id == $(this).parents('li').attr('id')) {
                todolist[i]._completed = true;
              }
            }
            // 出現清除選取按鈕
            $('footer button').removeClass('displaynone');
            // 計算剩餘數目
            let activeitems = 0;
            for (let i = 0; i < todolist.length; i++) {
              if (todolist[i]._completed === false) {
                activeitems++;
              }
              $('strong').text(activeitems);
            }
            //全選
            if ($('.todo-list').find('.completed').length === $('.todo-list').find('li').length) {
              $('#toggle-all').prop('checked', true)
            }
          }
        })
        }
      }

  } // 選擇全部
  if (location.hash === '#/') {
    $("[href='#/']").addClass('selected')
    $("[href='#/active']").removeClass('selected')
    $("[href='#/completed']").removeClass('selected')
    $('.todo-list').find('li').remove();
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
        $('footer button').removeClass('displaynone');
      }
      $('.todo-list').append(newChild);
      $('footer').removeClass('displaynone');
      $('.main label').removeClass('displaynone');
      // 全選勾選
      if ($('.todo-list').find('.completed').length != $('.todo-list').find('li').length) {
        $('#toggle-all').prop('checked', false)
      }
      if ($('.todo-list').find('.completed').length === $('.todo-list').find('li').length) {
        $('#toggle-all').prop('checked', true)
      }
      // for(let i=0; i < todolist.length; i++) {
      //   if (todolist[i]._completed === true) {
      //     $('#toggle-all').prop('checked', true);
      //     console.log('T');
      //   } else {
      //     $('#toggle-all').prop('checked', false);
      //     console.log('F');
      //   }
      // }
      // 計算剩餘數目
      $('strong').text($('.todo-list').find('li').length - $('.todo-list').find('.completed').length);
      // 刪除項目
      newChild.find('.destroy').on('click', function(e) {
        // 刪除陣列中object
        for (let i = 0; i<todolist.length; i++) {
          if (todolist[i]._id == $(this).parents('li').attr('id')) {
            todolist.splice(i,1);
          }
        }
        $(this).closest('li').remove();
        // 計算剩餘數目
        let activeitems = 0;
        for (let i = 0; i < todolist.length; i++) {
          if (todolist[i]._completed === false) {
            activeitems++;
          }
          $('strong').text(activeitems);
        }
        // 隱藏清除選取按鈕
        if ($('.todo-list').find('.completed').length === 0) {
          $('footer button').addClass('displaynone');
        }
        if($('.todo-list').find('li').length === 0) {
          $('#toggle-all').prop('checked', false);
          // 隱藏footer
          $('footer').addClass('displaynone');
          // 隱藏 toggle-all 按鈕
          $('.main label').addClass('displaynone');
        }
      })
      // 編輯項目
      newChild.find('label').on('dblclick', function() {
        var $input = $(this).closest('li').addClass('editing').find('.edit');
        $input.focus();
        $input.keyup(e => {
          if (e.which === 13) {
            $(this).text($input.val());
            $input.attr('value', $input.val());
            if($input.val() === ''){
              // 刪除陣列中object
              for (let i = 0; i<todolist.length; i++) {
                if (todolist[i]._id == $(this).parents('li').attr('id')) {
                  todolist.splice(i,1);
                }
              }
              $(this).closest('li').remove();
              // 計算剩餘數目
              let activeitems = 0;
              for (let i = 0; i < todolist.length; i++) {
                if (todolist[i]._completed === false) {
                  activeitems++;
                }
                $('strong').text(activeitems);
              }
              // 隱藏清除選取按鈕
              if ($('.todo-list').find('.completed').length === 0) {
                $('footer button').addClass('displaynone');
              }
              // taggle-all 按鈕取消
              if ($('.todo-list').find('li').length === 0) {
                $('#toggle-all').prop('checked', false);
                // 隱藏footer
                $('footer').addClass('displaynone');
                // 隱藏 toggle-all 按鈕
                $('.main label').addClass('displaynone');
              }
            }
            $input.blur();
            $(this).closest('li').removeClass('editing');
          }
          if(e.which === 27) {
            $input.val($input.attr('value'));
            $input.blur();
            $(this).closest('li').removeClass('editing');
          }
        })
      })
      //點擊編輯區域外
      newChild.find('.edit').blur(function() {
        $(this).prev().find('label').text($(this).val());
        $(this).prev().find('label').attr('value',$(this).val());
        $(this).closest('li').removeClass('editing');
        if($(this).val() === '') {
          // 刪除陣列中object
          for (let i = 0; i<todolist.length; i++) {
            if (todolist[i]._id == $(this).parents('li').attr('id')) {
              todolist.splice(i,1);
            }
          }
          // 刪除待辦事項
          $(this).closest('li').remove();
          // 計算剩餘數目
          let activeitems = 0;
          for (let i = 0; i < todolist.length; i++) {
            if (todolist[i]._completed === false) {
              activeitems++;
            }
            $('strong').text(activeitems);
          }
          // 隱藏清除選取按鈕
          if($('.todo-list').find('.completed').length === 0) {
            $('footer button').addClass('displaynone');
          }
          // taggle-all 按鈕取消
          if($('.todo-list').find('li').length === 0) {
            $('#toggle-all').prop('checked', false);
            // 隱藏footer
            $('footer').addClass('displaynone');
            // 隱藏 toggle-all 按鈕
            $('.main label').addClass('displaynone');
          }
        }
      })
      // 完成項目
      newChild.find('.toggle').on('click', function(e) {
        if ($(this).closest('li').hasClass('completed')) {
          // 取消完成
          $(this).closest('li').removeClass('completed');
          // 更改object中_completed為不確定
          for (let i = 0; i<todolist.length; i++) {
            if (todolist[i]._id == $(this).parents('li').attr('id')) {
              todolist[i]._completed = false;
            }
          }
          // 隱藏清除選取按鈕
          if ($('.todo-list').find('.completed').length === 0) {
            $('footer button').addClass('displaynone');
          }
          // 計算剩餘數目
          let activeitems = 0;
          for (let i = 0; i < todolist.length; i++) {
            if (todolist[i]._completed === false) {
              activeitems++;
            }
            $('strong').text(activeitems);
          }
          //取消全選
          if ($('.todo-list').find('.completed').length != $('.todo-list').find('li').length) {
            $('#toggle-all').prop('checked', false)
          }
        } else {
          // 已完成
          $(this).closest('li').addClass('completed');
          // 更改object中_completed為確定
          for (let i = 0; i<todolist.length; i++) {
            if (todolist[i]._id == $(this).parents('li').attr('id')) {
              todolist[i]._completed = true;
            }
          }
          // 出現清除選取按鈕
          $('footer button').removeClass('displaynone');
          // 計算剩餘數目
          let activeitems = 0;
          for (let i = 0; i < todolist.length; i++) {
            if (todolist[i]._completed === false) {
              activeitems++;
            }
            $('strong').text(activeitems);
          }
          //全選
          if ($('.todo-list').find('.completed').length === $('.todo-list').find('li').length) {
            $('#toggle-all').prop('checked', true)
          }
        }
      })
    }
  }
})
