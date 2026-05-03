/*===== MENU SHOW =====*/ 
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)

    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            nav.classList.toggle('show')
        })
    }
}
showMenu('nav-toggle','nav-menu')
/*==================== إغلاق القائمة عند الضغط على الروابط ====================*/
// لاحظ هنا استخدمت nav_link بشرطة واحدة كما هي في الـ HTML الخاص بك
const navLink = document.querySelectorAll('.nav_link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // إزالة كلاس show لإخفاء القائمة
    if(navMenu){
        navMenu.classList.remove('show')
    }
}

// إضافة المستمع لكل رابط
navLink.forEach(n => n.addEventListener('click', linkAction))
/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () =>{
    const scrollDown = window.scrollY

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id'),
              // البحث عن الرابط
              sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')
        
        // التحقق من وجود الرابط قبل إضافة الكلاس (هذا هو الإصلاح)
        if(sectionsClass){
            if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
                sectionsClass.classList.add('active-link')
            }else{
                sectionsClass.classList.remove('active-link')
            }                                                    
        }
    })
}
window.addEventListener('scroll', scrollActive)
/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 200,
});

/* 1. ظهور العناوين الرئيسية للأقسام */
sr.reveal('.home__data, .about__img, .skills__subtitle, .skills__text, .why__title, .section-title, .section__title', {}); 

/* 2. ظهور الصور والنصوص بتأخير بسيط */
sr.reveal('.home__img, .about__subtitle, .about__text, .skills__img', {delay: 400}); 

/* 3. ظهور أيقونات التواصل الاجتماعي */
sr.reveal('.home__social-icon', { interval: 200}); 

/* 4. تفعيل الحركة للبطاقات والبنود (تمت إضافة .why__item هنا) */
/* هذا السطر سيجعل كل بند في "لماذا تختارني" يظهر بتتابع جميل */
sr.reveal('.skills__data, .work__img, .contact__input, .why__card, .service__card, .why__item', {interval: 200});

/*==================== DARK LIGHT THEME ====================*/ 
const themeButton = document.getElementById('theme-button')
const lightTheme = 'light-theme'
const iconTheme = 'bx-sun' 

const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

if (selectedTheme) {
  document.body.classList[selectedTheme === 'light' ? 'add' : 'remove'](lightTheme)
  themeButton.classList[selectedIcon === 'bx-sun' ? 'add' : 'remove'](iconTheme)
}

themeButton.addEventListener('click', () => {
    document.body.classList.toggle(lightTheme)
    themeButton.classList.toggle(iconTheme)
    localStorage.setItem('selected-theme', document.body.classList.contains(lightTheme) ? 'light' : 'dark')
    localStorage.setItem('selected-icon', themeButton.classList.contains(iconTheme) ? 'bx-sun' : 'bx-moon')
})

/* --- كود تبديل اللغة الاحترافي --- */
const langBtn = document.getElementById('language-button');
const langText = langBtn.querySelector('.lang-text');

langBtn.addEventListener('click', () => {
    const isCurrentlyArabic = document.body.dir === 'rtl' || document.body.dir === '';
    const newLang = isCurrentlyArabic ? 'en' : 'ar';
    const newDir = isCurrentlyArabic ? 'ltr' : 'rtl';

    document.body.dir = newDir;
    document.documentElement.lang = newLang;
    langText.textContent = isCurrentlyArabic ? 'AR' : 'EN';

    const elements = document.querySelectorAll('.translate, [data-en]');
    elements.forEach(el => {
        const newText = el.getAttribute(`data-${newLang}`);
        const newPlaceholder = el.getAttribute(`data-${newLang}-placeholder`);

        if (newText) {
            if (el.tagName === 'INPUT' && (el.type === 'button' || el.type === 'submit')) {
                el.value = newText;
            } else {
                el.innerHTML = newText;
            }
        }

        if (newPlaceholder) {
            el.setAttribute('placeholder', newPlaceholder);
        }
    });

    const portfolioLinks = document.querySelectorAll('[data-fancybox]');
    portfolioLinks.forEach(link => {
        const arDesc = link.getAttribute('data-ar-val'); 
        const enDesc = link.getAttribute('data-en-val');
        if (newLang === 'ar' && arDesc) link.setAttribute('data-caption', arDesc);
        else if (newLang === 'en' && enDesc) link.setAttribute('data-caption', enDesc);
    });

    document.body.style.fontFamily = (newLang === 'ar') ? "'Cairo', sans-serif" : "'Poppins', sans-serif";
});