.granary-menu {
    width: 100%;
}

.back-btn {
    fill-image: asset("jetgui/button/backCyan.png");
    size: 130;
    v-align: 0;
}

/* header */
.header {
    width: 100%;
    padding-top: 20;
    padding-bottom: 30;
    padding-right: 74;
    padding-left: 74;
}
.title {
    fill-image: asset("jetgui/header/title.png");
	font: "Tavolga bold 48";
    text-color: "7a4f2c";
    width: 416;
    height: 80;
    text-v-align: center;
    text-align: center;
    align: 0.5;
}
.close-btn {
    fill-image: asset("jetgui/button/close.png");
    size: 90;
    align: 1;
}


/* Боковое меню */
.sidebar {
    padding-right: 20;
}

/* Разделы склада */
.navigation {
    width: 328;
    fill-image: asset("jetgui/card/body_light.png");
}

.navigation__link {
	font: "Tavolga bold 40";
    text-color: "aa7957";
    width: 328;
    text-align: center;
    padding-top: 29;
    padding-bottom: 27;
}
.navigation__link.active {
    text-color: "ffffff";
    fill-image: asset("jetgui/tabList/select_middle.png");
}

.navigation__divider {
    opacity: 0.5;
    align: 0.5;
    width: 222;
}

/* Прогресс бар */
.progress {
    fill-image: asset("jetgui/card/body_light.png");
    width: 328;
    height: 214;
    padding-bottom: 20;
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
    width: 274;
    height: 50;
    fill-image: asset("jetgui/progressBar/back.png");
}
.progress__bar {
    height: 50;
    fill-image: asset("jetgui/progressBar/fillJade.png");
}
.progress__text {
    align: 0.5;
	font: "Tavolga bold 40";
    text-color: "ffffff";
}
.progress__bottom {
    padding-top: 16;
    width: 328;
}
.progress__btn {
    align: 0.5;
    height: 81;
    width: 274;
	font: "Tavolga bold 48";
    text-v-align: center;
    text-align: center;
    fill-image: asset("jetgui/button/green.png");
}

/* Элемент склада */
.granary-item {
    width: 315;
    height: 414;
    fill-image: asset("jetgui/card/body.png");
    padding-top: 0;
}
.granary-item__header {
    width: 310;
}

.granary-item__zoom-btn {
    fill-image: asset("jetgui/button/btnSmh.png");
    size: 94;
    offset-top: -4;
    offset-right: -23;
    h-align: 1;
    v-align: 0;
} 

.granary-item__img {
    align: 0.5;
    offset-top: 30;
    size: 210;
}

.granary-item__title {
	font: "Tavolga bold 40";
    text-color: "aa7957";
    align: 0.5;
    width: 230;
    height: 80;
    text-align: center;
    text-v-align: center;
}

.granary-item__count {
	font: "Tavolga bold 48";
    text-color: "7a4f2c";
    align: 0.5;

}

.granary-item__sale {
    fill-image: asset("jetgui/card/bottomSlice.png");
    width: 310;
    height: 186;
}
