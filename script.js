const productLines = {
  engine: {
    index: "01",
    eyebrow: "PVL / CVL / Heavy duty",
    title: "Моторные масла для легкового, коммерческого и тяжелого сегмента.",
    copy:
      "Флагманская линейка EVOGuard для ежедневной эксплуатации, высоких нагрузок и стабильной защиты двигателя в широком диапазоне условий.",
    note: "Ключевые свойства",
    tags: ["API / ACEA", "PVL / CVL", "1L / 20L / 200L"],
    specs: ["Стабильность вязкости", "Термозащита", "Уверенный ресурс"],
    accent: "rgba(242, 191, 92, 0.22)",
  },
  coolant: {
    index: "02",
    eyebrow: "Coolants / Service fluids",
    title: "Охлаждающие жидкости и антифризы для стабильного температурного режима.",
    copy:
      "Линейка для контроля температуры, защиты системы охлаждения и надежной всесезонной работы в городском, коммерческом и сервисном цикле.",
    note: "Подходит для",
    tags: ["Антифризы", "Coolant", "B2B / Retail"],
    specs: ["Защита контура", "Температурная стабильность", "Сервисная готовность"],
    accent: "rgba(129, 171, 219, 0.2)",
  },
  transmission: {
    index: "03",
    eyebrow: "ATF / MTF / Axle",
    title: "Трансмиссионные жидкости для узлов, где важны плавность и стойкость под нагрузкой.",
    copy:
      "Составы для трансмиссий и приводных узлов, где критичны плавная работа, защита механики и стабильность характеристик под высокой нагрузкой.",
    note: "Ключевые свойства",
    tags: ["ATF / MTF", "Axle", "UTTO / TO"],
    specs: ["Чистота переключения", "Защита узлов", "Работа под нагрузкой"],
    accent: "rgba(148, 168, 196, 0.18)",
  },
  hydraulic: {
    index: "04",
    eyebrow: "Hydraulic systems",
    title: "Гидравлические жидкости для промышленного и строительного оборудования.",
    copy:
      "Решения для систем, где важны чистота контура, стабильное давление и надежная работа оборудования в непрерывном режиме.",
    note: "Сфера применения",
    tags: ["HLP", "HVLP", "Industrial equipment"],
    specs: ["Чистота системы", "Стабильность давления", "Индустриальный режим"],
    accent: "rgba(84, 196, 167, 0.18)",
  },
  compressor: {
    index: "05",
    eyebrow: "Compressor oils",
    title: "Компрессорные масла для длительных циклов и непрерывной работы оборудования.",
    copy:
      "Линейка для оборудования, работающего без остановок, где на первый план выходят контроль нагрева, ресурс и стабильность в длительном цикле.",
    note: "Рабочий режим",
    tags: ["Screw", "Piston", "PAO"],
    specs: ["Непрерывный цикл", "Контроль нагрева", "Длительный ресурс"],
    accent: "rgba(255, 158, 116, 0.18)",
  },
  industrial: {
    index: "06",
    eyebrow: "MWF / Gear / Slideway",
    title: "Индустриальные жидкости для редукторов, СОЖ, направляющих и производственных задач.",
    copy:
      "Ассортимент для производственных процессов, где ценятся системность, точность применения и надежная работа оборудования в разных режимах.",
    note: "Сценарии применения",
    tags: ["Gear oils", "MWF", "Slideway"],
    specs: ["Производственные процессы", "Гибкость для B2B", "Стабильная эксплуатация"],
    accent: "rgba(255, 214, 102, 0.2)",
  },
  greases: {
    index: "07",
    eyebrow: "Greases / Heavy load",
    title: "Смазки для нагруженных узлов, где важны стойкость, давление и долговечность.",
    copy:
      "Продукты для узлов с высокой нагрузкой, где ключевыми становятся адгезия, защита поверхности и стабильная работа в сложных условиях.",
    note: "Ключевая нагрузка",
    tags: ["Li", "Lithium-complex", "High load"],
    specs: ["Стойкость к давлению", "Защита узлов", "Долговечная смазка"],
    accent: "rgba(255, 111, 111, 0.16)",
  },
};

const lineButtons = document.querySelectorAll(".line-pill");
const ecosystemCard = document.getElementById("ecosystem-card");
const progressBar = document.querySelector(".progress-line__bar");
const revealNodes = document.querySelectorAll(".reveal");
const topbar = document.querySelector(".topbar");
const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");
const mobileMenuLinks = document.querySelectorAll(".mobile-menu a");
const ambientVideos = document.querySelectorAll("[data-ambient-video]");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!reduceMotion) {
  document.documentElement.classList.add("has-motion");
}

function renderLine(key) {
  const line = productLines[key];
  if (!line || !ecosystemCard) {
    return;
  }

  ecosystemCard.style.setProperty("--line-accent", line.accent);
  ecosystemCard.innerHTML = `
    <p class="ecosystem-card__index">${line.index}</p>
    <span class="ecosystem-card__eyebrow">${line.eyebrow}</span>
    <h3>${line.title}</h3>
    <p class="ecosystem-card__copy">${line.copy}</p>
    <span class="ecosystem-card__subhead">${line.note}</span>
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

function updateProgress() {
  if (!progressBar) {
    return;
  }

  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const ratio = scrollable > 0 ? window.scrollY / scrollable : 0;
  progressBar.style.width = `${Math.min(100, Math.max(0, ratio * 100))}%`;
}

function setMobileMenuState(isOpen) {
  if (!topbar || !menuToggle) {
    return;
  }

  topbar.classList.toggle("menu-open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Закрыть меню" : "Открыть меню");
}

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
  ambientVideos.forEach((video) => {
    video.removeAttribute("autoplay");
    video.pause();
  });
}

if (topbar && menuToggle && mobileMenu) {
  menuToggle.addEventListener("click", () => {
    const isOpen = topbar.classList.contains("menu-open");
    setMobileMenuState(!isOpen);
  });

  mobileMenuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      setMobileMenuState(false);
    });
  });

  document.addEventListener("click", (event) => {
    if (!topbar.classList.contains("menu-open")) {
      return;
    }

    if (event.target instanceof Node && !topbar.contains(event.target)) {
      setMobileMenuState(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setMobileMenuState(false);
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 640) {
      setMobileMenuState(false);
    }
  });
}

renderLine("engine");
updateProgress();
window.addEventListener("scroll", updateProgress, { passive: true });
window.addEventListener("resize", updateProgress);
