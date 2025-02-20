fetch("default.json")
    .then((response) => response.json())
    .then(createTable);

function createTable(data) {
    const container = document.querySelector(".table__blocks");
    const blocks = new Map();

    const findParentMap = (parents, parentId) => {
        if (parents.has(parentId)) {
            return parents.get(parentId);
        }
        
        for (const value of parents.values()) {
            if (value.childrens instanceof Map) {
                const result = findParentMap(value.childrens, parentId);
                if (result !== null) {
                    return result;
                }
            }
        }
        
        return null;
    }

    const createCol = (text) => {
        const col = document.createElement("div");
        col.classList.add("table__col");
        col.innerText = text;

        return col;
    }

    const createRow = (isActive, balance, name, email) => {        
        const row = document.createElement("div");
        row.classList.add("table__row");

        row.appendChild(createCol(isActive ? "Да" : "Нет"));
        row.appendChild(createCol(balance));
        row.appendChild(createCol(name));
        row.appendChild(createCol(email));

        return row;
    }

    const createBlock = ({id, isActive, balance, name, email}) => {
        const block = document.createElement("div");
        block.classList.add("table__block");
        block.setAttribute("data-item-id", id);

        block.appendChild(createRow(isActive, balance, name, email));

        return block;
    }

    const createInnerBlock = ({id, parentId, isActive, balance, name, email}) => {
        const block = document.createElement("div");
        block.classList.add("table__block");
        block.setAttribute("data-item-id", id);

        block.appendChild(createRow(isActive, balance, name, email));

        const parentBlock = findParentMap(blocks, parentId);

        parentBlock.childrens.set(id, {
            block: block,
            isActive: isActive,
            childrens: new Map()
        });

        if (!parentBlock.block.querySelector(".table__block-inner")) {
            const innerBlock = document.createElement("div");
            innerBlock.classList.add("table__block-inner");
            parentBlock.block.appendChild(innerBlock);
            addOnClick(parentBlock.block);
        }

        // parentBlock.block.querySelector(".table__block-inner").appendChild(block);
    }

    const appendBlocks = ({block, childrens}) => {
        if (childrens instanceof Map) {
            childrens.forEach(item => block.querySelector(".table__block-inner").appendChild(appendBlocks(item)));
        }

        return block;
    }

    const render = (rows) => {
        container.innerHTML = "";

        rows.forEach((item) => {
            container.appendChild(appendBlocks(item));
        })
    }

    const addOnClick = (block) => {
        const targetElement = block.querySelector(".table__row");

        targetElement.classList.add("cursor-pointer");

        targetElement.addEventListener("click", () => {
            block.classList.toggle("show");
        });
    }

    const sortDom = (dom) => {
        const sortChildren = (item) => {
            if (item.childrens instanceof Map) {
                item.childrens = new Map([...item.childrens.entries()].sort((a, b) => b[1].isActive - a[1].isActive));
                
                item.childrens.forEach(sortChildren);
            }
        };

        dom = new Map([...dom.entries()].sort((a, b) => b[1].isActive - a[1].isActive));

        dom.forEach((item) => {
            sortChildren(item);
        })

        return dom;
    }

    const filter = () => {
        const activeCheckbox = document.getElementById("active-checkbox");

        activeCheckbox.addEventListener("change", () => {
            if(activeCheckbox.checked) {
                render(sortDom(blocks))
            } else {
                render(blocks);
            }
        })
    }

    const init = (items) => {
        items.forEach((item, i) => {
            if (item.parentId === 0) {
                blocks.set(item.id, {
                    block: createBlock(item),
                    isActive: item.isActive,
                    childrens: new Map()
                });
            } else {
                createInnerBlock(item);
            }
            
            if ((data.length - 1) === i) render(blocks);
        });
    }

    init(data);
    filter();
}