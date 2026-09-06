
const state = {
  page: "home",
  lang: localStorage.getItem("bb-lang") || "en",
  checkedIn: JSON.parse(localStorage.getItem("bb-checked") || "false"),
  buddyDone: JSON.parse(localStorage.getItem("bb-buddy") || "false"),
  goal: 2,
  selectedTheme: "lavender",
  messages: [
    {from:"buddy", text:{en:"I still haven't worked out 😭", zh:"我还没有运动😭", "zh-TW":"我還沒有運動😭"}},
    {from:"me", text:{en:"Go go go! I'm waiting 🔥", zh:"冲冲冲！我等你🔥", "zh-TW":"衝衝衝！我等你🔥"}}
  ]
};

const T = {
  en:{
    home:"Home",workout:"Workout",buddy:"Buddy",me:"Me",good:"Good morning",ready:"Ready to burn?",
    today:"Today's Burn",glutes:"Glutes & Legs",min:"30 min",start:"Start Workout",week:"Your Week",
    buddyTitle:"Your Buddy",done:"Done",pending:"Not yet",encourage:"Encourage Buddy",double:"Double Burn!",
    videos:"Recommended Videos",chat:"Buddy Chat",send:"Send",placeholder:"Send a message…",
    stats:"My Stats",workouts:"Workouts",minutes:"Minutes",streak:"day streak",theme:"Theme",
    preferences:"Workout Preferences",notifications:"Notifications",goal:"Weekly goal",save:"Saved",
    complete:"YOU DID IT!",finished:"Workout completed",notify:"Your Buddy will know 💜",
    plan:"This week",legs:"Legs",core:"Core",rest:"Rest",settings:"Settings",
    lavender:"Lavender",pink:"Soft Pink",blue:"Baby Blue",mint:"Mint"
  },
  zh:{
    home:"首页",workout:"训练",buddy:"搭子",me:"我的",good:"早上好",ready:"准备燃起来了吗？",
    today:"今日训练",glutes:"臀腿训练",min:"30 分钟",start:"开始训练",week:"本周进度",
    buddyTitle:"你的运动搭子",done:"已完成",pending:"还没打卡",encourage:"提醒一下",double:"双人燃烧！",
    videos:"推荐视频",chat:"搭子聊天",send:"发送",placeholder:"输入消息…",
    stats:"我的数据",workouts:"训练次数",minutes:"运动分钟",streak:"天连续打卡",theme:"主题",
    preferences:"训练偏好",notifications:"通知",goal:"每周目标",save:"已保存",
    complete:"完成啦！",finished:"训练已完成",notify:"你的搭子会看到 💜",
    plan:"本周计划",legs:"臀腿",core:"核心",rest:"休息",settings:"设置",
    lavender:"薰衣草紫",pink:"柔粉",blue:"婴儿蓝",mint:"薄荷绿"
  },
  "zh-TW":{
    home:"首頁",workout:"訓練",buddy:"搭子",me:"我的",good:"早安",ready:"準備燃起來了嗎？",
    today:"今日訓練",glutes:"臀腿訓練",min:"30 分鐘",start:"開始訓練",week:"本週進度",
    buddyTitle:"你的運動搭子",done:"已完成",pending:"還沒打卡",encourage:"提醒一下",double:"雙人燃燒！",
    videos:"推薦影片",chat:"搭子聊天",send:"發送",placeholder:"輸入訊息…",
    stats:"我的數據",workouts:"訓練次數",minutes:"運動分鐘",streak:"天連續打卡",theme:"主題",
    preferences:"訓練偏好",notifications:"通知",goal:"每週目標",save:"已儲存",
    complete:"完成啦！",finished:"訓練已完成",notify:"你的搭子會看到 💜",
    plan:"本週計畫",legs:"臀腿",core:"核心",rest:"休息",settings:"設定",
    lavender:"薰衣草紫",pink:"柔粉",blue:"嬰兒藍",mint:"薄荷綠"
  }
};

function tr(k){return T[state.lang][k] || k}
function setLang(l){state.lang=l;localStorage.setItem("bb-lang",l);render()}
function toast(msg){const el=document.createElement("div");el.className="toast";el.textContent=msg;document.body.appendChild(el);setTimeout(()=>el.remove(),1800)}
function checkIn(){
  state.checkedIn=true; localStorage.setItem("bb-checked","true");
  state.page="home"; render(); toast(tr("complete")+" 🔥");
}
function encourage(){toast("💜 "+tr("encourage"))}
function sendMsg(){
  const input=document.querySelector("#msg"); if(!input.value.trim()) return;
  state.messages.push({from:"me",text:{en:input.value,zh:input.value,"zh-TW":input.value}});
  input.value=""; render(); setTimeout(()=>toast("🔥 Buddy notified"),300);
}
function startWorkout(){state.page="workout";render()}
function nav(p){state.page=p;render()}

function navHTML(){
  const items=[["home","⌂",tr("home")],["workout","◉",tr("workout")],["buddy","♡",tr("buddy")],["me","●",tr("me")]];
  return `<nav class="nav">${items.map(([p,i,t])=>`<button class="${state.page===p?'active':''}" onclick="nav('${p}')">${i}&nbsp;&nbsp;${t}</button>`).join("")}</nav>`
}
function mobileNavHTML(){
  const items=[["home","⌂",tr("home")],["workout","◉",tr("workout")],["buddy","♡",tr("buddy")],["me","●",tr("me")]];
  return `<nav class="mobile-nav">${items.map(([p,i,t])=>`<button class="${state.page===p?'active':''}" onclick="nav('${p}')">${i}<br>${t}</button>`).join("")}</nav>`
}

function home(){
  return `<div class="top"><div><div class="kicker">BuddyBurn</div><h1>${tr("good")} ☀️</h1><p style="margin:0">${tr("ready")}</p></div><div class="avatar">🧑🏻</div></div>
  <div class="grid">
    <section class="card hero">
      <div><div class="kicker">${tr("today")}</div><div class="emoji">🍑</div><h2>${tr("glutes")}</h2><div class="meta"><span>⏱ ${tr("min")}</span><span>•</span><span>Intermediate</span></div></div>
      ${state.checkedIn?`<button class="btn secondary" onclick="nav('buddy')">✓ ${tr("done")}</button>`:`<button class="btn primary" onclick="startWorkout()">${tr("start")} →</button>`}
    </section>
    <section class="card">
      <h2>${tr("week")}</h2>
      <div class="week">${["M","T","W","T","F","S","S"].map((d,i)=>`<div class="day ${i===1||state.checkedIn&&i===3?'done':i===3?'plan':''}"><small>${d}</small><b>${i===1||state.checkedIn&&i===3?"✓":i===3?"•":"—"}</b></div>`).join("")}</div>
      <div style="display:flex;justify-content:space-between;margin:18px 0 7px"><b>${state.checkedIn?1:0} / 2 workouts</b><span class="kicker">WEEK 1</span></div>
      <div class="progress"><i style="width:${state.checkedIn?50:0}%"></i></div>
    </section>
    <section class="card">
      <div class="buddy"><div><div class="kicker">${tr("buddyTitle")}</div><h2 style="margin-top:4px">Emily 💜</h2></div><div class="avatar">👩🏻</div></div>
      <div style="margin:18px 0"><div class="buddy-status"><b>You</b><span class="status ${state.checkedIn?'done':'pending'}">${state.checkedIn?tr("done"):tr("pending")}</span></div><div style="height:12px"></div><div class="buddy-status"><b>Emily</b><span class="status ${state.buddyDone?'done':'pending'}">${state.buddyDone?tr("done"):tr("pending")}</span></div></div>
      <div class="streak">🔥 4 <span style="font-size:14px;color:var(--muted);font-weight:650">${tr("streak")}</span></div>
      <button class="btn secondary" style="margin-top:16px" onclick="encourage()">${tr("encourage")} 💜</button>
    </section>
    <section class="card"><h2>${tr("videos")}</h2>${video("Pamela","20 min · Glutes","🔥")} ${video("周六野","15 min · Core","✨")} ${video("欧阳春晓","30 min · Full body","💜")}</section>
  </div>`
}
function video(name,desc,icon){return `<div class="video"><div class="thumb">${icon}</div><div style="flex:1"><b>${name}</b><p style="margin:5px 0">${desc}</p></div><button class="btn secondary" onclick="toast('Video link demo')">▶</button></div>`}

function workout(){
 return `<div class="top"><div><div class="kicker">${tr("workout")}</div><h1>${tr("plan")}</h1></div></div>
 <div class="card"><h2>${tr("today")}</h2><div class="meta"><span>🍑 ${tr("glutes")}</span><span>⏱ ${tr("min")}</span></div><div style="margin:24px 0"><button class="btn primary" onclick="startWorkout()">${tr("start")} →</button></div></div>
 <div style="height:20px"></div><div class="card"><h2>${tr("videos")}</h2>${video("Pamela","20 min · Glutes","🔥")}${video("周六野","15 min · Core","✨")}${video("欧阳春晓","30 min · Full body","💜")}</div>`
}
function workoutRun(){
 return `<div class="top"><div><div class="kicker">${tr("today")}</div><h1>${tr("glutes")}</h1></div></div>
 <div class="card" style="text-align:center;padding:45px 24px"><div style="font-size:60px">🔥</div><div style="font-size:56px;font-weight:800;margin:14px 0">30:00</div><p>Follow your video, then tap finish.</p><button class="btn primary" onclick="checkIn()">${tr("complete")} ✓</button></div>`
}
function buddy(){
 return `<div class="top"><div><div class="kicker">${tr("buddy")}</div><h1>Emily 💜</h1><p style="margin:0">🔥 4 ${tr("streak")}</p></div><div class="avatar">👩🏻</div></div>
 <div class="grid"><section class="card"><h2>${tr("week")}</h2><div style="display:grid;grid-template-columns:1fr 1fr;gap:16px"><div class="card" style="background:#fff"><b>You</b><h2>${state.checkedIn?"1":"0"} / 2</h2></div><div class="card" style="background:#fff"><b>Emily</b><h2>${state.buddyDone?"1":"0"} / 2</h2></div></div></section>
 <section class="card"><h2>${tr("buddyTitle")}</h2><p>Emily ${state.buddyDone?tr("done"):tr("pending")}.</p><button class="btn primary" onclick="encourage()">${tr("encourage")} 🔥</button></section></div>
 <div style="height:20px"></div><section class="card"><h2>${tr("chat")}</h2><div class="chat">${state.messages.map(m=>`<div class="bubble ${m.from==='me'?'me':''}">${m.text[state.lang]}</div>`).join("")}</div><div class="composer"><input id="msg" placeholder="${tr("placeholder")}" onkeydown="if(event.key==='Enter')sendMsg()"><button class="btn primary" onclick="sendMsg()">${tr("send")}</button></div></section>`
}
function me(){
 return `<div class="top"><div><div class="kicker">${tr("me")}</div><h1>Xin</h1><p style="margin:0">🔥 12 ${tr("streak")}</p></div><div class="avatar">🧑🏻</div></div>
 <section class="card"><h2>${tr("stats")}</h2><div class="choice-grid"><div class="card" style="background:#fff"><b>${tr("workouts")}</b><div class="streak">${state.checkedIn?18:17}</div></div><div class="card" style="background:#fff"><b>${tr("minutes")}</b><div class="streak">540</div></div><div class="card" style="background:#fff"><b>Double Burn</b><div class="streak">5×</div></div></div></section>
 <div style="height:20px"></div><section class="card"><h2>${tr("theme")}</h2><div class="settings-row"><span><span class="theme-dot"></span>${tr("lavender")}</span><span>✓</span></div><div class="settings-row"><span>🌸 ${tr("pink")}</span><span>○</span></div><div class="settings-row"><span>💙 ${tr("blue")}</span><span>○</span></div><div class="settings-row"><span>🌿 ${tr("mint")}</span><span>○</span></div></section>
 <div style="height:20px"></div><section class="card"><h2>${tr("settings")}</h2><div class="settings-row"><span>${tr("notifications")}</span><b>ON</b></div><div class="settings-row"><span>${tr("goal")}</span><b>2 / week</b></div><div class="settings-row"><span>Language</span><div style="display:flex;gap:6px"><button class="btn secondary" onclick="setLang('zh')">简</button><button class="btn secondary" onclick="setLang('zh-TW')">繁</button><button class="btn secondary" onclick="setLang('en')">EN</button></div></div></section>`
}

function render(){
 const content = state.page==="home"?home():state.page==="workout"?workout():state.page==="buddy"?buddy():me();
 document.getElementById("app").innerHTML=`<div class="shell"><aside class="sidebar"><div class="brand"><div class="logo">●●</div><b>BuddyBurn</b></div>${navHTML()}<div class="spacer"></div><div class="card" style="padding:16px"><div class="kicker">Theme</div><div style="margin-top:10px"><span class="theme-dot"></span>${tr("lavender")}</div></div></aside><main class="main">${content}</main>${mobileNavHTML()}</div>`;
}
render();
