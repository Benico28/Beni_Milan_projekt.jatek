class Cso {
    #x;
    #gapY;
    #gapSize;
    #speed;
    #container;
    #element;
    #moveInterval = null;

    static WIDTH = 80;

    constructor(x, gapY, gapSize, speed, container) {
        this.setX(x);
        this.setGapY(gapY);
        this.setGapSize(gapSize);
        this.setSpeed(speed);
        this.setContainer(container);
        this.createObject();
    }

    setX(x) {
        this.#x = x;
    }

    setGapY(gapY) {
        this.#gapY = gapY;
    }

    setGapSize(gapSize) {
        this.#gapSize = gapSize;
    }

    setSpeed(speed) {
        this.#speed = speed;
    }

    setContainer(container) {
        this.#container = document.querySelector(container);
    }

    createObject() {
        this.#element = document.createElement("div");
        this.#element.classList.add("pipe-pair");
        this.#element.style.left = this.#x + "px";

        var top = document.createElement("div");
        top.classList.add("pipe", "pipe-top");
        top.style.height = this.#gapY + "px";

        var bottom = document.createElement("div");
        bottom.classList.add("pipe", "pipe-bottom");
        bottom.style.top = (this.#gapY + this.#gapSize) + "px";

        this.#element.appendChild(top);
        this.#element.appendChild(bottom);
        this.#container.appendChild(this.#element);
    }

    remove() {
        clearInterval(this.#moveInterval);
        this.#moveInterval = null;
        this.#element.remove();
    }

    move() {
        this.#moveInterval = setInterval(() => {
            if (this.#element.parentNode == null) {
                this.remove();
                return;
            }
            this.#x -= this.#speed;
            this.#element.style.left = this.#x + "px";

            if (this.#x < -Cso.WIDTH) {
                this.remove();
            }
        }, 20);
    }
}
