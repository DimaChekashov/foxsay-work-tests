const banks = [
	{
		id: 1,
		name: "Сбер Банк",
		elementId: "bank_sber"
	},
	{
		id: 2,
		name: "ВТБ",
		elementId: "bank_vtb"
	},
	{
		id: 3,
		name: "Почта банк",
		elementId: "bank_pochta-bank"
	},
	{
		id: 4,
		name: "Тинькофф Банк",
		elementId: "bank_tinkoff"
	},
	{
		id: 5,
		name: "Открытие банк",
		elementId: "bank_otkritie"
	},
	{
		id: 6,
		name: "Газпромбанк",
		elementId: "bank_gazprom"
	},
	{
		id: 7,
		name: "Банк Россия",
		elementId: "bank_bank-russia"
	},
	{
		id: 8,
		name: "РНКБ",
		elementId: "bank_rnkb"
	},
	{
		id: 9,
		name: "Русский стандарт банк",
		elementId: "bank_russian-standart"
	},
	{
		id: 10,
		name: "Альфа банк",
		elementId: "bank_alfa-bank"
	},
	{
		id: 11,
		name: "Россельхоз Банк",
		elementId: "bank_rsxb"
	},
	{
		id: 12,
		name: "Московский кредитный банк",
		elementId: "bank_moscow-bank"
	},
];

const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
};

function searchBank() {
  const searchBtn = document.querySelector(".banks__search-submit");
  const searchField = document.querySelector(".banks__search-field");
  const searchClear = document.querySelector(".banks__search-clear");
  const bankItems = document.querySelectorAll(".banks__item");

  let filteredBanksIds = [];

  const filterBanks = () => {
    const searchValue = searchField.value.toLowerCase();

		if (!searchValue) {
			filteredBanksIds = banks.map(bank => bank.elementId);
			return;
		}

    filteredBanksIds = banks
      .filter(bank => bank.name.toLowerCase().includes(searchValue))
      .map(bank => bank.elementId);
  };

  const renderBanks = () => {
    bankItems.forEach(bank => {
      bank.style.display = filteredBanksIds.includes(bank.id) ? "inline-flex" : "none";
    });
  };

  searchField.addEventListener("input", debounce(() => {
    filterBanks();
    renderBanks();
  }, 500));

  searchBtn.addEventListener("click", () => {
    filterBanks();
    renderBanks();
  });

  searchClear.addEventListener("click", () => {
    searchField.value = "";
    filteredBanksIds = banks.map(bank => bank.elementId);
    renderBanks();
  });
}

document.addEventListener("DOMContentLoaded", () => {
	$("#cases-slider").owlCarousel({
		lazyLoad: true,
    loop: false,
    margin: 20,
    nav: false,
		dots: false,
    responsive:{
			0:{
				items: 1,
				autoWidth: true
			},
			729:{
				items: 2,
				autoWidth: true
			},
			1150:{
				items: 3
			}
    }
	});

	$(".advantages-items_mobile").owlCarousel({
		lazyLoad: true,
		loop: false,
		margin: 20,
		nav: false,
		dots: false,
		items: 1,
		autoWidth: true
	});

	searchBank();
});