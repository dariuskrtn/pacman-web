const GRID_SIZE = 100;

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
        const sx = sprite.x * GRID_SIZE;
        const sy = sprite.y * GRID_SIZE;

        ctx.drawImage(spritesheet, sx, sy, GRID_SIZE, GRID_SIZE, x, y, w, h);
    }
}
