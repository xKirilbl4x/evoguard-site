const productLines = {
  engine: {
    index: "01",
    title: "Моторные масла для легкового, коммерческого и тяжелого сегмента.",
    copy:
      "Линейка для PVL, CVL и стационарных двигателей, рассчитанная на защиту от износа, стабильную вязкость и надежную работу техники в городском, магистральном и промышленном цикле.",
    tags: ["1.1 CVL", "1.2 PVL", "1.3 ГПУ"],
    specs: ["API / ACEA", "OEM approvals", "1L / 19L / 200L"],
  },
  coolant: {
    index: "02",
    title: "Охлаждающие жидкости и антифризы для стабильной терморегуляции.",
    copy:
      "Антифризы и охлаждающие жидкости поддерживают стабильный температурный режим, защищают систему от коррозии и помогают сохранять ресурс техники в течение всего сезона.",
    tags: ["1.4 Coolant", "Антифризы", "Термостабильность"],
    specs: ["Температурная защита", "Сервисный сегмент", "B2B / Retail"],
  },
  transmission: {
    index: "03",
    title: "Трансмиссионные жидкости для МКПП, АКПП, ГУР и гипоидных передач.",
    copy:
      "Решения для трансмиссий и приводов обеспечивают плавную работу узлов, защиту от износа и стабильность при высоких нагрузках и продолжительной эксплуатации.",
    tags: ["2.1 МКПП", "2.2 Axle Oil", "2.4 ATF / ГУР"],
    specs: ["Гипоидные передачи", "UTTO / TO", "Стабильная работа узлов"],
  },
  hydraulic: {
    index: "04",
    title: "Гидравлические жидкости для промышленного и строительного оборудования.",
    copy:
      "Гидравлические жидкости для строительной, складской и промышленной техники поддерживают точную работу системы, чистоту контура и устойчивость в широком диапазоне температур.",
    tags: ["3.1 HLP", "3.3 HLP-ZF", "3.4 HVLP"],
    specs: ["Низкотемпературные режимы", "Всесезонность", "Промышленная техника"],
  },
  compressor: {
    index: "05",
    title: "Компрессорные масла для винтовых, поршневых и синтетических решений.",
    copy:
      "Компрессорные масла рассчитаны на длительные рабочие циклы, термостабильность и надежную защиту оборудования в непрерывном производственном процессе.",
    tags: ["4.1 Screw", "4.2 Piston", "4.4 PAO"],
    specs: ["Непрерывная работа", "Стабильность под нагрузкой", "Индустриальный контур"],
  },
  industrial: {
    index: "06",
    title: "Индустриальные жидкости для редукторов, направляющих и СОЖ.",
    copy:
      "Индустриальные жидкости для редукторов, направляющих и СОЖ помогают снижать трение, поддерживать чистоту оборудования и обеспечивать стабильность технологических процессов.",
    tags: ["5.2 PAO", "6.1 Slideway", "6.2 СОЖ / MWF"],
    specs: ["Редукторные масла", "Очистители и ингибиторы", "Производственные линии"],
  },
  greases: {
    index: "07",
    title: "Смазки для узлов, где важны долговечность, устойчивость и защита под давлением.",
    copy:
      "Смазки для нагруженных узлов обеспечивают стойкость к давлению, влаге и вибрациям, продлевая срок службы подшипников и рабочих механизмов.",
    tags: ["7.1 Li", "7.2 Lithium-complex", "7.3 CAS"],
    specs: ["Минеральные и синтетические базы", "Высокая нагрузка", "Долгий ресурс"],
  },
};

const lineButtons = document.querySelectorAll(".line-pill");
const ecosystemCard = document.getElementById("ecosystem-card");
const progressBar = document.querySelector(".progress-line__bar");
const revealNodes = document.querySelectorAll(".reveal");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!reduceMotion) {
  document.documentElement.classList.add("has-motion");
}

function renderLine(key) {
  const line = productLines[key];
  if (!line || !ecosystemCard) {
    return;
  }

  ecosystemCard.innerHTML = `
    <p class="ecosystem-card__index">${line.index}</p>
    <h3>${line.title}</h3>
    <p class="ecosystem-card__copy">${line.copy}</p>
    <ul class="ecosystem-card__tags">
      ${line.tags.map((tag) => `<li>${tag}</li>`).join("")}
    </ul>
    <div class="ecosystem-card__specs">
      ${line.specs.map((spec) => `<span>${spec}</span>`).join("")}
    </div>
  `;
}

function setActiveLine(button) {
  lineButtons.forEach((item) => {
    const isActive = item === button;
    item.classList.toggle("is-active", isActive);
    item.setAttribute("aria-selected", String(isActive));
  });

  renderLine(button.dataset.line);
}

lineButtons.forEach((button) => {
  button.addEventListener("mouseenter", () => {
    if (window.innerWidth > 900) {
      setActiveLine(button);
    }
  });

  button.addEventListener("focus", () => {
    setActiveLine(button);
  });

  button.addEventListener("click", () => {
    setActiveLine(button);
  });
});

if (!reduceMotion) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  revealNodes.forEach((node) => revealObserver.observe(node));
} else {
  revealNodes.forEach((node) => node.classList.add("is-visible"));
}

function updateProgress() {
  if (!progressBar) {
    return;
  }

  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const ratio = scrollable > 0 ? window.scrollY / scrollable : 0;
  progressBar.style.width = `${Math.min(100, Math.max(0, ratio * 100))}%`;
}

updateProgress();
window.addEventListener("scroll", updateProgress, { passive: true });
window.addEventListener("resize", updateProgress);
