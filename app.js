// Lightweight external script to wire up interactions and avoid inline handlers
(function(){
  function onDocActionClick(e){
    var el = e.target && e.target.closest('[data-action]');
    if (!el) return;
    var action = el.dataset.action;
    if (!action) return;
    e.preventDefault();
    if (e.stopImmediatePropagation) e.stopImmediatePropagation();
    e.stopPropagation();
    try {
      if (action === 'open-modal' && el.dataset.target && typeof window.openModal === 'function') return window.openModal(el.dataset.target);
      if (action === 'close-modal' && el.dataset.target && typeof window.closeModal === 'function') return window.closeModal(el.dataset.target);
      if (action === 'logout' && typeof window.logout === 'function') return window.logout();
      if (action === 'login' && typeof window.login === 'function') return window.login();
      if (action === 'register' && typeof window.register === 'function') return window.register();
      if (action === 'show-register' && typeof window.showRegister === 'function') return window.showRegister();
      if (action === 'show-login' && typeof window.showLogin === 'function') return window.showLogin();
      if (action === 'clear-activity' && typeof window.clearActivity === 'function') return window.clearActivity();
      if (action === 'delete-group' && typeof window.deleteGroup === 'function') return window.deleteGroup();
      if (action === 'open-member' && el.dataset.memberId && typeof window.openMemberView === 'function') return window.openMemberView(el.dataset.memberId);
      if (action === 'back-to-group' && typeof window.backToGroupView === 'function') return window.backToGroupView();
      if (action === 'open-member-task-modal') {
        var mid = el.dataset.memberId || (typeof window.currentMemberId !== 'undefined' ? window.currentMemberId : null);
        if (mid && typeof window.openTaskModal === 'function') return window.openTaskModal(mid);
      }
      if (action === 'edit-task' && typeof window.editTask === 'function') return window.editTask(el.dataset.memberId, el.dataset.taskId);
      if (action === 'toggle-task' && typeof window.toggleTask === 'function') return window.toggleTask(el.dataset.memberId, el.dataset.taskId);
      if (action === 'delete-task' && typeof window.deleteTask === 'function') return window.deleteTask(el.dataset.memberId, el.dataset.taskId);
      if (action === 'edit-group') {
        var name = el.dataset.groupName || '';
        var desc = el.dataset.groupDescription || '';
        var nameEl = document.getElementById('editGroupName');
        var descEl = document.getElementById('editGroupDescription');
        if (nameEl) nameEl.value = name;
        if (descEl) descEl.value = desc;
        if (typeof window.openModal === 'function') return window.openModal('editGroupModal');
      }
    } catch (err) {
      console && console.error && console.error('Action failed', action, err);
    }
  }

  function delegateMembersGrid(){
    var grid = document.getElementById('membersGrid');
    if (!grid) return;
    if (grid.__delegated) return; // avoid duplicate listeners
    grid.__delegated = true;
    grid.addEventListener('click', function(e){
      var btn = e.target && e.target.closest('button');
      if (!btn || !grid.contains(btn)) return;
      var action = btn.dataset && btn.dataset.action;
      if (!action) return;
      e.preventDefault();
      if (e.stopImmediatePropagation) e.stopImmediatePropagation();
      e.stopPropagation();
      var mid = btn.dataset.memberId;
      var tid = btn.dataset.taskId;
      try {
        if (action === 'add-task' && typeof window.openTaskModal === 'function') return window.openTaskModal(mid);
        if (action === 'remove-member' && typeof window.removeMember === 'function') return window.removeMember(mid);
        if (action === 'edit-task' && typeof window.editTask === 'function') return window.editTask(mid, tid);
        if (action === 'toggle-task' && typeof window.toggleTask === 'function') return window.toggleTask(mid, tid);
        if (action === 'delete-task' && typeof window.deleteTask === 'function') return window.deleteTask(mid, tid);
      } catch (err) {
        if (window.console && console.error) console.error('Action failed', action, err);
      }
    }, true);
  }

  function ensureInit(){
    // If the page exposes init, rely on it; otherwise, at least set up delegation
    try { delegateMembersGrid(); } catch(e){}
    try {
      var gl = document.getElementById('groupsList');
      if (gl && !gl.__delegated) {
        gl.__delegated = true;
        gl.addEventListener('click', function(e){
          var btn = e.target && e.target.closest('button');
          if (!btn || !gl.contains(btn)) return;
          var action = btn.dataset && btn.dataset.action;
          if (action !== 'edit-group') return;
          e.preventDefault();
          if (e.stopImmediatePropagation) e.stopImmediatePropagation();
          e.stopPropagation();
          var name = btn.dataset.groupName || '';
          var desc = btn.dataset.groupDescription || '';
          var nameEl = document.getElementById('editGroupName');
          var descEl = document.getElementById('editGroupDescription');
          if (nameEl) nameEl.value = name;
          if (descEl) descEl.value = desc;
          if (typeof window.openModal === 'function') window.openModal('editGroupModal');
        }, true);
      }
    } catch(e){}
    try {
      document.addEventListener('click', onDocActionClick, true);
    } catch(e){}
    try {
      var f1 = document.getElementById('createGroupForm');
      if (f1 && !f1.__bound) { f1.__bound = true; f1.addEventListener('submit', function(e){ if (typeof window.createGroup==='function') window.createGroup(e); }); }
      var f2 = document.getElementById('editGroupForm');
      if (f2 && !f2.__bound) { f2.__bound = true; f2.addEventListener('submit', function(e){ if (typeof window.updateGroup==='function') window.updateGroup(e); }); }
      var f3 = document.getElementById('addMemberForm');
      if (f3 && !f3.__bound) { f3.__bound = true; f3.addEventListener('submit', function(e){ if (typeof window.addMember==='function') window.addMember(e); }); }
      var f4 = document.getElementById('taskForm');
      if (f4 && !f4.__bound) { f4.__bound = true; f4.addEventListener('submit', function(e){ if (typeof window.addTask==='function') window.addTask(e); }); }
    } catch(e){}
  }

  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(ensureInit, 0);
  } else {
    window.addEventListener('DOMContentLoaded', ensureInit);
    window.addEventListener('load', ensureInit);
  }
})();
