import { Entity, EntityState, Move } from "../../api/Contracts";

export const moveEntities = (
    entities: Entity[],
    progress: number
): Entity[] => {
    return entities
        .filter(entity => entity.state === EntityState.alive)
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
