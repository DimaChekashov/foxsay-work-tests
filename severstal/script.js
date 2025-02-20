fetch("default.json")
    .then((response) => response.json())
    .then((data) => {
        const tableBuilder = new TableBuilder(".table__blocks");
        tableBuilder.init(data);
    });

class TableBuilder {
    constructor(containerSelector) {
        this.container = document.querySelector(containerSelector);
        this.treeBlocks = new Map();
    }

    createCol(text) {
        const col = document.createElement("div");
        col.classList.add("table__col");
        col.innerText = text;
        return col;
    }

    createRow(isActive, balance, name, email) {
        const row = document.createElement("div");
        row.classList.add("table__row");

        row.appendChild(this.createCol(isActive ? "Да" : "Нет"));
        row.appendChild(this.createCol(balance));
        row.appendChild(this.createCol(name));
        row.appendChild(this.createCol(email));

        return row;
    }

    createBlock(item) {
        const block = document.createElement("div");
        block.classList.add("table__block");
        block.setAttribute("data-item-id", item.id);
        block.appendChild(this.createRow(item.isActive, item.balance, item.name, item.email));

        return block;
    }

    createInnerBlock(item) {
        const block = document.createElement("div");
        block.classList.add("table__block");
        block.setAttribute("data-item-id", item.id);
        block.appendChild(this.createRow(item.isActive, item.balance, item.name, item.email));

        const parentBlock = this.findParentMap(this.treeBlocks, item.parentId);

        if (!parentBlock) return;

        parentBlock.childrens.set(item.id, {
            block: block,
            isActive: item.isActive,
            childrens: new Map(),
        });

        if (!parentBlock.block.querySelector(".table__block-inner")) {
            const innerBlock = document.createElement("div");
            innerBlock.classList.add("table__block-inner");
            parentBlock.block.appendChild(innerBlock);
            this.addOnClick(parentBlock.block);
        }
    }

    findParentMap(parents, parentId) {
      if (parents.has(parentId)) {
        return parents.get(parentId);
      }
      for (const value of parents.values()) {
        if (value.childrens instanceof Map) {
          const result = this.findParentMap(value.childrens, parentId);
          if (result !== null) {
            return result;
          }
        }
      }
      return null;
    }

    appendBlocks(item) {
        if (item.childrens instanceof Map) {
            item.childrens.forEach((childItem) => {
                const innerContainer = item.block.querySelector(".table__block-inner");
                if (innerContainer) {
                    innerContainer.appendChild(this.appendBlocks(childItem));
                }
            });
        }
        return item.block;
    }

    render() {
        this.container.innerHTML = "";
        this.treeBlocks.forEach((item) => {
            this.container.appendChild(this.appendBlocks(item));
        });
    }

    addOnClick(block) {
        const targetElement = block.querySelector(".table__row");
        targetElement.classList.add("cursor-pointer");
        targetElement.addEventListener("click", (e) => {
            e.stopPropagation();
            block.classList.toggle("show");
        });
    }

    sortDom(dom) {
        const sortChildren = (item) => {
            if (item.childrens instanceof Map) {
                const sortedChildren = new Map([...item.childrens.entries()].sort((a, b) => b[1].isActive - a[1].isActive));
                item.childrens.clear();
                sortedChildren.forEach((value, key) => item.childrens.set(key, value));
                item.childrens.forEach(sortChildren);
            }
        };

        const sortedDom = new Map([...dom.entries()].sort((a, b) => b[1].isActive - a[1].isActive));
        sortedDom.forEach(sortChildren);
        return sortedDom;
    }

    filter() {
        const activeCheckbox = document.getElementById("active-checkbox");
        activeCheckbox.addEventListener("change", () => {
            if (activeCheckbox.checked) {
                this.renderFromMap(this.sortDom(new Map(this.treeBlocks)));
            } else {
                this.renderFromMap(new Map(this.treeBlocks));
            }
        });
    }
    
    renderFromMap(mapData) {
        this.container.innerHTML = "";
        mapData.forEach((item) => {
            this.container.appendChild(this.appendBlocks(item));
        });
    }

    init(items) {
        items.forEach((item) => {
            if (item.parentId === 0) {
                this.treeBlocks.set(item.id, {
                    block: this.createBlock(item),
                    isActive: item.isActive,
                    childrens: new Map(),
                });
            } else {
                this.createInnerBlock(item);
            }
        });
        this.render();
        this.filter();
    }
}