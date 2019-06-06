const GRID_SIZE = 104;
const PADDING = 2;

interface AnimationFrame {
    x: number;
    y: number;
}

export class Sprite {
    frames: AnimationFrame[];
    animation: number[];
    animationSpeed: number;

    constructor(
        frames: AnimationFrame[],
        animation: number[],
        animationSpeed = 0.5
    ) {
        this.frames = frames;
        this.animation = animation;
        this.animationSpeed = animationSpeed;
    }

    getFrame(frameNum: number) {
        return this.frames[this.animation[frameNum % this.animation.length]];
    }

    render(
        ctx: CanvasRenderingContext2D,
        spritesheet: HTMLImageElement,
        frame: number,
        x: number,
        y: number,
        w: number,
        h: number
    ) {
        const sprite = this.getFrame(Math.floor(frame * this.animationSpeed));
        const sx = sprite.x * GRID_SIZE + PADDING;
        const sy = sprite.y * GRID_SIZE + PADDING;
        const sideLength = GRID_SIZE - 2 * PADDING;

        ctx.drawImage(spritesheet, sx, sy, sideLength, sideLength, x, y, w, h);
    }
}
