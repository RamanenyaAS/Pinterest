import { getFirstTable, getSecondTable, getThirdTable, setFirstTable, setSecondTable, setThirdTable } from "./module.js";

const root = document.querySelector("#root");

// функция создания элементов
function createElement(tag, className, placeAppend, text) {
    const element = document.createElement(tag);
    element.classList.add(className);
    element.innerHTML = text;
    placeAppend.append(element);
    return element;
}

function createHeader() {
    // создал все элементы хедера
    const header = createElement("header", "header", root, "");
    const container = createElement("div", "container", header, "");
    container.classList.add("container_header");
    const logo = createElement("div", "header__logo", container, "Pinterest");
    const search = createElement("input", "header__search", container, "");
    search.placeholder = "Поиск...";
    const selectBoard = createElement("div", "header__select", container, "Выбрать доску");
    selectBoard.classList.add("header__select_hover");
    // выпадающий список
    const menu = createElement("div", "select-block", selectBoard, "");
    const firstOption = createElement("div", "select-block__option", menu, "Доска 1")
    const secondOption = createElement("div", "select-block__option", menu, "Доска 2")
    const thirdOption = createElement("div", "select-block__option", menu, "Доска 3")

    // события
    // выпадающий список
    selectBoard.addEventListener("click", () => {
        menu.classList.toggle("select-block_active");
    })
    // поиск
    search.addEventListener("input", function () {
        const query = search.value.toLowerCase();
        const items = document.querySelectorAll(".item__hashtag");

        items.forEach(itemElement => {
            const text = itemElement.textContent.toLowerCase();
            const parentItem = itemElement.parentElement;

            if (text.includes(query)) {
                parentItem.style.display = "block";
            } else {
                parentItem.style.display = "none";
            }
        });
    });
    // Получаем текущие данные из локального хранилища и на основе их делаем доски
    firstOption.addEventListener("click", () => {
        const currentData = getFirstTable(); 
        create(currentData);
    });
    secondOption.addEventListener("click", () => {
        const currentData = getSecondTable();
        create(currentData);
    });
    thirdOption.addEventListener("click", () => {
        const currentData = getThirdTable();
        create(currentData);
    });
    // Загружаем все посты
    logo.addEventListener("click", () => {
        showPicture(); 
    });
}
createHeader();

// функция для создания постов
async function showPicture() {
    let response = await fetch('https://65aea1db1dfbae409a753ded.mockapi.io/Pinterest');
    let data = await response.json();
    create(data);
}

// вынес из функции Create, чтобы при выборе доски не создавало пустые мейны
const main = createElement("main", "main", root, "");
const container = createElement("div", "container", main, "");
container.classList.add("container_publications")


function create(tableData) {
    // Сначала скрываем все существующие посты
    document.querySelectorAll('.item').forEach(item => {
        item.style.display = 'none';
    });

    tableData.forEach(item => {
        // деструктуризация
        let { avatar, hashtag, id, picture } = item;
        // Создаем только необходимые посты
        let pictureElement = document.querySelector(`.item[data-item-id="${id}"]`);
        if (!pictureElement) {
            pictureElement = createElement("div", "item", container, "");
            pictureElement.dataset.itemId = id; // Устанавливаем уникальное значение для атрибута data-item-id
            // Создал все элементы
            let imageElement = createElement("img", "item__image", pictureElement, "");
            imageElement.src = picture;
            let avatarElement = createElement("img", "item__avatar", pictureElement, "");
            avatarElement.src = avatar;
            let hashtagElement = createElement("p", "item__hashtag", pictureElement, `#${hashtag}`);
            let navigation = createElement("button", "navigation-block", pictureElement, "...");
            let menu = createElement("div", "menu", navigation, "");
            let addToBoard = createElement("button", "menu__button", menu, "Добавить на доску");
            // меню выборы доски
            let boardOptions = createElement("div", "board-block", menu, "");
            let firstBoard = createElement("button", "board-block__option", boardOptions, "Доска 1");
            let secondBoard = createElement("button", "board-block__option", boardOptions, "Доска 2");
            let thirdBoard = createElement("button", "board-block__option", boardOptions, "Доска 3");
            let boardBackButton = createElement("button", "board-block__option", boardOptions, "Назад");
            let report = createElement("button", "menu__button", menu, "Пожаловаться")
            // report block
            let reportOptions = createElement("div", "report-block", menu, "");
            let firstOption = createElement("button", "report-block__option", reportOptions, "Спам");
            let secondOption = createElement("button", "report-block__option", reportOptions, "Неуместный контент");
            let thirdOption = createElement("button", "report-block__option", reportOptions, "Нарушение авторских прав");
            let reportBackButton = createElement("button", "report-block__option", reportOptions, "Назад");

            // события
            // Показываем блок с видами жалоб при нажатии на кнопку "Пожаловаться"
            report.addEventListener("click", () => {
                reportOptions.style.display = "block";
            });
            // обработка жалоб 
            firstOption.addEventListener("click", () => {
                alert("Ваша жалоба отправлена");
                reportOptions.style.display = "none";
                pictureElement.remove();
            })
            secondOption.addEventListener("click", () => {
                alert("Ваша жалоба отправлена");
                reportOptions.style.display = "none";
                pictureElement.remove();
            })
            thirdOption.addEventListener("click", () => {
                alert("Ваша жалоба отправлена");
                reportOptions.style.display = "none";
                pictureElement.remove();
            })
            // Скрываем блок с видами жалоб
            reportBackButton.addEventListener("click", () => {
                reportOptions.style.display = "none";
            });
            // при наведении на фото появляется ...
            pictureElement.addEventListener("mouseenter", () => {
                navigation.style.display = "block";
            });
            pictureElement.addEventListener("mouseleave", () => {
                navigation.style.display = "none";
            });
            // при наведении на ... появляется блок выбора
            navigation.addEventListener("mouseenter", () => {
                menu.style.display = "block";
            })
            navigation.addEventListener("mouseleave", () => {
                menu.style.display = "none";
            })
            // скрываем/убираем панель досок
            addToBoard.addEventListener("click", () => {
                boardOptions.style.display = "block";
            })
            boardBackButton.addEventListener("click", () => {
                boardOptions.style.display = "none";
            });
            // storage
            // добавление в память
            firstBoard.addEventListener("click", () => {
                let currentData = getFirstTable(); // Получаем текущие данные из локального хранилища
                // Проверяем, есть ли фото в выбранной доске
                if (currentData.some(item => item.id === pictureElement.dataset.itemId)) {
                    alert("Фото уже добавлено в ваш каталог");
                } else {
                    currentData.push(item); // Добавляем новый пост в текущие данные
                    setFirstTable(currentData);
                }
            });
            secondBoard.addEventListener("click", () => {
                let currentData = getSecondTable();
                if (currentData.some(item => item.id === pictureElement.dataset.itemId)) {
                    alert("Фото уже добавлено в ваш каталог");
                } else {
                    currentData.push(item);
                    setSecondTable(currentData);
                }
            })
            thirdBoard.addEventListener("click", () => {
                let currentData = getThirdTable(); // Получаем текущие данные из локального хранилища
                if (currentData.some(item => item.id === pictureElement.dataset.itemId)) {
                    alert("Фото уже добавлено в ваш каталог");
                } else {
                currentData.push(item); // Добавляем новый пост в текущие данные
                setThirdTable(currentData);}
            })
        } else {
            pictureElement.style.display = 'block'; // Показываем существующий пост
        }
    });
}

// вызов функции для загрузки данных и создания элементов
showPicture();
