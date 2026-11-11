class Madar {
    #y;
    #velocity = 0;
    #gravity;
    #jumpPower;
    #container;
    #element;
    #fallInterval = null;
    #onGround;

    constructor(y, gravity, jumpPower, container, onGround) {
        this.setY(y);
        this.setGravity(gravity);
        this.setJumpPower(jumpPower);
        this.setContainer(container);
        this.#onGround = onGround;
        this.#element = this.#container.querySelector(".bird");
        this.#render();
    }

    setY(y) {
        this.#y = y;
    }

    setGravity(gravity) {
        this.#gravity = gravity;
    }

    setJumpPower(jumpPower) {
        this.#jumpPower = jumpPower;
    }

    setContainer(container) {
        this.#container = document.querySelector(container);
    }

    #render() {
        this.#element.style.top = this.#y + "px";
        var angle = Math.max(-25, Math.min(70, this.#velocity * 6));
        this.#element.style.transform = "rotate(" + angle + "deg)";
    }

    jump() {
        this.#velocity = -this.#jumpPower;
    }

    fall() {
        this.#fallInterval = setInterval(() => {
            this.#velocity += this.#gravity;
            this.#y += this.#velocity;
            if (this.#y < 0) {
                this.#y = 0;
                this.#velocity = 0;
            }
            var maxY = this.#container.offsetHeight - this.#element.offsetHeight;
            if (this.#y >= maxY) {
                this.#y = maxY;
                this.#render();
                this.stop();
                if (this.#onGround){
                     this.#onGround();
                }
                return;
            }

            this.#render();
        }, 20);
    }

    stop() {
        clearInterval(this.#fallInterval);
        this.#fallInterval = null;
    }
}