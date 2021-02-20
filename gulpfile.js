let preprocessor = "sass"; // Определяем переменную "preprocessor"
const { src, dest, parallel, series, watch } = require("gulp"); // Определяем константы Gulp
const browserSync = require("browser-sync").create(), // Подключаем Browsersync
  concat = require("gulp-concat"), // Подключаем gulp-concat
  uglify = require("gulp-uglify-es").default, // Подключаем gulp-uglify-es
  sass = require("gulp-sass"), // Подключаем модули gulp-sass и gulp-less
  autoprefixer = require("gulp-autoprefixer"), // Подключаем Autoprefixer
  cleancss = require("gulp-clean-css"), // Подключаем модуль gulp-clean-css
  imagemin = require("gulp-imagemin"), // Подключаем gulp-imagemin для работы с изображениями
  pngquant = require("imagemin-pngquant"),
  newer = require("gulp-newer"), // Подключаем модуль gulp-newer
  del = require("del"), // Подключаем модуль del
  sourcemaps = require("gulp-sourcemaps"), // Подключаем бибилиотеку для создания  sourcemaps
  rename = require("gulp-rename"), //Подключаем бибилиотеку для переименования файлов;
  shorthand = require("gulp-shorthand"),
  gcmq = require("gulp-group-css-media-queries"); // Подключаем модуль для группировки медиазапросов

// Определяем логику работы Browsersync
function browsersync() {
  browserSync.init({
    // Инициализация Browsersync
    server: { baseDir: "app/" }, // Указываем папку сервера
    notify: false, // Отключаем уведомления
    online: true, // Режим работы: true или false
  });
}

function libsJS() {
  return src(
    [
      // Берём файлы из источников
      "app/js/libs/jquery.min.js", // Пример подключения библиотеки
      "app/js/libs/parallaxie.js",
      "app/js/libs/aos.js",
      "app/js/libs/flickity.pkgd.min.js", // Пример подключения библиотеки
      // "app/js/app.js", // Пользовательские скрипты, использующие библиотеку, должны быть подключены в конце
    ],
    { allowEmpty: true }
  )
    .pipe(concat("libs.min.js")) // Конкатенируем в один файл
    .pipe(uglify()) // Сжимаем JavaScript
    .pipe(dest("app/js/")) // Выгружаем готовый файл в папку назначения
    .pipe(browserSync.stream()); // Триггерим Browsersync для обновления страницы
}

function libsCSS() {
  return src(
    [
      // Берём файлы из источников
      "app/css/libs/aos.css", // Пример подключения библиотеки
      "app/css/libs/flickity.css", // Пример подключения библиотеки
      // "app/js/app.js", // Пользовательские скрипты, использующие библиотеку, должны быть подключены в конце
    ],
    { allowEmpty: true }
  )
    .pipe(concat("libs.min.css")) // Конкатенируем в один файл
    .pipe(
      cleancss({
        level: { 1: { specialComments: 0 } },
        // format: "beautify",
      })
    )
    .pipe(dest("app/css/")) // Выгружаем готовый файл в папку назначения
    .pipe(browserSync.stream()); // Триггерим Browsersync для обновления страницы
}

function scripts() {
  return src(
    [
      "app/js/main.js", // Пользовательские скрипты, использующие библиотеку, должны быть подключены в конце
    ],
    { allowEmpty: true }
  )
    .pipe(uglify()) // Сжимаем JavaScript
    .pipe(concat("main.min.js")) // Конкатенируем в один файл
    .pipe(dest("app/js/")) // Выгружаем готовый файл в папку назначения
    .pipe(browserSync.stream()); // Триггерим Browsersync для обновления страницы
}

function styles() {
  return src("app/sass/style.sass") // Выбираем источник
    .pipe(eval(preprocessor)()) // Преобразуем значение переменной "preprocessor" в функцию
    .pipe(concat("style.min.css")) // Конкатенируем в файл style.min.js
    .pipe(
      autoprefixer({ overrideBrowserslist: ["last 10 versions"], grid: true })
    ) // Создадим префиксы с помощью Autoprefixer
    .pipe(shorthand())
    .pipe(gcmq()) //Группируем медиазапросы
    .pipe(
      cleancss({
        level: { 1: { specialComments: 0 } },
        // format: "beautify",
      })
    ) // Минифицируем стили
    .pipe(sourcemaps.write(".")) // создание карты css.map в текущей папке
    .pipe(dest("app/css/")) // Выгрузим результат в папку "app/css/"
    .pipe(browserSync.stream()); // Сделаем инъекцию в браузер
}

function images() {
  return src("app/img/**/*") // Берём все изображения из папки источника
    .pipe(newer("app/img/dest/")) // Проверяем, было ли изменено (сжато) изображение ранее
    .pipe(
      imagemin({
        // С кешированием
        // .pipe(imagemin({ // Сжимаем изображения без кеширования
        interlaced: true,
        progressive: true,
        svgoPlugins: [{ removeViewBox: false }],
        use: [pngquant()],
      })
    ) // Сжимаем и оптимизируем изображеня
    .pipe(dest("app/img/dest/")); // Выгружаем оптимизированные изображения в папку назначения
}
function transferImg() {
  return src(
    ["app/img/dest/**/*"]
    // { base: "app/img" }
  ) // Параметр "base" сохраняет структуру проекта при копировании
    .pipe(dest("dist/img/")); // Выгружаем в папку с финальной сборкой
}

function cleanimg() {
  return del("app/img/dest/**/*", { force: true }); // Удаляем всё содержимое папки "app/images/dest/"
}

function buildcopy() {
  return src(
    [
      // Выбираем нужные файлы
      "app/css/*.css",
      "app/fonts/**/*.*",
      "app/js/*.js",
      "app/**/*.html",
    ],
    { base: "app" }
  ) // Параметр "base" сохраняет структуру проекта при копировании
    .pipe(dest("dist")); // Выгружаем в папку с финальной сборкой
}

function cleandist() {
  return del("dist/**/*", { force: true }); // Удаляем всё содержимое папки "dist/"
}

function startwatch() {
  // Выбираем все файлы JS в проекте, а затем исключим с суффиксом .min.js
  watch(["app/**/*.js", "!app/js/*.min.js"], scripts);

  // Мониторим файлы препроцессора на изменения
  watch("app/**/" + preprocessor + "/**/*", styles);

  // Мониторим файлы HTML на изменения
  watch("app/**/*.html").on("change", browserSync.reload);

  // Мониторим папку-источник изображений и выполняем images(), если есть изменения
  watch("app/img/src/**/*", images);
}

// Экспортируем функцию browsersync() как таск browsersync. Значение после знака = это имеющаяся функция.
exports.browsersync = browsersync;

// Экспортируем функцию libsJS() в таск libsJS
exports.libsJS = libsJS;

// Экспортируем функцию libsCSS() в таск libsCSS
exports.libsCSS = libsCSS;

// Экспортируем функцию scripts() в таск scripts
exports.scripts = scripts;

exports.transferImg = transferImg;

// Экспортируем функцию styles() в таск styles
exports.styles = styles;

// Экспорт функции images() в таск images
exports.images = images;

// Экспортируем функцию cleanimg() как таск cleanimg
exports.cleanimg = cleanimg;

// Создаём новый таск "build", который последовательно выполняет нужные операции
exports.build = series(
  cleandist,
  styles,
  scripts,
  libsJS,
  libsCSS,
  transferImg,
  images,
  buildcopy
);

// Экспортируем дефолтный таск с нужным набором функций
exports.default = parallel(
  styles,
  scripts,
  libsJS,
  libsCSS,
  browsersync,
  transferImg,
  startwatch
);
