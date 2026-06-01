// =====================================================================
// 📋 질문 데이터 배열 — 여기만 수정하면 끝!
//
// ✅ id, number 필드 없음 → 런타임에 배열 순서대로 자동 부여 (q1, q2, q3 …)
// ✅ section: "common"  → Q2 분기 이전에 항상 표시되는 질문
//    section: "aiUser"  → "있다" 선택 시에만 표시되는 질문
// ✅ sheetKey           → 구글 시트 컬럼명 (제출 데이터에 사용)
// ✅ required: false    → 특정 질문을 선택 필수에서 제외하고 싶을 때
// ✅ showIf             → { questionId: 'q_id', value: '값' } 형태로 조건부 표시
// =====================================================================
const questions = [
  // ── Q1: 학년 및 과목 (주관식) ──────────────────────────────────────
  {
    section: "common",
    sheetKey: "Q_학년및과목",
    title: "담당하고 계신 학년 및 과목을 작성해 주세요.",
    hint: "본 답변은 설문 집계 목적으로만 사용되며, 활동 종료와 함께 모두 폐기됩니다.",
    type: "textarea",
    required: false,
    placeholder: "예) 1학년, 2학년 화법과 언어, 윤리와 사상, 사회과, 국어과, 영어과 등",
  },

  // ── Q2: AI 사용 경험 (분기) ──────────────────────────────────────
  {
    section: "common",
    sheetKey: "Q_AI사용경험",
    title: "AI 서비스를 사용해 본 경험이 있으신가요?",
    type: "branch",
    options: [
      { value: "yes", label: "있다", emoji: "✅" },
      { value: "no",  label: "없다", emoji: "❌" }
    ]
  },

  // ── 아래부터 section: "aiUser" ─────────────────────────────────────
  // "있다" 선택 시에만 표시됩니다.

  // ── Q3: 사용 서비스 (복수선택) ──────────────────────────────────────
  {
    section: "aiUser",
    sheetKey: "Q_사용서비스",
    title: "평소 사용하는 AI 서비스는 무엇인가요?",
    type: "checkbox",
    hasEtc: true,
    options: [
      { value: "ChatGPT",          emoji: "💬" },
      { value: "Claude",           emoji: "🟠" },
      { value: "Gemini",           emoji: "💎" },
      { value: "Copilot",          emoji: "🪟" },
      { value: "뤼튼",             emoji: "🇰🇷" },
    ]
  },

  // ── Q4: 활용 빈도 (단일선택) ──────────────────────────────────────
  {
    section: "aiUser",
    sheetKey: "Q_활용빈도",
    title: "수업 준비나 업무 수행 과정에서 AI를 얼마나 자주 활용하시나요?",
    type: "radio",
    options: [
      { value: "매번 활용한다",          emoji: "🌟" },
      { value: "자주 활용한다",          emoji: "🌿" },
      { value: "가끔 활용한다",          emoji: "💤" },
      { value: "거의 활용하지 않는다",   emoji: "❄️" },
      { value: "전혀 활용하지 않는다",   emoji: "🧊" },
    ]
  },

  // ── Q5: 활용 목적 (복수선택) ──────────────────────────────────────
  {
    section: "aiUser",
    sheetKey: "Q_활용목적",
    title: "주로 어떤 목적으로 AI를 활용하시나요?",
    type: "checkbox",
    hasEtc: true,
    options: [
      { value: "수업 자료 조사 및 제작",      emoji: "🔍" },
      { value: "문제 출제",      emoji: "📝" },
      { value: "문서 작성·요약·교정",           emoji: "📄" },
      { value: "학생 상담 참고",      emoji: "💬" },
    ]
  },

  // ── Q7: 결과물 반영 수준 (단일선택) ──────────────────────────────────────
  {
    section: "aiUser",
    sheetKey: "Q_결과물반영수준",
    title: "AI가 생성한 결과물을 교육 자료나 업무에 어느 정도 반영하시나요?",
    type: "radio",
    options: [
      { value: "거의 그대로 활용한다",               emoji: "📋" },
      { value: "수정·보완 후 활용한다",              emoji: "✍️" },
      { value: "아이디어만 참고하고 직접 작성한다",  emoji: "🗒️" },
      { value: "활용한 적 없다",                     emoji: "🙅" },
    ]
  },

  // ── Q8: 오류 경험 (단일선택) ──────────────────────────────────────
  {
    section: "aiUser",
    sheetKey: "Q_오류경험",
    title: "AI가 제공한 정보에 오류나 왜곡이 있다고 판단한 경험이 있으시나요?",
    type: "radio",
    options: [
      { value: "자주 있다", emoji: "😵" },
      { value: "가끔 있다", emoji: "🤔" },
      { value: "거의 없다", emoji: "😌" },
      { value: "전혀 없다", emoji: "😇" },
    ]
  },

  // ── Q10: 학생 AI 활용 인식 (단일선택) ──────────────────────────────────────
  {
    section: "aiUser",
    sheetKey: "Q_학생AI활용인식",
    title: "학생들이 과제 수행 과정에서 AI를 활용한다고 생각하시나요?",
    type: "radio",
    options: [
      { value: "매우 많이 활용한다",       emoji: "🔥" },
      { value: "어느 정도 활용한다",       emoji: "📱" },
      { value: "일부만 활용한다",          emoji: "🤷" },
      { value: "거의 활용하지 않는다",     emoji: "❄️" },
      { value: "전혀 활용하지 않는다",     emoji: "🧊" },
    ]
  },

  // ── Q11: 무수정 제출 학생 비율 (단일선택) ──────────────────────────────────────
  {
    section: "aiUser",
    sheetKey: "Q_무수정제출비율",
    title: "AI가 생성한 내용을 거의 수정 없이 제출하는 학생이 얼마나 된다고 생각하시나요?",
    type: "radio",
    options: [
      { value: "매우 많다",   emoji: "😨" },
      { value: "다소 많다",   emoji: "😟" },
      { value: "보통이다",    emoji: "😐" },
      { value: "많지 않다",   emoji: "😌" },
      { value: "거의 없다",   emoji: "😇" },
    ]
  },

  // ── Q13: 학생 AI 활용 우려 사항 (복수선택) ──────────────────────────────────────
  {
    section: "aiUser",
    sheetKey: "Q_우려사항",
    title: "학생들의 AI 활용과 관련하여 우려되는 점은 무엇입니까?",
    type: "checkbox",
    hasEtc: true,
    options: [
      { value: "사고력 저하",        emoji: "🧠" },
      { value: "표절 문제",     emoji: "⚖️" },
      { value: "평가의 공정성 저하", emoji: "📊" },
      { value: "오류 수용",     emoji: "❗" },
      { value: "학습 동기 저하",     emoji: "📉" },
      { value: "과도한 의존",        emoji: "🔗" },
    ]
  },

  // ── Q14: 조치 시행 여부 (단일선택, 조건부 Q15 트리거) ──────────────────────────────────────
  {
    section: "aiUser",
    sheetKey: "Q_조치시행여부",
    title: "학생들의 AI 활용을 위해 별도의 조치를 시행한 적이 있으시나요?",
    type: "radio",
    triggersConditional: "q_measures", // Q15를 조건부로 표시할 트리거 키
    options: [
      { value: "있다", emoji: "✅" },
      { value: "없다", emoji: "❌" },
    ]
  },

  // ── Q15: 조치 내용 (복수선택, Q14 "있다" 선택 시에만 표시) ──────────────────────────────────────
  {
    section: "aiUser",
    sheetKey: "Q_조치내용",
    title: "어떤 조치를 시행하셨습니까?",
    type: "checkbox",
    hasEtc: true,
    conditionalKey: "q_measures",   // Q14의 triggersConditional과 연결
    required: false,                // 조건부 문항이므로 필수 해제
    options: [
      { value: "AI 사용 사실 명시 요구",      emoji: "📢" },
      { value: "AI 활용 과정 기록 제출",      emoji: "📋" },
      { value: "구술 발표 병행",             emoji: "🎤" },
      { value: "수행평가 방식 변경",          emoji: "🔄" },
      { value: "수업 중 직접 작성 활동 확대", emoji: "✏️" },
      { value: "AI의 오류 가능성 안내", emoji: "💁"},
    ]
  },

  // ── Q20: 수행평가 교육적 효과 (5점 척도) ──────────────────────────────────────
  {
    section: "aiUser",
    sheetKey: "Q_수행평가효과",
    title: "AI의 등장 이후 수행평가의 교육적 효과가 향상되었다고 생각하시나요?",
    type: "radio",
    options: [
      { value: "매우 그렇다", emoji: "🌟" },
      { value: "그렇다",      emoji: "😊" },
      { value: "보통이다",    emoji: "😐" },
      { value: "아니다",      emoji: "😕" },
      { value: "전혀 아니다", emoji: "😔" },
    ]
  },

  // ── Q23: AI 활용 허용 수준 (단일선택) ──────────────────────────────────────
  {
    section: "aiUser",
    sheetKey: "Q_AI허용수준",
    title: "향후 수행평가에서 AI 활용을 어느 정도 허용해야 한다고 생각하시나요?",
    type: "radio",
    options: [
      { value: "자유롭게 허용",     emoji: "🟢" },
      { value: "일정 범위 내 허용", emoji: "🟡" },
      { value: "제한적으로 허용",   emoji: "🟠" },
      { value: "원칙적으로 금지",   emoji: "🔴" },
      { value: "잘 모르겠다",       emoji: "🤷" },
    ]
  },
];

// =====================================================================
// ⚙️ 내부 처리용 — 배열 순서대로 id/number 자동 부여
//    questions 배열을 직접 수정할 필요 없이 런타임에 계산됩니다.
// =====================================================================
questions.forEach((q, i) => {
  q._id     = `q${i + 1}`;   // "q1", "q2", "q3" …
  q._number = i + 1;          // 1, 2, 3 …
});

// Q14의 triggersConditional 키를 가진 질문의 _id를 Q15가 참조할 수 있도록 매핑
const conditionalTriggerMap = {}; // conditionalKey → trigger 질문의 _id
questions.forEach(q => {
  if (q.triggersConditional) {
    conditionalTriggerMap[q.triggersConditional] = q._id;
  }
});

// 총 응답 필요 문항 수 (branch 포함, aiUser는 "있다" 선택 시에만)
const commonQs  = questions.filter(q => q.section === "common");
const aiUserQs  = questions.filter(q => q.section === "aiUser");
const totalCount = commonQs.length + aiUserQs.length; // 진행바 기준


// =====================================================================
// 🖼️ 렌더링
// =====================================================================
function renderQuestions() {
  const commonSection  = document.getElementById('commonSection');
  const aiUserSection  = document.getElementById('aiUserSection');
  commonSection.innerHTML = '';
  aiUserSection.innerHTML = '';

  questions.forEach(q => {
    const target = q.section === "common" ? commonSection : aiUserSection;

    // ── 분기형 (branch) ──────────────────────────────────────────────
    if (q.type === 'branch') {
      target.innerHTML += `
        <div class="card" id="${q._id}">
          <div class="q-title"><span class="q-number">${q._number}</span>${q.title}</div>
          <div class="branch-section">
            <button class="branch-btn" id="branchYes" onclick="handleBranch('yes')">
              <span class="icon">✅</span>있다
            </button>
            <button class="branch-btn" id="branchNo" onclick="handleBranch('no')">
              <span class="icon">❌</span>없다
            </button>
          </div>
        </div>`;
      return;
    }

    // ── 주관식 (textarea) ──────────────────────────────────────────────
    if (q.type === 'textarea') {
      const placeholder = q.placeholder || '여기에 입력해 주세요';
      target.innerHTML += `
        <div class="card" id="${q._id}">
          <div class="q-title"><span class="q-number">${q._number}</span>${q.title}</div>
          ${q.hint ? '<div class="q-hint">' + q.hint + '</div>' : ''}
          <textarea id="${q._id}_text" name="${q._id}" placeholder="${placeholder}"
            style="width:100%;margin-top:4px;padding:14px 16px;border-radius:16px;
                   border:2px solid #F0C0D0;font-family:'Nanum Gothic',sans-serif;
                   font-size:14px;color:#5C3D5E;resize:vertical;min-height:100px;
                   background:rgba(255,255,255,0.6);outline:none;transition:border 0.2s;"
            oninput="updateProgress()"
            onfocus="this.style.borderColor='#FF8FAB'"
            onblur="this.style.borderColor='#F0C0D0'"></textarea>
        </div>`;
      return;
    }

    // ── 일반 라디오 / 체크박스 ──────────────────────────────────────
    const isCheckbox  = q.type === 'checkbox';
    const customClass = isCheckbox ? 'custom-check' : 'custom-radio';
    const hint        = isCheckbox ? '<div class="q-hint">🌸 복수 선택 가능</div>' : '';

    // conditionalKey가 있으면 처음에는 숨김
    const isConditional = !!q.conditionalKey;
    const cardStyle = isConditional ? 'style="display:none;"' : '';

    const optionsHTML = q.options.map(opt => `
      <label class="option-label">
        <input type="${q.type}" name="${q._id}" value="${opt.value}"
          ${q.triggersConditional ? `onchange="handleConditionalTrigger('${q._id}', '${q.triggersConditional}', this.value)"` : ''}>
        <span class="${customClass}"></span> ${opt.emoji} ${opt.value}
      </label>`).join('');

    const etcHTML = q.hasEtc ? `
      <label class="option-label">
        <input type="${q.type}" name="${q._id}" value="기타"
               onchange="toggleEtc('${q._id}etc', this)">
        <span class="${customClass}"></span> 🔮 기타
        <input type="text" id="${q._id}etc" placeholder="직접 입력" disabled
          style="margin-left:8px;padding:4px 10px;border-radius:10px;
                 border:1.5px solid #F0C0D0;font-size:13px;display:none;">
      </label>` : '';

    target.innerHTML += `
      <div class="card" id="${q._id}" ${cardStyle}>
        <div class="q-title"><span class="q-number">${q._number}</span>${q.title}</div>
        ${hint}
        <div class="options">${optionsHTML}${etcHTML}</div>
      </div>`;
  });

  bindEvents();
}


// =====================================================================
// 🌿 상태 변수
// =====================================================================
let aiUser        = null;
let branchSelected = false;


// =====================================================================
// 🔀 분기 처리 (Q2 AI 사용 여부)
// =====================================================================
function handleBranch(val) {
  aiUser         = val;
  branchSelected = true;
  document.getElementById('branchYes').classList.toggle('selected', val === 'yes');
  document.getElementById('branchNo').classList.toggle('selected', val === 'no');

  if (val === 'no') {
    document.getElementById('aiUserSection').style.display = 'none';
    document.getElementById('submitWrap').style.display    = 'flex';
    updateProgress();
  } else {
    document.getElementById('aiUserSection').style.display = 'block';
    document.getElementById('submitWrap').style.display    = 'flex';
    updateProgress();
  }
}


// =====================================================================
// 🔀 조건부 문항 표시/숨김 처리 (Q14 → Q15)
// =====================================================================
function handleConditionalTrigger(triggerQId, conditionalKey, selectedValue) {
  // conditionalKey를 가진 모든 문항 카드를 찾아 표시/숨김
  questions.forEach(q => {
    if (q.conditionalKey === conditionalKey) {
      const card = document.getElementById(q._id);
      if (card) {
        card.style.display = (selectedValue === '있다') ? 'block' : 'none';
      }
    }
  });
  updateProgress();
}


// =====================================================================
// 📊 진행바 — questions 배열을 순회하여 자동 계산
// =====================================================================
function updateProgress() {
  let answered = 0;

  questions.forEach(q => {
    // aiUser 섹션은 "있다" 선택 시에만 카운트
    if (q.section === 'aiUser' && aiUser !== 'yes') return;

    // conditionalKey가 있는 문항(Q15)은 현재 표시 중일 때만 카운트
    if (q.conditionalKey) {
      const card = document.getElementById(q._id);
      if (!card || card.style.display === 'none') return;
    }

    if (q.type === 'branch') {
      if (branchSelected) answered++;
    } else if (q.type === 'textarea') {
      const el = document.getElementById(`${q._id}_text`);
      if (el && el.value.trim().length > 0) answered++;
    } else if (q.type === 'checkbox') {
      if (document.querySelectorAll(`input[name="${q._id}"]:checked`).length > 0) answered++;
    } else {
      if (document.querySelector(`input[name="${q._id}"]:checked`)) answered++;
    }
  });

  // "있다" 선택 전에는 총 문항 수를 commonQs 기준으로 표시
  const displayTotal = aiUser === 'yes' ? totalCount : commonQs.length;
  const pct = Math.round((answered / totalCount) * 100);
  document.getElementById('progressBar').style.width  = pct + '%';
  document.getElementById('progressText').textContent = `${answered} / ${displayTotal} 완료`;
}

function bindEvents() {
  document.querySelectorAll('input[type="radio"], input[type="checkbox"]').forEach(el => {
    el.removeEventListener('change', updateProgress);
    el.addEventListener('change', updateProgress);
  });
}


// =====================================================================
// ✅ 유효성 검사 & 제출 — questions 배열을 순회하여 자동 처리
// =====================================================================
async function submitSurvey() {
  // 유효성 검사
  for (const q of questions) {
    if (q.type === 'branch') {
      if (!branchSelected) { alert(`💕 Q${q._number}: AI 사용 여부를 선택해 주세요!`); return; }
      continue;
    }
    if (q.section === 'aiUser' && aiUser !== 'yes') continue;
    if (q.required === false) continue;

    // 조건부 문항(Q15)이 숨겨진 경우 유효성 검사 건너뜀
    if (q.conditionalKey) {
      const card = document.getElementById(q._id);
      if (!card || card.style.display === 'none') continue;
    }

    if (q.type === 'textarea') {
      const el = document.getElementById(`${q._id}_text`);
      if (!el || el.value.trim().length === 0) {
        alert(`💕 Q${q._number}: "${q.title.slice(0, 15)}…" 내용을 입력해 주세요!`);
        return;
      }
      continue;
    }
    const checked = document.querySelectorAll(`input[name="${q._id}"]:checked`).length;
    if (checked === 0) {
      alert(`💕 Q${q._number}: "${q.title.slice(0, 15)}…" 항목을 선택해 주세요!`);
      return;
    }
  }

  // 데이터 수집 — sheetKey를 컬럼명으로 사용
  const data = { 제출시각: new Date().toLocaleString('ko-KR') };

  questions.forEach(q => {
    if (q.type === 'branch') {
      data[q.sheetKey] = aiUser === 'yes' ? '있다' : '없다';
      return;
    }
    if (q.section === 'aiUser' && aiUser !== 'yes') {
      data[q.sheetKey] = 'X';
      return;
    }

    // 조건부 문항이 숨겨진 경우 'X' 처리
    if (q.conditionalKey) {
      const card = document.getElementById(q._id);
      if (!card || card.style.display === 'none') {
        data[q.sheetKey] = 'X';
        return;
      }
    }

    if (q.type === 'textarea') {
      data[q.sheetKey] = document.getElementById(`${q._id}_text`)?.value.trim() || '';
    } else if (q.type === 'checkbox') {
      data[q.sheetKey] = [...document.querySelectorAll(`input[name="${q._id}"]:checked`)]
        .map(el => {
          if (el.value === '기타') {
            const txt = document.getElementById(`${q._id}etc`)?.value.trim();
            return txt ? `기타(${txt})` : '기타';
          }
          return el.value;
        }).join(', ');
    } else {
      data[q.sheetKey] = document.querySelector(`input[name="${q._id}"]:checked`)?.value || '';
    }
  });

  console.log("📤 전송 데이터:", JSON.stringify(data, null, 2));
  const WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbwRrjlPYy19hiWffhIqrasbUXquPrhRybYJBc2l3Cy4LAl_9Wglj-3AJ3u9kniWo9NPNA/exec";

  showDone(aiUser === 'no');

  try {
    await fetch(WEBHOOK_URL, {
      method: "POST",
      mode:   "no-cors",
      headers: { "Content-Type": "text/plain" },
      body:   JSON.stringify(data),
    });
  } catch (err) {
    console.error("전송 오류:", err);
  }
}


// =====================================================================
// 🎉 완료 화면
// =====================================================================
function showDone(early) {
  document.getElementById('progressSection').style.display = 'none';
  document.getElementById('surveyForm').style.display      = 'none';
  const done = document.getElementById('doneScreen');
  done.style.display = 'block';

  if (early) {
    document.getElementById('doneEmoji').textContent = '🌷';
    document.getElementById('doneTitle').textContent = '설문이 종료되었어요!';
    document.getElementById('doneMsg').innerHTML =
      'AI 활용 경험이 없으신 선생님께서는<br>여기서 설문이 마무리됩니다 🌸<br><br>참여해 주셔서 진심으로 감사드립니다! 💕';
  } else {
    document.getElementById('doneEmoji').textContent = '🎉';
    document.getElementById('doneTitle').textContent = '설문이 완료되었어요!';
    document.getElementById('doneMsg').innerHTML =
      '바쁜 시간 내어 참여해 주셔서<br>진심으로 감사드립니다! 🌸';
    launchConfetti();
  }
}

function launchConfetti() {
  const wrap   = document.getElementById('confettiWrap');
  const colors = ['#FF8FAB','#C8B6E2','#B5EAD7','#FFEAA7','#FFB3C6','#fff'];
  for (let i = 0; i < 60; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.cssText = `
      left: ${Math.random() * 100}%;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      width: ${6 + Math.random() * 8}px;
      height: ${6 + Math.random() * 8}px;
      border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
      animation-duration: ${2 + Math.random() * 2}s;
      animation-delay: ${Math.random()}s;
    `;
    wrap.appendChild(piece);
  }
  setTimeout(() => (wrap.innerHTML = ''), 4000);
}

function toggleEtc(id, el) {
  const textInput = document.getElementById(id);
  if (el.checked) {
    textInput.style.display = 'inline';
    textInput.disabled = false;
    textInput.focus();
  } else {
    textInput.style.display = 'none';
    textInput.disabled = true;
    textInput.value = '';
  }
}


// =====================================================================
// 🚀 초기 실행
// =====================================================================
function handleConsent() {
  document.getElementById('consentScreen').style.display = 'none';
  document.getElementById('surveyScreen').style.display  = 'block';
}

renderQuestions();
document.getElementById('aiUserSection').style.display = 'none';
document.getElementById('submitWrap').style.display    = 'none';