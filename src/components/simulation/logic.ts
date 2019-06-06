import { Entity, EntityState, Move } from "../../api/Contracts";

export const moveEntities = (
    entities: Entity[],
    progress: number
): Entity[] => {
    return entities
        .filter(entity => !shouldDie(entity, progress))
        .map(entity => {
            switch (entity.currentMove) {
                case Move.left:
                    return { ...entity, col: entity.col - progress };
                case Move.right:
                    return { ...entity, col: entity.col + progress };
                case Move.up:
                    return { ...entity, row: entity.row - progress };
                case Move.down:
                    return { ...entity, row: entity.row + progress };
                default:
                    return entity;
            }
        });
};

const shouldDie = (entity: Entity, progress: number) => {
    if (entity.state === EntityState.alive) {
        return false;
    }
    if (entity.state === EntityState.diesInMiddle) {
        return progress >= 0.5;
    }
    return false;
};
