.granary-menu {
    width: 100%;
}

/* body */
.body {
    width: 100%;
    height: 935;
}

.back-btn {
    fill-image: asset("jetgui/button/backCyan.png");
    size: 145;
    v-align: 1;
    offset-bottom: 25;
    offset-left: 112;
}

.body__block {
    h-align: 0.5;
}

/* header */
.header {
    width: 100%;
    padding-top: 20;
    padding-bottom: 26;
    padding-right: 70;
    padding-left: 70;
}
.title {
    fill-image: asset("jetgui/header/title.png");
	font: "Tavolga bold 48";
    text-color: "7a4f2c";
    width: 416;
    height: 80;
    text-v-align: center;
    text-align: center;
    h-align: 0.5;
    offset-top: 3;
}
.close-btn {
    fill-image: asset("jetgui/button/close.png");
    size: 98;
    align: 1;
}

.resources {
    padding-top: 15;
}

.resources__item {
    padding-right: 20;
}

.resources__text {
	font: "Tavolga bold 40";
    text-color: "ffffff";
    padding-left: 8;
    align: 0.5;
}

.resources__item.diamonds {
    padding-right: 10;
}

/* Боковое меню */
.sidebar {
    padding-right: 20;
}

/* Разделы склада */
.navigation {
    padding-bottom: 5;
}

.navigation__wrapper {
    width: 328;
    fill-image: asset("jetgui/card/body_light.png");
}

.navigation__link {
    padding-bottom: -5;
}
.navigation__link.active {
    fill-image: asset("jetgui/tabList/select_middle.png");
}
.navigation__link.active.last-link {
    fill-image: asset("jetgui/tabList/select_end-reverse.png");
}

.navigation__link__text {
	font: "Tavolga bold 40";
    text-color: "aa7957";
    width: 328;
    text-align: center;
    padding-top: 27;
    padding-bottom: 32;
}
.navigation__link__text.active {
    text-color: "ffffff";
}
.navigation__link__text.last-link {
    padding-top: 30;
    padding-bottom: 47;
}
.navigation__link__divider {
    opacity: 0.5;
    h-align: 0.5;
    v-align: 1;
    width: 222;
}
.navigation__link__divider.active {
    opacity: 0;
}

/* Прогресс бар */
.progress {
    fill-image: asset("jetgui/card/body_light.png");
    width: 328;
    height: 238;
    padding-bottom: 20;
    padding-top: 15;
}

.progress__title {
	font: "Tavolga bold 40";
    text-color: "aa7957";
    width: 328;
    text-align: center;
    padding-top: 25;
    padding-bottom: 15;
}
.progress__wrapper {
    align: 0.5;
    width: 278;
    height: 47;
    fill-image: asset("jetgui/progressBar/back.png");
}
.progress__bar {
    height: 100%;
    fill-image: asset("jetgui/progressBar/fillJade.png");
}
.progress__bar.full {
    fill-image: asset("jetgui/progressBar/fillRed_full.png");
}
.progress__text {
    align: 0.5;
	font: "Tavolga bold 40";
    text-color: "ffffff";
}
.progress__bottom {
    padding-top: 13;
    width: 328;
}
.progress__btn {
    align: 0.5;
    height: 95;
    width: 286;
	font: "Tavolga bold 48";
    text-v-align: center;
    text-align: center;
    fill-image: asset("jetgui/button/green.png");
}

/* Элемент склада */
.granary-item {
    width: 315;
    height: 434;
    fill-image: asset("jetgui/card/body.png");
    padding-top: 0;
    offset-bottom: 11;
}

.granary-item.sale-mode {
    padding-top: -45;
}

.granary-item__header {
    width: 310;
}

.granary-item__zoom-btn {
    fill-image: asset("jetgui/button/btnSmh.png");
    size: 94;
    offset-top: -8;
    offset-right: -23;
    h-align: 1;
    v-align: 0;
} 

.granary-item__img {
    align: 0.5;
    offset-top: 40;
    offset-bottom: 5;
    size: 210;
}

.granary-item__img.sale-mode {
    offset-top: 0;
}

.granary-item__title {
	font: "Tavolga bold 40";
    text-color: "aa7957";
    h-align: 0.5;
    width: 100%;
    padding-left: 10;
    padding-right: 10;
    height: 80;
    text-align: center;
    text-v-align: center;
}

.granary-item__count {
	font: "Tavolga bold 48";
    text-color: "7a4f2c";
    align: 0.5;
    padding-top: 10;
}

.granary-item__count.sale-mode {
    padding-top: 4;
    padding-bottom: 6;
}

.sale-mode__block {
    fill-image: asset("jetgui/card/bottomSlice.png");
    width: 100%;
    height: 205;
}

.sale-mode__counter {
    width: 100%;
    padding-top: 5;
    padding-left: 5;
    padding-right: 5;
}

.sale-mode__btn {
    align: 0.5;
    height: 80;
    width: 263;
	font: "Tavolga bold 48";
    text-v-align: center;
    text-align: center;
    fill-image: asset("jetgui/button/green.png");
}

.sale-mode__count {
	font: "Tavolga bold 48";
    text-color: "7a4f2c";
    align: 0.5;
    padding-top: 10;
}

.sale-mode__minus {
    size: 78;
    fill-image: asset("jetgui/button/minusCyan.png");
    h-align: 0;
}

.sale-mode__plus {
    size: 78;
    fill-image: asset("jetgui/button/plusCyan.png");
    h-align: 1;
}

.sale-mode__price {
    width: 100%;
    children-align: 0.5;
    padding-top: -10;
    padding-bottom: -5;
}
.sale-mode__price__text {
	font: "Tavolga bold 40";
    text-color: "aa7957";
    align: 0.5;
    padding-right: 15;
}