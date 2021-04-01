.sidebar {
    padding-right: 40;
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
    padding-top: 15;
    padding-bottom: 15;
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

/* Элемент склада */
.granary-item {
    width: 250;
    height: 340;
    offset-top: 22;
    fill-image: asset("jetgui/card/body.png");
    padding-top: 25;
}

.granary-item__img {
    align: 0.5;
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
    width: 250;
    height: 106;
}