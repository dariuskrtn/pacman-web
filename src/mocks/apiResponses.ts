// tslint:disable: no-object-literal-type-assertion
import {
    SubmissionDetailsResponse,
    SubmissionsResponse
} from "../api/Contracts";

// GET http://46.101.162.155:8000/api/submissions
export const submissions = {
    submissions: [{ id: 0, user: "labas" }, { id: 1, user: "labas" }],
    levelClosed: false,
    level: {
        cells: [
            ["wall", "wall", "wall", "wall", "wall"],
            ["wall", "empty", "empty", "empty", "wall"],
            ["wall", "empty", "empty", "empty", "wall"],
            ["wall", "empty", "empty", "empty", "wall"],
            ["wall", "wall", "wall", "wall", "wall"]
        ],
        objects: [
            {
                id: 0,
                row: 1,
                col: 1,
                currentMove: "wait",
                state: "alive",
                kind: "pacman"
            },
            {
                id: 1,
                row: 2,
                col: 2,
                currentMove: "wait",
                state: "alive",
                kind: "berry"
            },
            {
                id: 2,
                row: 3,
                col: 3,
                currentMove: "wait",
                state: "alive",
                kind: "ghost"
            }
        ]
    }
} as SubmissionsResponse;

// GET 46.101.162.155:8000/api/submissions/0
export const submissionDetails = {
    initialState: {
        cells: [
            ["wall", "wall", "wall", "wall", "wall"],
            ["wall", "empty", "empty", "empty", "wall"],
            ["wall", "empty", "empty", "empty", "wall"],
            ["wall", "empty", "empty", "empty", "wall"],
            ["wall", "wall", "wall", "wall", "wall"]
        ],
        objects: [
            {
                id: 0,
                row: 1,
                col: 1,
                currentMove: "wait",
                state: "alive",
                kind: "pacman"
            },
            {
                id: 1,
                row: 2,
                col: 2,
                currentMove: "wait",
                state: "alive",
                kind: "berry"
            },
            {
                id: 2,
                row: 3,
                col: 3,
                currentMove: "wait",
                state: "alive",
                kind: "ghost"
            }
        ]
    },
    steps: [
        {
            objects: [
                {
                    id: 0,
                    row: 1,
                    col: 1,
                    currentMove: "right",
                    state: "alive",
                    kind: "pacman"
                },
                {
                    id: 1,
                    row: 2,
                    col: 2,
                    currentMove: "wait",
                    state: "alive",
                    kind: "berry"
                },
                {
                    id: 2,
                    row: 3,
                    col: 3,
                    currentMove: "wait",
                    state: "alive",
                    kind: "ghost"
                }
            ]
        },
        {
            objects: [
                {
                    id: 0,
                    row: 1,
                    col: 2,
                    currentMove: "right",
                    state: "alive",
                    kind: "pacman"
                },
                {
                    id: 1,
                    row: 2,
                    col: 2,
                    currentMove: "wait",
                    state: "alive",
                    kind: "berry"
                },
                {
                    id: 2,
                    row: 3,
                    col: 3,
                    currentMove: "wait",
                    state: "alive",
                    kind: "ghost"
                }
            ]
        },
        {
            objects: [
                {
                    id: 0,
                    row: 1,
                    col: 3,
                    currentMove: "down",
                    state: "alive",
                    kind: "pacman"
                },
                {
                    id: 1,
                    row: 2,
                    col: 2,
                    currentMove: "wait",
                    state: "alive",
                    kind: "berry"
                },
                {
                    id: 2,
                    row: 3,
                    col: 3,
                    currentMove: "wait",
                    state: "alive",
                    kind: "ghost"
                }
            ]
        },
        {
            objects: [
                {
                    id: 0,
                    row: 2,
                    col: 3,
                    currentMove: "down",
                    state: "diesAtEnd",
                    kind: "pacman"
                },
                {
                    id: 1,
                    row: 2,
                    col: 2,
                    currentMove: "wait",
                    state: "alive",
                    kind: "berry"
                },
                {
                    id: 2,
                    row: 3,
                    col: 3,
                    currentMove: "wait",
                    state: "alive",
                    kind: "ghost"
                }
            ]
        },
        {
            objects: [
                {
                    id: 1,
                    row: 2,
                    col: 2,
                    currentMove: "wait",
                    state: "alive",
                    kind: "berry"
                },
                {
                    id: 2,
                    row: 3,
                    col: 3,
                    currentMove: "wait",
                    state: "alive",
                    kind: "ghost"
                }
            ]
        }
    ],
    outcome: "fail"
} as SubmissionDetailsResponse;

export const submissionDetails2 = {
    initialState: {
        cells: [
            ["wall", "wall", "wall", "wall", "wall"],
            ["wall", "empty", "empty", "empty", "wall"],
            ["wall", "empty", "empty", "empty", "wall"],
            ["wall", "empty", "empty", "empty", "wall"],
            ["wall", "wall", "wall", "wall", "wall"]
        ],
        objects: [
            {
                id: 0,
                row: 1,
                col: 1,
                currentMove: "wait",
                state: "alive",
                kind: "pacman"
            },
            {
                id: 1,
                row: 2,
                col: 2,
                currentMove: "wait",
                state: "alive",
                kind: "berry"
            },
            {
                id: 2,
                row: 3,
                col: 3,
                currentMove: "wait",
                state: "alive",
                kind: "ghost"
            }
        ]
    },
    steps: [
        {
            objects: [
                {
                    id: 0,
                    row: 1,
                    col: 1,
                    currentMove: "right",
                    state: "alive",
                    kind: "pacman"
                },
                {
                    id: 1,
                    row: 2,
                    col: 2,
                    currentMove: "wait",
                    state: "alive",
                    kind: "berry"
                },
                {
                    id: 2,
                    row: 3,
                    col: 3,
                    currentMove: "wait",
                    state: "alive",
                    kind: "ghost"
                }
            ]
        },
        {
            objects: [
                {
                    id: 0,
                    row: 1,
                    col: 2,
                    currentMove: "down",
                    state: "alive",
                    kind: "pacman"
                },
                {
                    id: 1,
                    row: 2,
                    col: 2,
                    currentMove: "wait",
                    state: "diesAtEnd",
                    kind: "berry"
                },
                {
                    id: 2,
                    row: 3,
                    col: 3,
                    currentMove: "wait",
                    state: "alive",
                    kind: "ghost"
                }
            ]
        },
        {
            objects: [
                {
                    id: 0,
                    row: 2,
                    col: 2,
                    currentMove: "right",
                    state: "alive",
                    kind: "pacman"
                },
                {
                    id: 2,
                    row: 3,
                    col: 3,
                    currentMove: "wait",
                    state: "alive",
                    kind: "ghost"
                }
            ]
        },
        {
            objects: [
                {
                    id: 0,
                    row: 2,
                    col: 3,
                    currentMove: "down",
                    state: "alive",
                    kind: "pacman"
                },
                {
                    id: 2,
                    row: 3,
                    col: 3,
                    currentMove: "wait",
                    state: "diesAtEnd",
                    kind: "ghost"
                }
            ]
        },
        {
            objects: [
                {
                    id: 0,
                    row: 3,
                    col: 3,
                    currentMove: "down",
                    state: "alive",
                    kind: "pacman"
                }
            ]
        }
    ],
    outcome: "success"
} as SubmissionDetailsResponse;
